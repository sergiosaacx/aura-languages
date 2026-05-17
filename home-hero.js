// home-hero.js — Slider de novedades + lista de novedades del hero
window.initHeroSlider = function(aura) {
    // Devuelve Promise para que home-init.js sepa cuándo el hero está listo
    return new Promise(function(_heroResolve){
    // ── Novedades dinámicas desde Supabase ──
    aura.sb.from('admin_hero_config').select('*').eq('id','hero_1').single().then(function(hr) {
      var h = hr.data;
      if (!h) return;
      // Aplicar color de acento
      var acento = h.color_acento || '#c4ff3d';
      document.documentElement.style.setProperty('--accent', acento);

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
        if (heroBg) heroBg.style.transition = 'background-image .4s';

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
            setTimeout(function() { doUpdate(); heroL.style.opacity='1'; heroR.style.opacity='1'; }, 400);
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

    aura.sb.from('novedades').select('*').eq('activo',true).order('orden',{ascending:true}).limit(6).then(function(nv) {
      var items = nv.data;
      if (!items || !items.length) return; // keep static HTML if no rows
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
