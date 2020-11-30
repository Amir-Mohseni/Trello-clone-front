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
        <label class="ml-3 text-base font-bold whitespace-no-wrap" for="name"
          >نام کاربری جدید:</label
        >
        <input
          type="text"
          v-model="newName"
          id="name"
          name="name"
          dir="ltr"
          placeholder="نام کاربری"
          class="border-2 border-gray-800 rounded-lg px-2 py-1 text-base font-sans focus:outline-none"
        />
      </div>
      <div class="flex w-full justify-between items-center mt-3">
        <label class="ml-3 text-base font-bold whitespace-no-wrap" for="name"
          >جنسیت:</label
        >
        <SexOptions :sex="newSex" @changed="changeSex" />
      </div>
      <div class="flex w-full justify-around items-end pt-8">
        <button
          class="w-24 bg-primary-100 text-white rounded-lg py-2 flex-center hover:shadow-lg"
          @click="EditUser"
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
import SexOptions from "./DropDown.vue";
import { user, EditUserNameAndSex } from "@/store/user";
import { put } from "@/utils/helpers";

export default defineComponent({
  name: "EditUser",
  components: {
    SexOptions,
  },
  data() {
    return {
      user: user.value,
      newName: user.value.name,
      newSex: user.value.sex,
    };
  },
  methods: {
    changeSex() {
      console.log("in changeSex");
      this.newSex = !this.newSex;
    },
    toggleForm() {
      this.$emit("editFinished");
    },
    async EditUser() {
      const data = {
        id: this.user.id,
        username: this.newName,
        sex: this.newSex,
      };

      console.log(data);

      const updatedUser = await put("/user", data);

      if (updatedUser.success) {
        EditUserNameAndSex(data.username, data.sex);
      }

      this.$emit("editFinished");
    },
  },
});
</script>
