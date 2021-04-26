<template>
  <modal :name="name" :draggable="true" height="auto" :scrollable="true">
    <div class="modal-body">
      <div style="display: flex; align-items: center; justify-content: center">
        <img
          v-if="result !== '' || result != 'none'"
          :src="iconUrl"
          width="50px"
        />
        <div
          style="
            margin-left: 20px;
            font-size: 20px;
            color: gray;
            text-align: left;
          "
        >
          <div v-for="msg in messages" :key="msg">{{ msg }}</div>
        </div>
      </div>
      <div>
        <button
          style="
            margin-top: 20px;
            width: 80px;
            padding: 2px;
            font-size: 24px;
            font-weight: bold;
            height: 60px;
            cursor: pointer;
          "
          @click="onClickOk()"
        >
          OK
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import success from "/public/icon/success.png";
import failure from "/public/icon/failure.png";

export default {
  props: {
    name: String,
    showModalSwitch: Boolean,
    result: String,
    message: String,
  },
  data() {
    return {
      iconUrl: "",
      messages: [],
    };
  },
  methods: {
    onClickOk: function () {
      this.$modal.hide(this.name);
      this.$emit("click");
    },
  },
  watch: {
    showModalSwitch: function () {
      if (this.result === null) return;
      if (this.result === "success") {
        this.iconUrl = success;
      } else if (this.result === "failure") {
        this.iconUrl = failure;
      }
      this.messages = this.message.split("\n");
      this.$modal.show(this.name);
    },
  },
};
</script>

<style scoped>
.modal-body {
  padding: 20px 25px;
}
</style>