import { createApp } from "vue";
import App from "./App.vue";
// import "./index.css";
import "./assets/base.css";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";

import "primevue/resources/themes/aura-dark-indigo/theme.css";
// import "primevue/resources/themes/lara-dark-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.directive("tooltip", Tooltip);
// app.use(router);
app.mount("#app");
