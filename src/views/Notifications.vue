<template>
  <div class="w-full h-full">
    <header class="w-full flex-center h-32 bg-primary-100 px-4">
      <div class="flex-col w-1/2 justify-center items-start">
        <h2 class="text-3xl font-extrabold text-gray-200">اعلانات</h2>
        <!-- <span
          class="text-lg font-semibold text-gray-100"
          v-if="boards.length"
          >{{ boards.length }}</span
        > -->
      </div>
      <div class="flex w-1/2 justify-end items-end">
        <!-- Left Area -->
      </div>
      <div
        class="w-56 bg-white shadow-md rounded-xl p-1 absolute flex justify-between items-center mt-32"
      >
        <button
          class="focus:outline-none transition-all duration-500 h-12 border-none rounded-xl flex-center py-2 px-3"
          :class="
            active === 'AllNotifications'
              ? 'bg-primary-100 text-white'
              : 'bg-white text-gray-800 hover:bg-blue-700  hover:text-white'
          "
          @click="active = 'AllNotifications'"
        >
          همه
        </button>
        <button
          class="focus:outline-none h-12 border-none rounded-xl flex-center py-2 px-3"
          :class="
            active === 'MyNotifications'
              ? 'bg-primary-100 text-white'
              : 'bg-white text-gray-800 hover:bg-blue-700  hover:text-white'
          "
          @click="active = 'MyNotifications'"
        >
          من
        </button>
        <button
          class="focus:outline-none h-12 border-none rounded-xl flex-center py-2 px-3"
          :class="
            active === 'Comments'
              ? 'bg-primary-100 text-white'
              : 'bg-white text-gray-800 hover:bg-blue-700  hover:text-white'
          "
          @click="active = 'Comments'"
        >
          کامنت ها
        </button>
      </div>
    </header>
    <main
      class="w-full h-full mt-6 py-4 px-12 overflow-hidden overflow-y-auto flex-col justify-start items-center"
    >
      <component :is="active" />
    </main>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import AllNotifications from "@/components/Notifications/AllNotifications";
import MyNotifications from "@/components/Notifications/MyNotifications";
import { notifications, removeNotif } from "../store/notifications";

@Options({
  name: "Notifications",
  components: {
    AllNotifications,
    MyNotifications,
  },
  data() {
    return {
      active: "AllNotifications",
      notifs: notifications.value,
    };
  },
})
export default class Notifications extends Vue {}
</script>

<style></style>
