<template>
  <div ref="root">
    <div class="band">

      <section class="hero">
        <div class="hero-text">
          <div class="hero-title" data-reveal>
            <h1>B&amp;B Cuore di Bosco</h1>
            <img class="hero-logo" :src="logo" alt="">
          </div>
          <p class="tagline" data-reveal>Finden Sie Ihre Zeit wieder, entdecken Sie den Frieden neu.</p>
          <p class="lead" data-reveal>Das B&amp;B Cuore di Bosco ist unser und Ihr Zuhause in den Bergen, ein friedlicher, stiller Rückzugsort, an dem Kopf und Herz zur Ruhe kommen.</p>
          <div class="hero-actions">
            <NuxtLink class="button button-light" to="/de/buchen" no-prefetch>Buchen Sie Ihren Aufenthalt</NuxtLink>
            <NuxtLink class="button button-quiet" to="#zimmer" no-prefetch>Die Zimmer</NuxtLink>
          </div>
        </div>
        <figure class="hero-photo">
          <img src="/images/home/altopiano-2000.webp" alt="Die grünen Wiesen und Berge der Hochebene von Brentonico">
        </figure>
      </section>
    </div>

    <div>
      <section class="welcome">
        <img src="/images/home/casa-1600.webp" alt="Das Steinhaus des B&B Cuore di Bosco in Prada" loading="lazy">
        <div class="welcome-text" data-reveal>
          <h2>Willkommen</h2>
          <p class="lead">Willkommen im <strong>B&amp;B Cuore di Bosco</strong>, einem Rückzugsort mitten in der Natur der <strong>Vallagarina</strong>, auf der <strong>Hochebene von Brentonico, dem Garten Europas</strong>. Umgeben von üppig grünen Bergen vergeht die Zeit langsamer, und überall herrscht Ruhe.</p>
          <p>Das B&amp;B ist mit dem Auto leicht von der <strong>Ausfahrt Rovereto Sud</strong> der Autobahn A22 aus zu erreichen und ein idealer Ausgangspunkt, um den <strong>Monte Baldo</strong> zu jeder Jahreszeit zu erkunden.</p>
          <p>Das Haus ist aus Stein gebaut und mit Holz und natürlichen Materialien eingerichtet. Es bietet warme, gepflegte Räume, in denen jedes Detail von einer tiefen Verbundenheit mit den <strong>Bergen</strong> und mit einem langsameren, bewussteren Lebensstil erzählt. Der Empfang ist schlicht und authentisch und soll dafür sorgen, dass sich unsere <strong>Gäste</strong> vom ersten Moment an wohlfühlen.</p>
          <p>Die Zimmer sind geräumig und hell, ideal für <strong>Paare</strong> wie für <strong>Familien</strong>. Sie bieten modernen Komfort, ein <strong>eigenes Bad und einen eigenen Balkon</strong>, Bettwäsche inklusive und eine entspannte Atmosphäre, die zum Ausruhen einlädt. Auf Wunsch gibt es Ausstattung speziell für die Kleinsten, damit auch alle, die mit <strong>Kindern</strong> reisen, einen entspannten Aufenthalt haben.</p>
        </div>
      </section>

      <section class="wrap rooms" id="zimmer">
        <div class="rooms-head" data-reveal>
          <h2>Unsere Zimmer</h2>
          <NuxtLink class="button" to="/de/buchen" no-prefetch>Verfügbarkeit prüfen</NuxtLink>
        </div>
        <p class="rooms-family" data-reveal>Babybett kostenlos · 1. Kind kostenlos · 2. Kind 50&nbsp;% · &lt;12 Jahre</p>
        <article class="room">
          <div class="room-photos" data-reveal>
            <img src="/images/home/lampone-camera-1600.webp" alt="Das Zimmer Lampone" loading="lazy">
            <img src="/images/home/lampone-finestra-700.webp" alt="Das Fenster von Lampone mit Blick auf die Berge" loading="lazy">
            <img src="/images/home/lampone-angolo-960.webp" alt="Die Holzecke mit dem Wasserkocher im Zimmer Lampone" loading="lazy">
          </div>
          <div data-reveal>
            <h3>Lampone</h3>
            <p class="lead">Geräumig und gemütlich, ideal für Familien, die Komfort und Ruhe suchen.</p>
            <ul class="room-features">
              <li>Frühstück inklusive</li>
              <li>Eigenes Bad im Zimmer</li>
              <li>Eigener Balkon mit Wäscheständer und Liegestühlen</li>
              <li>Ausgestattete Wasserkocher-Ecke</li>
              <li>Körperpflegeprodukte und Bettwäsche inklusive</li>
              <li>Reinigung inklusive</li>
            </ul>
            <p class="beds">2 bis 4 Schlafplätze für Erwachsene</p>
            <div class="room-actions">
              <NuxtLink class="button button-quiet" to="/de/buchen#lampone" no-prefetch>Details</NuxtLink>
              <NuxtLink class="button" to="/de/buchen" no-prefetch>Buchen</NuxtLink>
            </div>
          </div>
        </article>
        <article class="room">
          <div class="room-photos" data-reveal>
            <img src="/images/home/mirtillo-camera-1280.webp" alt="Das Zimmer Mirtillo" loading="lazy">
            <img src="/images/home/mirtillo-armadio-700.webp" alt="Das Zimmer Mirtillo mit dem bemalten Kleiderschrank" loading="lazy">
            <img src="/images/home/porta-libri-700.webp" alt="Die Tür mit dem Bücherregal" loading="lazy">
          </div>
          <div data-reveal>
            <h3>Mirtillo</h3>
            <p class="lead">Frisch und hell, perfekt für alle, die die Natur lieben.</p>
            <ul class="room-features">
              <li>Frühstück inklusive</li>
              <li>Eigenes Bad im Zimmer</li>
              <li>Eigener Balkon mit Wäscheständer und Liegestühlen</li>
              <li>Ausgestattete Wasserkocher-Ecke</li>
              <li>Körperpflegeprodukte und Bettwäsche inklusive</li>
              <li>Reinigung inklusive</li>
            </ul>
            <p class="beds">2 bis 4 Schlafplätze für Erwachsene</p>
            <div class="room-actions">
              <NuxtLink class="button button-quiet" to="/de/buchen#mirtillo" no-prefetch>Details</NuxtLink>
              <NuxtLink class="button" to="/de/buchen" no-prefetch>Buchen</NuxtLink>
            </div>
          </div>
        </article>
      </section>

      <section class="band breakfast" id="fruehstueck">
        <div class="breakfast-photo"><img src="/images/home/colazione-1280.webp" alt="Das Frühstück mit dem hausgemachten Kuchen" loading="lazy"></div>
        <div class="breakfast-text" data-reveal>
          <h2>Frühstück bei uns</h2>
          <p class="lead">Das Frühstück bei uns zu Hause ist ein besonderer Moment, den man in Ruhe und in guter Gesellschaft genießen sollte. Jeden Morgen bereiten wir mit Sorgfalt ein reichhaltiges Buffet voller guter Dinge zu: hausgemachte Kuchen, frisches Brot, Wurst und Käse aus der Region, saisonales Obst und etwas Leckeres, um den Tag mit einem Lächeln zu beginnen.</p>
          <p>Sie können zwischen süßen und herzhaften Angeboten wählen und uns Unverträglichkeiten oder Ernährungswünsche mitteilen, damit Sie immer ein Frühstück finden, das zu Ihren Bedürfnissen passt. Auf Wunsch servieren wir das Frühstück direkt auf dem Zimmer, für ein noch langsameres Aufwachen, begleitet vom Duft des Holzes und vom Licht des Waldes, das durch die Fenster fällt.</p>
          <p>Besonderen Wert legen wir auf die Qualität der Zutaten, die wir bevorzugt von lokalen Erzeugern auswählen, um authentische Aromen und ein Erlebnis zu bieten, das schon am frühen Morgen von der Region erzählt.</p>
          <p>Und wenn Sie die Produkte unserer lokalen Erzeuger mögen, bestellen wir sie gerne für Sie und legen sie bereit, damit Sie bei der Abreise die Vallagarina mit nach Hause nehmen können! Marmeladen, Sirupe, Kräuter, Kräutertees, Honig, Mehl und vieles mehr!</p>
        </div>
      </section>

      <section class="everyone">
        <div class="wrap">
          <div class="everyone-head" data-reveal>
            <h2>Ein Haus, das allen offensteht</h2>
            <p class="lead">Wanderer, Natur- und Landschaftsfreunde, Familien, Freunde: Hier ist Platz für jeden.</p>
          </div>
          <div class="guests">
            <article class="guest guest-sport" data-reveal>
              <img src="/images/home/bosco-900.webp" alt="Ein Waldweg in der Nähe von Prada" loading="lazy">
              <div>
                <h3>Sport und Natur</h3>
                <p>Die Lage ist perfekt für alle, die die Natur und Aktivitäten im Freien zu jeder Jahreszeit lieben. In den Wintermonaten erreichen Sie in wenigen Minuten die <strong>Skigebiete</strong> von Polsa, San Valentino und San Giacomo.</p>
                <p>Für Sportbegeisterte sind der <strong>Bikepark von Polsa</strong> und der <strong>Parco Family Adventure Polsa</strong> nur wenige Minuten entfernt, während Sie mit dem <strong>Canyon della Sorna</strong>, dem <strong>Klettern</strong> und dem <strong>Trekking</strong> die Berge aktiv erleben können. Auf der Hochebene finden außerdem <strong>Schulcamps und Sportlager</strong> statt.</p>
              </div>
            </article>
            <article class="guest guest-nature" data-reveal>
              <img src="/images/home/prada-1280.webp" alt="Das Dorf Prada zwischen Weinbergen und Bergen" loading="lazy">
              <div>
                <h3>Für Natur- und Landschaftsliebhaber</h3>
                <p>Nur wenige Minuten von Brentonico entfernt liegt <strong>Prada</strong>, ein kleiner Bergweiler im Herzen des <strong>Naturparks Monte Baldo</strong>, ein ruhiger und doch leicht erreichbarer Ort, ein ausgezeichneter Ausgangspunkt für Ausflüge und Aktivitäten aller Art.</p>
                <p>Von einfachen Wegen für Spaziergänge mit <strong>Kindern</strong> bis zu aussichtsreichen <strong>Trekking</strong>-Routen bietet jede Wanderung atemberaubende Landschaften inmitten der Natur des <strong>Monte Baldo</strong> und der umliegenden Wälder.</p>
              </div>
            </article>
            <article class="guest" data-reveal>
              <figure class="guest-photo">
                <img src="/images/home/famiglia-castione-1280.webp" alt="Eine Familie im Wald von Castione im Herbst" loading="lazy">
                <figcaption class="photo-credit">Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Graziano Galvagni</figcaption>
              </figure>
              <div>
                <h3>Für Familien</h3>
                <p>Wir wissen genau, wie kompliziert es ist, mit einem oder mehreren Kindern unterwegs zu sein und sich zu erholen! Deshalb haben wir versucht, den Eltern das Leben leichter und den Urlaub entspannter zu machen! Wir haben alles, was Sie brauchen, halbieren Sie Ihr Gepäck!</p>
                <p>Kinderbett, Bettgitter, Wickeltisch, Töpfchen, Hochstuhl, Flaschenwärmer oder Mikrowelle im Frühstücksraum, Minibar im Zimmer Lampone, Kinderwagen, Babytrage für 6–36 Monate oder Kleinkindtrage für 3–6 Jahre oder Tragetücher, Tritthocker oder Stufe fürs Bad, Teller, Besteck und Gläser für Kinder, Bücherregal und gut ausgestattete Spielecke, Material zum Malen und Zeichnen und jede Menge Sticker!</p>
              </div>
            </article>
            <article class="guest guest-nearby" data-reveal>
              <figure class="guest-photo">
                <img src="/images/home/castello-avio-1280.webp" alt="Das Castello di Avio zwischen den Zypressen" loading="lazy">
                <figcaption class="photo-credit">Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Martina Vanzo</figcaption>
              </figure>
              <div>
                <h3>In der Nähe</h3>
                <p>Mit dem Auto erreichen Sie auch <strong>Rovereto</strong> mit seinem kulturellen Angebot und <strong>Ala</strong> mit seinem alten Stadtkern und dem nahen Castello di Avio mit seinem stimmungsvollen Weihnachtsmarkt. Nicht weit entfernt liegt auch der nördliche <strong>Gardasee</strong>, für einen Tag zwischen Panoramen und Dörfern am Wasser.</p>
                <p>Vom Bahnhof Rovereto oder Mori aus erreichen Sie bequem mit dem Zug auch weiter entfernte Orte wie Verona, Trient und Bozen. Alle öffentlichen Verkehrsmittel im Trentino sind in der <a href="https://www.visittrentino.info/it/esperienze/trentino-guest-card" target="_blank" rel="noopener">Trentino Guest Card</a> enthalten, dazu Ermäßigungen und Vergünstigungen!</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="band pilgrims" id="cammino">
        <div class="wrap pilgrims-grid">
          <img class="pilgrims-photo" src="/images/home/cammino-san-rocco-960.webp" alt="Die Wegmarkierung des Cammino di San Rocco an einer Steinmauer" loading="lazy" data-reveal>
          <div class="pilgrims-text" data-reveal>
            <h2>Der Cammino di San Rocco</h2>
            <p class="lead">Der <strong>Cammino di San Rocco</strong> führt direkt an unserem Haus vorbei und ist ein reizvoller Rundweg von etwa 70&nbsp;km in 5 Etappen, der Geschichte, Natur und Kultur im Val di Gresta, in Mori, Ronzo-Chienis und auf der Hochebene von Brentonico verbindet.</p>
            <p>Er führt durch Wälder, historische Dörfer und Schützengräben des Ersten Weltkriegs und ist das ganze Jahr über begehbar. Den „Pilgerpass“ können Sie in Mori abholen und den GPX-Tracks folgen, die von den SAT-Schildern angezeigt werden. Für weitere Informationen und um die Karte herunterzuladen <a href="https://camminosanrocco.it/" target="_blank" rel="noopener">besuchen Sie die offizielle Website</a></p>
            <p>In den Pass können Sie die 11 offiziellen Stempel sammeln, die Sie entlang des Cammino finden, und die inoffiziellen, die es zu entdecken gilt – vergessen Sie nicht unseren!</p>
          </div>
          <div class="pilgrims-welcome" data-reveal>
            <h3>Willkommen für Pilger</h3>
            <ul>
              <li>Frühstück ab 7 Uhr</li>
              <li>Liegestühle auf der Terrasse und auf dem Panoramabalkon</li>
              <li>Erfrischung bei der Ankunft</li>
              <li>Wäscheständer und Wäscheservice</li>
              <li>UV-Schuhtrockner zur Verfügung</li>
              <li>Brettspiele im Gemeinschaftsraum</li>
            </ul>
            <p><a href="tel:+393494960228">Rufen Sie uns an</a>, um alles abzusprechen und Ihre Etappe zu planen</p>
          </div>
        </div>
      </section>

      <section class="story" id="geschichte">
        <div class="story-inner">
          <img class="logo" :src="logo" alt="Das Logo von Cuore di Bosco: ein Herz aus Holz mit Waldbeeren">
          <h2>Alle Projekte entstehen aus einem Traum</h2>
          <div class="lead">
            <p>Cuore di Bosco entstand aus einem Lebensprojekt für ein gelasseneres Leben mit weniger Eile, für uns und für unsere Familie, und aus dem Wunsch, eine Idee von Gastfreundschaft zu teilen, die aus Zeit, Aufmerksamkeit und Leidenschaft besteht. Ein Ort, an dem man sich willkommen fühlt, die Berge atmen kann und ein echtes Erlebnis hat, im Gleichgewicht zwischen Natur, Komfort und Authentizität.</p>
          </div>
        </div>
      </section>

      <section class="band reviews">
        <div class="wrap reviews-inner">
          <h2>Das sagen unsere Gäste</h2>
          <a class="button button-quiet" href="https://share.google/WN2W0rEATFBJl1V4G" target="_blank" rel="noopener">Bewertungen auf Google lesen</a>
        </div>
      </section>

      <section class="wrap arrive" id="anfahrt">
        <div>
          <h2>Anfahrt</h2>
          <p>Cuore di Bosco liegt in Prada di Brentonico, an der Straße nach Polsa, und ist mit dem Auto leicht von der <b>Ausfahrt Rovereto Sud der Autobahn A22</b> aus zu erreichen.</p>
          <p>Wir empfehlen, über <b>Mori</b> zu fahren und den Schildern zur <b>Hochebene von Brentonico</b> (braune Schilder) bergauf zu folgen. Ab Brentonico bringt Sie die SP3 in Richtung Polsa in wenigen Minuten nach Prada; achten Sie auf die Abzweigung nach Prada links in der Kurve.</p>
          <p>Parken Sie auf dem kostenlosen Parkplatz neben der Kirche und dem Spielplatz; wir sind an der Hauptstraße, nur wenige Schritte links!</p>
          <p>Wenn Sie Hilfe brauchen, rufen Sie uns an!</p>
          <h3>Finden Sie uns mit Maps!</h3>
          <p>Geben Sie in Maps ein:<br>B&amp;B Cuore di Bosco<br>Via Gardesani, 15 – Prada (TN)<br>oder klicken Sie auf die Karte, um sie in Google Maps zu öffnen<br>und die Route zu erhalten.</p>
        </div>
        <div class="map-frame">
          <iframe title="Karte: B&amp;B Cuore di Bosco, Via Gardesani 15, Prada" loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4628.566893163929!2d10.95615487755049!3d45.80152017108149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4782051cad11ec19%3A0x135a8894e1f97c2d!2sVia%20Gardesani%2C%2015%2C%2038060%20Prada%20TN!5e1!3m2!1sit!2sit!4v1749392711552!5m2!1sit!2sit&hl=de"></iframe>
          <a class="map-link" href="https://www.google.com/maps/place/Via+Gardesani,+15,+38060+Prada+TN" target="_blank" rel="noopener" aria-label="Karte in Google Maps öffnen"></a>
        </div>
      </section>

      <section class="garden">
        <div class="wrap garden-head" data-reveal>
          <h2>Der Garten Europas</h2>
          <p class="lead">Bei Ihrer Ankunft empfängt Sie die Stille und die Schönheit der Hochebene von Brentonico mit ihrer Kulisse aus grünen Bergen.</p>
        </div>
        <SitePhotoCarousel :photos="gardenPhotos" label="Fotos des Hauses, der Hochebene und der Umgebung" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/images/logo_400.webp";

const aptCredit = "Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di";
const ownerCredit = "Photo Mara";

const gardenPhotos = [
  { src: "/images/home/bosco-1920.webp", alt: "Der Waldweg", caption: "Der Wald von Prada", credit: ownerCredit },
  { src: "/images/home/calanchi-san-giacomo-1200.webp", alt: "Die Calanchi di San Giacomo im Herbst unter den Wänden des Monte Baldo", caption: "Calanchi di San Giacomo", credit: `${aptCredit} Graziano Galvagni` },
  { src: "/images/home/famiglia-castione-1280.webp", alt: "Eine Familie im Wald von Castione im Herbst", caption: "Castione", credit: `${aptCredit} Graziano Galvagni` },
  { src: "/images/home/palazzo-eccheli-baisi-1280.webp", alt: "Der Garten im italienischen Stil des Palazzo Eccheli Baisi in Brentonico", caption: "Palazzo Eccheli Baisi, Brentonico", credit: `${aptCredit} Luca Matassoni` },
  { src: "/images/home/inverno-brentonico-1280.webp", alt: "Die verschneite Hochebene von Brentonico", caption: "Winter in Brentonico", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/trekking-baldo-1280.webp", alt: "Wanderer auf einem Felsvorsprung des Monte Baldo im Herbst", caption: "Trekking auf dem Monte Baldo", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/monte-altissimo-1200.webp", alt: "Der Gardasee, vom Monte Altissimo aus gesehen", caption: "Vom Monte Altissimo", credit: "360gardalife. Foto di Angela Trawoeger" },
  { src: "/images/home/forra-sorna-1280.webp", alt: "Ein Sprung in das Wasser der Forra della Sorna", caption: "Forra della Sorna", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/castello-rovereto-700.webp", alt: "Das Castello di Rovereto und der Wasserfall des Leno", caption: "Castello di Rovereto", credit: `${aptCredit} Luca Matassoni` },
  { src: "/images/home/campana-caduti-700.webp", alt: "Die Campana dei Caduti in Rovereto", caption: "Campana dei Caduti, Rovereto", credit: "APT Rovereto Vallagarina. Foto di Luca Matassoni" },
  { src: "/images/home/castello-avio-1280.webp", alt: "Das Castello di Avio zwischen den Zypressen", caption: "Castello di Avio", credit: `${aptCredit} Martina Vanzo` },
  { src: "/images/home/primavera-prato-1280.webp", alt: "Eine Blumenwiese im Frühling zwischen Bäumen und grünen Hügeln, unter weißen Wolken", caption: "Blühende Wiesen", credit: ownerCredit },
  { src: "/images/home/estate-arcobaleno-1280.webp", alt: "Ein weißer Weg zwischen grünen Wiesen unter einem Regenhimmel mit Regenbogen", caption: "Regenbogen im Sommer", credit: ownerCredit },
  { src: "/images/home/autunno-nuvole-1280.webp", alt: "Herbstwolken über den Dörfern und den Bergen, von einem Balkon über den Wiesen aus gesehen", caption: "Herbstlandschaft", credit: ownerCredit },
  { src: "/images/home/inverno-nuvole-1280.webp", alt: "Verschneite Wiesen und ein Wolkenmeer unter den Bergen, von einem Balkon aus gesehen", caption: "Schnee und Wolken im Winter", credit: ownerCredit },
  { src: "/images/home/casa-1600.webp", alt: "Das Steinhaus", caption: "B&B Cuore di Bosco", credit: ownerCredit },
];

useHead({
  title: "B&B Cuore di Bosco | Familienurlaub in den Bergen – Brentonico, Trentino",
  meta: [
    {
      name: "description",
      content:
        "B&B für Familien auf der Hochebene von Brentonico im Trentino. Bergurlaub mit Kindern: natürliches Frühstück, Babyausstattung, Natur und Ruhe in den Wäldern des Naturparks Monte Baldo.",
    },
    {
      property: "og:title",
      content: "B&B Cuore di Bosco | Familienurlaub in den Bergen – Brentonico, Trentino",
    },
    {
      property: "og:description",
      content:
        "B&B für Familien auf der Hochebene von Brentonico im Trentino. Bergurlaub mit Kindern: natürliches Frühstück, Babyausstattung, Natur und Ruhe in den Wäldern des Naturparks Monte Baldo.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/de",
    },
    {
      property: "og:image",
      content: "https://www.cuoredibosco.it/images/cuore-casa.webp",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.cuoredibosco.it/de" }],
});

const root = ref<HTMLElement | null>(null);
useReveal(root);
</script>

<style scoped src="../../assets/css/pages/home.css"></style>
