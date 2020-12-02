<template>
  <div class="fixed flex flex-center inset-0 bg-gray-800 bg-opacity-50">
    <div
      class="rounded-lg relative bg-white flex-col justify-between items w-64 py-12 px-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        class="absolute w-8 right-0 mr-2 top-0 mt-2 cursor-pointer fill-current p-1 text-gray-900 rounded-full hover:bg-gray-500"
        viewBox="0 0 24 24"
        @click="closeModal"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <input
        class="bg-transparent w-full border-b-2 border-gray-900 px-2 py-1 mb-6 font-semibold text-base"
        type="text"
        v-model="username"
        placeholder="نام کاربری"
      />
      <button class="btn-primary w-full py-2" @click="EditUser">تایید</button>
    </div>
  </div>
</template>

<script>
import { put } from "../../utils/helpers";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: this.name,
    };
  },
  methods: {
    async EditUser() {
      const editUser = await put("/user", {
        id: this.id,
        username: this.username,
      });

      if (editUser?.success) {
        this.$emit("userEdited", this.username);
      } else {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("closeEditModal");
    },
  },
};
</script>

<style></style>
