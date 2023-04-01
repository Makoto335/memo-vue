import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

library.add(faTrashCan, faPencil);
createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
