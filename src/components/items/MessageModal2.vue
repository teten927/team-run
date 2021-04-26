<template>
  <modal :name="name" :draggable="true" height="auto" :scrollable="true">
    <div class="modal-body">
      <div style="font-size: 24px; color: gray; text-align: left; padding: 20px;">
        <div v-for="msg in messages" :key="msg">{{ msg }}</div>
      </div>
      <div>
        <div style="margin-top: 20px; display: flex; justify-content: center">
          <button
            style="
              padding: 2px;
              font-size: 24px;
              margin-right: 20px;
              font-weight: bold;
              height: 60px;
              width: 150px;
              cursor: pointer;
            "
            @click="onClickCancel()"
          >
            CANCEL
          </button>
          <button
            style="
              padding: 2px;
              font-size: 24px;
              margin-left: 20px;
              font-weight: bold;
              height: 60px;
              width: 150px;
              cursor: pointer;
            "
            @click="onClickOk()"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    name: String,
    showModalSwitch: Boolean,
    message: String,
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    onClickOk: function () {
      this.$modal.hide(this.name);
      this.$emit("clickOk");
    },
    onClickCancel: function () {
      this.$modal.hide(this.name);
    },
  },
  watch: {
    showModalSwitch: function () {
      this.messages = this.message.split("\n");
      this.$modal.show(this.name);
    },
  },
};
</script>

<style scoped>
.modal-body {
  padding: 25px 25px;
}
</style>