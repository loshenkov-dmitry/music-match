<template>
  <div class="main-layout">
    <div class="main-layout__wrap">
      <Heading text="Find your music match" />
      <SearchForm
        @form-submit="onSearchFormSubmit"
        @choose-recent="onSearchFormSubmit"
      />
      <ArtistInfo v-if="isArtistInfo" v-bind="artistInfo" />
      <SimilarArtist v-if="isSimilarArtists" :artists="similarArtists" />
    </div>
  </div>
</template>

<script>
import Heading from "./components/Heading";
import SearchForm from "./components/SearchForm";
import ArtistInfo from "./components/ArtistInfo";
import SimilarArtist from "./components/SimilarArtist";
export default {
  data() {
    return {
      artistInfo: {},
      currentArtist: null,
      similarArtists: [],
    };
  },

  computed: {
    isArtistInfo() {
      return Object.keys(this.artistInfo).length > 0;
    },

    isSimilarArtists() {
      return this.similarArtists.length > 0;
    },
  },
  components: {
    Heading,
    SearchForm,
    ArtistInfo,
    SimilarArtist,
  },

  methods: {
    async onSearchFormSubmit(artist) {
      const artistMatch = await this.searchArtist(artist);

      if (!artistMatch || artistMatch === this.currentArtist) {
        return;
      }
      this.currentArtist = artistMatch;

      try {
        const [artistInfo, similarArtists] = await Promise.all([
          await this.$lastfmService.getArtistInfo(this.currentArtist),

          await this.$lastfmService.getSimilarArtists(this.currentArtist),
        ]);

        (this.artistInfo = artistInfo), (this.similarArtists = similarArtists);
      } catch (e) {
        console.error(e);
      }
    },

    async searchArtist(artist) {
      try {
        const artistMatches = await this.$lastfmService.searchArtists(artist);

        if (artistMatches.length === 0) {
          throw new Error("Not found");
        }

        const artistMatch = artistMatches.find(
          (item) => item.toLowerCase() === artist.toLowerCase()
        );

        return artistMatch ? artistMatch : artistMatches[0];
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

html {
  font-size: 0.625em;
  box-sizing: border-box;
  text-size-adjust: 100%;
  text-rendering: optimizeSpeed;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-family: "Roboto", sans-serif;
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.87);
  line-height: normal;
  background: #fafafa;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0;
}

.main-layout {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 50px;

  &__wrap {
    max-width: 74rem;
    padding: 0 20px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 600px) {
  .main-layout {
    padding-top: 50px;
  }
}
</style>