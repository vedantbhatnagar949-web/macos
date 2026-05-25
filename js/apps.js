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
          <button id="safari-reload-btn" title="Reload Page" style="background: none; border: none; color: var(--text-primary); cursor: pointer; opacity: 0.65; display: flex; align-items: center; padding: 0 4px; transition: opacity 0.15s ease;">
            <i data-lucide="rotate-cw" style="width: 13px; height: 13px;"></i>
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
  `
};


// ==========================================
// 2. ACTIVE APPLICATION RUNTIME INTERFACES
// ==========================================
export function bindAppLogic(appId, win) {
  
  if (window.lucide) window.lucide.createIcons();

  switch (appId) {
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

  function renderFinderGrid(folderName, pushToHistory = true) {
    if (!grid) return;
    grid.innerHTML = '';

    const folderNode = getNodeByPath(['~', ...folderName.split('/')]);
    if (!folderNode || folderNode.type !== 'dir') return;

    Object.entries(folderNode.children).forEach(([name, node]) => {
      const fileEl = document.createElement('div');
      fileEl.className = 'finder-file';
      
      const isFile = node.type === 'file';
      const iconType = isFile ? 'file-text' : 'folder';
      const colorStyle = isFile ? 'color: #8e8e93;' : 'color: #007aff;';

      fileEl.innerHTML = `
        <div class="finder-file-icon-wrapper" style="margin-bottom: 2px;">
          <i data-lucide="${iconType}" class="finder-file-icon" style="${colorStyle}"></i>
        </div>
        <span class="finder-file-name">${name}</span>
      `;

      // Double click operation to read/open
      fileEl.addEventListener('dblclick', () => {
        if (isFile) {
          // Open simulated text reader window
          alertFileContent(name, node.content);
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

  const historyStack = [];

  const bookmarks = [
    { label: 'Google', url: 'https://google.com', icon: 'search' },
    { label: 'YouTube', url: 'https://youtube.com', icon: 'play' },
    { label: 'Wikipedia', url: 'https://wikipedia.org', icon: 'book-open' },
    { label: 'Apple Store', url: 'https://apple.com', icon: 'shopping-bag' }
  ];

  function renderSafariHome() {
    input.value = 'safari://home';
    container.innerHTML = `
      <div class="safari-home">
        <h1 class="safari-welcome-title">Safari</h1>
        <p style="font-size: 13px; opacity:0.75; text-align:center;">Favorites and popular shortcuts</p>
        <div class="safari-grid" id="safari-favs"></div>
      </div>
    `;
    
    const favsGrid = container.querySelector('#safari-favs');
    bookmarks.forEach(bm => {
      const tile = document.createElement('div');
      tile.className = 'safari-tile';
      tile.innerHTML = `
        <div class="safari-tile-icon-wrapper" style="background-color:#ffffff; width:44px; height:44px; border-radius:50%; display:flex; justify-content:center; align-items:center; box-shadow:0 3px 6px rgba(0,0,0,0.06); color: var(--primary-accent);">
          <i data-lucide="${bm.icon}" class="safari-tile-icon" style="width:20px; height:20px;"></i>
        </div>
        <span class="safari-tile-label">${bm.label}</span>
      `;
      tile.addEventListener('click', () => {
        historyStack.push('safari://home');
        loadPage(bm.url);
      });
      favsGrid.appendChild(tile);
    });

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
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('safari://')) {
      if (cleanUrl.includes('.')) {
        cleanUrl = 'https://' + cleanUrl;
      } else {
        cleanUrl = 'https://google.com?q=' + encodeURIComponent(cleanUrl);
      }
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

    // Check if it's one of the fully built in-app custom simulated portals
    // But ONLY if it doesn't have custom query variables that bypass it (e.g. from real links)
    const isSearchEngine = cleanUrl.includes('google.com') && !cleanUrl.includes('google.com/search?igu=1');
    const isMockYoutube = cleanUrl.includes('youtube.com') && !cleanUrl.includes('embed');
    const isMockApple = cleanUrl.includes('apple.com') && !cleanUrl.includes('store') && !cleanUrl.includes('developer');
    const isMockWiki = cleanUrl.includes('wikipedia.org') && !cleanUrl.includes('/wiki/');

    if (isSearchEngine || isMockYoutube || isMockApple || isMockWiki) {
      let pageHTML = '';
      if (isSearchEngine) {
        const q = new URLSearchParams(cleanUrl.split('?')[1] || '').get('q') || '';
        pageHTML = renderGoogleSearch(q);
      } else if (isMockYoutube) {
        pageHTML = renderYouTubePortal();
      } else if (isMockApple) {
        pageHTML = renderAppleStore();
      } else if (isMockWiki) {
        const q = new URLSearchParams(cleanUrl.split('?')[1] || '').get('q') || '';
        pageHTML = renderWikipedia(q);
      }

      setTimeout(() => {
        if (loadLine) {
          loadLine.style.width = '100%';
          setTimeout(() => loadLine.remove(), 200);
        }
        container.innerHTML = pageHTML;
        bindSimulatedSiteActions(cleanUrl);
        if (window.lucide) window.lucide.createIcons();
      }, 400);
      return;
    }

    // Otherwise, it is a LITERALLY REAL site request! Load it through our smart CORS Raw proxy!
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`;

    fetch(proxyUrl)
      .then(res => {
        if (!res.ok) throw new Error('Proxy connection rejected');
        return res.text();
      })
      .then(html => {
        if (loadLine) loadLine.style.width = '85%';
        
        // Inject absolute base coordinates & link click interceptors
        const baseTag = `<base href="${cleanUrl}">`;
        const interceptorScript = `
          <script>
            // Intercept standard anchor link clicks
            document.addEventListener('click', function(e) {
              var anchor = e.target.closest('a');
              if (anchor && anchor.href) {
                var hrefAttr = anchor.getAttribute('href');
                if (hrefAttr && hrefAttr.startsWith('#')) return; // Allow page anchors

                e.preventDefault();
                // Post message up to Safari parent window
                window.parent.postMessage({ type: 'safari-navigate', url: anchor.href }, '*');
              }
            });

            // Intercept form submissions (e.g. search boxes)
            document.addEventListener('submit', function(e) {
              var form = e.target;
              if (form.action) {
                e.preventDefault();
                var url = new URL(form.action);
                var formData = new FormData(form);
                for (var pair of formData.entries()) {
                  url.searchParams.set(pair[0], pair[1]);
                }
                window.parent.postMessage({ type: 'safari-navigate', url: url.href }, '*');
              }
            });
          </script>
        `;

        let processedHtml = html;
        if (processedHtml.includes('<head>')) {
          processedHtml = processedHtml.replace('<head>', '<head>' + baseTag + interceptorScript);
        } else if (processedHtml.includes('<HEAD>')) {
          processedHtml = processedHtml.replace('<HEAD>', '<HEAD>' + baseTag + interceptorScript);
        } else {
          processedHtml = baseTag + interceptorScript + processedHtml;
        }

        setTimeout(() => {
          if (loadLine) {
            loadLine.style.width = '100%';
            setTimeout(() => loadLine.remove(), 200);
          }
          
          // Render sandboxed real iframe
          container.innerHTML = `
            <iframe id="safari-real-frame" style="width:100%; height:100%; border:none; background:#ffffff;" sandbox="allow-scripts allow-same-origin allow-forms" srcdoc="${processedHtml.replace(/"/g, '&quot;')}"></iframe>
          `;
        }, 300);
      })
      .catch(err => {
        console.error('Browser CORS block:', err);
        
        setTimeout(() => {
          if (loadLine) {
            loadLine.style.width = '100%';
            setTimeout(() => loadLine.remove(), 200);
          }

          // Render gorgeous macOS style error page
          container.innerHTML = `
            <div style="padding:40px 20px; font-family:var(--font-body); background:#ffffff; color:#1d1d1f; height:100%; overflow:auto; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; box-sizing:border-box;">
              <i data-lucide="shield-alert" style="width:48px; height:48px; color:#ff453a; margin-bottom:16px;"></i>
              <h3 style="font-size:18px; font-weight:700; margin-bottom:8px; font-family:var(--font-display);">Unable to Load Page</h3>
              <p style="font-size:12px; opacity:0.65; max-width:380px; line-height:1.6; margin-bottom:20px;">
                The proxy adapter was blocked from fetching <strong>${cleanUrl}</strong> due to strict cross-origin security frameworks.
              </p>
              <div style="background:#f5f5f7; border-radius:8px; padding:12px 16px; border:0.5px solid rgba(0,0,0,0.06); font-size:11px; color:#515154; max-width:400px; text-align:left; line-height:1.5;">
                <strong>Developer Notice:</strong> High security platforms (like Google, GitHub, or Amazon) enforce strict frame isolation headers. Other standard sites (like Wikipedia or blogs) load flawlessly.
              </div>
              <button id="safari-err-home-btn" style="margin-top:20px; background:#0071e3; color:#fff; border:none; padding:8px 20px; border-radius:18px; font-size:12px; font-weight:700; cursor:pointer;">Safari Home</button>
            </div>
          `;

          const errHomeBtn = container.querySelector('#safari-err-home-btn');
          if (errHomeBtn) {
            errHomeBtn.addEventListener('click', () => {
              loadPage('safari://home');
            });
          }
          if (window.lucide) window.lucide.createIcons();
        }, 300);
      });
  }

  // A. GOOGLE SIMULATED ENGINE
  function renderGoogleSearch(query) {
    if (!query) {
      return `
        <div style="background-color:#ffffff; color:#000000; font-family:var(--font-body); height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 20px;">
          <h2 style="font-size: 48px; font-weight:800; background:linear-gradient(to right, #4285F4 25%, #ea4335 50%, #fbbc05 75%, #34a853 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:24px; font-family:var(--font-display);">Google</h2>
          <div style="width: 100%; max-width: 480px; display:flex; align-items:center; border:1px solid #dfe1e5; border-radius:24px; padding: 8px 16px; box-shadow:0 1px 6px rgba(32,33,36,0.12); margin-bottom:20px; background:#fff;">
            <i data-lucide="search" style="color:#9aa0a6; width:16px; margin-right:8px;"></i>
            <input type="text" id="google-search-bar" placeholder="Search Google or type a query" style="border:none; outline:none; width:100%; font-size:13.5px;" value="">
          </div>
          <div style="display:flex; gap:10px;">
            <button id="google-search-btn" style="background-color:#f8f9fa; border:1px solid #f8f9fa; padding:8px 16px; border-radius:6px; font-size:12.5px; font-weight:500; cursor:pointer;">Google Search</button>
            <button style="background-color:#f8f9fa; border:1px solid #f8f9fa; padding:8px 16px; border-radius:6px; font-size:12.5px; font-weight:500; cursor:pointer;">I'm Feeling Lucky</button>
          </div>
        </div>
      `;
    }

    // Google Results Cards
    return `
      <div style="background-color:#ffffff; color:#1a0dab; font-family:sans-serif; height:100%; display:flex; flex-direction:column; padding: 14px; overflow:auto;">
        <div style="display:flex; align-items:center; gap:16px; border-bottom:0.5px solid #ebebeb; padding-bottom:10px; margin-bottom:14px;">
          <span style="font-weight:800; font-size:20px; background:linear-gradient(to right, #4285F4, #ea4335, #fbbc05, #34a853); -webkit-background-clip:text; -webkit-text-fill-color:transparent; cursor:pointer;" id="google-logo-back">Google</span>
          <div style="display:flex; align-items:center; border:1px solid #dfe1e5; border-radius:20px; padding: 4px 12px; background:#fff; width:260px; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <input type="text" id="google-search-bar" value="${query}" style="border:none; outline:none; width:100%; font-size:12px;">
          </div>
        </div>
        <div style="font-size:11px; color:#70757a; margin-bottom:14px; font-family:var(--font-body);">About 2,340,000 results (0.42 seconds)</div>
        
        <!-- Result Cards -->
        <div style="display:flex; flex-direction:column; gap:16px; max-width:550px; font-family:var(--font-body);">
          
          <div class="google-card" data-url="https://apple.com" style="cursor:pointer;">
            <div style="font-size:11px; color:#202124; margin-bottom:2px;">https://www.apple.com &gt; store</div>
            <h4 style="font-size:15px; font-weight:600; color:#1a0dab; margin-bottom:3px; text-decoration:none;">Buy Apple M4 MacBook Pro Tahoe - Apple Store</h4>
            <p style="font-size:12px; color:#4d5156; line-height:1.4;">Configure your dream M4 Ultra device. Customize unified memory up to 128GB and explore Lake Tahoe 2026 release pricing specs.</p>
          </div>

          <div class="google-card" data-url="https://youtube.com" style="cursor:pointer;">
            <div style="font-size:11px; color:#202124; margin-bottom:2px;">https://www.youtube.com &gt; watch</div>
            <h4 style="font-size:15px; font-weight:600; color:#1a0dab; margin-bottom:3px; text-decoration:none;">macOS Tahoe 26 Cinematic Sneak Peek - YouTube</h4>
            <p style="font-size:12px; color:#4d5156; line-height:1.4;">Watch drone footage of snowy Lake Tahoe in stunning cinematic 4K resolution, or preview liquid glass macOS features in the new trailer.</p>
          </div>

          <div class="google-card" data-url="https://wikipedia.org?q=tahoe" style="cursor:pointer;">
            <div style="font-size:11px; color:#202124; margin-bottom:2px;">https://en.wikipedia.org &gt; wiki &gt; Tahoe</div>
            <h4 style="font-size:15px; font-weight:600; color:#1a0dab; margin-bottom:3px; text-decoration:none;">Lake Tahoe Geography & History - Wikipedia</h4>
            <p style="font-size:12px; color:#4d5156; line-height:1.4;">Lake Tahoe is a large freshwater lake in the Sierra Nevada of the United States. Pinned at 6,225 ft elevation, it is a global resort attraction.</p>
          </div>

        </div>
      </div>
    `;
  }

  // B. YOUTUBE SIMULATED CLIENT (With real operational embed video playback!)
  function renderYouTubePortal(activeVideoId = null) {
    if (activeVideoId) {
      return `
        <div style="background-color:#0f0f0f; color:#ffffff; font-family:var(--font-body); height:100%; display:flex; flex-direction:column; overflow:auto;">
          <div style="height: 38px; background:#0f0f0f; border-bottom:0.5px solid #2f2f2f; display:flex; align-items:center; padding:0 14px; gap:8px;">
            <span style="color:#ff0000; font-weight:800; font-size:18px; cursor:pointer;" id="yt-logo-back">YouTube</span>
          </div>
          <div style="flex-grow:1; display:flex; flex-direction:column; padding:14px; gap:12px; max-width:680px;">
            <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.5); background:#000;">
              <iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;" src="https://www.youtube.com/embed/${activeVideoId}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
            <h4 style="font-size:15px; font-weight:700; margin-top:4px;">Operational Video Stream | Tahoe HD Media Stack</h4>
            <p style="font-size:12px; opacity:0.6; line-height:1.5;">This video is running natively inside Safari's simulated browser context using authorized Youtube Embed integrations. You can toggle audio levels, progress bars, and fullscreen sizes!</p>
            <button id="yt-return-btn" style="background:#272727; color:#fff; border:none; padding:8px 16px; border-radius:18px; font-size:12px; cursor:pointer; width:max-content; font-weight:600; margin-top:8px;">Back to Feed</button>
          </div>
        </div>
      `;
    }

    const videos = [
      { id: 'zR72Eupgex8', title: 'Lake Tahoe in Winter - Cinematic Drone 4K', channel: 'Tahoe Aerials', views: '142K views', duration: '3:45' },
      { id: '0pg_Y41WaK8', title: 'Apple MacBook Pro M3/M4 Official Unveiling', channel: 'Apple Tech', views: '2.4M views', duration: '9:12' },
      { id: 'VtvjbmoDx-I', title: 'Original Apple Macintosh 1984 Launch Commercial', channel: 'Apple History', views: '890K views', duration: '1:00' },
      { id: 'H8gB4C95g9Y', title: 'macOS Sonoma Stage Manager Tutorial Guidelines', channel: 'WebOS Guides', views: '48K views', duration: '4:20' }
    ];

    let gridHTML = '';
    videos.forEach(vid => {
      gridHTML += `
        <div class="yt-video-card" data-id="${vid.id}" style="cursor:pointer; display:flex; flex-direction:column; gap:6px;">
          <div style="position:relative; width:100%; padding-bottom:56.25%; border-radius:8px; overflow:hidden; background:#2b2b2b;">
            <img src="https://img.youtube.com/vi/${vid.id}/mqdefault.jpg" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;">
            <span style="position:absolute; bottom:6px; right:6px; background:rgba(0,0,0,0.8); color:#fff; font-size:9.5px; padding:2px 4px; border-radius:3px; font-weight:600;">${vid.duration}</span>
          </div>
          <h4 style="font-size:11.5px; font-weight:600; line-height:1.3; height:32px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; margin-top:2px;">${vid.title}</h4>
          <div style="font-size:10px; opacity:0.6;">
            <div>${vid.channel}</div>
            <div>${vid.views}</div>
          </div>
        </div>
      `;
    });

    return `
      <div style="background-color:#0f0f0f; color:#ffffff; font-family:var(--font-body); height:100%; display:flex; flex-direction:column; overflow:auto;">
        <div style="height: 40px; background:#0f0f0f; border-bottom:0.5px solid #2f2f2f; display:flex; align-items:center; padding:0 14px; gap:8px;">
          <span style="color:#ff0000; font-weight:800; font-size:18px;">YouTube</span>
          <span style="font-size:9px; background:#333; color:#aaa; padding:2px 5px; border-radius:4px; font-weight:600; margin-left:4px;">Mock Browser Player</span>
        </div>
        <div style="flex-grow:1; padding:20px; display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:20px;">
          ${gridHTML}
        </div>
      </div>
    `;
  }

  // C. APPLE WEB STORE CONFIGURATOR (Premium interactive element!)
  function renderAppleStore(selectedRAM = '64GB', selectedSSD = '1TB') {
    const basePrice = 3499;
    let addedPrice = 0;
    
    if (selectedRAM === '128GB') addedPrice += 800;
    if (selectedSSD === '2TB') addedPrice += 400;
    if (selectedSSD === '4TB') addedPrice += 1000;

    const finalPrice = basePrice + addedPrice;

    return `
      <div style="background-color:#f5f5f7; color:#1d1d1f; font-family:var(--font-body); height:100%; display:flex; flex-direction:column; overflow:auto;">
        
        <!-- Apple Navbar -->
        <div style="height:36px; background:#161617; display:flex; justify-content:center; align-items:center; gap:30px; font-size:11.5px; font-weight:300;">
          <span style="color:#f5f5f7; cursor:pointer; display:inline-flex; align-items:center;" id="apple-logo-back">
            <svg viewBox="0 0 24 24" width="14" height="14" style="fill:currentColor; margin-top:-1px;">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
          </span>
          <span style="color:#cccccc; cursor:pointer;" id="apple-macbook-link">MacBook Pro</span>
          <span style="color:#cccccc;">iPad</span>
          <span style="color:#cccccc;">Support</span>
        </div>

        <div style="flex-grow:1; padding:24px; max-width:800px; margin:0 auto; display:flex; flex-direction:column; gap:20px;">
          
          <div style="display:flex; justify-content:space-between; align-items:baseline; border-bottom:0.5px solid #d2d2d7; padding-bottom:12px;">
            <h2 style="font-size: 20px; font-weight:700; font-family:var(--font-display);">MacBook Pro M5 Tahoe-26</h2>
            <span style="font-size: 13px; opacity:0.6;">Configured M5 Ultra Custom Chip</span>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:24px; margin-top:8px;">
            
            <!-- Left product graphic -->
            <div style="flex: 1 1 260px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#ffffff; border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.03); border:0.5px solid rgba(0,0,0,0.06);">
              <i data-lucide="monitor" style="width:100px; height:100px; color:#1d1d1f; opacity:0.9;"></i>
              <div style="margin-top:20px; text-align:center;">
                <h3 style="font-weight:700; font-size:15px;">M5 Ultra Premium Spec</h3>
                <p style="font-size:11px; opacity:0.6; margin-top:2px;">Apple Custom Silicon Architecture</p>
              </div>
            </div>

            <!-- Right configurator console -->
            <div style="flex: 1 1 280px; display:flex; flex-direction:column; gap:16px;">
              
              <!-- RAM configuration options -->
              <div>
                <h4 style="font-size:12px; font-weight:700; opacity:0.8; margin-bottom:8px;">1. Unified Memory Space</h4>
                <div style="display:flex; gap:8px;">
                  <button class="apple-config-btn ${selectedRAM === '64GB' ? 'active' : ''}" data-type="ram" data-val="64GB" style="flex-grow:1; background:${selectedRAM === '64GB' ? 'rgba(0,122,255,0.08)' : '#fff'}; border:${selectedRAM === '64GB' ? '2px solid var(--primary-accent)' : '1px solid #d2d2d7'}; padding:10px; border-radius:8px; font-size:11.5px; font-weight:600; cursor:pointer;">64GB (Included)</button>
                  <button class="apple-config-btn ${selectedRAM === '128GB' ? 'active' : ''}" data-type="ram" data-val="128GB" style="flex-grow:1; background:${selectedRAM === '128GB' ? 'rgba(0,122,255,0.08)' : '#fff'}; border:${selectedRAM === '128GB' ? '2px solid var(--primary-accent)' : '1px solid #d2d2d7'}; padding:10px; border-radius:8px; font-size:11.5px; font-weight:600; cursor:pointer;">128GB (+$800)</button>
                </div>
              </div>

              <!-- Storage configurations -->
              <div>
                <h4 style="font-size:12px; font-weight:700; opacity:0.8; margin-bottom:8px;">2. SSD Flash Capacity</h4>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <button class="apple-config-btn ${selectedSSD === '1TB' ? 'active' : ''}" data-type="ssd" data-val="1TB" style="flex:1 1 90px; background:${selectedSSD === '1TB' ? 'rgba(0,122,255,0.08)' : '#fff'}; border:${selectedSSD === '1TB' ? '2px solid var(--primary-accent)' : '1px solid #d2d2d7'}; padding:10px; border-radius:8px; font-size:11px; font-weight:600; cursor:pointer;">1TB SSD</button>
                  <button class="apple-config-btn ${selectedSSD === '2TB' ? 'active' : ''}" data-type="ssd" data-val="2TB" style="flex:1 1 90px; background:${selectedSSD === '2TB' ? 'rgba(0,122,255,0.08)' : '#fff'}; border:${selectedSSD === '2TB' ? '2px solid var(--primary-accent)' : '1px solid #d2d2d7'}; padding:10px; border-radius:8px; font-size:11px; font-weight:600; cursor:pointer;">2TB SSD (+$400)</button>
                  <button class="apple-config-btn ${selectedSSD === '4TB' ? 'active' : ''}" data-type="ssd" data-val="4TB" style="flex:1 1 90px; background:${selectedSSD === '4TB' ? 'rgba(0,122,255,0.08)' : '#fff'}; border:${selectedSSD === '4TB' ? '2px solid var(--primary-accent)' : '1px solid #d2d2d7'}; padding:10px; border-radius:8px; font-size:11px; font-weight:600; cursor:pointer;">4TB SSD (+$1000)</button>
                </div>
              </div>

              <!-- Final pricing layout -->
              <div style="background:#ffffff; border-radius:10px; padding:16px; border:0.5px solid rgba(0,0,0,0.06); display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                <div>
                  <div style="font-size:11px; opacity:0.6;">Total Configuration Price</div>
                  <div style="font-size:24px; font-weight:800; color:#1d1d1f;" id="apple-price-val">$${finalPrice.toLocaleString()}</div>
                </div>
                <button style="background:var(--primary-accent); color:#ffffff; border:none; padding:10px 20px; border-radius:20px; font-size:12.5px; font-weight:600; cursor:pointer;" id="apple-order-btn">Review Order</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;
  }

  // D. WIKIPEDIA SIMULATED PORTAL
  function renderWikipedia(searchQuery = '') {
    const articles = {
      'apple': {
        title: 'Apple Inc.',
        text: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the largest technology company by revenue, totaling $383.93 billion in 2023. It designs consumer electronics, software, and online services. Famous products include the Macintosh computer, iPhone, and custom M-series hardware architectures.'
      },
      'tahoe': {
        title: 'Lake Tahoe',
        text: 'Lake Tahoe is a large freshwater lake in the Sierra Nevada of the United States. Lying at an elevation of 6,225 ft (1,897 m), it straddles the state line between California and Nevada, west of Carson City. Lake Tahoe is the largest alpine lake in North America, and at 1,645 ft (501 m) deep, it is the second deepest in the US. Known for its clear water and scenic panoramas.'
      },
      'macos': {
        title: 'macOS',
        text: 'macOS (originally Mac OS X, then OS X) is a Unix operating system developed and marketed by Apple Inc. since 2001. It is the primary operating system for Apple\'s Mac family of computers. Within the market of desktop and laptop computers, it is the second most widely used desktop OS after Microsoft Windows.'
      }
    };

    if (searchQuery && articles[searchQuery.toLowerCase()]) {
      const art = articles[searchQuery.toLowerCase()];
      return `
        <div style="background:#ffffff; color:#000000; font-family:serif; height:100%; display:flex; flex-direction:column; overflow:auto;">
          <div style="height:38px; background:#f6f6f6; border-bottom:1px solid #a2a9b1; display:flex; align-items:center; padding:0 14px; gap:8px;">
            <span style="font-weight:700; font-size:16px; cursor:pointer; font-family:sans-serif;" id="wiki-logo-back">Wikipedia</span>
          </div>
          <div style="padding:20px; max-width:600px; margin:0 auto; line-height:1.6; font-size:14.5px;">
            <h1 style="font-size:28px; font-weight:400; border-bottom:1px solid #a2a9b1; padding-bottom:4px; margin-bottom:14px; font-family:sans-serif;">${art.title}</h1>
            <p style="margin-bottom:12px;">From Wikipedia, the free encyclopedia.</p>
            <p style="text-align:justify;">${art.text}</p>
            <hr style="border:none; height:1px; background:#a2a9b1; margin:20px 0;">
            <button id="wiki-return-btn" style="background:#f6f6f6; border:1px solid #a2a9b1; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-family:sans-serif;">Back to Wiki Search</button>
          </div>
        </div>
      `;
    }

    return `
      <div style="background:#ffffff; color:#000000; font-family:serif; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;">
        <h1 style="font-size:36px; font-weight:400; font-family:serif; margin-bottom:16px;">Wikipedia</h1>
        <div style="width: 100%; max-width: 440px; display:flex; align-items:center; border:1.5px solid #a2a9b1; padding: 6px 12px; background:#fff; margin-bottom:14px;">
          <i data-lucide="search" style="color:#72777d; width:16px; margin-right:8px;"></i>
          <input type="text" id="wiki-search-bar" placeholder="Search Wikipedia (try 'Tahoe', 'Apple', or 'macOS')" style="border:none; outline:none; width:100%; font-size:13.5px; font-family:sans-serif;">
        </div>
        <p style="font-size:11.5px; color:#54595d; font-family:sans-serif;">The Free Encyclopedia that anyone can edit.</p>
      </div>
    `;
  }

  // E. CLICK ACTIONS EVENT BINDS FOR SIMULATED SITES
  function bindSimulatedSiteActions(url) {
    
    // 1. Google actions
    const googleBar = container.querySelector('#google-search-bar');
    const googleBtn = container.querySelector('#google-search-btn');
    const googleLogo = container.querySelector('#google-logo-back');

    if (googleLogo) {
      googleLogo.addEventListener('click', () => {
        loadPage('https://google.com');
      });
    }

    if (googleBtn && googleBar) {
      googleBtn.addEventListener('click', () => {
        const query = googleBar.value.trim();
        if (query) {
          loadPage(`https://google.com?q=${encodeURIComponent(query)}`);
        }
      });
    }
    if (googleBar) {
      googleBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = googleBar.value.trim();
          if (query) {
            loadPage(`https://google.com?q=${encodeURIComponent(query)}`);
          }
        }
      });
    }

    // Google result card clicks
    const googleCards = container.querySelectorAll('.google-card');
    googleCards.forEach(card => {
      card.addEventListener('click', () => {
        const cardUrl = card.dataset.url;
        historyStack.push(url);
        loadPage(cardUrl);
      });
    });

    // 2. YouTube actions
    const ytLogo = container.querySelector('#yt-logo-back');
    const ytReturn = container.querySelector('#yt-return-btn');
    
    if (ytLogo) {
      ytLogo.addEventListener('click', () => {
        loadPage('https://youtube.com');
      });
    }
    if (ytReturn) {
      ytReturn.addEventListener('click', () => {
        loadPage('https://youtube.com');
      });
    }

    const videoCards = container.querySelectorAll('.yt-video-card');
    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.dataset.id;
        historyStack.push(url);
        container.innerHTML = renderYouTubePortal(videoId);
        bindSimulatedSiteActions(url);
      });
    });

    // 3. Apple Store actions
    const appleLogo = container.querySelector('#apple-logo-back');
    const macBookLink = container.querySelector('#apple-macbook-link');

    if (appleLogo) {
      appleLogo.addEventListener('click', () => {
        loadPage('https://apple.com');
      });
    }
    if (macBookLink) {
      macBookLink.addEventListener('click', () => {
        loadPage('https://apple.com');
      });
    }

    // Config spec button toggles
    const configButtons = container.querySelectorAll('.apple-config-btn');
    configButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const val = btn.dataset.val;

        // Active state toggling
        const ramActive = type === 'ram' ? val : container.querySelector('.apple-config-btn[data-type="ram"].active')?.dataset.val || '64GB';
        const ssdActive = type === 'ssd' ? val : container.querySelector('.apple-config-btn[data-type="ssd"].active')?.dataset.val || '1TB';

        container.innerHTML = renderAppleStore(ramActive, ssdActive);
        bindSimulatedSiteActions(url);
      });
    });

    const orderBtn = container.querySelector('#apple-order-btn');
    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        const price = container.querySelector('#apple-price-val').textContent;
        alert(`Order Placed Successfully!\nTotal cost: ${price}\nYour customized MacBook Pro M4 Tahoe Edition is configured for delivery!`);
      });
    }

    // 4. Wikipedia actions
    const wikiLogo = container.querySelector('#wiki-logo-back');
    const wikiSearch = container.querySelector('#wiki-search-bar');
    const wikiReturn = container.querySelector('#wiki-return-btn');

    if (wikiLogo) {
      wikiLogo.addEventListener('click', () => {
        loadPage('https://wikipedia.org');
      });
    }
    if (wikiReturn) {
      wikiReturn.addEventListener('click', () => {
        loadPage('https://wikipedia.org');
      });
    }

    if (wikiSearch) {
      wikiSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = wikiSearch.value.trim();
          if (val) {
            container.innerHTML = renderWikipedia(val);
            bindSimulatedSiteActions(url);
          }
        }
      });
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let val = input.value.trim();
      if (!val) return;
      if (val === 'safari://home') {
        renderSafariHome();
        return;
      }
      if (!val.startsWith('http://') && !val.startsWith('https://') && !val.startsWith('safari://')) {
        val = 'https://' + val;
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

    printLine(`<span style="color:#ffffff;">$ ${cmdString}</span>`);

    switch (cmd) {
      case 'help':
        printLine('Available commands:');
        printLine('  help      - Display this guidelines list');
        printLine('  ls        - List virtual files and directories');
        printLine('  cd [dir]  - Change directories in the virtual file system');
        printLine('  cat [file]- Output text file content to shell');
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

      default:
        printLine(`bash: command not found: ${cmd}. Type 'help' to review guidelines.`, 'text-red');
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
    { name: 'Tahoe Dawn (Light)', varName: 'var(--wallpaper-tahoe-light)', url: './assets/tahoe_light.png' },
    { name: 'Tahoe Midnight (Dark)', varName: 'var(--wallpaper-tahoe-dark)', url: './assets/tahoe_dark.png' }
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

export function addDockIcon(appId) {
  const dock = document.getElementById('mac-dock');
  if (!dock) return;
  
  if (dock.querySelector(`.dock-item-wrapper[data-app="${appId}"]`)) return;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'dock-item-wrapper';
  wrapper.setAttribute('data-app', appId);
  
  wrapper.innerHTML = `
    <div class="dock-item glass" title="${titleMap[appId]}" style="background: ${iconBgStyle[appId]}; display:flex; justify-content:center; align-items:center; position:relative; overflow:hidden;">
      <i data-lucide="${iconLucideMap[appId]}" style="width: 20px; height: 20px; color: #ffffff;"></i>
    </div>
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
    <div class="icon-img-wrapper" style="background: ${iconBgStyle[appId]}; display:flex; justify-content:center; align-items:center; border-radius:10px; width:44px; height:44px; box-shadow:0 3px 6px rgba(0,0,0,0.15);">
      <i data-lucide="${iconLucideMap[appId]}" class="desktop-icon-svg" style="width:22px; height:22px; color:#fff;"></i>
    </div>
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
          const r = d[i], g = d[i+1], b = d[i+2];
          let v = 0.2126*r + 0.7152*g + 0.0722*b;
          if (activeFilter === 'noir') {
            v = v < 128 ? (v * v) / 128 : 255 - ((255 - v) * (255 - v)) / 128;
          }
          d[i] = d[i+1] = d[i+2] = v;
        }
        tempCtx.putImageData(pixels, 0, 0);
      } else if (activeFilter === 'sepia') {
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i+1], b = d[i+2];
          d[i] = (r * .393) + (g *.769) + (b * .189);
          d[i+1] = (r * .349) + (g *.686) + (b * .168);
          d[i+2] = (r * .272) + (g *.534) + (b * .131);
        }
        tempCtx.putImageData(pixels, 0, 0);
      }
    }

    const dataUrl = tempCanvas.toDataURL('image/png');

    // Create photo file in virtual filesystem and add to Desktop shortcut!
    const photoName = `Snapshot_${Date.now()}.png`;
    
    // Add to Desktop
    mockFS.Desktop.children[photoName] = {
      type: 'file',
      content: dataUrl // save base64 directly
    };

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

