# Movie Review Platform

Web application for demonstrating a movie review site created by Adnan.

# Overview

This app lets users browse movies and view information about about the title. Users can read reviews by others users. If the user creates and account, they can post a review on the site.

# Environment Variables

The following environemnt variables are needed for the application to run

> Feel free to use the sample values if you haven't received the .env file

Backend `(./backend/.env)`

```sh
MONGO_HOST=mongo_db
MONGO_PORT=27017
DB=movies_db

JWT_SECRET=J4HaxxN62BKPUCi2vW92zcA1jjsrOcGZ
JWT_EXPIRY=1d

ALLOWED_HOSTS=http://localhost:4000
```

Frontend `(./frontend/.env)`

```sh
VITE_SERVER_URL='https://localhost:4040/api/v1'
```

## Running the app

> [!WARNING]
> Ensure env variables are set before running the app

To run the app using docker

```sh
$ docker compose up --build --detach
```

# Further Improvements

Below are further improvements that can be made

- Limit user review per movie to one
- Calculate average rating from all user ratings
- Validate password and confirm password are matching
