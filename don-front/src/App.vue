<template>
  <div id="app">
    <donation-form></donation-form>
  </div>
</template>

<script>
import DonationForm from "./components/DonationForm.vue";
export default {
  name: "App",
  components: { DonationForm },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100vh;
}
</style>
