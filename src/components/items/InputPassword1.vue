<template>
  <div style="position: relative" :style="{ width: width }">
    <label :class="{ active: isActived }">{{ label }}</label>
    <input
      :type="textType"
      @focus="isActived = true"
      v-model="inputedValue"
      @blur="onBlur()"
    />
    <img
      src="../../../public/icon/eye.png"
      width="40px"
      class="hide-icon"
      @mousedown="textType = 'text'"
      @mouseup="textType = 'password'"
    />
        <span v-if="errorMessage" class="error-text">{{errorMessage}}</span>
  </div>
</template>


<script>
export default {
  props: {
    label: String,
    width: String,
    value: String,
    errorMessage: String
  },
  data() {
    return {
      isActived: false,
      textType: "password",
    };
  },
  methods: {
    onBlur() {
      if (this.inputedValue === "") {
        this.isActived = false;
      }
    },
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

<style lang="scss" scoped>
label {
  position: absolute;
  top: 0;
  font-size: 30px;
  padding: 20px 10px;
  background-color: transparent;
  color: white;
  -webkit-transition: top 0.2s ease-in-out, font-size 0.2s ease-in-out;
  transition: top 0.2s ease-in-out, font-size 0.2s ease-in-out;
  z-index: 0;
}

.active {
  top: -10px;
  font-size: 20px;
}

input {
  position: relative;
  padding: 30px 20px 20px 20px;
  border: 3px solid white;
  font-size: 28px;
  color: yellow;
  background-color: transparent;
  z-index: 1;
  width: 90%;
}

input:focus {
  outline: none;
}

.hide-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2;
}

.error-text {
  color: red;
  font-size: 20px;
}
</style>