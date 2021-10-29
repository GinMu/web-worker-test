import { createApp } from 'vue'
import App from './App.vue'
import Worker from "worker-loader!./period-fetch-balance.worker";

createApp(App).mount('#app')

let time = 1;

const worker = new Worker();

worker.postMessage({
    method: "fetchBalance",
    address: "jsk45ksJZUB7durZrLt5e86Eu2gtiXNRN4"
});

worker.onmessage= (e) => {
    console.log("fetch time ", time, ": ", e.data);
    time++;
}


setTimeout(() => {
    worker.postMessage({
        method: "stopFetch"
    })
}, 60000);