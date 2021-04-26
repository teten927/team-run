<template>
  <div
    style="
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    "
  >
    <Header class="header" />
    <MenuBar @link-destination="link" />
    <Content v-if="$store.getters.isAuthed" :currentComponent="currentComponent" />
  </div>
</template>

<script>
import Header from "../layout/HeaderWithLogout";
import MenuBar from "../layout/MenuBar";
import Content from "../layout/Content";

export default {
  props: {
    currentComponentProp: String,
  },
  data() {
    return {
      currentComponentByClick: null
};
  },
  components: {
    Header,
    MenuBar,
    Content
    },
  methods: {
    link: function (dest) {
      this.currentComponentByClick = dest;
    },
  },
  computed: {
    currentComponent() {
      return this.currentComponentByClick || this.currentComponentProp;
    }
  }
};
</script>

<style scoped>
.inner {
  display: flex;
  justify-content: center;
  height: 100%;
  overflow-y: scroll;
}
</style>