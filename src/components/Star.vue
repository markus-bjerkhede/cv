<template>
  <section class="star-rating">
    <label
      class="star-rating__star"
      v-for="rating in ratings"
      :key="rating"
      :class="{ 'is-selected': value >= rating && value != null }"
      @click="set(rating, id, name)"
      @mouseover="star_over(rating)"
      @mouseout="star_out"
    >
      ★</label
    >
  </section>
</template>

<script>
export default {
  name: "Star",
  emits: ["update"],
  props: {
    name: String,
    id: String,
    initialValue: String,
  },
  beforeMount() {
    this.value = this.initialValue;
  },
  data() {
    return {
      temp_value: null,
      value: null,
      ratings: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    /*
     * Behaviour of the stars on mouseover.
     */
    star_over(index) {
      if (!this.disabled) {
        this.temp_value = this.value;
        return (this.value = index);
      }
    },

    /*
     * Behaviour of the stars on mouseout.
     */
    star_out() {
      if (!this.disabled) {
        return (this.value = this.temp_value);
      }
    },

    /*
     * Set the rating.
     */
    set(value, id, name) {
      if (!this.disabled) {
        this.temp_value = value;
        console.log(value, id, name);
        this.$emit("update", value, id, name);
        return (this.value = value);
      }
    },
  },
};
</script>

<style scoped>
.star-rating__star {
  display: inline-flex;
  padding: 0.15rem;
  font-size: 1.5em;
  color: #ababab;
  transition: color 0.2s ease-out;
}
.star-rating__star:hover {
  cursor: pointer;
}
.star-rating__star.is-selected {
  color: #4ec4fd;
}
</style>