# Customer REST-API endpoints

As a customer I want be able to:

## Customer methods

- Retrieve a list of all movies available
    - **GET /movies/**
- Retrieve details for a movie
    - **GET /movies/details/movie_id**
- Retrieve reviews and ratings for a movie
    - **GET /movies/reviews/:movie_id**
- Retrieve the schedule for a movie
    - **GET /movies/schedules/:movie_id**
- Check which seats are available for a schedule
    - **GET /movies/schedules/seats/:schedule_id**
- Get all seats of a given theatre
    - **GET /theatres/seats/:theatre_id**
- Buy a ticket for a movie
    - **POST /tickets/**
- Delete a ticket for a movie
    - **DELETE /tickets/:ticket_id**
- Return tickets by a given user
    - **GET /tickets/:username**
- Rate and review a movie
    - **POST /movies/reviews/**


## Helper methods

- Get the number of times a user watched a movie
   - TODO
- Get the number of times a user reviewed a movie
    - TODO
- Get the number of times a user is listed as a customer (potentially dangerous for security)
    - TODO
