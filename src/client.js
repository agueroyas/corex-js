import {
    CoreXError,
    CoreXAuthenticationError,
    CoreXRequestError,
    CoreXTimeoutError
} from "./errors.js";

import { ChatResource } from "./resources/chat.js";

const DEFAULT_BASE_URL = "https://corex-one.eu.cc/api";

export class CoreXClient {
    constructor(options = {}) {
        if (typeof options === "string") options = { apiKey: options };

        const {
            apiKey,
            baseURL = DEFAULT_BASE_URL,
            timeout = 30000,
            fetch: customFetch
        } = options;

        if (!apiKey || typeof apiKey !== "string") {
            throw new CoreXAuthenticationError();
        }

        if (!baseURL || typeof baseURL !== "string") {
            throw new CoreXError("baseURL must be a valid URL.");
        }

        if (!Number.isFinite(timeout) || timeout <= 0) {
            throw new CoreXError("timeout must be a positive number.");
        }

        this.apiKey = apiKey;
        this.baseURL = baseURL.replace(/\/$/, "");
        this.timeout = timeout;
        this.fetch = customFetch || globalThis.fetch;

        if (typeof this.fetch !== "function") {
            throw new CoreXError(
                "Fetch API is unavailable. Use Node.js 18+ or provide a custom fetch implementation."
            );
        }

        this.chat = new ChatResource(this);
    }

    async request(path = "", options = {}) {
        const {
            method = "GET",
            query = {},
            headers = {},
            body
        } = options;

        const url = new URL(path.replace(/^\//, ""), `${this.baseURL}/`);

        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        }

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await this.fetch(url.toString(), {
                method,
                headers: {
                    Accept: "application/json, text/plain, */*",
                    ...headers
                },
                body,
                signal: controller.signal
            });

            const text = await response.text();

            if (response.status === 401 || response.status === 403) {
                throw new CoreXAuthenticationError(
                    text || "The CoreX API rejected the API key.",
                    { status: response.status, url: url.toString() }
                );
            }

            if (!response.ok) {
                throw new CoreXRequestError(
                    text || `CoreX API returned HTTP ${response.status}.`,
                    { status: response.status, url: url.toString() }
                );
            }

            return this.parseResponse(text);
        } catch (error) {
            if (error instanceof CoreXError) throw error;

            if (error?.name === "AbortError") {
                throw new CoreXTimeoutError(
                    `Request timed out after ${this.timeout}ms.`,
                    { url: url.toString(), cause: error }
                );
            }

            throw new CoreXRequestError(
                error?.message || "Failed to connect to the CoreX API.",
                { url: url.toString(), cause: error }
            );
        } finally {
            clearTimeout(timer);
        }
    }

    parseResponse(text) {
        const trimmed = text.trim();
        if (!trimmed) return "";

        try {
            return JSON.parse(trimmed);
        } catch {
            return text;
        }
    }
}

export default CoreXClient;
