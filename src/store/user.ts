import { reactive, computed } from "vue";

let User = reactive({
  currentUser: {
    id: "",
    name: "",
    admin: false,
    pic: "",
    sex: true,
  },
  loaded: false,
  isLoggedIn: true,
});

export const buildUser = (data: any) => {
  User.currentUser.id = data?.id || "";
  User.currentUser.name = data?.name || "Guest";
  User.currentUser.admin = data?.admin || false;
  User.currentUser.pic = data?.pic || "";
  User.currentUser.sex = data?.sex || true;
  loaded();
};

export const emptyUser = () => {
  User.currentUser.id = "";
  User.currentUser.name = "";
  User.currentUser.admin = false;
  User.currentUser.pic = "";
  User.currentUser.sex = true;
};

export const uploadedPhoto = (path: string) => {
  User.currentUser.pic = path;
};

export const EditUserNameAndSex = (username: string, sex: boolean) => {
  User.currentUser.name = username;
  User.currentUser.sex = sex;
};

const loaded = () => {
  User.loaded = true;
};

export const user = computed(() => User.currentUser);
export const userLoaded = computed(() => User.loaded);
export const isLoggedIn = computed(() => User.isLoggedIn);
