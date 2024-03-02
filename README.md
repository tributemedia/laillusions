This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on AWS Amplify

If you haven't already, install and configure the latest version of the Amplify CLI:

```bash
npm install -g @aws-amplify/cli
```

### Deploy and host an SSG only app

You can deploy static (SSG) apps with manual deployments or with Git-based continuous deployments. This example demonstrates how to manually deploy an SSG app.

Deploy the app with the Amplify publish command:

```bash
amplify publish
```

```text
✔ Successfully pulled backend environment dev from the cloud.

    Current Environment: dev
    
┌──────────┬────────────────┬───────────┬───────────────────┐
│ Category │ Resource name  │ Operation │ Provider plugin   │
├──────────┼────────────────┼───────────┼───────────────────┤
│ Hosting  │ amplifyhosting │ No Change │ awscloudformation │
└──────────┴────────────────┴───────────┴───────────────────┘

No changes detected

? Do you still want to publish the frontend? Yes
```

Congratulations, your app has now been successfully deployed! The URL for the app should be displayed in your terminal.
```text
✨  Done in 15.93s.
✔ Zipping artifacts completed.
✔ Deployment complete!
https://dev.d2rjmuvgomwntg.amplifyapp.com

```
To see your app in the Amplify console at any time, run the following command:
```bash
amplify console
```