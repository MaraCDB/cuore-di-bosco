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
          <p>La nostra casa in pietra, con arredi in legno e dettagli curati, offre un’accoglienza calorosa e autentica. Qui, ogni angolo racconta una storia di semplicità e amore per la montagna.</p>
        </div>
      </section>

      <section class="everyone">
        <div class="wrap">
          <div class="everyone-head" data-reveal>
            <h2>Una casa aperta a tutti</h2>
            <p class="lead">Camminatori, amanti della natura e dei paesaggi, famiglie, amici: qui c’è posto per ognuno.</p>
          </div>
          <div class="guests">
            <article class="guest-walkers" data-reveal>
              <img src="/images/home/bosco-1920.webp" alt="Un sentiero nel bosco vicino a Prada" loading="lazy">
              <h3>Per chi cammina</h3>
              <p>Dai sentieri facili per passeggiate con bambini ai percorsi panoramici per trekking, ogni camminata offre scenari mozzafiato immersi nella natura del Monte Baldo e dei boschi circostanti.</p>
              <ul>
                <li>Servizio deposito bici / scarponi / sci e altro materiale</li>
              </ul>
            </article>
            <article class="guest-side" data-reveal>
              <img src="/images/home/prada-700.webp" alt="Il paese di Prada tra le vigne e le montagne" loading="lazy">
              <div>
                <h3>Per chi ama la natura e i paesaggi</h3>
                <p>A pochi minuti da Brentonico, <strong>Prada</strong> è una piccola frazione di montagna nel cuore del <strong>Parco Naturale del Monte Baldo</strong>, un luogo tranquillo ma facile da raggiungere, ottimo punto per escursioni e attività di ogni genere.</p>
              </div>
            </article>
            <article class="guest-side" data-reveal>
              <img src="/images/home/porta-libri-700.webp" alt="La porta di casa con il portalibri per i bambini" loading="lazy">
              <div>
                <h3>Per le famiglie</h3>
                <p>Sappiamo bene quanto è complicato spostarsi e rilassarsi con uno o più figli! Per questo abbiamo cercato di rendere la vita più facile e la vacanza più rilassata ai genitori!</p>
                <NuxtLink to="/it/prenota" no-prefetch>Il nostro baby kit</NuxtLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="band pilgrims" id="cammino">
        <div class="wrap pilgrims-grid">
          <img class="pilgrims-photo" src="/images/home/cammino-san-rocco-960.webp" alt="Il segnavia del Cammino di San Rocco su un muro in pietra" loading="lazy" data-reveal>
          <div data-reveal>
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

      <section class="wrap rooms" id="camere">
        <div class="rooms-head" data-reveal>
          <h2>Le nostre camere</h2>
          <NuxtLink class="button" to="/it/prenota" no-prefetch>Verifica le date</NuxtLink>
        </div>
        <article class="room">
          <div class="room-photos" data-reveal>
            <img src="/images/home/lampone-camera-1600.webp" alt="La camera Lampone" loading="lazy">
            <img src="/images/home/lampone-finestra-700.webp" alt="La finestra di Lampone sulle montagne" loading="lazy">
            <img src="/images/home/lampone-divano-900.webp" alt="L'angolo con il divano di Lampone" loading="lazy">
          </div>
          <div data-reveal>
            <h3>Lampone</h3>
            <p class="lead">Spaziosa e accogliente, adatta a famiglie che desiderano comfort e tranquillità.</p>
            <ul class="room-features">
              <li>Bagno privato in camera</li>
              <li>Balcone privato con stendino e sdraio</li>
              <li>Angolo bollitore</li>
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
            <img src="/images/home/mirtillo-armadio-960.webp" alt="La camera Mirtillo con l'armadio dipinto" loading="lazy">
            <img src="/images/home/mirtillo-camera-900.webp" alt="La camera Mirtillo" loading="lazy">
            <img src="/images/home/porta-libri-700.webp" alt="La porta con il portalibri" loading="lazy">
          </div>
          <div data-reveal>
            <h3>Mirtillo</h3>
            <p class="lead">Fresca e luminosa, perfetta per chi ama la natura.</p>
            <ul class="room-features">
              <li>Bagno privato in camera</li>
              <li>Balcone privato con stendino e sdraio</li>
              <li>Angolo bollitore</li>
            </ul>
            <p class="beds">Da 2 a 4 posti letto adulti</p>
            <div class="room-actions">
              <NuxtLink class="button button-quiet" to="/it/prenota#mirtillo" no-prefetch>Dettagli</NuxtLink>
              <NuxtLink class="button" to="/it/prenota" no-prefetch>Prenota</NuxtLink>
            </div>
          </div>
        </article>
        <p class="rooms-family" data-reveal>Culla gratis · Primo bambino gratis · Secondo bambino al 50% · Bambini &lt;12 anni</p>
      </section>

      <section class="band breakfast" id="colazione">
        <div class="breakfast-photo"><img src="/images/home/colazione-1280.webp" alt="La colazione con la torta fatta in casa" loading="lazy"></div>
        <div class="breakfast-text" data-reveal>
          <h2>A colazione da noi</h2>
          <p class="lead">La colazione a casa nostra è un momento speciale, da gustare con calma e in buona compagnia. Ogni mattina prepariamo con cura un vassoio ricco di bontà: dolci casalinghi, pane fresco, salumi e formaggi del territorio, frutta di stagione e qualcosa di goloso per iniziare la giornata col sorriso.</p>
          <p>Preferisci il dolce o il salato? Hai intolleranze o preferenze alimentari? Basta farcelo sapere il giorno prima: pensiamo noi a tutto.</p>
          <p>E se vuoi regalarti un risveglio ancora più lento, possiamo portartela in camera, per gustarla con calma, tra il profumo del legno e la luce del bosco che filtra dalle finestre.</p>
          <p>Teniamo moltissimo alla qualità dei nostri ingredienti, e per questo ci riforniamo il più possibile da produttori locali.</p>
        </div>
      </section>

      <section class="garden">
        <div class="wrap garden-head" data-reveal>
          <h2>Il giardino d’Europa</h2>
          <p class="lead">Una volta arrivati, vi accoglierà il silenzio e la bellezza dell’Altopiano di Brentonico, con la sua cornice di verdi montagne.</p>
        </div>
        <div class="photo-row" tabindex="0" aria-label="Fotografie dell'Altopiano e della casa">
          <figure><img src="/images/home/lampone-balcone-1200.webp" alt="Il Monte Baldo innevato visto dal balcone della camera Lampone" loading="lazy"><figcaption>Dal balcone di Lampone</figcaption></figure>
          <figure><img src="/images/home/bosco-1920.webp" alt="Il sentiero nel bosco" loading="lazy"><figcaption>Il bosco</figcaption></figure>
          <figure><img src="/images/home/lampone-finestra-1200.webp" alt="La vista dalla finestra di Lampone" loading="lazy"><figcaption>Dalla finestra di Lampone</figcaption></figure>
          <figure><img src="/images/home/casa-1600.webp" alt="La casa in pietra" loading="lazy"><figcaption>Via Gardesani 15, Prada</figcaption></figure>
        </div>
      </section>

      <section class="story" id="storia">
        <div class="story-inner">
          <img class="logo" :src="logo" alt="Il logo di Cuore di Bosco: un cuore di legno con frutti di bosco">
          <h2>Tutti i progetti nascono da un sogno</h2>
          <div class="lead">
            <p>La volontà di una vita più serena e meno di fretta per noi e per la nostra famiglia ci ha portato ad un cambio di vita completo, dalla brulicante ed asfaltata pianura padana all’Altopiano di Brentonico.</p>
            <p>E’ stato amore a prima vista. Il nostro posto. Noi ci siamo ripresi il nostro tempo lento e la nostra pace, unitevi anche voi!</p>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/images/logo_400.webp";

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

<style scoped>
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:min(calc(100svh - 84px),780px)}
.hero-text{align-self:center;padding:48px clamp(32px,4vw,64px) 72px max(var(--margin),calc((100vw - var(--page-max)) / 2 + var(--margin)))}
.hero h1{font-size:var(--step-display);line-height:1;color:var(--on-forest)}
.hero-title{display:flex;align-items:center;justify-content:space-between;gap:clamp(16px,2vw,32px)}
.hero-logo{width:clamp(72px,8.5vw,128px);height:auto;flex:none}
.hero .tagline{font-family:var(--sub);font-size:var(--step-tagline);font-weight:300;line-height:1.25;margin:28px 0 0;text-wrap:balance}
.hero .lead{margin:20px 0 40px;max-width:34ch}
.hero-actions{display:flex;flex-wrap:wrap;gap:12px}
.hero-photo{margin:0;position:relative}
.hero-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:40% 70%}

.welcome{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center}
.welcome img{width:100%;aspect-ratio:4/3;object-fit:cover;object-position:50% 0}
.welcome h2{margin-bottom:20px}
.welcome,.everyone,.pilgrims{font-family:var(--sub)}

.everyone{background:var(--champagne);padding:var(--band-pad) 0}
.everyone-head{display:grid;grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:clamp(32px,5vw,96px);align-items:end}
.everyone-head .lead{margin:0}
.guests{display:grid;grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:clamp(40px,5vw,64px) clamp(32px,5vw,96px);margin-top:28px}
.guest-walkers{grid-row:1 / span 2}
.guest-walkers img{width:100%;aspect-ratio:4/3;object-fit:cover;margin-bottom:28px}
.guest-side{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:24px;align-items:start}
.guest-side img{width:100%;aspect-ratio:4/5;object-fit:cover}
.guests h3{margin-bottom:10px}
.guests ul{margin:16px 0 0;padding-left:1.1em}
.guests li{margin-bottom:6px}
.guests li::marker{color:var(--meadow)}

.rooms{margin-top:var(--section-gap)}
.rooms-head{display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap}
.room{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(32px,5vw,96px);align-items:center;margin-top:32px}
.room:nth-of-type(even){grid-template-columns:minmax(0,5fr) minmax(0,7fr)}
.room:nth-of-type(even) .room-photos{order:2}
.room-photos{display:grid;grid-template-columns:2fr 1fr;gap:6px}
.room-photos img{width:100%;height:100%;min-height:200px;object-fit:cover}
.room-photos img:first-child{grid-row:span 2;aspect-ratio:4/4.4}
.room h3{font-family:var(--display);font-weight:var(--display-weight);font-size:var(--step-head);line-height:1.05;color:var(--forest)}
.room .lead{margin:12px 0 20px}
.room .beds{display:inline-block;margin:8px 0 0;padding:8px 18px;border-radius:999px;background:var(--champagne);color:var(--forest-deep);font-weight:600}
.room-features{margin:0 0 12px;padding-left:1.1em}
.room-features li{margin-bottom:8px}
.room-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
.rooms-family{margin:32px 0 0;text-align:center;font-family:var(--sub);font-weight:600;color:var(--forest-deep)}

.breakfast{margin-top:var(--section-gap);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
.breakfast-photo{position:relative;min-height:520px}
.breakfast-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.breakfast-text,.welcome-text{padding:var(--band-pad) max(var(--margin),calc((100vw - var(--page-max)) / 2 + var(--margin))) var(--band-pad) clamp(32px,5vw,96px)}
.breakfast-text h2{margin-bottom:24px}

.pilgrims{padding:var(--band-pad) 0}
.pilgrims-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:20px clamp(32px,5vw,96px);align-items:center}
.pilgrims-photo{grid-row:span 2;width:100%;aspect-ratio:3/4;object-fit:cover;object-position:30% 70%}
.pilgrims h2{margin-bottom:24px}
.pilgrims-welcome{background:var(--forest-deep);padding:clamp(28px,3vw,48px)}
.pilgrims-welcome ul{margin:16px 0 0;padding-left:1.1em}
.pilgrims-welcome li{margin-bottom:8px}
.pilgrims-welcome li::marker{color:var(--lime)}
.pilgrims-welcome p{margin:16px 0 0}

.garden{margin-top:var(--section-gap)}
.garden-head{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:clamp(32px,5vw,96px);align-items:end}
.garden-head p{margin:0}
.photo-row{display:flex;gap:6px;height:min(64svh,620px);margin:24px auto 0;max-width:var(--page-max);padding:0 var(--margin) 20px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding:0 var(--margin)}
.photo-row figure{flex:none;height:100%;margin:0;scroll-snap-align:start;display:flex;flex-direction:column;gap:10px}
.photo-row img{height:calc(100% - 36px);width:auto;object-fit:cover}
.photo-row figcaption{font-size:var(--step-small);color:var(--muted)}

.story{background:var(--champagne);margin-top:var(--section-gap);padding:var(--band-pad) var(--margin);text-align:center}
.story-inner{max-width:46rem;margin:0 auto}
.story .logo{width:150px;margin:0 auto 24px}
.story h2{margin-bottom:28px}

.reviews{margin-top:var(--section-gap);padding:clamp(20px,2vw,32px) 0}
.reviews-inner{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}

.arrive{margin-top:var(--section-gap);margin-bottom:var(--section-gap);display:grid;grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:clamp(32px,5vw,96px);align-items:stretch}
.arrive h2{margin-bottom:20px}
.arrive h3{margin:36px 0 10px}
.map-frame{position:relative;min-height:440px}
.map-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.map-link{position:absolute;inset:0}
@media (max-width:900px){
  .hero,.welcome,.everyone-head,.pilgrims-grid,.guests,.room,.room:nth-of-type(even),.breakfast,.garden-head,.arrive{grid-template-columns:minmax(0,1fr)}
  .hero{min-height:0}
  .hero-photo,.breakfast-photo{aspect-ratio:4/3;min-height:0}
  .hero-photo{order:-1}
  .hero-text,.breakfast-text,.welcome-text{padding:24px var(--margin) 32px}
  .guest-walkers{grid-row:auto}
  .pilgrims-photo{grid-row:auto;aspect-ratio:4/5}
  .room:nth-of-type(even) .room-photos{order:0}
  .photo-row{height:56svh}
  .map-frame{min-height:320px}
}
@media (max-width:520px){
  .guest-side{grid-template-columns:minmax(0,1fr)}
  .hero-logo{width:60px}
  .guest-side img{aspect-ratio:16/10}
}
</style>
