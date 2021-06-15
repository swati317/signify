var Request = require("request");

describe("Server", () => {
    describe("GET /reviews?rating=3", () => {
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
            let filteredReviews=data.body.filter(function(review){
                return review.rating != '3';
            })
            expect(filteredReviews.length).toBe(0);
        });
    });
    describe("GET /reviews/avgMonthlyRating", () => {
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
    describe("GET /reviews/getTotalRating", () => {
        var data = {};
        beforeEach((done) => {
            Request.get("http://localhost:4000/reviews/getTotalRating", (error, response, body) => {
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
});