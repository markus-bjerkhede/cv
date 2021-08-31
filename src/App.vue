<template>
  <main>
    <Header />
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<script>
// import axios from "axios";
import Header from "@/components/Header.vue";
export default {
  components: { Header },
  name: "App",
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.cropped-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
  border-radius: 50%;
}

.button {
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  transition-duration: 0.4s;
  color: white;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  margin: 1rem;
}
.positive {
  background-color: #4ec4fd;
}
.negative {
  background-color: #6d6d6d;
}
.content {
  display: flex;
  justify-content: center;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-area {
  padding: 1rem;
}

.icon {
  padding: 0.3rem;
  cursor: pointer;
  justify-content: right;
}

.attribute-container {
  border-bottom: 1px solid black;
  width: 25rem;
  margin: 0.5rem 0;
}

.attribute-row-table {
  width: 100%;
}

.editable-span {
  cursor: pointer;
}
</style>
<style src="@vueform/toggle/themes/default.css"></style>