import { createApp } from 'vue'
import App from './App.vue'
import lastfmservice from './services/lastfm-service'

const app = createApp(App);

app.config.globalProperties.$lastfmService = lastfmservice

app.mount('#app')
