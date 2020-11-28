<template>
  <div class="w-full h-full relative">
    <header
      class="w-full flex justify-center items-center h-32 px-4 bg-primary-100"
    >
      <div class="w-1/2 flex justify-start items-center">
        <!-- three dots -->
        <div class="relative"></div>
      </div>

      <div class="w-1/2 flex justify-end items-center">
        <div class="flex items-center ml-2">
          <p class="text-lg text-white font-bold ml-3">{{ user.name }}</p>
          <div class="relative cursor-pointer">
            <label for="photo" class="cursor-pointer">
              <div
                class="rounded-full flex-center w-20 h-20 overflow-hidden bg-white border-2 border-gray-100 border-opacity-75"
              >
                <img
                  :src="
                    user.pic.length
                      ? user.pic
                      : '/profile/profile-' +
                        (user.sex ? 'man' : 'woman') +
                        '.png'
                  "
                  class="w-full h-full object-cover"
                  alt="avatar"
                  v-if="!uploadingPhoto"
                />
                <div v-if="uploadingPhoto" class="lds-dual-ring"></div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="absolute bottom-0 right-0 w-6 p-1 rounded-full bg-gray-900 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
            <input
              class="hidden"
              type="file"
              id="photo"
              name="photo"
              @change="uploadPhoto"
            />
          </div>
        </div>
      </div>
    </header>
    <main class="w-full-h-full flex-col py-4 px-2">
      <div
        class="w-full flex justify-start rounded-lg tracking-wider shadow-inner py-4 px-3 border-2 border-gray-300 border-opacity-75 mb-4 hover:shadow hover:bg-primary-100 transition-all duration-300 hover:text-white cursor-pointer"
        @click="toggleEditUser"
      >
        <p class="text-base font-bold">ویرایش پروفایل</p>
      </div>
      <div
        class="w-full flex justify-start rounded-lg tracking-wider shadow-inner py-4 px-3 border-2 border-gray-300 border-opacity-75 mb-4 hover:shadow hover:bg-primary-100 transition-all duration-300 hover:text-white cursor-pointer"
        @click="toggleEditUserPass"
      >
        <p class="text-base font-bold">تغییر کلمه عبور</p>
      </div>
      <div
        class="w-full flex justify-start rounded-lg tracking-wider shadow-inner py-4 px-3 border-2 border-gray-300 border-opacity-75 mb-4 hover:shadow hover:bg-primary-100 transition-all duration-300 hover:text-white cursor-pointer"
        @click="Logout"
      >
        <p class="text-base font-bold">خروج</p>
      </div>
    </main>
    <UserEdit v-if="showEditNameModal" @editFinished="toggleEditUser" />
    <UserEditPass v-if="showEditPassModal" @editFinished="toggleEditUserPass" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { user, uploadedPhoto } from "@/store/user";
import { uploadPhoto } from "@/utils/helpers";
import UserEdit from "@/components/Profile/UserEdit.vue";
import UserEditPass from "@/components/Profile/UserEditPass.vue";

@Options({
  components: {
    UserEdit,
    UserEditPass,
  },
  data() {
    return {
      user: user.value,
      uploadingPhoto: false,
      showEditNameModal: false,
      showEditPassModal: false,
    };
  },
  methods: {
    async uploadPhoto(e: any) {
      console.log("uploading photo.");
      this.uploadingPhoto = true;

      let photo = new FormData();
      photo.append("photo", e.target.files[0]);

      let uploaded = await uploadPhoto("/user/uploaduserphoto", photo);

      if (uploaded.success) {
        uploadedPhoto(uploaded.path);
      }

      this.uploadingPhoto = false;
    },
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.$router.push("/login");
      this.emitter.emit("loggedOut");
    },
    toggleEditUser() {
      this.showEditNameModal = !this.showEditNameModal;
    },
    toggleEditUserPass() {
      this.showEditPassModal = !this.showEditPassModal;
    },
  },
})
export default class Profile extends Vue {}
</script>
