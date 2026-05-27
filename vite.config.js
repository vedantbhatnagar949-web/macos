import { defineConfig } from 'vite';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import http from 'http';
import https from 'https';

export default defineConfig({
  plugins: [
    {
      name: 'webos-backend',
      configureServer(server) {
        // Middleware to handle API requests
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/terminal' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { command } = JSON.parse(body);
                // Execute the command on the real system
                exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    output: stdout || '',
                    error: stderr || (error ? error.message : ''),
                    success: !error
                  }));
                });
              } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid request' }));
              }
            });
            return;
          }

          if (req.url === '/api/files' && req.method === 'GET') {
            const filesDir = path.join(process.cwd(), 'webos_files');
            if (!fs.existsSync(filesDir)) {
              fs.mkdirSync(filesDir, { recursive: true });
            }
            
            // Pre-populate default files if the directory is empty
            if (fs.readdirSync(filesDir).length === 0) {
              fs.writeFileSync(path.join(filesDir, 'Welcome.txt'), 'Welcome to macOS Web OS!\n\nThis is a premium, high-fidelity replica of macOS built from scratch using modern web technologies.\n\nExplore and enjoy: \n- Fully drag-and-drop window manager\n- Dock icon magnification and active states\n- Interactive Terminal with multiple utilities (try neofetch, theme, matrix!)\n- LocalStorage-backed Notes app\n- Working macOS calculator\n- Control Center display/volume controls\n- Custom wallpaper switching in System Settings');
              fs.writeFileSync(path.join(filesDir, 'System_Specs.txt'), 'SYSTEM SPECIFICATIONS:\n----------------------\n- Core Chip: Apple M5 Ultra (Virtual Stack)\n- Graphics Architecture: 76-core GPU Core Custom Array\n- Unified Memory: 128 GB LPDDR5 Memory Space\n- Boot Storage: Macintosh HD SSD NVMe 4TB\n- Virtual Display: Retina display 3200x1800 Super-Res\n- Clock Speed: 4.05 GHz Octa-Performance Cores');
              fs.writeFileSync(path.join(filesDir, 'Todo.txt'), 'MY OS TODO LIST:\n-----------------\n[x] Setup premium glassmorphism styling\n[x] Implement startup lock screen transition\n[x] Write startup chime sound\n[x] Finish window positioning and layers\n[ ] Create custom mini-games in Terminal\n[ ] Integrate custom weather API coordinates widget');
              fs.writeFileSync(path.join(filesDir, 'Developer_Readme.md'), '# macOS Web OS Engine v26\n\nThis engine represents modular architecture using Vanilla ES6 scripting. Global listeners manage drag/focus bounds, while separate components handle calculations, inputs, and Control Center sliders.');
            }
            
            try {
              const files = fs.readdirSync(filesDir).map(file => {
                const filePath = path.join(filesDir, file);
                const stat = fs.statSync(filePath);
                const isDir = stat.isDirectory();
                
                let content = '';
                if (!isDir) {
                  const ext = path.extname(file).toLowerCase();
                  if (['.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.bmp', '.svg'].includes(ext)) {
                    const data = fs.readFileSync(filePath);
                    const mime = ext === '.svg' ? 'image/svg+xml' : `image/${ext.slice(1)}`;
                    content = `data:${mime};base64,${data.toString('base64')}`;
                  } else if (ext === '.pdf') {
                    const data = fs.readFileSync(filePath);
                    content = `data:application/pdf;base64,${data.toString('base64')}`;
                  } else {
                    content = fs.readFileSync(filePath, 'utf-8');
                  }
                }

                return {
                  name: file,
                  isDirectory: isDir,
                  size: stat.size,
                  createdAt: stat.birthtime,
                  content: content
                };
              });
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ files }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to read directory: ' + e.message }));
            }
            return;
          }

          if (req.url === '/api/save-file' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { name, content } = JSON.parse(body);
                if (!name) throw new Error('Missing file name');

                const filesDir = path.join(process.cwd(), 'webos_files');
                if (!fs.existsSync(filesDir)) {
                  fs.mkdirSync(filesDir, { recursive: true });
                }

                const filePath = path.join(filesDir, name);
                
                if (content.startsWith('data:') && content.includes(';base64,')) {
                  const base64Data = content.split(';base64,')[1];
                  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
                } else {
                  fs.writeFileSync(filePath, content);
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }

          if (req.url === '/api/download' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { url, filename } = JSON.parse(body);
                if (!url) throw new Error('Missing URL');

                const urlParsed = new URL(url);
                const client = urlParsed.protocol === 'https:' ? https : http;

                const filesDir = path.join(process.cwd(), 'webos_files');
                if (!fs.existsSync(filesDir)) {
                  fs.mkdirSync(filesDir, { recursive: true });
                }

                // Resolve filename
                let resolvedName = filename || path.basename(urlParsed.pathname) || 'downloaded_file';
                if (!path.extname(resolvedName)) {
                  resolvedName += '.html';
                }

                const filePath = path.join(filesDir, resolvedName);

                client.get(url, (response) => {
                  if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    // Simple Redirect follow once
                    const redirectUrl = new URL(response.headers.location, url);
                    const redirectClient = redirectUrl.protocol === 'https:' ? https : http;
                    redirectClient.get(redirectUrl.href, (redirectRes) => {
                      const fileStream = fs.createWriteStream(filePath);
                      redirectRes.pipe(fileStream);
                      fileStream.on('finish', () => {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, name: resolvedName }));
                      });
                    }).on('error', (err) => {
                      res.statusCode = 500;
                      res.end(JSON.stringify({ error: err.message }));
                    });
                  } else {
                    const fileStream = fs.createWriteStream(filePath);
                    response.pipe(fileStream);
                    fileStream.on('finish', () => {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ success: true, name: resolvedName }));
                    });
                  }
                }).on('error', (err) => {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err.message }));
                });
              } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ]
});
