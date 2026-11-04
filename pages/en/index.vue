<template>
  <div ref="root">
    <div class="band">

      <section class="hero">
        <div class="hero-text">
          <div class="hero-title" data-reveal>
            <h1>B&amp;B Cuore di Bosco</h1>
            <img class="hero-logo" :src="logo" alt="">
          </div>
          <p class="tagline" data-reveal>Rediscover your time, rediscover peace.</p>
          <p class="lead" data-reveal>B&amp;B Cuore di Bosco is our home and yours in the mountains, a refuge of peace and quiet where you can rest your mind and heart.</p>
          <div class="hero-actions">
            <NuxtLink class="button button-light" to="/en/booking" no-prefetch>Book your stay</NuxtLink>
            <NuxtLink class="button button-quiet" to="#rooms" no-prefetch>The rooms</NuxtLink>
          </div>
        </div>
        <figure class="hero-photo">
          <img src="/images/home/altopiano-2000.webp" alt="The green meadows and mountains of the Brentonico Plateau">
        </figure>
      </section>
    </div>

    <div>
      <section class="welcome">
        <img src="/images/home/casa-1600.webp" alt="The stone house of B&B Cuore di Bosco in Prada" loading="lazy">
        <div class="welcome-text" data-reveal>
          <h2>Welcome</h2>
          <p class="lead">Welcome to <strong>B&amp;B Cuore di Bosco</strong>, a refuge immersed in the nature of the <strong>Vallagarina</strong>, on the <strong>Brentonico Plateau, Europe's Garden</strong>. Surrounded by lush mountains, time slows down and tranquillity reigns supreme.</p>
          <p>The B&amp;B is easily reached by car from the <strong>Rovereto Sud exit</strong> of the A22 motorway and is an ideal starting point for exploring <strong>Monte Baldo</strong> in every season.</p>
          <p>The house, built of stone and furnished with wood and natural materials, offers warm, well-kept rooms where every detail tells of a deep bond with the <strong>mountains</strong> and with a slower, more mindful way of life. The welcome is simple and genuine, meant to make our <strong>guests</strong> feel at ease from the very first moment.</p>
          <p>The rooms are spacious and bright, ideal for both <strong>couples</strong> and <strong>families</strong>. They offer modern comforts, a <strong>private bathroom and balcony</strong>, linen included, and a relaxing atmosphere that invites you to rest. On request, items for the little ones are available, for a peaceful stay also for those travelling with <strong>children</strong>.</p>
        </div>
      </section>

      <section class="wrap rooms" id="rooms">
        <div class="rooms-head" data-reveal>
          <h2>Our rooms</h2>
          <NuxtLink class="button" to="/en/booking" no-prefetch>Check availability</NuxtLink>
        </div>
        <p class="rooms-family" data-reveal>Free cot · 1st child free · 2nd child at 50% · &lt;12 years</p>
        <article class="room">
          <div class="room-photos" data-reveal>
            <img src="/images/home/lampone-camera-1600.webp" alt="The Lampone room" loading="lazy">
            <img src="/images/home/lampone-finestra-700.webp" alt="The Lampone window onto the mountains" loading="lazy">
            <img src="/images/home/lampone-angolo-960.webp" alt="The wooden corner with the kettle in the Lampone room" loading="lazy">
          </div>
          <div data-reveal>
            <h3>Lampone</h3>
            <p class="lead">Spacious and welcoming, suited to families who want comfort and tranquillity.</p>
            <ul class="room-features">
              <li>Breakfast included</li>
              <li>Private bathroom in the room</li>
              <li>Private balcony with clothes airer and deckchairs</li>
              <li>Equipped kettle corner</li>
              <li>Toiletries and linen included</li>
              <li>Cleaning included</li>
            </ul>
            <p class="beds">From 2 to 4 adult beds</p>
            <div class="room-actions">
              <NuxtLink class="button button-quiet" to="/en/booking#lampone" no-prefetch>Details</NuxtLink>
              <NuxtLink class="button" to="/en/booking" no-prefetch>Book</NuxtLink>
            </div>
          </div>
        </article>
        <article class="room">
          <div class="room-photos" data-reveal>
            <img src="/images/home/mirtillo-camera-1280.webp" alt="The Mirtillo room" loading="lazy">
            <img src="/images/home/mirtillo-armadio-700.webp" alt="The Mirtillo room with the painted wardrobe" loading="lazy">
            <img src="/images/home/porta-libri-700.webp" alt="The door with the book rack" loading="lazy">
          </div>
          <div data-reveal>
            <h3>Mirtillo</h3>
            <p class="lead">Fresh and bright, perfect for those who love nature.</p>
            <ul class="room-features">
              <li>Breakfast included</li>
              <li>Private bathroom in the room</li>
              <li>Private balcony with clothes airer and deckchairs</li>
              <li>Equipped kettle corner</li>
              <li>Toiletries and linen included</li>
              <li>Cleaning included</li>
            </ul>
            <p class="beds">From 2 to 4 adult beds</p>
            <div class="room-actions">
              <NuxtLink class="button button-quiet" to="/en/booking#mirtillo" no-prefetch>Details</NuxtLink>
              <NuxtLink class="button" to="/en/booking" no-prefetch>Book</NuxtLink>
            </div>
          </div>
        </article>
      </section>

      <section class="band breakfast" id="breakfast">
        <div class="breakfast-photo"><img src="/images/home/colazione-1280.webp" alt="Breakfast with the homemade cake" loading="lazy"></div>
        <div class="breakfast-text" data-reveal>
          <h2>Breakfast with us</h2>
          <p class="lead">Breakfast at our home is a special moment, to be enjoyed slowly and in good company. Every morning we carefully prepare a buffet full of good things: homemade cakes, fresh bread, local cured meats and cheeses, seasonal fruit and something indulgent to start the day with a smile.</p>
          <p>You can choose between sweet or savoury options and tell us about any intolerances or food preferences, so that you always find a breakfast that suits your needs. On request, breakfast can be served directly in your room, for an even slower awakening, accompanied by the scent of wood and the light of the woods coming in through the windows.</p>
          <p>Great attention is paid to the quality of the ingredients, chosen from local producers, to offer authentic flavours and an experience that tells the story of the area from the very first morning.</p>
          <p>And if you love the products of our local producers, we are happy to order them and have them waiting for you, so you can take the Vallagarina home with you when you leave! Jams, syrups, herbs, herbal teas, honey, flours and much more!</p>
        </div>
      </section>

      <section class="everyone">
        <div class="wrap">
          <div class="everyone-head" data-reveal>
            <h2>A home open to everyone</h2>
            <p class="lead">Walkers, lovers of nature and landscapes, families, friends: there is a place here for everyone.</p>
          </div>
          <div class="guests">
            <article class="guest guest-sport" data-reveal>
              <img src="/images/home/bosco-900.webp" alt="A path in the woods near Prada" loading="lazy">
              <div>
                <h3>Sport and nature</h3>
                <p>The location is perfect for those who love nature and outdoor activities in every season. In the winter months, the <strong>ski resorts</strong> of Polsa, San Valentino and San Giacomo are just minutes away.</p>
                <p>For sports lovers, the <strong>Polsa bike park</strong> and the <strong>Polsa Family Adventure Park</strong> are a few minutes away, while the <strong>Canyon della Sorna</strong>, <strong>climbing</strong> and <strong>trekking</strong> let you experience the mountains actively. The Plateau also hosts <strong>training camps and sports retreats</strong>.</p>
              </div>
            </article>
            <article class="guest guest-nature" data-reveal>
              <img src="/images/home/prada-1280.webp" alt="The village of Prada among the vineyards and the mountains" loading="lazy">
              <div>
                <h3>For lovers of nature and landscapes</h3>
                <p>A few minutes from Brentonico, <strong>Prada</strong> is a small mountain hamlet in the heart of the <strong>Monte Baldo Nature Park</strong>, a quiet place that is easy to reach, an excellent starting point for excursions and activities of every kind.</p>
                <p>From easy paths for walks with <strong>children</strong> to scenic routes for <strong>trekking</strong>, every walk offers breathtaking scenery immersed in the nature of <strong>Monte Baldo</strong> and the surrounding woods.</p>
              </div>
            </article>
            <article class="guest" data-reveal>
              <figure class="guest-photo">
                <img src="/images/home/famiglia-castione-1280.webp" alt="A family in the woods of Castione in autumn" loading="lazy">
                <figcaption class="photo-credit">Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Graziano Galvagni</figcaption>
              </figure>
              <div>
                <h3>For families</h3>
                <p>We know how complicated it is to get around and relax with one or more children! That is why we have tried to make life easier and the holiday more relaxing for parents! We have everything you need, halve your luggage!</p>
                <p>Cot, bed guards, changing table, potties, high chair, bottle warmer or microwave available in the breakfast room, minibar in the Lampone room, pushchair, baby carrier 6/36 months or preschool carrier 3-6 years or slings, step stool or step for the bathroom, children’s plates, cutlery and glasses, bookcase and equipped play corner, materials for colouring and drawing and stickers galore!</p>
              </div>
            </article>
            <article class="guest guest-nearby" data-reveal>
              <figure class="guest-photo">
                <img src="/images/home/castello-avio-1280.webp" alt="The Castello di Avio among the cypresses" loading="lazy">
                <figcaption class="photo-credit">Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Martina Vanzo</figcaption>
              </figure>
              <div>
                <h3>Close by</h3>
                <p>By car you can also visit <strong>Rovereto</strong> with its cultural offer and <strong>Ala</strong> with its ancient historic centre and the nearby Castello di Avio with its spectacular Christmas market. Not far away is also the northern end of <strong>Lake Garda</strong>, for a day of views and villages overlooking the water.</p>
                <p>From Rovereto or Mori station you can easily reach places further afield by train, such as Verona, Trento and Bolzano. All public transport in Trentino is included in the <a href="https://www.visittrentino.info/it/esperienze/trentino-guest-card" target="_blank" rel="noopener">Trentino Guest Card</a>, together with discounts and special offers!</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="band pilgrims" id="cammino">
        <div class="wrap pilgrims-grid">
          <img class="pilgrims-photo" src="/images/home/cammino-san-rocco-960.webp" alt="The Cammino di San Rocco waymark on a stone wall" loading="lazy" data-reveal>
          <div class="pilgrims-text" data-reveal>
            <h2>The Cammino di San Rocco</h2>
            <p class="lead">The <strong>Cammino di San Rocco</strong> passes right in front of our property and is an evocative circular route of about 70 km, divided into 5 stages, that combines history, nature and culture across the Val di Gresta, Mori, Ronzo-Chienis and the Brentonico Plateau.</p>
            <p>It crosses woods, historic villages and First World War trenches, and can be walked all year round. You can collect the “pilgrim’s passport” in Mori and follow the GPX tracks marked by the SAT signs. For more information and to download the map <a href="https://camminosanrocco.it/" target="_blank" rel="noopener">go to the official website</a></p>
            <p>On the passport you can place the 11 official stamps you will find along the Cammino and the unofficial ones to discover, don’t forget ours!</p>
          </div>
          <div class="pilgrims-welcome" data-reveal>
            <h3>A welcome for pilgrims</h3>
            <ul>
              <li>Breakfast from 7 am</li>
              <li>Deckchairs on the terrace and the panoramic balcony</li>
              <li>Refreshments on arrival</li>
              <li>Clothes airer and laundry service</li>
              <li>UV shoe dryer available</li>
              <li>Board games in the common room</li>
            </ul>
            <p><a href="tel:+393494960228">Call us</a> to make arrangements and to plan your stage</p>
          </div>
        </div>
      </section>

      <section class="story" id="story">
        <div class="story-inner">
          <img class="logo" :src="logo" alt="The Cuore di Bosco logo: a wooden heart with wild berries">
          <h2>Every project begins with a dream</h2>
          <div class="lead">
            <p>Cuore di Bosco was born from a project for a more serene, less hurried life for us and our family, and from the wish to share an idea of hospitality made of time, attention and passion. A place where you can feel welcome, breathe in the mountains and live a genuine experience, in balance between nature, comfort and authenticity.</p>
          </div>
        </div>
      </section>

      <section class="band reviews">
        <div class="wrap reviews-inner">
          <h2>What our guests say</h2>
          <a class="button button-quiet" href="https://share.google/WN2W0rEATFBJl1V4G" target="_blank" rel="noopener">Read our reviews on Google</a>
        </div>
      </section>

      <section class="wrap arrive" id="directions">
        <div>
          <h2>How to get here</h2>
          <p>Cuore di Bosco is in Prada di Brentonico, on the road to Polsa, easily reached by car from the <b>Rovereto Sud exit of the A22 motorway</b>.</p>
          <p>We recommend going through <b>Mori</b> and driving up following the signs for the <b>Brentonico Plateau</b> (brown signs). From Brentonico the SP3, heading towards Polsa, will take you to Prada in a few minutes; watch out for the turning to Prada on the left, on a bend.</p>
          <p>Park in the free car park next to the church and the playground; we are on the main street, a few steps away on the left!</p>
          <p>If you need help, call us!</p>
          <h3>Find us on Maps!</h3>
          <p>Type into Maps:<br>B&amp;B Cuore di Bosco<br>Via Gardesani, 15 – Prada (TN)<br>or click the map to open it in Google Maps<br>and get directions.</p>
        </div>
        <div class="map-frame">
          <iframe title="Map: B&amp;B Cuore di Bosco, Via Gardesani 15, Prada" loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4628.566893163929!2d10.95615487755049!3d45.80152017108149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4782051cad11ec19%3A0x135a8894e1f97c2d!2sVia%20Gardesani%2C%2015%2C%2038060%20Prada%20TN!5e1!3m2!1sit!2sit!4v1749392711552!5m2!1sit!2sit&hl=en"></iframe>
          <a class="map-link" href="https://www.google.com/maps/place/Via+Gardesani,+15,+38060+Prada+TN" target="_blank" rel="noopener" aria-label="Open the map in Google Maps"></a>
        </div>
      </section>

      <section class="garden">
        <div class="wrap garden-head" data-reveal>
          <h2>Europe's Garden</h2>
          <p class="lead">Once you arrive, you will be welcomed by the silence and beauty of the Brentonico Plateau, with its frame of green mountains.</p>
        </div>
        <SitePhotoCarousel :photos="gardenPhotos" label="Photographs of the house, the Plateau and the surroundings" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/images/logo_400.webp";

const aptCredit = "Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di";
const ownerCredit = "Photo Mara";

const gardenPhotos = [
  { src: "/images/home/bosco-1920.webp", alt: "The path in the woods", caption: "The woods of Prada", credit: ownerCredit },
  { src: "/images/home/calanchi-san-giacomo-1200.webp", alt: "The Calanchi di San Giacomo in autumn beneath the walls of Monte Baldo", caption: "Calanchi di San Giacomo", credit: `${aptCredit} Graziano Galvagni` },
  { src: "/images/home/famiglia-castione-1280.webp", alt: "A family in the woods of Castione in autumn", caption: "Castione", credit: `${aptCredit} Graziano Galvagni` },
  { src: "/images/home/palazzo-eccheli-baisi-1280.webp", alt: "The Italian-style garden of Palazzo Eccheli Baisi in Brentonico", caption: "Palazzo Eccheli Baisi, Brentonico", credit: `${aptCredit} Luca Matassoni` },
  { src: "/images/home/inverno-brentonico-1280.webp", alt: "The Brentonico Plateau under snow", caption: "Winter in Brentonico", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/trekking-baldo-1280.webp", alt: "Hikers on a rocky spur of Monte Baldo in autumn", caption: "Trekking on Monte Baldo", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/monte-altissimo-1200.webp", alt: "Lake Garda seen from Monte Altissimo", caption: "From Monte Altissimo", credit: "360gardalife. Foto di Angela Trawoeger" },
  { src: "/images/home/forra-sorna-1280.webp", alt: "A dive into the waters of the Canyon della Sorna", caption: "Canyon della Sorna", credit: `${aptCredit} Tommaso Prugnola` },
  { src: "/images/home/castello-rovereto-700.webp", alt: "The Castello di Rovereto and the Leno waterfall", caption: "Castello di Rovereto", credit: `${aptCredit} Luca Matassoni` },
  { src: "/images/home/campana-caduti-700.webp", alt: "The Campana dei Caduti in Rovereto", caption: "Campana dei Caduti, Rovereto", credit: "APT Rovereto Vallagarina. Foto di Luca Matassoni" },
  { src: "/images/home/castello-avio-1280.webp", alt: "The Castello di Avio among the cypresses", caption: "Castello di Avio", credit: `${aptCredit} Martina Vanzo` },
  { src: "/images/home/primavera-prato-1280.webp", alt: "A meadow in bloom in spring among the trees and the green hills, under white clouds", caption: "Meadows in bloom", credit: ownerCredit },
  { src: "/images/home/estate-arcobaleno-1280.webp", alt: "A white road among green meadows under a rainy sky with a rainbow", caption: "Summer rainbow", credit: ownerCredit },
  { src: "/images/home/autunno-nuvole-1280.webp", alt: "Autumn clouds among the villages and the mountains, seen from a balcony above the meadows", caption: "Autumn landscape", credit: ownerCredit },
  { src: "/images/home/inverno-nuvole-1280.webp", alt: "Snowy meadows and a sea of clouds beneath the mountains, seen from a balcony", caption: "Snow and clouds in winter", credit: ownerCredit },
  { src: "/images/home/casa-1600.webp", alt: "The stone house", caption: "B&B Cuore di Bosco", credit: ownerCredit },
];

useHead({
  title: "B&B Cuore di Bosco | Family Mountain Holidays - Brentonico, Trentino",
  meta: [
    {
      name: "description",
      content:
        "Family-friendly B&B on the Brentonico Plateau, Trentino. Mountain holidays with children: homemade breakfasts, baby kit, nature and peace in the Monte Baldo Nature Park.",
    },
    {
      name: "keywords",
      content:
        "family B&B, mountain holidays with kids, bed and breakfast Brentonico, kids stay free mountains, family vacation Trentino, B&B children Trentino, Brentonico Plateau, homemade breakfast, Cuore di Bosco, Monte Baldo, family hotel Trentino",
    },
    {
      property: "og:title",
      content: "B&B Cuore di Bosco - Family Holidays in the Woods of Brentonico",
    },
    {
      property: "og:description",
      content:
        "Family-friendly B&B on the Brentonico Plateau. Homemade breakfasts, baby kit, bikes and plenty of space in the nature of Trentino.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/en",
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
      content: "B&B Cuore di Bosco - Family Mountain Holidays in Trentino",
    },
    {
      name: "twitter:description",
      content:
        "Family-friendly B&B on the Brentonico Plateau. Nature, homemade breakfasts and child-friendly services.",
    },
  ],

  link: [{ rel: "canonical", href: "https://www.cuoredibosco.it/en" }],
});

const root = ref<HTMLElement | null>(null);
useReveal(root);
</script>

<style scoped src="../../assets/css/pages/home.css"></style>
