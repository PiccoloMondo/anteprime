// Dati del menu di Piccolo Mondo — Arbia (Siena), dal 1985
const RESTAURANT = {
  name: "Piccolo Mondo",
  tagline: "Pizzeria & Trattoria dal 1985",
  address: "54/56 Piazza della Repubblica, 53041 Arbia (Siena)",
  phone: "0577 364208",
  phoneHref: "tel:+390577364208",
  hours: "Martedì – Domenica, 19:30 – 01:00",
  closed: "Chiuso il lunedì",
  facebook: "https://www.facebook.com/piccolomondo1985",
  instagram: "https://www.instagram.com/piccolomondosiena/"
};

const MENU = {
  antipasti: {
    label: "Antipasti",
    items: [
      { name: "Bruschetta al pomodoro", prezzo: "5.50€", description: "olio, aglio e pomodoro" },
      { name: "Toscano", prezzo: "6.50€", description: "affettati misti e crostini" },
      { name: "Toscano rinforzato", prezzo: "8.50€", description: "affettati misti, crostini, bruschetta al pomodoro, pecorino e panelle fritte" },
      { name: "Stracciatella di bufala, pancetta arrotolata & fiori di zucca ripieni fritti", prezzo: "8.50€" },
      { name: "Tagliere di affettati misti toscani, pecorini, pomodori secchi, miele e composte", prezzo: "12.00€" },
      { name: "Prosciutto crudo toscano e panelle fritte", prezzo: "8.50€" }
    ]
  },
  ciaccini: {
    label: "Ciaccini",
    items: [
      { name: "Primavera", prezzo: "6.50€", description: "pomodoro fresco, mozzarella" },
      { name: "Batticuore", prezzo: "8.00€", description: "pomodoro fresco, tonno e capperi" },
      { name: "Ghiaccio bollente", prezzo: "6.50€", description: "prosciutto cotto, mozzarella" },
      { name: "Monte rosa", prezzo: "7.50€", description: "prosciutto crudo, mozzarella" },
      { name: "Al Gorgonzola", prezzo: "7.00€" },
      { name: "Cipolla e salsiccia", prezzo: "7.50€" },
      { name: "Di bosco", prezzo: "8.00€", description: "porcini e mozzarella" },
      { name: "Ciaccino porcellino", prezzo: "8.50€", description: "porcini, prezzemolo, mozzarella, prosciutto crudo" },
      { name: "Fiordaliso", prezzo: "8.50€", description: "gorgonzola, wurstel, mozzarella, prosciutto cotto, mascarpone, sottiletta" },
      { name: "Rambo", prezzo: "8.00€", description: "aglio, cipolla, peperoncino, mozzarella, salamino piccante" },
      { name: "Carpaccio", prezzo: "8.50€", description: "bresaola, rucola, mozzarella, grana a scaglie, pomodoro fresco" },
      { name: "Rusticone", prezzo: "8.00€", description: "rucola, pomodoro fresco, prosciutto crudo, mozzarella" },
      { name: "Del contadino", prezzo: "8.00€", description: "verdure fresche: cipolla, patata, carota, melanzana, zucchine, spinaci, carciofi e mozzarella" },
      { name: "Bombolino", prezzo: "8.50€", description: "salsiccia, funghi, wurstel, uovo, cipolla, aglio, prosciutto cotto, olive, acciughe, capperi, mozzarella" },
      { name: "Faule", prezzo: "8.00€", description: "prosciutto cotto, salsiccia, wurstel, mozzarella, funghi, carciofi" },
      { name: "Castiglioni", prezzo: "10.00€", description: "salmone, porcini, mozzarella" },
      { name: "Salmone", prezzo: "8.00€", description: "salmone, mozzarella" },
      { name: "Ripieno dello Starna", prezzo: "8.50€", description: "ripieno: prosciutto cotto, wurstel, mozzarella; sopra: pomodoro fresco" },
      { name: "Ripieno alla salsiccia & mozzarella", prezzo: "8.00€" },
      { name: "Ripieno al prosciutto cotto & mozzarella", prezzo: "8.00€" },
      { name: "Ripieno prosciutto cotto, porcini & mozzarella", prezzo: "9.50€" },
      { name: "Ripieno del Collini", prezzo: "10.00€", description: "ripieno: olive, porcini, prosciutto cotto, mozzarella, pomodoro fresco; sopra: prosciutto crudo" },
      { name: "Ripieno del ghiottone", prezzo: "11.00€", description: "tutto" },
      { name: "Focaccina fredda", prezzo: "6.50€", description: "maionese, insalata, pomodoro fresco, capperi, tonno, prosciutto" },
      { name: "Focaccina calda al formaggio", prezzo: "6.50€", description: "pecorino, prosciutto crudo" },
      { name: "Focaccina calda al prosciutto", prezzo: "6.00€", description: "mozzarella, prosciutto crudo" }
    ]
  },
  pizze: {
    label: "Pizze",
    items: [
      { name: "Calzone farcito", prezzo: "7.50€", description: "prosciutto cotto, funghi champignon e mozzarella" },
      { name: "Margherita", prezzo: "6.00€", description: "pomodoro e mozzarella" },
      { name: "Marinara", prezzo: "5.50€", description: "pomodoro e aglio" },
      { name: "Ligure", prezzo: "7.00€", description: "mozzarella, pomodoro, acciughe, basilico" },
      { name: "Napoli", prezzo: "6.50€", description: "pomodoro, acciughe, mozzarella" },
      { name: "Romana", prezzo: "7.00€", description: "acciughe, capperi e mozzarella" },
      { name: "Prosciutto cotto", prezzo: "7.00€" },
      { name: "Prosciutto cotto e funghi champignon", prezzo: "7.50€" },
      { name: "Prosciutto cotto e wurstel", prezzo: "7.50€" },
      { name: "Prosciutto cotto e porcini", prezzo: "8.50€" },
      { name: "Prosciutto crudo", prezzo: "8.00€" },
      { name: "Wurstel", prezzo: "7.00€" },
      { name: "Salsiccia", prezzo: "7.00€" },
      { name: "Salamino piccante", prezzo: "7.50€" },
      { name: "alla Diavola", prezzo: "6.00€", description: "aglio, peperoncino e mozzarella" },
      { name: "Funghi champignon", prezzo: "7.00€" },
      { name: "Cipolla", prezzo: "6.50€" },
      { name: "Lacrima", prezzo: "7.00€", description: "cipolla, aglio, peperoncino e mozzarella" },
      { name: "al Porcino", prezzo: "8.50€" },
      { name: "Capricciosa", prezzo: "7.50€", description: "salame, wurstel, olive, uovo sodo, carciofi, funghi champignon e mozzarella" },
      { name: "4 Stagioni", prezzo: "7.00€", description: "wurstel, prosciutto cotto, funghi champignon, carciofi, olive nere e mozzarella" },
      { name: "al Gorgonzola", prezzo: "7.50€" },
      { name: "Rossini", prezzo: "7.00€", description: "mozzarella, uovo sodo e maionese" },
      { name: "4 Formaggi", prezzo: "8.50€", description: "gorgonzola, sottiletta, mascarpone e mozzarella" },
      { name: "Tonno e capperi", prezzo: "8.50€" },
      { name: "Puttanesca", prezzo: "7.50€", description: "capperi, acciughe, olive, aglio, peperoncino e mozzarella" },
      { name: "alla Calabrese", prezzo: "9.00€", description: "salamino piccante, pomodorini secchi, peperoncino, aglio, olive nere e mozzarella" },
      { name: "alla Ciociara", prezzo: "8.50€", description: "prosciutto cotto, pinoli, peperoncino e mozzarella" },
      { name: "Porcini e salsa tartufata", prezzo: "9.50€" },
      { name: "Parmigiana", prezzo: "8.00€", description: "melanzane, parmigiano, mozzarella" },
      { name: "Cameneschi", prezzo: "10.00€", description: "tutto" },
      { name: "Piemontese", prezzo: "8.50€", description: "gorgonzola, prosciutto crudo, mozzarella" },
      { name: "All'alpina", prezzo: "9.00€", description: "porcini, prezzemolo, prosciutto crudo e mozzarella" },
      { name: "Piccolo Mondo", prezzo: "8.00€", description: "salsiccia, funghi champignon, carciofi, aglio, olive, peperoncino e mozzarella" },
      { name: "Boomerang", prezzo: "8.50€", description: "parmigiano, prosciutto crudo, mozzarella" },
      { name: "Speedy Gonzales", prezzo: "7.50€", description: "salsiccia, cipolla, aglio, peperoncino e mozzarella" },
      { name: "Re", prezzo: "8.50€", description: "porcini e panna" },
      { name: "Regina", prezzo: "9.00€", description: "porcini, panna, prosciutto cotto" },
      { name: "Principessa", prezzo: "8.00€", description: "panna e prosciutto cotto" },
      { name: "Scacciapensieri", prezzo: "9.00€", description: "tonno, salsiccia, carciofi, maionese e mozzarella" },
      { name: "Fantasia del pizzaiolo", prezzo: "9.00€", description: "prosciutto cotto, porcini, salsiccia, carciofi e mozzarella" },
      { name: "Occhio di bue", prezzo: "7.50€", description: "2 uova e mozzarella" },
      { name: "Contadina", prezzo: "7.50€", description: "cipolla, patate, uovo e mozzarella" },
      { name: "Barrocciaia", prezzo: "9.00€", description: "crema di uovo, parmigiano e olive" },
      { name: "Leo", prezzo: "9.00€", description: "4 formaggi, tonno e capperi" },
      { name: "Micky", prezzo: "9.00€", description: "4 formaggi e prosciutto crudo" },
      { name: "Fiore Roby", prezzo: "9.00€", description: "4 formaggi e prosciutto cotto" },
      { name: "Nuraghi", prezzo: "8.50€", description: "prosciutto cotto, funghi champignon, carciofi, olive verdi, capperi, acciughe e mozzarella" },
      { name: "Pippo Pippo", prezzo: "9.00€", description: "salsiccia, porcini, mascarpone, prezzemolo e mozzarella" },
      { name: "Pippolla", prezzo: "9.50€", description: "salsiccia, porcini, mascarpone, prezzemolo, cipolla e mozzarella" },
      { name: "Re Artù", prezzo: "8.00€", description: "salsiccia, stracchino, pepe nero e mozzarella" },
      { name: "di Cielo", prezzo: "8.50€", description: "salamino piccante, salsiccia, cipolla e mozzarella" },
      { name: "Della casa", prezzo: "10.00€", description: "ripieno: mozzarella, prosciutto cotto, funghi, wurstel, carciofi; sopra: pomodoro, mozzarella ed olive" },
      { name: "Fiocco di neve", prezzo: "8.50€", description: "salsa di capperi, acciughe, olive, peperoncino e fiocchi di mascarpone" },
      { name: "Scamopeck", prezzo: "8.50€", description: "scamorza, speck e mozzarella" },
      { name: "al Salmone", prezzo: "8.50€" }
    ]
  },
  primi: {
    label: "Primi Piatti",
    items: [
      { name: "Pappardelle al ragù di carne", prezzo: "8.50€" },
      { name: "Fusilloni alla Ciociara", prezzo: "8.50€", description: "prosciutto cotto, pinoli, pomodoro & basilico" },
      { name: "Pici Pippo Pippo", prezzo: "9.00€", description: "salsiccia, porcini, prezzemolo, mascarpone & aglio" },
      { name: "Spaghetti alla chitarra", prezzo: "8.50€", description: "speck, mela, ciliegini & pistacchi" },
      { name: "Spaghetti Furio", prezzo: "7.50€", description: "aglio, olio, peperoncino & ciliegini" },
      { name: "Tagliatelle con pesto tiepido di zucchine e basilico, pomodorini e riccioli di pecorino", prezzo: "8.50€" }
    ]
  },
  secondi: {
    label: "Secondi Piatti",
    items: [
      { name: "Tagliata di vitello, rucola e grana", prezzo: "15.50€" },
      { name: "Tagliata di pollo su insalata di finocchi, arancia e semi di zucca", prezzo: "12.50€" },
      { name: "Tagliata di vitello, radicchio rosso, pecorino semi-stagionato e miele", prezzo: "16.50€" }
    ]
  },
  hamburger: {
    label: "Hamburger",
    items: [
      { name: "Hamburger classico", prezzo: "10.00€", description: "panino sesamo: insalata, pomodori, cipolla, patatine fritte" },
      { name: "Hamburger di Scottona", prezzo: "15.00€", description: "panino rosetta: cipolla caramellata al balsamico, rucola, pecorino, pomodorini secchi, pinoli, verdure miste fritte" },
      { name: "Hamburger di Scamerita", prezzo: "15.00€", description: "panino al grano saraceno e cereali: zucchine grigliate sott'olio, ricotta di bufala, guancia croccante, pomodorini confit, anelli di cipolla fritti" }
    ]
  },
  fritti: {
    label: "Fritti",
    items: [
      { name: "Fiori di zucca ripieni mozzarella e acciughe", prezzo: "4.50€" },
      { name: "Mozzarelline", prezzo: "4.00€" },
      { name: "Olive all'ascolana", prezzo: "4.00€" },
      { name: "Crocchette di patate", prezzo: "4.00€" },
      { name: "Patatine", prezzo: "4.00€" },
      { name: "Anelli di cipolla", prezzo: "4.00€" },
      { name: "Verdure miste", prezzo: "4.00€", description: "cavolo, carciofi & zucchine" },
      { name: "Fritti misto", prezzo: "6.50€", description: "mozzarelline, olive, crocchette, polenta e panelle" }
    ]
  },
  dolci: {
    label: "Dolci",
    items: [
      { name: "Dolci di nostra produzione", prezzo: "4.50€" },
      { name: "Tartufi & Profiteroles", prezzo: "4.50€" },
      { name: "Tartufi affogati al caffè", prezzo: "5.50€" }
    ]
  },
  bibite: {
    label: "Bibite alla spina",
    sized: true,
    items: [
      { name: "Pepsi Cola", piccola: "3.00€", media: "4.50€", grande: "10.00€" },
      { name: "Lowenbrau (Chiara)", piccola: "3.00€", media: "5.50€", grande: "12.00€" },
      { name: "Tennent's Scotch (Rossa)", piccola: "3.50€", media: "6.00€", grande: "13.00€" },
      { name: "Weltenburger (Weiss)", piccola: "3.50€", media: "6.50€ (50cl)", grande: "12.00€" }
    ]
  },
  bottiglie: {
    label: "Bottiglie",
    items: [
      { name: "Minerale naturale o gassata", prezzo: "1.50€", description: "1/2 litro" },
      { name: "Minerale naturale o gassata", prezzo: "2.00€", description: "1 litro" },
      { name: "Coca-Cola, Aranciata", prezzo: "2.50€", description: "lattina" },
      { name: "Coca-Cola, Aranciata", prezzo: "5.00€", description: "bottiglia 1,5 litro" },
      { name: "Menabrea 66cl", prezzo: "5.50€", description: "birra chiara, Italia" }
    ]
  },
  vini: {
    label: "Vini",
    sized: true,
    items: [
      { name: "San Giorgio a Lapi", description: "Rosso della casa", piccola: "3.00€", media: "5.00€", grande: "7.00€" },
      { name: "Mosso, alla spina", description: "Bianco della casa", piccola: "2.50€", media: "3.50€", grande: "6.50€ (1 Litro)" }
    ]
  },
  amari: {
    label: "Amari & Caffè",
    items: [
      { name: "Caffè espresso", prezzo: "1.50€" },
      { name: "Amari", prezzo: "2.50€" },
      { name: "Distillati", prezzo: "3.50€" }
    ]
  }
};

const CATEGORY_ORDER = ["antipasti", "ciaccini", "pizze", "primi", "secondi", "hamburger", "fritti", "dolci", "bibite", "bottiglie", "vini", "amari"];

const ALLERGENI_TEXT = "Si avvisa la gentile clientela che negli alimenti e nelle bevande preparati e somministrati in questo esercizio possono essere contenuti ingredienti o coadiuvanti considerati allergeni (cereali con glutine, crostacei, uova, pesce, arachidi, soia, latte, frutta a guscio, sedano, senape, sesamo, solfiti, lupini, molluschi). Un nostro responsabile è a vostra disposizione per fornire ogni informazione aggiuntiva.";
