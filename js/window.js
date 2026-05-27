// macOS Window Manager Module

let zIndexCounter = 1000;
const openWindows = new Map(); // Keep track of open windows: appId -> DOM element

// Offset multiplier to stagger new windows
let staggerCounter = 0;

/**
 * Focuses a specific window DOM element, updating its Z-index and active styling
 * @param {HTMLElement} windowEl 
 */
export function focusWindow(windowEl) {
  // Reset active classes
  document.querySelectorAll('.mac-window').forEach(el => {
    el.classList.remove('active');
  });
  
  // Bring to front
  zIndexCounter += 2;
  windowEl.style.zIndex = zIndexCounter;
  windowEl.classList.add('active');
  
  // Update top Menu Bar app name display
  const appId = windowEl.dataset.appId;
  const activeAppDisplay = document.getElementById('active-app-display');
  if (activeAppDisplay && appId) {
    const formattedName = appId.charAt(0).toUpperCase() + appId.slice(1);
    activeAppDisplay.textContent = formattedName;
  }
}

/**
 * Creates and appends a new macOS glassmorphic window to the desktop
 * @param {string} appId - Identifier (e.g. 'finder', 'safari', 'terminal')
 * @param {string} title - Display header text
 * @param {string} contentHTML - Inner content payload
 * @param {object} options - Sizing guidelines { width, height }
 */
export function createWindow(appId, title, contentHTML, options = {}) {
  // Check if window is already open
  if (openWindows.has(appId)) {
    const existingWindow = openWindows.get(appId);
    if (existingWindow.classList.contains('minimized')) {
      restoreWindow(appId);
    } else {
      focusWindow(existingWindow);
    }
    return;
  }

  const container = document.getElementById('window-container');
  if (!container) return;

  const w = options.width || 640;
  const h = options.height || 420;

  // Stagger calculations
  staggerCounter = (staggerCounter + 1) % 6;
  const staggerOffset = staggerCounter * 25;
  const startX = Math.min(window.innerWidth - w - 40, 100 + staggerOffset);
  const startY = Math.min(window.innerHeight - h - 120, 80 + staggerOffset);

  // 1. Create window DOM shell
  const win = document.createElement('div');
  win.className = 'mac-window active';
  win.dataset.appId = appId;
  win.style.width = `${w}px`;
  win.style.height = `${h}px`;
  win.style.left = `${startX}px`;
  win.style.top = `${startY}px`;
  win.style.zIndex = ++zIndexCounter;

  win.innerHTML = `
    <div class="window-header">
      <div class="traffic-lights">
        <button class="light light-close" title="Close">
          <svg viewBox="0 0 10 10"><path d="M1 1 L9 9 M9 1 L1 9" stroke="#500000" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <button class="light light-minimize" title="Minimize">
          <svg viewBox="0 0 10 10"><line x1="1" y1="5" x2="9" y2="5" stroke="#505000" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
        <button class="light light-zoom" title="Zoom">
          <svg viewBox="0 0 10 10"><path d="M1 9 L9 1 M9 1 L4 1 M9 1 L9 6" stroke="#004000" stroke-width="1.5" stroke-linecap="round"/><path d="M9 1 L1 9 M1 9 L6 9 M1 9 L1 4" stroke="#004000" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <span class="window-title">${title}</span>
    </div>
    <div class="window-content">
      ${contentHTML}
    </div>
  `;

  container.appendChild(win);
  openWindows.set(appId, win);

  // Copy extra options onto dataset (e.g. fileContent, fileName for Preview/Installer)
  Object.entries(options).forEach(([key, val]) => {
    if (key !== 'width' && key !== 'height') {
      win.dataset[key] = val;
    }
  });

  // Focus immediately
  focusWindow(win);

  // Hook Dock active indicator
  const indicator = document.getElementById(`ind-${appId}`);
  if (indicator) {
    indicator.classList.add('active');
  }

  // 2. Attach Event Handlers
  const header = win.querySelector('.window-header');
  const closeBtn = win.querySelector('.light-close');
  const minBtn = win.querySelector('.light-minimize');
  const zoomBtn = win.querySelector('.light-zoom');

  // Window Focus Click
  win.addEventListener('pointerdown', () => {
    focusWindow(win);
  });

  // Stop dragging click-eating on traffic lights
  const trafficContainer = win.querySelector('.traffic-lights');
  if (trafficContainer) {
    trafficContainer.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
    });
  }

  // Close Operation
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeWindow(appId);
  });

  // Minimize Operation
  minBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    minimizeWindow(appId);
  });

  // Zoom/Maximize Toggle
  zoomBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMaximize(appId);
  });

  // Double Click Header to Maximize
  header.addEventListener('dblclick', () => {
    toggleMaximize(appId);
  });

  // Drag and Drop Logic
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener('pointerdown', (e) => {
    if (win.classList.contains('maximized')) return;
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    header.setPointerCapture(e.pointerId);
  });

  header.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    
    // Bounds clamping: Keep header accessible
    const nextX = e.clientX - offsetX;
    const nextY = e.clientY - offsetY;

    const minX = -win.offsetWidth + 100;
    const maxX = window.innerWidth - 100;
    const minY = 25; // Top menu bar height
    const maxY = window.innerHeight - 80;

    win.style.left = `${Math.max(minX, Math.min(maxX, nextX))}px`;
    win.style.top = `${Math.max(minY, Math.min(maxY, nextY))}px`;
  });

  header.addEventListener('pointerup', (e) => {
    if (isDragging) {
      isDragging = false;
      header.releasePointerCapture(e.pointerId);
    }
  });

  // Call app specific logic bindings if any
  window.dispatchEvent(new CustomEvent('app-launched', { detail: { appId, element: win } }));
  
  return win;
}

/**
 * Closes and deletes the target app window
 * @param {string} appId 
 */
export function closeWindow(appId) {
  if (!openWindows.has(appId)) return;
  const win = openWindows.get(appId);
  
  win.style.transform = 'scale(0.85)';
  win.style.opacity = '0';
  
  setTimeout(() => {
    win.remove();
    openWindows.delete(appId);
    
    const indicator = document.getElementById(`ind-${appId}`);
    if (indicator) {
      indicator.classList.remove('active');
    }
  }, 200);
}

/**
 * Minimizes a window cleanly into the dock coordinates
 * @param {string} appId 
 */
export function minimizeWindow(appId) {
  if (!openWindows.has(appId)) return;
  const win = openWindows.get(appId);
  
  // Play dynamic minimize click sound if enabled
  if (window.systemSounds) {
    window.systemSounds.playMinimize();
  }

  win.classList.add('minimized');
}

/**
 * Restores a minimized window from the dock
 * @param {string} appId 
 */
export function restoreWindow(appId) {
  if (!openWindows.has(appId)) return;
  const win = openWindows.get(appId);
  
  win.classList.remove('minimized');
  focusWindow(win);
}

/**
 * Toggles a window between standard bounds and maximized desktop bounds
 * @param {string} appId 
 */
export function toggleMaximize(appId) {
  if (!openWindows.has(appId)) return;
  const win = openWindows.get(appId);
  win.classList.toggle('maximized');
}
