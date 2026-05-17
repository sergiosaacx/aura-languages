// ── DECK DATA — cargado desde slangs.json ────────────────────────────────────
var ALL_SLANGS = [];   // se llena al cargar la página
var CARDS = [];        // 15 aleatorios por sesión

function buildRandomDeck(allSlangs) {
  // Shuffle y tomar 15 mezclando todos los bloques
  var shuffled = allSlangs.slice().sort(function(){ return Math.random() - 0.5; });
  var selected = shuffled.slice(0, 15);
  // Asignar lado correcto aleatorio por carta
  return selected.map(function(c) {
    var side = Math.random() < 0.5 ? 'left' : 'right';
    return {
      cat: c.cat,
      word: c.word,
      pron: '',
      ctx: c.example,
      q: '¿cuál es la definición de esta expresión?',
      optL: side === 'left' ? c.definition : c.distractor,
      optR: side === 'right' ? c.definition : c.distractor,
      defShort: c.definition,
      correctSide: side
    };
  });
}

// ── GAME STATE ─────────────────────────────────────────────────────────────────

// ── BUILD DECK ─────────────────────────────────────────────────────────────────
function buildDeck(){
  var deck = document.getElementById('deck');
  if(!deck) return;
  deck.innerHTML = '';
  var numEl = document.getElementById('deckNum');
  var totEl = document.getElementById('deckTotal');
  if(numEl) numEl.textContent = totalCorrect;
  if(totEl) totEl.textContent = CARDS.length;
  document.getElementById('sessTot').textContent = CARDS.length;

  var slots = ['s3','s2','s1'];
  var indices = [cardIdx+2, cardIdx+1, cardIdx];
  for(var i=0; i<3; i++){
    var ci = indices[i];
    if(ci >= CARDS.length) continue;
    var c = CARDS[ci];
    var art = document.createElement('article');
    art.className = 'swipe ' + slots[i];
    var isTop = (slots[i]==='s1');
    var globalNum = ci + 1;
    var inner = '<div class=swipe-head><span class=swipe-cat>'+c.cat+'</span><span class=swipe-num>'+pad2(globalNum)+'/<b>'+CARDS.length+'</b></span></div>';
    inner += '<div class=swipe-mid><span class=swipe-word>'+c.word+'</span>';
    if(isTop && c.pron) inner += '<span class=swipe-pron>'+c.pron+'</span>';
    if(isTop && c.ctx) inner += '<span class=swipe-context>'+c.ctx+'</span>';
    inner += '</div>';
    if(isTop){
      art.id = 'topCard';
      art.innerHTML =
        '<span class="swipe-label false">←</span>' +
        '<span class="swipe-label true">→</span>' +
        inner +
        '<div class=swipe-foot>' +
          '<div class=swipe-q>'+c.q+'</div>' +
          '<div class=swipe-opts>' +
            '<button class="swipe-opt left" onclick="answerOpt(\'left\')">' +
              '<span class=swipe-opt-arrow>← izquierda</span>' +
              '<span class=swipe-opt-text>'+c.optL+'</span>' +
            '</button>' +
            '<button class="swipe-opt right" onclick="answerOpt(\'right\')">' +
              '<span class=swipe-opt-arrow>derecha →</span>' +
              '<span class=swipe-opt-text>'+c.optR+'</span>' +
            '</button>' +
          '</div>' +
        '</div>';
      initDrag(art);
    } else {
      art.innerHTML = inner + '<div class=swipe-foot></div>';
    }
    deck.appendChild(art);
  }
  updatePanels();
}

function pad2(n){ return n<10?'0'+n:String(n); }

