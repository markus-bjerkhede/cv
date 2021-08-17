import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import EditProfile from "@/views/EditProfile.vue";
import Login from "@/views/Login.vue";
import Consultants from "@/views/Consultants.vue";
import MyProfile from "@/views/MyProfile.vue";
import EditUser from "@/views/EditUser.vue";
import Test from "@/views/Test.vue";

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
    path: "/test/:id",
    name: "test",
    component: Test,
    props: true
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;