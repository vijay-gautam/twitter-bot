const dotenv = require('dotenv')
const Twitter = require('twitter')



dotenv.config({ path : './config.env'});

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const getMentions = () => { 
    return new Promise((resolve,reject) => {
    twitterClient.get('statuses/mentions_timeline',{ count : 2})
    .then((tweets) => {
        resolve(tweets);
    }).catch((error) => {
        reject(error);
    })
});
};



const get_tweet_data = (tweets) => {
    console.log("here2");
    let data = [];
    tweets.map((tweet_data) =>{
    let obj = { 
        in_reply_to_status_id : tweet_data.id_str , 
        screen_name : tweet_data.user.screen_name 
    }
    data.push(obj);
    });
    return data;
}


const postReply = (data) => {

    data.map((tweet_data) => {
        
        let message= "Aise kaise";

        let statusObj = {
            status: message,
            in_reply_to_status_id: tweet_data.in_reply_to_status_id,
            auto_populate_reply_metadata: true
        }


        twitterClient.post('statuses/update', statusObj, (error, tweetReply, response) => {

            //if we get an error print it out
            if (error) {
                console.log(error);
            }
    
            //print the text of the tweet we sent out
            console.log(tweetReply.text);
        });


    })


}




getMentions()
.then((tweets)=> { 
let data = get_tweet_data(tweets);
console.log(data);
postReply(data);
})
.catch((error) => console.error(error));


