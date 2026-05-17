// ── ADMIN LYRICLAB — gestión de canciones LyricLab ──────────────────────────
// Globals: _sb

/* ── LYRICLAB ───────────────────────────────────────────────── */
function extractYouTubeId(url) {
  var m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function parseLyricsTxt(txt) {
  var lines = txt.trim().split('\n');
  var result = [];
  lines.forEach(function(line) {
    line = line.trim();
    if (!line) return;
    var m = line.match(/^(\d+):(\d{2}):(\d{2})\s+(.+)$/);
    if (m) {
      var t = parseInt(m[1])*3600 + parseInt(m[2])*60 + parseInt(m[3]);
      result.push({t: t, text: m[4].trim().toUpperCase()});
    } else {
      // Try MM:SS format
      var m2 = line.match(/^(\d+):(\d{2})\s+(.+)$/);
      if (m2) {
        var t2 = parseInt(m2[1])*60 + parseInt(m2[2]);
        result.push({t: t2, text: m2[3].trim().toUpperCase()});
      }
    }
  });
  return result;
}

function llPreviewThumb() {
  var url = document.getElementById('ll-yt-url').value;
  var ytId = extractYouTubeId(url);
  var prev = document.getElementById('ll-thumb-preview');
  var img = document.getElementById('ll-thumb-img');
  if (ytId) {
    img.src = 'https://img.youtube.com/vi/' + ytId + '/mqdefault.jpg';
    prev.style.display = 'block';
  } else {
    prev.style.display = 'none';
  }
}

function openLLModal(song) {
  document.getElementById('ll-edit-id').value = song ? song.id : '';
  document.getElementById('ll-modal-title').textContent = song ? 'Editar canción' : 'Nueva canción';
  document.getElementById('ll-yt-url').value = song ? 'https://www.youtube.com/watch?v=' + song.youtube_id : '';
  document.getElementById('ll-title').value = song ? song.title : '';
  document.getElementById('ll-artist').value = song ? song.artist : '';
  document.getElementById('ll-difficulty').value = song ? song.difficulty : 'intermedio';
  document.getElementById('ll-level').value = song ? song.level_required : 1;
  // Convert lyrics_json back to txt
  var lyrTxt = '';
  if (song && Array.isArray(song.lyrics_json)) {
    lyrTxt = song.lyrics_json.map(function(l) {
      var h = Math.floor(l.t/3600);
      var m = Math.floor((l.t%3600)/60);
      var s = l.t%60;
      return (h<10?'0'+h:h)+':'+(m<10?'0'+m:m)+':'+(s<10?'0'+s:s)+' '+l.text;
    }).join('\n');
  }
  document.getElementById('ll-lyrics-txt').value = lyrTxt;
  llPreviewThumb();
  var modal = document.getElementById('ll-modal');
  modal.style.display = 'flex';
}

function closeLLModal() {
  document.getElementById('ll-modal').style.display = 'none';
}

async function saveLLSong() {
  var ytUrl = document.getElementById('ll-yt-url').value.trim();
  var ytId = extractYouTubeId(ytUrl);
  if (!ytId) { alert('URL de YouTube inválida'); return; }
  var title = document.getElementById('ll-title').value.trim();
  if (!title) { alert('El título es obligatorio'); return; }
  var lyrTxt = document.getElementById('ll-lyrics-txt').value;
  var lyricsJson = parseLyricsTxt(lyrTxt);
  var payload = {
    youtube_id: ytId,
    title: title,
    artist: document.getElementById('ll-artist').value.trim(),
    difficulty: document.getElementById('ll-difficulty').value,
    level_required: parseInt(document.getElementById('ll-level').value)||1,
    lyrics_json: lyricsJson,
    activo: true
  };
  var editId = document.getElementById('ll-edit-id').value;
  var res;
  if (editId) {
    res = await _sb.from('lyriclab_songs').update(payload).eq('id', editId);
  } else {
    res = await _sb.from('lyriclab_songs').insert(payload);
  }
  if (res.error) { alert('Error: ' + res.error.message); return; }
  closeLLModal();
  loadLLSongs();
}

async function loadLLSongs() {
  var el = document.getElementById('ll-song-list');
  if (!el) return;
  if (!_sb) {
    el.innerHTML = '<p style="color:var(--muted);font-size:13px">Iniciando sesión...</p>';
    setTimeout(loadLLSongs, 600);
    return;
  }
  el.innerHTML = '<p style="color:var(--muted);font-size:13px">Cargando...</p>';
  var res = await _sb.from('lyriclab_songs').select('*').order('orden');
  if (res.error) {
    el.innerHTML = '<p style="color:#f87171;font-size:13px">Error: ' + res.error.message + '</p>';
    return;
  }
  el.innerHTML = '';
  if (!res.data || !res.data.length) {
    el.innerHTML = '<div style="text-align:center;padding:30px 0">'
      + '<p style="color:var(--muted);font-size:13px;margin-bottom:16px">No hay canciones en la tabla. Importa el catálogo inicial:</p>'
      + '<button onclick="seedLLSongs()" style="background:var(--accent);color:#0c0c0c;font-weight:700;font-size:13px;padding:10px 22px;border-radius:10px;border:none;cursor:pointer">⬆ Importar catálogo inicial</button>'
      + '</div>';
    return;
  }
  res.data.forEach(function(s) {
    var thumb = 'https://img.youtube.com/vi/' + s.youtube_id + '/mqdefault.jpg';
    var lyrCount = Array.isArray(s.lyrics_json) ? s.lyrics_json.length : 0;
    var card = document.createElement('div');
    card.style.cssText = 'display:flex;align-items:center;gap:14px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 16px';
    card.innerHTML = '<img src="'+thumb+'" style="width:72px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">'
      + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:14px;font-weight:700;color:var(--ink);margin-bottom:2px">'+(s.title||'Sin título')+'</div>'
        + '<div style="font-size:12px;color:var(--muted)">'+(s.artist||'—')+' · '+s.difficulty+' · '+lyrCount+' líneas</div>'
      + '</div>'
      + '<div style="display:flex;gap:8px;flex-shrink:0">'
        + '<button onclick="llEditSong(\'' + s.id + '\')" style="background:rgba(255,255,255,.08);border:none;color:var(--ink);padding:7px 14px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600">Editar</button>'
        + '<button onclick="llToggle(\'' + s.id + '\',' + s.activo + ')" style="background:' + (s.activo ? 'rgba(34,197,94,.15)' : 'rgba(248,113,113,.15)') + ';border:none;color:' + (s.activo ? '#4ade80' : '#f87171') + ';padding:7px 14px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600">' + (s.activo ? 'Activa' : 'Inactiva') + '</button>'
      + '</div>';
    el.appendChild(card);
  });
}


async function seedLLSongs() {
  var el = document.getElementById('ll-song-list');
  el.innerHTML = '<p style="color:var(--muted);font-size:13px">Importando canciones...</p>';
  var songs = [{"youtube_id": "7wtfhZwyrcc", "title": "Believer", "artist": "Imagine Dragons", "difficulty": "intermedio", "level_required": 1, "lyrics_json": [{"t": 0, "text": ""}, {"t": 7, "text": "FIRST THINGS FIRST"}, {"t": 9, "text": "I'M GONNA SAY ALL THE WORDS INSIDE MY HEAD"}, {"t": 11, "text": "I'M FIRED UP AND TIRED OF THE WAY THAT THINGS HAVE BEEN"}, {"t": 15, "text": "OH WOO"}, {"t": 17, "text": "THE WAY THAT THINGS HAVE BEEN"}, {"t": 19, "text": "OH OOH"}, {"t": 22, "text": "SECOND THINGS SECOND"}, {"t": 24, "text": "DON'T YOU TELL ME WHAT YOU THINK THAT I COULD BE"}, {"t": 27, "text": "I'M THE ONE AT THE SAIL I'M THE MASTER OF MY SEA"}, {"t": 31, "text": "OH OOH"}, {"t": 33, "text": "THE MASTER OF MY SEA"}, {"t": 34, "text": "OH OOH"}, {"t": 37, "text": "I WAS BROKEN FROM A YOUNG AGE"}, {"t": 39, "text": "TAKEN MY SULKING TO THE MASSES"}, {"t": 41, "text": "WRITING MY POEMS FOR THE FEW"}, {"t": 43, "text": "THAT LOOK TO ME TOOK TO ME SHOOK TO ME FEELING ME"}, {"t": 45, "text": "SINGING FROM HEARTACHE FROM THE PAIN"}, {"t": 47, "text": "TAKING MY MESSAGE FROM THE VEINS"}, {"t": 49, "text": "SPEAKING MY LESSON FROM THE BRAIN"}, {"t": 51, "text": "SEEING THE BEAUTY THROUGH THE"}, {"t": 54, "text": "PAIN"}, {"t": 55, "text": "YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER"}, {"t": 62, "text": "PAIN"}, {"t": 63, "text": "YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER"}, {"t": 68, "text": "PAIN"}, {"t": 70, "text": "LET THE BULLETS FLY OH LET THEM RAIN"}, {"t": 74, "text": "MY LIFE MY LOVE MY DRIVE IT CAME FROM"}, {"t": 77, "text": "PAIN"}, {"t": 78, "text": "YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER"}, {"t": 84, "text": "THIRD THINGS THIRD"}, {"t": 85, "text": "SEND A PRAYER TO THE ONES UP ABOVE"}, {"t": 88, "text": "ALL THE HATE THAT YOU'VE HEARD HAS TURNED YOUR SPIRIT TO A DOVE"}, {"t": 92, "text": "OH OOO"}, {"t": 94, "text": "YOUR SPIRIT UP ABOVE"}, {"t": 96, "text": "OH OOO"}, {"t": 99, "text": "I WAS CHOKING IN THE CROWD"}, {"t": 100, "text": "BUILDING MY RAIN UP IN THE CLOUD"}, {"t": 102, "text": "FALLING LIKE ASHES TO THE GROUND"}, {"t": 104, "text": "HOPING MY FEELINGS THEY WOULD DROWN"}, {"t": 106, "text": "BUT THEY NEVER DID EVER LIVED EBBING AND FLOWING"}, {"t": 108, "text": "INHIBITED LIMITED TILL IT BROKE OPEN"}, {"t": 110, "text": "AND RAINED DOWN YOU RAINED DOWN LIKE"}, {"t": 115, "text": "PAIN"}, {"t": 117, "text": "YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER"}, {"t": 123, "text": "PAIN"}, {"t": 125, "text": "YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER"}, {"t": 130, "text": "PAIN"}, {"t": 132, "text": "LET THE BULLETS FLY OH LET THEM RAIN"}, {"t": 135, "text": "MY LIFE MY LOVE MY DRIVE IT CAME FROM"}, {"t": 138, "text": "PAIN"}, {"t": 140, "text": "YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER"}, {"t": 145, "text": "LAST THINGS LAST"}, {"t": 146, "text": "BY THE GRACE OF THE FIRE AND THE FLAME"}, {"t": 149, "text": "YOU'RE THE FACE OF THE FUTURE"}, {"t": 152, "text": "THE BLOOD IN MY VEINS"}, {"t": 153, "text": "OH OOH"}, {"t": 155, "text": "THE BLOOD IN MY VEINS"}, {"t": 157, "text": "OH OOH"}, {"t": 160, "text": "BUT THEY NEVER DID EVER LIVED EBBING AND FLOWING"}, {"t": 162, "text": "INHIBITED LIMITED TILL IT BROKE OPEN"}, {"t": 164, "text": "AND RAINED DOWN YOU RAINED DOWN LIKE"}, {"t": 173, "text": "I WANT TO STOP"}, {"t": 177, "text": "WE CAN'T"}, {"t": 179, "text": "PAIN"}, {"t": 180, "text": "YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER"}, {"t": 187, "text": "PAIN"}, {"t": 188, "text": "YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER"}, {"t": 194, "text": "PAIN"}, {"t": 195, "text": "LET THE BULLETS FLY OH LET THEM RAIN"}, {"t": 199, "text": "MY LIFE MY LOVE MY DRIVE IT CAME FROM"}, {"t": 202, "text": "PAIN"}, {"t": 203, "text": "YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER"}], "orden": 1}, {"youtube_id": "mWRsgZuwf_8", "title": "Demons", "artist": "Imagine Dragons", "difficulty": "principiante", "level_required": 1, "lyrics_json": [], "orden": 2}, {"youtube_id": "wDjeBNv6ip0", "title": "", "artist": "", "difficulty": "intermedio", "level_required": 2, "lyrics_json": [], "orden": 3}, {"youtube_id": "RB-RcX5DS5A", "title": "", "artist": "", "difficulty": "avanzado", "level_required": 3, "lyrics_json": [], "orden": 4}, {"youtube_id": "e-fA-gBCkj0", "title": "", "artist": "", "difficulty": "principiante", "level_required": 1, "lyrics_json": [], "orden": 5}, {"youtube_id": "fV4DiAyExN0", "title": "", "artist": "", "difficulty": "intermedio", "level_required": 2, "lyrics_json": [], "orden": 6}, {"youtube_id": "EkHTsc9PU2A", "title": "", "artist": "", "difficulty": "avanzado", "level_required": 4, "lyrics_json": [], "orden": 7}, {"youtube_id": "pXRviuL6vMY", "title": "", "artist": "", "difficulty": "principiante", "level_required": 1, "lyrics_json": [], "orden": 8}, {"youtube_id": "9gWIIIr2Asw", "title": "", "artist": "", "difficulty": "intermedio", "level_required": 3, "lyrics_json": [], "orden": 9}];
  var res = await _sb.from('lyriclab_songs').insert(songs);
  if (res.error) {
    el.innerHTML = '<p style="color:#f87171;font-size:13px">Error al importar: ' + res.error.message + '<br><small>Ejecuta lyriclab_migrate.sql en Supabase SQL Editor.</small></p>';
    return;
  }
  loadLLSongs();
}

async function llEditSong(id) {
  var res = await _sb.from('lyriclab_songs').select('*').eq('id', id).single();
  if (res.data) openLLModal(res.data);
}

async function llToggle(id, current) {
  await _sb.from('lyriclab_songs').update({activo: !current}).eq('id', id);
  loadLLSongs();
}