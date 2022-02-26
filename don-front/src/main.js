import Antd from "ant-design-vue";
import Vue from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;

Vue.use(Antd);
// Vue.use(Antd.Button);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
