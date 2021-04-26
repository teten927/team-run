<template>
  <modal :name="name" :draggable="true" height="auto" :scrollable="true">
    <div class="modal-body">
      <div style="display: flex; justify-content: center">
        <input type="text" v-model="inputedValue.location" class="main-input" />
      </div>

      <div style="display: flex; justify-content: flex-end">
        <p
          style="
            font-size: 12px;
            width: 220px;
            text-align: left;
            font-weight: bold;
          "
        >
          Default Location
        </p>
      </div>

      <div style="display: flex; justify-content: flex-end; margin-top: -10px">
        <input
          type="text"
          v-model="inputedValue.defaultLocation"
          style="width: 200px; height: 20px"
        />
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
    location: String,
    defaultLocation: String,
    showModalSwitch: Boolean,
  },
  data() {
    return {
      inputedValue: {location: "", defaultLocation: ""},
      isLoading: false,
    };
  },
  watch: {
    showModalSwitch: function () {
      this.inputedValue = {location: this.location, defaultLocation: this.defaultLocation};
      this.$modal.show(this.name)
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