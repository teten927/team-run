<template>
  <modal :name="name" :draggable="true" height="auto" :scrollable="true">
    <div class="modal-body">
      <div style="display: flex; justify-content: center">
        <img
          :src="inputedValue"
          width="300px"
          height="300px"
          style="border-radius: 50%"
        />
      </div>

      <div style="display: flex; justify-content: center">
        <input
          type="file"
          accept="image/*"
          @change="onImageChange"
          class="main-input"
        />
      </div>
      <div>
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
    </div>
  </modal>
</template>

<script>

export default {
  props: {
    name: String,
    id: String,
    image: String,
    showModalSwitch: Boolean,
  },
  data() {
    return {
      inputedValue: null,
    };
  },
  watch: {
    showModalSwitch: function () {
      this.inputedValue = this.image;
      this.$modal.show(this.name);
    },
  },
  methods: {
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    onImageChange(e) {
      const images = e.target.files || e.dataTransfer.files;
      this.getBase64(images[0])
        .then((image) => (this.inputedValue = image))
        .catch(() => {
          this.$store.commit("setResultMsgModalInfo", {
            result: "failure",
            message:
              "選択した画像はアップデートできません。別の画像を選択してください。",
            onClick: () => {},
          });
        });
    },
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
  height: 55px;
  font-size: 24px;
  margin: 20px;
}
</style>