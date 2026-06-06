/* ===== TEMAS TAB — Color Picker ===== */
(function(){
  var tmCurrentLang = null;
  var tmHue = 78, tmSat = 0.8, tmVal = 1.0;
  var tmRecentColors = [];
  var TM_DEFAULTS = { en:'#c4ff3d', fr:'#5BE9F6', it:'#7CFFB2', es:'#FFD83D', pt:'#FF8A5A' };
  var tmColors = Object.assign({}, TM_DEFAULTS);

  function tmHsvToRgb(h,s,v){
    var c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c,r=0,g=0,b=0;
    if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}
    else if(h<180){g=c;b=x;}else if(h<240){g=x;b=c;}
    else if(h<300){r=x;b=c;}else{r=c;b=x;}
    return [Math.round((r+m)*255),Math.round((g+m)*255),Math.round((b+m)*255)];
  }
  function tmRgbToHex(r,g,b){
    return '#'+[r,g,b].map(function(v){return v.toString(16).padStart(2,'0').toUpperCase();}).join('');
  }
  function tmHexToRgb(hex){
    hex=hex.replace('#','');
    if(hex.length===3) hex=hex.split('').map(function(c){return c+c;}).join('');
    return [parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16)];
  }
  function tmRgbToHsv(r,g,b){
    r/=255;g/=255;b/=255;
    var max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,h=0,s=max===0?0:d/max;
    if(d!==0){
      if(max===r) h=((g-b)/d)%6;
      else if(max===g) h=(b-r)/d+2;
      else h=(r-g)/d+4;
      h=h*60; if(h<0)h+=360;
    }
    return [h,s,max];
  }
  function tmPureHueHex(h){
    var rgb=tmHsvToRgb(h,1,1); return tmRgbToHex(rgb[0],rgb[1],rgb[2]);
  }

  function tmSyncCP(){
    var rgb=tmHsvToRgb(tmHue,tmSat,tmVal);
    var hex=tmRgbToHex(rgb[0],rgb[1],rgb[2]);
    var bd=document.getElementById('tmCpBackdrop');
    var cp=document.getElementById('tmCp');
    var swatch=document.getElementById('tmCpSwatch');
    var pvHex=document.getElementById('tmCpPvHex');
    var applyBtn=document.getElementById('tmCpApplyBtn');
    if(!bd) return;
    document.getElementById('tmCpHex').value=hex;
    document.getElementById('tmCpR').value=rgb[0];
    document.getElementById('tmCpG').value=rgb[1];
    document.getElementById('tmCpB').value=rgb[2];
    if(swatch) swatch.style.background=hex;
    if(pvHex) pvHex.textContent=hex;
    if(applyBtn) applyBtn.style.background=hex;
    cp.style.setProperty('--tm-cp-color',hex);
    cp.style.setProperty('--tm-cp-hue',tmPureHueHex(tmHue));
    var thumb=document.getElementById('tmCpThumb');
    var hueThumb=document.getElementById('tmCpHueThumb');
    if(thumb){thumb.style.left=(tmSat*100)+'%';thumb.style.top=((1-tmVal)*100)+'%';}
    if(hueThumb) hueThumb.style.left=((tmHue/360)*100)+'%';
  }

  window.tmOpenCP = function(lang,title,color,flagClass){
    tmCurrentLang = lang;
    var bd=document.getElementById('tmCpBackdrop');
    var titleEl=document.getElementById('tmCpTitle');
    var flagEl=document.getElementById('tmCpFlag');
    if(!bd) return;
    if(titleEl) titleEl.textContent=title;
    if(flagEl){
      flagEl.className='tm-flag '+flagClass;
      flagEl.innerHTML=(flagClass==='gb')?'':'<i></i><i></i>'+(flagClass!=='pt'?'<i></i>':'');
    }
    var rgb=tmHexToRgb(color);
    var hsv=tmRgbToHsv(rgb[0],rgb[1],rgb[2]);
    tmHue=hsv[0];tmSat=hsv[1];tmVal=hsv[2];
    tmSyncCP();
    tmRenderRecent();
    bd.classList.add('show');
  };

  window.tmCloseCP = function(){
    var bd=document.getElementById('tmCpBackdrop');
    if(bd) bd.classList.remove('show');
    tmCurrentLang=null;
  };

  window.tmApplyCP = function(){
    if(!tmCurrentLang){tmCloseCP();return;}
    var hexEl=document.getElementById('tmCpHex');
    var hex=hexEl?hexEl.value:'#c4ff3d';
    // Update card
    var card=document.querySelector('#t-temas .tm-card[data-lang="'+tmCurrentLang+'"]');
    if(card){
      card.style.setProperty('--lang-accent',hex);
      var hexSpan=card.querySelector('.hex');
      if(hexSpan) hexSpan.textContent=hex.toUpperCase();
      card.querySelectorAll('.tm-preset.active').forEach(function(p){p.classList.remove('active');});
    }
    // Save to local state
    tmColors[tmCurrentLang]=hex;
    // Add to recents
    if(tmRecentColors.indexOf(hex)===-1){
      tmRecentColors.unshift(hex);
      if(tmRecentColors.length>6) tmRecentColors.pop();
    }
    tmCloseCP();
  };

  function tmRenderRecent(){
    var cont=document.getElementById('tmCpRecent');
    var cnt=document.getElementById('tmCpRecentCount');
    if(!cont) return;
    cont.innerHTML=tmRecentColors.map(function(c){
      return '<button class="tm-preset" style="background:'+c+'" title="'+c+'"></button>';
    }).join('');
    if(cnt) cnt.textContent=tmRecentColors.length+' colores';
    cont.querySelectorAll('.tm-preset').forEach(function(p){
      p.addEventListener('click',function(){
        var rgb=tmHexToRgb(p.title);
        var hsv=tmRgbToHsv(rgb[0],rgb[1],rgb[2]);
        tmHue=hsv[0];tmSat=hsv[1];tmVal=hsv[2];tmSyncCP();
      });
    });
  }

  window.tmResetColors = function(){
    if(!confirm('¿Restaurar los colores predeterminados de todos los idiomas?')) return;
    tmColors=Object.assign({},TM_DEFAULTS);
    document.querySelectorAll('#t-temas .tm-card').forEach(function(card){
      var lang=card.dataset.lang;
      var def=TM_DEFAULTS[lang];
      if(!def) return;
      card.style.setProperty('--lang-accent',def);
      var hexSpan=card.querySelector('.hex');
      if(hexSpan) hexSpan.textContent=def.toUpperCase();
      // Reset active preset
      card.querySelectorAll('.tm-preset').forEach(function(p){
        p.classList.toggle('active', p.title.toUpperCase()===def.toUpperCase());
        if(p.title.toUpperCase()===def.toUpperCase()) p.style.color=def;
      });
    });
    if(window.showToast) showToast('Colores restaurados ✓');
  };

  window.tmSaveColors = function(){
    var sb=window._aura&&window._aura.sb;
    var rows=Object.entries(tmColors).map(function(e){
      return {lang:e[0],accent_color:e[1],updated_at:new Date().toISOString()};
    });
    // Guardar siempre en localStorage (cache inmediato)
    localStorage.setItem('aura_accent_colors', JSON.stringify(tmColors));
    if(sb){
      sb.from('language_settings').upsert(rows,{onConflict:'lang'}).then(function(res){
        if(res.error){
          if(window.showToast) showToast('Guardado en local (ejecuta el SQL en Supabase primero)', true);
        } else {
          if(window.showToast) showToast('Colores guardados y aplicados ✓');
        }
      });
    } else {
      if(window.showToast) showToast('Guardado localmente ✓');
    }
  };

  // Canvas drag
  var tmCanvasDrag=false;
  document.addEventListener('mousedown',function(e){
    var canvas=document.getElementById('tmCpCanvas');
    if(canvas&&canvas.contains(e.target)){
      tmCanvasDrag=true;
      var rect=canvas.getBoundingClientRect();
      var x=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
      var y=Math.max(0,Math.min(1,(e.clientY-rect.top)/rect.height));
      tmSat=x;tmVal=1-y;tmSyncCP();
    }
  });
  document.addEventListener('mousemove',function(e){
    if(!tmCanvasDrag) return;
    var canvas=document.getElementById('tmCpCanvas');
    if(!canvas) return;
    var rect=canvas.getBoundingClientRect();
    var x=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
    var y=Math.max(0,Math.min(1,(e.clientY-rect.top)/rect.height));
    tmSat=x;tmVal=1-y;tmSyncCP();
  });
  document.addEventListener('mouseup',function(){tmCanvasDrag=false;});

  // Hue drag
  var tmHueDrag=false;
  document.addEventListener('mousedown',function(e){
    var hueEl=document.getElementById('tmCpHue');
    if(hueEl&&hueEl.contains(e.target)){
      tmHueDrag=true;
      var rect=hueEl.getBoundingClientRect();
      tmHue=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width))*360;
      tmSyncCP();
    }
  });
  document.addEventListener('mousemove',function(e){
    if(!tmHueDrag) return;
    var hueEl=document.getElementById('tmCpHue');
    if(!hueEl) return;
    var rect=hueEl.getBoundingClientRect();
    tmHue=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width))*360;
    tmSyncCP();
  });
  document.addEventListener('mouseup',function(){tmHueDrag=false;});

  // HEX input
  document.addEventListener('change',function(e){
    if(e.target&&e.target.id==='tmCpHex'){
      var v=e.target.value.trim();
      if(!v.startsWith('#')) v='#'+v;
      if(/^#[0-9A-Fa-f]{6}$/.test(v)||/^#[0-9A-Fa-f]{3}$/.test(v)){
        var rgb=tmHexToRgb(v);
        var hsv=tmRgbToHsv(rgb[0],rgb[1],rgb[2]);
        tmHue=hsv[0];tmSat=hsv[1];tmVal=hsv[2];tmSyncCP();
      } else {tmSyncCP();}
    }
  });

  // Backdrop click to close
  document.addEventListener('click',function(e){
    var bd=document.getElementById('tmCpBackdrop');
    if(bd&&e.target===bd) tmCloseCP();
  });

  // CP preset palette clicks
  document.addEventListener('click',function(e){
    var cp=document.getElementById('tmCp');
    if(!cp||!cp.contains(e.target)) return;
    var p=e.target.closest('.tm-preset');
    if(!p) return;
    var col=p.style.backgroundColor||p.title;
    var tmp=document.createElement('div');tmp.style.color=col;
    document.body.appendChild(tmp);
    var rgb=getComputedStyle(tmp).color.match(/\d+/g).map(Number);
    document.body.removeChild(tmp);
    var hsv=tmRgbToHsv(rgb[0],rgb[1],rgb[2]);
    tmHue=hsv[0];tmSat=hsv[1];tmVal=hsv[2];tmSyncCP();
  });

  // Card preset clicks (outside CP)
  document.addEventListener('click',function(e){
    var card=e.target.closest('#t-temas .tm-card');
    if(!card) return;
    var foot=e.target.closest('.tm-card-foot');
    if(!foot) return;
    var p=e.target.closest('.tm-presets .tm-preset');
    if(!p) return;
    card.querySelectorAll('.tm-presets .tm-preset').forEach(function(x){x.classList.remove('active');});
    p.classList.add('active');
    var col=p.style.backgroundColor;
    var tmp=document.createElement('div');tmp.style.color=col;
    document.body.appendChild(tmp);
    var rgb=getComputedStyle(tmp).color.match(/\d+/g).map(Number);
    document.body.removeChild(tmp);
    var hex=tmRgbToHex(rgb[0],rgb[1],rgb[2]);
    card.style.setProperty('--lang-accent',hex);
    var hexSpan=card.querySelector('.hex');
    if(hexSpan) hexSpan.textContent=hex;
    p.style.color=hex;
    var lang=card.dataset.lang;
    if(lang) tmColors[lang]=hex;
  });

  // Load user counts from Supabase
  function tmLoadUserCounts(){
    var sb=window._aura&&window._aura.sb;
    if(!sb) return;
    ['en','fr','it','es','pt'].forEach(function(lang){
      sb.from('profiles').select('id',{count:'exact',head:true}).eq('active_language',lang).then(function(res){
        var el=document.getElementById('tm-users-'+lang);
        if(el) el.textContent=(res.count||0).toLocaleString();
      });
    });
  }

  // Load saved colors from Supabase or localStorage
  function tmLoadColors(){
    var sb=window._aura&&window._aura.sb;
    var saved=localStorage.getItem('aura_accent_colors');
    if(saved){try{tmColors=JSON.parse(saved);}catch(e){}}
    if(sb){
      sb.from('language_settings').select('lang,accent_color').then(function(res){
        if(res.data&&res.data.length){
          res.data.forEach(function(r){if(r.lang&&r.accent_color)tmColors[r.lang]=r.accent_color;});
          tmApplyLoadedColors();
        }
      });
    } else {
      tmApplyLoadedColors();
    }
  }

  function tmApplyLoadedColors(){
    Object.entries(tmColors).forEach(function(e){
      var lang=e[0],hex=e[1];
      var card=document.querySelector('#t-temas .tm-card[data-lang="'+lang+'"]');
      if(!card) return;
      card.style.setProperty('--lang-accent',hex);
      var hexSpan=card.querySelector('.hex');
      if(hexSpan) hexSpan.textContent=hex.toUpperCase();
    });
  }

  // Highlight selected language card
  window.tmHighlightLang = function(code){
    document.querySelectorAll('#t-temas .tm-card').forEach(function(card){
      var isActive = card.dataset.lang === code;
      card.classList.toggle('tm-card-active', isActive);
      if(isActive){
        card.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
    });
  };

  // Init when temas tab becomes visible
  var tmInited=false;
  var origShowTab=window.showTab;
  window.showTab=function(name){
    origShowTab(name);
    if(name==='temas'&&!tmInited){
      tmInited=true;
      setTimeout(function(){
        tmLoadColors();
        tmLoadUserCounts();
        if(window.admLang) tmHighlightLang(window.admLang);
      },100);
    }
  };
})();
