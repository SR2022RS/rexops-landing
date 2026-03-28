(function() {
  var config = window.__CREWIQ_CONFIG__ || {};
  var TOKEN_ENDPOINT = config.TOKEN_ENDPOINT || '';
  var LIVEKIT_URL = config.LIVEKIT_URL || '';

  var css = document.createElement('style');
  css.textContent = '\
    .crewiq-voice-btn {\
      display: inline-flex; align-items: center; gap: 10px;\
      padding: 14px 28px; border: none; border-radius: 12px;\
      font-family: "DM Sans", "Inter", sans-serif; font-size: 16px; font-weight: 600;\
      cursor: pointer; transition: all 0.3s ease; margin-top: 16px;\
    }\
    .crewiq-voice-btn--idle {\
      background: linear-gradient(135deg, #00e5ff, #00ff88);\
      color: #080b10;\
      box-shadow: 0 4px 24px rgba(0,229,255,0.3);\
    }\
    .crewiq-voice-btn--idle:hover {\
      transform: translateY(-2px);\
      box-shadow: 0 8px 32px rgba(0,229,255,0.4);\
    }\
    .crewiq-voice-btn--connecting {\
      background: rgba(0,229,255,0.15); color: #00e5ff;\
      border: 1px solid rgba(0,229,255,0.3); cursor: wait;\
    }\
    .crewiq-voice-btn--end {\
      background: rgba(239,68,68,0.15); color: #ef4444;\
      border: 1px solid rgba(239,68,68,0.3);\
    }\
    .crewiq-voice-btn--end:hover { background: rgba(239,68,68,0.25); }\
    .crewiq-voice-active {\
      display: flex; align-items: center; gap: 16px; margin-top: 16px;\
    }\
    .crewiq-voice-active__status {\
      display: flex; align-items: center; gap: 8px;\
      font-size: 15px; font-weight: 600; color: #00ff88;\
      font-family: "DM Sans", "Inter", sans-serif;\
    }\
    .crewiq-voice-active__dot {\
      width: 10px; height: 10px; background: #00ff88; border-radius: 50%;\
      box-shadow: 0 0 12px rgba(0,255,136,0.6);\
      animation: crewiq-pulse 1.5s ease-in-out infinite;\
    }\
    .crewiq-voice-pulse {\
      width: 12px; height: 12px; background: #00e5ff; border-radius: 50%;\
      animation: crewiq-pulse 1.2s ease-in-out infinite;\
    }\
    .crewiq-voice-ended {\
      margin-top: 16px; font-family: "DM Sans", "Inter", sans-serif;\
    }\
    .crewiq-voice-ended p {\
      color: rgba(255,255,255,0.7); font-size: 15px; margin-bottom: 12px;\
    }\
    @keyframes crewiq-pulse {\
      0%, 100% { opacity: 1; transform: scale(1); }\
      50% { opacity: 0.4; transform: scale(1.3); }\
    }\
    @keyframes crewiq-antenna-pulse {\
      0%, 100% { opacity: 1; r: 3; }\
      50% { opacity: 0.4; r: 5; }\
    }\
  ';
  document.head.appendChild(css);

  var currentRoom = null;

  function render(container, state) {
    container.innerHTML = '';

    if (state === 'idle') {
      var btn = document.createElement('button');
      btn.className = 'crewiq-voice-btn crewiq-voice-btn--idle';
      btn.innerHTML = '<span style="font-size:20px">🎙</span> Speak with an agent';
      btn.onclick = function() { startCall(container); };
      container.appendChild(btn);
    }

    else if (state === 'connecting') {
      var btn = document.createElement('button');
      btn.className = 'crewiq-voice-btn crewiq-voice-btn--connecting';
      btn.disabled = true;
      btn.innerHTML = '<span class="crewiq-voice-pulse"></span> Connecting...';
      container.appendChild(btn);
    }

    else if (state === 'connected') {
      var wrap = document.createElement('div');
      wrap.className = 'crewiq-voice-active';
      wrap.innerHTML = '<div class="crewiq-voice-active__status"><span class="crewiq-voice-active__dot"></span>Live with Alex</div>';
      var endBtn = document.createElement('button');
      endBtn.className = 'crewiq-voice-btn crewiq-voice-btn--end';
      endBtn.textContent = 'End call';
      endBtn.onclick = function() { endCall(container); };
      wrap.appendChild(endBtn);
      container.appendChild(wrap);
    }

    else if (state === 'ended') {
      var wrap = document.createElement('div');
      wrap.className = 'crewiq-voice-ended';
      wrap.innerHTML = '<p>Thanks for chatting — we\'ll be in touch within 48 hours.</p>';
      var btn = document.createElement('button');
      btn.className = 'crewiq-voice-btn crewiq-voice-btn--idle';
      btn.innerHTML = '<span style="font-size:20px">🎙</span> Talk again';
      btn.onclick = function() { render(container, 'idle'); };
      wrap.appendChild(btn);
      container.appendChild(wrap);
    }
  }

  async function startCall(container) {
    render(container, 'connecting');
    try {
      var res = await fetch(TOKEN_ENDPOINT);
      var data = await res.json();
      var LivekitClient = window.LivekitClient;
      var room = new LivekitClient.Room();
      currentRoom = room;

      room.on(LivekitClient.RoomEvent.Disconnected, function() {
        currentRoom = null;
        renderAll('ended');
      });

      room.on(LivekitClient.RoomEvent.TrackSubscribed, function(track) {
        if (track.kind === LivekitClient.Track.Kind.Audio) {
          var audioEl = track.attach();
          audioEl.setAttribute('data-livekit', 'true');
          audioEl.autoplay = true;
          document.body.appendChild(audioEl);
        }
      });

      await room.connect(data.url || LIVEKIT_URL, data.token);
      await room.localParticipant.setMicrophoneEnabled(true);
      renderAll('connected');
      var robotContainer = document.getElementById('voice-widget-hero');
      if (robotContainer) {
        robotContainer.style.filter = 'drop-shadow(0 0 16px rgba(0,229,255,0.4))';
      }
    } catch (err) {
      console.error('Voice connection failed:', err);
      renderAll('idle');
    }
  }

  async function endCall(container) {
    if (currentRoom) {
      await currentRoom.disconnect();
      currentRoom = null;
    }
    document.querySelectorAll('audio[data-livekit]').forEach(function(el) { el.remove(); });
    var robotContainer = document.getElementById('voice-widget-hero');
    if (robotContainer) {
      robotContainer.style.filter = 'none';
    }
    renderAll('ended');
  }

  function renderAll(state) {
    var containers = document.querySelectorAll('[id^="voice-widget-"]');
    containers.forEach(function(c) { render(c, state); });
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderAll('idle');
  });
})();
