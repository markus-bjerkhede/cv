<template>
  <section>
    <span class="link-style" @click="logoutUser">Logout</span>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Logout",
  methods: {
    async logoutUser() {
      const request = {
        method: "GET",
        url: "http://localhost:5000/users/user/logout",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.$store.commit("logout");
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.error(error);
          this.$router.push("/");
        });
    },
  },
};
</script>


<style scoped>
.link-style {
  color: #4ec4fd;
  text-decoration: none;
  cursor: pointer;
}
</style>