import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/index.less';
import '@/assets/styles/reset.css';
import 'amfe-flexible';
import '@/assets/styles/vant-theme.less'; // 导入自定义的 Vant 主题文件
// setTimeout(() => {
// 	document.documentElement.style.setProperty('--van-primary-color', 'green');
// }, 1000);
createApp(App).mount('#app');
