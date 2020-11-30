<template>
  <div class="w-64 fixed bottom-0 right-0 mb-8 mr-4 px-2 z-50">
    <div
      v-for="(notif, index) in notifications"
      :key="notif.id"
      class="relative z-50 w-full mb-3 rounded-lg py-4 px-5 shadow-lg overflow-hidden flex-center text-white transition-all duration-300 hover:opacity-75 cursor-pointer"
      :class="
        notif.kind +
          '-notif ' +
          (notif.active ? 'notification-in' : 'notification-out')
      "
      @click="removeNotification(index)"
    >
      <p class="text-base" v-html="notif.text"></p>
      <div
        class="absolute bottom-0 left-0 h-remaining bg-white"
        :style="{ width: remaining(index) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { notifications } from "@/store/notifications";
import { Options, Vue } from "vue-class-component";

@Options({
  data() {
    return {
      notifications: [] as Array<any>,
      waitingNotifications: [] as Array<any>,
    };
  },
  computed: {},
  created() {
    let waitingNotifications = [] as any;
    this.emitter.on("showNotification", (data: any) => {
      const id = new Date().getTime().toString();

      let notification = {
        id,
        text: data?.text || data,
        kind: data.kind || "info",
        remaining: 5000,
        active: true,
      } as any;

      if (this.notifications.length < 3) {
        this.notifications.push(notification);
        this.startCountDown(id);
      } else {
        this.waitingNotifications.push(notification);
      }
    });
  },
  methods: {
    startCountDown(id: string) {
      let notificationInterval: any = {};

      let index = this.notifications.findIndex((notif: any) => notif.id === id);
      const removeNotification = () => this.removeNotification();

      notificationInterval[id] = setInterval(() => {
        index = this.notifications.findIndex((notif: any) => notif.id === id);

        if (index === -1) {
          clearInterval(notificationInterval[id]);
          return;
        } else {
          if (this.notifications[index].remaining <= 0) {
            removeNotification();
            clearInterval(notificationInterval[id]);
            return;
          }

          this.notifications[index].remaining =
            this.notifications[index].remaining - 5;
        }
      }, 5);
    },
    removeNotification(index: number = 0) {
      console.log(this.notifications);
      this.notifications[index].active = false;
      setTimeout(() => {
        this.notifications.splice(index, 1);
        if (this.waitingNotifications.length) {
          if (this.notifications.length < 2) {
            const nextNotifications = new Array(3 - this.notifications.length);
            console.log("next Notifications array");
            console.log(nextNotifications);
            nextNotifications.forEach(() => {
              const nextNotif = this.waitingNotifications[0];
              this.notifications.push(nextNotif);
              this.startCountDown(nextNotif.id);
              this.waitingNotifications.splice(0, 1);
            });
          } else {
            const nextNotif = this.waitingNotifications[0];
            this.notifications.push(nextNotif);
            this.startCountDown(nextNotif.id);
            this.waitingNotifications.splice(0, 1);
          }
        }
      }, 600);
    },
    remaining(index: number) {
      return (this.notifications[index].remaining / 5000) * 100;
    },
  },
})
export default class Navbar extends Vue {}
</script>

<style lang="scss">
.info-notif {
  background-color: #007dc6;
}

.success-notif {
  background-color: #48bb78;
}

.warning-notif {
  background-color: #ec8937;
}

.error-notif {
  background-color: #e43e3f;
}

.h-remaining {
  height: 0.2rem;
}
</style>
