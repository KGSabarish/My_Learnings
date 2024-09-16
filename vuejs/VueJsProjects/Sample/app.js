import { createApp, ref } from 'vue';

const app = createApp({
  setup() {
    const count = ref(0);
    return { count };
  }
});

app.mount('#app');
