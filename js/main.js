// macOS Main Bootstrapper & Audio Synthesizer Engine
import { createWindow, restoreWindow, closeWindow } from './window.js';
import { initMenu } from './menu.js';
import { appHTMLRegistry, bindAppLogic, syncInstalledApps } from './apps.js';
import { initSpotlight } from './spotlight.js';
import { initSiri } from './siri.js';
import { initContextMenu } from './contextmenu.js';

// ==========================================
// 1. NATIVE WEB AUDIO SYNTHESIZERS (Premium details)
// ==========================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.masterVolume = 0.7; // Controlled by the volume slider
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  setVolume(percentage) {
    this.masterVolume = percentage;
  }

  /**
   * Synthesizes the classic iconic macOS Startup Chime
   * Layers a warm, rich open chord (F2, C3, F3, C4, F4, A4) with a long decay
   */
  playStartupChime() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    
    // Master gain node
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(this.masterVolume * 0.8, now + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
    
    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 4.0);

    masterGain.connect(filter);
    filter.connect(this.ctx.destination);

    // Harmonic Chord frequencies (F-Major Root with rich fifths)
    const freqs = [
      { f: 87.31, type: 'triangle', gain: 0.8 },  // F2
      { f: 130.81, type: 'triangle', gain: 0.7 }, // C3
      { f: 174.61, type: 'sine', gain: 0.6 },     // F3
      { f: 261.63, type: 'sine', gain: 0.5 },     // C4
      { f: 349.23, type: 'sawtooth', gain: 0.15 }, // F4 (adds warmth)
      { f: 440.00, type: 'sine', gain: 0.35 }     // A4 (adds resolution)
    ];

    freqs.forEach(item => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = item.type;
      osc.frequency.setValueAtTime(item.f, now);

      // Add a tiny detune to give a rich, analog chorus texture
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      oscGain.gain.setValueAtTime(item.gain * 0.12, now);
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      
      osc.start(now);
      osc.stop(now + 5.0);
    });
  }

  /**
   * Plays a crisp macOS volume feedback tick
   */
  playVolumePop() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    
    // Very fast attack and decay envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(this.masterVolume * 0.4, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Synthesizes a genie window-minimize swoosh sound
   */
  playMinimize() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // Frequency pitch bend sweep going down (swoosh)
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(this.masterVolume * 0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Plays a deep, resonant basso error sound chime (macOS Error)
   */
  playError() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.2);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(this.masterVolume * 0.6, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }
}

// Bind synthesizer globally
window.systemSounds = new AudioSynthesizer();

// ==========================================
// 2. BOOTLOADER SEQUENCE
// ==========================================
function startBootSequence() {
  const bootScreen = document.getElementById('boot-screen');
  const progressBar = document.getElementById('boot-progress');
  const lockScreen = document.getElementById('lock-screen');

  if (!bootScreen || !progressBar) return;

  let progress = 0;
  
  // Fill loading bar dynamically
  const interval = setInterval(() => {
    // Variable step sizes for realistic loading speed shifts
    progress += Math.random() * 8 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Play warm startup chime
      window.systemSounds.playStartupChime();

      setTimeout(() => {
        // Fade out Boot screen, reveal lock screen
        bootScreen.style.opacity = '0';
        setTimeout(() => {
          bootScreen.classList.add('hidden');
          if (lockScreen) {
            lockScreen.classList.remove('hidden');
            lockScreen.style.opacity = '1';
            // Auto focus lock input
            const psw = document.getElementById('lock-password');
            if (psw) psw.focus();
          }
        }, 800);
      }, 500);
    }
    progressBar.style.width = `${progress}%`;
  }, 100);
}

// ==========================================
// 3. LOCK SCREEN AUTHENTICATION
// ==========================================
function initLockScreen() {
  const lockScreen = document.getElementById('lock-screen');
  const lockForm = document.getElementById('lock-form');
  const lockPassword = document.getElementById('lock-password');
  const desktop = document.getElementById('desktop-environment');

  if (!lockForm || !lockScreen || !desktop) return;

  lockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (lockPassword.value === 'rnkv') {
      lockPassword.blur();
      
      // Play transition animations
      lockScreen.style.transform = 'translateY(-100vh)';
      lockScreen.style.opacity = '0';
      
      desktop.classList.remove('hidden');
      
      // Force Lucide icons generation for desktop viewports
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        lockScreen.classList.add('hidden');
      }, 600);
    } else {
      // macOS Style wrong password shake animation
      const lockProfile = document.querySelector('.lock-profile');
      if (lockProfile) {
        lockProfile.classList.add('lock-shake');
        
        // Play classic synthesized basso error sound
        if (window.systemSounds) {
          window.systemSounds.playError();
        }
        
        setTimeout(() => {
          lockProfile.classList.remove('lock-shake');
        }, 400);
      }
      
      // Reset input fields
      lockPassword.value = '';
      lockPassword.focus();
    }
  });
}

// ==========================================
// 4. PARABOLIC DOCK MAGNIFICATION (Mac Proximity scale)
// ==========================================
function initDockMagnification() {
  const dock = document.getElementById('mac-dock');
  const items = dock.querySelectorAll('.dock-item-wrapper');

  if (!dock) return;

  dock.addEventListener('pointermove', (e) => {
    const mouseX = e.clientX;

    items.forEach(wrapper => {
      const icon = wrapper.querySelector('.dock-item');
      const rect = icon.getBoundingClientRect();
      const iconCenter = rect.left + rect.width / 2;
      
      // Calculate distance between mouse and icon center
      const dist = Math.abs(mouseX - iconCenter);
      
      // Parabolic scale range limits: 150px proximity boundaries
      const maxDistance = 150;
      let scale = 1.0;

      if (dist < maxDistance) {
        // Smooth cosine interpolation mapping values to 1.55x scale peak
        const ratio = (maxDistance - dist) / maxDistance;
        scale = 1.0 + (ratio * 0.55);
      }

      icon.style.width = `${scale * 40}px`;
      icon.style.height = `${scale * 40}px`;
      icon.style.transform = `translateY(${-((scale - 1.0) * 12)}px)`;
    });
  });

  dock.addEventListener('pointerleave', () => {
    // Reset all items back to standard ratios
    items.forEach(wrapper => {
      const icon = wrapper.querySelector('.dock-item');
      icon.style.width = '40px';
      icon.style.height = '40px';
      icon.style.transform = 'none';
    });
  });
}

// ==========================================
// 5. WINDOW LAUNCHERS & DESKTOP EVENT HOOKS
// ==========================================
function initAppLaunchers() {
  // A. Dock Items Launches
  const dockItems = document.querySelectorAll('.dock-item-wrapper');
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const appId = item.dataset.appApp || item.getAttribute('data-app');
      launchApp(appId);
    });
  });

  // B. Desktop Shortcut Icons
  const desktopIcons = document.querySelectorAll('.desktop-icon');
  desktopIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      desktopIcons.forEach(el => el.classList.remove('selected'));
      icon.classList.add('selected');
    });

    icon.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      const appId = icon.dataset.app;
      launchApp(appId);
    });
  });

  // Clear selections when clicking background
  document.getElementById('desktop-workspace').addEventListener('click', () => {
    desktopIcons.forEach(el => el.classList.remove('selected'));
  });

  // Listen to custom Window launch event
  window.addEventListener('app-launched', (e) => {
    const { appId, element } = e.detail;
    
    // Bind logic routines to spawned layouts
    bindAppLogic(appId, element);
    
    // Trigger Dock launch bounce
    const dockItem = document.querySelector(`.dock-item-wrapper[data-app="${appId}"]`);
    if (dockItem) {
      const icon = dockItem.querySelector('.dock-item');
      icon.classList.add('dock-bounce');
      setTimeout(() => {
        icon.classList.remove('dock-bounce');
      }, 1200);
    }
  });
}

/**
 * Direct launch orchestrator for applications
 * Creates dynamic window structures or restores minimized states
 */
function launchApp(appId) {
  if (!appHTMLRegistry[appId]) return;

  const titleMap = {
    finder: 'Finder',
    safari: 'Safari Browser',
    terminal: 'Terminal Bash',
    notes: 'Notes Memo',
    calculator: 'Calculator',
    settings: 'System Settings',
    games: 'Tahoe Arcade',
    appstore: 'App Store',
    paint: 'Paint Sketchpad',
    calendar: 'Calendar',
    timer: 'Timer & Clock',
    camera: 'FaceTime Camera'
  };

  const sizeMap = {
    finder: { width: 620, height: 400 },
    safari: { width: 720, height: 480 },
    terminal: { width: 550, height: 380 },
    notes: { width: 580, height: 400 },
    calculator: { width: 260, height: 380 },
    settings: { width: 600, height: 420 },
    games: { width: 560, height: 490 },
    appstore: { width: 680, height: 460 },
    paint: { width: 640, height: 480 },
    calendar: { width: 500, height: 400 },
    timer: { width: 340, height: 420 },
    camera: { width: 600, height: 460 }
  };

  createWindow(
    appId, 
    titleMap[appId] || 'App', 
    appHTMLRegistry[appId], 
    sizeMap[appId] || { width: 600, height: 400 }
  );
}

// Expose launch orchestrator globally
window.launchSystemApp = launchApp;

// ==========================================
// 6. APPLE STATIC POPUPS (About this Mac / Sleep)
// ==========================================
function initAppleDropdownModal() {
  const modal = document.getElementById('about-mac-modal');
  const btn = document.getElementById('about-mac-btn');
  const close = document.getElementById('about-close-btn');

  if (btn && modal && close) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      modal.classList.remove('hidden');
      
      // Close apple dropdown list
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = '';
      });
    });

    close.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // Close on backdrop overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }

  // System restart action links
  const lockBtn = document.getElementById('menu-lock-btn');
  const sleepBtn = document.getElementById('menu-sleep-btn');
  const restartBtn = document.getElementById('menu-restart-btn');

  const lockScreen = document.getElementById('lock-screen');
  const desktop = document.getElementById('desktop-environment');

  const lockRestart = document.getElementById('lock-restart-btn');
  const lockSleep = document.getElementById('lock-sleep-btn');

  function returnToLock() {
    if (desktop && lockScreen) {
      desktop.classList.add('hidden');
      lockScreen.classList.remove('hidden');
      lockScreen.style.transform = 'translateY(0)';
      lockScreen.style.opacity = '1';
      const psw = document.getElementById('lock-password');
      if (psw) {
        psw.value = '';
        psw.focus();
      }
    }
  }

  if (lockBtn) lockBtn.addEventListener('click', returnToLock);
  if (sleepBtn) sleepBtn.addEventListener('click', returnToLock);
  if (lockSleep) lockSleep.addEventListener('click', returnToLock);

  function restartSystem() {
    location.reload();
  }

  if (restartBtn) restartBtn.addEventListener('click', restartSystem);
  if (lockRestart) lockRestart.addEventListener('click', restartSystem);
}

// ==========================================
// 6.5 DESKTOP WIDGETS TICKERS
// ==========================================
function initDesktopWidgets() {
  const cpuBar = document.getElementById('widget-cpu-bar');
  const cpuText = document.getElementById('widget-cpu-text');
  const gpuBar = document.getElementById('widget-gpu-bar');
  const gpuText = document.getElementById('widget-gpu-text');
  const ramBar = document.getElementById('widget-ram-bar');
  const ramText = document.getElementById('widget-ram-text');

  const digiTime = document.getElementById('widget-digital-time');
  const digiSec = document.getElementById('widget-digital-sec');
  const dateStr = document.getElementById('widget-date-str');

  function updateWidgets() {
    const now = new Date();
    
    // 1. Clock Updates
    if (digiTime) {
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      digiTime.textContent = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    }
    if (digiSec) {
      digiSec.textContent = `${String(now.getSeconds()).padStart(2, '0')}s`;
    }
    if (dateStr) {
      dateStr.textContent = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }

    // 2. CPU/GPU Fluctuations
    if (cpuBar && cpuText) {
      const cpuVal = Math.floor(6 + Math.random() * 12);
      cpuBar.style.width = `${cpuVal}%`;
      cpuText.textContent = `${cpuVal}%`;
    }
    if (gpuBar && gpuText) {
      const gpuVal = Math.floor(12 + Math.random() * 18);
      gpuBar.style.width = `${gpuVal}%`;
      gpuText.textContent = `${gpuVal}%`;
    }
    if (ramBar && ramText) {
      const ramVal = Math.floor(42 + Math.random() * 3);
      ramBar.style.width = `${ramVal}%`;
      ramText.textContent = `${ramVal}%`;
    }
  }

  updateWidgets();
  setInterval(updateWidgets, 1000);
}

// ==========================================
// 7. INITIATE ENGINE ON LOAD
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  startBootSequence();
  initLockScreen();

  // Render Lucide icons immediately so the lock screen is populated
  if (window.lucide) window.lucide.createIcons();

  // Initialize core OS elements ONCE during DOM content load to prevent listener duplication!
  initMenu();
  initDockMagnification();
  initAppLaunchers();
  syncInstalledApps();
  initAppleDropdownModal();
  initDesktopWidgets();
  initSpotlight();
  initSiri();
  initContextMenu();
});
