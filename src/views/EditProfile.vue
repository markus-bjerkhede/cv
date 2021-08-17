<template>
  <div class="wrapper">
    <div class="full-cols">
      <Presentation />
    </div>
    <div class="cols">
      <Hobby />
      <Education />
      <Experience />
      <Language />
      <Skill />
    </div>
  </div>
</template>

<script>
import Presentation from "../components/Presentation.vue";
import Hobby from "../components/Hobby.vue";
import Education from "../components/Education.vue";
import Experience from "../components/Experience.vue";
import Language from "../components/Language.vue";
import Skill from "../components/Skill.vue";
export default {
  name: "UserProfile",
  components: {
    Presentation,
    Hobby,
    Education,
    Experience,
    Language,
    Skill,
  },
};
</script>

<style scoped>
</style>  