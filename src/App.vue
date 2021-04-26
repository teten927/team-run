<template>
  <div id="app" style="height: 100vh; min-width: 930px; min-height: 350px">
    <router-view />

    <div
      v-show="isLoading"
      style="
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.2);
      "
    >
      <Loading color="white" style="width: 100%" />
    </div>

    <Modal1
      name="message"
      :showModalSwitch="showMessageModalSwitch"
      :result="resultMsgModalInfo.result"
      :message="resultMsgModalInfo.message"
      @click="clickModal()"
    />
  </div>
</template>

<script>
import Modal1 from "./components/items/MessageModal1";
import Loading from "./components/items/Loading1";

export default {
  name: "App",
  components: {
    Modal1,
    Loading,
  },
  data() {
    return {
      showMessageModalSwitch: false,
    };
  },
  methods: {
    clickModal: function () {
      this.resultMsgModalInfo.onClick();
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    resultMsgModalInfo() {
      return this.$store.getters.resultMsgModalInfo;
    },
    isAuthed() {
      return this.$store.getters.isAuthed;
    },
  },
  watch: {
    resultMsgModalInfo: function () {
      this.showMessageModalSwitch = !this.showMessageModalSwitch;
    },
    isAuthed: function (value) {
      if (value) {
        if (this.$route.name === "Login" || this.$route.name === "Register")
          this.$router.push({ name: "Attendance" });
        return;
      }
      if (this.$route.name !== "Login" && this.$route.name !== "Register")
        this.$router.push({ name: "Login" });
    },
  },
  beforeCreate: async function () {
    await this.$store.dispatch("onAuth");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("../public/img/background.jpg");
  background-size: 100% auto;
  width: 100%;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 16px;
}
::-webkit-scrollbar-track {
  background: #202020;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 0 2px #777;
}
::-webkit-scrollbar-thumb {
  background: #606060;
  border-radius: 10px;
  box-shadow: none;
}
</style>
