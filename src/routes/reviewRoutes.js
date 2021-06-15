const {
    addNewReview,
    getReviews,
    getAvgMonthlyRating,
    getTotalRatings
} = require('../controllers/reviewController');


const routes = (app) => {
    app.route('/reviews')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request from: ${req.method}`)
            next();
        }, getReviews)
        .post((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request from: ${req.method}`)
            next();
        }, addNewReview);

    app.route('/reviews/avgMonthlyRating')
        .get(getAvgMonthlyRating);

    app.route('/reviews/totalRating')
        .get(getTotalRatings);
}

module.exports = routes;
