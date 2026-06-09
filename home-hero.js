// home-hero.js — Hero, tools y novedades con auto-traducción paralela
window.initHeroSlider = function(aura) {
    return new Promise(function(_heroResolve){

    var _uiLang = 'es';
    try { _uiLang = localStorage.getItem('aura_ui_lang') || 'es'; } catch(e) {}

    try {
      if (!localStorage.getItem('aura_mm_v1')) {
        Object.keys(localStorage).forEach(function(k) {
          if (k.indexOf('aura_gtr_') === 0) localStorage.removeItem(k);
        });
        localStorage.setItem('aura_mm_v1', '1');
      }
    } catch(e) {}

    function _gtr(text) {
      return new Promise(function(resolve) {
        if (!text || !text.trim() || _uiLang === 'es') { resolve(text); return; }
        var ck = 'aura_mm_' + _uiLang + '_' + text.length + '_' + text.charCodeAt(0) + '_' + text.slice(0, 15).replace(/\W/g, '');
        try { var c = localStorage.getItem(ck); if (c !== null) { resolve(c); return; } } catch(e) {}
        fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=es|' + _uiLang)
          .then(function(r) { return r.json(); })
          .then(function(d) {
            var t = (d.responseData && d.responseData.translatedText) || '';
            if (!t || t.indexOf('MYMEMORY WARNING') !== -1) t = text;
            try { localStorage.setItem(ck, t); } catch(e) {}
            resolve(t);
          })
          .catch(function() { resolve(text); });
      });
    }

    function _trFields(obj, fields) {
      return Promise.all(fields.map(function(f) {
        return _gtr(obj[f] || '').then(function(v) { if (v) obj[f] = v; });
      }));
    }

    function _trAll(items, fields) {
      return Promise.all(items.map(function(item) {
        return _trFields(item, fields);
      }));
    }

    var _hmLang = null;
    try { _hmLang = localStorage.getItem('aura_lang'); } catch(e) {}
    _hmLang = _hmLang || (aura && aura.active_language) || 'en';

    aura.sb.from('admin_hero_config').select('*')
      .in('id', ['hero_'+_hmLang, 'hero_1'])
      .then(function(hr) {
        if (hr.error || !hr.data || !hr.data.length) {
          var hs = document.querySelector('.hero');
          if (hs) hs.style.opacity = '1';
          return;
        }
        var rows = hr.data;
        var langRow = rows.find(function(r){ return r.id === 'hero_'+_hmLang; });
        var fallRow = rows.find(function(r){ return r.id === 'hero_1'; });
        var h = (langRow && (langRow.titulo || langRow.imagen_url))
              ? langRow
              : (_hmLang === 'en' ? (fallRow || null) : null);
        if (!h) {
          var hs2 = document.querySelector('.hero');
          if (hs2) hs2.style.opacity = '1';
          return;
        }

        if (_hmLang === 'en') {
          document.documentElement.style.setProperty('--accent', h.color_acento || '#c4ff3d');
        }

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

        _trFields(h, ['tag','titulo','subtitulo','stat_valor','btn1_texto','btn2_texto','stat_titulo','stat1_lbl','stat2_lbl','stat3_lbl'])
          .then(function() {

            fillSlide(
              document.getElementById('hm-hero-bg'), document.getElementById('hm-hero-tag'),
              document.getElementById('hm-hero-ti'), document.getElementById('hm-hero-sub'),
              document.getElementById('hm-hero-sk'),
              document.getElementById('hm-s1n'), document.getElementById('hm-s1l'),
              document.getElementById('hm-s2n'), document.getElementById('hm-s2l'),
              document.getElementById('hm-s3n'), document.getElementById('hm-s3l'), h
            );

            var _mImg = document.getElementById('hm-hero-img-m');
            if (_mImg && h.imagen_url) _mImg.src = h.imagen_url;
            var _mTag = document.getElementById('hm-hero-tag-m');
            if (_mTag && h.tag) _mTag.textContent = h.tag;
            var _mTi = document.getElementById('hm-hero-ti-m');
            if (_mTi && h.titulo) _mTi.innerHTML = h.titulo;
            var _mSub = document.getElementById('hm-hero-sub-m');
            if (_mSub && h.subtitulo) _mSub.textContent = h.subtitulo;
            var _minis = document.querySelectorAll('.hero-m .mini');
            if (_minis[0]) { var _mb0=_minis[0].querySelector('b'); var _ms0=_minis[0].querySelector('span'); if(_mb0&&h.stat1_num)_mb0.textContent=h.stat1_num; if(_ms0&&h.stat1_lbl)_ms0.textContent=h.stat1_lbl; }
            if (_minis[1]) { var _mb1=_minis[1].querySelector('b'); var _ms1=_minis[1].querySelector('span'); if(_mb1&&h.stat2_num)_mb1.textContent=h.stat2_num; if(_ms1&&h.stat2_lbl)_ms1.textContent=h.stat2_lbl; }
            if (_minis[2]) { var _mb2=_minis[2].querySelector('b'); var _ms2=_minis[2].querySelector('span'); if(_mb2&&h.stat3_num)_mb2.textContent=h.stat3_num; if(_ms2&&h.stat3_lbl)_ms2.textContent=h.stat3_lbl; }
            var _mBtn1 = document.querySelector('.hero-m .hero-btn');
            var _mBtn2 = document.querySelector('.hero-m .hero-ghost');
            if (_mBtn1 && h.btn1_texto) _mBtn1.innerHTML = h.btn1_texto + ' <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
            if (_mBtn2 && h.btn2_texto) _mBtn2.textContent = h.btn2_texto;
            if (_mBtn1 && h.btn1_url) { var _ma1=document.createElement('a');_ma1.href=h.btn1_url;_ma1.className=_mBtn1.className;_ma1.innerHTML=_mBtn1.innerHTML;if(_mBtn1.parentNode)_mBtn1.parentNode.replaceChild(_ma1,_mBtn1); }
            if (_mBtn2 && h.btn2_url) { var _ma2=document.createElement('a');_ma2.href=h.btn2_url;_ma2.className=_mBtn2.className;_ma2.innerHTML=_mBtn2.innerHTML;if(_mBtn2.parentNode)_mBtn2.parentNode.replaceChild(_ma2,_mBtn2); }

            var svEl = document.getElementById('hm-hero-sv');
            if (svEl) {
              var svContent = h.stat_valor || svEl.innerHTML || '';
              if (svContent) _gtr(svContent).then(function(v) { svEl.innerHTML = v || svContent; });
            }

            var _hBtn1 = document.querySelector('.hero-btn');
            var _hBtn2 = document.querySelector('.hero-ghost');
            if (_hBtn1 && h.btn1_texto) {
              _hBtn1.innerHTML = h.btn1_texto + ' <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
            }
            if (_hBtn2 && h.btn2_texto) _hBtn2.textContent = h.btn2_texto;
            if (_hBtn1 && h.btn1_url) {
              var _a1 = document.createElement('a');
              _a1.href = h.btn1_url; _a1.className = _hBtn1.className;
              _a1.innerHTML = _hBtn1.innerHTML; _a1.style.cssText = _hBtn1.style.cssText;
              if (_hBtn1.parentNode) _hBtn1.parentNode.replaceChild(_a1, _hBtn1);
            }
            if (_hBtn2 && h.btn2_url) {
              var _a2 = document.createElement('a');
              _a2.href = h.btn2_url; _a2.className = _hBtn2.className;
              _a2.innerHTML = _hBtn2.innerHTML; _a2.style.cssText = _hBtn2.style.cssText;
              if (_hBtn2.parentNode) _hBtn2.parentNode.replaceChild(_a2, _hBtn2);
            }

            var heroEl = document.querySelector('.hero');
            if (heroEl) heroEl.style.opacity = '1';

            if (h.modo === 'slider') {
              var extraSlides = [];
              try { extraSlides = JSON.parse(h.slides_json || '[]'); } catch(e) {}
              if (extraSlides.length === 0) return;

              var heroBg = document.getElementById('hm-hero-bg');
              var heroL  = heroEl && heroEl.querySelector('.hero-l');
              var heroR  = heroEl && heroEl.querySelector('.hero-r');

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

              var allSlides = [slide0].concat(extraSlides);
              var totalSlides = allSlides.length;
              var _heroIdx = 0, _heroTimer;

              var staticDots = heroEl.querySelector('.hero-dots');
              if (staticDots) staticDots.style.display = 'none';
              if (heroL)  heroL.style.transition  = 'opacity .4s';
              if (heroR)  heroR.style.transition  = 'opacity .4s';
              if (heroBg) heroBg.style.transition = 'opacity .4s';

              // ── Mobile dots ───────────────────────────────────────────
              var _mDotsWrap = document.querySelector('.hero-m .dots');
              if (_mDotsWrap) {
                _mDotsWrap.innerHTML = '';
                for (var _mdi = 0; _mdi < totalSlides; _mdi++) {
                  var _md = document.createElement('i');
                  if (_mdi === 0) _md.classList.add('on');
                  _mDotsWrap.appendChild(_md);
                }
              }

              // ── Crossfade layers: desktop bg ──────────────────────────
              // _bgBack va DENTRO de heroBg para que el overlay nunca desaparezca
              var _bgBack = null;
              if (heroBg) {
                _bgBack = document.createElement('div');
                _bgBack.style.cssText = 'position:absolute;inset:0;opacity:0;transition:opacity .5s ease;background-size:cover;background-position:center;z-index:0;';
                heroBg.style.position = heroBg.style.position || 'relative';
                heroBg.insertBefore(_bgBack, heroBg.firstChild);
              }

              // ── Crossfade layers: mobile img ──────────────────────────
              var _imgFront = document.getElementById('hm-hero-img-m');
              var _imgBack  = null;
              var _picEl    = _imgFront && _imgFront.parentNode;
              if (_picEl && _imgFront) {
                _imgFront.style.transition = 'opacity .5s ease';
                _imgBack = document.createElement('img');
                _imgBack.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity .5s ease;';
                _picEl.insertBefore(_imgBack, _imgFront);
              }

              function _doCrossfade(frontEl, backEl, newVal, isBg) {
                if (!frontEl || !backEl || !newVal) return;
                if (isBg) { backEl.style.backgroundImage = 'url('+newVal+')'; }
                else      { backEl.src = newVal; }
                backEl.style.transition  = 'opacity .5s ease';
                frontEl.style.transition = 'opacity .5s ease';
                backEl.style.opacity  = '1';
                frontEl.style.opacity = '0';
                setTimeout(function() {
                  if (isBg) { frontEl.style.backgroundImage = 'url('+newVal+')'; }
                  else      { frontEl.src = newVal; }
                  frontEl.style.transition = 'none';
                  frontEl.style.opacity = '1';
                  backEl.style.transition  = 'none';
                  backEl.style.opacity  = '0';
                  setTimeout(function() {
                    frontEl.style.transition = 'opacity .5s ease';
                    backEl.style.transition  = 'opacity .5s ease';
                  }, 50);
                }, 530);
              }

              function applySlide(sd, animate) {
                function v(a, b) { return (a && a.trim()) ? a : (b || ''); }

                function doUpdate() {
                  // ── Desktop texto — cambia al instante ───────────────
                  var tagEl = document.getElementById('hm-hero-tag'); if (tagEl) tagEl.textContent = v(sd.tag, slide0.tag);
                  var tiEl  = document.getElementById('hm-hero-ti');  if (tiEl)  tiEl.innerHTML   = v(sd.titulo, slide0.titulo);
                  var subEl = document.getElementById('hm-hero-sub'); if (subEl) subEl.textContent = v(sd.subtitulo, slide0.subtitulo);
                  var ctaEl = heroL && heroL.querySelector('.hero-cta');
                  if (ctaEl) {
                    if (sd.cta_html !== undefined) { ctaEl.innerHTML = sd.cta_html; }
                    else if (sd.btn1_texto || sd.btn2_texto) {
                      ctaEl.innerHTML =
                        (sd.btn1_texto ? '<button class="hero-btn">'+sd.btn1_texto+' <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>' : '') +
                        (sd.btn2_texto ? '<button class="hero-ghost">'+sd.btn2_texto+'</button>' : '');
                    } else { ctaEl.innerHTML = slide0.cta_html; }
                  }
                  var skEl = document.getElementById('hm-hero-sk'); if (skEl) skEl.textContent = v(sd.stat_titulo, slide0.stat_titulo);
                  var svEl2 = document.getElementById('hm-hero-sv'); if (svEl2) svEl2.innerHTML = v(sd.stat_valor, slide0.stat_valor);
                  var s1n=document.getElementById('hm-s1n');if(s1n)s1n.textContent=v(sd.stat1_num,slide0.stat1_num);
                  var s1l=document.getElementById('hm-s1l');if(s1l)s1l.textContent=v(sd.stat1_lbl,slide0.stat1_lbl);
                  var s2n=document.getElementById('hm-s2n');if(s2n)s2n.textContent=v(sd.stat2_num,slide0.stat2_num);
                  var s2l=document.getElementById('hm-s2l');if(s2l)s2l.textContent=v(sd.stat2_lbl,slide0.stat2_lbl);
                  var s3n=document.getElementById('hm-s3n');if(s3n)s3n.textContent=v(sd.stat3_num,slide0.stat3_num);
                  var s3l=document.getElementById('hm-s3l');if(s3l)s3l.textContent=v(sd.stat3_lbl,slide0.stat3_lbl);

                  // ── Mobile texto — cambia al instante ────────────────
                  var _sTag = document.getElementById('hm-hero-tag-m'); if (_sTag) _sTag.textContent = v(sd.tag, slide0.tag);
                  var _sTi  = document.getElementById('hm-hero-ti-m');  if (_sTi)  _sTi.innerHTML   = v(sd.titulo, slide0.titulo);
                  var _sSub = document.getElementById('hm-hero-sub-m'); if (_sSub) _sSub.textContent = v(sd.subtitulo, slide0.subtitulo);
                  var _sms  = document.querySelectorAll('.hero-m .mini');
                  if (_sms[0]) { var _sb0=_sms[0].querySelector('b'),_ss0=_sms[0].querySelector('span'); if(_sb0)_sb0.textContent=v(sd.stat1_num,slide0.stat1_num); if(_ss0)_ss0.textContent=v(sd.stat1_lbl,slide0.stat1_lbl); }
                  if (_sms[1]) { var _sb1=_sms[1].querySelector('b'),_ss1=_sms[1].querySelector('span'); if(_sb1)_sb1.textContent=v(sd.stat2_num,slide0.stat2_num); if(_ss1)_ss1.textContent=v(sd.stat2_lbl,slide0.stat2_lbl); }
                  if (_sms[2]) { var _sb2=_sms[2].querySelector('b'),_ss2=_sms[2].querySelector('span'); if(_sb2)_sb2.textContent=v(sd.stat3_num,slide0.stat3_num); if(_ss2)_ss2.textContent=v(sd.stat3_lbl,slide0.stat3_lbl); }
                }

                // Texto al instante (siempre)
                doUpdate();

                // Imagen: crossfade en ambas versiones
                if (animate) {
                  var newImg = v(sd.imagen_url, slide0.imagen_url);
                  // Desktop: _bgBack está DENTRO de heroBg — heroBg nunca cambia de opacidad
                  if (heroBg && _bgBack && newImg) {
                    _bgBack.style.backgroundImage = 'url('+newImg+')';
                    _bgBack.style.transition = 'opacity .5s ease';
                    _bgBack.style.opacity = '1';
                    setTimeout(function() {
                      heroBg.style.backgroundImage = 'url('+newImg+')';
                      _bgBack.style.transition = 'none';
                      _bgBack.style.opacity = '0';
                      setTimeout(function() { _bgBack.style.transition = 'opacity .5s ease'; }, 50);
                    }, 530);
                  }
                  // Mobile: igual que antes
                  _doCrossfade(_imgFront, _imgBack, newImg, false);
                }
              }

              function goToSlide(idx) {
                applySlide(allSlides[idx], idx !== _heroIdx);
                dotsDiv.querySelectorAll('.hero-dot').forEach(function(d,i){ d.classList.toggle('active',i===idx); });
                document.querySelectorAll('.hero-m .dots i').forEach(function(d,i){ d.classList.toggle('on',i===idx); });
                _heroIdx = idx;
              }
              function nextSlide() { goToSlide((_heroIdx+1) % totalSlides); }

              var dotsDiv = document.createElement('div');
              dotsDiv.className = 'hero-dots';
              for (var di = 0; di < totalSlides; di++) {
                var dot = document.createElement('button');
                dot.className = 'hero-dot' + (di === 0 ? ' active' : '');
                (function(idx){ dot.onclick = function(){ goToSlide(idx); clearInterval(_heroTimer); _heroTimer = setInterval(nextSlide,5000); }; })(di);
                dotsDiv.appendChild(dot);
              }
              heroEl.appendChild(dotsDiv);
              _heroTimer = setInterval(nextSlide, 5000);
            }

          });

      });

    aura.sb.from('home_tools').select('*')
      .eq('activo', true)
      .order('orden', {ascending: true})
      .then(function(tw) {
        if (tw.error) { console.error('[Aura] home_tools:', tw.error.message); return; }
        if (!tw.data || !tw.data.length) return;
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
        var _recom = window.auraT ? window.auraT('home_recommended') : 'recomendado';

        function _renderTools(data) {
          container.innerHTML = data.map(function(t) {
            var baseId  = (t.id || '').replace(/_[a-z]{2}$/, '');
            var iconSvg = _TI[baseId] ? '<svg viewBox="0 0 24 24">'+_TI[baseId]+'</svg>' : '';
            var imgHtml = t.imagen_url ? '<img src="'+t.imagen_url+'" alt="'+(t.titulo||'')+'">' : '';
            var link = t.link_url || '#';
            return '<button class="tool'+(t.destacado?' featured':'')+'" onclick="window.location.href=&quot;'+link+'&quot;">'
              +(t.destacado?'<span class=tool-pill>'+_recom+'</span>':'')
              +'<div class=tool-img>'+imgHtml
                +'<div class=tool-img-overlay>'
                  +(iconSvg?'<div class=tool-icon>'+iconSvg+'</div>':'')
                  +'<div class=tool-arrow>'+ARW+'</div>'
                +'</div>'
              +'</div>'
              +'<div class=tool-body>'
                +'<div class=tool-mid>'
                  +'<span class=tool-cat>'+(t.categoria||'')+'</span>'
                  +'<span class=tool-ti>'+(t.titulo||'')+'</span>'
                  +'<span class=tool-desc>'+(t.descripcion||'')+'</span>'
                +'</div>'
                +'<div class=tool-foot>'
                  +'<span class=stat><b>'+(t.stat_num||'')+'</b> '+(t.stat_lbl||'')+'</span>'
                  +'<span class=level>'+(t.nivel_lbl||'')+'</span>'
                +'</div>'
              +'</div>'
            +'</button>';
          }).join('');
          container.style.opacity = '1';
        }

        _trAll(tw.data, ['descripcion', 'categoria', 'stat_lbl', 'nivel_lbl'])
          .then(function() { _renderTools(tw.data); });
      });

    aura.sb.from('novedades').select('*')
      .eq('lang', _hmLang)
      .order('orden', {ascending: true}).limit(6)
      .then(function(nv) {
        if (nv.error) { console.error('[Aura] novedades:', nv.error.message); return; }
        var items = (nv.data || []).filter(function(n){ return n.activo !== false; });
        if (!items.length) return;
        var list = document.getElementById('hm-news-list');
        if (!list) return;

        function _renderNews(data) {
          list.innerHTML = data.map(function(n, idx) {
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
        }

        _trAll(items, ['titulo', 'descripcion', 'categoria'])
          .then(function() { _renderNews(items); });
      });

    });
};
