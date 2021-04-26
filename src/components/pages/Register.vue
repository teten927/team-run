<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 600px;
      margin-top: 5vh;
      height: 900px;
    "
  >
    <div style="display: flex; width: 90%">
      <InputText
        v-model="orgCode"
        label="Organization Code"
        width="100%"
        :activated="isOrgTextBoxInputed"
      />
      <img
        id="org-code"
        src="../../../public/icon/seach.png"
        width="60px"
        height="60px"
        style="margin-top: 10px; cursor: pointer"
        class="seach-icon"
        @click="clickSeachOrg('code')"
      />
    </div>
    <div style="display: flex; width: 90%; margin-top: 30px">
      <InputText
        v-model="orgName"
        label="Organization Name"
        width="100%"
        :activated="isOrgTextBoxInputed"
      />
      <img
        src="../../../public/icon/seach.png"
        width="60px"
        height="60px"
        style="margin-top: 10px; cursor: pointer"
        class="seach-icon"
        @click="clickSeachOrg('name')"
      />
    </div>
    <div style="color: lightgray; font-size: 20px">前方一致検索可</div>
    <InputText
      v-model="id"
      label="E-Mail (Login ID)"
      width="90%"
      style="margin-top: 30px"
      :errorMessage="errorMessageId"
    />
    <InputText
      v-model="fullname"
      label="Fullname"
      width="90%"
      style="margin-top: 30px"
      :errorMessage="errorMessageName"
    />
    <InputPassword
      v-model="password"
      label="Password"
      width="90%"
      style="margin-top: 30px"
      :errorMessage="errorMessagePassword"
    />
    <InputPassword
      v-model="rePassword"
      label="ConfirmPassword"
      width="90%"
      style="margin-top: 30px"
      :errorMessage="errorMessageRepassword"
    />

    <Button
      :disabled="isDisableButton"
      label="Join"
      width="60%"
      style="margin-top: 60px; margin-bottom: 60px"
      @click.native="clickRegister"
    />

    <modal name="org-seach" :draggable="true" height="auto" :scrollable="true">
      <div class="modal-header">
        <h2>Organization 検索結果</h2>
      </div>
      <div v-if="isOrgLoading" style="padding: 80px">
        <Loading color="gray" />
      </div>
      <div v-else class="modal-body">
        <div v-for="(org, index) in orgs" :key="org.code" class="radio">
          <input
            :id="index"
            name="radio"
            :value="index"
            v-model="checkOrgIndex"
            type="radio"
          />
          <label :for="index" class="radio-label"
            >【{{ org.code }}】： {{ org.name }}</label
          >
        </div>
        <button
          style="
            margin-top: 20px;
            width: 80px;
            padding: 2px;
            font-size: 24px;
            font-weight: bold;
            height: 60px;
            cursor: pointer;
          "
          @click="decideOrg()"
        >
          OK
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import InputText from "../items/InputText1";
import InputPassword from "../items/InputPassword1";
import Button from "../items/Button1";
import Loading from "../items/Loading1";

import {
  fetchOrganizationsByCode,
  fetchOrganizationsByName,
} from "../../api/firebase";

import { register } from "@/api/api.js";

export default {
  name: "register",
  components: {
    InputText,
    InputPassword,
    Button,
    Loading,
  },
  data() {
    return {
      orgCode: "",
      orgName: "",
      isOrgTextBoxInputed: false,
      isOrgLoading: false,
      id: "",
      errorMessageId: null,
      fullname: "",
      errorMessageName: null,
      password: "",
      errorMessagePassword: null,
      rePassword: "",
      errorMessageRepassword: null,
      orgs: [],
      checkOrgIndex: -1,
    };
  },
  methods: {
    clickSeachOrg: async function (key) {
      this.isOrgLoading = true;
      this.$modal.show("org-seach");
      this.isOrgTextBoxInputed = false;
      try {
        if (key === "code") {
          this.orgs = [];
          this.orgs.push(
            await fetchOrganizationsByCode({ organizationCode: this.orgCode })
          );
        } else if (key === "name") {
          this.orgs = await fetchOrganizationsByName({
            organizationName: this.orgName,
          });
        }
      } catch {
        this.orgs = [];
      } finally {
        this.isOrgLoading = false;
      }
    },
    decideOrg: function () {
      if (!this.orgs[this.checkOrgIndex]) return;
      this.orgName = this.orgs[this.checkOrgIndex].name;
      this.orgCode = this.orgs[this.checkOrgIndex].code;
      this.isOrgTextBoxInputed = true;
      this.$modal.hide("org-seach");
    },
    clickRegister: async function () {
      this.$store.commit("setIsLoading", true);
      const userInfo = {
        orgCode: this.orgCode,
        orgName: this.orgName,
        id: this.id,
        fullname: this.fullname,
        password: this.password,
      };
      let result;
      let message;
      let onClick;
      await register(userInfo)
        .then(() => {
          result = "success";
          message = `新しい組織への登録申請が完了しました。\n承認後、メールアドレス(${this.id})へ通知されます。\n通知後、ログイン可能になります。`;
          onClick = () => {
            this.$router.push({
              name: "Login",
            });
          };
        })
        .catch(() => {
          result = "false";
          message = "登録申請が失敗しました。\n管理者にお問い合わせください。";
          onClick = () => {};
        });
      this.$store.commit("setResultMsgModalInfo", {
        result,
        message,
        onClick,
      });
      this.$store.commit("setIsLoading", false);
    },
  },
  computed: {
    isDisableButton: function () {
      return (
        this.orgCode === "" ||
        this.orgName === "" ||
        this.id === "" ||
        this.fullname === "" ||
        this.password === "" ||
        this.rePassword === "" ||
        this.errorMessageId !== null ||
        this.errorMessageName !== null ||
        this.errorMessagePassword !== null ||
        this.errorMessageRepassword !== null
      );
    },
  },
  watch: {
    id: function (value) {
      if (value.length > 32) {
        this.errorMessageId = "32文字以内で入力してください。";
      } else {
        this.errorMessageId = null;
      }
    },
    fullname: function (value) {
      if (value.length > 10) {
        this.errorMessageName = "10文字以内で入力してください。";
      } else {
        this.errorMessageName = null;
      }
    },
    password: function (value) {
      if (value.length > 0 && value.length < 8) {
        this.errorMessagePassword = "8文字以上で入力してください。";
      } else {
        this.errorMessagePassword = null;
      }
      if (this.rePassword !== "" && value !== this.rePassword) {
        this.errorMessageRepassword = "パスワードが一致しません。";
      } else {
        this.errorMessageRepassword = null;
      }
    },
    rePassword: function (value) {
      if (value !== this.password) {
        this.errorMessageRepassword = "パスワードが一致しません。";
      } else {
        this.errorMessageRepassword = null;
      }
    },
  },
};
</script>

<style scoped>
.modal-header,
.modal-body {
  padding: 20px 25px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
.seach-icon {
  margin-top: 10px;
  cursor: pointer;
}
.seach-icon:hover {
  background-color: rgba(0, 255, 255, 0.5);
}
</style>

<style lang="scss" scoped>
$color1: #f4f4f4;
$color2: #3197ee;

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.radio {
  margin: 1rem 0.5rem 0.5rem 0.5rem;
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    + .radio-label {
      &:before {
        content: "";
        background: $color1;
        border-radius: 100%;
        border: 1px solid darken($color1, 25%);
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        position: relative;
        top: -0.2em;
        margin-right: 1em;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: $color2;
          box-shadow: inset 0 0 0 4px $color1;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: $color2;
        }
      }
    }
    &:disabled {
      + .radio-label {
        &:before {
          box-shadow: inset 0 0 0 4px $color1;
          border-color: darken($color1, 25%);
          background: darken($color1, 25%);
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
}
</style>