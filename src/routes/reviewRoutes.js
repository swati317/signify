import {
    addNewReview,
    getReviews,
    getAvgMonthlyRating,
    getTotalRatings
} from '../controllers/reviewController';


const routes = (app) => {
    app.route('/reviews')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request from: ${req.method}`)
            next();
        }, getReviews)
        .post(addNewReview);

    app.route('/reviews/avgMonthlyRating')
        .get(getAvgMonthlyRating);

    app.route('/reviews/getTotalRating')
        .get(getTotalRatings);
}

export default routes;
