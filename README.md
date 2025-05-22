# Some build notes to replicate:

## Add back application.properties

This file was removed from my github to avoid publishing MySql password

## Add .env

The search by location function uses a geocoding API from geocode.maps.co to get GPS coordinates for a given zip code, and requires an API key
You will need to add frontend/.env with the api key provided in the submission notes in the form of:

```
API_KEY=RANDOM_KEY_STRING
```

## Possibly modify create-database.sql

GPS coordinates are saved as a POINT data type in the database. It seems that the ordering of LAT,LON or
LON,LAT is implementation dependent. I've had to change to ordering from laptop to desktop. The final statement 
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

This will reverse the ordering of the coordinates. If you get errors like "Data out of bounds. Must be less than 90" it's because 
sql is expecting the opposite ordering and is treating latitude as longitude and vice versa. Removing this last statement should fix the problem. 

