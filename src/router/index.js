import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import EditProfile from "@/views/EditProfile.vue";
import Login from "@/views/Login.vue";
import Consultants from "@/views/Consultants.vue";
import MyProfile from "@/views/MyProfile.vue";
import EditUser from "@/views/EditUser.vue";
import Consultant from "@/views/Consultant.vue";
import EditConsultant from "@/views/EditConsultant.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/editProfile",
    name: "EditProfile",
    component: EditProfile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/consultants",
    name: "Consultants",
    component: Consultants,
  },
  {
    path: "/myProfile",
    name: "MyProfile",
    component: MyProfile,
  },
  {
    path: "/editUser",
    name: "EditUser",
    component: EditUser,
  },
  {
    path: "/consultant/cv/:id",
    name: "consultant",
    component: Consultant,
    props: true
  },
  {
    path: "/consultant/edit/:id",
    name: "EditConsultant",
    component: EditConsultant,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;