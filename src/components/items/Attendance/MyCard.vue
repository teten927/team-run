<template>
  <div class="card">
    <div>
      <div
        style="display: flex; align-items: center"
        class="clickable"
        @click="
          () => {
            this.showStatusModalSwitch = !this.showStatusModalSwitch;
          }
        "
      >
        <div class="circle" :style="styles" />
        <div style="font-size: 24px; font-weight: bold; margin-left: 10px">
          {{ statusWord }}
        </div>
      </div>
      <Button
        style="position: absolute; top: -40px; right: -40px"
        :label="buttonLabel"
        @click.native="showAttendanceModalSwitch = !showAttendanceModalSwitch"
      />
      <div
        style="
          font-size: 20px;
          height: 15px;
          text-align: left;
          margin-left: 30px;
        "
      >
        {{ profile.attendanceTime }}~
      </div>
      <div style="display: flex; justify-content: center">
        <img
          v-if="profile.image"
          class="clickable"
          :src="profile.image"
          @click="
            () => {
              this.showImageModalSwitch = !this.showImageModalSwitch;
            }
          "
        />
        <img
        v-else
        class="clickable"
          src="../../../../public/img/human.jpg"
          @click="
            () => {
              this.showImageModalSwitch = !this.showImageModalSwitch;
            }
          "
        >
      </div>
      <div style="text-align: center; font-size: 22px; width: 100%">
        {{ profile.fullname }}
      </div>
      <div class="item-title">勤務地</div>
      <div
        class="item clickable"
        @click="
          () => {
            this.showLocationModalSwitch = !this.showLocationModalSwitch;
          }
        "
      >
        {{ profile.location }}
      </div>
      <div class="item-title">つぶやき</div>
      <div
        class="item clickable"
        @click="
          () => {
            this.showCommentModalSwitch = !this.showCommentModalSwitch;
          }
        "
      >
        {{ profile.comment }}
      </div>
    </div>
    <Modal2
      name="attendance-message"
      :showModalSwitch="showAttendanceModalSwitch"
      :message="buttonLabel + 'します。よろしいですか。'"
      @clickOk="clickAttendanceButton()"
    />
    <StatusModal
      name="status-modal"
      :showModalSwitch="showStatusModalSwitch"
      :id="$store.getters.loginUser"
      :isAttendance="isAttendance"
      :status="profile.status"
      v-model="profile.status"
      @select="selectStatus()"
    />
    <ImageModal
      name="image-modal"
      :showModalSwitch="showImageModalSwitch"
      :id="$store.getters.loginUser"
      :image="profile.image"
      v-model="profile.image"
      @click="clickButton()"
    />
    <LocationModal
      name="location-modal"
      :showModalSwitch="showLocationModalSwitch"
      :id="$store.getters.loginUser"
      :location="profile.location"
      :defaultLocation="profile.defaultLocation"
      v-model="locationObj"
      @click="clickLocationButton()"
    />
    <CommentModal
      name="comment-modal"
      :showModalSwitch="showCommentModalSwitch"
      :text="profile.comment"
      v-model="profile.comment"
      @click="clickButton()"
    />
  </div>
</template>

<script>
import Button from "../Button3";
import Modal2 from "../MessageModal2";
import StatusModal from "./ProfileSettingModalStatus";
import ImageModal from "./ProfileSettingModalImage";
import LocationModal from "./ProfileSettingModalLocation";
import CommentModal from "./ProfileSettingModalComment";

export default {
  components: {
    Button,
    Modal2,
    StatusModal,
    ImageModal,
    LocationModal,
    CommentModal,
  },
  props: {
    profile: Object,
  },
  data() {
    return {
      statusWord: null,
      color: null,
      isAttendance: false,
      buttonLabel: null,
      showAttendanceModalSwitch: false,
      showStatusModalSwitch: false,
      showImageModalSwitch: false,
      showLocationModalSwitch: false,
      showCommentModalSwitch: false,
      locationObj: null
    };
  },
  mounted: function () {
    this.statusChange();
  },
  computed: {
    styles() {
      return {
        "--color": this.color,
      };
    },
  },
  methods: {
    statusChange: function () {
      switch (this.profile.status) {
        case "working":
          this.statusWord = "業務中";
          this.color = "greenyellow";
          this.isAttendance = true;
          break;
        case "busy":
          this.statusWord = "取り込み中";
          this.color = "red";
          this.isAttendance = true;
          break;
        case "free":
          this.statusWord = "空きあり";
          this.color = "blue";
          this.isAttendance = true;
          break;
        case "not working":
          this.statusWord = "業務外";
          this.color = "gray";
          this.isAttendance = false;
          break;
        case "vacation":
          this.statusWord = "休暇中";
          this.color = "yellow";
          this.isAttendance = false;
          break;
        default:
          this.statusWord = "承認待ち";
          this.color = "gray";
          this.isAttendance = null;
          break;
      }
    },
    clickAttendanceButton: async function () {
      if (this.isAttendance === true) this.profile.status = "not working";
      else if (this.isAttendance === false) this.profile.status = "working";
      this.selectStatus();
    },
    selectStatus: function() {
      this.statusChange();
      this.clickButton();
    },
    clickLocationButton: function() {
      this.profile.location = this.locationObj.location;
      this.profile.defaultLocation = this.locationObj.defaultLocation;
      this.clickButton();
    },
    clickButton: function() {
      this.$emit("click");
    }
  },
  watch: {
    isAttendance: function (value) {
      if (value === true) {
        this.buttonLabel = "退勤";
      } else if (value === false) {
        this.buttonLabel = "出勤";
      }
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

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 420px;
  background-color: #262500;
  border: double 3px yellow;
  color: white;
}

.clickable {
  cursor: url("../../../../public/icon/setting.png") 16 16, pointer;
}

div.clickable:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

img.clickable:hover {
  opacity: 60%;
}
</style>