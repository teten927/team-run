<template>
  <div class="menu">
    <div
      class="menu-items menu-items-width"
      @click="clickMenu('Attendance')"
      :style="{ 'background-color': backgroundColor.Attendance }"
    >
      <img src="../../../public/icon/time-card.png" height="40px" /><span
        >Attendance</span
      >
    </div>
    <div
      class="menu-items menu-items-width"
      @click="clickMenu('Calendar')"
      :style="{ 'background-color': backgroundColor.Calendar }"
    >
      <img src="../../../public/icon/calendar.png" height="30px" /><span
        style="padding-left: 10px"
        >Calendar</span
      >
    </div>
    <div
      class="menu-items menu-items-width"
      @click="clickMenu('ToDo')"
      :style="{ 'background-color': backgroundColor.ToDo }"
    >
      <img src="../../../public/icon/todo.png" height="30px" /><span
        style="padding-left: 10px"
        >ToDo</span
      >
    </div>
    <div
      v-if="request"
      class="menu-items menu-items-width"
      @click="clickMenu('Request')"
      :style="{ 'background-color': backgroundColor.Request }"
    >
      <div v-if="request.length !== 0" class="radius" style="position: absolute; left:10px; top: 10px;" />
      <img src="../../../public/icon/request.png" height="30px" /><span
        style="padding-left: 10px"
        >Request</span
      >
    </div>
    <div
      class="menu-items menu-items-width"
      @click="clickMenu('Setting')"
      :style="{ 'background-color': backgroundColor.Setting }"
    >
      <img src="../../../public/icon/setting.png" height="30px" /><span
        style="padding-left: 10px"
        >Setting</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: {
        Attendance: "#2c7cff !important",
        Calendar: "transparent",
        ToDo: "transparent",
        Request: "transparent",
        Setting: "transparent",
      },
    };
  },
  methods: {
    clickMenu: function (menu) {
      Object.keys(this.backgroundColor).forEach((key) => {
        this.backgroundColor[key] = "transparent";
      });
      this.backgroundColor[menu] = "#2c7cff !important";

      this.$emit("link-destination", menu);
    },
  },
  computed: {
    request() {
      return this.$store.getters.request;
    }
  },
};
</script>

<style scoped>
.menu {
  width: 100%;
  height: 50px;
  text-align: left;
  display: flex;
  border-bottom: solid 2px gray;
}

.menu-items {
  position: relative;
  border-right: solid 2px gray;
  padding: 10px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.menu-items-width {
  width: 200px;
}

.menu-items span {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
}

.menu-items:hover {
  background-color: rgba(255, 255, 255, 0.3) !important;
}
.radius {
  width: 20px;
  height: 20px;
  background: #b22222;
  border-radius: 50%;
}

@media screen and (max-width: 1200px) {
.menu-items span {
  display: none;
}
.menu-items-width {
  width: 100px;
}
} 
</style>
