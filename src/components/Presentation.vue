<template>
  <section>
    <div class="attribute-container">
      <div class="input-layout text-area">
        <h2 v-if="!readOnly">Write something about yourself</h2>
        <div class="presentation-container" v-if="readOnly">
          <p>{{ presentation }}</p>
        </div>
        <div v-else>
          <textarea
            cols="2"
            rows="10"
            class="text-area"
            id="profile-presentation"
            v-model="presentation"
            style="resize: none"
            type="text"
          />
        </div>
      </div>
      <button v-if="!readOnly" class="button1" @click="createUserInfo">
        Add presentation
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Presentation",
  data() {
    return {
      presentation: "",
    };
  },
  props: {
    readOnly: { type: Boolean, default: false },
  },
  beforeMount() {
    this.getPresentation();
  },
  methods: {
    async createUserInfo() {
      const body = {
        presentation: this.presentation,
      };
      const request = {
        url: "http://localhost:5000/users/user/updatepresentation",
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
            this.$toast.success("Added presentation text");
            this.getPresentation();
          }
        })
        .catch((error) => {
          this.$toast.error(`Error adding skill: ${error}`);
        });
    },
    async getPresentation() {
      const request = {
        url: "http://localhost:5000/users/user/presentation",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.presentation = response.data.presentation;
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
.text-area {
  width: 100%;
}
.presentation-container {
  text-align: start;
  width: 50rem;
}
.attribute-container {
  width: 100%;
}
</style>