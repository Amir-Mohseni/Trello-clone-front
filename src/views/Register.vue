<template>
  <div class="w-full login-container bg-blue-500 flex-center px-4 md:px-6">
    <form
      @submit.prevent="register()"
      @keyup.enter="register()"
      class="w-full flex-col-center px-8 rounded"
    >
      <div class="flex-center w-full">
        <img
          class="w-20 h-20 bg-white rounded-lg rounded-xl mb-8"
          src="@/assets/trello.png"
          alt="trello"
        />
      </div>
      <h2 class="text-center font-black pb-4 text-4xl text-white">ثبت نام</h2>
      <label class="w-100">
        <input
          class="input w-full text-lg"
          v-model="username"
          dir="ltr"
          type="text"
          placeholder="نام کاربری"
        />
        <span
          class="error text-white border-r-4 border-red-700 mt-4 pr-2 tracking-wider"
          >{{ usernameErr }}</span
        >
      </label>
      <label class="pb-2">
        <input
          class="input w-full text-lg"
          v-model="password"
          type="password"
          dir="ltr"
          autocomplete="new-password"
          placeholder="کلمه عبور"
        />
        <span
          class="error text-white border-r-4 border-red-700 mt-4 pr-2 tracking-wider"
          >{{ passErr }}</span
        >
      </label>
      <button
        type="button"
        class="btn-primary w-full block m-auto font-semibold tracking-wide text-xl duration-300"
        @click="register()"
        :disabled="loading"
      >
        <div v-if="loading" class="lds-dual-ring-samll-white flex-center"></div>
        <p v-else class="font-semibold text-lg">
          ثبت نام
        </p>
      </button>
      <p
        class="w-full block text-center font-normal text-base mt-8 text-gray-100"
      >
        قبلا عضو شدی؟
      </p>
      <button
        type="button"
        class="bg-white border-none outline-none w-full text-primary-100 focus:outline-none rounded px-3 py-2 block m-auto text-center mt-2 font-semibold tracking-wide text-xl duration-300"
      >
        <router-link class="block m-auto" to="/login">
          وارد شو
        </router-link>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { post } from "../utils/helpers";

@Options({
  name: "Register",
  data: () => ({
    username: "",
    password: "",
    usernameErr: "",
    passErr: "",
    loading: false,
  }),
  methods: {
    async register() {
      this.loading = true;
      this.usernameErr = "";
      this.passErr = "";

      const res = await post("/user/register", {
        username: this.username,
        password: this.password,
      });

      this.loading = false;

      if (!res.access_token || !res.refresh_token) {
        this.handleError(res);
        return;
      }

      if (res.success) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        this.emitter.emit("loggedIn", res.user);
      } else {
        this.handleError(res);
      }
    },
    handleError(error: any) {
      if (error.username === "A user with this username already exists.") {
        this.usernameErr =
          "کلمه عبور انتخاب شده تکراری میباشد. لطفا کلمه عبور دیگری انتخاب کنید.";
        this.showNotif(
          "کلمه عبور انتخاب شده تکراری میباشد. لطفا کلمه عبور دیگری انتخاب کنید.",
          "warning"
        );
      } else if (error.invalid) {
        if (error.invalid.includes("password")) {
          this.passErr =
            "کلمه عبور باید حد اقل 4 کاراکتر و متشکل از اعداد و حروف باشد.";

          this.showNotif(this.passErr, "warning");
        }

        if (error.invalid.includes("username")) {
          this.usernameErr =
            "نام کاربری باید حد اقل 3 کاراکتر و متشکل از اعداد و حروف باشد.";

          this.showNotif(this.usernameErr, "warning");
        }
      } else {
        this.showNotif(
          "خطای نامشخص اتفاق افتاد. لطفا بعدا دوباره تلاش کنید.",
          "error"
        );
      }
    },
    showNotif(text: string, kind: string) {
      this.emitter.emit("showNotification", {
        text,
        kind,
      });
    },
  },
})
export default class Register extends Vue {}
</script>
