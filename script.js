// Variables globales
let currentLevel = 'beginner';
let currentTestTime = 60;
let timer = currentTestTime;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let isTestReady = false;
let correctWords = 0;
let totalWords = 0;
let correctKeystrokes = 0;
let totalKeystrokes = 0;
let previousInputLength = 0;
let currentTexts = [];
let currentTextIndex = 0;
let currentTextPosition = 0;
let firstTextLength = 0;  // Nouvelle variable pour suivre la longueur du premier texte
let errorStats = {
    letters: {},
    words: {}
};

// Tableaux de phrases pour chaque niveau
const beginnerTexts = [
    "Le soleil brille dans le ciel bleu",
    "Les oiseaux chantent dans les arbres",
    "Le chat dort sur le canapé",
    "Les enfants jouent dans le parc",
    "La pluie tombe doucement",
    "Le vent souffle dans les feuilles",
    "Les fleurs poussent dans le jardin",
    "Le chien court après la balle",
    "La lune éclaire la nuit",
    "Les poissons nagent dans l'étang",
    "Le boulanger fait du pain frais",
    "Les étoiles brillent dans le ciel",
    "Le train arrive à la gare",
    "Les abeilles butinent les fleurs",
    "Le peintre dessine un paysage",
    "Les vagues roulent sur la plage",
    "Le facteur distribue le courrier",
    "Les papillons volent dans l'air",
    "Le cuisinier prépare le repas",
    "Les feuilles tombent en automne",
    "Le musicien joue du piano",
    "Les enfants lisent des livres",
    "Le jardinier arrose les plantes",
    "Les nuages flottent dans le ciel",
    "Le pâtissier fait des gâteaux",
    "Les oiseaux font leur nid",
    "Le chat chasse la souris",
    "Les élèves écrivent au tableau",
    "Le soleil se couche à l'horizon",
    "Les poules picorent dans la cour",
    "Le fermier trait les vaches",
    "Les écureuils grimpent aux arbres",
    "Le vélo roule sur la route",
    "Les moutons paissent dans le pré",
    "Le pêcheur lance sa ligne",
    "Les canards nagent sur le lac",
    "Le bébé fait ses premiers pas",
    "Les chevaux galopent dans le pré",
    "Le coq chante au lever du jour",
    "Les lapins sautent dans l'herbe",
    "Le marin navigue sur la mer",
    "Les abeilles font du miel",
    "Le facteur livre les colis",
    "Les grenouilles coassent dans la mare",
    "Le peintre expose ses tableaux",
    "Les enfants font leurs devoirs",
    "Le chat fait sa toilette",
    "Les oiseaux migrent vers le sud",
    "Le chien aboie dans le jardin",
    "Les vaches broutent dans le pré",
    "Le boulanger ouvre sa boutique",
    "Les poissons sautent hors de l'eau",
    "Le jardinier plante des fleurs",
    "Les écureuils cherchent des noisettes",
    "Le soleil réchauffe la terre",
    "Les enfants font de la balançoire",
    "Le chat observe les oiseaux",
    "Les abeilles rentrent à la ruche",
    "Le pâtissier décore les gâteaux",
    "Les papillons se posent sur les fleurs",
    "Le facteur trie le courrier",
    "Les poules pondent des œufs",
    "Le chien garde la maison",
    "Les enfants font des châteaux de sable",
    "Le fermier conduit son tracteur",
    "Les oiseaux picorent les graines",
    "Le chat dort au soleil",
    "Les lapins grignotent des carottes",
    "Le peintre mélange les couleurs",
    "Les chevaux rentrent à l'écurie",
    "Le boulanger pétrit la pâte",
    "Les poissons suivent le courant",
    "Le jardinier taille les arbres",
    "Les écureuils font leurs provisions",
    "Le soleil disparaît derrière les nuages",
    "Les enfants rentrent de l'école",
    "Le chat joue avec une pelote",
    "Les abeilles protègent leur reine"
];

const intermediateTexts = [
    "Les athlètes s'entraînent intensivement pour les Jeux Olympiques.",
    "L'exposition d'art contemporain attire de nombreux visiteurs.",
    "Les traditions culinaires varient selon les régions du monde.",
    "La méditation quotidienne améliore le bien-être mental.",
    "Le festival de musique rassemble des artistes internationaux.",
    "Les archéologues découvrent des vestiges d'une civilisation ancienne.",
    "La pièce de théâtre reçoit des critiques enthousiastes.",
    "Les voyageurs explorent des destinations exotiques.",
    "Le photographe capture des moments uniques de la vie quotidienne.",
    "Les jardiniers cultivent des légumes biologiques.",
    "L'architecte conçoit des bâtiments écologiques.",
    "La collection de mode reflète les tendances actuelles.",
    "Les danseurs répètent leur chorégraphie avec passion.",
    "Le roman historique transporte les lecteurs dans le passé.",
    "Les astronomes observent une nouvelle constellation.",
    "La recette traditionnelle se transmet de génération en génération.",
    "Les surfeurs affrontent les vagues de l'océan.",
    "Le documentaire révèle des vérités surprenantes.",
    "Les artisans perpétuent des techniques ancestrales.",
    "La symphonie résonne dans la salle de concert.",
    "Les alpinistes atteignent enfin le sommet enneigé.",
    "Le peintre termine son chef-d'œuvre impressionniste.",
    "Les chercheurs étudient le comportement des dauphins.",
    "La troupe de cirque présente son nouveau spectacle.",
    "Les vignerons récoltent les raisins au lever du soleil.",
    "Le sculpteur travaille la pierre avec précision.",
    "Les pompiers interviennent rapidement sur l'incendie.",
    "La collection de timbres raconte l'histoire du pays.",
    "Les botanistes découvrent une espèce rare de fleur.",
    "Le chef cuisinier invente de nouvelles saveurs.",
    "Les acrobates exécutent des figures spectaculaires.",
    "Le roman d'aventure captive ses lecteurs.",
    "Les joueurs d'échecs s'affrontent en silence.",
    "La galerie d'art expose des œuvres contemporaines.",
    "Les plongeurs explorent les récifs coralliens.",
    "Le potier façonne l'argile avec habileté.",
    "Les cavaliers parcourent la campagne au galop.",
    "La chorale répète pour le concert de Noël.",
    "Les astronautes préparent leur prochaine mission.",
    "Le parfumeur crée une nouvelle fragrance.",
    "Les apiculteurs récoltent le miel des ruches.",
    "Le conteur fascine son jeune public.",
    "Les athlètes participent au marathon annuel.",
    "La collection de bijoux brille sous les projecteurs.",
    "Les guides accompagnent les touristes en montagne.",
    "Le pâtissier décore ses gâteaux avec art.",
    "Les musiciens accordent leurs instruments.",
    "La compétition de danse commence ce soir.",
    "Les jardiniers taillent les arbres du parc.",
    "Le photographe développe ses clichés en chambre noire.",
    "Les archéologues nettoient leurs découvertes avec soin.",
    "Le menuisier sculpte le bois précieux.",
    "Les danseurs de flamenco enflamment la scène.",
    "La collection de voitures anciennes impressionne les visiteurs.",
    "Les cordonniers réparent les chaussures avec précision.",
    "Le magicien prépare ses nouveaux tours.",
    "Les comédiens répètent leurs répliques.",
    "La fanfare défile dans les rues du village.",
    "Les céramistes exposent leurs créations.",
    "Le jongleur enchaîne les figures complexes.",
    "Les couturiers préparent le défilé de mode.",
    "La troupe de théâtre monte son nouveau spectacle.",
    "Les peintres installent leurs chevalets dans le parc.",
    "Le souffleur de verre crée des pièces uniques.",
    "Les écrivains participent au salon du livre.",
    "La projection du film débute dans la salle obscure.",
    "Les musiciens de jazz improvisent sur scène.",
    "Le chef d'orchestre dirige avec passion.",
    "Les artistes de rue animent la place centrale.",
    "La galerie présente une exposition photo.",
    "Les sculpteurs taillent le marbre blanc.",
    "Le relieur restaure des livres anciens.",
    "Les danseurs de ballet s'échauffent en coulisse.",
    "La collection de papillons fascine les enfants.",
    "Les acteurs saluent le public enthousiaste.",
    "Le ventriloque amuse la foule avec ses marionnettes.",
    "Les tisserands créent des motifs complexes.",
    "La fanfare répète pour la fête du village.",
    "Les acrobates s'entraînent sous le chapiteau.",
    "Le portraitiste capture l'essence de ses modèles.",
    "Les artisans du cuir créent des pièces uniques.",
    "La chorale entonne un chant traditionnel.",
    "Les jongleurs synchronisent leurs mouvements.",
    "Le mime raconte une histoire sans paroles.",
    "Les dresseurs préparent leur numéro équestre.",
    "La collection de fossiles intrigue les visiteurs.",
    "Les aquarellistes peignent le paysage marin.",
    "Le marionnettiste anime ses personnages.",
    "Les musiciens de rue enchantent les passants.",
    "La projection en plein air commence au crépuscule.",
    "Les artistes du cirque saluent la foule.",
    "Le maître verrier assemble son vitrail.",
    "Les danseurs contemporains improvisent.",
    "La troupe ambulante installe son chapiteau.",
    "Les sculpteurs sur glace travaillent rapidement.",
    "Le conteur captive son auditoire attentif.",
    "Les artisans du métal forgent des objets décoratifs.",
    "La collection de masques raconte des histoires anciennes."
];

const advancedTexts = [
    "L'exposition rétrospective retrace cinquante années de création artistique contemporaine.",
    "Les archéologues découvrent des hiéroglyphes révélant une histoire fascinante de l'Égypte ancienne.",
    "La symphonie magistrale résonne dans l'acoustique parfaite de la salle de concert historique.",
    "Les anthropologues étudient les traditions ancestrales des peuples autochtones d'Amazonie.",
    "Le chef étoilé compose des associations audacieuses entre saveurs locales et épices exotiques.",
    "Les botanistes cataloguent de nouvelles espèces florales dans la forêt tropicale préservée.",
    "La compagnie de danse contemporaine interprète une chorégraphie avant-gardiste saisissante.",
    "Les restaurateurs d'art redonnent vie aux fresques séculaires de la chapelle médiévale.",
    "Le romancier tisse une intrigue complexe mêlant histoire personnelle et bouleversements sociaux.",
    "Les alpinistes chevronnés affrontent les conditions extrêmes de l'Himalaya majestueux.",
    "L'orchestre philharmonique interprète magistralement la neuvième symphonie de Beethoven.",
    "Les géologues analysent la composition des roches volcaniques millénaires avec précision.",
    "La troupe théâtrale revisite les classiques de Shakespeare dans une mise en scène moderne.",
    "Les océanographes explorent les profondeurs abyssales à bord du submersible scientifique.",
    "Le maître parfumeur compose une fragrance subtile évoquant les jardins méditerranéens.",
    "Les paléontologues reconstituent minutieusement le squelette d'un dinosaure gigantesque.",
    "La collection haute couture sublime l'élégance féminine dans des créations audacieuses.",
    "Les ethnologues documentent les rituels traditionnels des tribus isolées du Pacifique.",
    "Le cinéaste indépendant présente son documentaire poignant sur les réfugiés climatiques.",
    "Les astronomes observent un phénomène céleste rare depuis l'observatoire montagnard.",
    "La soprano interprète l'aria complexe avec une maîtrise technique impressionnante.",
    "Les spéléologues explorent un réseau de grottes calcaires jusqu'alors inconnu.",
    "Le philosophe contemporain développe une réflexion profonde sur l'éthique moderne.",
    "Les artisans verriers perpétuent des techniques ancestrales dans leur atelier traditionnel.",
    "La compétition internationale de patinage artistique présente des performances époustouflantes.",
    "Les conservateurs du musée organisent une exposition sur l'art byzantin méconnu.",
    "Le quatuor à cordes interprète avec passion les compositions de Mozart.",
    "Les mycologues identifient de nouvelles espèces de champignons dans la forêt primaire.",
    "La collection de manuscrits anciens révèle des secrets de l'histoire médiévale.",
    "Les maîtres chocolatiers créent des sculptures gourmandes pour le festival gastronomique.",
    "L'expédition scientifique étudie l'écosystème unique des îles Galápagos préservées.",
    "Les calligraphes perpétuent l'art délicat de l'écriture manuscrite traditionnelle.",
    "Le ballet classique présente une adaptation moderne du Lac des Cygnes.",
    "Les horlogers suisses assemblent des mécanismes complexes avec une précision millimétrique.",
    "La biennale d'art contemporain expose des installations monumentales provocantes.",
    "Les ornithologues observent la migration spectaculaire des oiseaux arctiques.",
    "Le chef d'orchestre dirige avec maestria la première mondiale contemporaine.",
    "Les maîtres artisans restaurent les vitraux centenaires de la cathédrale gothique.",
    "La collection de photographies anciennes documente la révolution industrielle.",
    "Les archéologues sous-marins découvrent l'épave d'un galion espagnol.",
    "Le festival international de jazz accueille des musiciens légendaires.",
    "Les experts en art authentifient un tableau attribué à Rembrandt.",
    "La troupe de cirque contemporain repousse les limites de l'acrobatie.",
    "Les chercheurs en linguistique étudient l'évolution des langues anciennes.",
    "Le sculpteur monumental travaille le métal pour une installation urbaine.",
    "Les maîtres parfumeurs composent des fragrances exclusives pour des clients prestigieux.",
    "La rétrospective cinématographique célèbre l'œuvre du réalisateur visionnaire.",
    "Les restaurateurs gastronomiques réinventent la cuisine traditionnelle régionale.",
    "Le quatuor de jazz improvise sur des standards avec virtuosité.",
    "Les experts en art contemporain débattent des nouvelles tendances artistiques.",
    "Le concours international de piano attire les virtuoses du monde entier.",
    "Les maîtres verriers soufflent des pièces uniques aux couleurs chatoyantes.",
    "La collection de manuscrits enluminés témoigne de l'art médiéval.",
    "Les archéologues reconstituent la vie quotidienne dans la Rome antique.",
    "Le festival de théâtre classique investit des lieux historiques.",
    "Les experts en art moderne analysent l'influence des avant-gardes.",
    "La collection de porcelaines anciennes révèle des techniques oubliées.",
    "Les maîtres ébénistes restaurent des meubles d'époque précieux.",
    "Le concours de chant lyrique révèle de nouveaux talents prometteurs.",
    "Les conservateurs organisent une exposition sur l'art de la Renaissance.",
    "La troupe de ballet contemporain repousse les limites chorégraphiques.",
    "Les experts en art africain étudient des masques rituels anciens.",
    "Le festival de musique contemporaine explore de nouvelles sonorités.",
    "Les maîtres joailliers créent des pièces uniques serties de pierres précieuses.",
    "La collection de gravures anciennes illustre l'histoire de l'imprimerie.",
    "Les restaurateurs de tableaux retrouvent les couleurs d'origine.",
    "Le quatuor de musique contemporaine interprète des compositions audacieuses.",
    "Les experts en art islamique analysent des manuscrits enluminés.",
    "La collection de sculptures antiques raconte la mythologie grecque.",
    "Les maîtres parfumeurs distillent des essences rares et précieuses.",
    "Le festival de danse contemporaine présente des créations innovantes.",
    "Les conservateurs restaurent une mosaïque romaine exceptionnelle.",
    "La troupe de théâtre musical monte une production ambitieuse.",
    "Les experts en art océanien étudient des objets rituels sacrés.",
    "Le concours international de violon récompense l'excellence musicale.",
    "Les maîtres artisans perpétuent des techniques de dorure ancestrales.",
    "La collection d'instruments de musique anciens témoigne de l'histoire musicale.",
    "Les restaurateurs de monuments historiques préservent le patrimoine architectural.",
    "Le festival de cinéma d'auteur présente des œuvres expérimentales.",
    "Les experts en art contemporain débattent des nouvelles tendances artistiques.",
    "La collection de textiles anciens révèle des motifs complexes oubliés.",
    "Les maîtres ferronniers forgent des pièces décoratives sophistiquées.",
    "Le concours de composition musicale encourage l'innovation créative.",
    "Les conservateurs organisent une exposition sur l'art minimaliste.",
    "Les experts en art contemporain débattent des nouvelles tendances artistiques."
];

// Textes pour chaque niveau
const texts = {
    beginner: beginnerTexts,
    intermediate: intermediateTexts,
    advanced: advancedTexts
};

// Fonction pour charger les textes
async function loadTexts(level) {
    try {
        const textsForLevel = texts[level];
        return textsForLevel;
    } catch (error) {
        console.error(`Error loading texts for level ${level}:`, error);
        return [
            "Le chat dort sur le canapé",
            "Il fait beau aujourd'hui",
            "La vie est belle"
        ];
    }
}

// Sélection aléatoire de textes
async function getTextsForLevel(level) {
    try {
        const textsForLevel = texts[level];
        // Pour les niveaux intermédiaire et avancé, on prend plus de textes pour éviter les chevauchements
        const numberOfTexts = level === 'beginner' ? 3 : 6;
        // Mélanger tous les textes disponibles
        const shuffledTexts = [...textsForLevel].sort(() => Math.random() - 0.5);
        // Prendre le nombre nécessaire de textes
        return shuffledTexts.slice(0, numberOfTexts);
    } catch (error) {
        console.error(`Error in getTextsForLevel for ${level}:`, error);
        return [
            "Le chat dort sur le canapé",
            "Il fait beau aujourd'hui",
            "La vie est belle"
        ];
    }
}

// Fonction pour afficher le texte
function displayText(text, nextText = null) {
    const textDisplay = document.getElementById('text-display');
    let html = text.split('').map(char => 
        `<span class="char">${char}</span>`
    ).join('');

    if (nextText && (currentLevel === 'intermediate' || currentLevel === 'advanced')) {
        firstTextLength = text.length + 1;  // +1 pour l'espace
        html += '<span class="char"> </span>' + nextText.split('').map(char => 
            `<span class="char">${char}</span>`
        ).join('');
    } else {
        firstTextLength = text.length;
    }

    textDisplay.innerHTML = html;
}

// Vérification du texte saisi
function checkInput(input) {
    if (!isTestActive && isTestReady) {
        startTest();
    }

    const currentText = currentTexts[currentTextIndex];
    const nextText = currentTexts[currentTextIndex + 1];
    const fullText = nextText && (currentLevel === 'intermediate' || currentLevel === 'advanced') 
        ? currentText + ' ' + nextText 
        : currentText;
    
    const chars = document.getElementById('text-display').getElementsByClassName('char');
    
    // Réinitialiser tous les caractères
    for (let i = 0; i < chars.length; i++) {
        chars[i].className = 'char';
    }

    // Analyser le texte
    const targetWords = fullText.split(' ');
    const typedWords = input.split(' ');
    let charPosition = 0;

    // Pour chaque mot du texte cible
    for (let wordIndex = 0; wordIndex < targetWords.length; wordIndex++) {
        const targetWord = targetWords[wordIndex];
        const typedWord = typedWords[wordIndex] || '';
        const isCurrentWord = wordIndex === typedWords.length - 1;
        
        // Si c'est un mot qu'on a déjà commencé à taper
        if (wordIndex < typedWords.length - 1 || (isCurrentWord && typedWord.length > 0)) {
            // Vérifier les caractères tapés
            for (let i = 0; i < targetWord.length; i++) {
                if (i < typedWord.length) {
                    // Caractères tapés : vert si correct, rouge si incorrect
                    chars[charPosition].className = 
                        typedWord[i] === targetWord[i] ? 'char correct' : 'char error';
                } else if (input.endsWith(' ') && isCurrentWord) {
                    // Si on appuie sur espace, les caractères non tapés du mot actuel sont en rouge
                    chars[charPosition].className = 'char error';
                } else if (wordIndex < typedWords.length - 1) {
                    // Pour les mots précédents incomplets, marquer en rouge
                    chars[charPosition].className = 'char error';
                } else {
                    // Laisser neutre pour le mot en cours de frappe
                    chars[charPosition].className = 'char';
                }
                charPosition++;
            }
            
            // Gérer l'espace après le mot
            if (wordIndex < targetWords.length - 1) {
                chars[charPosition].className = wordIndex < typedWords.length - 1 ? 'char correct' : 'char';
                charPosition++;
            }
        } else {
            // Pour les mots pas encore commencés, laisser tout neutre
            for (let i = 0; i < targetWord.length; i++) {
                chars[charPosition].className = 'char';
                charPosition++;
            }
            
            // Espace après le mot
            if (wordIndex < targetWords.length - 1) {
                chars[charPosition].className = 'char';
                charPosition++;
            }
        }
    }

    // Mettre à jour les statistiques
    if (input.length > previousInputLength) {
        totalKeystrokes++;
        if (input[input.length - 1] === fullText[input.length - 1]) {
            correctKeystrokes++;
        }
    }
    previousInputLength = input.length;

    // Vérifier si on doit passer au texte suivant
    const currentTextComplete = input === currentText || 
        (input.length >= currentText.length && input.endsWith(' '));
    
    if (currentTextComplete) {
        if (currentLevel === 'beginner' || !nextText) {
            // En mode débutant ou s'il n'y a pas de texte suivant, passer au prochain texte
            totalWords += targetWords.length;
            document.getElementById('input-field').value = '';
            moveToNextText();
            previousInputLength = 0;
        } else if (input === fullText || (input.length >= fullText.length && input.endsWith(' '))) {
            // En mode intermédiaire/avancé, attendre d'avoir complété les deux phrases
            totalWords += targetWords.length;
            document.getElementById('input-field').value = '';
            moveToNextText();
            previousInputLength = 0;
        }
    }
}

// Passage au texte suivant
async function moveToNextText() {
    if (currentLevel === 'beginner') {
        if (currentTextIndex < currentTexts.length - 1) {
            currentTextIndex++;
            displayText(currentTexts[currentTextIndex]);
        } else {
            currentTexts = await getTextsForLevel(currentLevel);
            currentTextIndex = 0;
            displayText(currentTexts[currentTextIndex]);
        }
    } else {
        // Pour les niveaux intermédiaire et avancé
        if (currentTextIndex < currentTexts.length - 2) {
            currentTextIndex += 2;
            displayText(currentTexts[currentTextIndex], currentTexts[currentTextIndex + 1]);
        } else {
            currentTexts = await getTextsForLevel(currentLevel);
            currentTextIndex = 0;
            displayText(currentTexts[currentTextIndex], currentTexts[currentTextIndex + 1]);
        }
    }
}

// Initialisation du texte
async function initText() {
    try {
        currentTexts = await getTextsForLevel(currentLevel);
        currentTextIndex = 0;
        displayText(currentTexts[currentTextIndex], currentTexts[currentTextIndex + 1]);
        const inputField = document.getElementById('input-field');
        inputField.disabled = false;
        inputField.focus();
        isTestReady = true;
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du texte:', error);
    }
}

// Configuration du clavier avec caractères spéciaux
const keyboardLayout = [
    [
        { main: '²', special: '' },
        { main: '1', special: '&' },
        { main: '2', special: 'é' },
        { main: '3', special: '"' },
        { main: '4', special: "'" },
        { main: '5', special: '(' },
        { main: '6', special: '-' },
        { main: '7', special: 'è' },
        { main: '8', special: '_' },
        { main: '9', special: 'ç' },
        { main: '0', special: 'à' },
        { main: '°', special: ')' },
        { main: '+', special: '=' }
    ],
    [
        'Tab',
        'a',
        'z',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        { main: '¨', special: '^' },
        { main: '£', special: '$' }
    ],
    [
        'Caps',
        'q',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'm',
        { main: 'ù', special: '%' },
        { main: '*', special: 'µ' }
    ],
    [
        'Shift',
        { main: '<', special: '>' },
        'w',
        'x',
        'c',
        'v',
        'b',
        'n',
        { main: ',', special: '?' },
        { main: ';', special: '.' },
        { main: ':', special: '/' },
        { main: '!', special: '§' },
        'Shift'
    ],
    ['Ctrl', 'Win', 'Alt', ' ', 'AltGr', 'Menu', 'Ctrl']
];

// Correspondance des touches spéciales
const specialKeyMap = {
    'CapsLock': 'Caps',
    'Control': 'Ctrl',
    'AltGraph': 'AltGr',
    'Meta': 'Win',
    'Shift': 'Shift',
    'Alt': 'Alt'
};

// Création du clavier virtuel
function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';

    keyboardLayout.forEach((row, rowIndex) => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';

        row.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.className = 'key';

            if (typeof key === 'object') {
                keyElement.setAttribute('data-key', key.main);
                if (key.special) {
                    keyElement.setAttribute('data-special', key.special);
                    keyElement.innerHTML = `
                        <div class="special-char">${key.special}</div>
                        <div class="main-char">${key.main}</div>
                    `;
                } else {
                    keyElement.textContent = key.main;
                }
            } else {
                keyElement.setAttribute('data-key', key);
                keyElement.textContent = key;
            }

            if (key === ' ') {
                keyElement.classList.add('space');
            }

            keyboardRow.appendChild(keyElement);
        });

        keyboard.appendChild(keyboardRow);
    });
}

// Gestion des niveaux
async function setLevel(level) {
    if (level !== currentLevel) {
        currentLevel = level;
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === level);
        });
        await resetTest();
    }
}

// Gestion du temps
function setTime(time) {
    if (isTestActive) {
        resetTest();
    }
    
    currentTestTime = parseInt(time);
    timer = currentTestTime;
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.time === time.toString()) {
            btn.classList.add('active');
        }
    });
    
    document.getElementById('timer').textContent = timer;
}

// Réinitialisation du test
async function resetTest() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isTestActive = false;
    isTestReady = true;
    timer = currentTestTime;
    document.getElementById('timer').textContent = timer;
    document.getElementById('input-field').value = '';
    document.getElementById('input-field').disabled = false;
    document.getElementById('restart-button').disabled = false;
    correctWords = 0;
    totalWords = 0;
    correctKeystrokes = 0;
    totalKeystrokes = 0;
    previousInputLength = 0;
    currentTextPosition = 0;
    errorStats = { letters: {}, words: {} };
    
    currentTexts = await getTextsForLevel(currentLevel);
    currentTextIndex = 0;
    
    // Afficher un ou deux textes selon le niveau
    if (currentLevel === 'beginner') {
        displayText(currentTexts[currentTextIndex]);
    } else {
        displayText(currentTexts[currentTextIndex], currentTexts[currentTextIndex + 1]);
    }
}

// Redémarrage du test
async function restartTest() {
    try {
        // Cacher la page de résultats et montrer la page de test
        const resultsPage = document.getElementById('results-page');
        const testPage = document.getElementById('test-page');
        
        if (resultsPage && testPage) {
            resultsPage.classList.add('hidden');
            testPage.classList.remove('hidden');
        }

        // Réactiver le champ de saisie
        const inputField = document.getElementById('input-field');
        if (inputField) {
            inputField.disabled = false;
            inputField.value = '';
            inputField.focus();
        }

        // Réinitialiser le test
        await resetTest();

        // Réinitialiser l'interface
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = currentTestTime;
        }

        // Réinitialiser les styles des caractères
        document.querySelectorAll('.char').forEach(char => {
            char.className = 'char';
        });

        // S'assurer que le test est prêt à démarrer
        isTestReady = true;
        isTestActive = false;
    } catch (error) {
        console.error('Erreur lors du redémarrage du test:', error);
    }
}

// Démarrage du test
function startTest() {
    if (!isTestActive) {
        isTestActive = true;
        startTime = new Date();
        timer = currentTestTime;
        document.getElementById('timer').textContent = timer;
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// Mise à jour du timer
function updateTimer() {
    if (timer > 0) {
        timer--;
        document.getElementById('timer').textContent = timer;
    }
    if (timer === 0) {
        clearInterval(timerInterval);
        endTest();
    }
}

// Fin du test
function endTest() {
    clearInterval(timerInterval);
    isTestActive = false;
    
    // Calcul du temps écoulé en minutes
    const endTime = new Date();
    const timeElapsed = (endTime - startTime) / 1000 / 60; // en minutes
    
    // Calcul des mots par minute (WPM)
    // Un mot standard fait 5 caractères en moyenne
    const totalCharacters = correctKeystrokes;
    const standardWordLength = 5;
    const grossWPM = Math.round((totalCharacters / standardWordLength) / timeElapsed);
    
    // Calcul de la précision (pourcentage de frappes correctes)
    const accuracy = totalKeystrokes > 0 
        ? Math.round((correctKeystrokes / totalKeystrokes) * 100) 
        : 0;
    
    // Calcul du WPM net (prend en compte la précision)
    const netWPM = Math.round(grossWPM * (accuracy / 100));
    
    // Affichage des résultats
    document.getElementById('final-wpm').textContent = netWPM;
    document.getElementById('final-accuracy').textContent = accuracy;
    
    // Afficher la page de résultats
    document.getElementById('test-page').classList.add('hidden');
    document.getElementById('results-page').classList.remove('hidden');
    
    // Afficher l'analyse des erreurs
    showErrorAnalysis();
}

// Gestion des événements
document.addEventListener('DOMContentLoaded', async () => {
    createKeyboard();
    await initText();
    
    // Gestion des touches du clavier
    document.addEventListener('keydown', (e) => {
        if (!isTestActive && e.key !== 'Tab') return;
        if (e.key === 'Tab') e.preventDefault();
        updateKeyboardState(e);
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Tab') e.preventDefault();
        updateKeyboardState(e);
    });

    const inputField = document.getElementById('input-field');
    const restartButton = document.getElementById('restart-button');
    const restartTestBtn = document.getElementById('restart-test');
    
    // Gestion de l'espace
    inputField.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            const input = inputField.value;
            
            // Ne pas ajouter d'espace si on est déjà à la fin d'un mot
            if (!input.endsWith(' ')) {
                e.preventDefault();
                inputField.value = input + ' ';
                checkInput(inputField.value);
            }
        }
    });

    // Gestion normale de la saisie
    inputField.addEventListener('input', (e) => {
        checkInput(e.target.value);
    });
    
    if (restartButton) {
        restartButton.addEventListener('click', async () => {
            await restartTest();
        });
    }

    if (restartTestBtn) {
        restartTestBtn.addEventListener('click', async () => {
            await restartTest();
        });
    }
    
    document.querySelectorAll('.level-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const newLevel = button.dataset.level;
            await setLevel(newLevel);
        });
    });
    
    document.querySelectorAll('.time-btn').forEach(button => {
        button.addEventListener('click', () => {
            setTime(button.dataset.time);
        });
    });

    // Empêcher le collage de texte
    document.getElementById('input-field').addEventListener('paste', (e) => {
        e.preventDefault();
        alert('Le collage de texte n\'est pas autorisé pour éviter la triche !');
    });
});

// Mise à jour de l'état du clavier
function updateKeyboardState(event) {
    // Empêcher le comportement par défaut de Tab
    if (event.key === 'Tab') {
        event.preventDefault();
    }

    let key = event.key;
    
    // Gérer les touches spéciales
    if (specialKeyMap[event.code] || specialKeyMap[event.key]) {
        key = specialKeyMap[event.code] || specialKeyMap[event.key];
    } else if (key.length === 1) { // Si c'est un caractère unique (lettre, chiffre, etc.)
        key = key.toLowerCase(); // Convertir en minuscule
    }
    
    // Chercher d'abord la touche directement par data-key
    let keyElement = document.querySelector(`.key[data-key="${key}"]`);
    
    // Si non trouvé, chercher dans les caractères spéciaux
    if (!keyElement) {
        keyElement = document.querySelector(`.key[data-special="${key}"]`);
    }
    
    if (keyElement) {
        if (event.type === 'keydown') {
            keyElement.classList.add('active');
        } else if (event.type === 'keyup') {
            keyElement.classList.remove('active');
            // Force le retrait de la classe active pour Tab
            if (event.key === 'Tab') {
                setTimeout(() => {
                    keyElement.classList.remove('active');
                }, 50);
            }
        }
    }
}

// Affichage de l'analyse des erreurs
function showErrorAnalysis() {
    const errorAnalysis = document.getElementById('error-analysis');
    errorAnalysis.innerHTML = '';

    // Statistiques détaillées
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';

    // Frappes totales
    const totalKeystrokesDiv = document.createElement('div');
    totalKeystrokesDiv.className = 'stat-item';
    totalKeystrokesDiv.innerHTML = `
        <span class="stat-label">Frappes totales:</span>
        <span class="stat-value">${totalKeystrokes}</span>
    `;
    statsContainer.appendChild(totalKeystrokesDiv);

    // Frappes correctes
    const correctKeystrokesDiv = document.createElement('div');
    correctKeystrokesDiv.className = 'stat-item';
    correctKeystrokesDiv.innerHTML = `
        <span class="stat-label">Frappes correctes:</span>
        <span class="stat-value">${correctKeystrokes}</span>
    `;
    statsContainer.appendChild(correctKeystrokesDiv);

    // Erreurs
    const errorsDiv = document.createElement('div');
    errorsDiv.className = 'stat-item';
    errorsDiv.innerHTML = `
        <span class="stat-label">Erreurs:</span>
        <span class="stat-value">${totalKeystrokes - correctKeystrokes}</span>
    `;
    statsContainer.appendChild(errorsDiv);

    errorAnalysis.appendChild(statsContainer);
}