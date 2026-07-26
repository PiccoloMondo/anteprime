// Dati del menu di Piccolo Mondo — Arbia (Siena), dal 1985
// Bilingual schema: strings are either a plain string, or {it, en}.
// Use t(value, lang) to resolve. English dish descriptions are intentionally
// left blank ("") for now and fall back to Italian — fill in later.

const DEFAULT_LANG = "it";

function t(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value[DEFAULT_LANG] || "";
}

function getLang() {
  const params = new URLSearchParams(location.search);
  const fromParam = params.get("lang");
  if (fromParam === "it" || fromParam === "en") {
    localStorage.setItem("pm-lang", fromParam);
    return fromParam;
  }
  const stored = localStorage.getItem("pm-lang");
  if (stored === "it" || stored === "en") return stored;
  return navigator.language && navigator.language.toLowerCase().startsWith("en") ? "en" : "it";
}

function setLang(lang) {
  localStorage.setItem("pm-lang", lang);
}

const RESTAURANT = {
  name: "Piccolo Mondo",
  since: "1985",
  address: "54/56 Piazza della Repubblica, 53041 Arbia (Siena)",
  phone: "0577 364208",
  phoneHref: "tel:+390577364208",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Piccolo+Mondo+Piazza+della+Repubblica+Arbia+Siena",
  facebook: "https://www.facebook.com/piccolomondo1985",
  instagram: "https://www.instagram.com/piccolomondosiena/",
  hours: { it: "Martedì – Domenica, 19:30 – 01:00", en: "Tuesday – Sunday, 7:30pm – 1:00am" },
  closed: { it: "Chiuso il lunedì", en: "Closed on Mondays" },
  tagline: { it: "Pizzeria & Trattoria dal 1985", en: "Pizzeria & Trattoria since 1985" }
};

const UI = {
  it: {
    nav_menu: "Menu",
    nav_allergeni: "Allergeni",
    nav_contatti: "Contatti",
    hero_eyebrow: "dal 1985",
    hero_cta: "Scopri il menu",
    menu_title: "Menu",
    allergeni_title: "Allergeni",
    allergeni_text: "Si avvisa la gentile clientela che negli alimenti e nelle bevande preparati e somministrati in questo esercizio possono essere contenuti ingredienti o coadiuvanti considerati allergeni (cereali con glutine, crostacei, uova, pesce, arachidi, soia, latte, frutta a guscio, sedano, senape, sesamo, solfiti, lupini, molluschi). Un nostro responsabile è a vostra disposizione per fornire ogni informazione aggiuntiva.",
    contatti_title: "Contatti",
    label_address: "Indirizzo",
    label_phone: "Telefono",
    label_hours: "Orari",
    label_follow: "Seguici",
    size_small: "Piccola",
    size_medium: "Media",
    size_large: "Grande",
    lang_toggle_label: "Lingua"
  },
  en: {
    nav_menu: "Menu",
    nav_allergeni: "Allergens",
    nav_contatti: "Contact",
    hero_eyebrow: "since 1985",
    hero_cta: "See the menu",
    menu_title: "Menu",
    allergeni_title: "Allergens",
    allergeni_text: "Please note that the food and drinks prepared and served on these premises may contain ingredients or processing aids considered allergens (gluten-containing cereals, crustaceans, eggs, fish, peanuts, soy, milk, tree nuts, celery, mustard, sesame, sulphites, lupin, molluscs). A member of staff is available to provide further information.",
    contatti_title: "Contact",
    label_address: "Address",
    label_phone: "Phone",
    label_hours: "Hours",
    label_follow: "Follow us",
    size_small: "Small",
    size_medium: "Medium",
    size_large: "Large",
    lang_toggle_label: "Language"
  }
};

const MENU = {
  antipasti: {
    label: { it: "Antipasti", en: "Starters" },
    items: [
      { name: "Bruschetta al pomodoro", prezzo: "5.50€", description: { it: "olio, aglio e pomodoro", en: "" } },
      { name: "Toscano", prezzo: "6.50€", description: { it: "affettati misti e crostini", en: "" } },
      { name: "Toscano rinforzato", prezzo: "8.50€", description: { it: "affettati misti, crostini, bruschetta al pomodoro, pecorino e panelle fritte", en: "" } },
      { name: "Stracciatella di bufala, pancetta arrotolata & fiori di zucca ripieni fritti", prezzo: "8.50€" },
      { name: "Tagliere di affettati misti toscani, pecorini, pomodori secchi, miele e composte", prezzo: "12.00€" },
      { name: "Prosciutto crudo toscano e panelle fritte", prezzo: "8.50€" }
    ]
  },
  ciaccini: {
    label: { it: "Ciaccini", en: "Ciaccini" },
    items: [
      { name: "Primavera", prezzo: "6.50€", description: { it: "pomodoro fresco, mozzarella", en: "" } },
      { name: "Batticuore", prezzo: "8.00€", description: { it: "pomodoro fresco, tonno e capperi", en: "" } },
      { name: "Ghiaccio bollente", prezzo: "6.50€", description: { it: "prosciutto cotto, mozzarella", en: "" } },
      { name: "Monte rosa", prezzo: "7.50€", description: { it: "prosciutto crudo, mozzarella", en: "" } },
      { name: "Al Gorgonzola", prezzo: "7.00€" },
      { name: "Cipolla e salsiccia", prezzo: "7.50€" },
      { name: "Di bosco", prezzo: "8.00€", description: { it: "porcini e mozzarella", en: "" } },
      { name: "Ciaccino porcellino", prezzo: "8.50€", description: { it: "porcini, prezzemolo, mozzarella, prosciutto crudo", en: "" } },
      { name: "Fiordaliso", prezzo: "8.50€", description: { it: "gorgonzola, wurstel, mozzarella, prosciutto cotto, mascarpone, sottiletta", en: "" } },
      { name: "Rambo", prezzo: "8.00€", description: { it: "aglio, cipolla, peperoncino, mozzarella, salamino piccante", en: "" } },
      { name: "Carpaccio", prezzo: "8.50€", description: { it: "bresaola, rucola, mozzarella, grana a scaglie, pomodoro fresco", en: "" } },
      { name: "Rusticone", prezzo: "8.00€", description: { it: "rucola, pomodoro fresco, prosciutto crudo, mozzarella", en: "" } },
      { name: "Del contadino", prezzo: "8.00€", description: { it: "verdure fresche: cipolla, patata, carota, melanzana, zucchine, spinaci, carciofi e mozzarella", en: "" } },
      { name: "Bombolino", prezzo: "8.50€", description: { it: "salsiccia, funghi, wurstel, uovo, cipolla, aglio, prosciutto cotto, olive, acciughe, capperi, mozzarella", en: "" } },
      { name: "Faule", prezzo: "8.00€", description: { it: "prosciutto cotto, salsiccia, wurstel, mozzarella, funghi, carciofi", en: "" } },
      { name: "Castiglioni", prezzo: "10.00€", description: { it: "salmone, porcini, mozzarella", en: "" } },
      { name: "Salmone", prezzo: "8.00€", description: { it: "salmone, mozzarella", en: "" } },
      { name: "Ripieno dello Starna", prezzo: "8.50€", description: { it: "ripieno: prosciutto cotto, wurstel, mozzarella; sopra: pomodoro fresco", en: "" } },
      { name: "Ripieno alla salsiccia & mozzarella", prezzo: "8.00€" },
      { name: "Ripieno al prosciutto cotto & mozzarella", prezzo: "8.00€" },
      { name: "Ripieno prosciutto cotto, porcini & mozzarella", prezzo: "9.50€" },
      { name: "Ripieno del Collini", prezzo: "10.00€", description: { it: "ripieno: olive, porcini, prosciutto cotto, mozzarella, pomodoro fresco; sopra: prosciutto crudo", en: "" } },
      { name: "Ripieno del ghiottone", prezzo: "11.00€", description: { it: "tutto", en: "" } },
      { name: "Focaccina fredda", prezzo: "6.50€", description: { it: "maionese, insalata, pomodoro fresco, capperi, tonno, prosciutto", en: "" } },
      { name: "Focaccina calda al formaggio", prezzo: "6.50€", description: { it: "pecorino, prosciutto crudo", en: "" } },
      { name: "Focaccina calda al prosciutto", prezzo: "6.00€", description: { it: "mozzarella, prosciutto crudo", en: "" } }
    ]
  },
  pizze: {
    label: { it: "Pizze", en: "Pizzas" },
    items: [
      { name: "Calzone farcito", prezzo: "7.50€", description: { it: "prosciutto cotto, funghi champignon e mozzarella", en: "" } },
      { name: "Margherita", prezzo: "6.00€", description: { it: "pomodoro e mozzarella", en: "" } },
      { name: "Marinara", prezzo: "5.50€", description: { it: "pomodoro e aglio", en: "" } },
      { name: "Ligure", prezzo: "7.00€", description: { it: "mozzarella, pomodoro, acciughe, basilico", en: "" } },
      { name: "Napoli", prezzo: "6.50€", description: { it: "pomodoro, acciughe, mozzarella", en: "" } },
      { name: "Romana", prezzo: "7.00€", description: { it: "acciughe, capperi e mozzarella", en: "" } },
      { name: "Prosciutto cotto", prezzo: "7.00€" },
      { name: "Prosciutto cotto e funghi champignon", prezzo: "7.50€" },
      { name: "Prosciutto cotto e wurstel", prezzo: "7.50€" },
      { name: "Prosciutto cotto e porcini", prezzo: "8.50€" },
      { name: "Prosciutto crudo", prezzo: "8.00€" },
      { name: "Wurstel", prezzo: "7.00€" },
      { name: "Salsiccia", prezzo: "7.00€" },
      { name: "Salamino piccante", prezzo: "7.50€" },
      { name: "alla Diavola", prezzo: "6.00€", description: { it: "aglio, peperoncino e mozzarella", en: "" } },
      { name: "Funghi champignon", prezzo: "7.00€" },
      { name: "Cipolla", prezzo: "6.50€" },
      { name: "Lacrima", prezzo: "7.00€", description: { it: "cipolla, aglio, peperoncino e mozzarella", en: "" } },
      { name: "al Porcino", prezzo: "8.50€" },
      { name: "Capricciosa", prezzo: "7.50€", description: { it: "salame, wurstel, olive, uovo sodo, carciofi, funghi champignon e mozzarella", en: "" } },
      { name: "4 Stagioni", prezzo: "7.00€", description: { it: "wurstel, prosciutto cotto, funghi champignon, carciofi, olive nere e mozzarella", en: "" } },
      { name: "al Gorgonzola", prezzo: "7.50€" },
      { name: "Rossini", prezzo: "7.00€", description: { it: "mozzarella, uovo sodo e maionese", en: "" } },
      { name: "4 Formaggi", prezzo: "8.50€", description: { it: "gorgonzola, sottiletta, mascarpone e mozzarella", en: "" } },
      { name: "Tonno e capperi", prezzo: "8.50€" },
      { name: "Puttanesca", prezzo: "7.50€", description: { it: "capperi, acciughe, olive, aglio, peperoncino e mozzarella", en: "" } },
      { name: "alla Calabrese", prezzo: "9.00€", description: { it: "salamino piccante, pomodorini secchi, peperoncino, aglio, olive nere e mozzarella", en: "" } },
      { name: "alla Ciociara", prezzo: "8.50€", description: { it: "prosciutto cotto, pinoli, peperoncino e mozzarella", en: "" } },
      { name: "Porcini e salsa tartufata", prezzo: "9.50€" },
      { name: "Parmigiana", prezzo: "8.00€", description: { it: "melanzane, parmigiano, mozzarella", en: "" } },
      { name: "Cameneschi", prezzo: "10.00€", description: { it: "tutto", en: "" } },
      { name: "Piemontese", prezzo: "8.50€", description: { it: "gorgonzola, prosciutto crudo, mozzarella", en: "" } },
      { name: "All'alpina", prezzo: "9.00€", description: { it: "porcini, prezzemolo, prosciutto crudo e mozzarella", en: "" } },
      { name: "Piccolo Mondo", prezzo: "8.00€", description: { it: "salsiccia, funghi champignon, carciofi, aglio, olive, peperoncino e mozzarella", en: "" } },
      { name: "Boomerang", prezzo: "8.50€", description: { it: "parmigiano, prosciutto crudo, mozzarella", en: "" } },
      { name: "Speedy Gonzales", prezzo: "7.50€", description: { it: "salsiccia, cipolla, aglio, peperoncino e mozzarella", en: "" } },
      { name: "Re", prezzo: "8.50€", description: { it: "porcini e panna", en: "" } },
      { name: "Regina", prezzo: "9.00€", description: { it: "porcini, panna, prosciutto cotto", en: "" } },
      { name: "Principessa", prezzo: "8.00€", description: { it: "panna e prosciutto cotto", en: "" } },
      { name: "Scacciapensieri", prezzo: "9.00€", description: { it: "tonno, salsiccia, carciofi, maionese e mozzarella", en: "" } },
      { name: "Fantasia del pizzaiolo", prezzo: "9.00€", description: { it: "prosciutto cotto, porcini, salsiccia, carciofi e mozzarella", en: "" } },
      { name: "Occhio di bue", prezzo: "7.50€", description: { it: "2 uova e mozzarella", en: "" } },
      { name: "Contadina", prezzo: "7.50€", description: { it: "cipolla, patate, uovo e mozzarella", en: "" } },
      { name: "Barrocciaia", prezzo: "9.00€", description: { it: "crema di uovo, parmigiano e olive", en: "" } },
      { name: "Leo", prezzo: "9.00€", description: { it: "4 formaggi, tonno e capperi", en: "" } },
      { name: "Micky", prezzo: "9.00€", description: { it: "4 formaggi e prosciutto crudo", en: "" } },
      { name: "Fiore Roby", prezzo: "9.00€", description: { it: "4 formaggi e prosciutto cotto", en: "" } },
      { name: "Nuraghi", prezzo: "8.50€", description: { it: "prosciutto cotto, funghi champignon, carciofi, olive verdi, capperi, acciughe e mozzarella", en: "" } },
      { name: "Pippo Pippo", prezzo: "9.00€", description: { it: "salsiccia, porcini, mascarpone, prezzemolo e mozzarella", en: "" } },
      { name: "Pippolla", prezzo: "9.50€", description: { it: "salsiccia, porcini, mascarpone, prezzemolo, cipolla e mozzarella", en: "" } },
      { name: "Re Artù", prezzo: "8.00€", description: { it: "salsiccia, stracchino, pepe nero e mozzarella", en: "" } },
      { name: "di Cielo", prezzo: "8.50€", description: { it: "salamino piccante, salsiccia, cipolla e mozzarella", en: "" } },
      { name: "Della casa", prezzo: "10.00€", description: { it: "ripieno: mozzarella, prosciutto cotto, funghi, wurstel, carciofi; sopra: pomodoro, mozzarella ed olive", en: "" } },
      { name: "Fiocco di neve", prezzo: "8.50€", description: { it: "salsa di capperi, acciughe, olive, peperoncino e fiocchi di mascarpone", en: "" } },
      { name: "Scamopeck", prezzo: "8.50€", description: { it: "scamorza, speck e mozzarella", en: "" } },
      { name: "al Salmone", prezzo: "8.50€" }
    ]
  },
  primi: {
    label: { it: "Primi Piatti", en: "First Courses" },
    items: [
      { name: "Pappardelle al ragù di carne", prezzo: "8.50€" },
      { name: "Fusilloni alla Ciociara", prezzo: "8.50€", description: { it: "prosciutto cotto, pinoli, pomodoro & basilico", en: "" } },
      { name: "Pici Pippo Pippo", prezzo: "9.00€", description: { it: "salsiccia, porcini, prezzemolo, mascarpone & aglio", en: "" } },
      { name: "Spaghetti alla chitarra", prezzo: "8.50€", description: { it: "speck, mela, ciliegini & pistacchi", en: "" } },
      { name: "Spaghetti Furio", prezzo: "7.50€", description: { it: "aglio, olio, peperoncino & ciliegini", en: "" } },
      { name: "Tagliatelle con pesto tiepido di zucchine e basilico, pomodorini e riccioli di pecorino", prezzo: "8.50€" }
    ]
  },
  secondi: {
    label: { it: "Secondi Piatti", en: "Main Courses" },
    items: [
      { name: "Tagliata di vitello, rucola e grana", prezzo: "15.50€" },
      { name: "Tagliata di pollo su insalata di finocchi, arancia e semi di zucca", prezzo: "12.50€" },
      { name: "Tagliata di vitello, radicchio rosso, pecorino semi-stagionato e miele", prezzo: "16.50€" }
    ]
  },
  hamburger: {
    label: { it: "Hamburger", en: "Burgers" },
    items: [
      { name: "Hamburger classico", prezzo: "10.00€", description: { it: "panino sesamo: insalata, pomodori, cipolla, patatine fritte", en: "" } },
      { name: "Hamburger di Scottona", prezzo: "15.00€", description: { it: "panino rosetta: cipolla caramellata al balsamico, rucola, pecorino, pomodorini secchi, pinoli, verdure miste fritte", en: "" } },
      { name: "Hamburger di Scamerita", prezzo: "15.00€", description: { it: "panino al grano saraceno e cereali: zucchine grigliate sott'olio, ricotta di bufala, guancia croccante, pomodorini confit, anelli di cipolla fritti", en: "" } }
    ]
  },
  fritti: {
    label: { it: "Fritti", en: "Fried" },
    items: [
      { name: "Fiori di zucca ripieni mozzarella e acciughe", prezzo: "4.50€" },
      { name: "Mozzarelline", prezzo: "4.00€" },
      { name: "Olive all'ascolana", prezzo: "4.00€" },
      { name: "Crocchette di patate", prezzo: "4.00€" },
      { name: "Patatine", prezzo: "4.00€" },
      { name: "Anelli di cipolla", prezzo: "4.00€" },
      { name: "Verdure miste", prezzo: "4.00€", description: { it: "cavolo, carciofi & zucchine", en: "" } },
      { name: "Fritti misto", prezzo: "6.50€", description: { it: "mozzarelline, olive, crocchette, polenta e panelle", en: "" } }
    ]
  },
  dolci: {
    label: { it: "Dolci", en: "Desserts" },
    items: [
      { name: "Dolci di nostra produzione", prezzo: "4.50€" },
      { name: "Tartufi & Profiteroles", prezzo: "4.50€" },
      { name: "Tartufi affogati al caffè", prezzo: "5.50€" }
    ]
  },
  bibite: {
    label: { it: "Bibite alla spina", en: "On Tap" },
    sized: true,
    items: [
      { name: "Pepsi Cola", piccola: "3.00€", media: "4.50€", grande: "10.00€" },
      { name: "Lowenbrau (Chiara)", piccola: "3.00€", media: "5.50€", grande: "12.00€" },
      { name: "Tennent's Scotch (Rossa)", piccola: "3.50€", media: "6.00€", grande: "13.00€" },
      { name: "Weltenburger (Weiss)", piccola: "3.50€", media: "6.50€ (50cl)", grande: "12.00€" }
    ]
  },
  bottiglie: {
    label: { it: "Bottiglie", en: "Bottles" },
    items: [
      { name: "Minerale naturale o gassata", prezzo: "1.50€", description: { it: "1/2 litro", en: "" } },
      { name: "Minerale naturale o gassata", prezzo: "2.00€", description: { it: "1 litro", en: "" } },
      { name: "Coca-Cola, Aranciata", prezzo: "2.50€", description: { it: "lattina", en: "" } },
      { name: "Coca-Cola, Aranciata", prezzo: "5.00€", description: { it: "bottiglia 1,5 litro", en: "" } },
      { name: "Menabrea 66cl", prezzo: "5.50€", description: { it: "birra chiara, Italia", en: "" } }
    ]
  },
  vini: {
    label: { it: "Vini", en: "Wines" },
    sized: true,
    items: [
      { name: "San Giorgio a Lapi", description: { it: "Rosso della casa", en: "" }, piccola: "3.00€", media: "5.00€", grande: "7.00€" },
      { name: "Mosso, alla spina", description: { it: "Bianco della casa", en: "" }, piccola: "2.50€", media: "3.50€", grande: "6.50€ (1 Litro)" }
    ]
  },
  amari: {
    label: { it: "Amari & Caffè", en: "Digestifs & Coffee" },
    items: [
      { name: "Caffè espresso", prezzo: "1.50€" },
      { name: "Amari", prezzo: "2.50€" },
      { name: "Distillati", prezzo: "3.50€" }
    ]
  }
};

const CATEGORY_ORDER = ["antipasti", "ciaccini", "pizze", "primi", "secondi", "hamburger", "fritti", "dolci", "bibite", "bottiglie", "vini", "amari"];
