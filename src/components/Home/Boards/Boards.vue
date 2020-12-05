<template>
  <div class="w-full h-full">
    <header class="w-full flex-center h-32 bg-primary-100 px-4">
      <div class="flex-col w-1/2 justify-center items-start">
        <h2 class="text-3xl font-extrabold text-gray-200">برد ها</h2>
        <!-- <span
          class="text-lg font-semibold text-gray-100" 
          v-if="boards.length"
          >{{ boards.length }}</span
        > -->
      </div>
      <div class="flex w-1/2 justify-end items-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="fill-current text-gray-200 w-10 cursor-pointer hover:text-white hover:bg-blue-600 rounded-lg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="toggleBoardForm"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <div class="w-full absolute flex justify-center items-center mt-32">
        <button
          class="h-12 border-none rounded-r-lg flex-center bg-gray-100 py-2 px-3 shadow-md focus:outline-none focus:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <input
          type="text"
          v-model="searched"
          class="h-12 w-64 rounded-l-lg border-none text-lg font-medium text-gray-700 py-2 px-3 search shadow-md focus:outline-none focus:shadow-inner"
          placeholder="جستجو"
        />
      </div>
    </header>
    <main
      class="flex-column w-full h-full pt-12 px-4 lg:p-12"
      v-if="filteredBoards.length"
    >
      <div
        v-for="(board, index) in filteredBoards"
        :key="board._id"
        class="board-card flex py-4 px-6 mb-3 cursor-pointer w-full justify-between items-center rounded-lg shadow hover:shadow-xl"
        :class="'bg-' + board.color"
        :style="{ backgroundColor: board.color }"
        @click="goToLists(index)"
      >
        <div>
          <span class="board-name text-xl text-gray-100 font-normal">{{
            board.name
          }}</span>
        </div>
        <div class="board-des flex justify-between items-center">
          <div class="ml-5">
            <span
              class="font-medium text-base whitespace-no-wrap text-gray-100 ml-1"
              >تعداد اعضا:</span
            >
            <span class="font-medium text-base text-gray-100">{{
              board.members.length
            }}</span>
          </div>
          <img
            class="w-8"
            :src="'/boardIcons/' + board.icon + '_light.png'"
            alt=""
          />
        </div>
      </div>
    </main>
    <main class="flex-center flex-col w-full h-full pt-12" v-else>
      <div v-if="!areBoardsLoading" class="w-full flex-center flex-col">
        <h2 class="font-extrabold text-3xl-text-gray-900">
          بوردی برای نمایش وجود ندارد
        </h2>
        <button class="btn-primary mt-4" @click="toggleBoardForm">
          اولین برد خود را بسازید
        </button>
      </div>
      <div class="w-full h-full text-center" v-else>
        <div class="lds-dual-ring mt-12 w-full"></div>
        <span
          class="font-semibold block text-lg mt-6 whitespace-no-wrap text-gray-900 w-full"
          >بارگذاری بورد ها</span
        >
      </div>
    </main>
    <BoardForm
      v-if="allowForm"
      :class="{ 'fade-in': showForm, 'fade-out': !showForm }"
      @closeForm="toggleBoardForm"
      @newBoard="addBoard"
      mode="Create"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { get } from "@/utils/helpers";
import BoardForm from "./BoardForm.vue";
import {
  allBoards,
  buildAllBoards,
  buildActiveBoard,
  addBoard,
  isLoading,
} from "@/store/board";
import { ref, computed } from "vue";

@Options({
  components: {
    BoardForm,
  },
  data() {
    return {
      loading: false,
      allowForm: false,
      showForm: false,
      searched: "" as string,
    };
  },
  async created() {},
  computed: {
    areBoardsLoading() {
      return isLoading.value;
    },
    boards() {
      return allBoards.value;
    },
    filteredBoards() {
      const boards = allBoards.value.filter((board: any) =>
        board?.name?.search(this.searched) !== -1 ? true : false
      );
      return boards;
    },
  },
  methods: {
    toggleBoardForm() {
      if (!this.allowForm) this.allowForm = true;

      this.showForm = !this.showForm;
    },
    addBoard(board: any) {
      addBoard(board);
      this.showForm = false;
    },
    goToLists(index: number) {
      buildActiveBoard(this.boards[index]);
      this.$emit("changeComponent", "Lists");
    },
  },
})
export default class Boards extends Vue {}
</script>
