// macOS Desktop Right-Click Context Menu Module
import { mockFS, getNodeByPath, createNewFolderInFS } from './fs.js';
import { createWindow } from './window.js';
import { appHTMLRegistry } from './apps.js';

function bindDesktopIconListeners() {
  const container = document.querySelector('.desktop-icons');
  if (!container) return;

  const icons = container.querySelectorAll('.desktop-icon');
  icons.forEach(icon => {
    // Prevent double binding
    if (icon.dataset.bound) return;
    icon.dataset.bound = "true";

    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      icons.forEach(el => el.classList.remove('selected'));
      icon.classList.add('selected');
    });

    icon.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      const appId = icon.getAttribute('data-app');
      const path = icon.getAttribute('data-path');
      const type = icon.getAttribute('data-type');
      const realFile = icon.getAttribute('data-real-file');
      const content = icon.getAttribute('data-content');

      if (realFile) {
        const lowerName = realFile.toLowerCase();
        const uid = `${lowerName.replace(/[^a-z0-9]/g,'_')}_${Date.now()}`;
        if (lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg') || lowerName.endsWith('.gif') || lowerName.endsWith('.ico') || lowerName.endsWith('.webp') || lowerName.endsWith('.bmp') || lowerName.endsWith('.svg') || lowerName.endsWith('.pdf')) {
          createWindow(`preview_${uid}`, `Preview — ${realFile}`, appHTMLRegistry.preview, { width: 640, height: 520, fileContent: content, fileName: realFile });
        } else if (lowerName.endsWith('.exe') || lowerName.endsWith('.dmg') || lowerName.endsWith('.pkg') || lowerName.endsWith('.msi')) {
          createWindow(`installer_${uid}`, `App Installer`, appHTMLRegistry.installer, { width: 460, height: 380, fileName: realFile });
        }
      } else if (path && type === 'file') {
        const node = getNodeByPath(['~', ...path.split('/')]);
        if (node) {
          const viewerId = `viewer-${Date.now()}`;
          const isImage = node.content.startsWith('data:image/') || path.toLowerCase().endsWith('.png');
          
          let htmlPayload = '';
          let winTitle = '';
          
          if (isImage) {
            winTitle = `Preview - ${path.split('/').pop()}`;
            htmlPayload = `
              <div style="display:flex; justify-content:center; align-items:center; height:100%; background:#1a1a1a; padding:10px; box-sizing:border-box; border-radius: 0 0 12px 12px; overflow:hidden;">
                <img src="${node.content}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.4);" />
              </div>
            `;
            createWindow(viewerId, winTitle, htmlPayload, { width: 500, height: 400 });
          } else {
            winTitle = `Text Editor - ${path.split('/').pop()}`;
            htmlPayload = `
              <div style="padding: 18px; font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: var(--text-primary); overflow: auto; height: 100%;">
                <h4 style="margin-bottom:12px; font-weight:700; border-bottom: 0.5px solid var(--border-subtle); padding-bottom: 8px;">${path.split('/').pop()}</h4>
                <p style="white-space: pre-wrap; font-family: inherit; font-weight: 400; opacity: 0.85;">${node.content}</p>
              </div>
            `;
            createWindow(viewerId, winTitle, htmlPayload, { width: 420, height: 280 });
          }
        }
      } else if (path && type === 'dir') {
        window.finderStartFolder = path;
        createWindow('finder', 'Finder', appHTMLRegistry.finder, { width: 620, height: 400 });
      } else if (appId) {
        const titleMap = {
          finder: 'Finder',
          terminal: 'Terminal Bash',
          notes: 'Notes Memo',
          calculator: 'Calculator',
          settings: 'System Settings',
          games: 'Tahoe Arcade'
        };
        const sizeMap = {
          finder: { width: 620, height: 400 },
          terminal: { width: 550, height: 380 },
          notes: { width: 580, height: 400 },
          calculator: { width: 260, height: 420 },
          settings: { width: 600, height: 420 },
          games: { width: 560, height: 490 }
        };
        createWindow(appId, titleMap[appId] || 'App', appHTMLRegistry[appId], sizeMap[appId] || { width: 600, height: 400 });
      }
    });
  });
}

export function renderDesktopIcons() {
  const container = document.querySelector('.desktop-icons');
  if (!container) return;

  container.innerHTML = '';

  const defaultLaunchers = [
    { appId: 'finder', name: 'Macintosh HD', src: 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/devices/Mac Drive.ico' },
    { appId: 'terminal', name: 'Terminal', src: 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/terminal.ico' },
    { appId: 'notes', name: 'Notes', src: 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/accessories-text-editor.ico' }
  ];

  defaultLaunchers.forEach(item => {
    const iconHTML = `
      <div class="desktop-icon" data-app="${item.appId}">
        <img class="desktop-icon-img" src="${item.src}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: contain; margin-bottom: 2px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));" />
        <span class="icon-label">${item.name}</span>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', iconHTML);
  });

  // Render real files from disk directly onto the desktop (filtering out standard template files)
  fetch('/api/files')
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      data.files.forEach(f => {
        const name = f.name;
        if (name === 'Welcome.txt' || name === 'System_Specs.txt' || name === 'Todo.txt' || name === 'Developer_Readme.md') return;

        const lowerName = name.toLowerCase();
        let iconSrc = 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/mimes/text-x-generic.ico';
        
        if (lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg') || lowerName.endsWith('.gif') || lowerName.endsWith('.ico') || lowerName.endsWith('.webp') || lowerName.endsWith('.bmp') || lowerName.endsWith('.svg')) {
          iconSrc = 'assets/macOS 26 Tahoe Icons Resources/Variations/macOS 26 Library default/Photos@4x 1.ico';
        } else if (lowerName.endsWith('.pdf')) {
          iconSrc = 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/mimes/application-pdf.ico';
        } else if (lowerName.endsWith('.dmg') || lowerName.endsWith('.exe') || lowerName.endsWith('.pkg') || lowerName.endsWith('.msi')) {
          iconSrc = 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/utilities-terminal.ico';
        }

        const fileHTML = `
          <div class="desktop-icon" data-real-file="${name}" data-type="file" data-content="${f.content || ''}">
            <img class="desktop-icon-img" src="${iconSrc}" alt="${name}" style="width: 40px; height: 40px; object-fit: contain; margin-bottom: 2px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));" />
            <span class="icon-label">${name}</span>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', fileHTML);
      });
      bindDesktopIconListeners();
    })
    .catch(() => {
      // Fallback to virtual Desktop directory if server is offline
      const desktopNode = getNodeByPath(['~', 'Desktop']);
      if (desktopNode && desktopNode.children) {
        Object.entries(desktopNode.children).forEach(([name, node]) => {
          const isFile = node.type === 'file';
          const folderColor = localStorage.getItem('folderColor') || 'color-blue';
          const folderIcon = `assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/Folders Colors/${folderColor}/folder.ico`;
          const fileIcon = 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/mimes/text-x-generic.ico';
          const iconSrc = isFile ? fileIcon : folderIcon;

          const fileHTML = `
            <div class="desktop-icon" data-path="Desktop/${name}" data-type="${node.type}">
              <img class="desktop-icon-img" src="${iconSrc}" alt="${name}" style="width: 40px; height: 40px; object-fit: contain; margin-bottom: 2px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));" />
              <span class="icon-label">${name}</span>
            </div>
          `;
          container.insertAdjacentHTML('beforeend', fileHTML);
        });
      }
      bindDesktopIconListeners();
    });
}

export function initContextMenu() {
  const menu = document.getElementById('desktop-context-menu');
  const workspace = document.getElementById('desktop-workspace');

  if (!menu || !workspace) return;

  // Render initial dynamic desktop icons
  renderDesktopIcons();

  // Listen to filesystem changes to auto refresh desktop icons
  window.addEventListener('fs-change', () => {
    renderDesktopIcons();
  });

  // 1. Right Click Event on Desktop Workspace
  workspace.addEventListener('contextmenu', (e) => {
    // Only trigger if clicking directly on the workspace or on desktop-icons container
    const isTargetWorkspace = e.target === workspace || 
                              e.target.classList.contains('desktop-icons') || 
                              e.target.id === 'desktop-bg';

    if (!isTargetWorkspace) return;

    e.preventDefault();

    const menuWidth = 180;
    const menuHeight = 170;

    let posX = e.clientX;
    let posY = e.clientY;

    if (posX + menuWidth > window.innerWidth) {
      posX = window.innerWidth - menuWidth - 10;
    }
    if (posY + menuHeight > window.innerHeight) {
      posY = window.innerHeight - menuHeight - 10;
    }

    menu.style.left = `${posX}px`;
    menu.style.top = `${posY}px`;
    
    menu.classList.add('show');
  });

  // Hide context menu on left click anywhere
  document.addEventListener('click', () => {
    menu.classList.remove('show');
  });

  // Prevent right-click inside the context menu itself
  menu.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Bind Menu Options
  const btnNewFolder = document.getElementById('ctx-new-folder');
  const btnCleanUp = document.getElementById('ctx-clean-up');
  const btnSpotlight = document.getElementById('ctx-spotlight');
  const btnSiri = document.getElementById('ctx-siri');
  const btnWallpaper = document.getElementById('ctx-change-wallpaper');

  if (btnNewFolder) {
    btnNewFolder.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.remove('show');
      createNewFolderInFS(['~', 'Desktop']);
    });
  }

  if (btnCleanUp) {
    btnCleanUp.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.remove('show');
      
      document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.style.transform = 'scale(0.9)';
        setTimeout(() => {
          icon.style.transform = 'none';
        }, 300);
      });
    });
  }

  if (btnSpotlight) {
    btnSpotlight.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.remove('show');
      const searchTrigger = document.getElementById('spotlight-trigger');
      if (searchTrigger) searchTrigger.click();
    });
  }

  if (btnSiri) {
    btnSiri.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.remove('show');
      const siriTrigger = document.getElementById('siri-trigger');
      if (siriTrigger) siriTrigger.click();
    });
  }

  if (btnWallpaper) {
    btnWallpaper.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.remove('show');
      
      createWindow('settings', 'System Settings', appHTMLRegistry.settings, { width: 600, height: 420 });
      setTimeout(() => {
        const wallpaperTabBtn = document.querySelector('.settings-sidebar-item[data-tab="wallpaper"]');
        if (wallpaperTabBtn) {
          wallpaperTabBtn.click();
        }
      }, 400);
    });
  }
}
