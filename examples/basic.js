import CoreX from "../src/index.js";

const corex = new CoreX({
    apiKey: process.env.COREX_API_KEY
});

const result = await corex.chat.create("Hello from CoreX SDK");

console.log(result);
