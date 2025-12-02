# Welcome to VerificationKit!

Integrate VerificationKit SDK seamlessly in any type of web application to provide user verification and validation with easy communication with your in-house app!

# How can I test it ?

The demonstration package contains two folders - one with the VerificationKit SDK and other with a demonstrator dummy application that will consume our SDK.

Inside the `user-verify-sdk`

1. `yarn install`
2. `yarn build` to prepare the dist folder to be used in the demo app
3. `yarn dev` to test the SDK in isolation on a local server
4. `yarn link`

Inside the `drone-rental-app` 

5. `yarn install` 
6. `yarn link user-verify-sdk` 
7. `yarn dev` to start the demo app which consumes the SDK

# How it works

VerificationKit exposes UI components built in Web Components and helpers written in pure Typescript to seamlessly integrate in any type of web app written in any type of framework or library!

## Is that possible?

Oh **YES** it is!

1. Install the verificationKit npm package
2. Find a view in your code where you'd like to display the flow for user verification, import and place the `<user-verify />` component
3. Import the `addVerificationMessageListener` and pass a callback to it so you can listen for verification results
4. That's it!

## Can I customize it?

Again it's a **YES**, fully! Our component exposes a number of prop-based APIs to customize it through a theme or pick individual components to add custom styles.

## Why this architecture?

Because we want to provide a seamless batteries-included solution.

- Web components encapsulate their code, styles and execution inside the Shadow DOM thus minimizing interference with any of the apps the SDK's integrating with.
- Custom events used for messaging are a standardized, widely available and native browser API
