import { createApp, reactive } from "vue";
import App from "./App.vue";
import "./assets/base.css";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import Ripple from "primevue/ripple";

import "primevue/resources/themes/aura-dark-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const globalState = reactive({
  appbar: { height: 0, width: 0 },
});

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);
app.provide("globalState", globalState);
app.mount("#app");
