// ── LYRICLAB UI — carga canciones, lista, navegación, perfil ───────────────
// Globals: SONGS, currentSong, player, totalScore, xp, karaoState


// ── FETCH TITLES ──────────────────────────────────────────────────────────────
async function fetchTitles(){
  for(let i=1;i<SONGS.length;i++){
    if(SONGS[i].title!=='Cargando...') continue;
    try{
      const url='https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v='+SONGS[i].id+'&format=json';
      const res=await fetch(url);
      if(res.ok){
        const d=await res.json();
        SONGS[i].title=d.title||SONGS[i].title;
        SONGS[i].artist=d.author_name||'';
        buildList();
      }
    }catch(e){}
  }
}

// ── LOAD SONGS FROM SUPABASE ─────────────────────────────────────────────────
async function loadSongsFromSupabase(){
  try{
    const sb=window._aura&&window._aura.sb;
    if(!sb) return;
    const {data,error}=await sb.from('lyriclab_songs')
      .select('*').eq('activo',true).order('orden');
    if(error||!data||!data.length) return;
    const dbSongs=data.map(row=>({
      id: row.youtube_id,
      title: row.title||'Sin título',
      artist: row.artist||'',
      difficulty: row.difficulty||'intermedio',
      levelRequired: row.level_required||1,
      mode: 'karaoke',
      lyrics: Array.isArray(row.lyrics_json)?row.lyrics_json:[]
    }));
    SONGS=[...dbSongs,...SONGS];
    currentSong=0;
    buildList();
    const s=SONGS[0];
    document.getElementById('lyrThumb').src='https://img.youtube.com/vi/'+s.id+'/mqdefault.jpg';
    document.getElementById('lyrTitle').textContent=s.title;
    document.getElementById('lyrArtist').textContent=s.artist||'—';
    const badge=document.getElementById('diffBadge');
    if(badge){badge.textContent=s.difficulty;badge.className='diff-badge '+s.difficulty;}
    karaoState.difficulty=s.difficulty;
    buildKaraoke(s);
  }catch(e){console.warn('LyricLab: no se pudo cargar desde Supabase',e);}
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  const s=SONGS[0];
  document.getElementById('lyrThumb').src='https://img.youtube.com/vi/'+s.id+'/mqdefault.jpg';
  document.getElementById('lyrTitle').textContent=s.title;
  document.getElementById('lyrArtist').textContent=s.artist;
  const badge=document.getElementById('diffBadge');
  if(badge){badge.textContent=s.difficulty;badge.className='diff-badge '+s.difficulty;}
  buildList();
  buildKaraoke(s);
  fetchTitles();
  // Load DB songs after a short delay to allow aura-supabase.js to init
  setTimeout(loadSongsFromSupabase, 800);
});

// ── TAB HELPERS ───────────────────────────────────────────────────────────────
function closeTab(xBtn){
  const tab=xBtn.parentElement;
  if(tab.classList.contains('active')) return;
  tab.remove();
}
function openTab(label,href){
  const bar=document.getElementById('tabBar');
  const existing=bar.querySelector('[data-href="'+href+'"]');
  if(existing){bar.querySelectorAll('.tb-tab').forEach(t=>t.classList.remove('active'));existing.classList.add('active');return;}
  const sep=document.createElement('span');sep.className='tb-sep';sep.textContent='›';
  const tab=document.createElement('div');tab.className='tb-tab active';tab.dataset.href=href;
  tab.innerHTML='<span class="tb-tab-label">'+label+'</span><span class="tb-tab-x" onclick="closeTab(this)">×</span>';
  tab.querySelector('.tb-tab-label').addEventListener('click',()=>window.location.href=href);
  bar.querySelectorAll('.tb-tab').forEach(t=>t.classList.remove('active'));
  bar.appendChild(sep);bar.appendChild(tab);
}

function toggleProfileMenu(e){
  e.stopPropagation();
  var menu=document.getElementById('profileMenu');
  if(menu.style.display==='none'){
    var rect=e.currentTarget.getBoundingClientRect();
    menu.style.display='block';menu.style.right='70px';menu.style.top=(rect.bottom+8)+'px';
  } else { menu.style.display='none'; }
}
document.addEventListener('click',function(){
  var menu=document.getElementById('profileMenu');
  if(menu) menu.style.display='none';
});

async function cerrarSesion(){
  if(window._aura) await _aura.signOut();
  else window.location.href='login.html';
}

function triggerPhotoUpload(){
  var inp=document.getElementById('photoInput');
  if(!inp){
    inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.id='photoInput';inp.style.display='none';document.body.appendChild(inp);
    inp.onchange=function(){
      if(!inp.files[0]) return;
      var reader=new FileReader();
      reader.onload=function(ev){
        var src=ev.target.result;
        _applyAvatar(src);
        try{localStorage.setItem('aura_profile_photo',src);}catch(e){}
        if(window._aura) _aura.uploadAvatar(inp.files[0]);
      };
      reader.readAsDataURL(inp.files[0]);
    };
  }
  inp.click();
}
function _applyAvatar(src){
  ['tbAvatar','srProfile'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){el.textContent='';el.style.backgroundImage='url('+src+')';el.style.backgroundSize='cover';el.style.backgroundPosition='center';}
  });
}
// Cargar foto guardada (sincronizada con dashboard)
(function(){
  try{
    var saved=localStorage.getItem('aura_profile_photo');
    if(saved) _applyAvatar(saved);
  }catch(e){}
})();