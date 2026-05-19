// home-hero.js — Slider de novedades + lista de novedades del hero
window.initHeroSlider = function(aura) {
    // Devuelve Promise para que home-init.js sepa cuándo el hero está listo
    return new Promise(function(_heroResolve){
    // ── Idioma activo del usuario ──────────────────────────────────────────────
    var _hmLang = null;
    try { _hmLang = localStorage.getItem('aura_lang'); } catch(e) {}
    _hmLang = _hmLang || (aura && aura.active_language) || 'en';

    // ── Hero config desde Supabase (por idioma) ──────────────────────────────
    aura.sb.from('admin_hero_config').select('*').eq('id','hero_'+_hmLang).single().then(function(hr) {
      var h = hr.data;
      if (!h) return;
      // Color de acento: SOLO aplicar para inglés.
      // Para otros idiomas, aura-supabase.js ya aplica el color correcto
      // desde language_settings ANTES de que initHeroSlider corra.
      if (_hmLang === 'en') {
        var acento = h.color_acento || '#c4ff3d';
        document.documentElement.style.setProperty('--accent', acento);
      }

      // Función que rellena un slide dado sus elementos y datos
      function fillSlide(bg, tag, ti, sub, sk, s1n, s1l, s2n, s2l, s3n, s3l, d) {
        if (bg && d.imagen_url) bg.style.backgroundImage = 'url('+d.imagen_url+')';
        if (tag && d.tag) tag.textContent = d.tag;
        if (ti  && d.titulo) ti.innerHTML = d.titulo;
        if (sub && d.subtitulo) sub.textContent = d.subtitulo;
        if (sk  && d.stat_titulo) sk.textContent = d.stat_titulo;
        if (s1n && d.stat1_num) s1n.textContent = d.stat1_num;
        if (s1l && d.stat1_lbl) s1l.textContent = d.stat1_lbl;
        if (s2n && d.stat2_num) s2n.textContent = d.stat2_num;
        if (s2l && d.stat2_lbl) s2l.textContent = d.stat2_lbl;
        if (s3n && d.stat3_num) s3n.textContent = d.stat3_num;
        if (s3l && d.stat3_lbl) s3l.textContent = d.stat3_lbl;
      }

      // Rellenar slide principal (elementos ya existentes en HTML)
      fillSlide(
        document.getElementById('hm-hero-bg'), document.getElementById('hm-hero-tag'),
        document.getElementById('hm-hero-ti'), document.getElementById('hm-hero-sub'),
        document.getElementById('hm-hero-sk'),
        document.getElementById('hm-s1n'), document.getElementById('hm-s1l'),
        document.getElementById('hm-s2n'), document.getElementById('hm-s2l'),
        document.getElementById('hm-s3n'), document.getElementById('hm-s3l'), h
      );
      if(document.getElementById('hm-s1n') && h.stat1_num) document.getElementById('hm-s1n').textContent = h.stat1_num;
      if(document.getElementById('hm-s1l') && h.stat1_lbl) document.getElementById('hm-s1l').textContent = h.stat1_lbl;
      if(document.getElementById('hm-s2n') && h.stat2_num) document.getElementById('hm-s2n').textContent = h.stat2_num;
      if(document.getElementById('hm-s2l') && h.stat2_lbl) document.getElementById('hm-s2l').textContent = h.stat2_lbl;
      if(document.getElementById('hm-s3n') && h.stat3_num) document.getElementById('hm-s3n').textContent = h.stat3_num;
      if(document.getElementById('hm-s3l') && h.stat3_lbl) document.getElementById('hm-s3l').textContent = h.stat3_lbl;

      // ── Botones hero: texto + URL desde admin ────────────────────────────
      var _hBtn1 = document.querySelector('.hero-btn');
      var _hBtn2 = document.querySelector('.hero-ghost');
      // Actualizar texto
      if (_hBtn1 && h.btn1_texto) {
        _hBtn1.innerHTML = h.btn1_texto + ' <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
      }
      if (_hBtn2 && h.btn2_texto) _hBtn2.textContent = h.btn2_texto;
      // Convertir en <a> si hay URL configurada — más fiable que onclick
      if (_hBtn1 && h.btn1_url) {
        var _a1 = document.createElement('a');
        _a1.href = h.btn1_url;
        _a1.className = _hBtn1.className;
        _a1.innerHTML = _hBtn1.innerHTML;
        _a1.style.cssText = _hBtn1.style.cssText;
        if (_hBtn1.parentNode) _hBtn1.parentNode.replaceChild(_a1, _hBtn1);
      }
      if (_hBtn2 && h.btn2_url) {
        var _a2 = document.createElement('a');
        _a2.href = h.btn2_url;
        _a2.className = _hBtn2.className;
        _a2.innerHTML = _hBtn2.innerHTML;
        _a2.style.cssText = _hBtn2.style.cssText;
        if (_hBtn2.parentNode) _hBtn2.parentNode.replaceChild(_a2, _hBtn2);
      }

      // ── Slider ────────────────────────────────────────────────────────────
      if (h.modo === 'slider') {
        var extraSlides = [];
        try { extraSlides = JSON.parse(h.slides_json || '[]'); } catch(e) {}
        if (extraSlides.length === 0) return;

        var heroEl = document.querySelector('.hero');
        if (!heroEl) return;

        var heroBg  = document.getElementById('hm-hero-bg');
        var heroL   = heroEl.querySelector('.hero-l');
        var heroR   = heroEl.querySelector('.hero-r');

        // ── Capturar datos del slide 0 (ya aplicados al DOM por el bloque anterior) ──
        var slide0 = {
          imagen_url:  heroBg ? (heroBg.style.backgroundImage||'').replace(/url\(["']?|["']?\)/g,'') : '',
          tag:         (document.getElementById('hm-hero-tag')||{}).textContent || '',
          titulo:      (document.getElementById('hm-hero-ti')||{}).innerHTML   || '',
          subtitulo:   (document.getElementById('hm-hero-sub')||{}).textContent || '',
          stat_titulo: (document.getElementById('hm-hero-sk')||{}).textContent || '',
          stat_valor:  (document.getElementById('hm-hero-sv')||{}).innerHTML   || '',
          stat1_num:   (document.getElementById('hm-s1n')||{}).textContent || '',
          stat1_lbl:   (document.getElementById('hm-s1l')||{}).textContent || '',
          stat2_num:   (document.getElementById('hm-s2n')||{}).textContent || '',
          stat2_lbl:   (document.getElementById('hm-s2l')||{}).textContent || '',
          stat3_num:   (document.getElementById('hm-s3n')||{}).textContent || '',
          stat3_lbl:   (document.getElementById('hm-s3l')||{}).textContent || '',
          cta_html:    heroL ? (heroL.querySelector('.hero-cta')||{}).innerHTML || '' : ''
        };

        var allSlides   = [slide0].concat(extraSlides);
        var totalSlides = allSlides.length;
        var _heroIdx    = 0;
        var _heroTimer;

        // Ocultar dots estáticos — usamos los dinámicos
        var staticDots = heroEl.querySelector('.hero-dots');
        if (staticDots) staticDots.style.display = 'none';

        // Activar transiciones en los paneles del hero
        if (heroL)  heroL.style.transition  = 'opacity .4s';
        if (heroR)  heroR.style.transition  = 'opacity .4s';
        if (heroBg) heroBg.style.transition  = 'opacity .4s';

        // ── Aplicar datos de un slide a los elementos existentes del hero ──
        // Cualquier campo vacío hereda el valor del slide principal (slide0)
        function applySlide(sd, animate) {
          function v(a, b) { return (a && a.trim()) ? a : (b || ''); }
          function doUpdate() {
            // Fondo
            var img = v(sd.imagen_url, slide0.imagen_url);
            if (heroBg) heroBg.style.backgroundImage = img ? 'url('+img+')' : '';
            // Tag
            var tagEl = document.getElementById('hm-hero-tag');
            if (tagEl) tagEl.textContent = v(sd.tag, slide0.tag);
            // Título
            var tiEl = document.getElementById('hm-hero-ti');
            if (tiEl) tiEl.innerHTML = v(sd.titulo, slide0.titulo);
            // Subtítulo
            var subEl = document.getElementById('hm-hero-sub');
            if (subEl) subEl.textContent = v(sd.subtitulo, slide0.subtitulo);
            // Botones: si el slide no tiene botones propios → usa los del slide0
            var ctaEl = heroL && heroL.querySelector('.hero-cta');
            if (ctaEl) {
              if (sd.cta_html !== undefined) {
                ctaEl.innerHTML = sd.cta_html; // slide0 original
              } else if (sd.btn1_texto || sd.btn2_texto) {
                ctaEl.innerHTML = ''
                  + (sd.btn1_texto ? '<button class="hero-btn">'+sd.btn1_texto+' <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>' : '')
                  + (sd.btn2_texto ? '<button class="hero-ghost">'+sd.btn2_texto+'</button>' : '');
              } else {
                ctaEl.innerHTML = slide0.cta_html; // hereda botones del slide0
              }
            }
            // Stat card etiqueta
            var skEl = document.getElementById('hm-hero-sk');
            if (skEl) skEl.textContent = v(sd.stat_titulo, slide0.stat_titulo);
            // Stat card valor grande
            var svEl = document.getElementById('hm-hero-sv');
            if (svEl) svEl.innerHTML = v(sd.stat_valor, slide0.stat_valor);
            // Mini stats
            var s1n=document.getElementById('hm-s1n');if(s1n)s1n.textContent=v(sd.stat1_num,slide0.stat1_num);
            var s1l=document.getElementById('hm-s1l');if(s1l)s1l.textContent=v(sd.stat1_lbl,slide0.stat1_lbl);
            var s2n=document.getElementById('hm-s2n');if(s2n)s2n.textContent=v(sd.stat2_num,slide0.stat2_num);
            var s2l=document.getElementById('hm-s2l');if(s2l)s2l.textContent=v(sd.stat2_lbl,slide0.stat2_lbl);
            var s3n=document.getElementById('hm-s3n');if(s3n)s3n.textContent=v(sd.stat3_num,slide0.stat3_num);
            var s3l=document.getElementById('hm-s3l');if(s3l)s3l.textContent=v(sd.stat3_lbl,slide0.stat3_lbl);
          }

          if (animate && heroL && heroR) {
            heroL.style.opacity = '0';
            heroR.style.opacity = '0';
            if (heroBg) heroBg.style.opacity = '0';
            setTimeout(function() {
              doUpdate();
              heroL.style.opacity = '1';
              heroR.style.opacity = '1';
              if (heroBg) heroBg.style.opacity = '1';
            }, 400);
          } else {
            doUpdate();
          }
        }

        function goToSlide(idx) {
          applySlide(allSlides[idx], idx !== _heroIdx);
          dotsDiv.querySelectorAll('.hero-dot').forEach(function(d, i) {
            d.classList.toggle('active', i === idx);
          });
          _heroIdx = idx;
        }

        function nextSlide() {
          goToSlide((_heroIdx + 1) % totalSlides);
        }

        // Crear dots dinámicos
        var dotsDiv = document.createElement('div');
        dotsDiv.className = 'hero-dots';
        for (var di = 0; di < totalSlides; di++) {
          var dot = document.createElement('button');
          dot.className = 'hero-dot' + (di === 0 ? ' active' : '');
          (function(idx) {
            dot.onclick = function() { goToSlide(idx); clearInterval(_heroTimer); _heroTimer = setInterval(nextSlide, 5000); };
          })(di);
          dotsDiv.appendChild(dot);
        }
        heroEl.appendChild(dotsDiv);

        _heroTimer = setInterval(nextSlide, 5000);
      }
    });

    // ── Herramientas del home — render dinámico desde Supabase ──────────
    aura.sb.from('home_tools').select('*').eq('lang', _hmLang).eq('activo', true).order('orden', {ascending: true}).then(function(tw) {
      if (tw.error) { console.error('[Aura] home_tools error:', tw.error.message); return; }
      var tools = tw.data;
      if (!tools || !tools.length) return; // fallback: HTML estático ya existe
      var container = document.getElementById('hm-tools-grid');
      if (!container) return;
      var _TI = {
        movieslab:    '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x=1 y=5 width=15 height=14 rx=2 ry=2></rect>',
        lyriclab:     '<path d="M9 18V5l12-2v13"></path><circle cx=6 cy=18 r=3></circle><circle cx=18 cy=16 r=3></circle>',
        flashcards:   '<path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"></path><polyline points="3 7 12 13 21 7"></polyline><path d="M3 7l9-4 9 4"></path>',
        collocations: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
        social:       '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx=9 cy=7 r=4></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'
      };
      var ARW = '<svg viewBox="0 0 24 24"><line x1=7 y1=17 x2=17 y2=7></line><polyline points="7 7 17 7 17 17"></polyline></svg>';
      container.innerHTML = tools.map(function(t) {
        var iconSvg = _TI[t.id] ? '<svg viewBox="0 0 24 24">' + _TI[t.id] + '</svg>' : '';
        var imgHtml = t.imagen_url ? '<img src="' + t.imagen_url + '" alt="' + (t.titulo||'') + '">' : '';
        var link = t.link_url || '#';
        return '<button class="tool' + (t.destacado ? ' featured' : '') + '" onclick="window.location.href=&quot;' + link + '&quot;">'
          + (t.destacado ? '<span class=tool-pill>recomendado</span>' : '')
          + '<div class=tool-img>'
            + imgHtml
            + '<div class=tool-img-overlay>'
              + (iconSvg ? '<div class=tool-icon>' + iconSvg + '</div>' : '')
              + '<div class=tool-arrow>' + ARW + '</div>'
            + '</div>'
          + '</div>'
          + '<div class=tool-body>'
            + '<div class=tool-mid>'
              + '<span class=tool-cat>' + (t.categoria  || '') + '</span>'
              + '<span class=tool-ti>'  + (t.titulo     || '') + '</span>'
              + '<span class=tool-desc>'+ (t.descripcion|| '') + '</span>'
            + '</div>'
            + '<div class=tool-foot>'
              + '<span class=stat><b>' + (t.stat_num || '') + '</b> ' + (t.stat_lbl || '') + '</span>'
              + '<span class=level>' + (t.nivel_lbl || '') + '</span>'
            + '</div>'
          + '</div>'
        + '</button>';
      }).join('');
    });

    aura.sb.from('novedades').select('*').eq('lang', _hmLang).order('orden',{ascending:true}).limit(6).then(function(nv) {
      if (nv.error) { console.error('[Aura] novedades error:', nv.error.message); return; }
      var items = (nv.data || []).filter(function(n){ return n.activo !== false; });
      if (!items.length) return; // keep static HTML if no rows
      var list = document.getElementById('hm-news-list');
      if (!list) return;
      list.innerHTML = items.map(function(n, idx) {
        var imgHtml = n.imagen_url
          ? '<img src="'+n.imagen_url+'" style="width:100%;height:100%;object-fit:cover;">'
          : '<div style="width:100%;height:100%;background:linear-gradient(135deg,#1f1f1f,#2a2a2a);border-radius:10px;"></div>';
        return '<div class="news-row'+(idx===0?' new':'')+'">'
          +'<div class=news-img>'+imgHtml+'</div>'
          +'<div class=news-meta>'
          +'<span class=news-tag>'+(n.categoria||'')+'</span>'
          +'<span class=news-ti>'+(n.titulo||'')+'</span>'
          +'<span class=news-desc>'+(n.descripcion||'')+'</span>'
          +'</div>'
          +'<span class=news-date>'+(n.fecha_display||'')+'</span>'
          +'</div>';
      }).join('');
    });
    }); // end Promise
};
