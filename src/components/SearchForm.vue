<template>
  <div class="search-form">
    <form class="search-form__form" @submit.prevent="onFormSubmit">
      <input
        v-model="artist"
        class="search-form__input"
        type="text"
        placeholder="Type artist name"
        required
      />
      <button class="search-form__button">Search</button>
    </form>

    <div class="search-form__history">
      <div
        v-for="(artist, index) in historyArtists"
        :key="index"
        class="search-form__history-item"
        @click="chooseRecent(index)"
      >
        {{ artist }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["form-submit", "choose-recent"],

  data() {
    return {
      artist: "",
      historyArtists: [],
    };
  },

  methods: {
    onFormSubmit() {
      this.$emit("form-submit", this.artist);

      if (this.historyArtists.indexOf(this.artist) === -1) {
        this.historyArtists.push(this.artist);
      }

      this.artist = "";
      return this.historyArtists;
    },

    chooseRecent(index) {
      this.artist = this.historyArtists[index];
      this.$emit("choose-recent", this.artist);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-form {
  &__form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 1rem;
  }

  &__input {
    font-family: inherit;
    font-size: 1.6rem;
    color: #191c2b;
    display: block;
    width: auto;
    height: 4rem;
    padding: 0.8rem 1.3rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.6rem;
    background: none;
    outline: none;
    margin: 0;
  }

  &__button {
    font-family: inherit;
    font-size: 1.3rem;
    color: #191c2b;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 125px;
    min-height: 40px;
    padding: 5px 15px;
    border: 0.1rem solid #191c2b;
    border-radius: 0.6rem;
    background: none;
    outline: none;
    appearance: none;
    user-select: none;
    cursor: pointer;
    margin: 0;
  }

  &__history {
    display: flex;
    margin-top: 3rem;
  }

  &__history-item {
    margin-left: 1rem;
    font-size: 1.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: #e1e1e8;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:first-of-type {
      margin: 0;
    }
  }
}
</style>