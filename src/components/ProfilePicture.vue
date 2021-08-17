<template>
  <section class="attribute-container">
    <figure>
      <img alt="profile picture" :src="imageSource" class="cropped-image" />
      <figcaption v-if="preview">preview</figcaption>
    </figure>
    <input
      id="actual-btn"
      type="file"
      @change="onFileSelected"
      style="display: none"
      accept="image/*"
    />

    <label for="actual-btn">Choose img</label>
    <button
      class="button1 button-positive"
      :disabled="!selectedFile"
      @click="onUpload"
    >
      Upload
    </button>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfilePicture",
  data() {
    return {
      selectedFile: null,
      imageSource: "",
      preview: false,
    };
  },
  beforeMount() {
    this.getProfilePic();
  },
  methods: {
    onFileSelected(event) {
      this.imageSource = URL.createObjectURL(event.target.files[0]);
      this.preview = true;
      this.selectedFile = event.target.files[0];
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
    async onUpload() {
      const fd = new FormData();
      fd.append("profilePic", this.selectedFile);

      const request = {
        url: "http://localhost:5000/users/user/uploadprofilepic",
        withCredentials: true,
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        data: fd,
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.selectedFile = null;
            this.preview = false;
          }
        })
        .catch((error) => {
          console.log("Bild inte uppladdad", error);
        });
    },
  },
};
</script>
<style scoped>
.cropped-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
  border-radius: 50%;
}
label {
  background-color: #7be7fe;
  color: white;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  margin: 1rem;
}
.actual-btn {
  margin: 5rem;
}
.attribute-container {
  margin: auto;
  margin-top: 4rem;
}
</style>