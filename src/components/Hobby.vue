<template>
  <section class="attribute-container">
    <h2>Hobbies</h2>
    <table class="table-container" v-for="hobby in hobbies" :key="hobby._id">
      <tr class="table-row">
        <td class="td">
          <p class="flex-start">{{ hobby.name }}</p>
        </td>
        <td v-if="!readOnly" class="td2">
          <img
            class="icon flex-end"
            alt="remove"
            src="../assets/icons/rubbish-bin.png"
            @click="removeHobby(hobby._id)"
          />
        </td>
      </tr>
    </table>
    <div v-if="!readOnly">
      <div id="scrollToHobby" v-show="showAdd" class="input-area">
        <input v-model="hobby" />
        <div>
          <button class="button positive" @click="addHobby">Submit hobby</button>
          <button @click="cancelForm" class="button negative">Cancel</button>
        </div>
      </div>
      <button v-show="!showAdd" class="button positive" @click="smoothScroll">
        Add hobby
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Hobby",
  data() {
    return {
      hobby: "",
      hobbies: [],
      showAdd: false,
    };
  },
  props: {
    readOnly: { type: Boolean, default: false },
    id: { type: String, default: null}
  },
  beforeMount() {
    this.getHobbies();
  },
  methods: {
    async addHobby() {
      const data = { name: this.hobby };

      let request = {
        url: "http://localhost:5000/users/user/hobby",
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
            this.cancelForm();
            this.getHobbies();
          }
        })
        .catch(() => {
          this.$toast.error("Something went wrong");
        });
    },
    async getHobbies() {
      let request;
      if (this.id) {
        request = {
          url: "http://localhost:5000/public/user/publichobbies",
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          data: { _id: this.id }
        };
      } else {
        request = {
          url: "http://localhost:5000/users/user/hobbies",
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
            this.hobbies = response.data.hobbies;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeHobby(id) {
      const body = {
        _id: id,
      };

      const request = {
        url: "http://localhost:5000/users/user/removehobby",
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
            this.$toast.info("Hobby removed");
            this.getHobbies();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async smoothScroll() {
      const container = document.getElementById("scrollToHobby");
      this.showAdd = true;
      this.$smoothScroll({
        updateHistory: false,
        scrollTo: container,
      });
    },
    cancelForm() {
      this.hobby = "";
      this.showAdd = false;
    },
  },
};
</script>

<style>
.table-container {
  display: flex;
}
.table-row {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.td {
  display: flex;
  align-items: center;
  flex-basis: 100%;
}
.td2 {
  display: flex;
}
.flex-start {
  justify-content: flex-start;
}
.flex-end {
  justify-content: flex-end;
}
</style>