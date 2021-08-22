<template>
  <main>
    <h1>Welcome to our page</h1>
    <div class="wrapper">
      <div>
        <p class="share center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div>
        <img class="share" src="../assets/HomeImg.png" alt="" />
      </div>
    </div>
    <div v-if="!isLoggedIn">
      <span>
        <router-link class="button1" to="/register">Register</router-link>
      </span>
      <span>
        <router-link class="button1" to="/login">Login</router-link>
      </span>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
<style scoped>
h1 {
  margin-top: 5rem;
}
.button1 {
  width: 5rem;
  margin: 0 4rem;
}
.wrapper {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
}

.wrapper > div {
  flex: 1 1 auto;
}

.share {
  min-width: 100%;
}
/*
.share {
  display: flex;
  margin: 2rem 1rem;
  flex: 1 1 auto;
}
.center {
  align-items: center;
  justify-content: center;
}
*/
</style>