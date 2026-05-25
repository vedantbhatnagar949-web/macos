// macOS Tahoe Siri & Apple Intelligence Core Module

let animationId = null;
let activeCanvas = null;

/**
 * Initializes the Siri waveform panel, triggers, canvas renderer, and dialogue exchanges
 */
export function initSiri() {
  const panel = document.getElementById('siri-panel');
  const trigger = document.getElementById('siri-trigger');
  const closeBtn = document.getElementById('siri-close-btn');
  const input = document.getElementById('siri-input-box');
  const sendBtn = document.getElementById('siri-send-btn');
  activeCanvas = document.getElementById('siri-wave-canvas');

  if (!panel || !activeCanvas) return;

  // A. Toggle Siri from Menu Bar
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSiri();
    });
  }

  // B. Close Siri Panel
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.classList.add('hidden');
      stopWaveformAnimation();
    });
  }

  // C. Send Message Events
  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      submitUserMsg();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submitUserMsg();
      }
    });
  }
}

function toggleSiri() {
  const panel = document.getElementById('siri-panel');
  const input = document.getElementById('siri-input-box');
  
  if (!panel) return;

  const isHidden = panel.classList.contains('hidden');
  
  if (isHidden) {
    panel.classList.remove('hidden');
    if (input) input.focus();
    startWaveformAnimation();
    
    // Close other overlays
    const cc = document.getElementById('control-center-panel');
    if (cc) cc.classList.add('hidden');
    
    import('./spotlight.js').then(mod => mod.closeSpotlight());
  } else {
    panel.classList.add('hidden');
    stopWaveformAnimation();
  }
}

function submitUserMsg() {
  const input = document.getElementById('siri-input-box');
  const chatLog = document.getElementById('siri-chat-log');
  
  if (!input || !chatLog) return;
  
  const text = input.value.trim();
  if (!text) return;
  
  input.value = '';
  
  // 1. Add User bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'siri-bubble user';
  userBubble.textContent = text;
  chatLog.appendChild(userBubble);
  autoScrollChat();
  
  // 2. Play wave amplitude jump (excitement spike)
  triggerExcitementSpike();
  
  // 3. Generate and render Apple Intelligence response
  setTimeout(() => {
    generateSiriResponse(text);
  }, 700);
}

function autoScrollChat() {
  const chatLog = document.getElementById('siri-chat-log');
  if (chatLog) {
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

// Global wave parameters for continuous canvas sine waves
let wavePhase = 0;
let waveExcitement = 1.0;

function startWaveformAnimation() {
  if (!activeCanvas) return;
  const ctx = activeCanvas.getContext('2d');
  
  activeCanvas.width = activeCanvas.parentElement.offsetWidth;
  activeCanvas.height = activeCanvas.parentElement.offsetHeight;
  
  waveExcitement = 1.0;

  function renderWave() {
    ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
    
    // 3 Dampened visual waves representing Apple Intelligence glow
    const layers = [
      { color: 'rgba(0, 122, 255, 0.45)', amp: 14, freq: 0.04, speed: 0.1 },  // Neon Blue
      { color: 'rgba(255, 0, 127, 0.45)', amp: 18, freq: 0.03, speed: -0.08 }, // Shimmering Pink
      { color: 'rgba(0, 255, 127, 0.35)', amp: 10, freq: 0.05, speed: 0.14 }   // Green Accent
    ];
    
    wavePhase += 0.06;
    
    // Slow fade back to normal excitement if spiked
    if (waveExcitement > 1.0) {
      waveExcitement -= 0.03;
    }
    
    layers.forEach(w => {
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = 3.5;
      
      ctx.shadowBlur = 12;
      ctx.shadowColor = w.color;
      
      for (let x = 0; x < activeCanvas.width; x++) {
        // Main dampened sine wave formula
        const clampRatio = Math.sin(x * Math.PI / activeCanvas.width); // Dampen at edges
        const y = activeCanvas.height / 2 + 
                  Math.sin(x * w.freq + wavePhase * w.speed) * 
                  w.amp * 
                  waveExcitement * 
                  clampRatio;
                  
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });
    
    animationId = requestAnimationFrame(renderWave);
  }
  
  stopWaveformAnimation();
  renderWave();
}

function stopWaveformAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function triggerExcitementSpike() {
  waveExcitement = 3.5; // Spikes amplitude, creating immediate visual feedback on sending messages!
}

/**
 * Intelligent macOS Tahoe simulated neural dialog system
 */
function generateSiriResponse(userText) {
  const chatLog = document.getElementById('siri-chat-log');
  if (!chatLog) return;
  
  const query = userText.toLowerCase();
  let reply = '';
  let commandAction = null;
  
  if (query.includes('tahoe') || query.includes('version')) {
    reply = "macOS Tahoe (version 26) is Apple's newest operating system, featuring the 'Liquid Glass' theme. Version numbering is now unified with the release year, running on M4 Ultra architectures.";
  } else if (query.includes('weather') || query.includes('temperature') || query.includes('snow')) {
    reply = "Current conditions in Tahoe City, CA: -2°C with light snow showers and fresh powder on the mountain. Perfect for a ski trip!";
  } else if (query.includes('cpu') || query.includes('chip') || query.includes('memory') || query.includes('spec')) {
    reply = "Your system specifications report an Apple M4 Ultra silicon processor with a 76-core GPU, 128 GB of unified LPDDR5 RAM, and a 4TB SSD startup disk (Macintosh HD).";
  } else if (query.includes('finder') || query.includes('open file') || query.includes('documents')) {
    reply = "I've launched the Finder window for you! You can now explore your virtual directories and documents.";
    commandAction = () => launchSystemApp('finder');
  } else if (query.includes('safari') || query.includes('browser') || query.includes('internet')) {
    reply = "Opening Safari Browser... I've prepared your home start page showing your favorites and Apple Store configurator.";
    commandAction = () => launchSystemApp('safari');
  } else if (query.includes('terminal') || query.includes('shell') || query.includes('command')) {
    reply = "Developer Terminal initialized successfully! Try typing 'help' or 'neofetch' in the bash prompt.";
    commandAction = () => launchSystemApp('terminal');
  } else if (query.includes('notes') || query.includes('memo')) {
    reply = "Opening Notes app. Your memos are autosaved directly to local browser memory.";
    commandAction = () => launchSystemApp('notes');
  } else if (query.includes('game') || query.includes('play') || query.includes('skiing')) {
    reply = "Launching the Games app! Steer your skier down the Lake Tahoe slopes with the keyboard (left/right or A/D keys) and try to beat the high score!";
    commandAction = () => launchSystemApp('games');
  } else if (query.includes('calculator')) {
    reply = "Launching your glassmorphic macOS Tahoe calculator.";
    commandAction = () => launchSystemApp('calculator');
  } else if (query.includes('settings') || query.includes('wallpaper') || query.includes('customize')) {
    reply = "I've opened the System Settings app. You can customize the Liquid Glass borders, theme accent, or select light/dark wallpapers.";
    commandAction = () => launchSystemApp('settings');
  } else if (query.includes('restart') || query.includes('reboot')) {
    reply = "Understood. Re-initializing the boot chime and loading vectors. System restarting...";
    commandAction = () => setTimeout(() => location.reload(), 1500);
  } else {
    const defaultReplies = [
      "Analyzing your request via Tahoe Intelligent neural cores... All stack parameters are operating at peak efficiency.",
      "I've cross-referenced that with your local documents. Let me know if you would like me to open Finder, start Safari, or search system logs.",
      "Apple Intelligence is optimized for M4 core calculations. Let me know if I should open the Terminal or compile weather statistics.",
      "That query is processed! I'm ready to perform system adjustments, calculate formulas, or launch the new Tahoe Skiing arcade!"
    ];
    reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }

  // Render Siri Reply bubble with typewriter letters
  const siriBubble = document.createElement('div');
  siriBubble.className = 'siri-bubble siri';
  siriBubble.innerHTML = '';
  chatLog.appendChild(siriBubble);
  
  let charIndex = 0;
  function typeWriter() {
    if (charIndex < reply.length) {
      siriBubble.innerHTML += reply.charAt(charIndex);
      charIndex++;
      autoScrollChat();
      setTimeout(typeWriter, 12);
    } else {
      // Done typing, trigger any programmatic actions
      if (commandAction) {
        commandAction();
      }
    }
  }

  typeWriter();
}

function launchSystemApp(appId) {
  const dockEl = document.querySelector(`.dock-item-wrapper[data-app="${appId}"]`);
  if (dockEl) {
    const button = dockEl.querySelector('.dock-item');
    if (button) button.click();
  }
}
