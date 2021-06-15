const fs = require('fs');
const { Review } = require('../models/reviewModel');

const file = __dirname + "/../data/alexa.json";
let reviews = [];

const addNewReview = (req, res) => {
    let review = new Review(req.body);
    let content = "\n" + JSON.stringify(review);
    fs.appendFileSync(file, content, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(review);
        }
    });
}

const getReviews = (req, res) => {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            res.send(err);
        }
        const filters = req.query;
        const mapped = data.split('\n').map(val => JSON.parse(val));
        const filteredReviews = mapped.filter(review => {
            let isValid = true;
            for (let key in filters) {
                isValid = isValid && review[key] == filters[key];
            }
            return isValid;
        });
        res.send(filteredReviews);
    });
}

const getAvgMonthlyRating = (req, res) => {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            res.send(err);
        }
        reviews = data.split('\n').map(val => JSON.parse(val));
        let appleStore = {
            'name': 'iTunes',
            'ratings': 0,
            'count': 0
        };
        let googleStore = {
            'name': 'GooglePlayStore',
            'ratings': 0,
            'count': 0
        };
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].review_source === appleStore.name) {
                appleStore.ratings += reviews[i].rating;
                appleStore.count++;
            } else if (reviews[i].review_source === googleStore.name) {
                googleStore.ratings += reviews[i].rating;
                googleStore.count++;
            }
        }

        let resultObj = {
            'iTunes': appleStore.ratings / appleStore.count,
            'GooglePlayStore': googleStore.ratings / googleStore.count
        };
        res.send(resultObj);
    });
}

const getTotalRatings = (req, res) => {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            res.send(err);
        }
        reviews = data.split('\n').map(val => JSON.parse(val));
        let ratings = new Array(6).fill(0);
        for (let i = 0; i < reviews.length; i++) {
            ratings[reviews[i].rating]++;
        }

        let resultObj = {};
        for (let i = 1; i < ratings.length; i++) {
            resultObj[i] = ratings[i];
        }

        res.send(resultObj);
    });
}

module.exports.addNewReview = addNewReview;
module.exports.getReviews = getReviews;
module.exports.getAvgMonthlyRating = getAvgMonthlyRating;
module.exports.getTotalRatings = getTotalRatings;