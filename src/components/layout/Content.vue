<template>
  <div style="position: relative; flex: 1; min-height: 0px">
    <div style="position: relative; display: flex; height: 100%">
      <div style="position: relative; flex: 1; min-width: 0px;">
        <div class="inner">
          <component :is="currentComponent" />

          <slot></slot>
        </div>
        <div
          class="chat-button"
          @click="
            () => {
              this.isDisplayChat = !this.isDisplayChat;
              this.isRequiredNotice = false;
            }
          "
        >
          <div
            v-if="!isDisplayChat && isRequiredNotice"
            class="radius"
            style="position: absolute; left: 15px; top: 15px"
          />
          <img
            v-if="!isDisplayChat"
            src="../../../public/icon/arrow-left.png"
            width="20px"
            style="margin-right: 10px"
          />
          <span style="font-size: 28px; font-weight: bold">Chat</span>
          <img
            v-if="isDisplayChat"
            src="../../../public/icon/arrow-right.png"
            width="20px"
            style="margin-left: 10px"
          />
        </div>
      </div>
      <transition name="slide-chat"><Chat v-show="isDisplayChat" /></transition>
    </div>
  </div>
</template>

<script>
import Attendance from "../pages/Attendance";
import Calendar from "../pages/Calendar";
import ToDo from "../pages/ToDo";
import Request from "../pages/Request";
import Setting from "../pages/Setting";
import Chat from "../pages/Chat";

export default {
  name: "layout",
  props: {
    currentComponent: String,
  },
  components: {
    Attendance,
    Calendar,
    ToDo,
    Request,
    Setting,
    Chat,
  },
  data() {
    return {
      isDisplayChat: true,
      isRequiredNotice: false,
    };
  },
  computed: {
    loginUser() {
      return this.$store.getters.loginUser;
    },
    newChatInfo() {
      return this.$store.getters.chatInfo;
    },
  },
  mounted: async function() {
    this.$store.commit("setIsLoading", true);
    try {
        await this.$store.dispatch("fetchMembersInfo", this.loginUser);
        const membersInfo = this.$store.getters.membersInfo;
        await this.$store.dispatch("fetchChatInfo", membersInfo[this.loginUser].organization);
        await this.$store.dispatch("fetchOrganizationName");
        if(membersInfo[this.loginUser].isAdmin) this.$store.dispatch("fetchRequest", membersInfo[this.loginUser].organization);
      } catch {
        this.$store.commit("setResultMsgModalInfo", {
          result: "failure",
          message:
            "データの取得に失敗しました。\nログインしなおしてください。\n繰り返しエラーが発生する場合は、管理者にお問い合わせください。",
          onClick: () => {
            this.$router.push({
              name: "Login",
            });
            this.$store.commit("initialize");
          },
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
  },
  watch: {
    newChatInfo() {
      this.isRequiredNotice = true;
    },
    
  },
};
</script>

<style scoped>
.inner {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
.chat-button {
  display: flex;
  position: absolute;
  right: 20px;
  top: 0px;
  width: 170px;
  height: 70px;
  justify-content: center;
  background-color: #2c7cff;
  color: white;
  align-items: center;
  border: solid white 1px;
  cursor: pointer;
  border-radius: 4px;
}

.chat-button:hover {
  opacity: 80%;
}

.slide-chat-enter-active,
.slide-chat-leave-active {
  transform: translate(570px, 0px);
  transition: transform 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.radius {
  animation: flash 2s linear infinite;
  width: 20px;
  height: 20px;
  background: #b22222;
  border-radius: 50%;
}

@keyframes flash {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>