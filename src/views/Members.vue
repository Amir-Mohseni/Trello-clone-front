<template>
  <div class="w-full h-full">
    <header class="w-full flex-center h-32 bg-primary-100 px-4">
      <div class="flex-col w-1/2 justify-center items-start">
        <h2 class="text-3xl font-extrabold text-gray-200">همه کاربران</h2>
        <!-- <span
          class="text-lg font-semibold text-gray-100" 
          v-if="boards.length"
          >{{ boards.length }}</span
        > -->
      </div>
      <div class="flex w-1/2 justify-end items-end">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="fill-current text-gray-200 w-8 cursor-pointer hover:text-white hover:bg-blue-600 rounded-lg"
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
        </svg> -->
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
          class="h-12 w-64 rounded-l-lg border-none text-lg font-medium text-gray-700 py-2 px-3 search shadow-md"
          placeholder="جستجو"
        />
      </div>
    </header>
    <main class="h-full w-full py-12 px-3">
      <div
        class="w-full bg-primary-100 text-gray-100 mb-3 shadow-lg flex rounded-lg justify-between items-center px-4 py-3"
        v-for="user in filteredUsers"
        :key="user._id"
      >
        <div class="flex items-center">
          <div
            class="rounded-full flex-center w-12 h-12 overflow-hidden bg-white border-2 border-gray-100 border-opacity-75"
          >
            <img
              :src="
                user.pic.length
                  ? user.pic
                  : '/profile/profile-' + (user.sex ? 'man' : 'woman') + '.png'
              "
              class="w-full h-full object-cover"
              alt="avatar"
            />
          </div>
          <span class="font-semibold text-lg mr-3">{{ user.username }}</span>
        </div>
        <UserDropdown
          :name="user.username"
          @editUser="editUser"
          @deleteUser="confirmDeleteUser"
        />
      </div>
    </main>

    <edit-user-modal
      :class="{ 'fade-in': editing, 'fade-out': !editing }"
      v-if="EditUserIndex !== -1"
      :name="users[EditUserIndex].username"
      :id="users[EditUserIndex]._id"
      @userEdited="finishedEditting"
      @closeEditModal="
        EditUserIndex = -1;
        editing = false;
      "
    />

    <div
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex-col flex-center"
      v-if="deleteUserIndex !== -1"
    >
      <div
        class="rounded-lg relative bg-white flex-col justify-between items w-64 py-10 px-6"
      >
        <h6 class="font-semibold text-lg block">
          کاربر {{ users[deleteUserIndex].username }} حذف شود؟
        </h6>
        <div class="w-full mt-6 flex justify-around items-center">
          <button class="btn-primary" @click="deleteUserIndex = -1">خیر</button>
          <button class="btn-primary-out" @click="deleteUser">بله</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { get, deleteReq } from "../utils/helpers";
import { user } from "../store/user";
import UserDropdown from "../components/Members/UserDropdown.vue";
import EditUserModal from "../components/Members/EditUserModal.vue";

@Options({
  name: "Members",
  components: {
    UserDropdown,
    EditUserModal,
  },
  data() {
    return {
      users: [] as any,
      searched: "" as string,
      editing: false,
      deleteUserIndex: -1,
      EditUserIndex: -1,
    };
  },
  computed: {
    filteredUsers() {
      const users = this.users.filter((user: any) =>
        user.username.search(this.searched) !== -1 ? true : false
      );
      return users;
    },
  },
  async created() {
    const users = await get("/user/getalladmin");

    if (users.success) {
      const adminIndex = users.users.findIndex(
        (User: any) => User.username === user.value.name
      );
      users.users.splice(adminIndex, 1);
      this.users = users.users;
    } else {
      console.log(users);
    }
  },
  methods: {
    editUser(name: string) {
      const userIndex = this.users.findIndex(
        (user: any) => user.username === name
      );
      this.EditUserIndex = userIndex;
      console.log(this.EditUserIndex);
      this.editing = true;
    },
    confirmDeleteUser(name: string) {
      const userIndex = this.users.findIndex(
        (user: any) => user.username === name
      );
      this.deleteUserIndex = userIndex;
    },
    async deleteUser() {
      const deletedUser = await deleteReq("/user", {
        id: this.users[this.deleteUserIndex]._id,
      });

      if (deletedUser.success) this.users.splice(this.deleteUserIndex, 1);
      this.deleteUserIndex = -1;
    },
    finishedEditting(name: string) {
      console.log(name);
      this.users[this.EditUserIndex].username = name;
      this.editing = false;
      this.EditUserIndex = 0;
    },
  },
})
export default class Members extends Vue {}
</script>
