<template>
  <div style="position: relative; width: 100%">
    <div class="input-title">{{label}}</div>
    <input :type="textType" v-model="inputedValue" class="text-input" />
    <img
      src="../../../public/icon/eye-gray.png"
      width="40px"
      class="hide-icon"
      @mousedown="textType = 'text'"
      @mouseup="textType = 'password'"
    />
    <div v-if="errorMessage" class="error-text">{{errorMessage}}</div>
  </div>
</template>


<script>
export default {
  props: {
    label: String,
    value: String,
    errorMessage: String
  },
  data() {
    return {
      textType: "password",
    };
  },
  computed: {
    inputedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style scoped>
.hide-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2;
}

.input-title {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
}

.text-input {
  width: 100%;
  height: 40px;
  font-size: 24px;
}

.error-text {
  color: red;
  font-size: 18px;
}
</style>