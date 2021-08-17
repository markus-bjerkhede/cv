<template>
  <section>
    <div class="grid">
      <span class="experiance">
        <Presentation :readOnly="true" :display="true" />
      </span>
      <Experience :readOnly="false" />
      <Education :readOnly="false" />
      <Hobby :readOnly="false" />
      <Language :readOnly="false" />
      <span class="skill">
        <Skill :readOnly="false" />
      </span>
    </div>
  </section>
</template>

<script>
import Presentation from "../components/Presentation";
import Hobby from "../components/Hobby";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Language from "../components/Language";
import Skill from "../components/Skill";
export default {
  components: { Presentation, Hobby, Education, Experience, Language, Skill },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  column-gap: 1rem;
  border-bottom: 1px solid black;
}
.experiance {
  grid-column: 1 / span 2;
}
.attribute-container {
  width: 100%;
}
.skill {
  grid-column: 1 / span 2;
  width: 50%;
  justify-self: center;
}

@media screen and (max-width: 800px) {
  .grid {
    width: 20rem;
    grid-template-columns: 1fr;
  }
}
</style>