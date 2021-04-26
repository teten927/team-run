<template>
  <modal :name="name" :draggable="true" height="auto" :scrollable="true">
    <div class="modal-body">
      <div v-if="isAttendance" class="status-select">
        <input type="radio" id="one" value="working" v-model="inputedValue" />
        <label for="one" class="status"
          ><div class="circle" style="background-color: greenyellow" />
          <div class="circle-label">業務中</div></label
        >
        <input type="radio" id="two" value="free" v-model="inputedValue" />
        <label for="two" class="status"
          ><div class="circle" style="background-color: blue" />
          <div class="circle-label">空きあり</div></label
        >
        <input type="radio" id="three" value="busy" v-model="inputedValue" />
        <label for="three" class="status"
          ><div class="circle" style="background-color: red" />
          <div class="circle-label">取り込み中</div></label
        >
      </div>
      <div v-else class="status-select">
        <input
          type="radio"
          id="one"
          value="not working"
          v-model="inputedValue"
        />
        <label for="one" class="status"
          ><div class="circle" style="background-color: gray" />
          <div class="circle-label">業務外</div></label
        >
        <input type="radio" id="two" value="vacation" v-model="inputedValue" />
        <label for="two" class="status"
          ><div class="circle" style="background-color: yellow" />
          <div class="circle-label">休暇中</div></label
        >
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    name: String,
    id: String,
    status: String,
    isAttendance: Boolean,
    showModalSwitch: Boolean,
  },
  data() {
    return {
      inputedValue: null,
    };
  },
  watch: {
    showModalSwitch: function () {
      this.inputedValue = this.status;
      this.$modal.show(this.name);
    },
    inputedValue: function (newValue) {
      this.$emit("input", newValue);
      this.$emit("select");
      this.$modal.hide(this.name);
    },
  },
};
</script>

<style scoped>
.modal-body {
  padding: 5px 25px;
  color: black;
}
.status-select {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
.status {
  display: flex;
  align-items: center;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}
.circle {
  --color: black;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--color);
}
.circle-label {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}
input[type="radio"] {
  display: none;
}

input[type="radio"]:hover + label {
  border: solid 1px #31a9ee;
}

input[type="radio"]:checked + label {
  background: #31a9ee;
  color: #ffffff;
}

input[type="radio"] + label {
  padding: 10px;
}
</style>