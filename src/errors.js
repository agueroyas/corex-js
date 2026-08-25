export class CoreXError extends Error {
    constructor(message, options = {}) {
        super(message);
        this.name = "CoreXError";
        this.status = options.status ?? null;
        this.url = options.url ?? null;
        this.code = options.code ?? null;
        this.cause = options.cause;
    }
}

export class CoreXAuthenticationError extends CoreXError {
    constructor(message = "Invalid or missing CoreX API key.", options = {}) {
        super(message, options);
        this.name = "CoreXAuthenticationError";
        this.code = options.code ?? "AUTHENTICATION_ERROR";
    }
}

export class CoreXValidationError extends CoreXError {
    constructor(message, options = {}) {
        super(message, options);
        this.name = "CoreXValidationError";
        this.code = options.code ?? "VALIDATION_ERROR";
    }
}

export class CoreXRequestError extends CoreXError {
    constructor(message, options = {}) {
        super(message, options);
        this.name = "CoreXRequestError";
        this.code = options.code ?? "REQUEST_ERROR";
    }
}

export class CoreXTimeoutError extends CoreXRequestError {
    constructor(message, options = {}) {
        super(message, options);
        this.name = "CoreXTimeoutError";
        this.code = "TIMEOUT";
    }
}
