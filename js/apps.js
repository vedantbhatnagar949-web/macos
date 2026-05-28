// macOS Applications Logic & Template Registry
import { mockFS, getNodeByPath } from './fs.js';

// ==========================================
// 1. APP HTML STRUCTURES REGISTRY
// ==========================================
export const appHTMLRegistry = {

  finder: `
    <div class="finder-layout">
      <aside class="finder-sidebar">
        <span class="sidebar-section-title">Favorites</span>
        <div class="sidebar-list">
          <div class="sidebar-item active" data-folder="Desktop">
            <i data-lucide="monitor"></i>
            <span>Desktop</span>
          </div>
          <div class="sidebar-item" data-folder="Documents">
            <i data-lucide="file-text"></i>
            <span>Documents</span>
          </div>
          <div class="sidebar-item" data-folder="Downloads">
            <i data-lucide="download"></i>
            <span>Downloads</span>
          </div>
          <div class="sidebar-item" data-folder="System">
            <i data-lucide="cpu"></i>
            <span>System</span>
          </div>
        </div>
      </aside>
      <div class="finder-main" style="flex-grow: 1; display: flex; flex-direction: column;">
        <div class="finder-toolbar" style="height: 38px; border-bottom: 0.5px solid var(--border-subtle); display: flex; align-items: center; padding: 0 16px; gap: 14px; background: rgba(0,0,0,0.01);">
          <button class="finder-nav-btn" id="finder-back-btn" style="background: none; border: none; color: var(--text-primary); cursor: pointer; display: flex; align-items: center; opacity: 0.35;">
            <i data-lucide="chevron-left" style="width: 16px; height: 16px;"></i>
          </button>
          <div class="finder-breadcrumbs" id="finder-path" style="font-size: 11.5px; font-weight: 600; opacity: 0.85; display: flex; align-items: center; gap: 4px;">
            <span>Macintosh HD</span>
          </div>
        </div>
        <main class="finder-grid" id="finder-grid-files" style="flex-grow: 1; overflow: auto; padding: 20px;">
          <!-- Rendered dynamically -->
        </main>
      </div>
    </div>
  `,

  safari: `
    <div class="safari-layout">
      <div class="safari-toolbar">
        <button class="safari-nav-btn" id="safari-back-btn" title="Back">
          <i data-lucide="chevron-left"></i>
        </button>
        <button class="safari-nav-btn" id="safari-forward-btn" title="Forward" style="opacity: 0.35;">
          <i data-lucide="chevron-right"></i>
        </button>
        <button class="safari-nav-btn" id="safari-home-btn" title="Home">
          <i data-lucide="home"></i>
        </button>
        <div class="safari-address-bar" style="position: relative; display: flex; align-items: center; width: 100%;">
          <i data-lucide="lock" style="color: #27c93f; min-width: 12px; min-height: 12px; margin-right: 4px;"></i>
          <input type="text" id="safari-address-input" value="safari://home" placeholder="Search Google or enter Website URL" style="flex-grow: 1; border: none; background: none; outline: none; color: var(--text-primary);">
          <button id="safari-reload-btn" title="Reload Page" style="background: none; border: none; color: var(--text-primary); cursor: pointer; opacity: 0.65; display: flex; align-items: center; padding: 0 4px; transition: opacity 0.15s ease; margin-right: 4px;">
            <i data-lucide="rotate-cw" style="width: 13px; height: 13px;"></i>
          </button>
          <button id="safari-external-btn" title="Open in New Tab (Fixes Google Sign-in / CSP blocks)" style="background: none; border: none; color: var(--text-primary); cursor: pointer; opacity: 0.65; display: flex; align-items: center; padding: 0 4px; transition: opacity 0.15s ease;">
            <i data-lucide="external-link" style="width: 13px; height: 13px;"></i>
          </button>
        </div>
      </div>
      <div class="safari-view" id="safari-view-container" style="flex-grow: 1; overflow: auto; display: flex; flex-direction: column; height: calc(100% - 44px);">
        <!-- Simulated dynamic browser pages -->
      </div>
    </div>
  `,

  terminal: `
    <div class="terminal-layout" id="terminal-screen">
      <div class="terminal-history" id="terminal-log">
        <div class="terminal-line">macOS Terminal (v1.0.4)</div>
        <div class="terminal-line">Type 'help' to view available operations.</div>
        <div class="terminal-line">&nbsp;</div>
      </div>
      <div class="terminal-prompt-row" id="terminal-input-row">
        <span class="terminal-prompt" id="terminal-prompt-path">~ Desktop $</span>
        <input type="text" class="terminal-input" id="terminal-shell-input" autofocus autocomplete="off" spellcheck="false">
      </div>
      <canvas id="terminal-matrix" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></canvas>
    </div>
  `,

  notes: `
    <div class="notes-layout">
      <aside class="notes-sidebar">
        <div class="notes-sidebar-header">
          <span style="font-size: 11.5px; font-weight: 700; opacity: 0.6;">All Notes</span>
          <button class="notes-new-btn" id="notes-new-btn" title="New Note">
            <i data-lucide="square-pen"></i>
          </button>
        </div>
        <div class="notes-list" id="notes-list-items">
          <!-- Rendered dynamically -->
        </div>
      </aside>
      <main class="notes-editor">
        <div class="notes-editor-header" id="notes-word-count">Words: 0 | Saved</div>
        <textarea class="notes-textarea" id="notes-text-area" placeholder="Start typing your note..."></textarea>
      </main>
    </div>
  `,

  calculator: `
    <div class="calc-layout">
      <div class="calc-display" id="calc-screen">0</div>
      <div class="calc-grid">
        <button class="calc-btn calc-gray-btn" data-val="ac">AC</button>
        <button class="calc-btn calc-gray-btn" data-val="neg">±</button>
        <button class="calc-btn calc-gray-btn" data-val="percent">%</button>
        <button class="calc-btn calc-orange-btn" data-val="/">÷</button>
        
        <button class="calc-btn calc-dark-btn" data-val="7">7</button>
        <button class="calc-btn calc-dark-btn" data-val="8">8</button>
        <button class="calc-btn calc-dark-btn" data-val="9">9</button>
        <button class="calc-btn calc-orange-btn" data-val="*">×</button>
        
        <button class="calc-btn calc-dark-btn" data-val="4">4</button>
        <button class="calc-btn calc-dark-btn" data-val="5">5</button>
        <button class="calc-btn calc-dark-btn" data-val="6">6</button>
        <button class="calc-btn calc-orange-btn" data-val="-">-</button>
        
        <button class="calc-btn calc-dark-btn" data-val="1">1</button>
        <button class="calc-btn calc-dark-btn" data-val="2">2</button>
        <button class="calc-btn calc-dark-btn" data-val="3">3</button>
        <button class="calc-btn calc-orange-btn" data-val="+">+</button>
        
        <button class="calc-btn calc-dark-btn calc-double-btn" data-val="0">0</button>
        <button class="calc-btn calc-dark-btn" data-val=".">.</button>
        <button class="calc-btn calc-orange-btn" data-val="=">=</button>
      </div>
    </div>
  `,

  settings: `
    <div class="settings-layout">
      <aside class="settings-sidebar">
        <div class="settings-sidebar-list">
          <div class="settings-sidebar-item active" data-tab="general">
            <i data-lucide="sliders"></i>
            <span>General</span>
          </div>
          <div class="settings-sidebar-item" data-tab="glass">
            <i data-lucide="glass-water" style="color:#ff007f;"></i>
            <span>Liquid Glass</span>
          </div>
          <div class="settings-sidebar-item" data-tab="wallpaper">
            <i data-lucide="image"></i>
            <span>Wallpaper</span>
          </div>
          <div class="settings-sidebar-item" data-tab="about">
            <i data-lucide="info"></i>
            <span>About</span>
          </div>
        </div>
      </aside>
      <main class="settings-content" id="settings-pane-container">
        <!-- Rendered based on active tab -->
      </main>
    </div>
  `,

  games: `
    <div class="games-layout" id="games-app-screen">
      <div class="games-header">
        <span style="font-size: 16px; font-weight: 700; background: linear-gradient(135deg, #a25df5, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; gap: 8px;"><i data-lucide="gamepad-2"></i> Tahoe Arcade</span>
        <span style="font-size: 11px; opacity: 0.6;">WWDC 2025 Release Stack</span>
      </div>
      <div class="games-grid" id="games-arcade-grid">
        <!-- Game Card -->
        <div class="game-card">
          <div class="game-card-img" style="background: linear-gradient(135deg, #2b5c8f 0%, #153359 100%);">⛷️</div>
          <div class="game-card-body">
            <span class="game-title">Tahoe Skiing Adventure</span>
            <span class="game-desc">Race down the snowy slopes of Lake Tahoe. Dodge trees and logs to set the ultimate high score!</span>
            <button class="game-play-btn" id="btn-play-skiing">Play Now</button>
          </div>
        </div>
        
        <div class="game-card" style="opacity: 0.65;">
          <div class="game-card-img" style="background: linear-gradient(135deg, #882255 0%, #441122 100%);">🧩</div>
          <div class="game-card-body">
            <span class="game-title">Siri's Glass Puzzle</span>
            <span class="game-desc">Coming soon in macOS Tahoe 26.6! Match refractive patterns in an immersive spatial grid.</span>
            <button class="game-play-btn" style="background:#555; cursor:not-allowed;" disabled>Locked</button>
          </div>
        </div>
      </div>
      
      <!-- Play Arena Container -->
      <div class="canvas-game-container hidden" id="skiing-game-arena">
        <button class="game-back-to-library" id="btn-skiing-back"><i data-lucide="chevron-left" style="width:12px; height:12px; margin-right:4px;"></i> Arcade</button>
        <div class="canvas-game-hud">
          <span>Score: <span id="skiing-score">0</span></span>
          <span>Speed: <span id="skiing-speed">1.0x</span></span>
          <span>High Score: <span id="skiing-highscore">0</span></span>
        </div>
        <canvas class="canvas-game-board" id="skiing-canvas" width="500" height="350" tabindex="0"></canvas>
        <div style="font-size:11px; color:#aaa; margin-top:8px; display:flex; gap:16px;">
          <span>Steer: <strong>A / D</strong> or <strong>Left / Right Arrows</strong></span>
          <span>Goal: Dodge Pine Trees (🌲) and Rocks (🪨)</span>
        </div>
      </div>
    </div>
  `,

  appstore: `
    <div class="appstore-layout" style="display:flex; height:100%; font-family:var(--font-body); color:var(--text-primary); background:rgba(20,20,22,0.45); backdrop-filter:blur(30px); border-radius:12px; overflow:hidden;">
      <aside class="appstore-sidebar" style="width:160px; background:rgba(255,255,255,0.03); border-right:0.5px solid var(--border-subtle); padding:16px 8px; display:flex; flex-direction:column; gap:6px; flex-shrink:0;">
        <div style="font-size:15px; font-weight:800; font-family:var(--font-display); padding:0 8px 12px 8px; display:flex; align-items:center; gap:6px; color:#0071e3;"><i data-lucide="shopping-bag" style="width:16px;"></i> App Store</div>
        <div class="store-sidebar-item active" style="padding:6px 10px; border-radius:6px; font-size:12px; font-weight:600; display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.1); cursor:pointer;"><i data-lucide="compass" style="width:13px;"></i> Discover</div>
        <div class="store-sidebar-item" style="padding:6px 10px; border-radius:6px; font-size:12px; font-weight:500; display:flex; align-items:center; gap:8px; cursor:pointer; opacity:0.75;"><i data-lucide="gamepad-2" style="width:13px;"></i> Arcade</div>
        <div class="store-sidebar-item" style="padding:6px 10px; border-radius:6px; font-size:12px; font-weight:500; display:flex; align-items:center; gap:8px; cursor:pointer; opacity:0.75;"><i data-lucide="palette" style="width:13px;"></i> Create</div>
        <div class="store-sidebar-item" style="padding:6px 10px; border-radius:6px; font-size:12px; font-weight:500; display:flex; align-items:center; gap:8px; cursor:pointer; opacity:0.75;"><i data-lucide="briefcase" style="width:13px;"></i> Work</div>
        <div class="store-sidebar-item" style="padding:6px 10px; border-radius:6px; font-size:12px; font-weight:500; display:flex; align-items:center; gap:8px; cursor:pointer; opacity:0.75;"><i data-lucide="info" style="width:13px;"></i> Updates</div>
      </aside>
      <main class="appstore-main" style="flex-grow:1; display:flex; flex-direction:column; padding:20px; overflow-y:auto; gap:20px;">
        <!-- Banner App -->
        <div style="background:linear-gradient(135deg, rgba(58,130,246,0.3) 0%, rgba(29,78,216,0.1) 100%); border-radius:12px; padding:18px; border:0.5px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
          <div style="max-width:320px;">
            <span style="font-size:10px; font-weight:700; color:#3a82f6; text-transform:uppercase; letter-spacing:0.5px;">Featured Application</span>
            <h3 style="font-family:var(--font-display); font-size:20px; font-weight:800; margin:4px 0;">Paint Sketchpad</h3>
            <p style="font-size:11.5px; opacity:0.75; line-height:1.4;">Unleash your design logic and draw glass-refractive paths. Complete with HTML5 canvas & export.</p>
          </div>
          <button class="store-install-btn store-btn-paint" data-app="paint" style="background:#0071e3; color:#fff; border:none; padding:6px 16px; border-radius:20px; font-size:11.5px; font-weight:700; cursor:pointer; transition:transform 0.15s; outline:none; min-width:65px; text-align:center;">GET</button>
        </div>
        
        <!-- App Grid Section -->
        <div>
          <h4 style="font-family:var(--font-display); font-size:14px; font-weight:700; margin-bottom:12px; opacity:0.85;">Essential Utilities</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:14px;">
            
            <!-- Calendar Card -->
            <div style="background:rgba(255,255,255,0.02); border:0.5px solid rgba(255,255,255,0.06); border-radius:10px; padding:12px; display:flex; gap:12px; align-items:center;">
              <div style="width:40px; height:40px; border-radius:8px; background:linear-gradient(135deg, #ff453a, #ff9f0a); display:flex; justify-content:center; align-items:center; font-size:20px; color:#fff; font-weight:800; flex-shrink:0;">📅</div>
              <div style="flex-grow:1; display:flex; flex-direction:column; gap:2px; min-width:0;">
                <span style="font-size:12px; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">Calendar</span>
                <span style="font-size:10px; opacity:0.6; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">Monthly grids & events</span>
              </div>
              <button class="store-install-btn store-btn-calendar" data-app="calendar" style="background:#0071e3; color:#fff; border:none; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:700; cursor:pointer; outline:none; min-width:50px;">GET</button>
            </div>

            <!-- Timer Card -->
            <div style="background:rgba(255,255,255,0.02); border:0.5px solid rgba(255,255,255,0.06); border-radius:10px; padding:12px; display:flex; gap:12px; align-items:center;">
              <div style="width:40px; height:40px; border-radius:8px; background:linear-gradient(135deg, #32d74b, #30b0c7); display:flex; justify-content:center; align-items:center; font-size:20px; color:#fff; font-weight:800; flex-shrink:0;">⏱️</div>
              <div style="flex-grow:1; display:flex; flex-direction:column; gap:2px; min-width:0;">
                <span style="font-size:12px; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">Timer & Clock</span>
                <span style="font-size:10px; opacity:0.6; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">Stopwatch & alerts</span>
              </div>
              <button class="store-install-btn store-btn-timer" data-app="timer" style="background:#0071e3; color:#fff; border:none; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:700; cursor:pointer; outline:none; min-width:50px;">GET</button>
            </div>

            <!-- Camera Card -->
            <div style="background:rgba(255,255,255,0.02); border:0.5px solid rgba(255,255,255,0.06); border-radius:10px; padding:12px; display:flex; gap:12px; align-items:center;">
              <div style="width:40px; height:40px; border-radius:8px; background:linear-gradient(135deg, #0a84ff, #5e5ce6); display:flex; justify-content:center; align-items:center; font-size:20px; color:#fff; font-weight:800; flex-shrink:0;">📷</div>
              <div style="flex-grow:1; display:flex; flex-direction:column; gap:2px; min-width:0;">
                <span style="font-size:12px; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">FaceTime Camera</span>
                <span style="font-size:10px; opacity:0.6; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">Real WebCam snapshots</span>
              </div>
              <button class="store-install-btn store-btn-camera" data-app="camera" style="background:#0071e3; color:#fff; border:none; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:700; cursor:pointer; outline:none; min-width:50px;">GET</button>
            </div>

          </div>
        </div>
      </main>
    </div>
  `,

  paint: `
    <div class="paint-layout" style="display:flex; flex-direction:column; height:100%; font-family:var(--font-body); color:#fff; background:#1a1a1c; border-radius:12px; overflow:hidden;">
      <div class="paint-toolbar" style="height:40px; background:rgba(0,0,0,0.3); border-bottom:0.5px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:space-between; padding:0 12px; gap:10px; flex-shrink:0;">
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="color" class="paint-color" value="#0071e3" style="width:20px; height:20px; border:none; background:none; cursor:pointer; border-radius:50%; overflow:hidden; padding:0;" title="Brush Color">
          
          <div style="display:flex; align-items:center; gap:6px; font-size:11px; opacity:0.85;">
            <input type="range" class="paint-size" min="1" max="40" value="5" style="width:60px;">
            <span class="paint-size-val">5px</span>
          </div>

          <div style="display:flex; align-items:center; gap:6px; font-size:11px; opacity:0.85; margin-left:4px;">
            <span style="opacity:0.6;">Opacity:</span>
            <input type="range" class="paint-opacity" min="10" max="100" value="100" style="width:50px;">
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:6px;">
          <span style="font-size:10px; opacity:0.6;">Canvas:</span>
          <select class="paint-canvas-bg" style="background:#2b2b2d; color:#fff; border:0.5px solid rgba(255,255,255,0.1); border-radius:4px; font-size:10.5px; padding:1px 3px; outline:none; cursor:pointer;">
            <option value="#ffffff">White</option>
            <option value="#1a1a1c">Dark</option>
            <option value="#faf8f5">Cream</option>
          </select>
          
          <button class="paint-btn-eraser" style="background:#2b2b2d; color:#fff; border:0.5px solid rgba(255,255,255,0.1); border-radius:4px; font-size:11px; padding:2px 6px; cursor:pointer;" title="Eraser">Eraser</button>
          <button class="paint-btn-clear" style="background:#2b2b2d; color:#ff453a; border:0.5px solid rgba(255,69,58,0.2); border-radius:4px; font-size:11px; padding:2px 6px; cursor:pointer;" title="Clear Canvas">Clear</button>
          <button class="paint-btn-export" style="background:#0071e3; color:#fff; border:none; border-radius:4px; font-size:11px; font-weight:600; padding:2px 8px; cursor:pointer;">Export</button>
        </div>
      </div>
      <div class="paint-workspace" style="flex-grow:1; position:relative; overflow:hidden; background:#ffffff;">
        <canvas class="paint-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; cursor:crosshair;"></canvas>
      </div>
    </div>
  `,

  calendar: `
    <div class="calendar-layout" style="display:flex; flex-direction:column; height:100%; font-family:var(--font-body); color:#fff; background:rgba(30,30,35,0.8); backdrop-filter:blur(30px); border-radius:12px; overflow:hidden; position:relative;">
      <div class="calendar-header" style="height:40px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; border-bottom:0.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.01); flex-shrink:0;">
        <h3 class="cal-month-title" style="font-family:var(--font-display); font-size:15px; font-weight:700;">May 2026</h3>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="cal-prev-btn" style="background:none; border:none; color:#fff; cursor:pointer; display:flex; align-items:center; padding:2px;"><i data-lucide="chevron-left" style="width:14px; height:14px;"></i></button>
          <button class="cal-today-btn" style="background:rgba(255,255,255,0.1); border:none; color:#fff; cursor:pointer; font-size:10px; font-weight:600; padding:2px 6px; border-radius:4px;">Today</button>
          <button class="cal-next-btn" style="background:none; border:none; color:#fff; cursor:pointer; display:flex; align-items:center; padding:2px;"><i data-lucide="chevron-right" style="width:14px; height:14px;"></i></button>
        </div>
      </div>
      <div class="calendar-grid-header" style="display:grid; grid-template-columns:repeat(7, 1fr); text-align:center; padding:6px 0; background:rgba(255,255,255,0.02); font-size:9.5px; font-weight:700; opacity:0.6; border-bottom:0.5px solid rgba(255,255,255,0.08); flex-shrink:0;">
        <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
      </div>
      <div class="cal-days-grid" style="flex-grow:1; display:grid; grid-template-columns:repeat(7, 1fr); grid-template-rows:repeat(6, 1fr); padding:6px;">
        <!-- Days injected dynamically -->
      </div>
      
      <!-- Event dialog modal inside the viewport -->
      <div class="cal-event-panel hidden" style="position:absolute; bottom:0; left:0; width:100%; background:rgba(24,24,28,0.95); backdrop-filter:blur(20px); border-top:0.5px solid rgba(255,255,255,0.1); padding:10px; display:flex; flex-direction:column; gap:6px; z-index:10; box-sizing:border-box;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:11px; font-weight:700; color:#0071e3;" class="cal-event-date-str">Add Event</span>
          <button class="cal-event-close" style="background:none; border:none; color:#ff453a; font-size:10px; cursor:pointer;">Cancel</button>
        </div>
        <input type="text" class="cal-event-input" placeholder="Event (e.g. Call Siri!)" style="background:rgba(255,255,255,0.08); border:0.5px solid rgba(255,255,255,0.1); border-radius:4px; color:#fff; font-size:11.5px; padding:4px 6px; outline:none; width:100%; box-sizing:border-box;">
        <button class="cal-event-save-btn" style="background:#0071e3; color:#fff; border:none; padding:4px; border-radius:4px; font-size:11px; font-weight:600; cursor:pointer;">Save</button>
      </div>
    </div>
  `,

  timer: `
    <div class="timer-layout" style="display:flex; flex-direction:column; height:100%; font-family:var(--font-body); color:#fff; background:rgba(25,25,28,0.5); backdrop-filter:blur(30px); border-radius:12px; overflow:hidden; padding:12px; align-items:center; justify-content:space-between; box-sizing:border-box;">
      <div style="display:flex; gap:10px; width:100%; border-bottom:0.5px solid rgba(255,255,255,0.08); padding-bottom:6px; justify-content:center; flex-shrink:0;">
        <button class="timer-tab-btn active" style="background:none; border:none; color:#0071e3; cursor:pointer; font-size:11.5px; font-weight:700; padding:2px 8px; outline:none; border-bottom:2px solid #0071e3;">Timer</button>
        <button class="stopwatch-tab-btn" style="background:none; border:none; color:#fff; cursor:pointer; font-size:11.5px; font-weight:500; opacity:0.7; padding:2px 8px; outline:none;">Stopwatch</button>
      </div>
      
      <!-- Timer Panel -->
      <div class="timer-view" style="flex-grow:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; width:100%;">
        <div style="position:relative; width:130px; height:130px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg style="position:absolute; width:100%; height:100%; transform:rotate(-90deg);">
            <circle cx="65" cy="65" r="56" stroke="rgba(255,255,255,0.05)" stroke-width="4" fill="transparent"/>
            <circle class="timer-progress-ring" cx="65" cy="65" r="56" stroke="#0071e3" stroke-width="4" fill="transparent" stroke-dasharray="351.8" stroke-dashoffset="0" style="transition: stroke-dashoffset 0.1s linear;"/>
          </svg>
          <div class="timer-time-display" style="font-family:var(--font-display); font-size:24px; font-weight:300;">00:05</div>
        </div>
        
        <!-- Inputs -->
        <div class="timer-inputs-row" style="display:flex; align-items:center; gap:4px; flex-shrink:0;">
          <input type="number" class="timer-min" min="0" max="99" value="0" style="width:36px; background:rgba(255,255,255,0.08); border:0.5px solid rgba(255,255,255,0.15); color:#fff; border-radius:4px; text-align:center; padding:2px 0; font-size:12.5px; outline:none;">
          <span style="font-size:11px; opacity:0.5;">m</span>
          <input type="number" class="timer-sec" min="0" max="59" value="5" style="width:36px; background:rgba(255,255,255,0.08); border:0.5px solid rgba(255,255,255,0.15); color:#fff; border-radius:4px; text-align:center; padding:2px 0; font-size:12.5px; outline:none;">
          <span style="font-size:11px; opacity:0.5;">s</span>
        </div>

        <div style="display:flex; gap:10px; width:90%; justify-content:center; flex-shrink:0;">
          <button class="timer-btn-reset" style="flex:1; background:rgba(255,255,255,0.08); border:none; padding:5px 0; border-radius:15px; font-size:11px; font-weight:600; cursor:pointer; color:#fff;">Reset</button>
          <button class="timer-btn-start" style="flex:1; background:#32d74b; color:#fff; border:none; padding:5px 0; border-radius:15px; font-size:11px; font-weight:600; cursor:pointer;">Start</button>
        </div>
      </div>

      <!-- Stopwatch Panel -->
      <div class="stopwatch-view hidden" style="flex-grow:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; width:100%;">
        <div class="sw-time-display" style="font-family:var(--font-display); font-size:28px; font-weight:200;">00:00.00</div>
        
        <div style="width:100%; max-height:80px; overflow-y:auto; background:rgba(255,255,255,0.02); border-radius:6px; border:0.5px solid rgba(255,255,255,0.08); padding:4px 6px; font-size:10px; box-sizing:border-box;" class="sw-laps-list">
          <div style="opacity:0.4; text-align:center; padding:6px 0;">No Laps Yet</div>
        </div>

        <div style="display:flex; gap:10px; width:90%; justify-content:center; flex-shrink:0;">
          <button class="sw-btn-lap" style="flex:1; background:rgba(255,255,255,0.08); border:none; padding:5px 0; border-radius:15px; font-size:11px; font-weight:600; cursor:pointer; color:#fff;">Lap</button>
          <button class="sw-btn-start" style="flex:1; background:#0071e3; color:#fff; border:none; padding:5px 0; border-radius:15px; font-size:11px; font-weight:600; cursor:pointer;">Start</button>
        </div>
      </div>
    </div>
  `,

  camera: `
    <div class="camera-layout" style="display:flex; flex-direction:column; height:100%; font-family:var(--font-body); color:#fff; background:#000; border-radius:12px; overflow:hidden; position:relative;">
      <div class="camera-screen" style="flex-grow:1; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;">
        <video class="camera-video" autoplay playsinline style="width:100%; height:100%; object-fit:cover; transform:scaleX(-1);"></video>
        <div class="camera-flash" style="position:absolute; top:0; left:0; width:100%; height:100%; background:#fff; opacity:0; pointer-events:none; transition:opacity 0.15s ease-out; z-index:50;"></div>
        <div class="camera-fallback" style="position:absolute; top:0; left:0; width:100%; height:100%; background:radial-gradient(circle, #2b3040 0%, #0d0f14 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;">
          <i data-lucide="aperture" style="width:44px; height:44px; color:#0071e3;"></i>
          <span style="font-size:12px; opacity:0.85;">No FaceTime Camera connected</span>
          <span style="font-size:10px; opacity:0.4;">Displaying simulated glass aperture overlay</span>
        </div>
      </div>
      <div class="camera-controls" style="height:64px; background:rgba(20,20,22,0.95); border-top:0.5px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; padding:4px 10px; gap:4px; flex-shrink:0;">
        <div style="display:flex; gap:8px; justify-content:center; overflow-x:auto; padding-bottom:1px;" class="camera-filters-bar">
          <span class="cam-filter-btn active" data-filter="normal" style="font-size:9.5px; font-weight:600; padding:1px 6px; border-radius:8px; background:rgba(255,255,255,0.15); cursor:pointer;">Normal</span>
          <span class="cam-filter-btn" data-filter="mono" style="font-size:9.5px; font-weight:500; padding:1px 6px; border-radius:8px; background:rgba(255,255,255,0.05); opacity:0.8; cursor:pointer;">Mono</span>
          <span class="cam-filter-btn" data-filter="noir" style="font-size:9.5px; font-weight:500; padding:1px 6px; border-radius:8px; background:rgba(255,255,255,0.05); opacity:0.8; cursor:pointer;">Noir</span>
          <span class="cam-filter-btn" data-filter="instant" style="font-size:9.5px; font-weight:500; padding:1px 6px; border-radius:8px; background:rgba(255,255,255,0.05); opacity:0.8; cursor:pointer;">Instant</span>
          <span class="cam-filter-btn" data-filter="sepia" style="font-size:9.5px; font-weight:500; padding:1px 6px; border-radius:8px; background:rgba(255,255,255,0.05); opacity:0.8; cursor:pointer;">Sepia</span>
        </div>
        <div style="display:flex; justify-content:center; align-items:center; position:relative; height:24px;">
          <button class="camera-shutter-btn" style="width:26px; height:26px; border-radius:50%; background:#fff; border:2px solid #ff453a; outline:none; cursor:pointer; display:flex; justify-content:center; align-items:center; padding:0; transition:transform 0.1s;" title="Capture Photo"></button>
        </div>
      </div>
    </div>
  `,
  preview: `
    <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#1e1e1e; overflow:hidden;">
      <div class="preview-toolbar" style="height:38px; border-bottom:1px solid #333; display:flex; align-items:center; padding:0 12px; background:#2d2d2d;">
        <span class="preview-title" style="color:#fff; font-size:12px; font-weight:500;">Preview</span>
      </div>
      <div class="preview-content" style="flex-grow:1; display:flex; justify-content:center; align-items:center; padding:20px;">
        <img class="preview-img" src="" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:4px; box-shadow:0 4px 12px rgba(0,0,0,0.5);">
      </div>
    </div>
  `,
  installer: `
    <div style="width:100%; height:100%; display:flex; flex-direction:column; background:var(--bg-primary); overflow:hidden;">
      <div style="height:48px; border-bottom:1px solid var(--border-subtle); display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.02);">
        <span style="font-weight:600; font-size:13px;">App Installer Simulator</span>
      </div>
      <div style="flex-grow:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:30px; text-align:center;">
        <i data-lucide="package" style="width:64px; height:64px; color:var(--text-primary); opacity:0.8; margin-bottom:20px;"></i>
        <h3 class="installer-title" style="margin:0 0 10px 0; font-size:18px; font-weight:600;">Installing Application</h3>
        <p class="installer-desc" style="font-size:13px; color:var(--text-secondary); margin-bottom:30px; max-width:80%;">Please wait while the application is configured for WebOS...</p>
        
        <div style="width:100%; max-width:280px; height:6px; background:var(--border-subtle); border-radius:3px; overflow:hidden;">
          <div class="installer-progress" style="width:0%; height:100%; background:#0066cc; transition:width 0.2s ease;"></div>
        </div>
        <p class="installer-status" style="font-size:11px; color:var(--text-secondary); margin-top:12px; font-variant-numeric: tabular-nums;">0%</p>
      </div>
    </div>
  `
};


// ==========================================
// 2. ACTIVE APPLICATION RUNTIME INTERFACES
// ==========================================
export function bindAppLogic(appId, win) {

  if (window.lucide) window.lucide.createIcons();

  // Resolve dynamic prefixed IDs (e.g. "preview_abc_123" → "preview")
  let resolvedId = appId;
  const prefixMap = ['preview', 'installer', 'safari', 'finder', 'terminal', 'notes', 'calculator', 'settings', 'games', 'appstore', 'paint', 'calendar', 'timer', 'camera'];
  for (const prefix of prefixMap) {
    if (appId === prefix || appId.startsWith(prefix + '_')) {
      resolvedId = prefix;
      break;
    }
  }

  switch (resolvedId) {
    case 'finder':
      bindFinder(win);
      break;
    case 'safari':
      bindSafari(win);
      break;
    case 'terminal':
      bindTerminal(win);
      break;
    case 'notes':
      bindNotes(win);
      break;
    case 'calculator':
      bindCalculator(win);
      break;
    case 'settings':
      bindSettings(win);
      break;
    case 'games':
      bindGames(win);
      break;
    case 'preview':
      bindPreview(win);
      break;
    case 'installer':
      bindInstaller(win);
      break;
    case 'appstore':
      bindAppStore(win);
      break;
    case 'paint':
      bindPaint(win);
      break;
    case 'calendar':
      bindCalendar(win);
      break;
    case 'timer':
      bindTimer(win);
      break;
    case 'camera':
      bindCamera(win);
      break;
  }
}

// ------------------------------------------
// A. FINDER APPLICATION BINDINGS
// ------------------------------------------
function bindFinder(win) {
  const grid = win.querySelector('#finder-grid-files');
  const sidebarItems = win.querySelectorAll('.sidebar-item');
  const backBtn = win.querySelector('#finder-back-btn');
  const pathDisplay = win.querySelector('#finder-path');

  let currentFolder = window.finderStartFolder || 'Desktop';
  window.finderStartFolder = null; // reset starting pointer
  const historyStack = [];

  // Match the sidebar active state to currentFolder
  sidebarItems.forEach(el => {
    if (el.dataset.folder === currentFolder) {
      sidebarItems.forEach(x => x.classList.remove('active'));
      el.classList.add('active');
    }
  });

  function updateToolbar() {
    if (backBtn) {
      backBtn.style.opacity = historyStack.length > 0 ? '1' : '0.35';
      backBtn.style.cursor = historyStack.length > 0 ? 'pointer' : 'default';
    }
    if (pathDisplay) {
      const parts = currentFolder.split('/');
      let breadcrumbsHTML = '<span>Macintosh HD</span>';
      parts.forEach(part => {
        breadcrumbsHTML += ` <i data-lucide="chevron-right" style="width: 10px; height: 10px; opacity: 0.5; margin: 0 2px;"></i> <span style="font-weight: 500;">${part}</span>`;
      });
      pathDisplay.innerHTML = breadcrumbsHTML;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  async function renderFinderGrid(folderName, pushToHistory = true) {
    if (!grid) return;
    grid.innerHTML = '<div style="padding: 20px;">Loading files...</div>';

    let files = [];
    try {
      const res = await fetch('/api/files');
      if (!res.ok) throw new Error();
      const data = await res.json();
      files = data.files.map(f => ({
        name: f.name,
        type: f.isDirectory ? 'dir' : 'file',
        content: f.content || ''
      }));
    } catch (e) {
      // Fallback to mock filesystem
      const folderNode = getNodeByPath(['~', ...folderName.split('/')]);
      if (!folderNode || folderNode.type !== 'dir') {
        grid.innerHTML = '';
        return;
      }
      files = Object.entries(folderNode.children).map(([n, node]) => ({
        name: n,
        type: node.type,
        content: node.content
      }));
    }

    grid.innerHTML = '';

    files.forEach((file) => {
      const { name, type, content } = file;
      const fileEl = document.createElement('div');
      fileEl.className = 'finder-file';

      const isFile = type === 'file';
      const folderColor = localStorage.getItem('folderColor') || 'color-blue';
      const folderIconPath = `assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/Folders Colors/${folderColor}/folder.ico`;
      
      // Determine file icon based on file type
      const lowerName = name.toLowerCase();
      let fileIconPath = 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/mimes/text-x-generic.ico';
      
      if (lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg') || lowerName.endsWith('.gif') || lowerName.endsWith('.ico') || lowerName.endsWith('.webp') || lowerName.endsWith('.bmp') || lowerName.endsWith('.svg')) {
         fileIconPath = 'assets/macOS 26 Tahoe Icons Resources/Variations/macOS 26 Library default/Photos@4x 1.ico';
      } else if (lowerName.endsWith('.pdf')) {
         fileIconPath = 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/mimes/application-pdf.ico';
      } else if (lowerName.endsWith('.dmg') || lowerName.endsWith('.exe') || lowerName.endsWith('.pkg') || lowerName.endsWith('.msi')) {
         fileIconPath = 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/utilities-terminal.ico';
      } else if (lowerName.endsWith('.txt') || lowerName.endsWith('.md')) {
         fileIconPath = 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/accessories-text-editor.ico';
      }

      const iconPath = isFile ? fileIconPath : folderIconPath;

      fileEl.innerHTML = `
        <div class="finder-file-icon-wrapper" style="margin-bottom: 2px;">
          <img src="${iconPath}" alt="${name}" class="finder-file-icon" style="width: 36px; height: 36px; object-fit: contain;">
        </div>
        <span class="finder-file-name">${name}</span>
      `;

      // Double click operation to read/open
      fileEl.addEventListener('dblclick', () => {
        if (isFile) {
          const uid = `${lowerName.replace(/[^a-z0-9]/g,'_')}_${Date.now()}`;
          if (lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg') || lowerName.endsWith('.gif') || lowerName.endsWith('.ico') || lowerName.endsWith('.webp') || lowerName.endsWith('.bmp') || lowerName.endsWith('.svg') || lowerName.endsWith('.pdf')) {
            import('./window.js').then(m => m.createWindow(`preview_${uid}`, `Preview — ${name}`, appHTMLRegistry.preview, { width: 640, height: 520, fileContent: content, fileName: name }));
          } else if (lowerName.endsWith('.xls') || lowerName.endsWith('.xlsx') || lowerName.endsWith('.ppt') || lowerName.endsWith('.pptx') || lowerName.endsWith('.csv')) {
            // Open doc URL in a new OS Safari window
            import('./window.js').then(m => m.createWindow(`safari_${uid}`, `Safari`, appHTMLRegistry.safari, { width: 860, height: 620 }));
          } else if (lowerName.endsWith('.exe') || lowerName.endsWith('.dmg') || lowerName.endsWith('.pkg') || lowerName.endsWith('.msi')) {
            import('./window.js').then(m => m.createWindow(`installer_${uid}`, `App Installer`, appHTMLRegistry.installer, { width: 460, height: 380, fileName: name }));
          } else {
            alertFileContent(name, content || 'File format not supported.');
          }
        } else {
          // Navigate inside if directory exists
          if (pushToHistory) {
            historyStack.push(currentFolder);
          }
          currentFolder = `${folderName}/${name}`;
          renderFinderGrid(currentFolder);
        }
      });

      grid.appendChild(fileEl);
    });

    updateToolbar();
    if (window.lucide) window.lucide.createIcons();
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (historyStack.length > 0) {
        currentFolder = historyStack.pop();
        renderFinderGrid(currentFolder, false);
      }
    });
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      historyStack.length = 0; // Clear history stack on sidebar category swap
      currentFolder = item.dataset.folder;
      renderFinderGrid(currentFolder);
    });
  });

  // Dynamic filesystem reload observer
  const fsChangeListener = () => {
    renderFinderGrid(currentFolder, false);
  };
  window.addEventListener('fs-change', fsChangeListener);

  // Clean up listener when window is closed
  const observer = new MutationObserver(() => {
    if (!document.body.contains(win)) {
      window.removeEventListener('fs-change', fsChangeListener);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Start with initial folder rendering
  renderFinderGrid(currentFolder);
}

// Global Alert for file contents within Virtual Desktop Finder
function alertFileContent(title, content) {
  // Spawn a small beautiful text viewer window using our Window Manager dynamically
  import('./window.js').then(module => {
    const viewerId = `viewer-${Date.now()}`;
    const isImage = content.startsWith('data:image/') || title.toLowerCase().endsWith('.png');

    let htmlPayload = '';
    let winTitle = '';

    if (isImage) {
      winTitle = `Preview - ${title}`;
      htmlPayload = `
        <div style="display:flex; justify-content:center; align-items:center; height:100%; background:#1a1a1a; padding:10px; box-sizing:border-box; border-radius: 0 0 12px 12px; overflow:hidden;">
          <img src="${content}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.4);" />
        </div>
      `;
    } else {
      winTitle = `Text Editor - ${title}`;
      htmlPayload = `
        <div style="padding: 16px; font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: var(--text-primary); overflow: auto; height: 100%;">
          <h4 style="margin-bottom:12px; font-weight:700;">${title}</h4>
          <p style="white-space: pre-wrap; font-family: inherit;">${content}</p>
        </div>
      `;
    }

    module.createWindow(viewerId, winTitle, htmlPayload, isImage ? { width: 500, height: 400 } : { width: 420, height: 280 });
  });
}

// ------------------------------------------
// B. SAFARI BROWSER BINDINGS
// ------------------------------------------
function bindSafari(win) {
  const container = win.querySelector('#safari-view-container');
  const input = win.querySelector('#safari-address-input');
  const backBtn = win.querySelector('#safari-back-btn');
  const homeBtn = win.querySelector('#safari-home-btn');
  const reloadBtn = win.querySelector('#safari-reload-btn');
  const externalBtn = win.querySelector('#safari-external-btn');

  if (reloadBtn) {
    reloadBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val && val !== 'safari://home') {
        loadPage(val);
      }
    });
  }

  if (externalBtn) {
    externalBtn.addEventListener('click', () => {
      let val = input.value.trim();
      if (val && val !== 'safari://home') {
        if (!val.startsWith('http://') && !val.startsWith('https://')) {
          val = 'https://' + val;
        }
        window.open(val, '_blank');
      }
    });
  }

  const historyStack = [];

  const bookmarks = [
    { label: 'Apple', url: 'https://apple.com', icon: 'apple', color: '#8e8e93', type: 'icon' },
    { label: 'iCloud', url: 'https://icloud.com', icon: 'cloud', color: '#8e8e93', type: 'icon' },
    { label: 'Yahoo', url: 'https://yahoo.com', text: 'Y', color: '#7b0099', type: 'text' },
    { label: 'Bing', url: 'https://bing.com', text: 'B', color: '#8e8e93', type: 'text' },
    { label: 'Google', url: 'https://google.com', text: 'G', color: '#8e8e93', type: 'text' },
    { label: 'Wikipedia', url: 'https://wikipedia.org', text: 'W', color: '#ffffff', textColor: '#000000', type: 'text' },
    { label: 'Facebook', url: 'https://facebook.com', icon: 'facebook', color: '#3b5998', type: 'icon' },
    { label: 'Twitter', url: 'https://twitter.com', icon: 'twitter', color: '#1da1f2', type: 'icon' },
    { label: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin', color: '#0077b5', type: 'icon' },
    { label: 'The Weather...', url: 'https://weather.com', text: 'The<br>Weather<br>Channel', color: '#003399', type: 'text', small: true },
    { label: 'Yelp', url: 'https://yelp.com', text: 'yelp<i data-lucide="asterisk" style="width:12px; height:12px; display:inline-block; margin-left:2px;"></i>', color: '#d32323', type: 'text', flexRow: true },
    { label: 'TripAdvisor', url: 'https://tripadvisor.com', icon: 'glasses', color: '#34e0a1', textColor: '#000000', type: 'icon' }
  ];

  function renderSafariHome() {
    input.value = '';
    container.innerHTML = `
      <div class="safari-home" style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
        <div class="safari-section">
          <h2 class="safari-section-title">Favorites</h2>
          <div class="safari-grid" id="safari-favs"></div>
        </div>

        <div class="safari-section">
          <h2 class="safari-section-title">WebOS Downloader</h2>
          <div class="safari-privacy-card" style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 0.5px solid rgba(255, 255, 255, 0.1);">
            <div style="font-size: 12px; opacity: 0.85; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="download-cloud" style="width: 16px; height: 16px; color: #0a84ff;"></i>
              <span style="font-weight: 600;">Download files (Images, PDFs, or any assets) directly into Finder</span>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <input type="text" id="safari-dl-url" placeholder="Paste file URL here (e.g. https://example.com/photo.jpg)" style="flex-grow: 2; padding: 8px 12px; border-radius: 8px; border: 0.5px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.08); color: var(--text-primary); font-size: 12px; outline: none; min-width: 200px;">
              <input type="text" id="safari-dl-name" placeholder="Filename (optional)" style="flex-grow: 1; padding: 8px 12px; border-radius: 8px; border: 0.5px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.08); color: var(--text-primary); font-size: 12px; outline: none; max-width: 150px;">
              <button id="safari-dl-btn" style="background: #0071e3; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s;">
                <i data-lucide="download" style="width: 14px; height: 14px;"></i> Download
              </button>
            </div>
            <div id="safari-dl-status" style="font-size: 11.5px; font-weight: 500; display: none;"></div>
          </div>
        </div>

        <div class="safari-section">
          <h2 class="safari-section-title">Privacy Report</h2>
          <div class="safari-privacy-card">
            <i data-lucide="shield-check" class="safari-privacy-icon"></i>
            <span class="safari-privacy-text">Safari has not encountered any trackers in the last seven days.</span>
          </div>
        </div>

        <div class="safari-settings-icon">
          <i data-lucide="sliders-horizontal"></i>
        </div>
      </div>
    `;

    const favsGrid = container.querySelector('#safari-favs');
    bookmarks.forEach(bm => {
      const tile = document.createElement('div');
      tile.className = 'safari-tile';
      
      const tc = bm.textColor || '#ffffff';
      let contentHtml = '';
      if (bm.type === 'icon') {
        contentHtml = `<i data-lucide="${bm.icon}" style="width:36px; height:36px; color:${tc};"></i>`;
      } else {
        const style = bm.small ? 'font-size: 11px; line-height: 1.1; font-weight: 600;' : 'font-size: 32px; font-weight: 500; font-family: serif;';
        contentHtml = `<div style="color:${tc}; ${style} text-align:center; display:flex; align-items:center; justify-content:center;">${bm.text}</div>`;
      }

      tile.innerHTML = `
        <div class="safari-tile-icon-wrapper" style="background-color:${bm.color}; width:80px; height:80px; border-radius:18px; display:flex; justify-content:center; align-items:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          ${contentHtml}
        </div>
        <span class="safari-tile-label" style="margin-top: 8px; font-size: 11px; color: #1d1d1f; text-align:center;">${bm.label}</span>
      `;
      tile.addEventListener('click', () => {
        historyStack.push('');
        loadPage(bm.url);
      });
      favsGrid.appendChild(tile);
    });

    const dlBtn = container.querySelector('#safari-dl-btn');
    const dlUrlInput = container.querySelector('#safari-dl-url');
    const dlNameInput = container.querySelector('#safari-dl-name');
    const dlStatus = container.querySelector('#safari-dl-status');

    if (dlBtn) {
      dlBtn.addEventListener('click', () => {
        const url = dlUrlInput.value.trim();
        let filename = dlNameInput.value.trim();
        if (!url) {
          alert('Please enter a valid file URL to download.');
          return;
        }

        dlStatus.style.display = 'block';
        dlStatus.style.color = '#ff9f0a';
        dlStatus.innerHTML = 'Downloading and persisting file to WebOS...';

        fetch('/api/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, filename })
        })
        .then(res => {
          if (!res.ok) throw new Error('Download failed. Please check the URL.');
          return res.json();
        })
        .then(data => {
          dlStatus.style.color = '#32d74b';
          dlStatus.innerHTML = `✓ Successfully downloaded <strong>${data.name}</strong> to your Finder!`;
          dlUrlInput.value = '';
          dlNameInput.value = '';
          // Dispatch filesystem change to reload finder grid automatically
          window.dispatchEvent(new CustomEvent('fs-change'));
        })
        .catch(err => {
          dlStatus.style.color = '#ff453a';
          dlStatus.innerHTML = `❌ Error: ${err.message}`;
        });
      });
    }

    if (window.lucide) window.lucide.createIcons();
    updateToolbar();
  }

  function updateToolbar() {
    if (backBtn) {
      backBtn.style.opacity = historyStack.length > 0 ? '1' : '0.35';
      backBtn.style.cursor = historyStack.length > 0 ? 'pointer' : 'default';
    }
  }

  const messageListener = (e) => {
    if (e.data && e.data.type === 'safari-navigate') {
      historyStack.push(input.value);
      loadPage(e.data.url);
    }
  };
  window.addEventListener('message', messageListener);

  const mutationObserver = new MutationObserver(() => {
    if (!document.body.contains(win)) {
      window.removeEventListener('message', messageListener);
      mutationObserver.disconnect();
    }
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  function loadPage(url) {
    let cleanUrl = url.trim();

    // Smart app name → direct URL resolution
    const appUrlMap = {
      'google meet': 'https://meet.google.com',
      'meet': 'https://meet.google.com',
      'gmail': 'https://mail.google.com',
      'youtube': 'https://www.youtube.com',
      'yt': 'https://www.youtube.com',
      'google drive': 'https://drive.google.com',
      'drive': 'https://drive.google.com',
      'google docs': 'https://docs.google.com',
      'docs': 'https://docs.google.com',
      'google sheets': 'https://sheets.google.com',
      'sheets': 'https://sheets.google.com',
      'instagram': 'https://www.instagram.com',
      'facebook': 'https://www.facebook.com',
      'twitter': 'https://x.com',
      'x': 'https://x.com',
      'whatsapp': 'https://web.whatsapp.com',
      'discord': 'https://discord.com/app',
      'spotify': 'https://open.spotify.com',
      'netflix': 'https://www.netflix.com',
      'amazon': 'https://www.amazon.com',
      'github': 'https://github.com',
      'reddit': 'https://www.reddit.com',
      'twitch': 'https://www.twitch.tv',
      'figma': 'https://www.figma.com',
      'notion': 'https://www.notion.so',
      'chatgpt': 'https://chat.openai.com',
      'chat gpt': 'https://chat.openai.com',
      'google': 'https://www.google.com',
    };

    const lowerInput = cleanUrl.toLowerCase();
    if (appUrlMap[lowerInput]) {
      cleanUrl = appUrlMap[lowerInput];
    } else if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('safari://')) {
      if (cleanUrl.includes('.') && !cleanUrl.includes(' ')) {
        cleanUrl = 'https://' + cleanUrl;
      } else {
        cleanUrl = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(cleanUrl);
      }
    }

    if (cleanUrl.includes('accounts.google.com') || cleanUrl.includes('google.com/accounts') || cleanUrl.includes('accounts.google.co.in')) {
      window.open(cleanUrl, '_blank');
      container.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; font-family:var(--font-body); padding:20px; text-align:center; color:var(--text-primary); background:var(--bg-primary);">
          <div class="siri-icon-orb" style="width: 48px; height: 48px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #ff69b4, #8a2be2 50%, #00ffff 80%); box-shadow: 0 0 16px rgba(138, 43, 226, 0.6), inset -1.5px -1.5px 4px rgba(0,0,0,0.4); animation: siri-glow-pulse 2s infinite ease-in-out; margin-bottom:16px;"></div>
          <h3 style="margin: 0 0 8px 0; font-weight:600; font-size:15px; color:var(--text-primary);">Google Sign-In Opened Externally</h3>
          <p style="font-size:12px; opacity:0.8; max-width:400px; line-height:1.5; margin: 0 0 16px 0; color:var(--text-secondary);">To bypass strict iframe restrictions (Clickjacking security), Google Sign-In has been opened in a secure, new browser tab.</p>
          <button id="safari-reopen-login" style="background:#0071e3; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:600; font-size:12px; cursor:pointer; outline:none; transition: background 0.2s;">Re-open Sign-In Tab</button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      const reopenBtn = container.querySelector('#safari-reopen-login');
      if (reopenBtn) {
        reopenBtn.addEventListener('click', () => {
          window.open(cleanUrl, '_blank');
        });
      }
      input.value = cleanUrl;
      updateToolbar();
      return;
    }

    input.value = cleanUrl;
    updateToolbar();

    // Trigger progressive address bar load indicators
    const addrBar = win.querySelector('.safari-address-bar');
    let loadLine = addrBar.querySelector('.safari-load-line');
    if (!loadLine) {
      loadLine = document.createElement('div');
      loadLine.className = 'safari-load-line';
      loadLine.style.position = 'absolute';
      loadLine.style.bottom = '0';
      loadLine.style.left = '0';
      loadLine.style.height = '2.5px';
      loadLine.style.backgroundColor = '#27c93f';
      loadLine.style.width = '0%';
      loadLine.style.transition = 'width 0.4s ease-out';
      addrBar.style.position = 'relative';
      addrBar.appendChild(loadLine);
    }

    loadLine.style.width = '20%';
    setTimeout(() => { if (loadLine) loadLine.style.width = '60%'; }, 150);

    // If it's the home dashboard, render it natively
    if (cleanUrl.startsWith('safari://home')) {
      setTimeout(() => {
        if (loadLine) {
          loadLine.style.width = '100%';
          setTimeout(() => loadLine.remove(), 200);
        }
        renderSafariHome();
      }, 300);
      return;
    }

    // Load the actual site natively via iframe
    // This allows games (like deadshot.io), WebGL, and complex SPAs to run perfectly!
    if (loadLine) loadLine.style.width = '85%';
    
    setTimeout(() => {
      if (loadLine) {
        loadLine.style.width = '100%';
        setTimeout(() => loadLine.remove(), 200);
      }

      // Render native iframe (safely sandboxed without allow-top-navigation to prevent parent page hijacking)
      // Route through our custom server-side bypass proxy to strip X-Frame-Options/CSP blocking headers
      container.innerHTML = `
        <iframe id="safari-real-frame" style="width:100%; height:100%; border:none; background:#ffffff;" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock" allow="pointer-lock; fullscreen; autoplay; camera; microphone" src="/api/proxy?url=${encodeURIComponent(cleanUrl)}"></iframe>
      `;
    }, 400);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let val = input.value.trim();
      if (!val) return;
      if (val === 'safari://home') {
        renderSafariHome();
        return;
      }
      historyStack.push(input.value);
      loadPage(val);
    }
  });

  homeBtn.addEventListener('click', () => {
    historyStack.push(input.value);
    renderSafariHome();
  });

  backBtn.addEventListener('click', () => {
    if (historyStack.length > 0) {
      const prevUrl = historyStack.pop();
      if (prevUrl === 'safari://home') {
        renderSafariHome();
      } else {
        loadPage(prevUrl);
      }
    }
  });

  // Start Initialization
  renderSafariHome();
}

// ------------------------------------------
// C. TERMINAL BASH SHELL BINDINGS
// ------------------------------------------
function bindTerminal(win) {
  const log = win.querySelector('#terminal-log');
  const input = win.querySelector('#terminal-shell-input');
  const promptPath = win.querySelector('#terminal-prompt-path');
  const canvas = win.querySelector('#terminal-matrix');
  let currentPath = ['~'];
  let pythonMode = false;
  let pyodideReady = false;
  let pyodideInstance = null;

  // Load Pyodide (real Python 3.12 via WebAssembly) - lazy loaded on demand
  async function loadPython() {
    if (pyodideReady) return pyodideInstance;
    printLine('<span style="color:#f7b731;">🐍 Python 3.12 (Pyodide)</span> <span style="color:#aaa;">Loading WebAssembly runtime...</span>');
    
    if (!document.getElementById('pyodide-script')) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.id = 'pyodide-script';
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    pyodideInstance = await window.loadPyodide({
      stdout: (text) => printLine(`<span style="color:#e2e8f0;">${text}</span>`),
      stderr: (text) => printLine(`<span style="color:#fc8181;">${text}</span>`)
    });
    pyodideReady = true;
    printLine('<span style="color:#68d391;">✓ Python 3.12.0 ready. Type exit() to return to bash.</span>');
    return pyodideInstance;
  }


  function printLine(text, className = '') {
    if (!log) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    log.appendChild(line);

    // Auto-scroll
    const screen = log.parentElement;
    screen.scrollTop = screen.scrollHeight;
  }

  // Parse command executions
  function parseCommand(cmdString) {
    const parts = cmdString.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (!cmd) return;

    // ─── Python REPL Mode ───
    if (pythonMode) {
      if (cmd === 'exit()' || cmdString.trim() === 'exit()' || cmdString.trim() === 'quit()') {
        pythonMode = false;
        printLine('<span style="color:#aaa;">Exited Python. Back in bash.</span>');
        promptPath.textContent = `${currentPath.join('/')} $`;
        return;
      }
      printLine(`<span style="color:#63b3ed;">>>> ${cmdString}</span>`);
      if (!pyodideReady) {
        printLine('<span style="color:#fc8181;">Python not loaded yet.</span>', '');
        return;
      }
      try {
        const result = pyodideInstance.runPython(cmdString);
        if (result !== undefined && result !== null) {
          printLine(`<span style="color:#e2e8f0;">${result}</span>`);
        }
      } catch(e) {
        printLine(`<span style="color:#fc8181;">${e.message}</span>`);
      }
      return;
    }

    printLine(`<span style="color:#ffffff;">$ ${cmdString}</span>`);

    switch (cmd) {
      case 'help':
        printLine('Available commands:');
        printLine('  help      - Display this guidelines list');
        printLine('  ls        - List virtual files and directories');
        printLine('  cd [dir]  - Change directories in the virtual file system');
        printLine('  cat [file]- Output text file content to shell');
        printLine('  python    - Launch built-in Python 3.12 REPL (Pyodide)');
        printLine('  pip       - Install Python packages in the REPL');
        printLine('  neofetch  - Output system information layout');
        printLine('  weather   - Display Lake Tahoe City forecast');
        printLine('  siri      - Talk to Siri/Apple Intelligence');
        printLine('  spotlight - Show the floating search bar');
        printLine('  games     - Launch Tahoe Skiing Arcade');
        printLine('  clear     - Clean up terminal history');
        printLine('  theme     - Switch operating themes: light / dark');
        printLine('  matrix    - Toggle green code waterfall screensaver');
        break;

      case 'ls':
        const currentDir = getNodeByPath(currentPath);
        if (currentDir && currentDir.type === 'dir') {
          const names = Object.entries(currentDir.children).map(([name, node]) => {
            if (node.type === 'dir') {
              return `<span style="color:#00bcd4; font-weight:bold;">${name}/</span>`;
            }
            return `<span style="color:#ffffff;">${name}</span>`;
          });
          printLine(names.length > 0 ? names.join('&nbsp;&nbsp;&nbsp;&nbsp;') : '(empty folder)');
        }
        break;

      case 'cd':
        const target = args[0];
        if (!target) {
          currentPath = ['~'];
        } else if (target === '..') {
          if (currentPath.length > 1) currentPath.pop();
        } else {
          const currentDir = getNodeByPath(currentPath);
          if (currentDir && currentDir.children[target] && currentDir.children[target].type === 'dir') {
            currentPath.push(target);
          } else {
            printLine(`cd: no such directory: ${target}`, 'text-red');
          }
        }
        promptPath.textContent = `${currentPath.join(' ')} $`;
        break;

      case 'cat':
        const fileTarget = args[0];
        if (!fileTarget) {
          printLine('cat: missing target filename');
        } else {
          const currentDir = getNodeByPath(currentPath);
          if (currentDir && currentDir.children[fileTarget] && currentDir.children[fileTarget].type === 'file') {
            const formatted = currentDir.children[fileTarget].content.replace(/\n/g, '<br>');
            printLine(formatted);
          } else {
            printLine(`cat: ${fileTarget}: no such file exists`);
          }
        }
        break;

      case 'neofetch':
        printLine(`
          <div class="neofetch-container">
            <div class="neofetch-logo" style="color: #c084fc; text-shadow: 0 0 8px rgba(192, 132, 252, 0.4);">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#####&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
              &nbsp;&nbsp;&nbsp;#######&nbsp;&nbsp;&nbsp;&nbsp;<br>
              &nbsp;&nbsp;#########&nbsp;&nbsp;&nbsp;<br>
              &nbsp;&nbsp;#########&nbsp;&nbsp;&nbsp;<br>
              &nbsp;&nbsp;&nbsp;#######&nbsp;&nbsp;&nbsp;&nbsp;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;#####&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="neofetch-specs">
              <div class="neofetch-title" style="color: #c084fc;">Vedant@macbook-pro</div>
              <div class="neofetch-divider">-----------------</div>
              <div class="neofetch-spec"><span class="neofetch-label">OS</span>: macOS Tahoe Replica v26.5</div>
              <div class="neofetch-spec"><span class="neofetch-label">Kernel</span>: WebOS JS Core Engine (v26)</div>
              <div class="neofetch-spec"><span class="neofetch-label">Uptime</span>: Active (Liquid Glass Core)</div>
              <div class="neofetch-spec"><span class="neofetch-label">Shell</span>: Antigravity-bash v4.1</div>
              <div class="neofetch-spec"><span class="neofetch-label">Python</span>: 3.12.0 (Pyodide/WASM) ✓</div>
              <div class="neofetch-spec"><span class="neofetch-label">CPU</span>: Apple M5 Ultra (Silicon Stack)</div>
              <div class="neofetch-spec"><span class="neofetch-label">Memory</span>: 128 GB Unified LPDDR5</div>
            </div>
          </div>
        `);
        break;

      case 'weather':
        printLine('<span style="color:#27c93f; font-weight:bold;">Tahoe City Winter Blizzard Report:</span>');
        printLine('----------------------------------');
        printLine('  Temperature : -2°C');
        printLine('  Conditions  : Light Snow Showers');
        printLine('  Wind        : 14 km/h North-East');
        printLine('  Snow Depth  : 142 cm (Fresh Powder!)');
        printLine('  Steepness   : Perfect for Skiing (try typing \'games\')');
        break;

      case 'siri':
        printLine('Connecting to Siri Apple Intelligence dialog stacks...');
        setTimeout(() => {
          const siriTriggerBtn = document.getElementById('siri-trigger');
          if (siriTriggerBtn) siriTriggerBtn.click();
        }, 300);
        break;

      case 'spotlight':
        printLine('Opening floating Spotlight Search console...');
        setTimeout(() => {
          const spotTriggerBtn = document.getElementById('spotlight-trigger');
          if (spotTriggerBtn) spotTriggerBtn.click();
        }, 300);
        break;

      case 'games':
        printLine('Steering down snowy Lake Tahoe... Launching Skiing Adventure...');
        setTimeout(() => {
          const gApp = document.querySelector('.dock-item-wrapper[data-app="games"] .dock-item');
          if (gApp) gApp.click();
        }, 300);
        break;

      case 'clear':
        log.innerHTML = '';
        break;

      case 'theme':
        const themeChoice = args[0];
        if (themeChoice === 'light' || themeChoice === 'dark') {
          document.documentElement.setAttribute('data-theme', themeChoice);
          printLine(`Theme shifted cleanly to ${themeChoice}.`);
        } else {
          printLine('Usage: theme [light/dark]');
        }
        break;

      case 'matrix':
        toggleMatrixMode(canvas, log, input);
        break;

      case 'python':
      case 'python3':
        loadPython().then(py => {
          if (py) {
            pythonMode = true;
            promptPath.textContent = '>>> ';
          }
        }).catch(() => {
          printLine('<span style="color:#fc8181;">Failed to load Python. Check your internet connection.</span>');
        });
        break;

      case 'pip':
      case 'pip3':
        const pipPkg = args[0];
        if (!pipPkg) {
          printLine('Usage: pip install &lt;package&gt;');
          break;
        }
        if (args[0] !== 'install') {
          printLine('Only "pip install &lt;package&gt;" is supported in WebOS.');
          break;
        }
        const pkgName = args[1];
        if (!pkgName) { printLine('Usage: pip install &lt;package&gt;'); break; }
        loadPython().then(async py => {
          if (!py) return;
          printLine(`<span style="color:#f7b731;">📦 Installing ${pkgName}...</span>`);
          try {
            await py.loadPackagesFromImports(`import ${pkgName}`);
            printLine(`<span style="color:#68d391;">✓ Successfully installed ${pkgName}</span>`);
          } catch(e) {
            // Try micropip
            try {
              await py.runPythonAsync(`
import micropip
await micropip.install('${pkgName}')
              `);
              printLine(`<span style="color:#68d391;">✓ Successfully installed ${pkgName} via micropip</span>`);
            } catch(e2) {
              printLine(`<span style="color:#fc8181;">Could not install ${pkgName}: ${e2.message}</span>`);
            }
          }
        });
        break;

      default:
        fetch('/api/terminal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: cmdString })
        })
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          if (data.output) printLine(data.output.replace(/\n/g, '<br>'));
          if (data.error) printLine(data.error.replace(/\n/g, '<br>'), 'text-red');
        })
        .catch(() => {
          printLine(`bash: command not found: ${cmd}. Type 'help' to review guidelines.`, 'text-red');
        });
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.stopPropagation(); // Block bubbling up to document and triggering immediate exit!
      const val = input.value;
      input.value = '';
      parseCommand(val);
    }
  });

  // Focus input on console screen click
  win.querySelector('#terminal-screen').addEventListener('click', () => {
    if (canvas.style.display !== 'block') {
      input.focus();
    }
  });
}

// Matrix rain easter egg function
let matrixInterval = null;
function toggleMatrixMode(canvas, log, input) {
  const exitMatrix = () => {
    canvas.style.display = 'none';
    log.style.display = 'flex';
    input.parentElement.style.display = 'flex';
    clearInterval(matrixInterval);
    canvas.removeEventListener('click', exitMatrix);
    document.removeEventListener('keydown', keyExit);
    setTimeout(() => input.focus(), 100);
  };

  const keyExit = (e) => {
    if (e.key === 'Enter') return; // Ignore Enter key bubbling
    exitMatrix();
  };

  if (canvas.style.display === 'block') {
    exitMatrix();
    return;
  }

  canvas.style.display = 'block';
  log.style.display = 'none';
  input.parentElement.style.display = 'none';

  const ctx = canvas.getContext('2d');

  // Resize canvas bounds
  const resizeCanvas = () => {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  };
  resizeCanvas();

  const cols = Math.floor(canvas.width / 14);
  const ypos = Array(cols).fill(0);

  function matrixRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = '13px monospace';

    ypos.forEach((y, ind) => {
      const text = String.fromCharCode(Math.floor(33 + Math.random() * 93));
      const x = ind * 14;
      ctx.fillText(text, x, y);

      if (y > 100 + Math.random() * 10000) {
        ypos[ind] = 0;
      } else {
        ypos[ind] = y + 14;
      }
    });
  }

  matrixInterval = setInterval(matrixRain, 40);

  // Hook Exit event listeners
  canvas.addEventListener('click', exitMatrix);
  document.addEventListener('keydown', keyExit);

  // Hook resize
  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
  });
  resizeObserver.observe(canvas.parentElement);
}

// ------------------------------------------
// D. NOTES APPLICATION BINDINGS
// ------------------------------------------
function bindNotes(win) {
  const notesList = win.querySelector('#notes-list-items');
  const textArea = win.querySelector('#notes-text-area');
  const wordCount = win.querySelector('#notes-word-count');
  const newBtn = win.querySelector('#notes-new-btn');

  // Load from local storage
  let notes = JSON.parse(localStorage.getItem('mac_notes_replica')) || [
    { id: '1', title: 'Welcome Note', content: 'Double click notes in the list to switch. Autosave preserves all edits local to this client.', date: new Date().toLocaleDateString() }
  ];
  let activeNoteId = notes[0]?.id || null;

  function saveToStorage() {
    localStorage.setItem('mac_notes_replica', JSON.stringify(notes));
  }

  function renderNoteItems() {
    if (!notesList) return;
    notesList.innerHTML = '';

    notes.forEach(note => {
      const item = document.createElement('div');
      item.className = `note-item ${note.id === activeNoteId ? 'active' : ''}`;

      item.innerHTML = `
        <div class="note-item-title">${note.title || 'Untitled Note'}</div>
        <div class="note-item-date">${note.date}</div>
      `;

      item.addEventListener('click', () => {
        activeNoteId = note.id;
        renderNoteItems();
        loadActiveNoteContent();
      });

      notesList.appendChild(item);
    });
  }

  function loadActiveNoteContent() {
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (activeNote && textArea) {
      textArea.value = activeNote.content;
      updateWordCount(activeNote.content);
    } else if (textArea) {
      textArea.value = '';
      updateWordCount('');
    }
  }

  function updateWordCount(str) {
    if (!wordCount) return;
    const words = str.trim() ? str.trim().split(/\s+/).length : 0;
    wordCount.textContent = `Words: ${words} | Saved to LocalStorage`;
  }

  textArea.addEventListener('input', (e) => {
    const content = e.target.value;
    const firstLine = content.split('\n')[0] || '';

    const activeNote = notes.find(n => n.id === activeNoteId);
    if (activeNote) {
      activeNote.content = content;
      activeNote.title = firstLine.substring(0, 20) || 'Untitled Note';
      activeNote.date = new Date().toLocaleDateString();

      saveToStorage();
      renderNoteItems();
      updateWordCount(content);
    }
  });

  newBtn.addEventListener('click', () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      date: new Date().toLocaleDateString()
    };
    notes.unshift(newNote);
    activeNoteId = newNote.id;
    saveToStorage();
    renderNoteItems();
    loadActiveNoteContent();
    textArea.focus();
  });

  // Start initialization
  renderNoteItems();
  loadActiveNoteContent();
}

// ------------------------------------------
// E. CALCULATOR RUNTIME BINDINGS
// ------------------------------------------
function bindCalculator(win) {
  const display = win.querySelector('#calc-screen');
  const buttons = win.querySelectorAll('.calc-btn');

  let currentVal = '0';
  let prevVal = null;
  let currentOp = null;
  let resetOnNextInput = false;

  function updateDisplay(val) {
    if (!display) return;
    display.textContent = formatNumber(val).substring(0, 11);
  }

  function formatNumber(numStr) {
    if (numStr === 'Error' || numStr === 'NaN') return numStr;
    const num = parseFloat(numStr);
    if (isNaN(num)) return numStr;

    const parts = numStr.split('.');
    let formatted = parseFloat(parts[0]).toLocaleString('en-US');
    if (parts.length > 1) {
      formatted += '.' + parts[1];
    }
    return formatted;
  }

  function clearActiveOp() {
    buttons.forEach(btn => btn.classList.remove('active-op'));
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      if (!val) return;

      if (!isNaN(val) || val === '.') {
        // Number Input
        clearActiveOp();
        if (currentVal === '0' || resetOnNextInput) {
          currentVal = val === '.' ? '0.' : val;
          resetOnNextInput = false;
        } else {
          if (val === '.' && currentVal.includes('.')) return;
          currentVal += val;
        }
        updateDisplay(currentVal);
      } else {
        // Action Input
        switch (val) {
          case 'ac':
            clearActiveOp();
            currentVal = '0';
            prevVal = null;
            currentOp = null;
            resetOnNextInput = false;
            updateDisplay(currentVal);
            break;
          case 'neg':
            currentVal = (parseFloat(currentVal) * -1).toString();
            updateDisplay(currentVal);
            break;
          case 'percent':
            currentVal = (parseFloat(currentVal) / 100).toString();
            updateDisplay(currentVal);
            break;
          case '=':
            clearActiveOp();
            if (currentOp && prevVal !== null) {
              calculateResult();
              currentOp = null;
            }
            break;
          default:
            // Math operations (+, -, *, /)
            clearActiveOp();
            btn.classList.add('active-op');
            if (currentOp && !resetOnNextInput) {
              calculateResult();
            }
            prevVal = parseFloat(currentVal);
            currentOp = val;
            resetOnNextInput = true;
        }
      }
    });
  });

  function calculateResult() {
    const cur = parseFloat(currentVal);
    let result = 0;

    switch (currentOp) {
      case '+': result = prevVal + cur; break;
      case '-': result = prevVal - cur; break;
      case '*': result = prevVal * cur; break;
      case '/': result = cur === 0 ? 'Error' : prevVal / cur; break;
    }

    currentVal = result.toString();
    prevVal = null;
    resetOnNextInput = true;
    updateDisplay(currentVal);
  }

  // Handle keyboard inputs natively when calculator is focused
  const handleKeyboard = (e) => {
    if (!win.classList.contains('active')) return;

    let key = e.key;
    let targetVal = null;

    if (key >= '0' && key <= '9') {
      targetVal = key;
    } else if (key === '.') {
      targetVal = '.';
    } else if (key === '+') {
      targetVal = '+';
    } else if (key === '-') {
      targetVal = '-';
    } else if (key === '*') {
      targetVal = '*';
    } else if (key === '/') {
      targetVal = '/';
    } else if (key === 'Enter' || key === '=') {
      targetVal = '=';
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      targetVal = 'ac';
    }

    if (targetVal) {
      e.preventDefault();
      const btn = win.querySelector(`.calc-btn[data-val="${targetVal}"]`);
      if (btn) {
        btn.click();
      }
    }
  };

  document.addEventListener('keydown', handleKeyboard);

  // Clean up listener when window is closed
  const observer = new MutationObserver(() => {
    if (!document.body.contains(win)) {
      document.removeEventListener('keydown', handleKeyboard);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ------------------------------------------
// F. SYSTEM SETTINGS RUNTIME BINDINGS
// ------------------------------------------
function bindSettings(win) {
  const sidebarItems = win.querySelectorAll('.settings-sidebar-item');
  const container = win.querySelector('#settings-pane-container');

  const wallpaperList = [
    { name: 'Mac Tahoe Day', varName: 'var(--wallpaper-mac-tahoe-day)', url: './assets/MacTahoe-day.jpeg' },
    { name: 'Mac Tahoe Night', varName: 'var(--wallpaper-mac-tahoe-night)', url: './assets/MacTahoe-night.jpeg' }
  ];

  function renderPane(tabName) {
    if (!container) return;
    container.innerHTML = '';

    if (tabName === 'general') {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      container.innerHTML = `
        <div class="settings-section-title">General Settings</div>
        <div class="settings-option-group">
          <div class="settings-option-row">
            <span>Dark Mode Accent</span>
            <label class="switch">
              <input type="checkbox" class="settings-theme-switch" ${isDark ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
          <div class="settings-option-row">
            <span>Dock Magnification</span>
            <span style="font-size:12px; color:var(--text-secondary);">Proximity Scaling Enabled</span>
          </div>
          <div class="settings-option-row">
            <span>Folder Color</span>
            <select id="settings-folder-color" style="background:rgba(255,255,255,0.1); border:none; color:inherit; padding:2px 8px; border-radius:4px; outline:none; font-family:var(--font-body); font-size:12px;">
              <option value="color-blue" ${localStorage.getItem('folderColor') === 'color-blue' || !localStorage.getItem('folderColor') ? 'selected' : ''} style="color:#000;">Blue</option>
              <option value="color-green" ${localStorage.getItem('folderColor') === 'color-green' ? 'selected' : ''} style="color:#000;">Green</option>
              <option value="color-grey" ${localStorage.getItem('folderColor') === 'color-grey' ? 'selected' : ''} style="color:#000;">Grey</option>
              <option value="color-nord" ${localStorage.getItem('folderColor') === 'color-nord' ? 'selected' : ''} style="color:#000;">Nord</option>
              <option value="color-orange" ${localStorage.getItem('folderColor') === 'color-orange' ? 'selected' : ''} style="color:#000;">Orange</option>
              <option value="color-purple" ${localStorage.getItem('folderColor') === 'color-purple' ? 'selected' : ''} style="color:#000;">Purple</option>
              <option value="color-red" ${localStorage.getItem('folderColor') === 'color-red' ? 'selected' : ''} style="color:#000;">Red</option>
              <option value="color-yellow" ${localStorage.getItem('folderColor') === 'color-yellow' ? 'selected' : ''} style="color:#000;">Yellow</option>
            </select>
          </div>
        </div>
      `;

      // Handle checkbox change
      const themeSwitch = container.querySelector('.settings-theme-switch');
      if (themeSwitch) {
        themeSwitch.addEventListener('change', (e) => {
          // Trigger click on Control Center theme node to maintain sync
          const ccThemeToggle = document.getElementById('cc-theme-toggle');
          if (ccThemeToggle) {
            ccThemeToggle.click();
          }
        });
      }
      
      const folderColorSelect = container.querySelector('#settings-folder-color');
      if (folderColorSelect) {
        folderColorSelect.addEventListener('change', (e) => {
          localStorage.setItem('folderColor', e.target.value);
          // dispatch event so Finder updates instantly
          window.dispatchEvent(new Event('fs-change'));
        });
      }

    } else if (tabName === 'wallpaper') {
      container.innerHTML = `
        <div class="settings-section-title">Desktop Wallpapers</div>
        <p style="font-size:12px; opacity:0.7; margin-bottom:12px;">Choose a high-resolution Apple wallpaper design:</p>
        <div class="wallpaper-grid" id="settings-wallpapers"></div>
      `;

      const wallGrid = container.querySelector('#settings-wallpapers');
      wallpaperList.forEach(wp => {
        const item = document.createElement('div');
        item.className = 'wallpaper-preview';
        item.style.backgroundImage = `url(${wp.url})`;

        // Active border highlights
        const currentActive = getComputedStyle(document.documentElement).getPropertyValue('--wallpaper-active').trim();
        if (currentActive === wp.varName) {
          item.classList.add('active');
        }

        item.addEventListener('click', () => {
          document.querySelectorAll('.wallpaper-preview').forEach(el => el.classList.remove('active'));
          item.classList.add('active');

          // Instantly set wallpaper active CSS property
          document.documentElement.style.setProperty('--wallpaper-active', wp.varName);

          // Lock screen blurs update implicitly
          const lockBg = document.querySelector('.lock-screen-bg');
          if (lockBg) lockBg.style.backgroundImage = `var(--wallpaper-active)`;
        });

        wallGrid.appendChild(item);
      });

    } else if (tabName === 'glass') {
      // Liquid Glass customizer interface
      container.innerHTML = `
        <div class="settings-section-title">Liquid Glass Customizer</div>
        <p style="font-size:12.5px; opacity:0.75; margin-bottom:12px; line-height:1.45;">Fine-tune your refractive material styles and window refraction settings:</p>
        <div class="settings-option-group">
          <div class="settings-option-row">
            <span>Backdrop Blur Intensity</span>
            <input type="range" id="glass-blur-range" min="10" max="80" value="50" style="width:130px; accent-color:var(--primary-accent);">
          </div>
          <div class="settings-option-row">
            <span>Glass Edge Contrast (Border)</span>
            <input type="range" id="glass-border-range" min="10" max="90" value="50" style="width:130px; accent-color:var(--primary-accent);">
          </div>
          <div class="settings-option-row">
            <span>Satin Sheen Opacity</span>
            <input type="range" id="glass-sheen-range" min="5" max="60" value="35" style="width:130px; accent-color:var(--primary-accent);">
          </div>
        </div>
        <p style="font-size:11px; opacity:0.55; line-height:1.45; margin-top:8px;">Adjusting these sliders dynamically updates the root CSS customizer tokens and applies real-time styling changes across all desktop glass layers.</p>
      `;

      // Attach Customizer Event Listeners
      const blurRange = container.querySelector('#glass-blur-range');
      const borderRange = container.querySelector('#glass-border-range');
      const sheenRange = container.querySelector('#glass-sheen-range');

      if (blurRange) {
        blurRange.addEventListener('input', (e) => {
          const val = e.target.value;
          document.querySelectorAll('.mac-window, .glass').forEach(el => {
            el.style.backdropFilter = `blur(${val}px) saturate(250%)`;
            el.style.webkitBackdropFilter = `blur(${val}px) saturate(250%)`;
          });
        });
      }

      if (borderRange) {
        borderRange.addEventListener('input', (e) => {
          const val = e.target.value / 100;
          document.querySelectorAll('.mac-window, .glass').forEach(el => {
            el.style.borderColor = `rgba(255, 255, 255, ${val})`;
          });
        });
      }

      if (sheenRange) {
        sheenRange.addEventListener('input', (e) => {
          const val = e.target.value / 100;
          document.querySelectorAll('.mac-window, .glass').forEach(el => {
            el.style.background = `linear-gradient(135deg, rgba(255, 255, 255, ${val * 1.5}), rgba(255, 255, 255, ${val * 0.25}))`;
          });
        });
      }

    } else if (tabName === 'about') {
      container.innerHTML = `
        <div class="settings-section-title">About This Mac</div>
        <div class="settings-option-group" style="padding:15px; display:flex; flex-direction:column; gap:12px;">
          <div style="font-weight:700; font-size:15px;">macOS Tahoe - Web Edition</div>
          <div style="font-size:12.5px; opacity:0.8; line-height:1.5;">
            This system demonstrates WWDC 2025 Liquid Glass desktop environments using modular ES6 scripts, Apple Intelligence stacks, and native canvas renderers.
          </div>
          <div style="font-size:11px; opacity:0.6;">Designed by Vedant Bhatnagar &copy; 2026.</div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      renderPane(item.dataset.tab);
    });
  });

  // Default pane
  renderPane('general');
}

// ------------------------------------------
// G. ARCADE GAMES APPLICATION BINDINGS
// ------------------------------------------
function bindGames(win) {
  const libraryGrid = win.querySelector('#games-arcade-grid');
  const arena = win.querySelector('#skiing-game-arena');
  const btnPlay = win.querySelector('#btn-play-skiing');
  const btnBack = win.querySelector('#btn-skiing-back');
  const canvas = win.querySelector('#skiing-canvas');

  const scoreText = win.querySelector('#skiing-score');
  const speedText = win.querySelector('#skiing-speed');
  const highscoreText = win.querySelector('#skiing-highscore');

  let animationFrameId = null;
  let gameRunning = false;
  let score = 0;
  let speedMult = 1.0;
  let highscore = localStorage.getItem('mac_ski_highscore') || 0;
  highscoreText.textContent = highscore;

  // Player position
  let playerX = 250;
  const playerY = 80;
  let keys = {};

  // Obstacles
  let obstacles = [];
  const obstacleTypes = ['🌲', '🪨'];

  function spawnObstacle() {
    if (obstacles.length < 5 + Math.floor(score / 15)) {
      obstacles.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: canvas.height + 20,
        type: obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)],
        passed: false
      });
    }
  }

  function resetGame() {
    score = 0;
    speedMult = 1.0;
    playerX = 250;
    obstacles = [];
    keys = {};
    gameRunning = true;
    scoreText.textContent = score;
    speedText.textContent = '1.0x';
  }

  function updateGame() {
    if (!gameRunning) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw snow background with scrolling snow lines
    ctx.fillStyle = '#f7f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(0, 122, 255, 0.05)';
    ctx.lineWidth = 2;
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // 2. Steer player
    const steerSpeed = 4 * speedMult;
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
      playerX -= steerSpeed;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
      playerX += steerSpeed;
    }

    // Clamp within bounds
    playerX = Math.max(20, Math.min(canvas.width - 20, playerX));

    // 3. Draw player skier
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⛷️', playerX, playerY);

    // 4. Handle obstacles
    if (Math.random() < 0.03 * speedMult) {
      spawnObstacle();
    }

    const obsSpeed = 3.5 * speedMult;
    obstacles.forEach((obs, index) => {
      // Scroll obstacles up
      obs.y -= obsSpeed;

      // Draw obstacle
      ctx.fillText(obs.type, obs.x, obs.y);

      // Check collision
      const dist = Math.hypot(playerX - obs.x, playerY - obs.y);
      if (dist < 20) {
        // Crash! Game Over
        gameOver();
      }

      // Check pass
      if (obs.y < playerY - 10 && !obs.passed) {
        obs.passed = true;
        score += 1;
        scoreText.textContent = score;

        // Speed up every 10 points
        if (score % 10 === 0) {
          speedMult += 0.2;
          speedText.textContent = `${speedMult.toFixed(1)}x`;
        }

        if (score > highscore) {
          highscore = score;
          highscoreText.textContent = highscore;
          localStorage.setItem('mac_ski_highscore', highscore);
        }
      }
    });

    // Remove offscreen obstacles
    obstacles = obstacles.filter(obs => obs.y > -30);

    if (gameRunning) {
      animationFrameId = requestAnimationFrame(updateGame);
    }
  }

  function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);

    // Play crash sound feedback
    if (window.systemSounds) {
      window.systemSounds.playVolumePop();
    }

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff3b30';
    ctx.font = 'bold 28px var(--font-display)';
    ctx.fillText('CRASHED! GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px var(--font-body)';
    ctx.fillText(`Your Score: ${score}  |  High Score: ${highscore}`, canvas.width / 2, canvas.height / 2 + 15);
    ctx.fillText('Press SPACEBAR or ENTER to Ski Again', canvas.width / 2, canvas.height / 2 + 45);
  }

  // Keyboard Event Hooks
  const handleKeyDown = (e) => {
    if (!win.classList.contains('active')) return;

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
      e.preventDefault(); // Stop standard page scrolls
    }

    keys[e.key] = true;

    if (!gameRunning) {
      if (e.key === ' ' || e.key === 'Enter') {
        resetGame();
        updateGame();
      }
    }
  };

  const handleKeyUp = (e) => {
    keys[e.key] = false;
  };

  // Bind Buttons
  btnPlay.addEventListener('click', () => {
    libraryGrid.classList.add('hidden');
    arena.classList.remove('hidden');
    resetGame();
    updateGame();
    canvas.focus();
  });

  btnBack.addEventListener('click', () => {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    arena.classList.add('hidden');
    libraryGrid.classList.remove('hidden');
  });

  win.addEventListener('pointerdown', () => {
    if (gameRunning) canvas.focus();
  });

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  const observer = new MutationObserver(() => {
    if (!document.body.contains(win)) {
      gameRunning = false;
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ------------------------------------------
// D. APP STORE BINDINGS
// ------------------------------------------
const savedApps = localStorage.getItem('tahoe_installed_apps');
window.installedApps = savedApps ? JSON.parse(savedApps) : { finder: true, safari: true, notes: true, terminal: true, calculator: true, settings: true, games: true };

// Bulletproof dynamic icons injection into Dock & Desktop
const titleMap = {
  paint: 'Paint Sketchpad',
  calendar: 'Calendar',
  timer: 'Timer & Clock',
  camera: 'FaceTime Camera'
};

const iconBgStyle = {
  paint: 'linear-gradient(135deg, #ff9500 0%, #ff5e3a 100%)',
  calendar: 'linear-gradient(135deg, #ff3b30 0%, #ff2d55 100%)',
  timer: 'linear-gradient(135deg, #5856d6 0%, #c644fc 100%)',
  camera: 'linear-gradient(135deg, #4cd964 0%, #28cd41 100%)'
};

const iconLucideMap = {
  paint: 'palette',
  calendar: 'calendar',
  timer: 'clock',
  camera: 'aperture'
};

const iconImagePath = {
  paint: 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/gnome-paint.ico',
  calendar: 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/calendar.ico',
  timer: 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/add-times.ico',
  camera: 'assets/macOS 26 Tahoe Icons Resources/Extra Resources Package/Icons Pack/apps/accessories-camera.ico'
};

export function addDockIcon(appId) {
  const dock = document.getElementById('mac-dock');
  if (!dock) return;

  if (dock.querySelector(`.dock-item-wrapper[data-app="${appId}"]`)) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'dock-item-wrapper';
  wrapper.setAttribute('data-app', appId);

  wrapper.innerHTML = `
    <img class="dock-item" src="${iconImagePath[appId]}" alt="${titleMap[appId]}" />
    <div class="indicator" id="ind-${appId}"></div>
  `;

  const settingsItem = dock.querySelector('.dock-item-wrapper[data-app="settings"]');
  if (settingsItem) {
    dock.insertBefore(wrapper, settingsItem);
  } else {
    dock.appendChild(wrapper);
  }

  wrapper.addEventListener('click', () => {
    if (window.launchSystemApp) window.launchSystemApp(appId);
  });

  if (window.lucide) window.lucide.createIcons();
}

export function addDesktopIcon(appId) {
  const desktop = document.querySelector('.desktop-icons');
  if (!desktop) return;

  if (desktop.querySelector(`.desktop-icon[data-app="${appId}"]`)) return;

  const div = document.createElement('div');
  div.className = 'desktop-icon';
  div.setAttribute('data-app', appId);

  div.innerHTML = `
    <img class="desktop-icon-img" src="${iconImagePath[appId]}" alt="${titleMap[appId]}" style="width: 40px; height: 40px; object-fit: contain; margin-bottom: 2px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));" />
    <span class="icon-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${titleMap[appId]}</span>
  `;

  desktop.appendChild(div);

  div.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
    div.classList.add('selected');
  });

  div.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    if (window.launchSystemApp) window.launchSystemApp(appId);
  });

  if (window.lucide) window.lucide.createIcons();
}

export function syncInstalledApps() {
  const customApps = ['paint', 'calendar', 'timer', 'camera'];
  customApps.forEach(appId => {
    if (window.installedApps && window.installedApps[appId]) {
      addDockIcon(appId);
      addDesktopIcon(appId);
    }
  });
}

function bindAppStore(win) {
  // Bulletproof button state update based on window.installedApps
  const updateButtons = () => {
    const installButtons = win.querySelectorAll('.store-install-btn');
    installButtons.forEach(btn => {
      const appId = btn.getAttribute('data-app') || btn.dataset.app;
      if (window.installedApps && window.installedApps[appId]) {
        btn.textContent = 'OPEN';
        btn.style.background = '#30d158'; // green
      }
    });
  };

  updateButtons();

  // Use event delegation on the win container for bulletproof click interception
  win.addEventListener('click', (e) => {
    const btn = e.target.closest('.store-install-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const appId = btn.getAttribute('data-app') || btn.dataset.app;
    if (!appId) return;

    window.installedApps = window.installedApps || {};

    if (window.installedApps[appId]) {
      // App is already installed, launch it!
      if (window.launchSystemApp) {
        window.launchSystemApp(appId);
      }
    } else {
      // App is not installed, trigger premium loading animation
      btn.disabled = true;
      btn.style.cursor = 'not-allowed';
      btn.style.opacity = '0.7';

      let progress = 0;
      btn.textContent = '0%';
      btn.style.background = 'rgba(255,255,255,0.1)';

      const installInterval = setInterval(() => {
        progress += 10;
        btn.textContent = `${progress}%`;

        if (progress >= 100) {
          clearInterval(installInterval);

          // Mark as installed
          window.installedApps[appId] = true;
          localStorage.setItem('tahoe_installed_apps', JSON.stringify(window.installedApps));

          btn.disabled = false;
          btn.style.cursor = 'pointer';
          btn.style.opacity = '1';
          btn.textContent = 'OPEN';
          btn.style.background = '#30d158'; // green

          // Dynamically inject Dock & Desktop icons!
          addDockIcon(appId);
          addDesktopIcon(appId);

          // Play tick sound with safety fallback
          try {
            if (window.systemSounds) window.systemSounds.playVolumePop();
          } catch (soundErr) {
            console.warn('Audio feedback failed:', soundErr);
          }
        }
      }, 150);
    }
  });

  const sidebarItems = win.querySelectorAll('.store-sidebar-item');
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(el => el.classList.remove('active'));
      sidebarItems.forEach(el => el.style.background = 'none');
      item.classList.add('active');
      item.style.background = 'rgba(255,255,255,0.1)';
    });
  });
}

// ------------------------------------------
// E. PAINT SKETCHPAD BINDINGS
// ------------------------------------------
function bindPaint(win) {
  const canvas = win.querySelector('.paint-canvas');
  const ctx = canvas.getContext('2d');
  const colorInput = win.querySelector('.paint-color');
  const sizeInput = win.querySelector('.paint-size');
  const sizeValDisplay = win.querySelector('.paint-size-val');
  const opacityInput = win.querySelector('.paint-opacity');
  const bgSelect = win.querySelector('.paint-canvas-bg');
  const eraserBtn = win.querySelector('.paint-btn-eraser');
  const clearBtn = win.querySelector('.paint-btn-clear');
  const exportBtn = win.querySelector('.paint-btn-export');

  let painting = false;
  let eraserActive = false;

  // Responsive Canvas Size binding
  function resizeCanvas() {
    const workspace = canvas.parentElement;
    canvas.width = workspace.clientWidth || 400;
    canvas.height = workspace.clientHeight || 300;

    // Fill background initially
    ctx.fillStyle = bgSelect.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Defer execution until window is displayed so clientWidth resolves
  setTimeout(resizeCanvas, 150);

  sizeInput.addEventListener('input', () => {
    sizeValDisplay.textContent = `${sizeInput.value}px`;
  });

  eraserBtn.addEventListener('click', () => {
    eraserActive = !eraserActive;
    if (eraserActive) {
      eraserBtn.style.background = '#0071e3';
      eraserBtn.style.color = '#fff';
    } else {
      eraserBtn.style.background = '#2b2b2d';
      eraserBtn.style.color = '#fff';
    }
  });

  bgSelect.addEventListener('change', () => {
    if (confirm('Changing canvas background will clear your current sketch. Proceed?')) {
      ctx.fillStyle = bgSelect.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  });

  clearBtn.addEventListener('click', () => {
    ctx.fillStyle = bgSelect.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  exportBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `Sketch_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;

    // Get pointer coordinates relative to canvas bounding box
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineWidth = sizeInput.value;
    ctx.lineCap = 'round';

    if (eraserActive) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = colorInput.value;
      ctx.globalAlpha = opacityInput.value / 100;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseleave', finishedPosition);

  // Touch triggers
  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', finishedPosition);
  canvas.addEventListener('touchmove', draw);
}

// ------------------------------------------
// F. CALENDAR BINDINGS
// ------------------------------------------
function bindCalendar(win) {
  const monthTitle = win.querySelector('.cal-month-title');
  const daysGrid = win.querySelector('.cal-days-grid');
  const prevBtn = win.querySelector('.cal-prev-btn');
  const nextBtn = win.querySelector('.cal-next-btn');
  const todayBtn = win.querySelector('.cal-today-btn');

  const eventPanel = win.querySelector('.cal-event-panel');
  const eventClose = win.querySelector('.cal-event-close');
  const eventInput = win.querySelector('.cal-event-input');
  const eventSaveBtn = win.querySelector('.cal-event-save-btn');
  const eventDateStr = win.querySelector('.cal-event-date-str');

  let activeDate = new Date();
  let selectedDateKey = '';
  const eventsKey = 'macos-tahoe-calendar-events';

  function getEvents() {
    return JSON.parse(localStorage.getItem(eventsKey) || '{}');
  }

  function saveEvent(dateKey, desc) {
    const events = getEvents();
    if (desc.trim()) {
      events[dateKey] = desc.trim();
    } else {
      delete events[dateKey];
    }
    localStorage.setItem(eventsKey, JSON.stringify(events));
  }

  function renderGrid() {
    daysGrid.innerHTML = '';
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthTitle.textContent = `${monthNames[month]} ${year}`;

    // First day of active month & total days
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const events = getEvents();

    // Fill preceding blanks
    for (let i = 0; i < firstDayIndex; i++) {
      const cell = document.createElement('div');
      cell.style.opacity = '0.2';
      daysGrid.appendChild(cell);
    }

    // Generate month days
    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement('div');
      cell.style.display = 'flex';
      cell.style.flexDirection = 'column';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.padding = '4px 0';
      cell.style.borderRadius = '50%';
      cell.style.fontSize = '12px';
      cell.style.cursor = 'pointer';
      cell.style.position = 'relative';
      cell.style.transition = 'background-color 0.15s';

      cell.innerHTML = `<span>${day}</span>`;

      const dateKey = `${year}-${month}-${day}`;

      // Check for event indicators
      if (events[dateKey]) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.bottom = '3px';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.borderRadius = '50%';
        dot.style.background = '#0071e3';
        dot.style.boxShadow = '0 0 4px #0071e3';
        cell.appendChild(dot);
      }

      // Highlight active current day
      const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
      if (isToday) {
        cell.style.background = 'rgba(0,113,227,0.3)';
        cell.style.border = '1px solid #0071e3';
        cell.style.fontWeight = '700';
        cell.style.boxShadow = '0 0 10px rgba(0,113,227,0.2)';
      }

      cell.addEventListener('mouseenter', () => {
        if (!isToday) cell.style.background = 'rgba(255,255,255,0.06)';
      });
      cell.addEventListener('mouseleave', () => {
        if (!isToday) cell.style.background = 'none';
      });

      cell.addEventListener('click', () => {
        selectedDateKey = dateKey;
        eventDateStr.textContent = `${monthNames[month]} ${day}, ${year}`;
        eventInput.value = events[dateKey] || '';
        eventPanel.classList.remove('hidden');
        eventInput.focus();
      });

      daysGrid.appendChild(cell);
    }
  }

  prevBtn.addEventListener('click', () => {
    activeDate.setMonth(activeDate.getMonth() - 1);
    renderGrid();
  });

  nextBtn.addEventListener('click', () => {
    activeDate.setMonth(activeDate.getMonth() + 1);
    renderGrid();
  });

  todayBtn.addEventListener('click', () => {
    activeDate = new Date();
    renderGrid();
  });

  eventClose.addEventListener('click', () => {
    eventPanel.classList.add('hidden');
  });

  eventSaveBtn.addEventListener('click', () => {
    saveEvent(selectedDateKey, eventInput.value);
    eventPanel.classList.add('hidden');
    renderGrid();
  });

  renderGrid();
}

// ------------------------------------------
// G. TIMER & CLOCK BINDINGS
// ------------------------------------------
function bindTimer(win) {
  const timerTab = win.querySelector('.timer-tab-btn');
  const stopwatchTab = win.querySelector('.stopwatch-tab-btn');
  const timerView = win.querySelector('.timer-view');
  const stopwatchView = win.querySelector('.stopwatch-view');

  // Timer elements
  const ring = win.querySelector('.timer-progress-ring');
  const timeDisplay = win.querySelector('.timer-time-display');
  const minInput = win.querySelector('.timer-min');
  const secInput = win.querySelector('.timer-sec');
  const btnReset = win.querySelector('.timer-btn-reset');
  const btnStart = win.querySelector('.timer-btn-start');

  let timerInterval = null;
  let totalSeconds = 0;
  let remainingSeconds = 0;
  let timerRunning = false;
  const ringCircumference = 351.8; // 2 * pi * 56

  // Stopwatch elements
  const swDisplay = win.querySelector('.sw-time-display');
  const swBtnLap = win.querySelector('.sw-btn-lap');
  const swBtnStart = win.querySelector('.sw-btn-start');
  const swLapsList = win.querySelector('.sw-laps-list');

  let swInterval = null;
  let swTime = 0; // in centiseconds (10ms)
  let swRunning = false;
  let laps = [];

  // Tabs navigation
  timerTab.addEventListener('click', () => {
    timerTab.classList.add('active');
    timerTab.style.color = '#0071e3';
    timerTab.style.borderBottom = '2px solid #0071e3';
    stopwatchTab.classList.remove('active');
    stopwatchTab.style.color = '#fff';
    stopwatchTab.style.borderBottom = 'none';
    timerView.classList.remove('hidden');
    stopwatchView.classList.add('hidden');
  });

  stopwatchTab.addEventListener('click', () => {
    stopwatchTab.classList.add('active');
    stopwatchTab.style.color = '#0071e3';
    stopwatchTab.style.borderBottom = '2px solid #0071e3';
    timerTab.classList.remove('active');
    timerTab.style.color = '#fff';
    timerTab.style.borderBottom = 'none';
    stopwatchView.classList.remove('hidden');
    timerView.classList.add('hidden');
  });

  // COUNTDOWN TIMER LOGIC
  function updateRing(pct) {
    if (ring) {
      const offset = ringCircumference - (pct * ringCircumference);
      ring.style.strokeDashoffset = offset;
    }
  }

  function formatTime(m, s) {
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  btnStart.addEventListener('click', () => {
    if (timerRunning) {
      // Pause Countdown
      clearInterval(timerInterval);
      timerRunning = false;
      btnStart.textContent = 'Resume';
      btnStart.style.background = '#32d74b';
    } else {
      // Start Countdown
      const m = parseInt(minInput.value) || 0;
      const s = parseInt(secInput.value) || 0;

      if (remainingSeconds === 0) {
        totalSeconds = m * 60 + s;
        remainingSeconds = totalSeconds;
      }

      if (remainingSeconds <= 0) return;

      timerRunning = true;
      btnStart.textContent = 'Pause';
      btnStart.style.background = '#ff9f0a'; // orange

      timerInterval = setInterval(() => {
        remainingSeconds--;

        const remMin = Math.floor(remainingSeconds / 60);
        const remSec = remainingSeconds % 60;
        timeDisplay.textContent = formatTime(remMin, remSec);

        const pct = remainingSeconds / totalSeconds;
        updateRing(pct);

        if (remainingSeconds <= 0) {
          clearInterval(timerInterval);
          timerRunning = false;
          timeDisplay.textContent = '00:00';
          updateRing(0);
          btnStart.textContent = 'Start';
          btnStart.style.background = '#32d74b';

          // Play high pitched alarm tone
          if (window.systemSounds && window.systemSounds.ctx) {
            const now = window.systemSounds.ctx.currentTime;
            for (let i = 0; i < 3; i++) {
              const osc = window.systemSounds.ctx.createOscillator();
              const gain = window.systemSounds.ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(880, now + i * 0.4);
              gain.gain.setValueAtTime(0, now + i * 0.4);
              gain.gain.linearRampToValueAtTime(0.2, now + i * 0.4 + 0.05);
              gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.4 + 0.3);
              osc.connect(gain);
              gain.connect(window.systemSounds.ctx.destination);
              osc.start(now + i * 0.4);
              osc.stop(now + i * 0.4 + 0.35);
            }
          }
          alert('Timer Expired!');
        }
      }, 1000);
    }
  });

  btnReset.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    remainingSeconds = 0;
    totalSeconds = 0;
    timeDisplay.textContent = formatTime(minInput.value, secInput.value);
    updateRing(1.0);
    btnStart.textContent = 'Start';
    btnStart.style.background = '#32d74b';
  });

  // STOPWATCH LOGIC
  function formatStopwatch(centiseconds) {
    const min = Math.floor(centiseconds / 6000);
    const sec = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  }

  swBtnStart.addEventListener('click', () => {
    if (swRunning) {
      // Pause
      clearInterval(swInterval);
      swRunning = false;
      swBtnStart.textContent = 'Start';
      swBtnStart.style.background = '#0071e3';
    } else {
      // Start
      swRunning = true;
      swBtnStart.textContent = 'Stop';
      swBtnStart.style.background = '#ff453a';

      swInterval = setInterval(() => {
        swTime++;
        swDisplay.textContent = formatStopwatch(swTime);
      }, 10);
    }
  });

  swBtnLap.addEventListener('click', () => {
    if (swRunning) {
      // Log lap
      laps.push(swTime);
      swLapsList.innerHTML = '';
      laps.forEach((lap, index) => {
        const lapRow = document.createElement('div');
        lapRow.style.display = 'flex';
        lapRow.style.justifyContent = 'space-between';
        lapRow.style.padding = '4px 0';
        lapRow.style.borderBottom = '0.5px solid rgba(255,255,255,0.04)';
        lapRow.innerHTML = `<span>Lap ${index + 1}</span><span>${formatStopwatch(lap)}</span>`;
        swLapsList.appendChild(lapRow);
      });
      // Scroll to bottom
      swLapsList.scrollTop = swLapsList.scrollHeight;
    } else {
      // Reset
      clearInterval(swInterval);
      swTime = 0;
      laps = [];
      swRunning = false;
      swDisplay.textContent = '00:00.00';
      swBtnStart.textContent = 'Start';
      swBtnStart.style.background = '#0071e3';
      swLapsList.innerHTML = '<div style="opacity:0.4; text-align:center; padding:6px 0;">No Laps Yet</div>';
    }
  });

  // Clean listeners on close mutation
  const observer = new MutationObserver(() => {
    if (!document.body.contains(win)) {
      clearInterval(timerInterval);
      clearInterval(swInterval);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ------------------------------------------
// H. CAMERA (FACETIME CRAWLER) BINDINGS
// ------------------------------------------
function bindCamera(win) {
  const video = win.querySelector('.camera-video');
  const fallback = win.querySelector('.camera-fallback');
  const flash = win.querySelector('.camera-flash');
  const shutterBtn = win.querySelector('.camera-shutter-btn');
  const filtersBar = win.querySelector('.camera-filters-bar');

  let streamRef = null;

  // Attempt camera connection
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      streamRef = stream;
      video.srcObject = stream;
      fallback.classList.add('hidden');
    })
    .catch(err => {
      console.warn('FaceTime Webcam block/missing:', err);
      fallback.classList.remove('hidden');
    });

  // Filter application
  filtersBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.cam-filter-btn');
    if (!btn) return;

    filtersBar.querySelectorAll('.cam-filter-btn').forEach(el => el.classList.remove('active'));
    filtersBar.querySelectorAll('.cam-filter-btn').forEach(el => el.style.background = 'rgba(255,255,255,0.05)');
    btn.classList.add('active');
    btn.style.background = 'rgba(255,255,255,0.15)';

    const filter = btn.dataset.filter;
    // Map filters to standard CSS matrices
    const filterMap = {
      normal: 'none',
      mono: 'grayscale(1)',
      noir: 'contrast(1.4) brightness(0.9) grayscale(1)',
      instant: 'contrast(1.1) brightness(1.05) sepia(0.2) hue-rotate(-5deg)',
      sepia: 'sepia(0.9)'
    };

    video.style.filter = filterMap[filter] || 'none';
    fallback.style.filter = filterMap[filter] || 'none';
  });

  // Shutter Snapshot Capturing
  shutterBtn.addEventListener('click', () => {
    // Shutter animation flash
    flash.style.opacity = '1';
    setTimeout(() => {
      flash.style.opacity = '0';
    }, 150);

    // Mechanical camera sound (Crisp Volume click)
    if (window.systemSounds) window.systemSounds.playVolumePop();

    // Create dynamic capture canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 640;
    tempCanvas.height = 480;
    const tempCtx = tempCanvas.getContext('2d');

    // Flip horizontal standard webcam display
    tempCtx.translate(640, 0);
    tempCtx.scale(-1, 1);

    if (streamRef) {
      tempCtx.drawImage(video, 0, 0, 640, 480);
    } else {
      // Draw simulated gorgeous lens bokeh grid!
      const grad = tempCtx.createRadialGradient(320, 240, 50, 320, 240, 300);
      grad.addColorStop(0, '#3a82f6');
      grad.addColorStop(1, '#0d0f14');
      tempCtx.fillStyle = grad;
      tempCtx.fillRect(0, 0, 640, 480);

      tempCtx.fillStyle = '#ffffff';
      tempCtx.font = '700 24px sans-serif';
      tempCtx.textAlign = 'center';
      tempCtx.fillText('FaceTime Snapshot', 320, 240);
      tempCtx.font = '400 14px sans-serif';
      tempCtx.fillText('Simulated Webcam Render', 320, 270);
    }

    // Apply active camera filter to the snapshot before saving
    const activeFilter = filtersBar.querySelector('.cam-filter-btn.active')?.dataset.filter || 'normal';
    if (activeFilter !== 'normal') {
      const pixels = tempCtx.getImageData(0, 0, 640, 480);
      const d = pixels.data;
      if (activeFilter === 'mono' || activeFilter === 'noir') {
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          let v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (activeFilter === 'noir') {
            v = v < 128 ? (v * v) / 128 : 255 - ((255 - v) * (255 - v)) / 128;
          }
          d[i] = d[i + 1] = d[i + 2] = v;
        }
        tempCtx.putImageData(pixels, 0, 0);
      } else if (activeFilter === 'sepia') {
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          d[i] = (r * .393) + (g * .769) + (b * .189);
          d[i + 1] = (r * .349) + (g * .686) + (b * .168);
          d[i + 2] = (r * .272) + (g * .534) + (b * .131);
        }
        tempCtx.putImageData(pixels, 0, 0);
      }
    }

    const dataUrl = tempCanvas.toDataURL('image/png');

    // Create photo file in virtual filesystem and add to Desktop shortcut!
    const photoName = `Snapshot_${Date.now()}.png`;

    // Add to Desktop in mockFS (using correct children navigation)
    mockFS.children.Desktop.children[photoName] = {
      type: 'file',
      content: dataUrl
    };

    // Save to the real persistent filesystem via backend
    fetch('/api/save-file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: photoName, content: dataUrl })
    })
    .then(res => res.json())
    .then(() => {
      console.log('Snapshot successfully persisted to disk.');
    })
    .catch(err => {
      console.error('Failed to persist snapshot to disk:', err);
    });

    // Dispatch filesystem reload event
    window.dispatchEvent(new CustomEvent('fs-change'));

    alert(`Photo captured successfully!\nSaved as [${photoName}] on your Desktop.\nYou can double-click it to download or review.`);
  });

  // Clean webcam reference on window close
  const observer = new MutationObserver(() => {
    if (!document.body.contains(win)) {
      if (streamRef) {
        streamRef.getTracks().forEach(track => track.stop());
      }
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function bindPreview(win) {
  const contentEl = win.querySelector('.preview-content');
  const titleEl = win.querySelector('.preview-title');
  const name = win.dataset.fileName || 'Document';
  
  if (titleEl) {
    titleEl.textContent = name;
  }
  
  if (win.dataset.fileContent && contentEl) {
    const content = win.dataset.fileContent;
    const lowerName = name.toLowerCase();
    
    if (lowerName.endsWith('.pdf')) {
      contentEl.innerHTML = `<iframe src="${content}" style="width:100%; height:100%; border:none; background:#ffffff; border-radius:4px; box-shadow:0 4px 12px rgba(0,0,0,0.3);"></iframe>`;
    } else {
      contentEl.innerHTML = `<img class="preview-img" src="${content}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:4px; box-shadow:0 4px 12px rgba(0,0,0,0.5);">`;
    }
  }
}

export function bindInstaller(win) {
  const progressEl = win.querySelector('.installer-progress');
  const statusEl = win.querySelector('.installer-status');
  const titleEl = win.querySelector('.installer-title');
  const descEl = win.querySelector('.installer-desc');
  
  const appName = win.dataset.fileName ? win.dataset.fileName.replace('.exe', '').replace('.dmg', '').replace('.pkg', '') : 'Application';
  titleEl.textContent = `Installing ${appName}`;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      progressEl.style.width = '100%';
      statusEl.textContent = '100%';
      descEl.textContent = 'Installation Complete! Adding to Desktop...';
      
      setTimeout(() => {
        // Create an icon on the desktop
        const safeId = appName.toLowerCase().replace(/[^a-z0-9]/g, '');
        window.installedApps = window.installedApps || {};
        window.installedApps[safeId] = true;
        localStorage.setItem('tahoe_installed_apps', JSON.stringify(window.installedApps));
        
        // Add to mock FS desktop so it appears! (using correct children navigation)
        import('./fs.js').then(({ mockFS }) => {
          mockFS.children.Desktop.children[`${appName}.url`] = {
            type: 'file',
            content: `[InternetShortcut]\nURL=https://google.com/search?q=${appName}`
          };
          window.dispatchEvent(new CustomEvent('fs-change'));
        });
        
        descEl.textContent = 'Done! You can close this window.';
        const pkgIcon = win.querySelector('[data-lucide="package"]');
        if (pkgIcon) {
           pkgIcon.setAttribute('data-lucide', 'check-circle');
           pkgIcon.style.color = '#30d158';
        }
        if (window.lucide) window.lucide.createIcons();
      }, 1000);
      
    } else {
      progressEl.style.width = `${progress}%`;
      statusEl.textContent = `${Math.floor(progress)}%`;
    }
  }, 400);
}
