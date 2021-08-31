<template>
  <section class="star-rating">
    <label
        class="star-rating__star"
        v-for="rating in ratings"
        :key="rating"
        :class="{ 'is-selected': value >= rating && value != null }"
        @click="set(rating, id, name)"
        @mouseover="starOver($event, rating)"
        @mouseout="starOut($event)"
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
    name: {
      type: String,
    },
    id: {
      type: String
    },
    initialValue: {
      type: String,
      default: '0',
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
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
    starOver(event, index) {
      if (!this.disabled) {
        event.target.style.cursor = 'pointer';
        this.temp_value = this.value;
        return (this.value = index);
      }
    },

    /*
     * Behaviour of the stars on mouseout.
     */
    starOut(event) {
      if (!this.disabled) {
        event.target.style.cursor = 'default';
        return (this.value = this.temp_value);
      }
    },

    /*
     * Set the rating.
     */
    set(value, id, name) {
      if (!this.disabled) {
        this.temp_value = value;
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
.star-rating__star.is-selected {
  color: #4ec4fd;
}
</style>
