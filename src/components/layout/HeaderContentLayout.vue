<template>
  <div style="position: relative; display: flex; flex-direction: column; height: 100%;">
    <Header class="header" />
    
    <div style="position:relative; flex: 1; min-height: 0px;">
      <div class="inner">
        <component :is="currentComponent" />

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../layout/Header";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default {
  props: {
    currentComponent: String,
  },
  components: {
    Header,
    Login,
    Register,
  },
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