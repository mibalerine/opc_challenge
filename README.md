# Oneplanetcrowd Challenge
Endpoint implementation to retrieve HackerNews' top 10 most occurring words in the stories of the day of exactly one week ago (today minus 7 days).

## Running Locally
### Dependencies
#### Environment
- NodeJS >= v14
#### App Dependencies
- Typescript
- Express
- Jest
- Axios

To start the project, run:

```
npm start
```

To call the API, run:
```sh
curl 'http://localhost:3000/api/hackernews/storiesoftheday/top10words' \
  -H 'Accept: application/json' \
  --compressed
```

## Testing
To test the project once, run:

```
npm test
```

To run the test while saving changes, run:

```
npm test:watch
```

## Project Structure
- `src` folder for all controllers.
- The app startup `index.ts` is inside the `src` folder, at the same level as the controllers folder.
- Inside the controllers folder: unique folder for each context (HackerNews, for example), containing the respective controller(s) - in this case we have only the HackerNews project.
- Test files have `.test` suffix and are placed inside the context's folder, at the save level as the testable controller, sharing the same name (topwords).
- `build` folder contains the compiled javascript code and is located at the same level as the `src` folder

## Improvements
- Additional testing for full code coverage
- Integration test
- Integrate prettier/eslint to verify code standards