// macOS Top Menu Bar & Control Center Panel Module
import { mockFS, createNewFolderInFS } from './fs.js';
import { createWindow } from './window.js';
import { appHTMLRegistry } from './apps.js';

/**
 * Initializes clock, dropdown menu closures, and Control Center handlers
 */
export function initMenu() {
  initClock();
  initDropdowns();
  initControlCenter();
  initMenuBindings();
}

/**
 * Starts the live clock update loops for both lock screen and top menu bar
 */
function initClock() {
  const menuClock = document.getElementById('menu-clock');
  const lockTime = document.getElementById('lock-time');
  const lockDate = document.getElementById('lock-date');

  function update() {
    const now = new Date();
    
    // 1. Menu Bar Clock Format (e.g. Mon May 25 3:16 PM)
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    };
    if (menuClock) {
      menuClock.textContent = now.toLocaleString('en-US', options).replace(',', '');
    }

    // 2. Lock Screen Time Format (e.g. 15:16)
    if (lockTime) {
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      lockTime.textContent = `${hh}:${mm}`;
    }

    // 3. Lock Screen Date Format (e.g. Monday, May 25)
    if (lockDate) {
      lockDate.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  update();
  setInterval(update, 1000);
}

/**
 * Manages closing dropdown menus on click outside & viewport bounds clamping
 */
function initDropdowns() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-item.has-dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = '';
      });
    }
  });

  // Close all active dropdowns when any operational dropdown item is clicked
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.dropdown-item');
    if (item && item.style.cursor !== 'default' && !item.classList.contains('wifi-network-item') && !item.classList.contains('bt-device-item') && item.id !== 'menu-wifi-settings' && item.id !== 'menu-bluetooth-settings') {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = '';
      });
    }
  });

  const dropdownHeaders = document.querySelectorAll('.menu-item.has-dropdown');
  dropdownHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      // If clicking inside the actual dropdown menu, let the item click handler run normally
      if (e.target.closest('.dropdown-menu')) {
        return;
      }
      e.stopPropagation();
      const menu = header.querySelector('.dropdown-menu');
      if (menu) {
        const isCurrentlyOpen = window.getComputedStyle(menu).display === 'block';
        
        // Close others
        document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = '');
        
        if (!isCurrentlyOpen) {
          menu.style.display = 'block';
          
          // Dynamic clamping logic to prevent menu overflow
          menu.style.left = '';
          menu.style.right = '';
          
          const isRightAligned = header.id === 'menu-wifi-trigger' || 
                                 header.id === 'menu-bluetooth-trigger' || 
                                 header.id === 'menu-battery-trigger';
          
          if (isRightAligned) {
            menu.style.left = 'auto';
            menu.style.right = '0';
          } else {
            menu.style.left = '0';
            menu.style.right = 'auto';
          }
          
          // Verify actual viewport bounding dimensions
          const rect = menu.getBoundingClientRect();
          const screenWidth = window.innerWidth;
          
          if (rect.right > screenWidth) {
            menu.style.left = 'auto';
            menu.style.right = '0';
          }
          if (rect.left < 0) {
            menu.style.left = '0';
            menu.style.right = 'auto';
          }
        } else {
          menu.style.display = 'none';
        }
      }
    });
  });
}

/**
 * Hooks up Control Center Sliders, toggles, Wi-Fi, Volume feedbacks, and Theme state swaps
 */
function initControlCenter() {
  const ccTrigger = document.getElementById('control-center-trigger');
  const ccPanel = document.getElementById('control-center-panel');

  if (!ccTrigger || !ccPanel) return;

  // Toggle Control Center Panel with Clamp Checks
  ccTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    ccPanel.classList.toggle('hidden');
    
    if (!ccPanel.classList.contains('hidden')) {
      const screenWidth = window.innerWidth;
      if (screenWidth < 360) {
        ccPanel.style.width = `${screenWidth - 20}px`;
        ccPanel.style.right = '10px';
      } else {
        ccPanel.style.width = '320px';
        ccPanel.style.right = '14px';
      }
    }
  });

  // Close Control Center when clicking outside
  document.addEventListener('click', (e) => {
    if (!ccPanel.classList.contains('hidden') && !ccPanel.contains(e.target) && !ccTrigger.contains(e.target)) {
      ccPanel.classList.add('hidden');
    }
  });

  // Connectivity Toggles (Wi-Fi Sync)
  const wifiRow = document.getElementById('cc-wifi');
  if (wifiRow) {
    wifiRow.addEventListener('click', () => {
      const icon = wifiRow.querySelector('.cc-icon-wrapper');
      const status = wifiRow.querySelector('.cc-status');
      icon.classList.toggle('active');
      const isActive = icon.classList.contains('active');
      
      status.textContent = isActive ? 'HomeNet_5G' : 'Off';
      
      const topWifiIcon = document.getElementById('menu-wifi-icon');
      if (topWifiIcon) {
        topWifiIcon.setAttribute('data-lucide', isActive ? 'wifi' : 'wifi-off');
        if (window.lucide) window.lucide.createIcons();
      }
      
      // Update checkmarks in status bar dropdown
      const wifiItems = document.querySelectorAll('.wifi-network-item');
      wifiItems.forEach(item => {
        item.classList.remove('active');
        const span = item.querySelector('span');
        if (span) span.textContent = span.textContent.replace('✓ ', '');
      });
      
      if (isActive) {
        const homeNet = document.querySelector('.wifi-network-item[data-ssid="HomeNet_5G"]');
        if (homeNet) {
          homeNet.classList.add('active');
          const span = homeNet.querySelector('span');
          if (span) span.textContent = '✓ ' + span.textContent;
        }
      }
    });
  }

  // Connectivity Toggles (Bluetooth Sync)
  const btRow = document.getElementById('cc-bluetooth');
  if (btRow) {
    btRow.addEventListener('click', () => {
      const icon = btRow.querySelector('.cc-icon-wrapper');
      icon.classList.toggle('active');
      const isActive = icon.classList.contains('active');
      
      const topBtIcon = document.getElementById('menu-bluetooth-icon');
      if (topBtIcon) {
        topBtIcon.setAttribute('data-lucide', isActive ? 'bluetooth' : 'bluetooth-off');
        if (window.lucide) window.lucide.createIcons();
      }
      
      const btItems = document.querySelectorAll('.bt-device-item');
      btItems.forEach(item => {
        const textNode = item.querySelector('span');
        const statusNode = item.querySelector('.bt-status');
        
        if (isActive) {
          if (item.dataset.device === 'airpods' || item.dataset.device === 'keyboard') {
            item.classList.add('active');
            if (textNode && !textNode.textContent.startsWith('✓')) {
              textNode.textContent = '✓ ' + textNode.textContent;
            }
            if (statusNode) statusNode.textContent = item.dataset.device === 'airpods' ? '90%' : '84%';
          }
        } else {
          item.classList.remove('active');
          if (textNode) {
            textNode.textContent = textNode.textContent.replace('✓ ', '');
          }
          if (statusNode) statusNode.textContent = 'Disconnected';
        }
      });
      
      updateControlCenterBTStatus(isActive);
    });
  }

  // Do Not Disturb Toggles
  const dndBlock = document.getElementById('cc-dnd');
  if (dndBlock) {
    dndBlock.addEventListener('click', () => {
      const icon = dndBlock.querySelector('.cc-icon-wrapper');
      const status = dndBlock.querySelector('.cc-status');
      icon.classList.toggle('active');
      status.textContent = icon.classList.contains('active') ? 'On' : 'Off';
    });
  }

  // Display Brightness Slider
  const brightnessSlider = document.getElementById('cc-brightness-slider');
  const brightnessVal = document.getElementById('cc-brightness-val');
  const brightnessOverlay = document.getElementById('brightness-overlay');

  if (brightnessSlider && brightnessOverlay) {
    brightnessSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (brightnessVal) brightnessVal.textContent = `${val}%`;
      const opacity = 1 - (val / 100);
      brightnessOverlay.style.opacity = opacity * 0.85; 
    });
  }

  // Volume Slider & Audio Click
  const volumeSlider = document.getElementById('cc-volume-slider');
  const volumeVal = document.getElementById('cc-volume-val');
  const volumeIcon = document.getElementById('cc-volume-icon');

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (volumeVal) volumeVal.textContent = `${val}%`;
      
      if (volumeIcon) {
        if (val === 0) {
          volumeIcon.setAttribute('data-lucide', 'volume-x');
        } else if (val < 40) {
          volumeIcon.setAttribute('data-lucide', 'volume');
        } else if (val < 75) {
          volumeIcon.setAttribute('data-lucide', 'volume-1');
        } else {
          volumeIcon.setAttribute('data-lucide', 'volume-2');
        }
        if (window.lucide) window.lucide.createIcons();
      }

      if (window.systemSounds) {
        window.systemSounds.setVolume(val / 100);
      }
    });

    volumeSlider.addEventListener('change', () => {
      if (window.systemSounds) {
        window.systemSounds.playVolumePop();
      }
    });
  }

  // Theme / Dark Mode toggle
  const themeToggle = document.getElementById('cc-theme-toggle');
  const themeStatus = document.getElementById('cc-theme-status');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const isCurrentlyDark = currentTheme === 'dark';
      
      const newTheme = isCurrentlyDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      
      const icon = themeToggle.querySelector('.cc-icon-wrapper');
      
      if (isCurrentlyDark) {
        icon.classList.remove('active');
        if (themeStatus) themeStatus.textContent = 'Off';
        icon.innerHTML = '<i data-lucide="sun"></i>';
      } else {
        icon.classList.add('active');
        if (themeStatus) themeStatus.textContent = 'On';
        icon.innerHTML = '<i data-lucide="moon"></i>';
      }
      
      if (window.lucide) window.lucide.createIcons();
      
      const settingsToggleInput = document.querySelector('.settings-theme-switch');
      if (settingsToggleInput) {
        settingsToggleInput.checked = !isCurrentlyDark;
      }
    });
  }
}

/**
 * Updates the Control Center Bluetooth label dynamically
 */
function updateControlCenterBTStatus(isBluetoothOn) {
  const btStatus = document.querySelector('#cc-bluetooth .cc-status');
  if (!btStatus) return;

  if (!isBluetoothOn) {
    btStatus.textContent = 'Off';
    return;
  }

  const activeCount = document.querySelectorAll('.bt-device-item.active').length;
  if (activeCount === 0) {
    btStatus.textContent = 'On';
  } else if (activeCount === 1) {
    btStatus.textContent = '1 Device';
  } else {
    btStatus.textContent = `${activeCount} Devices`;
  }
}

/**
 * Binds active click events to dropdown items inside the left and right Menu Bar status icons
 */
function initMenuBindings() {
  // 1. Clock Widgets Toggle
  const clock = document.getElementById('menu-clock');
  if (clock) {
    clock.addEventListener('click', (e) => {
      e.stopPropagation();
      const widgets = document.getElementById('desktop-widgets');
      if (widgets) {
        widgets.classList.toggle('hidden-widgets');
      }
    });
  }

  // 2. Apple Dropdown Settings Launcher
  const menuSettingsBtn = document.getElementById('menu-settings-btn');
  if (menuSettingsBtn) {
    menuSettingsBtn.addEventListener('click', () => {
      createWindow('settings', 'System Settings', appHTMLRegistry.settings, { width: 600, height: 420 });
    });
  }

  // A. File Dropdowns
  const menuNewFinder = document.getElementById('menu-new-finder');
  const menuNewFolder = document.getElementById('menu-new-folder');
  const menuCloseWindow = document.getElementById('menu-close-window');

  if (menuNewFinder) {
    menuNewFinder.addEventListener('click', () => {
      createWindow('finder', 'Finder', appHTMLRegistry.finder, { width: 620, height: 400 });
    });
  }

  if (menuNewFolder) {
    menuNewFolder.addEventListener('click', () => {
      createNewFolderInFS(['~', 'Desktop']);
    });
  }

  if (menuCloseWindow) {
    menuCloseWindow.addEventListener('click', () => {
      const activeWin = document.querySelector('.mac-window.active');
      if (activeWin) {
        const closeBtn = activeWin.querySelector('.light-close');
        if (closeBtn) closeBtn.click();
      }
    });
  }

  // B. Edit Dropdowns
  const editKeys = ['undo', 'redo', 'cut', 'copy', 'paste'];
  editKeys.forEach(key => {
    const el = document.getElementById(`menu-${key}`);
    if (el) {
      el.addEventListener('click', () => {
        // Trigger rich alert using system reader dialog
        const activeInput = document.activeElement;
        if (activeInput && (activeInput.tagName === 'INPUT' || activeInput.tagName === 'TEXTAREA')) {
          if (key === 'cut') {
            document.execCommand('cut');
          } else if (key === 'copy') {
            document.execCommand('copy');
          } else if (key === 'paste') {
            navigator.clipboard.readText().then(text => {
              activeInput.value += text;
            }).catch(() => {
              document.execCommand('paste');
            });
          }
        } else {
          alert(`${key.charAt(0).toUpperCase() + key.slice(1)} successfully executed!`);
        }
      });
    }
  });

  // C. View Dropdowns
  const menuIcons = document.getElementById('menu-view-icons');
  const menuList = document.getElementById('menu-view-list');
  const menuCleanUp = document.getElementById('menu-clean-up');

  if (menuIcons) {
    menuIcons.addEventListener('click', () => {
      alert('Desktop View: Flow Layout (Dynamic Icons Grid active)');
    });
  }
  if (menuList) {
    menuList.addEventListener('click', () => {
      alert('Desktop View: Column Grid Layout aligned');
    });
  }
  if (menuCleanUp) {
    menuCleanUp.addEventListener('click', () => {
      document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.style.transform = 'scale(0.9)';
        setTimeout(() => { icon.style.transform = 'none'; }, 300);
      });
    });
  }

  // D. Go Dropdowns
  const menuGoApps = document.getElementById('menu-go-apps');
  const menuGoDocs = document.getElementById('menu-go-docs');
  const menuGoDownloads = document.getElementById('menu-go-downloads');

  if (menuGoApps) {
    menuGoApps.addEventListener('click', () => {
      createWindow('games', 'Tahoe Arcade', appHTMLRegistry.games, { width: 560, height: 490 });
    });
  }

  if (menuGoDocs) {
    menuGoDocs.addEventListener('click', () => {
      window.finderStartFolder = 'Documents';
      createWindow('finder', 'Finder', appHTMLRegistry.finder, { width: 620, height: 400 });
    });
  }

  if (menuGoDownloads) {
    menuGoDownloads.addEventListener('click', () => {
      window.finderStartFolder = 'Downloads';
      createWindow('finder', 'Finder', appHTMLRegistry.finder, { width: 620, height: 400 });
    });
  }

  // E. Window Dropdowns
  const menuMin = document.getElementById('menu-window-minimize');
  const menuZoom = document.getElementById('menu-window-zoom');
  const menuFront = document.getElementById('menu-window-front');

  if (menuMin) {
    menuMin.addEventListener('click', () => {
      const activeWin = document.querySelector('.mac-window.active');
      if (activeWin) {
        const minBtn = activeWin.querySelector('.light-minimize');
        if (minBtn) minBtn.click();
      }
    });
  }

  if (menuZoom) {
    menuZoom.addEventListener('click', () => {
      const activeWin = document.querySelector('.mac-window.active');
      if (activeWin) {
        const zoomBtn = activeWin.querySelector('.light-zoom');
        if (zoomBtn) zoomBtn.click();
      }
    });
  }

  if (menuFront) {
    menuFront.addEventListener('click', () => {
      document.querySelectorAll('.mac-window').forEach(win => {
        win.dispatchEvent(new Event('pointerdown'));
      });
    });
  }

  // F. Help Dropdowns
  const menuHelp = document.getElementById('menu-help-docs');
  const menuFeedback = document.getElementById('menu-help-feedback');

  if (menuHelp) {
    menuHelp.addEventListener('click', () => {
      createWindow('safari', 'Safari Browser', appHTMLRegistry.safari, { width: 720, height: 480 });
      setTimeout(() => {
        const addressInput = document.querySelector('#safari-address-input');
        if (addressInput) {
          addressInput.value = 'https://wikipedia.org?q=macos';
          addressInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        }
      }, 400);
    });
  }

  if (menuFeedback) {
    menuFeedback.addEventListener('click', () => {
      createWindow('notes', 'Notes Memo', appHTMLRegistry.notes, { width: 580, height: 400 });
      setTimeout(() => {
        const notesText = document.querySelector('#notes-text-area');
        const notesNew = document.querySelector('#notes-new-btn');
        if (notesNew) notesNew.click();
        setTimeout(() => {
          if (notesText) {
            notesText.value = "macOS Tahoe Feedback Report:\n--------------------------\n1. Dynamic glass refractions are: Excellent\n2. Apple Intelligence is: Shimmering\n3. Skiing Arcade highscore: [Insert score]\n\nComments: [Type your feedback here!]";
            notesText.dispatchEvent(new Event('input'));
          }
        }, 300);
      }, 400);
    });
  }

  // G. Wi-Fi and Battery Settings dropdown bindings
  const wifiSettingsBtn = document.getElementById('menu-wifi-settings');
  const batterySettingsBtn = document.getElementById('menu-battery-settings');

  if (wifiSettingsBtn) {
    wifiSettingsBtn.addEventListener('click', () => {
      createWindow('settings', 'System Settings', appHTMLRegistry.settings, { width: 600, height: 420 });
    });
  }

  if (batterySettingsBtn) {
    batterySettingsBtn.addEventListener('click', () => {
      createWindow('settings', 'System Settings', appHTMLRegistry.settings, { width: 600, height: 420 });
    });
  }

  // H. Status Bar Wi-Fi networks switcher
  const wifiItems = document.querySelectorAll('.wifi-network-item');
  wifiItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const ssid = item.dataset.ssid;
      
      // Update checkmarks in status bar dropdown
      wifiItems.forEach(el => {
        el.classList.remove('active');
        const span = el.querySelector('span');
        if (span) span.textContent = span.textContent.replace('✓ ', '');
      });
      
      item.classList.add('active');
      const span = item.querySelector('span');
      if (span) span.textContent = '✓ ' + span.textContent;
      
      // Enable Control Center Wifi row if not active
      const wifiCCRow = document.getElementById('cc-wifi');
      if (wifiCCRow) {
        const ccIcon = wifiCCRow.querySelector('.cc-icon-wrapper');
        const ccStatus = wifiCCRow.querySelector('.cc-status');
        
        if (ccIcon) ccIcon.classList.add('active');
        if (ccStatus) ccStatus.textContent = ssid;
      }
      
      const topWifiIcon = document.getElementById('menu-wifi-icon');
      if (topWifiIcon) {
        topWifiIcon.setAttribute('data-lucide', 'wifi');
        if (window.lucide) window.lucide.createIcons();
      }
      
      // Close dropdown
      document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = '');
    });
  });

  // I. Status Bar Bluetooth device connection switcher
  const btItems = document.querySelectorAll('.bt-device-item');
  btItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Verify if Bluetooth is turned on in Control Center first
      const btCCRow = document.getElementById('cc-bluetooth');
      const isBTActive = btCCRow ? btCCRow.querySelector('.cc-icon-wrapper').classList.contains('active') : true;
      
      if (!isBTActive) {
        alert('Bluetooth is turned off! Enable Bluetooth in the Control Center to connect devices.');
        return;
      }
      
      item.classList.toggle('active');
      const isActive = item.classList.contains('active');
      
      const textNode = item.querySelector('span');
      const statusNode = item.querySelector('.bt-status');
      
      if (isActive) {
        if (textNode && !textNode.textContent.startsWith('✓')) {
          textNode.textContent = '✓ ' + textNode.textContent;
        }
        if (statusNode) {
          statusNode.textContent = item.dataset.device === 'airpods' ? '90%' : item.dataset.device === 'keyboard' ? '84%' : '67%';
        }
      } else {
        if (textNode) {
          textNode.textContent = textNode.textContent.replace('✓ ', '');
        }
        if (statusNode) {
          statusNode.textContent = 'Disconnected';
        }
      }
      
      updateControlCenterBTStatus(true);
    });
  });

  const btSettingsBtn = document.getElementById('menu-bluetooth-settings');
  if (btSettingsBtn) {
    btSettingsBtn.addEventListener('click', () => {
      createWindow('settings', 'System Settings', appHTMLRegistry.settings, { width: 600, height: 420 });
    });
  }
}
