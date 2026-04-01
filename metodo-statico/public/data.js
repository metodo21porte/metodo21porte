/* ── 21 Porte ─────────────────────────────────────────── */
const DOORS = [
  { id:1,  name:'Identità',       tarot:'Il Mago',           light:'volontà, iniziativa, creatività',    shadow:'arroganza, dispersione',          key:'Agisci dal tuo centro.' },
  { id:2,  name:'Intuizione',     tarot:'La Papessa',        light:'sensibilità, saggezza interiore',    shadow:'isolamento, passività',           key:'Fidati di ciò che senti.' },
  { id:3,  name:'Abbondanza',     tarot:"L'Imperatrice",     light:'fertilità, cura, prosperità',        shadow:'dipendenza, eccesso',             key:'Accogli senza trattenerti.' },
  { id:4,  name:'Struttura',      tarot:"L'Imperatore",      light:'ordine, autorità, protezione',       shadow:'rigidità, controllo',             key:'Costruisci con intenzione.' },
  { id:5,  name:'Tradizione',     tarot:'Il Papa',           light:'guida, valori, appartenenza',        shadow:'dogmatismo, conformità',          key:'Onora le radici, scegli il percorso.' },
  { id:6,  name:'Amore',          tarot:"L'Innamorato",      light:'unione, scelta consapevole, armonia',shadow:'dipendenza, indecisione',         key:'Scegli con tutto te stesso.' },
  { id:7,  name:'Movimento',      tarot:'Il Carro',          light:'direzione, vittoria, determinazione',shadow:'impulsività, fuga',               key:'Muoviti con scopo.' },
  { id:8,  name:'Forza',          tarot:'La Forza',          light:'coraggio interiore, dominio dolce',  shadow:'repressione, paura',              key:'La vera forza è gentile.' },
  { id:9,  name:'Solitudine',     tarot:"L'Eremita",         light:'riflessione, saggezza, guida',       shadow:'isolamento, ritiro cronico',      key:'Torna a te per ritrovare gli altri.' },
  { id:10, name:'Destino',        tarot:'La Ruota',          light:'cicli, opportunità, evoluzione',     shadow:'fatalismo, passività',            key:'Sei parte del ciclo, non vittima.' },
  { id:11, name:'Giustizia',      tarot:'La Giustizia',      light:'equilibrio, verità, karma',          shadow:'rigidità, giudizio',              key:'Agisci con integrità.' },
  { id:12, name:'Resa',           tarot:'L\'Appeso',         light:'pausa, lasciar andare, prospettiva', shadow:'immobilità, martirio',            key:'La resa è saggezza, non debolezza.' },
  { id:13, name:'Trasformazione', tarot:'La Morte',          light:'rinnovamento, cambiamento, rinascita',shadow:'resistenza, paura del cambiamento',key:'Lascia morire ciò che non serve.' },
  { id:14, name:'Alchimia',       tarot:'La Temperanza',     light:'integrazione, flusso, moderazione',  shadow:'dispersione, eccessi opposti',    key:'Mescola con cura.' },
  { id:15, name:'Ombra',          tarot:'Il Diavolo',        light:'liberazione, consapevolezza, potere',shadow:'dipendenza, materialismo',        key:'Guarda la tua ombra senza paura.' },
  { id:16, name:'Rottura',        tarot:'La Torre',          light:'rivelazione, liberazione, reset',    shadow:'caos, distruzione evitabile',     key:'Alcune cose devono cadere per lasciarti salire.' },
  { id:17, name:'Spiritualità',   tarot:'La Stella',         light:'fede, ispirazione, connessione sottile',shadow:'evasione, idealizzazione, fuga',key:'Radicati senza spegnere la luce.' },
  { id:18, name:'Illusione',      tarot:'La Luna',           light:'profondità, sogno, psiche',          shadow:'confusione, paura, inganno',      key:'Osserva senza perderti.' },
  { id:19, name:'Gioia',          tarot:'Il Sole',           light:'vitalità, chiarezza, successo',      shadow:'superficialità, dipendenza dal riconoscimento', key:'Brilla senza chiedere permesso.' },
  { id:20, name:'Risveglio',      tarot:'Il Giudizio',       light:'rinascita, vocazione, chiamata',     shadow:'auto-critica, rimpianto',         key:'Rispondi alla chiamata.' },
  { id:21, name:'Completezza',    tarot:'Il Mondo',          light:'integrazione, successo, totalità',   shadow:'stagnazione, perfezionismo',      key:'Sei già intero.' },
];

/* ── Destiny Archetypes (1-9) ─────────────────────────── */
const DESTINY = {
  1: { title: 'Il Pioniere',      text: 'Sei qui per iniziare, guidare, innovare. La tua forza è nell\'originalità.' },
  2: { title: 'Il Mediatore',     text: 'Sei qui per creare armonia, collaborare e portare pace nelle relazioni.' },
  3: { title: 'Il Creativo',      text: 'Sei qui per esprimere, ispirare e portare gioia attraverso la creatività.' },
  4: { title: 'Il Costruttore',   text: 'Sei qui per costruire fondamenta solide, portare ordine e stabilità.' },
  5: { title: 'Il Libero',        text: 'Sei qui per esplorare, cambiare, liberarti e liberare gli altri.' },
  6: { title: 'Il Custode',       text: 'Sei qui per prenderti cura, creare bellezza e armonia nel mondo.' },
  7: { title: 'Il Cercatore',     text: 'Sei qui per indagare, comprendere a fondo e portare saggezza.' },
  8: { title: 'Il Manifestatore', text: 'Sei qui per manifestare, guidare e creare abbondanza in modo etico.' },
  9: { title: 'Il Saggio',        text: 'Sei qui per servire, completare cicli e portare una visione universale.' },
};

/* ── Soul Archetypes (1-9) ────────────────────────────── */
const SOUL = {
  1: 'Il tuo cuore desidera indipendenza e affermazione di sé.',
  2: 'Il tuo cuore desidera connessione, amore e armonia.',
  3: 'Il tuo cuore desidera espressione autentica e gioia.',
  4: 'Il tuo cuore desidera sicurezza, ordine e appartenenza.',
  5: 'Il tuo cuore desidera libertà, avventura e cambiamento.',
  6: 'Il tuo cuore desidera amore, cura e armonia profonda.',
  7: 'Il tuo cuore desidera comprensione, silenzio e verità.',
  8: 'Il tuo cuore desidera potere, riconoscimento e realizzazione.',
  9: 'Il tuo cuore desidera unità, compassione e significato.',
};

/* ── Personal Year Texts (1-9) ───────────────────────── */
const YEAR_TEXTS = {
  1: ['Nuovo Inizio',    'Si apre un ciclo. Pianta semi con intenzione.',            'Definisci la tua direzione.'],
  2: ['Cooperazione',    'Anno di relazioni, ascolto e crescita condivisa.',          'Scegli con cura chi ti affianca.'],
  3: ['Espressione',     'Anno creativo. La tua voce vuole emergere.',                'Crea qualcosa che ti appartiene.'],
  4: ['Fondamenta',      'Anno di lavoro solido. Costruisci ciò che dura.',           'Stabilisci routine che ti nutrono.'],
  5: ['Cambiamento',     'Anno di svolta. Lascia andare, accetta il nuovo.',          'Rimani flessibile, non rigido.'],
  6: ['Armonia',         'Anno di cura, famiglia, responsabilità affettive.',         'Bilancia dare e ricevere.'],
  7: ['Riflessione',     'Anno interiore. Studia, medita, approfondisci.',            'Ascolta il silenzio tra le parole.'],
  8: ['Potere',          'Anno di risultati, finanze, autorità personale.',           'Agisci con integrità nel potere.'],
  9: ['Completamento',   'Anno di chiusura. Lascia andare, concludi cicli.',          'Liberati di ciò che non è più tuo.'],
};

/* ── Zodiac Signs ─────────────────────────────────────── */
const SIGNS = [
  { name:'Capricorno', start:'12-22', end:'01-19', element:'Terra',  text:'Determinato, ambizioso, paziente. Costruisce con cura nel tempo.' },
  { name:'Acquario',   start:'01-20', end:'02-18', element:'Aria',   text:'Originale, visionario, indipendente. Porta idee nuove nel mondo.' },
  { name:'Pesci',      start:'02-19', end:'03-20', element:'Acqua',  text:'Sensibile, intuitivo, spirituale. Sente ciò che gli altri non vedono.' },
  { name:'Ariete',     start:'03-21', end:'04-19', element:'Fuoco',  text:'Coraggioso, diretto, pioniere. Apre strade che altri percorreranno.' },
  { name:'Toro',       start:'04-20', end:'05-20', element:'Terra',  text:'Fedele, sensuale, tenace. Ama la bellezza e la stabilità.' },
  { name:'Gemelli',    start:'05-21', end:'06-20', element:'Aria',   text:'Curioso, versatile, comunicativo. Porta connessioni inaspettate.' },
  { name:'Cancro',     start:'06-21', end:'07-22', element:'Acqua',  text:'Empatico, protettivo, profondo. La casa è dovunque ami.' },
  { name:'Leone',      start:'07-23', end:'08-22', element:'Fuoco',  text:'Generoso, creativo, regale. Brilla quando è autentico.' },
  { name:'Vergine',    start:'08-23', end:'09-22', element:'Terra',  text:'Preciso, premuroso, analitico. Serve con intelligenza e cura.' },
  { name:'Bilancia',   start:'09-23', end:'10-22', element:'Aria',   text:'Armonioso, giusto, elegante. Cerca equilibrio in ogni cosa.' },
  { name:'Scorpione',  start:'10-23', end:'11-21', element:'Acqua',  text:'Intenso, trasformativo, magnetico. Va in profondità dove altri non osano.' },
  { name:'Sagittario', start:'11-22', end:'12-21', element:'Fuoco',  text:'Libero, filosofico, entusiasta. Cerca il significato oltre l\'orizzonte.' },
];

/* ── Tao Ki 9 Stelle ──────────────────────────────────── */
const TAO_KI = {
  1: { title:'Acqua',   element:'Acqua',  direction:'Nord',     text:'Flessibilità e profondità. La tua forza è nell\'adattamento.' },
  2: { title:'Terra',   element:'Terra',  direction:'Sud-Ovest',text:'Nutrimento e supporto. Porti stabilità a chi ti circonda.' },
  3: { title:'Tuono',   element:'Legno',  direction:'Est',      text:'Slancio e vitalità. Sei energia che si manifesta.' },
  4: { title:'Vento',   element:'Legno',  direction:'Sud-Est',  text:'Penetrazione gentile. Il tuo pensiero arriva dove altri non vedono.' },
  5: { title:'Centro',  element:'Terra',  direction:'Centro',   text:'Posizione centrale. Hai accesso a tutti i piani dell\'esistenza.' },
  6: { title:'Cielo',   element:'Metallo',direction:'Nord-Ovest',text:'Leadership e visione. Sei chiamato a guidare dall\'alto.' },
  7: { title:'Lago',    element:'Metallo',direction:'Ovest',    text:'Gioia e comunicazione. Sai come muovere le acque degli altri.' },
  8: { title:'Monte',   element:'Terra',  direction:'Nord-Est', text:'Quiete e trasformazione. Sai fermarti nel momento giusto.' },
  9: { title:'Fuoco',   element:'Fuoco',  direction:'Sud',      text:'Visibilità e intuizione. La tua luce illumina chi ti circonda.' },
};

/* ── Place Elements ──────────────────────────────────── */
const PLACE_EL = { a:'Fuoco', e:'Acqua', i:'Aria', o:'Terra', u:'Etere' };

/* ── Month Names ──────────────────────────────────────── */
const MONTHS = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];

/* ── PayPal & WhatsApp ───────────────────────────────── */
const PAYPAL_PERSONAL  = 'https://www.paypal.com/paypalme/lorenzadepalma/30';
const PAYPAL_SINASTRIA = 'https://www.paypal.com/paypalme/lorenzadepalma/60';
const WHATSAPP_NUM     = '393392366968';
