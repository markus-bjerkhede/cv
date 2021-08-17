<template>
  <section class="attribute-container">
    <div>
      <h2>Languages</h2>
      <table class="attribute-row-table">
        <tr v-for="language in languages" :key="language._id">
          <td>
            <span
              class="editable-span"
              spellcheck="false"
              contenteditable="true"
              @blur="updatelanguageName($event, language._id, language.stars)"
            >
              {{ language.name }}
            </span>
          </td>
          <td>
            <Star
              @update="updatelanguagestars"
              :initialValue="language.stars"
              :name="language.name"
              :id="language._id"
            />
          </td>
          <td v-if="!readOnly">
            <img
              class="icon"
              alt="remove"
              src="../assets/icons/rubbish-bin.png"
              @click="removelanguage(language._id)"
            />
          </td>
        </tr>
      </table>
      <div v-if="!readOnly">
        <div id="scrollToLanguage" v-show="showAdd" class="input-area">
          <label for="language">language</label>
          <input
            type="text"
            v-model="languageName"
            id="language"
            name="language"
            placeholder="Swedish"
          />
          <Star @update="setStars" />

          <div>
            <button class="button1" @click="addlanguage">
              Submit language
            </button>
            <button @click="cancelForm" class="button2">Cancel</button>
          </div>
        </div>
        <button v-show="!showAdd" class="button1" @click="smoothScroll">
          Add language
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Star from "@/components/Star.vue";

export default {
  name: "Language",

  components: { Star },

  data() {
    return {
      languageName: "",
      languagestars: "",
      showAdd: false,
      languages: [],
    };
  },
  props: {
    readOnly: { type: Boolean, default: false },
  },

  beforeMount() {
    this.getlanguages();
  },

  methods: {
    async addlanguage() {
      const body = {
        name: this.languageName,
        stars: this.languagestars,
      };

      const request = {
        url: "http://localhost:5000/users/user/language",
        withCredentials: true,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: body,
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.$toast.success(`Added language ${this.languageName}`);
            this.languagestars = "";
            this.cancelForm();
            this.getlanguages();
          }
        })
        .catch((error) => {
          this.$toast.error(`Error adding language: ${error}`);
        });
    },
    async getlanguages() {
      const request = {
        url: "http://localhost:5000/users/user/languages",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.languages = response.data.languages;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$store.commit("logout");
            this.$router.push("/");
          }
          console.log(error);
        });
    },
    async removelanguage(id) {
      const body = {
        _id: id,
      };

      const request = {
        url: "http://localhost:5000/users/user/removelanguage",
        withCredentials: true,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: body,
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.$toast.info("language removed");
            this.getlanguages();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updatelanguageName(event, id, stars) {
      const body = {
        _id: id,
        name: event.target.innerText,
        stars: stars,
      };
      await this.updatelanguage(body);
    },
    async updatelanguagestars(stars, id, name) {
      const body = {
        _id: id,
        name: name,
        stars: stars,
      };
      await this.updatelanguage(body);
    },
    async setStars(stars) {
      this.languagestars = stars;
    },
    async updatelanguage(body) {
      const request = {
        url: "http://localhost:5000/users/user/updatelanguage",
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
            this.$toast.success(`Updated language ${body.name}`);
            this.getlanguages();
          }
        })
        .catch((error) => {
          this.$toast.error(`Error updating language ${body.name}: ${error}`);
        });
    },
    async smoothScroll() {
      const container = document.getElementById("scrollToLanguage");
      this.showAdd = true;
      await this.showAdd;
      this.$smoothScroll({
        updateHistory: false,
        scrollTo: container,
      });
    },
    cancelForm() {
      this.languageName = "";
      this.languagestars = "";
      this.showAdd = false;
    },
  },
};
</script>

<style scoped>
td {
  width: 33%;
  text-align: center;
  white-space: nowrap;
}

tr td:first-child {
  width: 33%;
  text-align: left;
}

tr td:last-child {
  width: 33%;
  text-align: right;
}
</style>