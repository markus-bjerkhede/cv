<template>
  <header class="navigation">
    <router-link class="logo-link" to="/"
      ><img class="logo" src="../assets/CVLogo_small.png" alt="Missing Logo"
    /></router-link>

    <div class="big">
      <router-link class="link-style" to="/">Home</router-link>
    </div>
    <div class="big" v-if="!isLoggedIn">
      <router-link class="link-style" to="/register">Register</router-link>
    </div>
    <div class="big" v-if="!isLoggedIn">
      <router-link class="link-style" to="/login">Login</router-link>
    </div>

    <div class="big" v-if="isLoggedIn">
      <router-link class="link-style" to="/consultants"
        >Consultants</router-link
      >
    </div>
    <div class="big" v-if="isLoggedIn">
      <router-link v-if="isLoggedIn" class="link-style" to="/myProfile"
        >My profile</router-link
      >
    </div>
    <div v-if="isLoggedIn" class="big">
      <Logout />
    </div>
    <div class="small">
      <Slide class="small" :closeOnNavigation="true">
        <router-link class="link-style" to="/">Hem</router-link>
        <router-link v-if="!isLoggedIn" class="link-style" to="/register"
          >Register</router-link
        >
        <router-link v-if="!isLoggedIn" class="link-style" to="/login"
          >Login</router-link
        >
        <router-link v-if="isLoggedIn" class="link-style" to="/consultants"
          >Consultants</router-link
        >
        <router-link v-if="isLoggedIn" class="link-style" to="/myProfile"
          >My profile</router-link
        >
        <Logout v-if="isLoggedIn" />
      </Slide>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import { Slide } from "vue3-burger-menu";
import Logout from "@/components/Logout.vue";
export default {
  components: { Logout, Slide },
  name: "Header",
  data() {
    return {};
  },
  beforeMount() {
    this.isAuthenticated();
  },
  methods: {
    async isAuthenticated() {
      let request = {
        url: "http://localhost:5000/users/user/authenticated",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios(request)
        .then((res) => {
          if (res.status === 200) {
            this.$store.commit("login");
          }
        })
        .catch(() => {
          this.$store.commit("logout");
          this.$router.push("/");
        });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: black;
  height: 10rem;
  flex-basis: 100%;
}
a.router-link-active {
  cursor: default;
  color: purple;
  border-bottom: solid 1px purple;
}
a.logo-link {
  border-bottom: none;
}

.link-style {
  color: #4ec4fd;
  text-decoration: none;
}
.logo {
  justify-content: flex-start;
}
@media screen and (max-width: 800px) {
  .big {
    display: none;
  }
  .navigation {
    justify-content: flex-end;
  }
}
@media screen and (min-width: 800px) {
  .small {
    display: none;
  }
}
</style>