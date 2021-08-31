<template>
  <section>
    <div class="flex-wrap">
      <div class="input-layout">
        <label for="profile-firstname">Name</label>
        <input id="profile-firstname" v-model="firstName" type="text" />
      </div>
      <div class="input-layout">
        <label for="profile-lastName">Last Name</label>
        <input id="profile-lastName" v-model="lastName" type="text" />
      </div>
    </div>
    <div class="flex-wrap">
      <div class="input-layout">
        <label for="profile-title">Title</label>
        <input id="profile-title" v-model="title" type="text" />
      </div>

      <div class="input-layout">
        <label for="profile-email">Email</label>
        <input id="profile-email" v-model="email" type="text" />
      </div>
    </div>

    <div class="input-layout phoneNumber-input">
      <label for="profile-phoneNumber">Phone number</label>
      <input id="profile-phoneNumber" v-model="phoneNumber" type="text" />
    </div>

    <button class="button positive" @click="createUserInfo">Submit info</button>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phoneNumber: "",
    };
  },

  beforeMount() {
    this.getUserInfo();
  },
  methods: {
    async createUserInfo() {
      const body = {
        firstname: this.firstName,
        lastname: this.lastName,
        title: this.title,
        email: this.email,
        phone: this.phoneNumber,
      };
      const request = {
        url: "http://localhost:5000/users/user/updateuserinfo",
        withCredentials: true,
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        data: body,
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.$toast.success(`Added profile info for ${this.firstName}`);
            // getUserInfo();
          }
        })
        .catch((error) => {
          this.$toast.error(`Error adding skill: ${error}`);
        });
    },
    async getUserInfo() {
      const request = {
        url: "http://localhost:5000/users/user/getuserinfo",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.email = response.data.email;
            this.firstName = response.data.firstname;
            this.lastName = response.data.lastname;
            this.title = response.data.title;
            this.phoneNumber = response.data.phone;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.flex-wrap {
  display: flex;
  margin: 2rem;
}
.input-layout {
  margin: 1rem;
}
.phoneNumber-input {
  width: 50%;
  margin: auto;
}
.text-area {
  height: 30rem;
  margin: 2rem 0 4rem 0;
  width: 100%;
}
.attribute-container {
  width: 100%;
}
.profile-presentation {
  font-size: 26px;
  font-style: bold;
}
</style>