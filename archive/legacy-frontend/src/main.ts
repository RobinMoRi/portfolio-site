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
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPython,
  faJs,
  faReact,
  faVuejs,
  faGitAlt,
  faDocker,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faBrain,
  faChartSimple,
  faChessKnight,
  faCircleNodes,
  faCode,
  faDatabase,
  faPeopleGroup,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { faComments, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import ClickOutside from "./directives/ClickOutsideDirective";

// TODO: FIX GLOBALSTATE... with functions etc... chatSession should be on mount and setup with a discords websocket...
const globalState = reactive({
  appbar: { height: 0, width: 0 },
  window: { height: 0, width: 0 },
  scroll: { scrollPositionPercentage: 0, scrollY: 0 },
  chatSession: { sessionId: "", name: "", title: "" },
});
const app = createApp(App);
library.add(
  faPython,
  faJs,
  faReact,
  faVuejs,
  faCode,
  faGitAlt,
  faDatabase,
  faDocker,
  faScrewdriverWrench,
  faChartSimple,
  faNodeJs,
  faChartSimple,
  faCircleNodes,
  faPeopleGroup,
  faBrain,
  faBook,
  faComments,
  faChessKnight,
  faFaceSmile
);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);
app.directive("click-outside", ClickOutside);
app.provide("globalState", globalState);
app.mount("#app");
