<template>
  <section class="wrapper">
    <vue-table-lite
      :is-static-mode="true"
      :has-checkbox="false"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
    />
  </section>
</template>

<script>
import axios from "axios";
import VueTableLite from "vue3-table-lite";

export default {
  name: "Consultants",
  components: { VueTableLite },
  data() {
    return {
      isAdmin: false,
      users: [],
      table: [],
    };
  },
  mounted() {
    this.checkIfAdmin();
    this.initiateTable();
  },
  methods: {
    async initiateTable() {
      await this.getAllUsers();
      this.table = {
        columns: [
          {
            label: "Picture",
            display: (row) => {
              return (
                '<img alt="picture" class="cropped-image" src="http://localhost:5000/images/' +
                (row.profilePic ? row.profilePic : "placeholder.png") +
                '"/>'
              );
            },
          },
          {
            label: "Name",
            field: "fullName",
            sortable: true,
          },
          { label: "Title", field: "title", sortable: true },
        ],
        rows: this.users,
        totalRecordCount: this.users.length,
      };
      const linksColumn = {
        label: "Links",
        display: (row) => {
          let element =
            '<a class="button positive" href="/consultant/cv/' +
            row.id +
            '">Show CV</a>';
          if (this.isAdmin) {
            element =
              element +
              '<a class="button positive" href="/consultant/edit/' +
              row.id +
              '">Edit</a>';
          }
          return element;
        },
      };
      this.table.columns.push(linksColumn);
    },
    async getAllUsers() {
      let request = {
        url: "http://localhost:5000/users/all",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            const users = [];
            for (const entry of response.data.users) {
              if (entry.availible || this.isAdmin) {
                const user = {
                  fullName:
                    (entry.firstname ? entry.firstname : "Unknown") +
                    " " +
                    (entry.lastname ? entry.lastname : ""),
                  title: entry.title || "",
                  id: entry._id,
                  profilePic: entry.profilePic,
                };
                users.push(user);
              }
            }
            this.users = users;
          }
        })
        .catch((error) => {
          console.log(error.status);
        });
    },
    async checkIfAdmin() {
      let request = {
        url: "http://localhost:5000/users/user/admin",
        withCredentials: true,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            this.isAdmin = true;
          }
        })
        .catch((error) => {
          console.log(error.status);
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}
</style>