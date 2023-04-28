## Paddle Recurring Payments Starter for Saas

This project is a starter for a Saas application that uses Paddle for recurring payments. Please visit [https://paddle.com](https://paddle.com) for more information about Paddle.

Live application: [https://readingmore.dev/](https://readingmore.dev/)


## Getting Started

Install dependencies:

```bash
yarn
```

Create a `.env` file (you can copy from `.evn.example`) and add Paddle vendor ID, Paddle public key and other environment variables:

```bash
PADDLE_URL=https://sandbox-vendors.paddle.com/api/2.0
PADDLE_VENDOR_ID=
PADDLE_VENDOR_AUTH_CODE=
```

* Note that if you are using the sandbox, you will need to use the sandbox vendor ID and public key. `PADDLE_URL` in production should be `https://vendors.paddle.com/api/2.0`

Start the application:

```bash
yarn run dev
```

## Webhooks

Paddle will send webhooks to your application when a subscription is created, updated, cancelled, etc. In this project we set the webhook URL to `http:localhost:4000/v1/paddle/webhook`.

However, Paddle will not send webhooks to `localhost`. To test webhooks, you can use [Localtunnel](https://theboroer.github.io/localtunnel-www/).

```bash
npm install -g localtunnel

lt --port 4000
```

## Limitations

This project is a starter for a Saas application using Paddle for recurring payments. However, it does not include all features that a Saas application may need.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

