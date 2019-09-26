# Contributing to DevTo ReactNative

## Ways to Contribute

- **Opening an issue.** Most likely it will be a bug you found in the app, a performance improvement or anything that can be relevant for the app to work better.

- **Reviewing an issue or a pull request.** If you believe an issue needs discussion or you have the knowledege to help reviewing a pull request. All that is very welcome.

- **Sending a pull request:** See in the secion below.

- **Enjoy the app:** Lets make this app great :)

## Sending a pull request

- If you send a PR related to an issue that is not assigned, you can comment on the issue that you would like to work on it.

- If you want to send a PR for a feature that is not currently implemented. It needs to be discussed and we cannot guarantee that everything will be implemented. Therefore, preparing a detailed RFC (request for changes) as an issue is a good idea.

## Our Development Process

1. Fork the repo and create your branch from `master`

2. Run `yarn` and `cd ios && pod install`

3. Create a secrets.ts file in the root of the project. You can just add in there: export const DEV_API_KEY = 'YOUR API KEY FROM DEV.TO'

4. Prefer small pull requests focused on one change

5. Verify that yarn lint passes

6. Write types if necessary and check that yarn flow passes

7. Write tests relevant to your changes and check that yarn test passes