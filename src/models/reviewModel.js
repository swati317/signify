class Review {
    constructor(obj) {
        this.review = obj.review;
        this.author = obj.author;
        this.review_source = obj.review_source;
        this.rating = obj.rating;
        this.title = obj.title;
        this.product_name = "Amazon Alexa";
        this.reviewed_date = new Date().toISOString();
    }
}

module.exports.Review = Review;