# CoreX AI JavaScript SDK

Official JavaScript SDK for the CoreX AI API.

## Installation

```bash
npm install @corex-ai/sdk
```

## Quick Start

```js
import CoreX from "@corex-ai/sdk";

const corex = new CoreX({
    apiKey: "YOUR_COREX_API_KEY"
});

const result = await corex.chat.create("Hello");

console.log(result.response);
```

You can also initialize it with:

```js
const corex = new CoreX("YOUR_COREX_API_KEY");
```

## Chat

Simple:

```js
const result = await corex.chat.create("Hello");
```

Advanced:

```js
const result = await corex.chat.create({
    message: "مرحبا بك، من أنت؟",
    assistant: "assistant"
});
```

The response is returned from the CoreX API:

```json
{
  "status": "success",
  "model": "gpt5.1",
  "plan": "pro",
  "requests_remaining": 1493,
  "response": "..."
}
```

## Custom API URL

Default:

```text
https://corex-one.eu.cc/api
```

Override it:

```js
const corex = new CoreX({
    apiKey: "YOUR_COREX_API_KEY",
    baseURL: "https://example.com/api"
});
```

## Timeout

```js
const corex = new CoreX({
    apiKey: "YOUR_COREX_API_KEY",
    timeout: 60000
});
```

## Extra Parameters

Extra fields are forwarded to the API:

```js
const result = await corex.chat.create({
    message: "Hello",
    assistant: "assistant",
    model: "gpt5.1"
});
```

## Error Handling

```js
try {
    const result = await corex.chat.create("Hello");
} catch (error) {
    console.error(error.name);
    console.error(error.message);
}
```

Available errors:

- `CoreXError`
- `CoreXAuthenticationError`
- `CoreXValidationError`
- `CoreXRequestError`
- `CoreXTimeoutError`

## Environment Variables

Never commit API keys:

```env
COREX_API_KEY=your_api_key
```

Then:

```js
const corex = new CoreX({
    apiKey: process.env.COREX_API_KEY
});
```

## Browser Security

Do not expose secret API keys in frontend code. Use your own backend when the key needs to remain private.

## Node.js

Node.js 18+ is supported and the SDK uses native Fetch.

## Development

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/corex-js.git
cd corex-js
npm test
```

## Publishing to npm

```bash
npm login
npm pack --dry-run
npm publish --access public
```

Then:

```bash
npm install @corex-ai/sdk
```

For releases:

```bash
npm version patch
git push --follow-tags
```

## License

MIT
