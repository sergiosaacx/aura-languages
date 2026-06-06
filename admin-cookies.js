      (function(){
        var stored = localStorage.getItem('aura_yt_cookies');
        if(stored){ document.getElementById('yt-cookie-status').textContent='🍪 Cookies de YouTube — configuradas ✓'; document.getElementById('yt-cookie-hint').textContent='El karaoke automático está listo'; document.getElementById('yt-cookie-input').value=stored; }
      })();
      function _saveCookies(){
        var val = document.getElementById('yt-cookie-input').value.trim();
        if(!val){ alert('Pega el contenido del cookies.txt primero'); return; }
        localStorage.setItem('aura_yt_cookies', val);
        document.getElementById('yt-cookie-status').textContent='🍪 Cookies de YouTube — configuradas ✓';
        document.getElementById('yt-cookie-hint').textContent='El karaoke automático está listo';
        document.getElementById('yt-cookie-panel-body').style.display='none';
        alert('✅ Cookies guardadas. El próximo karaoke se procesará automáticamente.');
      }
      function _clearCookies(){
        localStorage.removeItem('aura_yt_cookies');
        document.getElementById('yt-cookie-input').value='';
        document.getElementById('yt-cookie-status').textContent='Cookies de YouTube';
        document.getElementById('yt-cookie-hint').textContent='Necesarias para que Whisper descargue el audio';
      }
