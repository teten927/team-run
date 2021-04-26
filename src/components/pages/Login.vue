<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 600px;
      margin-top: 20vh;
    "
  >
    <InputText v-model="id" label="Login ID" width="90%" />
    <InputPassword
      v-model="password"
      label="Password"
      width="90%"
      style="margin-top: 60px"
    />
    <Button
      :disabled="isDisableButton"
      label="Login"
      width="60%"
      style="margin-top: 60px"
      @click.native="clickLogin"
    />
    <router-link
      to="/register"
      style="
        color: white;
        text-decoration: underline;
        font-size: 26px;
        margin-top: 30px;
      "
      >Join New Organization</router-link
    >
  </div>
</template>

<script>
import InputText from "../items/InputText1";
import InputPassword from "../items/InputPassword1";
import Button from "../items/Button1";

import { login } from "@/api/firebase.js";

export default {
  name: "login",
  components: {
    InputText,
    InputPassword,
    Button,
  },
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    clickLogin: async function () {
      if (this.isDisableButton) return;
      this.$store.commit("setIsLoading", true);
      try {
        await login({
          id: this.id,
          password: this.password,
        });
      } catch {
        this.$store.commit("setResultMsgModalInfo", {
          result: "failure",
          message:
            "ログインに失敗しました。\n正しいID、Passwordで再度ログインしてください。\n繰り返し失敗する場合、管理者にお問い合わせください。",
          onClick: () => {},
        });
      this.$store.commit("setIsLoading", false);
        return;
      }
    },
  },
  computed: {
    isDisableButton: function () {
      return this.id === "" || this.password === "";
    },
  },
};
</script>
