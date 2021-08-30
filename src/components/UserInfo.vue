<template>
  
  <section class="wrapper">
    <img class="cropped-image" :src="imageSource" alt="Profile picture" />
    <div>
      <p>{{ firstName }}</p>
      <p>{{ lastName }}</p>
    </div>
    <div>
      <p>{{ title }}</p>
      <p>{{ email }}</p>
      <p>{{ phoneNumber }}</p>
    </div>
    <div>
      <img
        class="icon"
        alt="edit"
        src="../assets/icons/edit.png"
        @click="routeToEditProfile"
      />
    </div>
  </section>
 
</template>

<script>
import axios from "axios";
export default {
  name: "UserInfo",
  data() {
    return {
      imageSource: "",
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phoneNumber: "",
    };
  },
  beforeMount() {
    this.getProfilePic();
    this.getUserInfo();
  },
  methods: {
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
            console.log(response.data);
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
    async getProfilePic() {
      const request = {
        url: "http://localhost:5000/users/user/getprofilepic",
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
        method: "get",
      };

      await axios(request)
        .then(async (response) => {
          if (response.status === 200 && response.data.profilePic) {
            this.imageSource = `http://localhost:5000/images/${response.data.profilePic}`;
          } else {
            this.imageSource = "http://localhost:5000/images/placeholder.png";
          }
        })
        .catch((error) => {
          this.imageSource = "http://localhost:5000/images/placeholder.png";
          console.log(error);
        });
    },
    routeToEditProfile() {
      this.$router.push("/EditUser");
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

.icon {
  position: absolute;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>