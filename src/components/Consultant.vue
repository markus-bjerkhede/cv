<template>
<section class="wrapper">
    <img alt="profile picture" :src="profilePic" class="cropped-image" />
    <div>
      <p>{{ firstName }}</p>
      <p>{{ lastName }}</p>
    </div>
    <div>
      <p>{{ title }}</p>
      <p>{{ email }}</p>
      <p>{{ phone }}</p>
    </div>
</section>
</template>

<script>
import axios from "axios";
export default {
  name: "Consultant",
  data() {
    return {
      title: "",
      phone: "",
      firstName: "",
      lastName: "",
      profilePic: "",
      public: "",
      email: "",
      available: Boolean,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  beforeMount() {
    this.getUser();
    this.getProfilePic();
    this.getPrivateStatus();
  },
  methods: {
    async getUser() {
      const data = { _id: this.id };
      let request = {
        url: "http://localhost:5000/public/user",
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
            console.log(response.data);
            this.phone = response.data.user.phone;
            this.firstName = response.data.user.firstname;
            this.lastName = response.data.user.lastname;
            this.available = response.data.user.availible;
            this.title = response.data.user.title;
            this.email = response.data.user.email;
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
    async getProfilePic() {
      const data = { _id: this.id };
      let request = {
        url: "http://localhost:5000/public/user/getpublicprofilepic",
        withCredentials: true,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: data,
      };
      await axios(request)
        .then((response) => {
          if (response.status === 200 && response.data.profilePic) {
            this.profilePic = `http://localhost:5000/images/${response.data.profilePic}`;
          } else {
            this.profilePic = "http://localhost:5000/images/placeholder.png";
          }
        })
        .catch((error) => {
          this.profilePic = "http://localhost:5000/images/placeholder.png";
          console.log(error);
        });
    },
    async getPrivateStatus() {
      const data = { _id: this.id };
      let request = {
        url: "http://localhost:5000/users/user/getprivateresumestatus",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
        data: data,
      };
      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.public = response.data.privateResume;
            console.log(this.public);
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
    async updatePrivateStatus() {
      const data = { _id: this.id };
      let request = {
        url: "http://localhost:5000/users/user/updateprivateresumestatus",
        withCredentials: true,
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        data: data,
      };
      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.public = response.data.privateResume;
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
.wrapper {
  display: flex;
  justify-content: center;
}
div {
  margin: 1rem;
}
section {
  margin-top: 2rem;
}
</style>
