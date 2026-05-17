// ── LYRICLAB DATA — constantes, letras, canciones y carga Supabase ─────────

// ── WORD POOL (distractors) ───────────────────────────────────────────────
const _POOL = ['HEART','MIND','SOUL','FIRE','RAIN','LIGHT','DARK','LOVE','HOPE','DREAM',
  'FALL','RISE','LOST','FOUND','GOLD','TIME','WORLD','BLOOD','VOICE','STRONG',
  'BRAVE','FREE','WILD','YOUNG','OLD','NEW','FIRST','LAST','WORDS','HANDS',
  'EYES','FACE','TRUTH','FAITH','GRACE','POWER','STORY','NIGHT','SPEED','CHANCE',
  'SONG','ROAD','BRIDGE','STONE','FLAME','WIND','WAVE','BREAK','BUILD','MOVE'];


// ── Carga pool de distractores desde Supabase (per-song) ─────────────────────
// Retorna array de palabras en MAYÚSCULAS.
// Busca primero en word_pools con context "lyriclab/<songId>",
// si no existe usa el _POOL estático de 50 palabras.
async function loadLyriclabPool(songId) {
  try {
    var sb = window._aura && window._aura.sb;
    if (!sb) throw new Error('no sb');
    var res = await sb.from('word_pools')
      .select('words')
      .eq('context', 'lyriclab/' + songId)
      .maybeSingle();
    if (res.data && res.data.words && res.data.words.length > 0) {
      console.log('[LyricLab] Pool Supabase: ' + res.data.words.length + ' palabras para ' + songId);
      return res.data.words;
    }
  } catch(e) {
    console.warn('[LyricLab] Pool Supabase no disponible:', e.message);
  }
  console.log('[LyricLab] Pool estático (' + _POOL.length + ' palabras)');
  return _POOL.slice();
}

// ── BELIEVER LYRICS ──────────────────────────────────────────────────────────
const BELIEVER_LYRICS = [
  {t:0,   text:''},
  {t:7,   text:'FIRST THINGS FIRST'},
  {t:9,   text:"I'M GONNA SAY ALL THE WORDS INSIDE MY HEAD"},
  {t:11,  text:"I'M FIRED UP AND TIRED OF THE WAY THAT THINGS HAVE BEEN"},
  {t:15,  text:'OH WOO'},
  {t:17,  text:'THE WAY THAT THINGS HAVE BEEN'},
  {t:19,  text:'OH OOH'},
  {t:22,  text:'SECOND THINGS SECOND'},
  {t:24,  text:"DON'T YOU TELL ME WHAT YOU THINK THAT I COULD BE"},
  {t:27,  text:"I'M THE ONE AT THE SAIL I'M THE MASTER OF MY SEA"},
  {t:31,  text:'OH OOH'},
  {t:33,  text:'THE MASTER OF MY SEA'},
  {t:34,  text:'OH OOH'},
  {t:37,  text:'I WAS BROKEN FROM A YOUNG AGE'},
  {t:39,  text:'TAKEN MY SULKING TO THE MASSES'},
  {t:41,  text:'WRITING MY POEMS FOR THE FEW'},
  {t:43,  text:'THAT LOOK TO ME TOOK TO ME SHOOK TO ME FEELING ME'},
  {t:45,  text:'SINGING FROM HEARTACHE FROM THE PAIN'},
  {t:47,  text:'TAKING MY MESSAGE FROM THE VEINS'},
  {t:49,  text:'SPEAKING MY LESSON FROM THE BRAIN'},
  {t:51,  text:'SEEING THE BEAUTY THROUGH THE'},
  {t:54,  text:'PAIN'},
  {t:55,  text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:62,  text:'PAIN'},
  {t:63,  text:'YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER'},
  {t:68,  text:'PAIN'},
  {t:70,  text:'LET THE BULLETS FLY OH LET THEM RAIN'},
  {t:74,  text:'MY LIFE MY LOVE MY DRIVE IT CAME FROM'},
  {t:77,  text:'PAIN'},
  {t:78,  text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:84,  text:'THIRD THINGS THIRD'},
  {t:85,  text:'SEND A PRAYER TO THE ONES UP ABOVE'},
  {t:88,  text:"ALL THE HATE THAT YOU'VE HEARD HAS TURNED YOUR SPIRIT TO A DOVE"},
  {t:92,  text:'OH OOO'},
  {t:94,  text:'YOUR SPIRIT UP ABOVE'},
  {t:96,  text:'OH OOO'},
  {t:99,  text:'I WAS CHOKING IN THE CROWD'},
  {t:100, text:'BUILDING MY RAIN UP IN THE CLOUD'},
  {t:102, text:'FALLING LIKE ASHES TO THE GROUND'},
  {t:104, text:'HOPING MY FEELINGS THEY WOULD DROWN'},
  {t:106, text:'BUT THEY NEVER DID EVER LIVED EBBING AND FLOWING'},
  {t:108, text:'INHIBITED LIMITED TILL IT BROKE OPEN'},
  {t:110, text:'AND RAINED DOWN YOU RAINED DOWN LIKE'},
  {t:115, text:'PAIN'},
  {t:117, text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:123, text:'PAIN'},
  {t:125, text:'YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER'},
  {t:130, text:'PAIN'},
  {t:132, text:'LET THE BULLETS FLY OH LET THEM RAIN'},
  {t:135, text:'MY LIFE MY LOVE MY DRIVE IT CAME FROM'},
  {t:138, text:'PAIN'},
  {t:140, text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:145, text:'LAST THINGS LAST'},
  {t:146, text:'BY THE GRACE OF THE FIRE AND THE FLAME'},
  {t:149, text:"YOU'RE THE FACE OF THE FUTURE"},
  {t:152, text:'THE BLOOD IN MY VEINS'},
  {t:153, text:'OH OOH'},
  {t:155, text:'THE BLOOD IN MY VEINS'},
  {t:157, text:'OH OOH'},
  {t:160, text:'BUT THEY NEVER DID EVER LIVED EBBING AND FLOWING'},
  {t:162, text:'INHIBITED LIMITED TILL IT BROKE OPEN'},
  {t:164, text:'AND RAINED DOWN YOU RAINED DOWN LIKE'},
  {t:173, text:'I WANT TO STOP'},
  {t:177, text:"WE CAN'T"},
  {t:179, text:'PAIN'},
  {t:180, text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:187, text:'PAIN'},
  {t:188, text:'YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER'},
  {t:194, text:'PAIN'},
  {t:195, text:'LET THE BULLETS FLY OH LET THEM RAIN'},
  {t:199, text:'MY LIFE MY LOVE MY DRIVE IT CAME FROM'},
  {t:202, text:'PAIN'},
  {t:203, text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'}
];

// ── SONGS ────────────────────────────────────────────────────────────────────
let SONGS = [
  {id:'7wtfhZwyrcc', title:'Believer', artist:'Imagine Dragons', difficulty:'intermedio', levelRequired:1, mode:'karaoke', lyrics:BELIEVER_LYRICS},
  {id:'mWRsgZuwf_8', title:'Demons', artist:'Imagine Dragons', difficulty:'principiante', levelRequired:1, mode:'fragment',
    fragments:[{start:8,end:23,phrase:'When the days are cold and the cards all fold and the saints we see are all made of gold'},{start:22,end:34,phrase:'When your dreams all fail and the ones we hail are the worst of all and the bloods run stale'}]},
  {id:'wDjeBNv6ip0', title:'Cargando...', artist:'', difficulty:'intermedio', levelRequired:2, mode:'fragment',
    fragments:[{start:15,end:30,phrase:'When you get older plainer saner will you remember all the danger we came from'},{start:30,end:40,phrase:'Burning like embers falling tender long before the days of no surrender years ago'}]},
  {id:'RB-RcX5DS5A', title:'Cargando...', artist:'', difficulty:'avanzado', levelRequired:3, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'e-fA-gBCkj0', title:'Cargando...', artist:'', difficulty:'principiante', levelRequired:1, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'fV4DiAyExN0', title:'Cargando...', artist:'', difficulty:'intermedio', levelRequired:2, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'EkHTsc9PU2A', title:'Cargando...', artist:'', difficulty:'avanzado', levelRequired:4, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'pXRviuL6vMY', title:'Cargando...', artist:'', difficulty:'principiante', levelRequired:1, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'9gWIIIr2Asw', title:'Cargando...', artist:'', difficulty:'intermedio', levelRequired:3, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]}
];
