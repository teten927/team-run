<template>
  <div class="chat-view">
    <div
      class="scroll-view"
      ref="scroll_view"
      v-scroll="
        () => {
          this.isNewMessage = false;
        }
      "
    >
      <transition-group name="chat" tag="div" class="list content">
        <section
          v-for="({ date, user, message }, index) in chat"
          :key="date.toString()"
        >
          <div
            v-if="
              index === 0 ||
              isBeforeDateOnly(chat[index - 1].date.toDate(), date.toDate())
            "
            style="
              color: gray;
              font-size: 18px;
              text-align: center;
              margin: 20px 0;
            "
          >
            ------------------------------{{
              moment(date.toDate(), "yyyy/MM/DD")
            }}------------------------------
          </div>
          <div class="item">
            <div class="item-image">
              <img
                v-if="$store.getters.membersInfo[user].image"
                :src="$store.getters.membersInfo[user].image"
                width="45"
                height="45"
              />
              <img
                v-else
                src="../../../public/img/human.jpg"
                width="45"
                height="45"
              />
            </div>
            <div class="item-detail">
              <div style="display: flex; align-items: center">
                <div style="color: #b0b0b0; font-size: 12px">
                  {{ moment(date.toDate(), "HH:mm") }}
                </div>
                <div style="color: #d0d0d0; font-size: 14px; margin-left: 10px">
                  {{ $store.getters.membersInfo[user].fullname }}
                </div>
              </div>
              <div class="item-message">
                <nl2br tag="div" :text="message" />
              </div>
            </div>
          </div>
        </section>
      </transition-group>
    </div>
    <div v-if="isNewMessage" class="new-message-notice">
      新着メッセージがあります。
    </div>

    <!-- 入力フォーム -->
    <div class="form">
      <textarea
        v-model="input"
        @keydown.enter.exact.prevent="doSend"
      ></textarea>
      <button @click="doSend" class="send-button">Send</button>
    </div>
  </div>
</template>

<script>
import Nl2br from "vue-nl2br";
import moment from "moment";

export default {
  components: { Nl2br },
  data() {
    return {
      input: "",
      isNewMessage: false,
    };
  },
  methods: {
    scrollToBottom: function () {
      const container = this.$refs.scroll_view;
      container.scrollTop = container.scrollHeight;
    },
    doSend: async function () {
      if (this.input === "") return;
      this.input = "";
      await this.$store.dispatch("addChatMessage", this.input).catch(() => {
        this.$store.commit("setResultMsgModalInfo", {
          result: "failure",
          message: "チャットが送信されませんでした。やり直してください。",
          onClick: () => {},
        });
      });
      this.scrollToBottom();
    },
    moment: function (value, format) {
      return moment(value).format(format);
    },
    isBeforeDateOnly: function (date1, date2) {
      return moment(date1).isBefore(date2, "day");
    },
  },
  computed: {
    chat() {
      return this.$store.getters.chatInfo;
    },
  },
  watch: {
    chat: function () {
      const container = this.$refs.scroll_view;
      const isBottomScroll =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      if (isBottomScroll) {
        this.$nextTick(this.scrollToBottom);
      } else {
        this.isNewMessage = true;
        container
          .addEventListener("scroll", () => {
            this.isNewMessage = false;
          })
          .bind(this);
      }
    },
  },
  mounted: function () {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}
.chat-view {
  position: relative;
  width: 570px;
}
.scroll-view {
  height: calc(100% - 80px);
  width: 100%;
  overflow-y: scroll;
}
.content {
  margin: 0 auto;
  padding: 0 10px;
  max-width: 600px;
}
.form {
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  width: 100%;
}
.form textarea {
  border: 1px solid #ccc;
  border-radius: 2px;
  height: 60px;
  width: calc(100% - 10em);
  resize: none;
  font-size: 20px;
}
.list {
  margin-bottom: 100px;
}
.item {
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.8em;
}
.item-image img {
  border-radius: 20px;
  vertical-align: top;
}
.item-detail {
  margin: 0 0 0 1.4em;
}
.item-message {
  position: relative;
  display: inline-block;
  padding: 0.8em;
  background: #deefe8;
  border-radius: 4px;
  line-height: 1.2em;
  font-size: 18px;
}
.item-message::before {
  position: absolute;
  content: " ";
  display: block;
  left: -16px;
  bottom: 12px;
  border: 4px solid transparent;
  border-right: 12px solid #deefe8;
}
.send-button {
  height: 60px;
  background-color: black;
  color: white;
  font-size: 20px;
}

.chat-enter-active {
  transition: all 1s;
}
.chat-enter {
  opacity: 0;
  transform: translateX(-1em);
}

.new-message-notice {
  position: -webkit-sticky;
  position: sticky;
  bottom: 80px;
  left: 120px;
  color: white;
  width: 300px;
  background-color: blue;
  border-radius: 10px;
  font-size: 18px;
}
</style>