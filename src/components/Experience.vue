<template>
  <section class="attribute-container">
    <h2>Experience</h2>
    <table
      class="attribute-row-table wrapper-table"
      v-for="experience in experiences"
      :key="experience._id"
    >
      <tr>
        <td class="experience-td">
          <table class="experience-table">
            <tr>
              <td class="label-column">Name:</td>
              <td class="value-column">
                {{ experience.name }}
              </td>
            </tr>
            <tr>
              <td class="label-column">Description:</td>
              <td class="value-column">
                {{ experience.description }}
              </td>
            </tr>
            <tr>
              <td class="label-column">Tools:</td>
              <td class="value-column">
                {{ experience.tools }}
              </td>
            </tr>
            <tr>
              <td class="label-column">Start date:</td>
              <td class="value-column">
                {{ experience.fromDate.split("T")[0] }}
              </td>
            </tr>
            <tr>
              <td class="label-column">End date:</td>
              <td class="value-column" v-if="experience.toDate">
                {{ experience.toDate.split("T")[0] }}
              </td>
              <td class="value-column" v-else-if="experience.currentJob">
                currentJob
              </td>
            </tr>
          </table>
        </td>
        <td v-if="!readOnly" class="icon-column">
          <img
            class="icon"
            alt="remove"
            src="../assets/icons/rubbish-bin.png"
            @click="removeExperience(experience._id, experience.name)"
          />
        </td>
      </tr>
    </table>
    <div v-if="!readOnly">
      <div id="scrollToExperiance" v-show="showAdd" class="input-area">
        <input v-model="experience" placeholder="Company name" type="text" />
        <input v-model="description" placeholder="Role" type="text" />
        <input v-model="tools" placeholder="Tools & languages" type="text" />
        <datepicker v-model="fromDate" />
        <datepicker v-model="toDate" />

        <label class="checkbox" for="checkbox">
          <input
            v-model="currentJob"
            type="checkbox"
            id="checkbox"
            placeholder="currentJob"
          />
          Are you still undergoing this experience?</label
        >

        <div>
          <button class="button1" @click="addExperience">
            Submit experiance
          </button>
          <button @click="cancelForm" class="button2">Cancel</button>
        </div>
      </div>
      <button v-show="!showAdd" class="button1" @click="smoothScroll">
        Add experiance
      </button>
    </div>
  </section>
</template>

<script>
import Datepicker from "vue3-datepicker";
import axios from "axios";
export default {
  name: "Experience",
  components: {
    Datepicker,
  },
  data() {
    return {
      experience: "",
      description: "",
      tools: "",
      fromDate: new Date(),
      toDate: null,
      currentJob: false,
      experiences: [],
      showAdd: false,
    };
  },
  props: {
    readOnly: { type: Boolean, default: false },
  },
  beforeMount() {
    this.getExperiences();
  },
  methods: {
    async addExperience() {
      const body = {
        name: this.experience,
        description: this.description,
        tools: this.tools,
        fromDate: this.fromDate,
        toDate: this.toDate,
        currentJob: this.currentJob,
      };

      let request = {
        url: "http://localhost:5000/users/user/experience",
        withCredentials: true,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: body,
      };

      axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.$toast.success(`Added experience ${this.experience}`);
            this.cancelForm();
            this.getExperiences();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getExperiences() {
      const request = {
        url: "http://localhost:5000/users/user/experiences",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      };

      axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.experiences = response.data.experiences;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateExperiance() {
      const body = {
        name: this.experience,
        description: this.description,
        tools: this.tools,
        fromDate: this.fromDate,
        toDate: this.toDate,
        currentJob: this.currentJob,
      };

      let request = {
        url: "http://localhost:5000/users/user/updateexperience",
        withCredentials: true,
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        data: body,
      };

      axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.$toast.success(`Added experience ${this.experience}`);
            this.description = "";
            this.tools = "";
            this.fromDate = null;
            this.toDate = null;
            this.currentJob = false;
            this.getExperiences();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async removeExperience(id, name) {
      const body = { _id: id };
      const request = {
        url: "http://localhost:5000/users/user/removeexperience",
        withCredentials: true,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: body,
      };

      axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.$toast.info(`removed experience ${name}`);
            this.getExperiences();
          }
        })
        .catch((error) => {
          this.$toast.error(`Could not remove ${name}`);
        });
    },
    async smoothScroll() {
      const container = document.getElementById("scrollToExperiance");
      this.showAdd = true;
      await this.showAdd;
      this.$smoothScroll({
        updateHistory: false,
        scrollTo: container,
      });
    },

    cancelForm() {
      this.education = "";
      this.description = "";
      this.tools = "";
      this.fromDate = null;
      this.toDate = null;
      this.ongoing = false;
      this.showAdd = false;
    },
  },
};
</script>

<style scoped>
.wrapper-table {
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
}
.experience-td {
  width: 93%;
}
.label-column {
  text-align: left;
}
.value-column {
  text-align: left;
}
.icon-column {
  width: 6%;
}
.experience-table {
  width: 100%;
}
.checkbox {
  display: flex;
  flex-basis: 100%;
  justify-content: flex-start;
  align-items: center;
}
#checkbox {
  width: 8%;
}
</style>
