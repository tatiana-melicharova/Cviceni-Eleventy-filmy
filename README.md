# Cvičení: Eleventy filmy

Postav projekt na Eleventy. Tentokrát začneš bez společného základu, který si budeš muset nachystat sama. Výsledek vystav na Netlify.

Jak by měl vypadat hotový web si prohlédni zde [eleventy-filmy.netlify.app](https://eleventy-filmy.netlify.app/). Klidně koukej i do vývojářských nástrojů. Jak strukturovat projekt se můžeš inspirovat i u předchozích cvičeních.

## Zadání

- Forkni tento repozitář se zadáním.

- Tvůj fork k sobě naklonuj a následující změny dělej v něm.

- Nezapomeň změny průběžně commitovat a pushovat.

- Protože distribuční složka a `node_modules` se většinou necommitují, vytvoř soubor `.gitignore` s řádky:

  ```
  /node_modules/
  /dist/
  ```

### Přidej závislosti

- Založ soubor `package.json` příkazem `npm init -y`.

- Přidej závislosti `@11ty/eleventy`, `npm-run-all` a `sass` příkazem `npm install nazev-zavislosti`. Příkaz můžeš pustit pro každou závislost zvlášť. Zkontroluj si, že tři zmíněné balíčky jsou nově vypsané v `package.json` v části `dependencies`.

- Nastav pomocné skripty pro sestavení projektu a spuštění vývojového režimu. Uprav část `scripts` následovně:

  ```json
  "scripts": {
  	"watch:sass": "sass --watch src/styly/index.scss dist/index.css",
  	"build:sass": "sass src/styly/index.scss dist/index.css",
  	"watch:eleventy": "eleventy --serve",
  	"build:eleventy": "eleventy",
  	"dev": "npm-run-all build:sass --parallel watch:*",
  	"build": "npm-run-all build:*"
  },
  ```

### Nastav Eleventy

- Do kořenové složky projektu přidej soubor `.eleventy.js` s konfigurací Eleventy.

- Obsah by měl vycházet ze společného základu, který používáme i na ostatních projektech. Eleventy se z konfigurace dozví, kde má hledat které složky a kam má uložit výsledek.

  ```js
  module.exports = function (eleventyConfig) {
  	eleventyConfig.addPassthroughCopy('src/obrazky')

  	eleventyConfig.addWatchTarget('dist/*.css')
  	eleventyConfig.setBrowserSyncConfig({
  		files: ['dist/*.css'],
  	})

  	return {
  		dir: {
  			input: 'src',
  			output: 'dist',
  			includes: 'casti',
  			data: 'data',
  			layouts: 'layouty',
  			passthroughFileCopy: true,
  			templateFormats: ['html', 'njk', 'md'],
  			htmlTemplateEngine: 'njk',
  			markdownTemplateEngine: 'njk',
  		},
  	}
  }
  ```

### První spuštění

Už chybí málo, aby šel projekt otevřít v internetovém prohlížeči. V dalších krocích vytvoř zjednodušenou úvodní stránku.

- Založ složku `src` a přidej do ní soubor `index.njk` s testovacím obsahem.

  ```html
  <h1>Zkouška úvodní stránky</h1>
  ```

- Přidej ještě stylový soubor `src/styly/index.scss`, který zatím může zůstat prázdný.

- Nastartuj vývojový režim příkazem `npm run dev` a zkontroluj, že se ti pokusný nadpis ukáže v prohlížeči. Vývojový server poběží pravděpodobně na adrese [localhost:8080](http://localhost:8080/).

### Layout

Všechny stránky/podstránky jednoho webu mívají společný HTML základ, který se opakuje. Je nepraktické stejný kód psát několikrát znovu.

- Přidej nový layout do souboru `src/layouty/zakladni.njk`.

- Nech si Emmetem vytvořit počáteční kód `! + [tab]`.

  ```html
  <!DOCTYPE html>
  <html lang="en">
  	<head>
  		<meta charset="UTF-8" />
  		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  		<title>Document</title>
  	</head>
  	<body></body>
  </html>
  ```

- Obsah webu bude česky. Uprav tedy `lang="en"` na `lang="cs"`.

- Název stránky uvnitř `<title>` změň na `FILMY.cz`.

- Do `<body>` vlož značku pro výpis obsahu jednotlivých podstránek.

  ```liquid
  <body>{{ content | safe }}</body>
  ```

- Doplň do `index.njk` Front Matter, aby úvodní stránka používala nový layout.

  ```liquid
  ---
  layout: zakladni
  ---

  <h1>Zkouška úvodní stránky</h1>
  ```

- Pro kontrolu koukni, že se změnil název záložky z něčeho jako `localhost:8080` na `FILMY.cz`.

### První styly

- Do složky `src/styly` přidej soubor `obecne.scss`.

- Do něho přijdou obecné styly, které se netýkají žádné konkrétní komponenty. Můžeš začít s následujícím kódem.

  ```scss
  html {
  	box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
  	box-sizing: inherit;
  }

  body {
  	font-family: 'Roboto', sans-serif;
  }
  ```

- Nový stylový soubor nezapomeň importovat do `index.scss`, ze kterého se složí výsledné CSS.

  ```scss
  @import 'obecne';
  ```

- Styly včetně změny na bezpatkový font se hned neprojeví. Musíš na CSS ještě odkázat v layoutu `zakladni.njk`. Do `<head>` přidej `<link rel="stylesheet" href="/index.css">`.

- Zkontroluj, že se použitý font na stránce změnil.

### Hlavička

Tvým dalším úkolem bude přidat na stránku záhlaví s barevným pozadím a odkazem s logem, které po kliknutí vždy přesměruje uživatele na úvodní stránku.

- Přidej složku `src/casti` a v ní vytvoř soubor `hlavicka.njk`.

  ```html
  <header class="hlavicka">Záhlaví</header>
  ```

- Pomocí `{% include "hlavicka.njk" %}` vlož novou část do `<body>` těsně nad obsah `{{ content | safe }}`.

- Záhlaví by se mělo hned objevit na úvodní stránce v prohlížeči.

- Vytvoř novou stylovou komponentu ve složce `src/styly/komponenty`. Pojmenuj ji `hlavicka.scss`. Uvnitř zatím jen změň barvu pozadí.

  ```scss
  .hlavicka {
  	background-color: #9c27b0;
  }
  ```

- Aby se styl projevil, nezapomeň ho zase importovat v `index.scss` pomocí `@import 'komponenty/hlavicka.scss';`

- Do obsahu hlavičky vlož odkaz s `href="/"` a obrázkem [logo.svg](zadani/logo.svg), které přesuň ze složky `zadani` do nové `src/obrazky`.

  ```html
  <header class="hlavicka">
  	<a href="/">
  		<img src="/obrazky/logo.svg" width="214" height="32" alt="logo" />
  	</a>
  </header>
  ```

- Hlavičku dostyluj tak, aby vypadala jako v ukázce. Budeš muset upravit hlavně soubory `hlavicka.scss` a `hlavicka.njk`. (Aby se pozadí hlavičky roztáhlo až do okrajů stránky, přidej do `obecne.scss` pod `body` `margin: 0;`)

### Data

V následujících úkolech budeš do stránky zapojovat data. Aby sis nemusela vymýšlet vlastní, můžeš si půjčit výběr s popisky několika filmů inspirovaný databází [ČSFD.cz](https://www.csfd.cz/).

- Vytvoř složku `src/data` a přesuň do ní soubor [filmy.json](zadani/filmy.json).

- Na úvodní stránce vypiš odrážkový seznam všech filmů pomocí smyčky `for`.

  ```liquid
  <ul>
  	{% for film in filmy %}
  		<li>{{ film.nazev }}</li>
  	{% endfor %}
  </ul>
  ```

- Ověř, že se v prohlížeči objevil seznam filmů.

- Z názvů filmů udělej odkazy `<a href="/film/{{ film.nazev | slug }}">{{ film.nazev }}</a>`. Povedou zatím na neexistující detailové podstránky.

- Ke stylování se můžeš vrátit později.

### Detail filmu

- Vedle `index.njk` vytvoř soubor `film.njk`, který bude sloužit jako šablona pro detail filmu.

- Ve Front Matter použij společný layout a nastav, odkud se mají brát data jednotlivých filmů.

  ```liquid
  ---
  layout: zakladni
  pagination:
    data: filmy
    size: 1
    alias: film
  permalink: "/film/{{ film.nazev | slug }}/"
  ---

  <h2>{{ film.nazev }}</h2>
  ```

- Vyzkoušej, že se dá z úvodní stránky na jednotlivé filmy proklikávat a že logo v hlavičce vede zpět na úvodní stránku.

### Netlify

- Nasaď aktuální verzi projektu na [Netlify](https://www.netlify.com/).

  - Pro Build command nech přednastavený `npm run build`.

  - Publish directory změň z `_site` na `dist`.

  - Automatické nasazení nejnovější verze po pushi/nahrání do repozitáře nech zapnuté.

- Odkaz na výslednou stránku končící na `.netlify.app` přidej do popisku repozitáře na GitHubu, aby bylo snazší odkaz najít.

- Nezapomeň zkontrolovat, že se web úspěšně nasadil a obsahuje všechny tvé změny, logo, seznam filmů atd.

### Další

Tímto bys měla mít nachystanou základní strukturu postavenou na Eleventy. Pro další úkoly si můžeš vybrat vlastní pořadí, ve kterém je budeš vypracovávat. Postup je už více na tobě.

- Do složky se styly můžeš přidat soubor na proměnné, které se ti budou hodit ve více souborech. (Tahle část je volitelná, protože proměnných je jen pár.)

  ```scss
  $sirka-obsahu: 50rem;
  $mezera-od-okraju: 1rem;

  $font: 'Roboto', sans-serif;

  $hlavni-barva: #9c27b0;
  $doplnkova-barva: #3d5afe;
  ```

- Obsah, kromě barev v pozadí, by neměl přesáhnout šířku `50rem` (800 pixelů).

- Části webu, zejména ty opakující se, děl na menší soubory do složek `src/casti` a `src/styly/komponenty`.

- Přidej zápatí, patičku s dvěma sloupci. V první vypiš odkazy z datového souboru `podobneWeby.json`. V druhém se odkaž na podstránku `/puvod-dat/`, na stránku s dokumentací Eleventy a na stránku se zadáním cvičení. Na menších obrazovkách nech sloupce pod sebou.

- Přidej stránku `/puvod-dat/` s poznámkou, že data o filmech pochází z [ČSFD.cz](https://www.csfd.cz/).

- Na detailu filmu vypiš kromě názvu i rok, zemi, žánr, délku a obsah.

  - Všimni si, že žánr a země můžou obsahovat více hodnot. Spoj je dohromady pomocí filtru `join`.

  - Délka je udávaná v minutách.

- Použij font `Roboto` z [Google Fonts](https://fonts.google.com/specimen/Roboto). Budeš potřebovat variantu `Regular 400`, `Regular 400 italic` a `Bold 700`.

- Zkontroluj, že i tvá poslední verze se propsala do Netlify.

## Bonus

- Přidej stránce favicon ze souboru [favicon.svg](zadani/favicon.svg).

  - Přesuň ho do složky s obrázky.

  - V layoutu se na obrázek odkaž pomocí `<link rel="shortcut icon" href="/obrazky/favicon.svg"/>`.

- Doplň na detailech filmu boční sloupec. Přidej do něj obrázek plakátu, hvězdičkové hodnocení a odkazy na související filmy, pokud nějaké jsou.

  - Pokud píšeš styly pomocí metodiky BEM, na hvězdičky můžeš použít modifier. Například `class="hvezdy hvezdy--skore-{{ hodnoceni }}"`.

  - Pro seznam souvisejících filmů použij stejnou šablonu jako pro výpis na úvodní stránce.

  - Pokud film nemá žádné související, seznam ani podnadpis vůbec nevypisuj.

- Přidej za obsah filmu do závorek jméno autora s odkazem. Pozor na to, že někteří autoři odkaz nemají. Pro ty vypiš v závorkách jen jméno.

- Vyber si na [ČSFD.cz](https://www.csfd.cz/) libovolný film a přidej informace o něm do `filmy.json`.

- Zařiď, aby na větších obrazovkách byla patička u spodní hrany okna, pokud se tam vejde, ale nikdy nepřekrývala ostatní obsah.
