<template>
  <header class="navigation">
    <img class="logo" src="../assets/CVLogo_small.png" alt="Missing Logo" />
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
    <!-- <div class="big" v-if="isLoggedIn">
      <router-link class="link-style" to="/myProfile">My Profile</router-link>
    </div> -->
    <!-- <div class="big" v-if="isLoggedIn">
      <router-link v-if="isLoggedIn" class="link-style" to="/profile"
        >Profile</router-link
      >
    </div> -->
    <div class="big" v-if="isLoggedIn">
      <router-link v-if="isLoggedIn" class="link-style" to="/myProfile"
        >My profile</router-link
      >
    </div>
    <div v-if="isLoggedIn" class="big">
      <Logout />
    </div>
    <div class="small">
    <Slide right class="small" :closeOnNavigation="true">
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
      <!-- <router-link v-if="isLoggedIn" class="link-style" to="/myProfile"
        >My profile</router-link
      > -->
      <!-- <router-link v-if="isLoggedIn" class="link-style" to="/profile"
        >Profile</router-link
      > -->
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
  background-color: #bbb;
}
.navigation .current {
background-color: red;
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
  .navigation {justify-content: left;}
  .small {
    display: flex;
    position: relative;
    justify-self: flex-end;
    /* margin-left: 30rem;
    margin-bottom: 6rem; */
    width: 100%;
    flex-basis: 100%
  }
  .bm-menu {
    display: flex;
    justify-content: flex-end;
  }
}
@media screen and (min-width: 800px) {
  .small {
    display: none;
  }
}
</style>