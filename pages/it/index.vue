<template>
  <div ref="root">
    <div class="band">

      <section class="hero">
        <div class="hero-text">
          <div class="hero-title" data-reveal>
            <h1>B&amp;B Cuore di Bosco</h1>
            <img class="hero-logo" :src="logo" alt="">
          </div>
          <p class="tagline" data-reveal>Ritrova il tuo tempo, riscopri la pace.</p>
          <p class="lead" data-reveal>B&amp;B Cuore di Bosco è la nostra e la vostra casa in montagna, un rifugio di pace e quiete dove riposare mente e cuore.</p>
          <div class="hero-actions">
            <NuxtLink class="button button-light" to="/it/prenota" no-prefetch>Prenota il tuo soggiorno</NuxtLink>
            <NuxtLink class="button button-quiet" to="#camere" no-prefetch>Le camere</NuxtLink>
          </div>
        </div>
        <figure class="hero-photo">
          <img src="/images/home/altopiano-2000.webp" alt="I prati verdi e le montagne dell'Altopiano di Brentonico">
        </figure>
      </section>
    </div>

    <div>
      <section class="welcome">
        <img src="/images/home/casa-1600.webp" alt="La casa in pietra del B&B Cuore di Bosco a Prada" loading="lazy">
        <div class="welcome-text" data-reveal>
          <h2>Benvenuti</h2>
          <p class="lead">Benvenuti al <strong>B&amp;B Cuore di Bosco</strong>, un rifugio immerso nella natura della <strong>Vallagarina</strong>, sull’<strong>Altopiano di Brentonico, il giardino d’Europa</strong>. Circondati da rigogliose montagne, il tempo rallenta e la tranquillità regna sovrana.</p>
          <p>Il B&amp;B è facilmente raggiungibile in auto dall’<strong>uscita di Rovereto Sud</strong> dell’autostrada A22 e rappresenta un punto di partenza ideale per esplorare il <strong>Monte Baldo</strong> in ogni stagione.</p>
          <p>La casa, realizzata in pietra e arredata con legno e materiali naturali, offre ambienti caldi e curati, dove ogni dettaglio racconta un profondo legame con la <strong>montagna</strong> e con uno stile di vita più lento e consapevole. L’accoglienza è semplice e autentica, pensata per far sentire gli <strong>ospiti</strong> a proprio agio fin dal primo momento.</p>
          <p>Le camere sono spaziose e luminose, ideali sia per <strong>coppie</strong> sia per <strong>famiglie</strong>. Offrono comfort moderni, <strong>bagno e balcone privati</strong>, biancheria inclusa e un’atmosfera rilassante che invita al riposo. Su richiesta sono disponibili dotazioni dedicate ai più piccoli, per garantire un soggiorno sereno anche a chi viaggia con <strong>bambini</strong>.</p>
        </div>
      </section>

      <section class="wrap rooms" id="camere">
        <div class="rooms-head" data-reveal>
          <h2>Le nostre camere</h2>
          <NuxtLink class="button" to="/it/prenota" no-prefetch>Verifica le date</NuxtLink>
        </div>
        <p class="rooms-family" data-reveal>Culla gratis · 1° bambino gratis · 2° bambino al 50% · &lt;12 anni</p>
        <article class="room">
          <div class="room-photos" data-reveal>
            <img src="/images/home/lampone-camera-1600.webp" alt="La camera Lampone" loading="lazy">
            <img src="/images/home/lampone-finestra-700.webp" alt="La finestra di Lampone sulle montagne" loading="lazy">
            <img src="/images/home/lampone-angolo-960.webp" alt="L’angolo in legno con il bollitore nella camera Lampone" loading="lazy">
          </div>
          <div data-reveal>
            <h3>Lampone</h3>
            <p class="lead">Spaziosa e accogliente, adatta a famiglie che desiderano comfort e tranquillità.</p>
            <ul class="room-features">
              <li>Colazione inclusa</li>
              <li>Bagno privato in camera</li>
              <li>Balcone privato con stendino e sdraio</li>
              <li>Angolo bollitore attrezzato</li>
              <li>Prodotti per igiene personale e biancheria inclusi</li>
              <li>Pulizie incluse</li>
            </ul>
            <p class="beds">Da 2 a 4 posti letto adulti</p>
            <div class="room-actions">
              <NuxtLink class="button button-quiet" to="/it/prenota#lampone" no-prefetch>Dettagli</NuxtLink>
              <NuxtLink class="button" to="/it/prenota" no-prefetch>Prenota</NuxtLink>
            </div>
          </div>
        </article>
        <article class="room">
          <div class="room-photos" data-reveal>
            <img src="/images/home/mirtillo-camera-1280.webp" alt="La camera Mirtillo" loading="lazy">
            <img src="/images/home/mirtillo-armadio-700.webp" alt="La camera Mirtillo con l'armadio dipinto" loading="lazy">
            <img src="/images/home/porta-libri-700.webp" alt="La porta con il portalibri" loading="lazy">
          </div>
          <div data-reveal>
            <h3>Mirtillo</h3>
            <p class="lead">Fresca e luminosa, perfetta per chi ama la natura.</p>
            <ul class="room-features">
              <li>Colazione inclusa</li>
              <li>Bagno privato in camera</li>
              <li>Balcone privato con stendino e sdraio</li>
              <li>Angolo bollitore attrezzato</li>
              <li>Prodotti per igiene personale e biancheria inclusi</li>
              <li>Pulizie incluse</li>
            </ul>
            <p class="beds">Da 2 a 4 posti letto adulti</p>
            <div class="room-actions">
              <NuxtLink class="button button-quiet" to="/it/prenota#mirtillo" no-prefetch>Dettagli</NuxtLink>
              <NuxtLink class="button" to="/it/prenota" no-prefetch>Prenota</NuxtLink>
            </div>
          </div>
        </article>
      </section>

      <section class="band breakfast" id="colazione">
        <div class="breakfast-photo"><img src="/images/home/colazione-1280.webp" alt="La colazione con la torta fatta in casa" loading="lazy"></div>
        <div class="breakfast-text" data-reveal>
          <h2>A colazione da noi</h2>
          <p class="lead">La colazione a casa nostra è un momento speciale, da gustare con calma e in buona compagnia. Ogni mattina prepariamo con cura un buffet ricco di bontà: dolci casalinghi, pane fresco, salumi e formaggi del territorio, frutta di stagione e qualcosa di goloso per iniziare la giornata col sorriso.</p>
          <p>È possibile scegliere tra proposte dolci o salate e segnalare eventuali intolleranze o preferenze alimentari, così da trovare sempre una colazione adatta alle proprie esigenze. Su richiesta, la colazione può essere servita direttamente in camera, per godersi un risveglio ancora più lento, accompagnato dal profumo del legno e dalla luce del bosco che entra dalle finestre.</p>
          <p>Grande attenzione è riservata alla qualità degli ingredienti, selezionati privilegiando produttori locali, per offrire sapori autentici e un’esperienza che racconta il territorio fin dal primo mattino.</p>
          <p>E se ami i prodotti dei nostri produttori locali siamo a disposizione per ordinarli e farteli trovare per portare la Vallagarina a casa con te al rientro! Marmellate, sciroppi, erbe, tisane, miele, farine e tanto altro!</p>
        </div>
      </section>

      <section class="everyone">
        <div class="wrap">
          <div class="everyone-head" data-reveal>
            <h2>Una casa aperta a tutti</h2>
            <p class="lead">Camminatori, amanti della natura e dei paesaggi, famiglie, amici: qui c’è posto per ognuno.</p>
          </div>
          <div class="guests">
            <article class="guest guest-sport" data-reveal>
              <img src="/images/home/bosco-900.webp" alt="Un sentiero nel bosco vicino a Prada" loading="lazy">
              <div>
                <h3>Sport e natura</h3>
                <p>La posizione è perfetta per chi ama la natura e le attività all’aria aperta in ogni stagione. Nei mesi invernali, in pochi minuti è possibile raggiungere le <strong>località sciistiche</strong> di Polsa, San Valentino e San Giacomo.</p>
                <p>Per chi ama lo sport, a pochi minuti ci sono il <strong>bike park di Polsa</strong> e il <strong>Parco Family Adventure Polsa</strong>, mentre il <strong>Canyon della Sorna</strong>, le <strong>arrampicate</strong> e il <strong>trekking</strong> permettono di vivere la montagna in modo attivo. Sull’Altopiano si svolgono inoltre <strong>campi scuola e ritiri sportivi</strong>.</p>
              </div>
            </article>
            <article class="guest guest-nature" data-reveal>
              <img src="/images/home/prada-1280.webp" alt="Il paese di Prada tra le vigne e le montagne" loading="lazy">
              <div>
                <h3>Per chi ama la natura e i paesaggi</h3>
                <p>A pochi minuti da Brentonico, <strong>Prada</strong> è una piccola frazione di montagna nel cuore del <strong>Parco Naturale del Monte Baldo</strong>, un luogo tranquillo ma facile da raggiungere, ottimo punto per escursioni e attività di ogni genere.</p>
                <p>Dai sentieri facili per passeggiate con <strong>bambini</strong> ai percorsi panoramici per <strong>trekking</strong>, ogni camminata offre scenari mozzafiato immersi nella natura del <strong>Monte Baldo</strong> e dei boschi circostanti.</p>
              </div>
            </article>
            <article class="guest" data-reveal>
              <figure class="guest-photo">
                <img src="/images/home/famiglia-castione-1280.webp" alt="Una famiglia nel bosco di Castione in autunno" loading="lazy">
                <figcaption class="photo-credit">Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Graziano Galvagni</figcaption>
              </figure>
              <div>
                <h3>Per le famiglie</h3>
                <p>Sappiamo bene quanto è complicato spostarsi e rilassarsi con uno o più figli! Per questo abbiamo cercato di rendere la vita più facile e la vacanza più rilassata ai genitori! Abbiamo tutto quello che serve, dimezzate i bagagli!</p>
                <p>Lettino, sponde per letto, fasciatoio, vasini, seggiolone, scaldabiberon o microonde a disposizione in sala colazione, frigobar in camera lampone, passeggino, marsupio 6/36 mesi o preschool 3-6 anni o fasce, scaletta o gradino per il bagno, piattini, posate e bicchieri da bimbi, libreria ed angolo giochi attrezzato, materiali per colorare, disegnare e adesivi in quantità!</p>
              </div>
            </article>
            <article class="guest guest-nearby" data-reveal>
              <figure class="guest-photo">
                <img src="/images/home/castello-avio-1280.webp" alt="Il castello di Avio tra i cipressi" loading="lazy">
                <figcaption class="photo-credit">Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Martina Vanzo</figcaption>
              </figure>
              <div>
                <h3>A breve distanza</h3>
                <p>In auto è possibile visitare anche <strong>Rovereto</strong> con la sua offerta culturale e <strong>Ala</strong> con il suo antico centro storico e il vicino castello di Avio con il suo scenografico mercatino di Natale. Non lontano c’è anche l’alto <strong>Lago di Garda</strong>, per una giornata tra panorami e borghi affacciati sull’acqua.</p>
                <p>Dalla stazione di Rovereto o Mori sono comodamente raggiungibili in treno anche località più lontane come Verona, Trento, Bolzano. I mezzi pubblici in territorio trentino sono tutti inclusi nella <a href="https://www.visittrentino.info/it/esperienze/trentino-guest-card" target="_blank" rel="noopener">Trentino Guest Card</a> insieme a sconti e convenzioni!</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="band pilgrims" id="cammino">
        <div class="wrap pilgrims-grid">
          <img class="pilgrims-photo" src="/images/home/cammino-san-rocco-960.webp" alt="Il segnavia del Cammino di San Rocco su un muro in pietra" loading="lazy" data-reveal>
          <div class="pilgrims-text" data-reveal>
            <h2>Il Cammino di San Rocco</h2>
            <p class="lead">Il <strong>Cammino di San Rocco</strong> passa proprio davanti alla nostra struttura ed è un suggestivo percorso ad anello di circa 70 km, strutturato in 5 tappe, che unisce storia, natura e cultura tra la Val di Gresta, Mori, Ronzo-Chienis e l’altopiano di Brentonico.</p>
            <p>Attraversa boschi, borghi storici e trincee della Grande Guerra, ed è percorribile tutto l’anno. È possibile ritirare il “passaporto del pellegrino” a Mori e seguire le tracce GPX segnalate dai cartelli SAT. Per maggiori informazioni e per scaricare la mappa <a href="https://camminosanrocco.it/" target="_blank" rel="noopener">vai sul sito ufficiale</a></p>
            <p>Sul passaporto potrai apporre gli 11 timbri ufficiali che incontrerai lungo il Cammino e quelli non ufficiali da scoprire, non dimenticare il nostro!</p>
          </div>
          <div class="pilgrims-welcome" data-reveal>
            <h3>L’accoglienza per i pellegrini</h3>
            <ul>
              <li>Colazione a partire dalle 7</li>
              <li>Sdraio in terrazza e sul balcone panoramico</li>
              <li>Rinfresco all’arrivo</li>
              <li>Stendino e servizio lavanderia</li>
              <li>Asciugascarpe UV a disposizione</li>
              <li>Giochi da tavolo in sala comune</li>
            </ul>
            <p><a href="tel:+393494960228">Chiamaci</a> per accordarci e per la pianificazione della tappa</p>
          </div>
        </div>
      </section>

      <section class="story" id="storia">
        <div class="story-inner">
          <img class="logo" :src="logo" alt="Il logo di Cuore di Bosco: un cuore di legno con frutti di bosco">
          <h2>Tutti i progetti nascono da un sogno</h2>
          <div class="lead">
            <p>Cuore di Bosco nasce da un progetto di vita più serena e meno di fretta per noi e per la nostra famiglia e dal desiderio di condividere un’idea di ospitalità fatta di tempo, attenzione e passione. Un luogo dove sentirsi accolti, respirare la montagna e vivere un’esperienza genuina, in equilibrio tra natura, comfort e autenticità.</p>
          </div>
        </div>
      </section>

      <section class="band reviews">
        <div class="wrap reviews-inner">
          <h2>Cosa dicono i nostri ospiti</h2>
          <a class="button button-quiet" href="https://share.google/WN2W0rEATFBJl1V4G" target="_blank" rel="noopener">Leggi le recensioni su Google</a>
        </div>
      </section>

      <section class="wrap arrive" id="arrivare">
        <div>
          <h2>Come arrivare</h2>
          <p>Cuore di Bosco si trova a Prada di Brentonico, sulla strada per Polsa, facilmente raggiungibile in auto dall’<b>uscita di Rovereto Sud dell’autostrada A22</b>.</p>
          <p>Vi consigliamo di passare da <b>Mori</b> e salire seguendo le indicazioni per l'<b>Altopiano di Brentonico</b> (cartelli marroni). Da Brentonico la SP3, seguendo la direzione Polsa, vi porterà in pochi minuti a Prada, fate attenzione al bivio per Prada sulla sinistra in curva.</p>
          <p>Parcheggiate nel parcheggio libero accanto alla chiesa e al parco giochi, siamo sulla via principale, a pochi passi sulla sinistra!</p>
          <p>Se hai bisogno di aiuto chiamaci!</p>
          <h3>Trovaci con Maps!</h3>
          <p>Scrivi su maps:<br>B&amp;B Cuore di Bosco<br>Via Gardesani, 15 – Prada (TN)<br>o clicca sulla mappa per aprirla in Google Maps<br>e ottenere il percorso.</p>
        </div>
        <div class="map-frame">
          <iframe title="Mappa: B&amp;B Cuore di Bosco, Via Gardesani 15, Prada" loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4628.566893163929!2d10.95615487755049!3d45.80152017108149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4782051cad11ec19%3A0x135a8894e1f97c2d!2sVia%20Gardesani%2C%2015%2C%2038060%20Prada%20TN!5e1!3m2!1sit!2sit!4v1749392711552!5m2!1sit!2sit"></iframe>
          <a class="map-link" href="https://www.google.com/maps/place/Via+Gardesani,+15,+38060+Prada+TN" target="_blank" rel="noopener" aria-label="Apri la mappa in Google Maps"></a>
        </div>
      </section>

      <section class="garden">
        <div class="wrap garden-head" data-reveal>
          <h2>Il giardino d’Europa</h2>
          <p class="lead">Una volta arrivati, vi accoglierà il silenzio e la bellezza dell’Altopiano di Brentonico, con la sua cornice di verdi montagne.</p>
        </div>
        <SitePhotoCarousel :photos="gardenPhotos" label="Fotografie della casa, dell'Altopiano e dei dintorni" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/images/logo_400.webp";

const aptCredit = "Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di";
const ownerCredit = "Photo Mara";

const gardenPhotos = [
  { src: "/images/home/bosco-1920.webp", alt: "Il sentiero nel bosco", caption: "Il bosco di Prada", credit: ownerCredit },
  { src: "/images/home/calanchi-san-giacomo-1200.webp", alt: "I calanchi di San Giacomo in autunno sotto le pareti del Monte Baldo", caption: "Calanchi di San Giacomo", credit: `${aptCredit} Graziano Galvagni` },
  { src: "/images/home/famiglia-castione-1280.webp", alt: "Una famiglia nel bosco di Castione in autunno", caption: "Castione", credit: `${aptCredit} Graziano Galvagni` },
  { src: "/images/home/palazzo-eccheli-baisi-1280.webp", alt: "Il giardino all’italiana di Palazzo Eccheli Baisi a Brentonico", caption: "Palazzo Eccheli Baisi, Brentonico", credit: `${aptCredit} Luca Matassoni` },
  { src: "/images/home/inverno-brentonico-1280.webp", alt: "L’Altopiano di Brentonico innevato", caption: "Inverno a Brentonico", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/trekking-baldo-1280.webp", alt: "Escursionisti su uno sperone di roccia del Monte Baldo in autunno", caption: "Trekking sul Monte Baldo", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/monte-altissimo-1200.webp", alt: "Il Lago di Garda visto dal Monte Altissimo", caption: "Dal Monte Altissimo", credit: "360gardalife. Foto di Angela Trawoeger" },
  { src: "/images/home/forra-sorna-1280.webp", alt: "Un tuffo nelle acque della Forra della Sorna", caption: "Forra della Sorna", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/castello-rovereto-700.webp", alt: "Il Castello di Rovereto e la cascata del Leno", caption: "Castello di Rovereto", credit: `${aptCredit} Luca Matassoni` },
  { src: "/images/home/campana-caduti-700.webp", alt: "La Campana dei Caduti a Rovereto", caption: "Campana dei Caduti, Rovereto", credit: "APT Rovereto Vallagarina. Foto di Luca Matassoni" },
  { src: "/images/home/castello-avio-1280.webp", alt: "Il castello di Avio tra i cipressi", caption: "Castello di Avio", credit: `${aptCredit} Martina Vanzo` },
  { src: "/images/home/primavera-prato-1280.webp", alt: "Un prato fiorito in primavera tra gli alberi e le colline verdi, sotto le nuvole bianche", caption: "Prati in fiore", credit: ownerCredit },
  { src: "/images/home/estate-arcobaleno-1280.webp", alt: "Una strada bianca tra i prati verdi sotto un cielo di pioggia con l’arcobaleno", caption: "Arcobaleno d’estate", credit: ownerCredit },
  { src: "/images/home/autunno-nuvole-1280.webp", alt: "Nuvole d’autunno tra i paesi e le montagne, viste da un balcone sopra i prati", caption: "Paesaggio d’autunno", credit: ownerCredit },
  { src: "/images/home/inverno-nuvole-1280.webp", alt: "Prati innevati e un mare di nuvole sotto le montagne, visti da un balcone", caption: "Neve e nuvole d’inverno", credit: ownerCredit },
  { src: "/images/home/casa-1600.webp", alt: "La casa in pietra", caption: "B&B Cuore di Bosco", credit: ownerCredit },
];

useHead({
  title: "B&B Cuore di Bosco | Vacanze in montagna per famiglie - Brentonico, Trentino",
  meta: [
    {
      name: "description",
      content:
        "B&B per famiglie sull’Altopiano di Brentonico, Trentino. Vacanze in montagna con bambini: colazioni genuine, kit bimbo, natura e pace tra i boschi del Parco del Monte Baldo.",
    },
    {
      name: "keywords",
      content:
        "b&b per famiglie, vacanze montagna con bambini, bed and breakfast Brentonico, montagna bambini gratis, vacanze Trentino famiglie, b&b bambini Trentino, Altopiano di Brentonico, colazione genuina, Cuore di Bosco, Monte Baldo, family hotel Trentino",
    },
    {
      property: "og:title",
      content: "B&B Cuore di Bosco - Vacanze per famiglie tra i boschi di Brentonico",
    },
    {
      property: "og:description",
      content:
        "B&B ideale per famiglie con bambini sull’Altopiano di Brentonico. Colazioni fatte in casa, kit bimbo, bici e tanto spazio nella natura del Trentino.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/it",
    },
    {
      property: "og:image",
      content: "https://www.cuoredibosco.it/images/cuore-casa.webp",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "B&B Cuore di Bosco - Vacanze in montagna per famiglie",
    },
    {
      name: "twitter:description",
      content:
        "B&B per famiglie con bambini sull'Altopiano di Brentonico. Natura, colazioni genuine e servizi dedicati ai piccoli.",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.cuoredibosco.it/it" }],
});

const root = ref<HTMLElement | null>(null);
useReveal(root);
</script>

<style scoped src="../../assets/css/pages/home.css"></style>
