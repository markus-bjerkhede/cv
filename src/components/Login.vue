<template>
  <section>
    <h1>Login</h1>
    <form @submit="login($event)">
      <div class="flex-box">
        <div class="imput-row">
          <label for="username"> Username</label>
          <input
            type="text"
            id="username"
            @keyup="checkLength"
            v-model="username"
          />
        </div>
        <div class="imput-row">
          <label for="password"> Password</label>
          <input
            id="password"
            @keyup="checkLength"
            v-model="password"
            type="password"
          />
        </div>
        <input
          type="submit"
          value="Login"
          class="button1"
          :disabled="sendButtonDisabled"
        />
        <span> {{ errMsg }} </span>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      sendButtonDisabled: true,
      errMsg: "",
      username: "",
      password: "",
    };
  },
  methods: {
    checkLength() {
      this.sendButtonDisabled = !(this.username.length && this.password.length);
    },
    async login(event) {
      event.preventDefault();
      const data = { username: this.username, password: this.password };
      let request = {
        url: "http://localhost:5000/users/user/login",
        withCredentials: true,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: data,
      };
      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.$store.commit("login");
            this.$router.push("/myProfile");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.errMsg = "Invalid username or password";
          } else {
            this.errMsg = "Something went wrong";
          }
        });
    },
  },
};
</script>

<style scoped>
.flex-box {
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imput-row > label + input {
  margin: 0.3rem;
}
.imput-row {
  margin-bottom: 1rem;
}
h1 {
  margin-top: 5rem;
}
</style>