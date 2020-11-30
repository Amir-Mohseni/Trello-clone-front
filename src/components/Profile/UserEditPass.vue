<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex-center">
    <div
      class="flex-col relative bg-white rounded-lg justify-between items-center py-10 px-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        @click="toggleForm"
        class="absolute w-8 right-0 mr-2 top-0 mt-2 cursor-pointer fill-current p-1 text-gray-900 rounded-full hover:bg-gray-500"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <div class="flex w-full justify-between items-center">
        <label class="ml-3 text-base font-bold whitespace-no-wrap" for="oldPass"
          >کلمه عبور فعلی:</label
        >
        <input
          type="password"
          v-model="oldPass"
          id="oldPass"
          name="oldPass"
          dir="ltr"
          placeholder="کلمه عبور"
          class="border-2 border-gray-800 rounded-lg px-2 py-1 text-base font-sans focus:outline-none"
        />
      </div>
      <div class="flex w-full justify-between items-center mt-3">
        <label class="ml-3 text-base font-bold whitespace-no-wrap" for="pass"
          >کلمه عبور جدید:</label
        >
        <input
          type="password"
          v-model="newPass"
          id="pass"
          name="pass"
          dir="ltr"
          placeholder="کلمه عبور"
          class="border-2 border-gray-800 rounded-lg px-2 py-1 text-base font-sans focus:outline-none"
        />
      </div>
      <div class="flex w-full justify-between items-center mt-3">
        <label
          class="ml-3 text-base font-bold whitespace-no-wrap"
          for="passConfirm"
          >تایید کلمه عبور:</label
        >
        <input
          type="password"
          v-model="newPassConfirm"
          id="passConfirm"
          name="passConfirm"
          dir="ltr"
          placeholder="تایید کلمه عبور"
          class="border-2 border-gray-800 rounded-lg px-2 py-1 text-base font-sans focus:outline-none"
        />
      </div>
      <div class="flex w-full justify-between items-center mt-3">
        <p
          class="ml-3 text-base text-red-600 font-bold whitespace-no-wrap"
          v-if="shortPassError.length"
        >
          {{ shortPassError }}
        </p>
        <p
          class="ml-3 text-base text-red-600 font-bold whitespace-no-wrap"
          v-if="confirmPassError.length"
        >
          {{ confirmPassError }}
        </p>
      </div>
      <div class="flex w-full justify-center items-end pt-8">
        <button
          class="w-24 bg-primary-100 text-white rounded-lg py-2 flex-center hover:shadow-lg"
          @click="ChangeUserPass"
        >
          تایید
        </button>
        <button
          class="w-24 bg-red-600 text-white rounded-lg py-2 mr-2 flex-center hover:shadow-lg"
          @click="toggleForm"
        >
          لغو
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user } from "@/store/user";
import { put } from "@/utils/helpers";

export default defineComponent({
  name: "EditUserPass",
  data() {
    return {
      user: user.value,
      oldPass: "",
      newPass: "",
      newPassConfirm: "",
      shortPassError: "",
      confirmPassError: "",
    };
  },
  methods: {
    async ChangeUserPass() {
      this.shortPassError = "";
      this.confirmPassError = "";
      if (this.oldPass.length < 4 || this.newPass.length < 4) {
        this.shortPassError = "کلمه عبور باید حداقل 4 کاراکتر باشد.";
      } else if (this.newPass !== this.newPassConfirm) {
        this.confirmPassError = "دو کلمه عبوری وارد شده یکی نیستند.";
      } else {
        const data = {
          id: this.user.id,
          oldPassword: this.oldPass,
          newPassword: this.newPass,
        };

        console.log(data);

        const updatedUser = await put("/user/pass", data);

        this.$emit("editFinished");
      }
    },
    toggleForm() {
      this.$emit("editFinished");
    },
  },
});
</script>
