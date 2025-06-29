# Some build notes to replicate:

## Add back application.properties

This file was removed from my github to avoid publishing MySql password

## Add .env

The search by location function uses a geocoding API from geocode.maps.co to get GPS coordinates for a given zip code, and requires a free API key
You will need to add frontend/.env with the api key provided in the submission notes in the form of:

```
VITE_API_KEY=RANDOM_KEY_STRING
```

## Possibly modify create-database.sql

GPS coordinates are saved as a POINT data type in the database. It seems that whether the ordering is LAT,LON or
LON,LAT is implementation dependent. I've had to change it from laptop to desktop. The final statement 
in the create-database.sql file is:

```
UPDATE sings
SET location = ST_PointFromText(
    CONCAT(
        'POINT(',
        ST_Y(location), ' ',  -- Use current latitude as longitude
        ST_X(location),       -- Use current longitude as latitude
        ')'
    )
);

```

This will reverse the ordering of the coordinates. If you get sql errors like "Data out of bounds. Must be less than 90" in the idea console it's because 
sql is expecting the opposite ordering and is treating latitude as longitude and vice versa. Removing (or adding) this last statement should fix the  problem. 

## Test users:

There are a couple test users in the DB. You can login with the provided admin or user accounts. There are also accounts with username:password - joedod:joedod and janedoe:janedoe
to use in searches etc that have some events populated. 


## Ensure dev server is on the correct port

I had to add a proxy in vite.config.js in order to get around CORS protection as I could not figure out how to add @Crossorigin annotation 
for /auth/login like is done in the other controllers. Unfortunately this is error prone and very easy to overlook  when 5173 is in use and vite 
automatically moves to 5174 or similar. I would be interested in how to  properly set crossorigin policy for /aut/login as well as how to set the 
HMAC secret to properly secure this JWT implementation.


## npm install jest-environmentjsdom

I had to install @testing-library/jest-dom and jest-environmentjsdom to get tests working as it is no longer shipped with jest.

