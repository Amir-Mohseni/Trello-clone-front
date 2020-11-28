import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { emitter } from './mitt'
import "./assets/style/styles.scss";

console.log(process.env.NODE_ENV);

let app = createApp(App).use(router);
app.config.globalProperties.emitter = emitter;
app.mount("#app");
