<template>
  <Navbar v-if="isLoggedIn" />
  <router-view class="main" />
  <PopUpNotification />
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import PopUpNotification from "./components/PopUpNotification.vue";
import { Options, Vue } from "vue-class-component";
import { get } from "./utils/helpers";
import { buildUser, emptyUser, isLoggedIn } from "./store/user";
import { buildAllBoards } from "./store/board";
import { buildNotif, loadingStart } from "./store/notifications";
// import InitializeWS from "./components/Websocket/Initialize.vue";

@Options({
  components: {
    Navbar,
    PopUpNotification,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  async created() {
    this.isLoggedIn = localStorage.getItem("access_token") ? true : false;
    console.log(isLoggedIn);
    loadingStart();

    if (this.isLoggedIn) {
      await this.userLoggedIn();

      const boards = await get("/board/getusers");

      if (boards.success) {
        buildAllBoards(boards.boards);
      }

      const notifications = await get("/notifications/get");

      buildNotif(notifications.notifications);
    }

    this.emitter.on("loggedOut", () => {
      emptyUser();
      this.isLoggedIn = false;
      this.emitter.emit("showNotification", {
        text: "شما با موفقیت از اکانت خود خارج شدید.",
        kind: "success",
      });
    });

    this.emitter.on("loggedIn", async (user: any) => {
      this.isLoggedIn = true;
      this.$router.push("/");
      console.log("in LoggedIn event");
      console.log(user);
      buildUser(user);
      this.emitter.emit(
        "showNotification",
        `سلام <b>${user.name}</b> خوش اومدی.`
      );

      const boards = await get("/board/getusers");

      if (boards.success) {
        buildAllBoards(boards.boards);
      }
      const notifications = await get("/notifications/get");
      console.log(notifications);
      buildNotif(notifications.notifications);
    });
  },
  methods: {
    async userLoggedIn() {
      const user = await get("/user/checkAuth");
      console.log(user);

      if (!user.success || !user) {
        this.isLoggedIn = false;
      } else buildUser(user.user);
    },
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
@media (min-width: 640px) {
  .main {
    padding-left: 80px !important;
  }
}
@media (max-width: 640px) {
  .main {
    padding-bottom: 65px !important;
  }
}
</style>
