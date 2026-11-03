<template>
  <div>
    <div class="welcome">
      <img decoding="async" width="1400" height="800" class="landing-image" alt="Forest trail on the Brentonico Plateau - Monte Baldo Nature Park" :src="bosco"
        data-object-fit="cover" sizes="(max-width: 1200px) 100vw, 1200px" /><span aria-hidden="true"
        style="background-color: #526a71"></span>
      <div class="landing-text">
        <h1 class="page-title text-white">EXPLORE THE SURROUNDINGS</h1>
      </div>
    </div>

    <section class="text-center">
      <p>
        Just a few minutes from Brentonico, <strong>Prada</strong> is a small mountain hamlet in the heart of the
        <strong>Monte Baldo Nature Park</strong>, a quiet yet easily accessible place—an ideal base for hiking and all
        kinds of outdoor activities.
      </p>
      <p class="spaced">
        Located in Prada di Brentonico, <strong>B&B Cuore di Bosco</strong>
        is the ideal starting point for families and nature lovers.
      </p>
      <p class="spaced">
        From easy trails for walks with children to panoramic trekking routes,
        every hike offers breathtaking scenery immersed in the nature of Monte Baldo and the surrounding woods.
      </p>
      <p class="spaced">
        The <strong>Brentonico Plateau</strong> is perfect for families looking for nature, peace, and freedom.
      </p>
      <p>
        Here, children of all ages (even grown-ups!) can run through meadows, watch grazing animals, listen to birdsong,
        and enjoy a peaceful mountain experience.
      </p>

      <p>
        The area is full of <strong>trails suitable for children</strong>, alpine huts accessible via easy walks, and
        forests that transform with each season: from the bright greens of spring to the warm colors of autumn. In
        <strong>summer</strong>, you can explore the alpine huts of Monte Baldo Park, taste local products, and enjoy
        the cool mountain air.
      </p>
      <p>
        Don’t miss the magnificent <strong>Canyon della Sorna</strong>, a natural wonder with gorges carved by water,
        waterfalls and unique panoramic viewpoints for walks and photography.
      </p>
      <p>
        On the park’s official website below, you’ll find trail maps and a calendar of activities!
      </p>

      <figure class="image-wrapper aligncenter size-large is-resized">
        <a href="https://www.parcomontebaldo.tn.it/it" target="_blank" rel="noopener noreferrer nofollow">
          <img decoding="async" src="https://www.parcomontebaldo.tn.it/sites/default/files/logo-parcomontebaldo.jpg"
            alt="Monte Baldo Nature Park Logo" style="width: 132px; height: auto" /></a>
      </figure>

      <p>
        In winter, you can reach the <strong>ski resorts</strong> of <strong>Polsa</strong> (10 minutes), <strong>San
          Giacomo</strong> (15 minutes), and <strong>San Valentino</strong> (20 minutes). These offer slopes for all
        ages and kids' parks—perfect for first-time skiing, learning at certified ski schools, or simply having fun with
        the family on a sled. Check <a href="https://www.brentonicoski.com" target="_blank">www.brentonicoski.com</a>
        for up-to-date events and information.
      </p>

      <p>
        <strong>Rovereto</strong> is also close by (25 minutes), with its museums, historic center, and cultural
        activities for all ages, with its renowned museums spanning art, history and science such as MART and the innovative
        Museum of Science and Archaeology, as well as the famous Bell of the Fallen
        and the historic center with the castle and the historic Teatro Zandonai. To discover more,
        <a href="https://www.visitrovereto.it/scopri/territorio/rovereto-citta-di-culture/" target="_blank">What to See
          in Rovereto</a>.
      </p>

      <p>
        In the surrounding area, you can also visit <strong>Castello di Avio</strong>, an important example of local history and architecture,
        and <strong>Lago di Loppio</strong>, perfect for nature walks and birdwatching.
        To complete your holiday, in about 30 minutes you can reach <strong>Lake Garda</strong>,
        with Torbole and Riva del Garda, for excursions, water sports, clean water and unique panoramas.
        <a href="https://www.gardatrentino.it/it" target="_blank">Find out more</a>.
      </p>

      <p>
        You are in the <strong>Vallagarina</strong> region: where nature, culture, and flavors meet. <br />Inside the
        facility, you’ll find a display with maps and informational material as well as our personal recommendations.
        You can also visit the site
        <a href="https://www.visitrovereto.it" target="_blank"
          rel="noopener noreferrer nofollow">www.visitrovereto.it</a> and the welcoming tourist info point next to the
        Brentonico town hall. It's right next to a large, well-maintained playground and the main square, <strong>Piazza
          Cesare Battisti</strong>, where events and celebrations take place all year round.
      </p>
    </section>

    <section class="text-center rovereto-inview">
      <figure
        class="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-1 is-layout-flex wp-block-gallery-is-layout-flex">
        <figure class="image-wrapper">
          <a href="https://www.visitrovereto.it/" target="_blank" rel="noopener noreferrer nofollow">
            <img decoding="async" width="850" height="371" data-id="601"
              src="/images/altervista/apt_brentonico.jpg" alt="Brentonico Plateau panorama"
              class="wp-image-601" srcset="
            /images/altervista/apt_brentonico.jpg         850w,
            /images/altervista/apt_brentonico-320x140.jpg 320w,
            /images/altervista/apt_brentonico-768x335.jpg 768w
          " sizes="(max-width: 850px) 100vw, 850px" /></a>
        </figure>
      </figure>
    </section>

    <section class="text-center">
      <h3 class="wp-block-heading has-text-align-center">
        <a href="https://www.visitrovereto.it/wp-content/uploads/2023/12/20230805-brentonico-guida-150x190-ITA-LOW_WEB.pdf"
          target="_blank" rel="noreferrer noopener">
          Brentonico Plateau Guide (PDF – 4.61 MB)</a>
      </h3>
    </section>

    <section class="text-center">
      <h2>Brentonico, the Flower of Mount Baldo</h2>

      <Carousel :images="[
        'https://www.visitrovereto.it/wp-content/uploads/2019/11/paesaggio-inverno-monte-baldo-foto-valentino-azzolini-1.jpg',
        'https://www.visitrovereto.it/wp-content/uploads/2023/07/palazzo-eccheli-baisi-giardino-botanico-brentonico-luca-matassoni-2023-3.jpg',
        'https://www.visitrovereto.it/wp-content/uploads/2023/06/Giardino-Botanico-ph-lucamatassoni-web.png',
        'https://www.visitrovereto.it/wp-content/uploads/2019/10/paesaggio-inverno-monte-baldo-foto-tommaso-prugnola-3.jpg',
        'https://www.visitrovereto.it/wp-content/uploads/2024/10/Brentonico-il-fiore-del-Baldo-Graziano-Galvagni.jpg',
      ]" :alts="[
        'Monte Baldo in winter - snowy landscape on the Brentonico Plateau',
        'Botanical garden at Palazzo Eccheli-Baisi in Brentonico',
        'Botanical Garden of Monte Baldo Nature Park',
        'Winter landscape Monte Baldo - Trentino',
        'Brentonico the Flower of Mount Baldo - mountain panorama',
      ]" />
    </section>

    <section class="text-center">
      <h2>"Italy’s Garden" in the Heart of Monte Baldo Park</h2>
      <p>
        It’s the first mountain you encounter when entering Trentino. Here, you can go trekking and mountain biking in
        summer, and ski on the slopes of Polsa, San Valentino, and San Giacomo in winter.
      </p>
      <p>
        You're on the Trentino side of Monte Baldo, between the Adige River and Lake Garda, in the heart of the <a
          href="https://www.visitrovereto.it/scopri/territorio/parco-naturale-locale-del-monte-baldo/" target="_blank"
          rel="noopener noreferrer nofollow">Monte Baldo Nature Park</a>, known by botanists across Europe as "Italy's
        Garden" due to its abundance of rare plants and flowers.
      </p>
      <p>
        Brentonico is the name of the main village, and its municipality includes additional villages and mountain
        hamlets: Castione, Cazzano, Crosano, Cornè, Prada, Saccone, and Sorne, along with the tourist centers of San
        Giacomo, San Valentino, and Polsa.
      </p>
      <p>
        At the botanical garden of <a href="http://www.visitrovereto.it/scopri/palazzi/palazzo-eccheli-baisi/"
          target="_blank" rel="noopener noreferrer nofollow">Palazzo Eccheli-Baisi</a>, you’ll find many of the 1,655
        plant species of Monte Baldo Park, most of which are also found across the Alps. A guided visit is the best way
        to enjoy it, also including exhibitions at the palace and the <strong>Fossil Museum</strong>. Experience the
        silence of the ancient <a
          href="http://www.visitrovereto.it/scopri/chiese-e-luoghi-sacri/cripta-di-san-giovanni/" target="_blank"
          rel="noopener noreferrer nofollow">Romanesque crypt</a> in the <a
          href="http://www.visitrovereto.it/scopri/chiese-e-luoghi-sacri/chiesa-dei-ss-pietro-e-paolo/" target="_blank"
          rel="noopener noreferrer nofollow">late medieval Church of SS. Peter and Paul</a>. Relax in the shade of the
        ancient horse chestnut trees in Cesare Battisti Park, in the heart of the village. In the Sorne area, discover
        the <a href="http://www.visitrovereto.it/scopri/luoghi-storici/mulino-zeni/" target="_blank"
          rel="noopener noreferrer nofollow">Zeni Mill</a>, a perfectly functioning 19th-century mill.
      </p>
    </section>

    <section>
      <h3>What to do in spring on the Brentonico Plateau</h3>
      <p>
        The blooming season is perfect for meeting and getting to know the rare plants and flowers that brighten the
        Brentonico Plateau. Follow the many <strong>scenic routes</strong>, choosing the one best suited to your
        abilities, such as the route starting from Polsa, continuing to Bocca d’Ardole, Corno della Paura, and reaching
        <a href="https://regio.outdooractive.com/oar-rovereto-trentino/it/tour/trekking/bocca-d-ardole-corno-della-paura-monte-vignola-/13833250/"
          target="_blank" rel="noreferrer noopener">Monte Vignola</a>, or the hike in the wild <a
          href="https://regio.outdooractive.com/oar-rovereto-trentino/it/tour/trekking/escursione-alla-val-del-parol/13835058/#dmdtab=oax-tab5"
          target="_blank" rel="noreferrer noopener">Val del Parol</a> to admire its precious blooms and grazing animals.
      </p>
    </section>

    <section>
      <h3>Summer on Monte Baldo: trekking, alpine huts and outdoor activities</h3>
      <p>
        Summer on Monte Baldo means outdoor activities: hiking, mountain biking, horse riding
        and visits to mountain huts and alpine pastures to savor fresh milk and local cheeses. Panoramic trails offer views over Lake Garda,
        and the Peace Trail passes through Great War sites such as trenches, tunnels, and fortifications.
      </p>
      <p>
The <strong>Cammino di San Rocco</strong> passes right in front of our property and is a scenic
circular route of about 70 km, structured in 5 stages, combining history,
nature and culture between Val di Gresta, Mori, Ronzo-Chienis and the Brentonico Plateau.
It crosses woods, historic villages and Great War trenches, and can be walked all year round.
You can pick up the "pilgrim’s passport" in Mori and follow the GPX tracks marked by SAT signs.
For more information and to download the map, visit the official website
<a href="https://camminosanrocco.it/" target="_blank">Find out more</a>
      </p>
      <p>
        The Brentonico Plateau is also home to <a href="https://www.visitrovereto.it/vivi/outdoor/summer-camp/"
          target="_blank" rel="noreferrer noopener">summer camps</a> for kids and a reference point for the athletic
        preparation of professional football teams and the Italian and German national ski teams.
      </p>
      <p>
        In August, don’t miss the <a href="https://www.visitrovereto.it/vivi/eventi/ferragosto-baldo-bio-benessere/"
          target="_blank" rel="noopener noreferrer nofollow">Baldo Bio Wellness Festival</a> at Parco C. Battisti, an
        event dedicated to relaxation, wellness, and natural products.
      </p>
    </section>

    <section>
      <h3>Autumn in Trentino: chestnuts and local flavors in Brentonico</h3>
      <p>
        Walk among the majestic trees of the plateau and discover the warm colors and delicious flavors of autumn.
        During this season, the famous <strong>Castione chestnuts</strong> become the undisputed stars of local events
        such as the <a href="https://www.visitrovereto.it/vivi/eventi/festa-della-castagna-castione/" target="_blank"
          rel="noopener noreferrer nofollow">Chestnut Festival</a>, the <a
          href="https://www.visitrovereto.it/vivi/eventi/luppoli-e-castagne/" target="_blank"
          rel="noopener noreferrer nofollow">Chestnut Celebration</a>, or <a
          href="https://www.visitrovereto.it/vivi/eventi/sapori-dautunno/" target="_blank"
          rel="noopener noreferrer nofollow">Flavors of Autumn</a>, featuring autumn menus paired with other typical
        Trentino dishes: canederli, strangolapreti, potato polenta, accompanied by tasty cheeses, strudel, and zelten.
      </p>
    </section>

    <section>
      <h3>Winter at Polsa and San Valentino: skiing and snow for families</h3>
      <p>
        At <a href="https://www.visitrovereto.it/vivi/outdoor/neve/sci/sci-alpino/" target="_blank"
          rel="noopener noreferrer nofollow">Polsa and San Valentino</a>, the slopes of Trentino closest to the plains
        offer safe and peaceful skiing on wide, sunny pistes. Not a fan of skiing? Choose from other <a
          href="https://www.visitrovereto.it/info/guide/inverno-sul-monte-baldo/" target="_blank"
          rel="noopener noreferrer nofollow"><strong>winter activities</strong></a>: snowshoeing, ice skating, snow
        playgrounds, or sledding! Don’t miss the nighttime torchlight parade and snow events for everyone!
      </p>
      <p>
        If you visit during the Christmas holidays, don’t miss the <a
          href="https://www.visitrovereto.it/vivi/eventi/natale-dell-albero-brentonico/" target="_blank"
          rel="noopener noreferrer nofollow">Christmas of the Tree</a>: from December to Epiphany, many activities for
        adults and children, including the unmissable sculpture symposium in the town’s historic center.
      </p>
    </section>

    <section class="text-center footer">
      <p>
        <strong>To discover all current events, we recommend the website <a href="https://www.visitrovereto.it"
            target="_blank">www.visitrovereto.it</a> and the <a
            href="https://www.visitrovereto.it/info/uffici-turistici-rovereto-vallagarina/" target="_blank">Brentonico
            tourist office</a>. You will also find a display at the facility with updated maps and brochures of the area
          available to you!</strong>
      </p>
      <p>
        <strong>SOURCE <a href="https://www.visitrovereto.it" target="_blank">WWW.VISITROVERETO.IT</a></strong>
      </p>
    </section>

  </div>
</template>

<script lang="ts" setup>
import bosco from "~/assets/images/bosco.webp";

definePageMeta({
  layout: 'english'
});

useHead({
  title: "Explore the Surroundings of Brentonico | B&B Cuore di Bosco - Trekking, alpine huts and family activities",
  meta: [
    {
      name: "description",
      content:
        "Explore the surroundings of B&B Cuore di Bosco in Brentonico: Monte Baldo trekking, alpine huts, skiing at Polsa, Lake Garda and family activities with children in Trentino.",
    },
    {
      name: "keywords",
      content:
        "things to do Brentonico, hiking Monte Baldo, trekking Brentonico, alpine huts Trentino, Monte Baldo Nature Park, Lake Garda day trip, Rovereto museums, skiing Polsa San Valentino, B&B near ski slopes Polsa, family mountain holidays Trentino, kids activities Brentonico, Prada di Brentonico families",
    },
    {
      property: "og:title",
      content: "Explore the Surroundings of Brentonico | B&B Cuore di Bosco",
    },
    {
      property: "og:description",
      content:
        "Explore the surroundings of B&B Cuore di Bosco: Monte Baldo trekking, alpine huts, skiing at Polsa and Lake Garda. Family mountain holidays in Trentino.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.cuoredibosco.it/en/explore",
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
      content: "Explore the Surroundings of Brentonico | B&B Cuore di Bosco",
    },
    {
      name: "twitter:description",
      content:
        "Explore the surroundings of B&B Cuore di Bosco: trekking, alpine huts, skiing at Polsa and Lake Garda for families in Trentino.",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.cuoredibosco.it/en/explore" }],
});
</script>

<style scoped>
section {
  margin: 1em auto;
  max-width: 1200px;
  padding: 2rem;
  font-size: 16pt;
  text-rendering: optimizeLegibility;
  line-height: 1.75;
  font-weight: 400;
}

a {
  font-weight: bold;
}

.spaced {
  margin-top: 1.2em;
}

.welcome {
  position: relative;
  overflow: hidden;
}

.landing-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center 50%;
  display: block;
}

.landing-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.footer {
  max-width: 800px;
}

.image-wrapper img {
  width: 100%;
  height: auto;
}

.page-title {
  font-size: 64pt;
  font-variant: small-caps;
}

@media (max-width: 1024px) {
  #page {
    margin-top: 50px;
  }

  p {
    font-size: 14pt;
  }

  h1,
  .page-title,
  .landing-title {
    font-size: 24pt;
  }

  h2 {
    font-size: 18pt;
  }

  h3 {
    font-size: 16pt;
  }

  .rovereto-inview {
    margin: 0;
    padding: 0;
  }

  .rovereto-inview figure {
    margin: 0;
    padding: 0;
  }
}
</style>