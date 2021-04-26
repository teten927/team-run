<template>
  <div
    style="
      width: 100%;
      min-width: 770px;
      display: flex;
      justify-content: center;
    "
  >
    <div style="width: 80%; padding: 40px 30px 30px 30px">
      <div v-for="item in request" :key="item.key" class="card-style">
        <div
          style="
            width: 100%;
            text-align: left;
            font-size: 28px;
            border-bottom: double 1px white;
            height: 40px;
          "
        >
          {{ getTitle(item.request) }}
        </div>
        <div class="first-message">
          <div v-if="item.request === 'join'" style="color: aqua">
            {{ item.data }} ({{ item.user }})
          </div>
          <div v-else style="color: aqua">
            {{ $store.getters.membersInfo[item.user].fullname }} ({{
              item.user
            }})
          </div>
          さんからの申請です。
        </div>
        <div style="overflow-y: scroll; height: 240px">
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 30px;
              padding: 20px;
              min-height: 200px;
            "
          >
            {{ getMessage(item.request) }}
            <ul
              v-if="item.request === 'vacation'"
              style="font-size: 24px; color: lightgray"
            >
              <li v-for="date in item.data" :key="date.toString()">
                {{ moment(date.toDate(), "yyyy/MM/DD") }}
              </li>
            </ul>
            <div
              v-if="item.request === 'fix'"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                color: lightgray;
              "
            >
              <div>
                <span class="fix-title">出勤</span>
                <ul>
                  <li v-for="time in item.data.oldInfo.attendance" :key="time.toString()">
                    {{ moment(time.toDate(), "HH:mm:SS") }}
                  </li>
                </ul>
                <span class="fix-title">退勤</span>
                <ul>
                  <li v-for="time in item.data.oldInfo.leave" :key="time.toString()">
                    {{ moment(time.toDate(), "HH:mm:SS") }}
                  </li>
                </ul>
              </div>
              <img
                src="../../../public/icon/arrow-large-right.png"
                width="70px"
                height="70px"
                style="margin-left: 50px"
              />
              <div style="margin-left: 50px">
                <span class="fix-title">出勤</span>
                <ul>
                  <li v-for="time in item.data.newInfo.attendance" :key="time.toString()">
                    {{ moment(time.toDate(), "HH:mm:SS") }}
                  </li>
                </ul>
                <span class="fix-title">退勤</span>
                <ul>
                  <li v-for="time in item.data.newInfo.leave" :key="time.toString()">
                    {{ moment(time.toDate(), "HH:mm:SS") }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            margin-top: 15px;
          "
        >
          <button @click="clickReject(item.key)" style="background-color: red">
            Reject
          </button>
          <button
            style="margin-left: 150px; background-color: blue"
            @click="clickAccept(item.key)"
          >
            Accept
          </button>
        </div>
      </div>
      <MessageModal
        name="request-modal"
        :showModalSwitch="showModalSwitch"
        :message="modalMessage"
        @clickOk="clickOk()"
      />
      <button
        style="
          background-color: #404040;
          border-color: white;
          position: -webkit-sticky;
          position: sticky;
          bottom: 20px;
          left: 2000px;
          margin-right: -100px;
          width: 200px;
        "
        @click="clickAllAccept()"
      >
        All Accept
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MessageModal from "../items/MessageModal2";

import { replyRequest, fetchRequest } from "../../api/api";

export default {
  name: "request",
  data() {
    return {
      showModalSwitch: false,
      modalMessage: "",
      keys: [],
      isAccept: null,
    };
  },
  components: {
    MessageModal,
  },
  computed: {
    request() {
      return this.$store.getters.request;
    },
  },
  methods: {
    moment: function (value, format) {
      return moment(value).format(format);
    },
    getTitle: function (key) {
      switch (key) {
        case "join":
          return "新規加入申請";
        case "vacation":
          return "休暇取得申請";
        case "fix":
          return "勤務時間修正申請";
        default:
          break;
      }
    },
    getMessage: function (key) {
      switch (key) {
        case "join":
          return "この組織への、新規加入申請をします。";
        case "vacation":
          return "下記日程で、休暇取得申請します。";
        case "fix":
          return "勤務時間の修正を申請します。";
        default:
          break;
      }
    },
    clickAccept: function (key) {
      this.keys = [];
      this.modalMessage = "申請を承認します。よろしいですか？";
      this.showModalSwitch = !this.showModalSwitch;
      this.keys.push(key);
      this.isAccept = true;
    },
    clickReject: function (key) {
      this.keys = [];
      this.modalMessage = "申請を拒否します。よろしいですか？";
      this.showModalSwitch = !this.showModalSwitch;
      this.keys.push(key);
      this.isAccept = false;
    },
    clickAllAccept: function () {
      this.keys = [];
      this.modalMessage = "全ての申請を承認します。よろしいですか？";
      this.showModalSwitch = !this.showModalSwitch;
      this.request.forEach((item) => this.keys.push(item.key));
      this.isAccept = true;
    },
    clickOk: async function () {
      this.$store.commit("setIsLoading", true);
      await replyRequest(
        this.$store.getters.loginUser,
        this.keys,
        this.isAccept
      )
        .then(async () => {
          const request = await fetchRequest();
          if (request) this.$store.commit("setRequest", request);
        })
        .catch(() => {
          this.$store.commit("setResultMsgModalInfo", {
            result: "failure",
            message:
              "処理に失敗しました。\n再度、やり直してください。\n繰り返しエラーが発生する場合、管理者にお問い合わせください。",
            onClick: () => {},
          });
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>

<style scoped>
.card-style {
  width: 100%;
  background-color: black;
  border: solid 1px white;
  height: 400px;
  margin-top: 70px;
  color: white;
}

.first-message {
  display: flex;
  width: 100%;
  font-size: 22px;
  color: #a0a0a0;
}
button {
  width: 150px;
  height: 60px;
  padding: 2px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  border-radius: 6px;
}
.fix-title {
  text-align: left;
  margin-left: -70px;
  font-size: 18px;
  color: gray;
}
.fix-title + ul {
  margin-top: -5px;
}
</style>
