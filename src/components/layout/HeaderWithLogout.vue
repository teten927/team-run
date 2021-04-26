<template>
  <div style="border-bottom: double 6px silver">
    <link
      href="https://fonts.googleapis.com/css?family=Corben:700"
      rel="stylesheet"
    />
    <div
      style="font-family: 'Corben', cursive; color: white; font-size: 50px; bold;"
    >
      The Team Run
    </div>
    <Button
      label="Logout"
      :disabled="false"
      style="position: absolute; right: 20px; top: 30px"
      @click.native="clickLogout()"
    />
  </div>
</template>

<script>
import Button from "../items/Button2";

import { logout } from "../../api/firebase"

export default {
  name: "header",
  components: {
    Button,
  },
  methods: {
    clickLogout: function () {
      logout();
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>
