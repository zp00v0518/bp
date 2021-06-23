// import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import AppComponent from './App.vue';
// import './components/atoms';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import config from '../config';
import Api from './api';
import 'element-plus/lib/theme-chalk/index.css';
import componentsList from './components/componentsList';
import { ElMessage, ElLoading } from 'element-plus';

const WS = new Api();
// eslint-disable-next-line
WS.init(`ws://${location.hostname}:${config.server.port.ws}`, store);

const app = createApp(AppComponent);
componentsList.forEach((component) => {
  app.component(component.name, component);
});

app.use(store);
app.use(router);

// app.use(ElementPlus);
app.mixin({
  data() {
    return {
      $api: WS,
      $appConfig: config,
      $message: ElMessage,
      $loading: ElLoading
    };
  }
});
app.mount('#app');
