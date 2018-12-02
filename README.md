# MIT Smart Confessions Website

[MIT confessions](https://www.facebook.com/beaverconfessions) is a Facebook page where MIT students posts anonymously and get reactions from other MIT students. These posts are called "confessions". 

MIT Smart Confessions is a platform that uses machine learning to predict the number of reactions one would get from their confession and to generate confessions in such a way that it maximizes the number of reactions that confession would get.

The website for this application can be found at [mit-smart-confessions.herokuapp.com](https://mit-smart-confessions.herokuapp.com), and this is the Github repository for the website. In addition to this, we have another [Github repository](https://github.com/robertvunabandi/mit-smart-confessions-data) that handles the API part of this application with API url [mit-smart-confessions-api.herokuapp.com](https://mit-smart-confessions-api.herokuapp.com).

[![MIT Smart Confession Logo](public/src/assets/msc-logo.png)](https://mit-smart-confessions.herokuapp.com)

## Details About the Website

This website is built using [`React`](https://reactjs.org/) and [`Webpack`](https://webpack.js.org/). On top of that, we use [`yarn`](https://yarnpkg.com/en/) as our package manager. 

There are two servers always running at the same time: one for the website (using this codebase) and one for the API (see the repo mentioned above). This separation was ideal to maximize the progress of both platforms as they do very separate things. With that said, the API can be accessed via two endpoints: 

- `/predict`: This tries to predict how many of each of the Facebook reactions *(i.e.: `like`, `love`, `haha`, `wow`, `sad`, `angry`)* this confession will get. This takes one parameter:
  - `text`: a string representing a confession for which we want to predict the reaction of.  
    
  This returns a dictionary mapping each confession type (e.g. `like`) to a list of `buckets`. Each `bucket` is a list of 3 things that looks like `[min_value, max_value, probability]`. So, the buckets are ranges of reaction count that this confession will get for that confession type. The `/predict` endpoint tries to classify which bucket this confession will fall in for this specific confession. See below for why we chose to use this somewhat weird format for predictions.
- `/generate`: This generates a confession that will ideally to get a lot of reactions on the MIT Confessions page. This takes two parameters:
  - `seed`: A seed text representing the start of the confession
  - `length`: How many additional words to add to this confession that will start with the `seed` text.   
    
  This returns a string that represents the final confession. This string was generated using a Long-Short-Term Memory (LSTM) recurrent neural network.
  
The API url is `https://mit-smart-confessions-api.herokuapp.com`. 

## Running The Website

### Installations

Here, we assume you are using a Mac computer. This has not been tested on any other OS. 

First, install the necessary components first:

- [`Node.js`](https://nodejs.org/en/)
- [`yarn`](https://yarnpkg.com/en/docs/install#mac-stable)

You can install `yarn` with [`brew`](https://brew.sh/) (which will also install `Node.js` for you) by running the following on your terminal: 

```bash
brew install yarn
```

Make sure you update `node` to version `~11.2.0` and `yarn` to version `~1.12.3` (read more about [semantic versioning](https://docs.npmjs.com/about-semantic-versioning)). 

### Running the Code

Within the root directory, run:

```bash
yarn && yarn build && yarn run-server
```

- `yarn` runs `yarn install` which installs all the dependencies defined in `package.json`
- `yarn build` runs the `build` script defined in `package.json`, which builds the `/public/src` directory into `/public/dist` using `webpack` by running `npx webpack`.
- `yarn run-server` runs the server locally at `localhost:3000/`

There are other convenience scripts defined inside of `package.json` (such as `yarn build-run`).

---

## Why Buckets for Predictions

The initial goal was to predict how many reactions a given confession will get. Predicting the exact number of reactions a given confession will get is a [regression](https://www.quora.com/What-is-regression-in-machine-learning) problem. In other words, we have our inputs as a `string` and our output as a continuous `number`. 

We started off writing a regression model that does exactly this, but we quickly ran into various problems. 
1. Our training loss and mean absolute error were both really low on the training data and high on the validation data. In other words, the data was very easy to overfit. (You can read more about machine learning metrics [here](https://machinelearningmastery.com/metrics-evaluate-machine-learning-algorithms-python/)).
2. Predicting an exact number is hard to match in real life. In addition, most of the prediction after training were way off.
3. We didn't have enough data. With only 4,555 example points, it's hard to train an accurate regression model on complex data (text data is extremely complex in that aspect). 

Given these problems, we ran a binary classification model. I.e., given a confession, predict whether the confession will get more than 20 likes. This model was extremely good (over 90% accuracy on the validation set). At the same time, it was extremely boring. What we really want to know is how many reactions we'd get and not whether we'd get more than 20 reactions. 

Bucket classification was the next logical move. Using `like` as an example, what we'd do is split the number of likes into bucket ranges. I.e., from `0-10`, `11-20`, etc. Then, we try to predict which bucket the confession will fall into. We had high accuracy with this model on the validation set. While this is not as cool as figuring out the exact number of reactions, it's close to it and is performing quite well. What actually made this work well is that we actually split the data into equal buckets (which is why you'll see that the buckets ranges are somewhat random). 