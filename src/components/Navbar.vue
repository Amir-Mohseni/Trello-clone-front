<template>
  <nav class="navbar z-50">
    <ul class="navbar-ul">
      <li class="logo sm:h-1/5 mb-10">
        <router-link to="/" class="nav-link ">
          <img
            class="w-10 h-full flex-center"
            src="@/assets/trello-icon.png"
            alt="trello"
          />
          <span class="nav-text mr-3 font-bold text-white text-2xl">ترلو</span>
        </router-link>
      </li>

      <li
        class="nav-item text-xl font-bold w-full sm:h-16"
        :class="'' + active === '/members' ? 'active' : ''"
        @click="changedTab('/members')"
        v-if="isAdmin"
      >
        <router-link
          to="/users"
          class="nav-link flex-center text-gray-300 transition-all duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current text-gray-600 w-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span class="nav-text mr-3 hidden">کاربران</span>
        </router-link>
      </li>

      <li
        class="nav-item text-xl font-bold w-full sm:h-16"
        :class="active === '/' ? 'active' : ''"
        @click="changedTab('/')"
      >
        <router-link
          to="/"
          class="nav-link flex items-center text-gray-300 transition-all duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="text-gray-600 w-8"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
          <span class="nav-text mr-3 hidden whitespace-no-wrap">بورد ها</span>
        </router-link>
      </li>

      <li
        class="nav-item text-xl font-bold w-full sm:h-16 "
        :class="active === '/notifications' ? 'active' : ''"
        @click="changedTab('/notifications')"
      >
        <router-link
          to="/notifications"
          class="nav-link relative flex items-center text-gray-300 transition-all duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="text-gray-600 w-8"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            v-if="unseenNotifications > 0"
            class="rounded-full absolute right-0 top-0 mt-2 mr-3 w-5 h-5 font-sans text-xs bg-primary-100 text-gray-100 flex-center"
            >{{ unseenNotifications }}</span
          >
          <span class="nav-text mr-3 hidden">اعلانات</span>
        </router-link>
      </li>

      <li
        class="nav-item text-xl font-bold w-full sm:h-16 "
        :class="active === '/profile' ? 'active' : ''"
        @click="changedTab('/profile')"
      >
        <router-link
          to="/profile"
          class="nav-link flex items-center text-gray-300 transition-all duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="text-gray-600 w-8"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="nav-text mr-3 hidden">پروفایل</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { user } from "../store/user";
import { notifications } from "../store/notifications";

@Options({
  data() {
    return {
      active: "" as string | symbol,
    };
  },
  computed: {
    isAdmin() {
      return user.value.admin;
    },
    unseenNotifications() {
      if (notifications.value)
        return notifications.value.filter((notif) => !notif.seen).length;
      return 0;
    },
  },
  created() {
    // console.log(this.$route);
    this.active = this.$route.path;
  },
  methods: {
    changedTab(name: string) {
      this.active = name;
    },
  },
})
export default class Navbar extends Vue {}
</script>
