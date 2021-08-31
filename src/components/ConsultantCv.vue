<template>
  <div>
    <div class="wrapper">
    <img class="cropped-image" :src="imageSource" alt="Profile picture" />
    <div>
      <p>{{ user.firstname }}</p>
      <p>{{ user.lastname }}</p>
    </div>
    <div>
      <p>{{ user.title }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
    </div>
    </div>
    <div class="grid">
      <span class="experiance">
      <h2>About {{user.firstname}}</h2>
      <p>{{user.presentation}}</p>
       </span>
      <Experience :readOnly="true" :id="id" />
      <Education :readOnly="true" :id="id" />
      <Language :readOnly="true" :id="id" />
      <Skill :readOnly="true" :id="id" />
      <Hobby :readOnly="true" :id="id" />
    </div>
    <!-- <button class="button1" @click="printPdf">Print CV to PDF</button>
    <button class="button1" @click="downloadPdf">Download PDF</button> -->
 
  </div>
</template>

<script>
import axios from "axios";
import Star from "@/components/Star.vue";
import Skill from "@/components/Skill.vue";
import Presentation from "@/components/Presentation.vue";
import Experience from "@/components/Experience.vue";
import Education from "@/components/Education.vue";
import Hobby from "@/components/Hobby.vue";
import Language from "@/components/Language.vue";

export default {
  name: "Consultant",
  components: { Star, Skill, Presentation, Experience, Education, Hobby, Language },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      user: [],
      imageSource: String,
      hobbies: [],
      languages: [],
      skills: [],
      experiences: [],
      educations: []
    };
  },
  beforeMount() {
    this.getUser();
  },
  methods: {
    async downloadPdf() {
      const body = {
        _id: "611cb0b3cbedcbda7172370f-780637230"
      }
      let request = {
        url: "http://localhost:5000/admin/user/getpdf",
        withCredentials: true,
        method: "post",
        responseType: 'application/pdf',
        headers: {
          "Content-type": "application/json",
        },
        data: body,
      };
      await axios(request)
          .then((response) => {
            if (response.status === 200) {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'download.pdf');
              document.body.appendChild(link);
              link.click();
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.errMsg = "Invalid username or password";
            } else {
              this.errMsg = "Something went wrong";
            }
          });
    },
    async printPdf() {
      const data = {
        _id: this.id,
        skills: this.skills,
        hobbies: this.hobbies,
        languages: this.languages,
        educations: this.educations,
        experiences: this.experiences,
        presentation: this.user.presentation,
        consultant: {
          profilePic: this.user.profilePic,
          lastname: this.user.lastname,
          firstname: this.user.firstname,
          email: this.user.email,
          phone: this.user.phone,
          title: this.user.title
        }
      };
      let request = {
        url: "http://localhost:5000/admin/user/createpdf",
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
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.errMsg = "Invalid username or password";
            } else {
              this.errMsg = "Something went wrong";
            }
          });
    },
    setImageSource() {
      if (this.user.profilePic) {
        this.imageSource = `http://localhost:5000/images/${this.user.profilePic}`;
      } else {
        this.imageSource = "http://localhost:5000/images/placeholder.png";
      }
    },
    async getUser() {
      await this.getSkills();
      await this.getLanguages();
      await this.getHobbies();
      await this.getEducations();
      await this.getExperiences();
      const data = { _id: this.id };
      let request = {
        url: "http://localhost:5000/public/user",
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
              this.user = response.data.user;
              this.setImageSource();
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.errMsg = "Invalid username or password";
            } else {
              this.errMsg = "Something went wrong";
            }
          });
    },
    async getHobbies() {
      const request = {
        url: "http://localhost:5000/public/user/publichobbies",
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: {
          _id: this.id
        }
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
    async getLanguages() {
      const request = {
        url: "http://localhost:5000/public/user/publiclanguages",
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: {
          _id: this.id
        }
      };

      await axios(request)
          .then((response) => {
            if (response.status === 200) {
              this.languages = response.data.languages;
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    async getSkills() {
      const request = {
        url: "http://localhost:5000/public/user/publicskills",
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: {
          _id: this.id
        }
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
    async getExperiences() {
      const request = {
        url: "http://localhost:5000/public/user/publicexperiences",
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: {
          _id: this.id
        }
      };

      await axios(request)
          .then((response) => {
            if (response.status === 200) {
              this.experiences = response.data.experiences;
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    async getEducations() {
      const request = {
        url: "http://localhost:5000/public/user/publiceducations",
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: {
          _id: this.id
        }
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
  }
}
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

.grid {
  max-width: 50rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  column-gap: 1rem;
  border-bottom: 1px solid black;
}
.experiance {
  text-overflow: ellipsis;
    white-space: wrap;
    
  grid-column: 1 / span 2;
}
.attribute-container {
  width: 100%;
}
.skill {
  grid-column: 1 / span 2;
  width: 50%;
  justify-self: center;
}

@media screen and (max-width: 800px) {
  .grid {
    width: 20rem;
    grid-template-columns: 1fr;
  }
}
</style>
