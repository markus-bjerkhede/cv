<template>
  <Consultant :id="id" />
</template>

<script>
import Consultant from "../components/Consultant.vue";
export default {
  components: { Consultant },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>