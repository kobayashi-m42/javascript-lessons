const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/**
 * アカウント情報を取得する
 */
client.get('account/verify_credentials', {}).then(content => {
  console.log(content);
});

/**
 * タイムラインのツイートを取得する
 */
client.get('statuses/home_timeline', { count: 3 }).then(tweet => {
  console.log(tweet);
});

/**
 * ツイートする
 */
const tweetText = 'Tweet from Node.js';
client
  .post('statuses/update', { status: tweetText })
  .then(tweet => {
    console.log(tweet);
  })
  .catch(error => {
    console.log(error);
  });
