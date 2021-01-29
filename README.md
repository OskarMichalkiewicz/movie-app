# movie-app
#### 1. This app needs mongodb installed locally,
#### 2. you need to create .env file with a variable:
   * **SECRET_KEY**=some_random_string,
#### 3. run npm install to install all dependencies from package.json
#### 4. to run both api and react server use "npm run dev"

## API endpoints
### Movies:
    GET     /movies               - gets all movies
    GET     /movies/:movieId      - gets one movie found by given id
    GET     /movies/search/:value - gets movies based on title (:value)
    POST    /movies               - posts a movie to db
             Body: {
                    title:   String,
                    summary: String,
                    genre:   String,
                    imgUrl:  String
                  }
    PATCH   /movies/:movieId      - updates any value from POST body of a movie with given id
    DELETE  /movies/:movieId      - deletes any movie by given id
### Ratings:
    GET     /ratings               - gets all ratings
    GET     /ratings/:movieId      - gets one ratings of one movie found by given id
    GET     /ratings/:ratingId     - gets one rating by given id
    POST    /ratings               - posts a rating to db
             Body: {
                    movieId: objectId,
                    score:   Number
                  }
    DELETE  /ratings/:ratingId      - deletes any rating by given id
### Users:
    POST    /user/signup               - signs up a user
             Body: {
                    username: String,
                    password: String
                  }
    POST    /user/login               - logs in a user
             Body: {
                    username: String,
                    password: String
                  }
    DELETE  /user/:userId      - deletes any user by given id
