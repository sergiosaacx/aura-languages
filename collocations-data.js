// ════════════════════════════════════════════════════════════════════════
//  COLLOCATIONS GAME — Aura Languages
// ════════════════════════════════════════════════════════════════════════
//
//  difficulty: 'easy'  → traducción directa, mismo verbo/orden
//              'med'   → el verbo cambia (tomar→make, hacer→pay...)
//              'hard'  → estructura distinta (tener→be, gustar invertido)
//              'leg'   → idioms que no existen en español

// ── Traducciones estáticas de frases existentes ───────────────────────────────
var _COLL_TRANSLATIONS = {
  '"Tomé una decisión"':{"fr":"J'ai pris une décision","it":"Ho preso una decisione","pt":"Tomei uma decisão","hint_fr":"utilise MAKE pas TAKE","hint_it":"usa MAKE non TAKE","hint_pt":"usa MAKE não TAKE"},
  '"Hice mi tarea"':{"fr":"J'ai fait mes devoirs","it":"Ho fatto i compiti","pt":"Fiz minha lição de casa","hint_fr":"utilise DO pas MAKE","hint_it":"usa DO non MAKE","hint_pt":"usa DO não MAKE"},
  '"Por favor presta atención"':{"fr":"S'il te plaît, fais attention","it":"Per favore presta attenzione","pt":"Por favor, preste atenção","hint_fr":"l'attention se paie avec PAY","hint_it":"l'attenzione si paga con PAY","hint_pt":"atenção se paga com PAY"},
  '"Tengo mucha hambre"':{"fr":"J'ai très faim","it":"Ho molta fame","pt":"Estou com muita fome","hint_fr":"la faim se dit avec BE","hint_it":"la fame si è non si ha","hint_pt":"fome se sente com BE"},
  '"Ella rompió una promesa"':{"fr":"Elle a brisé une promesse","it":"Ha infranto una promessa","pt":"Ela quebrou uma promessa","hint_fr":"les promesses se brisent avec BREAK","hint_it":"le promesse si rompono con BREAK","hint_pt":"promessas se quebram com BREAK"},
  '"Él dio un discurso"':{"fr":"Il a fait un discours","it":"Ha tenuto un discorso","pt":"Ele fez um discurso","hint_fr":"le discours se donne avec GIVE","hint_it":"il discorso si tiene con GIVE","hint_pt":"discurso se dá com GIVE"},
  '"Cometí un error"':{"fr":"J'ai fait une erreur","it":"Ho fatto un errore","pt":"Cometi um erro","hint_fr":"les erreurs se font avec MAKE","hint_it":"gli errori si fanno con MAKE","hint_pt":"erros se fazem com MAKE"},
  '"Me duché"':{"fr":"J'ai pris une douche","it":"Ho fatto una doccia","pt":"Tomei um banho","hint_fr":"la douche se prend avec TAKE","hint_it":"la doccia si fa con TAKE","hint_pt":"banho se toma com TAKE"},
  '"Hago ejercicio todos los días"':{"fr":"Je fais de l'exercice tous les jours","it":"Faccio esercizio ogni giorno","pt":"Faço exercício todos os dias","hint_fr":"l'exercice va avec DO","hint_it":"l'esercizio va con DO","hint_pt":"exercício vai com DO"},
  '"Estoy de acuerdo contigo"':{"fr":"Je suis d'accord avec toi","it":"Sono d'accordo con te","pt":"Concordo com você","hint_fr":"agree est déjà le verbe","hint_it":"agree è già il verbo","hint_pt":"agree já é o verbo"},
  '"Te extraño"':{"fr":"Tu me manques","it":"Mi manchi","pt":"Sinto sua falta","hint_fr":"le verbe miss existe","hint_it":"il verbo miss esiste","hint_pt":"existe o verbo miss"},
  '"Tienes razón"':{"fr":"Tu as raison","it":"Hai ragione","pt":"Você tem razão","hint_fr":"you're right pas you have reason","hint_it":"la ragione si è non si ha","hint_pt":"razão — you're right"},
  '"Voy a tomar un descanso"':{"fr":"Je vais faire une pause","it":"Vado a fare una pausa","pt":"Vou fazer uma pausa","hint_fr":"la pause se prend avec TAKE","hint_it":"la pausa si prende con TAKE","hint_pt":"pausa se toma com TAKE"},
  '"Ellos hicieron un trato"':{"fr":"Ils ont conclu un accord","it":"Hanno concluso un accordo","pt":"Eles fizeram um acordo","hint_fr":"les accords se font avec MAKE","hint_it":"gli accordi si fanno con MAKE","hint_pt":"acordos se fazem com MAKE"},
  '"Tengo veinte años"':{"fr":"J'ai vingt ans","it":"Ho vent'anni","pt":"Tenho vinte anos","hint_fr":"l'âge se dit avec BE","hint_it":"l'età si è non si ha","hint_pt":"idade usa BE em inglês"},
  'Tuve una buena idea':{"fr":"J'ai eu une bonne idée","it":"Ho avuto una buona idea","pt":"Tive uma boa ideia","hint_fr":"utilise HAVE pour les idées","hint_it":"usa HAVE per le idee","hint_pt":"usa HAVE para ideias"},
  'Tengo un resfriado':{"fr":"J'ai un rhume","it":"Ho un raffreddore","pt":"Estou resfriado","hint_fr":"utilise HAVE pour les rhumes","hint_it":"usa HAVE per i raffreddori","hint_pt":"usa HAVE para resfriados"},
  'Vamos a tener una reunion':{"fr":"On va avoir une réunion","it":"Avremo una riunione","pt":"Vamos ter uma reunião","hint_fr":"utilise HAVE pour les réunions","hint_it":"usa HAVE per le riunioni","hint_pt":"usa HAVE para reuniões"},
  'Tuve una pesadilla':{"fr":"J'ai fait un cauchemar","it":"Ho fatto un incubo","pt":"Tive um pesadelo","hint_fr":"utilise HAVE pour les cauchemars","hint_it":"usa HAVE per gli incubi","hint_pt":"usa HAVE para pesadelos"},
  'Desayune':{"fr":"J'ai pris mon petit-déjeuner","it":"Ho fatto colazione","pt":"Tomei café da manhã","hint_fr":"utilise HAVE pour les repas","hint_it":"usa HAVE per i pasti","hint_pt":"usa HAVE para refeições"},
  'Hice una reserva':{"fr":"J'ai fait une réservation","it":"Ho fatto una prenotazione","pt":"Fiz uma reserva","hint_fr":"utilise MAKE pour les réservations","hint_it":"usa MAKE per le prenotazioni","hint_pt":"usa MAKE para reservas"},
  'Estoy progresando':{"fr":"Je fais des progrès","it":"Sto facendo progressi","pt":"Estou progredindo","hint_fr":"utilise MAKE pour le progrès","hint_it":"usa MAKE per i progressi","hint_pt":"usa MAKE para progresso"},
  'Hicieron un esfuerzo':{"fr":"Ils ont fait un effort","it":"Hanno fatto uno sforzo","pt":"Eles fizeram um esforço","hint_fr":"utilise MAKE pour les efforts","hint_it":"usa MAKE per gli sforzi","hint_pt":"usa MAKE para esforços"},
  'Marco la diferencia':{"fr":"Ça a fait la différence","it":"Ha fatto la differenza","pt":"Fez a diferença","hint_fr":"utilise MAKE pour les différences","hint_it":"usa MAKE per le differenze","hint_pt":"usa MAKE para diferenças"},
  'Hice amigos facilmente':{"fr":"Je me suis fait des amis facilement","it":"Ho fatto amicizie facilmente","pt":"Fiz amigos facilmente","hint_fr":"utilise MAKE pour les amis","hint_it":"usa MAKE per gli amici","hint_pt":"usa MAKE para amigos"},
  'Hizo una queja':{"fr":"Il a fait une plainte","it":"Ha fatto un reclamo","pt":"Fez uma reclamação","hint_fr":"utilise MAKE pour les plaintes","hint_it":"usa MAKE per i reclami","hint_pt":"usa MAKE para reclamações"},
  'Tengo que lavar la ropa':{"fr":"Je dois faire la lessive","it":"Devo fare il bucato","pt":"Tenho que lavar a roupa","hint_fr":"utilise DO pour la lessive","hint_it":"usa DO per il bucato","hint_pt":"usa DO para a roupa"},
  'Esta cocinando':{"fr":"Il est en train de cuisiner","it":"Sta cucinando","pt":"Está cozinhando","hint_fr":"utilise DO pour cuisiner","hint_it":"usa DO per cucinare","hint_pt":"usa DO para cozinhar"},
  'Estan investigando':{"fr":"Ils font des recherches","it":"Stanno facendo ricerche","pt":"Estão pesquisando","hint_fr":"utilise DO pour la recherche","hint_it":"usa DO per la ricerca","hint_pt":"usa DO para pesquisa"},
  'Le fue bien en el examen':{"fr":"Il s'en est bien sorti à l'examen","it":"Ha fatto bene all'esame","pt":"Foi bem no exame","hint_fr":"utilise DO pour les performances","hint_it":"usa DO per le prestazioni","hint_pt":"usa DO para bom desempenho"},
  'Hacemos negocios juntos':{"fr":"On fait des affaires ensemble","it":"Facciamo affari insieme","pt":"Fazemos negócios juntos","hint_fr":"utilise DO pour les affaires","hint_it":"usa DO per gli affari","hint_pt":"usa DO para negócios"},
  'Tome un riesgo':{"fr":"J'ai pris un risque","it":"Ho preso un rischio","pt":"Corri um risco","hint_fr":"utilise TAKE pour les risques","hint_it":"usa TAKE per i rischi","hint_pt":"usa TAKE para riscos"},
  'Aprovecho la situacion':{"fr":"Il a profité de la situation","it":"Ha approfittato della situazione","pt":"Aproveitou a situação","hint_fr":"utilise TAKE advantage","hint_it":"usa TAKE advantage","hint_pt":"usa TAKE advantage"},
  'Toma asiento':{"fr":"Prends un siège","it":"Siediti","pt":"Sente-se","hint_fr":"utilise TAKE a seat","hint_it":"usa TAKE a seat","hint_pt":"usa TAKE a seat"},
  'Tomo una foto':{"fr":"Il a pris une photo","it":"Ha scattato una foto","pt":"Tirou uma foto","hint_fr":"utilise TAKE pour les photos","hint_it":"usa TAKE per le foto","hint_pt":"usa TAKE para fotos"},
  'Toma notas':{"fr":"Prends des notes","it":"Prendi appunti","pt":"Faça anotações","hint_fr":"utilise TAKE pour les notes","hint_it":"usa TAKE per gli appunti","hint_pt":"usa TAKE para notas"},
  'Dame un ejemplo':{"fr":"Donne-moi un exemple","it":"Dammi un esempio","pt":"Me dê um exemplo","hint_fr":"utilise GIVE pour les exemples","hint_it":"usa GIVE per gli esempi","hint_pt":"usa GIVE para exemplos"},
  'Ella dio a luz':{"fr":"Elle a accouché","it":"Ha dato alla luce","pt":"Ela deu à luz","hint_fr":"utilise GIVE birth","hint_it":"usa GIVE birth","hint_pt":"usa GIVE birth"},
  'Me dio permiso':{"fr":"Il m'a donné la permission","it":"Mi ha dato il permesso","pt":"Me deu permissão","hint_fr":"utilise GIVE pour la permission","hint_it":"usa GIVE per il permesso","hint_pt":"usa GIVE para permissão"},
  'Intentalo':{"fr":"Essaie","it":"Provaci","pt":"Tente","hint_fr":"utilise GIVE a try","hint_it":"usa GIVE a try","hint_pt":"usa GIVE a try"},
  'Dame una mano':{"fr":"Donne-moi un coup de main","it":"Dammi una mano","pt":"Me dê uma mão","hint_fr":"utilise GIVE a hand","hint_it":"usa GIVE a hand","hint_pt":"usa GIVE a hand"},
  'Rompio la ley':{"fr":"Il a enfreint la loi","it":"Ha infranto la legge","pt":"Quebrou a lei","hint_fr":"utilise BREAK pour les lois","hint_it":"usa BREAK per le leggi","hint_pt":"usa BREAK para leis"},
  'Rompio el record':{"fr":"Il a battu le record","it":"Ha battuto il record","pt":"Quebrou o recorde","hint_fr":"utilise BREAK pour les records","hint_it":"usa BREAK per i record","hint_pt":"usa BREAK para recordes"},
  'Rompio el hielo':{"fr":"Il a brisé la glace","it":"Ha rotto il ghiaccio","pt":"Quebrou o gelo","hint_fr":"utilise BREAK the ice","hint_it":"usa BREAK the ice","hint_pt":"usa BREAK the ice"},
  'Rompio el habito':{"fr":"Il a brisé l'habitude","it":"Ha rotto l'abitudine","pt":"Quebrou o hábito","hint_fr":"utilise BREAK pour les habitudes","hint_it":"usa BREAK per le abitudini","hint_pt":"usa BREAK para hábitos"},
  'Cumple tu promesa':{"fr":"Tiens ta promesse","it":"Mantieni la tua promessa","pt":"Cumpra sua promessa","hint_fr":"utilise KEEP pour les promesses","hint_it":"usa KEEP per le promesse","hint_pt":"usa KEEP para promessas"},
  'Mantente en contacto':{"fr":"Reste en contact","it":"Resta in contatto","pt":"Fique em contato","hint_fr":"utilise KEEP pour le contact","hint_it":"usa KEEP per il contatto","hint_pt":"usa KEEP para contato"},
  'Guarda el secreto':{"fr":"Garde le secret","it":"Tieni il segreto","pt":"Guarde o segredo","hint_fr":"utilise KEEP pour les secrets","hint_it":"usa KEEP per i segreti","hint_pt":"usa KEEP para segredos"},
  'Manten la calma':{"fr":"Garde ton calme","it":"Mantieni la calma","pt":"Mantenha a calma","hint_fr":"utilise KEEP pour garder son calme","hint_it":"usa KEEP per la calma","hint_pt":"usa KEEP para calma"},
  'Lleva un diario':{"fr":"Tiens un journal","it":"Tieni un diario","pt":"Mantenha um diário","hint_fr":"utilise KEEP pour le journal","hint_it":"usa KEEP per il diario","hint_pt":"usa KEEP para diário"},
  'Dirige un negocio':{"fr":"Il gère une entreprise","it":"Gestisce un'azienda","pt":"Dirige um negócio","hint_fr":"utilise RUN pour les entreprises","hint_it":"usa RUN per le aziende","hint_pt":"usa RUN para negócios"},
  'Siempre llega tarde':{"fr":"Il est toujours en retard","it":"Arriva sempre in ritardo","pt":"Sempre chega atrasado","hint_fr":"utilise RUN late","hint_it":"usa RUN late","hint_pt":"usa RUN late"},
  'Se me acabo la gasolina':{"fr":"Je suis à court d'essence","it":"Sono rimasto senza benzina","pt":"Fiquei sem gasolina","hint_fr":"utilise RUN out of","hint_it":"usa RUN out of","hint_pt":"usa RUN out of"},
  'Conduce la reunion':{"fr":"Il dirige la réunion","it":"Conduce la riunione","pt":"Conduz a reunião","hint_fr":"utilise RUN pour les réunions","hint_it":"usa RUN per le riunioni","hint_pt":"usa RUN para reuniões"},
  'Perdio peso':{"fr":"Il a perdu du poids","it":"Ha perso peso","pt":"Perdeu peso","hint_fr":"utilise LOSE pour le poids","hint_it":"usa LOSE per il peso","hint_pt":"usa LOSE para peso"},
  'Perdio la paciencia':{"fr":"Il a perdu patience","it":"Ha perso la pazienza","pt":"Perdeu a paciência","hint_fr":"utilise LOSE pour la patience","hint_it":"usa LOSE per la pazienza","hint_pt":"usa LOSE para paciência"},
  'Perdio la esperanza':{"fr":"Il a perdu espoir","it":"Ha perso la speranza","pt":"Perdeu a esperança","hint_fr":"utilise LOSE pour l'espoir","hint_it":"usa LOSE per la speranza","hint_pt":"usa LOSE para esperança"},
  'Perdi la nocion del tiempo':{"fr":"J'ai perdu la notion du temps","it":"Ho perso la cognizione del tempo","pt":"Perdi a noção do tempo","hint_fr":"utilise LOSE track of time","hint_it":"usa LOSE per la cognizione","hint_pt":"usa LOSE para noção do tempo"},
  'Fijo una meta':{"fr":"Il a fixé un objectif","it":"Ha fissato un obiettivo","pt":"Estabeleceu uma meta","hint_fr":"utilise SET pour les objectifs","hint_it":"usa SET per gli obiettivi","hint_pt":"usa SET para metas"},
  'Dio el ejemplo':{"fr":"Il a donné l'exemple","it":"Ha dato l'esempio","pt":"Deu o exemplo","hint_fr":"utilise SET pour l'exemple","hint_it":"usa SET per l'esempio","hint_pt":"usa SET para exemplo"},
  'Establecieron un plazo':{"fr":"Ils ont fixé un délai","it":"Hanno fissato una scadenza","pt":"Estabeleceram um prazo","hint_fr":"utilise SET pour les délais","hint_it":"usa SET per le scadenze","hint_pt":"usa SET para prazos"},
  'Se resfrio':{"fr":"Il a attrapé un rhume","it":"Ha preso un raffreddore","pt":"Pegou um resfriado","hint_fr":"utilise CATCH pour les rhumes","hint_it":"usa CATCH per i raffreddori","hint_pt":"usa CATCH para resfriados"},
  'Alcanzo el autobus':{"fr":"Il a attrapé le bus","it":"Ha preso l'autobus","pt":"Pegou o ônibus","hint_fr":"utilise CATCH pour le bus","hint_it":"usa CATCH per l'autobus","hint_pt":"usa CATCH para o ônibus"},
  'Tengo prisa':{"fr":"Je suis pressé","it":"Ho fretta","pt":"Estou com pressa","hint_fr":"utilise BE in a hurry","hint_it":"usa BE per la fretta","hint_pt":"usa BE para pressa"},
  'Tengo verguenza':{"fr":"J'ai honte","it":"Ho vergogna","pt":"Tenho vergonha","hint_fr":"utilise BE ashamed","hint_it":"usa BE per la vergogna","hint_pt":"usa BE para vergonha"},
  'Tiene sueno':{"fr":"Il a sommeil","it":"Ha sonno","pt":"Está com sono","hint_fr":"utilise BE sleepy","hint_it":"usa BE per il sonno","hint_pt":"usa BE para sono"}
};

const PHRASES = [
  {
    es: '"Tomé una decisión"',
    en: ['I','made','a','decision'],
    cat: 'make + noun', tag: 'make · noun',
    hint: 'usa <b>MAKE</b> no TAKE para una decisión',
    traps: ['took','have','the','an','decided','choice'],
    explanation: '<em>Take a decision</em> es calco del español. En inglés natural se dice <b>made a decision</b>. MAKE se usa para: decisions, money, mistakes, plans, effort.',
    difficulty: 'med'
  },
  {
    es: '"Hice mi tarea"',
    en: ['I','did','my','homework'],
    cat: 'do + noun', tag: 'do · noun',
    hint: 'usa <b>DO</b> no MAKE para tareas',
    traps: ['made','have','the','your','exercise','job'],
    explanation: 'En inglés se usa <b>do</b> para actividades y tareas (do homework, do the dishes), mientras que <b>make</b> es para crear o producir algo.',
    difficulty: 'easy'
  },
  {
    es: '"Por favor presta atención"',
    en: ['Please','pay','attention'],
    cat: 'pay + noun', tag: 'pay · noun',
    hint: 'la atención se <b>paga</b> no se da',
    traps: ['give','put','focus','listen','sir','your'],
    explanation: 'En inglés la atención se <b>paga</b>: <em>pay attention</em>. También: <em>pay a visit</em>, <em>pay a compliment</em>.',
    difficulty: 'med'
  },
  {
    es: '"Tengo mucha hambre"',
    en: ['I','am','very','hungry'],
    cat: 'be + adjective', tag: 'be · adj',
    hint: 'el hambre se <b>es</b> no se <b>tiene</b>',
    traps: ['have','much','hunger','many','feel','too'],
    explanation: 'En español "tenemos" hambre, sed, sueño, calor. En inglés son <b>be + adjective</b>: <em>I am hungry / thirsty / sleepy / hot</em>.',
    difficulty: 'hard'
  },
  {
    es: '"Ella rompió una promesa"',
    en: ['She','broke','a','promise'],
    cat: 'break + noun', tag: 'break · noun',
    hint: 'las promesas se <b>rompen</b> con BREAK',
    traps: ['cut','made','her','the','word','swear'],
    explanation: '<b>Break</b> se usa con promesas, reglas, corazones, récords y silencios. La correcta: <em>break a promise</em>.',
    difficulty: 'med'
  },
  {
    es: '"Él dio un discurso"',
    en: ['He','gave','a','speech'],
    cat: 'give + noun', tag: 'give · noun',
    hint: 'el discurso se <b>da</b> con GIVE',
    traps: ['made','did','the','his','presentation','talk'],
    explanation: 'En inglés <b>give a speech</b>, <em>give a presentation</em>, <em>give a hand</em>. Lo natural es <b>give</b>.',
    difficulty: 'med'
  },
  {
    es: '"Cometí un error"',
    en: ['I','made','a','mistake'],
    cat: 'make + noun', tag: 'make · noun',
    hint: 'los errores se <b>hacen</b> con MAKE',
    traps: ['did','took','the','an','fault','error'],
    explanation: '<em>Do a mistake</em> es uno de los errores más comunes de hispanohablantes. La forma correcta es siempre <b>make a mistake</b>.',
    difficulty: 'med'
  },
  {
    es: '"Tomé una ducha"',
    en: ['I','took','a','shower'],
    cat: 'take + noun', tag: 'take · noun',
    hint: 'la ducha se <b>toma</b> con TAKE',
    traps: ['had','made','the','my','bath','wash'],
    explanation: 'TAKE se usa con: shower, break, nap, look, photo. En inglés americano: <b>take a shower</b>.',
    difficulty: 'easy'
  },
  {
    es: '"Hago ejercicio todos los días"',
    en: ['I','do','exercise','every','day'],
    cat: 'do + noun', tag: 'do · noun',
    hint: 'el ejercicio se <b>do</b> no <b>make</b>',
    traps: ['make','take','some','an','sport','daily'],
    explanation: '<b>Do exercise</b>, <em>do sports</em>, <em>do yoga</em>. Las actividades físicas van con DO. <em>Make exercise</em> es incorrecto.',
    difficulty: 'easy'
  },
  {
    es: '"Estoy de acuerdo contigo"',
    en: ['I','agree','with','you'],
    cat: 'verb collocation', tag: 'verb',
    hint: '<b>agree</b> ya es el verbo, sin AM',
    traps: ['am','to','of','for','accord','your'],
    explanation: 'En inglés es solo <b>I agree</b> — agree YA es el verbo. Decir <em>I am agree</em> es un error muy común.',
    difficulty: 'hard'
  },
  {
    es: '"Te extraño"',
    en: ['I','miss','you'],
    cat: 'verb collocation', tag: 'verb',
    hint: 'existe el verbo <b>miss</b> exacto',
    traps: ['throw','of','less','to','feel','remember'],
    explanation: 'En inglés <b>miss</b> = extrañar / echar de menos. Ejemplos: <em>I miss my family</em>, <em>I miss home</em>.',
    difficulty: 'hard'
  },
  {
    es: '"Tienes razón"',
    en: ['You','are','right'],
    cat: 'be + adjective', tag: 'be · adj',
    hint: 'la razón se <b>es</b> no se <b>tiene</b>',
    traps: ['have','your','reason','correct','truth','got'],
    explanation: 'En español "tenemos" razón. En inglés <b>be right</b> / <b>be wrong</b>. <em>Have reason</em> es calco.',
    difficulty: 'hard'
  },
  {
    es: '"Voy a tomar un descanso"',
    en: ['I','will','take','a','break'],
    cat: 'take + noun', tag: 'take · noun',
    hint: 'el descanso se <b>toma</b> con TAKE',
    traps: ['have','make','rest','some','am','going'],
    explanation: '<b>Take a break</b> es la colocación natural. También: <em>take a nap</em>, <em>take a look</em>, <em>take a chance</em>.',
    difficulty: 'easy'
  },
  {
    es: '"Ellos hicieron un trato"',
    en: ['They','made','a','deal'],
    cat: 'make + noun', tag: 'make · noun',
    hint: 'los tratos se <b>hacen</b> con MAKE',
    traps: ['did','took','the','their','agreement','contract'],
    explanation: '<b>Make a deal</b>, <em>make an agreement</em>. MAKE se usa para acuerdos y compromisos.',
    difficulty: 'med'
  },
  {
    es: '"Tengo veinte años"',
    en: ['I','am','twenty','years','old'],
    cat: 'be + age', tag: 'be · age',
    hint: 'la edad se <b>es</b> no se <b>tiene</b>',
    traps: ['have',"twenty's",'old','year','of','age'],
    explanation: 'En español "tenemos" años. En inglés <b>be + número + years old</b>. <em>I have 20 years</em> es incorrecto.',
    difficulty: 'hard'
  }
];

// ── Carga frases desde Supabase (con fallback al array estático) ─────────────
async function loadCollocations() {
  try {
    var sb = window._aura && window._aura.sb;
    if (!sb) throw new Error('no sb');

    // Leer idioma desde localStorage primero (evita race condition con _aura async)
    var _lang = null;
    try { _lang = localStorage.getItem('aura_lang'); } catch(e) {}
    _lang = _lang || (window._aura && (window._aura.lang || window._aura.active_language)) || 'en';
    var res = await sb.from('collocation_phrases')
      .select('es,en,cat,tag,hint,traps,explanation,difficulty,t')
      .eq('activa', true)
      .eq('language', _lang)
      .order('id');
    // Sin datos para este idioma
    if (res.error || !res.data || res.data.length === 0) {
      if (_lang !== 'en') {
        PHRASES.length = 0; // idioma sin configurar: mostrar vacío
        return;
      }
      throw new Error('no data'); // inglés sin datos: usar fallback estático
    }

    var poolRes = await sb.from('word_pools')
      .select('words')
      .eq('context', 'collocations/general')
      .maybeSingle();
    var generalPool = (poolRes.data && poolRes.data.words) ? poolRes.data.words : [];

    // Replace static array with Supabase data
    PHRASES.length = 0;
    res.data.forEach(function(row) {
      var phraseTraps = Array.isArray(row.traps) ? row.traps : [];
      var poolSample  = generalPool.length > 0
        ? shuffle(generalPool).slice(0, 12).map(function(w){ return w.toLowerCase(); })
        : [];
      var combined = phraseTraps.concat(
        poolSample.filter(function(w){ return !phraseTraps.includes(w); })
      );
      var _uiLang = null;
      try { _uiLang = localStorage.getItem('aura_ui_lang'); } catch(e) {}
      _uiLang = _uiLang || 'es';
      var _raw_es = (row.es || '').trim().replace(/^"|"$/g,'').trim();
      var _t_row = (row.t && typeof row.t === 'object' && row.t.fr) ? row.t
                  : (_COLL_TRANSLATIONS[row.es] || _COLL_TRANSLATIONS[_raw_es] || {});
      PHRASES.push({
        es:          row.es,
        native:      _t_row[_uiLang] || row.es,
        en:          Array.isArray(row.en) ? row.en : row.en.split(' '),
        cat:         row.cat        || '',
        tag:         row.tag        || '',
        hint:        _t_row['hint_' + _uiLang] || row.hint || '',
        traps:       combined,
        explanation: row.explanation || '',
        difficulty:  row.difficulty  || 'med',
        t:           _t_row
      });
    });
    console.log('[Collocations] Supabase: ' + PHRASES.length + ' frases cargadas');
  } catch(e) {
    console.warn('[Collocations] Supabase no disponible, usando fallback:', e.message);
  }
}

// ── Progress tracking ─────────────────────────────────────────────────────────
var _colSeenEs = [];  // frases vistas este ciclo (array de strings "es")

async function loadColProgress(difficulty) {
  _colSeenEs = [];
  try {
    var sb     = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;

    var { data } = await sb.from('col_progress')
      .select('seen_es, best_accuracy')
      .eq('user_id', userId)
      .eq('difficulty', difficulty)
      .maybeSingle();

    if (data) {
      _colSeenEs = data.seen_es || [];
      var recEl  = document.getElementById('col-diff-record');
      if (recEl && data.best_accuracy) recEl.textContent = data.best_accuracy + '%';
    }
  } catch(e) {
    console.warn('[ColProgress] load error:', e.message);
  }
}

async function markPhraseSeen(esText, difficulty) {
  try {
    if (!_colSeenEs.includes(esText)) _colSeenEs.push(esText);
    var sb     = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;
    await sb.from('col_progress').upsert(
      { user_id: userId, difficulty: difficulty, seen_es: _colSeenEs, last_played: new Date().toISOString() },
      { onConflict: 'user_id,difficulty' }
    );
  } catch(e) {
    console.warn('[ColProgress] mark error:', e.message);
  }
}

async function saveColAccuracy(difficulty, accuracy) {
  try {
    var sb     = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;
    var { data } = await sb.from('col_progress')
      .select('best_accuracy')
      .eq('user_id', userId)
      .eq('difficulty', difficulty)
      .maybeSingle();
    var best = data ? (data.best_accuracy || 0) : 0;
    if (accuracy > best) {
      await sb.from('col_progress').upsert(
        { user_id: userId, difficulty: difficulty, best_accuracy: accuracy },
        { onConflict: 'user_id,difficulty' }
      );
    }
  } catch(e) {
    console.warn('[ColProgress] accuracy error:', e.message);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getPhrasesForDifficulty(difficulty) {
  return PHRASES.filter(function(p) { return p.difficulty === difficulty; });
}

function currentPhraseIdx() {
  if (GAME.order.length === 0) return 0;
  return GAME.order[GAME.orderPos];
}

// currentPhrase() — usa GAME.activePhrases (filtrado por difficulty)
function currentPhrase() {
  return (GAME.activePhrases || PHRASES)[currentPhraseIdx()];
}

function generateOrder() {
  var difficulty = GAME.difficulty || 'med';
  var allForDiff = getPhrasesForDifficulty(difficulty);

  if (allForDiff.length === 0) {
    GAME.activePhrases = PHRASES.slice(); // fallback: todas
  } else {
    var unseen = allForDiff.filter(function(p) {
      return !_colSeenEs.includes(p.es);
    });
    if (unseen.length === 0) {
      // Ciclo completo — reset y empezar de nuevo
      _colSeenEs = [];
      unseen = allForDiff;
    }
    GAME.activePhrases = unseen;
  }

  var indices = [];
  for (var i = 0; i < GAME.activePhrases.length; i++) indices.push(i);
  GAME.order    = shuffle(indices);
  GAME.orderPos = 0;
}

// ── DOM helpers ───────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
function setText(id, val) { var e = $(id); if (e) e.textContent = val; }

function showXpToast() {
  var bar = document.querySelector('.tb-xp-inline');
  if (!bar) return;
  var mult  = GAME.xpMultiplier || 1;
  var toast = document.createElement('div');
  toast.textContent = '+' + (10 * mult) + ' XP';
  toast.style.cssText = 'position:absolute;top:-26px;left:50%;transform:translateX(-50%);background:var(--accent);color:var(--accent-ink);font-family:var(--mono);font-size:11px;font-weight:800;padding:4px 10px;border-radius:8px;box-shadow:0 4px 14px rgba(196,255,61,.5);pointer-events:none;z-index:10;animation:xpToast 1.6s ease-out forwards';
  bar.style.position = 'relative';
  bar.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 1700);
}

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
