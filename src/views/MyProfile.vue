<template>
  <section>
    <UserInfo />
    <ProfileInfo />
  </section>
</template>

<script>
import UserInfo from "../components/UserInfo.vue";
import ProfileInfo from "../components/ProfileInfo.vue";
export default {
  components: { UserInfo, ProfileInfo },
};
</script>

<style>
</style>