// macOS Desktop Right-Click Context Menu Module
import { mockFS, getNodeByPath, createNewFolderInFS } from './fs.js';
import { createWindow } from './window.js';
import { appHTMLRegistry } from './apps.js';

export function renderDesktopIcons() {
  const container = document.querySelector('.desktop-icons');
  if (!container) return;

  // Clear container
  container.innerHTML = '';

  // 1. Render default hardcoded dynamic app launchers
  const defaultLaunchers = [
    { appId: 'finder', name: 'Macintosh HD', icon: 'folder', gradient: 'finder-gradient' },
    { appId: 'terminal', name: 'Terminal', icon: 'terminal', gradient: 'terminal-gradient' },
    { appId: 'notes', name: 'Notes', icon: 'file-text', gradient: 'notes-gradient' }
  ];

  defaultLaunchers.forEach(item => {
    const iconHTML = `
      <div class="desktop-icon" data-app="${item.appId}">
        <div class="icon-img-wrapper ${item.gradient}">
          <i data-lucide="${item.icon}" class="desktop-icon-svg"></i>
        </div>
        <span class="icon-label">${item.name}</span>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', iconHTML);
  });

  // 2. Render files and folders dynamically from Desktop virtual directory
  const desktopNode = getNodeByPath(['~', 'Desktop']);
  if (desktopNode && desktopNode.children) {
    Object.entries(desktopNode.children).forEach(([name, node]) => {
      const isFile = node.type === 'file';
      const iconType = isFile ? 'file-text' : 'folder';
      
      // Separate gradients to look premium and stunning
      const bgStyle = isFile 
        ? 'background: linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 100%); border: 1px solid rgba(255,255,255,0.25);' 
        : 'background: linear-gradient(135deg, #74c7fd 0%, #1573ec 100%);';

      const fileHTML = `
        <div class="desktop-icon" data-path="Desktop/${name}" data-type="${node.type}">
          <div class="icon-img-wrapper" style="${bgStyle}">
            <i data-lucide="${iconType}" class="desktop-icon-svg" style="${isFile ? 'color: #ffffff;' : ''}"></i>
          </div>
          <span class="icon-label">${name}</span>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', fileHTML);
    });
  }

  // Generate icons via Lucide CDN
  if (window.lucide) window.lucide.createIcons();

  // Re-bind click selection and double click launches
  const icons = container.querySelectorAll('.desktop-icon');
  icons.forEach(icon => {
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

      if (path && type === 'file') {
        const node = getNodeByPath(['~', ...path.split('/')]);
        if (node) {
          // Open customized dynamic Text Reader or Image Previewer
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
          } else {
            winTitle = `Text Editor - ${path.split('/').pop()}`;
            htmlPayload = `
              <div style="padding: 18px; font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: var(--text-primary); overflow: auto; height: 100%;">
                <h4 style="margin-bottom:12px; font-weight:700; border-bottom: 0.5px solid var(--border-subtle); padding-bottom: 8px;">${path.split('/').pop()}</h4>
                <p style="white-space: pre-wrap; font-family: inherit; font-weight: 400; opacity: 0.85;">${node.content}</p>
              </div>
            `;
          }
          createWindow(viewerId, winTitle, htmlPayload, isImage ? { width: 500, height: 400 } : { width: 420, height: 280 });
        }
      } else if (path && type === 'dir') {
        // Directory, point Finder to this specific path
        window.finderStartFolder = path;
        createWindow('finder', 'Finder', appHTMLRegistry.finder, { width: 620, height: 400 });
      } else if (appId) {
        // App launch
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
          calculator: { width: 260, height: 380 },
          settings: { width: 600, height: 420 },
          games: { width: 560, height: 490 }
        };
        createWindow(appId, titleMap[appId] || 'App', appHTMLRegistry[appId], sizeMap[appId] || { width: 600, height: 400 });
      }
    });
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
