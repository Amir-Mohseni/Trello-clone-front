<template>
  <div class="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-8 fill-current text-gray-100 cursor-pointer focus:outline-none"
      @click="showOptions = !showOptions"
      @blur="blured"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
    <div
      class="w-20 bg-white z-10 flex-col justify-between items-start text-gray-900 absolute left-0 top-0 mt-8 ml-3 rounded-xl py-3"
      v-if="showOptions"
    >
      <div
        @click="edit()"
        class="flex-center cursor-pointer w-full font-semibold text-base px-2 py-1 hover:bg-primary-100 hover:text-white transition-all duration-200"
      >
        ویرایش
      </div>
      <div
        @click="deleteUser()"
        class="flex-center cursor-pointer font-semibold text-base px-2 py-1 hover:bg-primary-100 hover:text-white transition-all duration-200"
      >
        حذف
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    blured() {
      setTimeout(() => (this.showOptions = false), 100);
    },
    edit() {
      this.$emit("editUser", this.name);
      this.showOptions = false;
    },
    deleteUser() {
      this.$emit("deleteUser", this.name);
      this.showOptions = false;
    },
  },
};
</script>

<style></style>
