<template>
  <modal :name="name" :draggable="true" height="auto" :scrollable="true">
    <div class="modal-body">
      <div style="display: flex; justify-content: center">
        <input type="text" v-model="inputedValue" class="main-input" />
      </div>

      <button
        style="
          width: 150px;
          height: 60px;
          padding: 2px;
          font-size: 24px;
          font-weight: bold;
          margin-top: 20px;
          cursor: pointer;
        "
        @click="clickUpdate()"
      >
        UPDATE
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    name: String,
    id: String,
    text: String,
    showModalSwitch: Boolean,
  },
  data() {
    return {
      inputedValue: null,
    };
  },
  watch: {
    showModalSwitch: function () {
      this.inputedValue = this.text;
      this.$modal.show(this.name);
    },
  },
  methods: {
    clickUpdate: function () {
      this.$emit("input", this.inputedValue);
      this.$emit("click");
      this.$modal.hide(this.name);
    },
  },
};
</script>

<style scoped>
.modal-body {
  padding: 25px 25px;
  color: black;
}

.main-input {
  width: 80%;
  height: 35px;
  font-size: 24px;
  outline: solid 1px #31a9ee;
}

.main-input:focus {
  outline-width: 2px;
}
</style>