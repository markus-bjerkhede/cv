<template>
  <main>
    <h1>Welcome to your profile</h1>
    <ProfilePicture />
    <EditUserInfo />
  </main>
</template>

<script>
import EditUserInfo from "../components/EditUserInfo.vue";
import ProfilePicture from "../components/ProfilePicture.vue";
export default {
  components: { EditUserInfo, ProfilePicture },
};
</script>

<style scoped>
h1 {
  margin-top: 7rem;
  margin-bottom: 3rem;
}
</style>