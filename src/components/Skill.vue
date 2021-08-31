<template>
  <section class="attribute-container">
    <h2>Skills</h2>
    <table class="attribute-row-table">
      <tr v-for="skill in skills" :key="skill._id">
        <td>
          <span
            class="editable-span"
            spellcheck="false"
            contenteditable="true"
            @blur="updateSkillName($event, skill._id, skill.stars)"
          >
            {{ skill.name }}
          </span>
        </td>
        <td>
          <Star
            @update="updateSkillStars"
            :initialValue="skill.stars"
            :name="skill.name"
            :id="skill._id"
            :disabled="readOnly"
          />
        </td>
        <td v-if="!readOnly">
          <img
            class="icon"
            alt="remove"
            src="../assets/icons/rubbish-bin.png"
            @click="removeSkill(skill._id)"
          />
        </td>
      </tr>
    </table>
    <div v-if="!readOnly">
      <div id="scrollToSkill" v-show="showAdd" class="input-area">
        <label for="skill">Skill</label>
        <input
          type="text"
          v-model="skillName"
          id="skill"
          name="skill"
          placeholder="I.E Java"
        />
        <Star @update="setStars" :disabled="readOnly" />
        <div>
          <button class="button positive" @click="addSkill">Submit skill</button>
          <button @click="cancelForm" class="button negative">Cancel</button>
        </div>
      </div>
      <button v-show="!showAdd" class="button positive" @click="smoothScroll">
        Add skill
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Star from "@/components/Star.vue";

export default {
  name: "Skill",

  components: { Star },

  data() {
    return {
      skillName: "",
      skillStars: "",
      showAdd: false,
      skills: [],
    };
  },

  props: {
    readOnly: { type: Boolean, default: false },
    id: { type: String, default: null}
  },

  mounted() {
    this.getSkills();
  },

  methods: {
    async addSkill() {
      const body = {
        name: this.skillName,
        stars: this.skillStars,
      };

      const request = {
        url: "http://localhost:5000/users/user/skill",
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
            this.$toast.success(`Added skill ${this.skillName}`);
            this.cancelForm();
            this.getSkills();
          }
        })
        .catch((error) => {
          this.$toast.error(`Error adding skill: ${error}`);
        });
    },
    async getSkills() {
          let request;
      if (this.id) {
        request = {
        url: "http://localhost:5000/public/user/publicskills",
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          data: { _id: this.id }
        };
         } else {
        request = {
          url: "http://localhost:5000/users/user/skills",
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
            this.skills = response.data.skills;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeSkill(id) {
      const body = {
        _id: id,
      };

      const request = {
        url: "http://localhost:5000/users/user/removeskill",
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
            this.$toast.info("Skill removed");
            this.getSkills();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateSkillName(event, id, stars) {
      const body = {
        _id: id,
        name: event.target.innerText,
        stars: stars,
      };
      await this.updateSkill(body);
    },
    async updateSkillStars(stars, id, name) {
      const body = {
        _id: id,
        name: name,
        stars: stars,
      };
      await this.updateSkill(body);
    },
    async setStars(stars) {
      this.skillStars = stars;
    },
    async updateSkill(body) {
      const request = {
        url: "http://localhost:5000/users/user/updateskill",
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
            this.$toast.success(`Updated skill ${body.name}`);

            this.getSkills();
          }
        })
        .catch((error) => {
          this.$toast.error(`Error updating skill ${body.name}: ${error}`);
        });
    },
    async smoothScroll() {
      const container = document.getElementById("scrollToSkill");
      this.showAdd = true;
      this.$smoothScroll({
        updateHistory: false,
        scrollTo: container,
      });
    },
    cancelForm() {
      this.skillName = "";
      this.skillStars = "";
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