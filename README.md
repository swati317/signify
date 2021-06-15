# signify
signify assignment

go to terminal and npm install
npm start - should show the message - "Your server is running on port 4000"

to add a review - send a post request to http://localhost:4000/reviews with data example - 
{
  "review": "excellent",
  "author": "swati",
  "review_source": "iTunes",
  "rating": "5",
  "title": "good"
}

to get all reviews - send a get request to http://localhost:4000/reviews
reviews can be filtered as by rating such as http://localhost:4000/reviews?rating=3
or by store like http://localhost:4000/reviews?review_source=GooglePlayStore
or a combination as http://localhost:4000/reviews?rating=3&review_source=iTunes

to get total ratings http://localhost:4000/reviews/totalRating

to get average monthly rating http://localhost:4000/reviews/avgMonthlyRating

to run the tests, open a new terminal and run npm test
