import Vue from 'vue'
import Vuex from 'vuex'
import { realtimeFetchChatInfo, fetchOrganization, realtimeFetchMembersInfo, fetchRequest, onAuth, updateMyInfo, addChatMessage } from '../api/firebase';

Vue.use(Vuex);

function getDefaultState() {
  return {
    isAuthed: false,        // セッション取得が終了したかどうかの判定
    isLoading: false,       // ロード画面表示のトリガー
    resultMsgModalInfo: {   // 結果表示画面(モーダル)表示の内容
      result: null,             // 結果
      message: null,            // 表示メッセージ
      onClick: null             // [OK]ボタン押下後の処理
    },
    membersInfo: {},      // 同じ組織内のメンバーの情報
    loginUser: null,        // ログインした自分自身のLoginID
    userOrganization: null, // ログインした自分自身が所属する組織名
    chatInfo: [],         // 自組織のチャットの情報(過去500件)
    request: null           // 申請一覧(組織のAdministratorのみ使用)
  }
}

export default new Vuex.Store({
  state: getDefaultState(),

  getters: {
    isAuthed(state) {
      return state.isAuthed;
    },
    isLoading(state) {
      return state.isLoading;
    },
    resultMsgModalInfo(state) {
      return state.resultMsgModalInfo;
    },
    loginUser(state) {
      return state.loginUser;
    },
    userOrganization(state) {
      return state.userOrganization;
    },
    membersInfo(state) {
      return state.membersInfo;
    },
    chatInfo(state) {
      return state.chatInfo;
    },
    request(state) {
      return state.request;
    }
  },

  mutations: {
    initialize(state) {
      Object.assign(state, getDefaultState())
    },
    setIsAuthed(state, isAuthed) {
      state.isAuthed = isAuthed;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setResultMsgModalInfo(state, { result, message, onClick }) {
      state.resultMsgModalInfo = {
        result,
        message,
        onClick
      }
    },
    setMembersInfo(state, membersInfo) {
      state.membersInfo = membersInfo;
    },
    setUserInfo(state, userInfo) {
      state.membersInfo[state.loginUser] = userInfo;
    },
    setLoginUser(state, loginuUser) {
      state.loginUser = loginuUser;
    },
    setUserOrganization(state, userOrganization) {
      state.userOrganization = userOrganization;
    },
    setChatInfo(state, chatInfo) {
      state.chatInfo = chatInfo;
    },
    setRequest(state, request) {
      state.request = request;
    }
  },

  actions: {
    async onAuth(context) {
      await onAuth((user) => {
        if (user) {
          context.commit("setLoginUser", user.email);
          context.commit("setIsAuthed", true);
        }
        else context.commit("initialize");
      });
    },
    async fetchMembersInfo(context, id) {
      const commitMembersInfo = (tmpMembersInfo) => {
        let membersInfo = {};
        tmpMembersInfo.forEach(info => {
          membersInfo[info.id] = {
            image: info.image,
            fullname: info.fullname,
            organization: info.organization,
            location: info.location,
            defaultLocation: info.defaultLocation,
            comment: info.comment,
            status: info.status,
            attendanceTime: info.attendanceTime,
            isAdmin: info.isAdmin
          }
        })
        context.commit("setMembersInfo", membersInfo);
      }
      const tmpMembersInfo = await realtimeFetchMembersInfo({ id, updateFunc: commitMembersInfo });
      commitMembersInfo(tmpMembersInfo);
    },
    async updateMyInfo(context) {
      const loginUser = context.getters.loginUser;
      const membersInfo = context.getters.membersInfo;
      await updateMyInfo({id: loginUser, newInfo: membersInfo[loginUser]});
    },
    async fetchChatInfo(context, organizationCode) {
      const commitChatInfo = chatInfo => {
        context.commit("setChatInfo", chatInfo)
      };
      const chatInfo = await realtimeFetchChatInfo({ organizationCode, updateFunc: commitChatInfo });
      commitChatInfo(chatInfo);
    },
    async addChatMessage(context, message) {
      const loginUser = context.getters.loginUser;
      const organization = context.getters.membersInfo[loginUser].organization;
      await addChatMessage({ user: loginUser, organization, message});
    },
    async fetchOrganizationName(context) {
      const membersInfo = context.getters.membersInfo;
      const loginUser = context.getters.loginUser;
      let organizationCode;
      if (membersInfo[loginUser]) organizationCode = membersInfo[loginUser].organization;
      if (!organizationCode) throw new Error("No Organization")
      const organizationName = await fetchOrganization({ organizationCode });
      context.commit("setUserOrganization", organizationName);
    },
    async fetchRequest(context, organizationCode) {
      const request = await fetchRequest({ organizationCode });
      context.commit("setRequest", request);
    }
  }

})