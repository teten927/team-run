<template>
  <button
    :disabled="disabled"
    class="btn"
    :style="{ width: width, 'background-color': backColor }"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: String,
    width: String,
    disabled: Boolean,
  },
  data() {
    return {
      backColor: "rgba(250,250,250,0.7)",
    };
  },
  watch: {
    disabled: function (value) {
      if (value) this.backColor = "rgba(250,250,250,0.7)";
      else this.backColor = "rgba(0,0,0,0.7)";
    },
  },
  mounted: function () {
    if (this.disabled) this.backColor = "rgba(250,250,250,0.7)";
    else this.backColor = "rgba(0,0,0,0.7)";
  },
};
</script>

<style scoped>
.btn {
  position: relative;
  outline: solid 3px white;
  font-size: 36px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  border: 2px solid #000;
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 10px;
  line-height: 70px;
  height: 70px;
  text-decoration: none;
}

.btn:hover {
  background-color: #2c7cff !important;
  color: #fff;
  letter-spacing: 2px;
}
</style>