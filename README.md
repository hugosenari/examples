# Laconia Examples

A repository containing small examples to illustrate the use of Laconia.

## Running tests

1. Set AWS credentials in ~/.aws/credentials
2. Install the deployment tools under tests in your environment, some of them are not managed by NPM: aws cli, sam cli, apex
3. Run the following command:

```
npx lerna exec -- npm run cloud-test
```

## Included Examples

- [serverless-vanilla](examples/serverless-vanilla) - Deploy serverless with and without laconia. This example also shows how to set up API Gateway routes and run them locally using the [serverless-offline](https://www.npmjs.com/package/serverless-offline) plugin. Finally, it shows how to match error types for less boilerplate code.
- [serverless-babel](examples/serverless-babel) - Deploy laconia in node 6 runtime
- [serverless-typescript](examples/serverless-typescript) - Use laconia in a TypeScript handler
- [serverless-websocket](examples/serverless-websocket) - Use laconia with a websocket event
- [apex](examples/apex) - Deploy laconia with apex
- [middy](examples/middy) - Integrate middy and laconia
- [sam](examples/middy) - Deploy laconia with sam
