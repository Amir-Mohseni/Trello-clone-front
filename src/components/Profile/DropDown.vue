<template>
  <div class="relative">
    <button
      @click="toggleOptions"
      class="block text-gray-800 text-base rounded-lg border-2 border-primary-100 border-opacity-75 py-1 px-2 overflow-hidden focus:outline-none focus:shadow-outline"
      @blur="blured"
    >
      {{ sex ? "زن" : "مرد" }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        class="w-5 inline-block"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <div
      class="absolute options-dropdown w-20 overflow-hidden top-0 left-0 mt-10 border-2 border-opacity-50 border-gray-400 bg-white rounded-lg shadow-xl"
      v-if="showOptions"
    >
      <div
        @click="select(true)"
        class="w-full flex-center px-2 py-1 hover:bg-gray-200 cursor-pointer"
      >
        <span
          class="text-sm w-full font-sans flex-center rounded-lg font-normal mb-1 text-gray-800"
          >مرد</span
        >
      </div>
      <div
        @click="select(false)"
        class="w-full flex-center px-2 py-1 hover:bg-gray-200 cursor-pointer"
      >
        <span
          class="text-sm w-full font-sans flex-center rounded-lg font-normal mb-1 text-gray-800"
          >زن</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    sex: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    select(sex: Boolean) {
      if (this.sex !== sex) this.$emit("changed");
      this.showOptions = false;
    },
    blured() {
      setTimeout(() => {
        this.showOptions = false;
      }, 100);
    },
  },
});
</script>

<style lang="scss">
.options-dropdown {
  direction: ltr !important;
  &::-webkit-scrollbar {
    width: 0.45rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background: #1059bc;
  }
}
</style>
