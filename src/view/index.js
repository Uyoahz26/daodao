import Vue from 'vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import http from "./axios/http"
import App from './App.vue'
var eventHub = new Vue()

const options = {
  // You can set your default options here
  position: "top-right",
  timeout: 3524,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.1,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__slideBlurred",
  maxToasts: 7,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  }
};
const render = (data = {}, marked) => {
  Vue.prototype.$marked = marked
  Vue.prototype.$speakData = data
  Vue.prototype.$http = http;
  Vue.prototype.$eventHub = eventHub;
  Vue.use(Toast, options);
  return new Vue({
    render: (h) => h(App)
  }).$mount(data.el || '#ispeak')
}

export { render }
