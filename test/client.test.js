import test from "node:test";
import assert from "node:assert/strict";
import CoreX from "../src/index.js";

test("CoreX chat builds the correct API request", async () => {
    let requestedUrl = "";

    const client = new CoreX({
        apiKey: "TEST_KEY",
        fetch: async (url) => {
            requestedUrl = url;
            return new Response(JSON.stringify({
                status: "success",
                model: "gpt5.1",
                response: "Hello"
            }), { status: 200 });
        }
    });

    const result = await client.chat.create({
        message: "مرحبا بك",
        assistant: "assistant"
    });

    const url = new URL(requestedUrl);

    assert.equal(url.origin + url.pathname, "https://corex-one.eu.cc/api");
    assert.equal(url.searchParams.get("a"), "مرحبا بك");
    assert.equal(url.searchParams.get("act"), "assistant");
    assert.equal(url.searchParams.get("key"), "TEST_KEY");
    assert.equal(result.status, "success");
    assert.equal(result.model, "gpt5.1");
    assert.equal(result.response, "Hello");
});

test("CoreX accepts a string directly", async () => {
    const client = new CoreX({
        apiKey: "TEST_KEY",
        fetch: async () =>
            new Response(JSON.stringify({ response: "Hello" }), { status: 200 })
    });

    const result = await client.chat.create("Hello");
    assert.equal(result.response, "Hello");
});

test("CoreX rejects a missing API key", () => {
    assert.throws(() => new CoreX(), /Invalid or missing CoreX API key/);
});
