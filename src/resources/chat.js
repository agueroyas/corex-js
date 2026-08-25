import { CoreXValidationError } from "../errors.js";

export class ChatResource {
    constructor(client) {
        this.client = client;
    }

    async create(input) {
        const normalized =
            typeof input === "string" ? { message: input } : (input || {});

        const { message, assistant = "assistant", ...extra } = normalized;

        if (typeof message !== "string" || message.trim() === "") {
            throw new CoreXValidationError(
                "message must be a non-empty string."
            );
        }

        if (typeof assistant !== "string" || assistant.trim() === "") {
            throw new CoreXValidationError(
                "assistant must be a non-empty string."
            );
        }

        return this.client.request("", {
            method: "GET",
            query: {
                a: message,
                act: assistant,
                key: this.client.apiKey,
                ...extra
            }
        });
    }
}
