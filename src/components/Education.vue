<template>
  <section class="attribute-container">
    <h2>Education</h2>
    <table
      class="attribute-row-table wrapper-table"
      v-for="education in educations"
      :key="education._id"
    >
      <tr>
        <td class="education-td">
          <table class="education-table">
            <tr>
              <td class="label-column">Name:</td>
              <td class="value-column">
                {{ education.name }}
              </td>
            </tr>
            <tr>
              <td class="label-column">School:</td>
              <td class="value-column">
                {{ education.school }}
              </td>
            </tr>
            <tr>
              <td class="label-column">Start date:</td>
              <td class="value-column">
                {{ education.fromDate.split("T")[0] }}
              </td>
            </tr>
            <tr>
              <td class="label-column">End date:</td>
              <td class="value-column" v-if="education.toDate">
                {{ education.toDate.split("T")[0] }}
              </td>
              <td class="value-column" v-else-if="education.ongoing">
                Ongoing
              </td>
            </tr>
          </table>
        </td>
        <td v-if="!readOnly" class="icon-column">
          <img
            class="icon"
            alt="remove"
            src="../assets/icons/rubbish-bin.png"
            @click="removeEducation(education._id, education.name)"
          />
        </td>
      </tr>
    </table>
    <div v-if="!readOnly">
      <div id="scrollToEducation" v-show="showAdd" class="input-area">
        <input v-model="education" placeholder="Education name" type="text" />
        <input v-model="school" placeholder="School" type="text" />
        <datepicker v-model="fromDate" />
        <datepicker v-model="toDate" />

        <label class="checkbox" for="checkbox">
          <input
            v-model="ongoing"
            type="checkbox"
            id="checkbox"
            placeholder="ongoing"
          />
          Are you still undergoing this education?</label
        >
        <div>
          <button class="button positive" @click="addEducation">
            Submit education
          </button>
          <button @click="cancelForm" class="button negative">Cancel</button>
        </div>
      </div>
      <button v-show="!showAdd" class="button positive" @click="smoothScroll">
        Add education
      </button>
    </div>
  </section>
</template>

<script>
import Datepicker from "vue3-datepicker";
import axios from "axios";
export default {
  name: "Education",
  components: {
    Datepicker,
  },
  data() {
    return {
      education: "",
      school: "",
      fromDate: new Date(),
      toDate: null,
      ongoing: false,
      educations: [],
      showAdd: false,
    };
  },
  props: {
    readOnly: { type: Boolean, default: false },
  },
  beforeMount() {
    this.getEducations();
  },
  methods: {
    async addEducation() {
      const body = {
        name: this.education,
        school: this.school,
        fromDate: this.fromDate,
        toDate: this.toDate,
        ongoing: this.ongoing,
      };

      let request = {
        url: "http://localhost:5000/users/user/education",
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
            this.$toast.success(`Added education ${this.education}`);
            this.cancelForm();
            this.getEducations();
          }
        })
        .catch((err) => {
          this.$toast.error(`Error creating education ${this.education}`);
        });
    },
    async getEducations() {
      const request = {
        url: "http://localhost:5000/users/user/educations",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.educations = response.data.educations;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeEducation(id, name) {
      const body = { _id: id };
      const request = {
        url: "http://localhost:5000/users/user/removeeducation",
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
            this.$toast.info(`removed education ${name}`);
            this.getEducations();
          }
        })
        .catch((error) => {
          this.$toast.error(`Could not remove ${name}`);
        });
    },
    async smoothScroll() {
      const container = document.getElementById("scrollToEducation");
      this.showAdd = true;
      await this.showAdd;
      this.$smoothScroll({
        updateHistory: false,
        scrollTo: container,
      });
    },

    cancelForm() {
      this.education = "";
      this.school = "";
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
.education-td {
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
.education-table {
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
