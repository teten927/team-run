<template>
  <div
    style="
      position: relative;
      display: flex;
      flex-direction: column;
      width: 300px;
      height: 420px;
      background-color: black;
      color: white;
    "
  >
    <div
      v-if="isNotPrimary"
      style="
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(100, 100, 100, 0.5);
      "
    />
    <div style="display: flex; align-items: center">
      <div class="circle" :style="styles" />
      <div style="font-size: 24px; font-weight: bold; margin-left: 10px">
        {{ status }}
      </div>
    </div>

    <div
      style="font-size: 20px; height: 15px; text-align: left; margin-left: 30px"
    >
      <div v-if="!isNotPrimary">{{ profile.attendanceTime }}~</div>
    </div>
    <div style="display: flex; justify-content: center">
      <img v-if="profile.image" :src="profile.image" />
      <img v-else src="../../../../public/img/human.jpg" />
    </div>
    <div style="text-align: center; font-size: 22px; width: 100%">
      {{ profile.fullname }}
    </div>
    <div class="item-title">勤務地</div>
    <div class="item">{{ profile.location }}</div>
    <div class="item-title">つぶやき</div>
    <div class="item">
      {{ profile.comment }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object,
  },
  data() {
    return {
      status: null,
      color: null,
      isNotPrimary: false,
    };
  },
  mounted: function () {
    switch (this.profile.status) {
      case "working":
        this.status = "業務中";
        this.color = "greenyellow";
        break;
      case "busy":
        this.status = "取り込み中";
        this.color = "red";
        break;
      case "free":
        this.status = "空きあり";
        this.color = "blue";
        break;
      case "not working":
        this.status = "業務外";
        this.color = "gray";
        this.isNotPrimary = true;
        break;
      case "vacation":
        this.status = "休暇中";
        this.color = "yellow";
        this.isNotPrimary = true;
        break;
      default:
        this.status = "承認待ち";
        this.color = "gray";
        this.isNotPrimary = true;
        break;
    }
  },
  computed: {
    styles() {
      return {
        "--color": this.color,
      };
    },
  },
};
</script>

<style scoped>
.circle {
  --color: black;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--color);
}
img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border: solid 1px white;
  margin-top: 10px;
}

.item-title {
  text-align: left;
  color: #c0c0c0;
  margin-top: 10px;
  margin-left: 10px;
}

.item {
  text-align: left;
  color: white;
  font-size: 20px;
  overflow-x: scroll;
  white-space: nowrap;
  margin: 0 20px;
  padding: 5px 0;
  width: 240px;
}

::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #202020;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 0 2px #777;
}
::-webkit-scrollbar-thumb {
  background: #606060;
  border-radius: 10px;
  box-shadow: none;
}
</style>