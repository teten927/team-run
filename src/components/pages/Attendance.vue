<template>
  <div style="padding: 40px 30px 30px 30px">
    <div
      style="text-align: left; color: white; font-size: 32px; font-weight: bold"
    >
      {{ organization }}
    </div>
    <div style="display: flex; flex-wrap: wrap; justify-content: center">
      <MyCard
        v-if="myProfile"
        :profile="myProfile"
        style="margin: 30px"
        @click="updateInfo()"
      />
      <Card
        v-for="(value, index) in activeMembers"
        :key="`first-${index}`"
        :profile="value"
        style="margin: 30px"
      />
      <Card
        v-for="(value, index) in notActiveMembers"
        :key="`second-${index}`"
        :profile="value"
        style="margin: 30px"
      />
    </div>
  </div>
</template>

<script>
import Card from "../items/Attendance/MembersCard";
import MyCard from "../items/Attendance/MyCard";

export default {
  name: "attendance",
  components: {
    Card,
    MyCard,
  },
  data() {
    return {
      image: null,
      activeMembers: null,
      notActiveMembers: null,
      myProfile: null,
    };
  },
  computed: {
    organization() {
      return this.$store.getters.userOrganization;
    },
    membersInfo() {
      return this.$store.getters.membersInfo;
    },
  },
  watch: {
    membersInfo() {
      this.makeData();
    },
  },
  mounted: function () {
    if (this.membersInfo) this.makeData();
  },
  methods: {
    makeData() {
      this.activeMembers = [];
      this.notActiveMembers = [];
      const user = this.$store.getters.loginUser;
      this.myProfile = this.membersInfo[user];
      Object.keys(this.membersInfo).forEach((key) => {
        if (key === user) return;
        if (
          this.membersInfo[key].status === "working" ||
          this.membersInfo[key].status === "busy" ||
          this.membersInfo[key].status === "free"
        )
          this.activeMembers.push(this.membersInfo[key]);
        else this.notActiveMembers.push(this.membersInfo[key]);
      });
    },
    async updateInfo() {
      this.$store.commit("setUserInfo", this.myProfile);
      await this.$store.dispatch("updateMyInfo").catch(() => {
        this.$store.commit("setResultMsgModalInfo", {
          result: "failure",
          message: "変更が適用されませんでした。やり直してください。",
          onClick: () => {},
        });
        const user = this.$store.getters.loginUser;
        this.myProfile = this.membersInfo[user];
      });
    },
  },
};
</script>
