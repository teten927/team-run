<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div class="inner" style="width: 100%; min-width: 1050px">
      <Button
        :disabled="false"
        label="パスワードを変更する"
        width="60%"
        style="font-size: 28px; height: 100px"
        @click.native="setModalParam('password')"
      />
      <Button
        v-if="$store.getters.request"
        :disabled="false"
        label="Admin権限を付与する"
        width="60%"
        style="margin-top: 80px; font-size: 28px; height: 100px"
        @click.native="setModalParam('authority')"
      />

      <Button
        v-if="$store.getters.request"
        :disabled="false"
        label="ユーザを削除する"
        width="60%"
        style="margin-top: 80px; font-size: 28px; height: 100px"
        @click.native="setModalParam('delete')"
      />
    </div>

    <modal
      name="setting-modal"
      :draggable="true"
      width="700px"
      height="auto"
      :scrollable="true"
    >
      <div class="modal-header">
        <h2>{{ modalTitle }}</h2>
      </div>
      <div class="modal-body">
        <div
          v-if="modalKey === 'password'"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <InputPassword
            v-model="oldPassword"
            label="Old Password"
            style="width: 400px"
          />
          <InputPassword
            v-model="newPassword"
            label="New Password"
            style="margin-top: 30px; width: 400px"
            :errorMessage="errorMessageNewPassword"
          />
          <InputPassword
            v-model="confirmPassword"
            label="Confirm Password"
            style="margin-top: 30px; width: 400px"
            :errorMessage="errorMessageConfirmPassword"
          />
        </div>
        <div
          v-if="modalKey === 'delete'"
          style="display: flex; justify-content: center"
        >
          <InputeText
            v-model="deleteUserId"
            label="Delete User ID (E-mail)"
            style="width: 400px"
            :errorMessage="null"
          />
        </div>
        <div
          v-if="modalKey === 'authority'"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: scroll;
            height: 250px;
          "
        >
          <div
            style="font-size: 22px; margin-top: 6px"
            v-for="user in Object.keys(membersInfo)"
            :key="user"
          >
            <div v-if="!membersInfo[user].isAdmin">
              <input
                type="checkbox"
                :id="user"
                :value="user"
                v-model="checkedUsers"
              />
              <label :for="user"
                >{{ membersInfo[user].fullname }}({{ user }})</label
              >
            </div>
          </div>
        </div>
        <button
          :disabled="disabledButton"
          style="
            margin-top: 20px;
            width: 80px;
            padding: 2px;
            font-size: 24px;
            font-weight: bold;
            height: 60px;
            cursor: pointer;
          "
          @click="
            () => {
              this.showConfirmModalSwitch = !this.showConfirmModalSwitch;
            }
          "
        >
          OK
        </button>
      </div>
    </modal>
    <MessageModal
      name="setting-confirm"
      :showModalSwitch="showConfirmModalSwitch"
      :message="confirmMessage"
      @clickOk="modalMethod()"
    />
  </div>
</template>

<script>
import Button from "../items/Button1";
import InputPassword from "../items/InputPassword2";
import InputeText from "../items/InputText2";
import MessageModal from "../items/MessageModal2";

import { changePassword, grantAuthority, deleteUser } from "../../api/api";

export default {
  name: "setting",
  components: {
    Button,
    InputPassword,
    InputeText,
    MessageModal,
  },
  data() {
    return {
      modalKey: "",
      modalTitle: "",
      modalMethod: null,
      oldPassword: "",
      newPassword: "",
      errorMessageNewPassword: null,
      confirmPassword: "",
      errorMessageConfirmPassword: null,
      showConfirmModalSwitch: false,
      confirmMessage: "",
      deleteUserId: "",
      isErrorUserId: true,
      checkedUsers: [],
    };
  },
  methods: {
    setModalParam: function (key) {
      switch (key) {
        case "password":
          this.modalKey = "password";
          this.modalTitle = "パスワード変更";
          this.modalMethod = this.clickChangePassword;
          this.confirmMessage = "パスワードを変更します。\nよろしいですか？";
          break;
        case "authority":
          this.modalKey = "authority";
          this.modalTitle = "Admin権限付与";
          this.modalMethod = this.clickGrantAuthority;
          this.confirmMessage =
            "指定されたユーザにAdmin権限を付与します。\n本当によろしいですか？";
          break;
        case "delete":
          this.modalKey = "delete";
          this.modalTitle = "ユーザ削除";
          this.modalMethod = this.clickDeleteUser;
          this.confirmMessage =
            "指定されたユーザを削除します。\n本当によろしいですか？";
          break;
        default:
          break;
      }
      this.$modal.show("setting-modal");
    },
    clickChangePassword: async function () {
      this.$modal.hide("setting-modal");
      this.$store.commit("setIsLoading", true);
      await changePassword(
        this.$store.getters.loginUser,
        this.oldPassword,
        this.newPassword
      ).catch(() => {
        this.$store.commit("setResultMsgModalInfo", {
          result: "failure",
          message: "パスワードの変更に失敗しました。\n再度やり直してください。",
          onClick: () => {},
        });
      });
      this.$store.commit("setIsLoading", false);
    },
    clickGrantAuthority: async function () {
      this.$modal.hide("setting-modal");
      this.$store.commit("setIsLoading", true);
      await grantAuthority(this.$store.getters.loginUser).catch(() => {
        this.$store.commit("setResultMsgModalInfo", {
          result: "failure",
          message: "Admin権限の付与に失敗しました。\n再度やり直してください。",
          onClick: () => {},
        });
      });
      this.$store.commit("setIsLoading", false);
    },
    clickDeleteUser: async function () {
      this.$modal.hide("setting-modal");
      this.$store.commit("setIsLoading", true);
      await deleteUser(this.$store.getters.loginUser, this.deleteUserId).catch(
        () => {
          this.$store.commit("setResultMsgModalInfo", {
            result: "failure",
            message: "ユーザの削除に失敗しました。\n再度やり直してください。",
            onClick: () => {},
          });
        }
      );
      this.$store.commit("setIsLoading", false);
    },
  },
  computed: {
    disabledButton() {
      return (
        (this.modalKey === "password" &&
          (this.oldPassword === "" ||
            this.newPassword === "" ||
            this.errorMessageNewPassword !== null ||
            this.confirmPassword === "" ||
            this.errorMessageConfirmPassword !== null)) ||
        (this.modalKey === "delete" &&
          (this.deleteUserId === "" || this.isErrorUserId))
      );
    },
    membersInfo() {
      return this.$store.getters.membersInfo;
    },
  },
  watch: {
    newPassword: function (value) {
      if (value.length > 0 && value.length < 8)
        this.errorMessageNewPassword = "8文字以上で入力してください。";
      else this.errorMessageNewPassword = null;
    },
    confirmPassword: function (value) {
      if (value.length > 0 && value !== this.newPassword)
        this.errorMessageConfirmPassword = "パスワードが一致しません。";
      else this.errorMessageConfirmPassword = null;
    },
    deleteUserId: function (value) {
      this.isErrorUserId = true;
      Object.keys(this.membersInfo).forEach((key) => {
        if (value === key) this.isErrorUserId = false;
      });
    },
  },
};
</script>

<style scoped>
.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
}
.modal-header,
.modal-body {
  padding: 20px 25px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
</style>