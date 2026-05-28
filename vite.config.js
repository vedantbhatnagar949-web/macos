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

          if (req.url.startsWith('/api/proxy') && (req.method === 'GET' || req.method === 'POST')) {
            (async () => {
              try {
                const urlObj = new URL(req.url, `http://${req.headers.host}`);
                const targetUrlStr = urlObj.searchParams.get('url');
                if (!targetUrlStr) {
                  res.statusCode = 400;
                  res.end('Missing url parameter');
                  return;
                }

                const targetUrl = new URL(targetUrlStr);
                
                let requestOptions = {
                  method: req.method,
                  headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                  }
                };

                // Stream body for POST requests
                if (req.method === 'POST') {
                  const bodyBuffer = await new Promise((resolve, reject) => {
                    let chunks = [];
                    req.on('data', chunk => chunks.push(chunk));
                    req.on('end', () => resolve(Buffer.concat(chunks)));
                    req.on('error', err => reject(err));
                  });
                  
                  requestOptions.body = bodyBuffer;
                  const contentType = req.headers['content-type'];
                  if (contentType) {
                    requestOptions.headers['Content-Type'] = contentType;
                  }
                }

                const response = await fetch(targetUrl.href, requestOptions);
                const contentType = response.headers.get('content-type') || '';

                if (contentType.includes('text/html')) {
                  let html = await response.text();
                  const finalTargetUrl = response.url || targetUrl.href;

                  // Rewrite meta-refresh tags to route through proxy
                  html = html.replace(/<meta\s+http-equiv=["']?refresh["']?\s+content=["']?(\d+);\s*url=([^"'>\s]+)["']?/gi, (match, delay, url) => {
                    try {
                      let cleanUrl = url.trim().replace(/^['"]|['"]$/g, '');
                      const resolvedUrl = new URL(cleanUrl, finalTargetUrl).href;
                      return `<meta http-equiv="refresh" content="${delay}; url=/api/proxy?url=${encodeURIComponent(resolvedUrl)}">`;
                    } catch (e) {
                      return match;
                    }
                  });

                  // Inject base tag and navigation interceptor script
                  const baseTag = `<base href="${finalTargetUrl}">`;
                  const interceptScript = `
                    <script>
                      (function() {
                        var originalUrl = ${JSON.stringify(finalTargetUrl)};
                        
                        // Intercept link clicks in capturing phase
                        document.addEventListener('click', function(e) {
                          var target = e.target.closest('a');
                          if (target) {
                            var href = target.getAttribute('href');
                            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                              e.preventDefault();
                              e.stopPropagation();
                              try {
                                var resolvedUrl = new URL(href, originalUrl).href;
                                
                                // Extract destination URL from DuckDuckGo's redirect parameters (prevents 400 Bad Request blockers)
                                var urlObj = new URL(resolvedUrl);
                                var uddg = urlObj.searchParams.get('uddg');
                                if (uddg) {
                                  resolvedUrl = uddg;
                                }
                                
                                window.location.href = window.location.origin + '/api/proxy?url=' + encodeURIComponent(resolvedUrl);
                              } catch (err) {
                                console.error(err);
                              }
                            }
                          }
                        }, true);

                        // Intercept form submissions in capturing phase
                        document.addEventListener('submit', function(e) {
                          var form = e.target;
                          var action = form.getAttribute('action') || '';
                          var method = (form.getAttribute('method') || 'GET').toUpperCase();
                          
                          try {
                            var resolvedUrl = new URL(action, originalUrl).href;
                          } catch (err) {
                            console.error(err);
                            return;
                          }
                          
                          e.preventDefault();
                          e.stopPropagation();
                          
                          var params = new URLSearchParams();
                          var inputs = form.querySelectorAll('input, select, textarea');
                          for (var i = 0; i < inputs.length; i++) {
                            var input = inputs[i];
                            if (input.name) {
                              params.append(input.name, input.value);
                            }
                          }
                          
                          if (method === 'GET') {
                            var finalUrl = resolvedUrl.split('?')[0] + '?' + params.toString();
                            window.location.href = window.location.origin + '/api/proxy?url=' + encodeURIComponent(finalUrl);
                          } else {
                            // Handle POST form submission via proxy
                            var proxyForm = document.createElement('form');
                            proxyForm.method = 'POST';
                            proxyForm.action = window.location.origin + '/api/proxy?url=' + encodeURIComponent(resolvedUrl);
                            
                            for (var i = 0; i < inputs.length; i++) {
                              var input = inputs[i];
                              if (input.name) {
                                var clone = document.createElement('input');
                                clone.type = 'hidden';
                                clone.name = input.name;
                                clone.value = input.value;
                                proxyForm.appendChild(clone);
                              }
                            }
                            document.body.appendChild(proxyForm);
                            proxyForm.submit();
                            document.body.removeChild(proxyForm);
                          }
                        }, true);
                      })();
                    </script>
                  `;

                  // Insert into head
                  if (html.includes('<head>')) {
                    html = html.replace('<head>', `<head>${baseTag}${interceptScript}`);
                  } else if (html.includes('<HEAD>')) {
                    html = html.replace('<HEAD>', `<HEAD>${baseTag}${interceptScript}`);
                  } else {
                    html = baseTag + interceptScript + html;
                  }

                  // Set headers and respond
                  res.setHeader('Content-Type', 'text/html; charset=utf-8');
                  res.end(html);
                } else {
                  // Redirect non-html requests directly to the target asset
                  res.writeHead(302, { 'Location': targetUrl.href });
                  res.end();
                }
              } catch (err) {
                res.statusCode = 500;
                res.end('Proxy Error: ' + err.message);
              }
            })();
            return;
          }

          next();
        });
      }
    }
  ]
});
