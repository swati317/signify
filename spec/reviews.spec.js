var Request = require("request");

describe("Server", () => {
    describe("GET filters rating", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:4000/reviews?rating=3", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(response.body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            let filteredReviews = data.body.filter(function (review) {
                return review.rating != '3';
            })
            expect(filteredReviews.length).toBe(0);
        });
    });
    describe("GET filters review_source", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:4000/reviews?review_source=GooglePlayStore", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(response.body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            let filteredReviews = data.body.filter(function (review) {
                return review.review_source != 'GooglePlayStore';
            })
            expect(filteredReviews.length).toBe(0);
        });
    });
    describe("GET filters rating and review_source", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:4000/reviews?rating=3&review_source=iTunes", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(response.body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            let filteredReviews = data.body.filter(function (review) {
                return review.review_source != 'iTunes' || review.rating != '3';
            })
            expect(filteredReviews.length).toBe(0);
        });
    });
    describe("GET average monthly rating", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:4000/reviews/avgMonthlyRating", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(response.body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(Object.keys(data.body).length).toBe(2);
        });
    });
    describe("GET total rating", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:4000/reviews/totalRating", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(response.body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(Object.keys(data.body).length).toBe(5);
        });
    });
    describe("POST add reviews", () => {
        var data = {};
        beforeEach((done) => {
            Request.post({
                url: 'http://localhost:4000/reviews',
                form: {
                    "review": "excellent",
                    "author": "swati",
                    "review_source": "iTunes",
                    "rating": "5",
                    "title": "good"
                }
            }, function (err, response, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.product_name).toBe("Amazon Alexa");
        });
    });
});