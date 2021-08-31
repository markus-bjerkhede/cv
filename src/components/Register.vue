<template>
  <section>
    <div class="flex-box">
      <input v-model="username" placeholder="username" />
      <input v-model="password" type="password" placeholder="password" />
      <input v-model="password2" type="password" placeholder="password" />
      <button class="button positive" @click="validatePassword">Create user</button>
    </div>
  </section>
</template>


<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    validatePassword() {
      if (this.password === this.password2) {
        this.createUser();
      } else {
        this.$toast.error(`Passwords do not match`);
      }
    },
    async createUser() {
      const data = {
        username: this.username,
        password: this.password,
        role: "user",
        availible: true,
      };
      const options = {
        method: "POST",
        url: "http://localhost:5000/users/user/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios
        .request(options)
        .then((response) => {
          if (response.status === 201) {
            this.$toast.success(`User created`);
            this.$router.push("/login");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.flex-box {
  display: flex;
  margin-top: 5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input {
  margin-bottom: 0.5rem;
}
</style>