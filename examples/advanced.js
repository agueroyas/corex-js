import CoreX from "../src/index.js";

const corex = new CoreX({
    apiKey: process.env.COREX_API_KEY,
    timeout: 30000
});

try {
    const result = await corex.chat.create({
        message: "مرحبا بك، من أنت؟",
        assistant: "assistant"
    });

    console.log("Status:", result.status);
    console.log("Model:", result.model);
    console.log("Remaining:", result.requests_remaining);
    console.log("Response:", result.response);
} catch (error) {
    console.error(error.name);
    console.error(error.message);
}
