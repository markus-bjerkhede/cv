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
              @blur="updateLanguageName($event, language._id, language.stars)"
            >
              {{ language.name }}
            </span>
          </td>
          <td>
            <Star
              @update="updateLanguageStars"
              :initialValue="language.stars"
              :name="language.name"
              :id="language._id"
              :disabled="readOnly"
            />
          </td>
          <td v-if="!readOnly">
            <img
              class="icon"
              alt="remove"
              src="../assets/icons/rubbish-bin.png"
              @click="removeLanguage(language._id)"
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
            <button class="button positive" @click="addLanguage">
              Submit language
            </button>
            <button @click="cancelForm" class="button negative">Cancel</button>
          </div>
        </div>
        <button v-show="!showAdd" class="button positive" @click="smoothScroll">
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
      languageStars: "",
      showAdd: false,
      languages: [],
    };
  },
  props: {
    readOnly: { type: Boolean, default: false },
    id: { type: String, default: null}
  },

  beforeMount() {
    this.getLanguages();
  },

  methods: {
    async addLanguage() {
      const body = {
        name: this.languageName,
        stars: this.languageStars,
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
            this.languageStars = "";
            this.cancelForm();
            this.getLanguages();
          }
        })
        .catch((error) => {
          this.$toast.error(`Error adding language: ${error}`);
        });
    },
    async getLanguages() {
        let request;
      if (this.id) {
        request = {
         url: "http://localhost:5000/public/user/publiclanguages",
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          data: { _id: this.id }
        };
         } else {
        request = {
          url: "http://localhost:5000/users/user/languages",
          method: "get",
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        };
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
    async removeLanguage(id) {
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
            this.getLanguages();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateLanguageName(event, id, stars) {
      const body = {
        _id: id,
        name: event.target.innerText,
        stars: stars,
      };
      await this.updateLanguage(body);
    },
    async updateLanguageStars(stars, id, name) {
      const body = {
        _id: id,
        name: name,
        stars: stars,
      };
      await this.updateLanguage(body);
    },
    async setStars(stars) {
      this.languageStars = stars;
    },
    async updateLanguage(body) {
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
            this.getLanguages();
          }
        })
        .catch((error) => {
          this.$toast.error(`Error updating language ${body.name}: ${error}`);
        });
    },
    async smoothScroll() {
      const container = document.getElementById("scrollToLanguage");
      this.showAdd = true;
      this.$smoothScroll({
        updateHistory: false,
        scrollTo: container,
      });
    },
    cancelForm() {
      this.languageName = "";
      this.languageStars = "";
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