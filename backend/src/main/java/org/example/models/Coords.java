package org.example.models;

import java.math.BigDecimal;

public class Coords {
    private BigDecimal lat;
    private BigDecimal lon;
    public Coords(BigDecimal lat, BigDecimal lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public Coords(String latLong){
        String[] parts = latLong.split(",\\s*");
        int len = parts.length;
        String test1 = parts[0];
        String test2 = parts[1];
        Double test3;
        test3 = Double.parseDouble(parts[1]);
        BigDecimal test4;
        test4 = BigDecimal.valueOf(test3);
        this.lat = new BigDecimal(Double.valueOf(parts[0]));
        this.lon = test4;


    }
    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public BigDecimal getLon() {
        return lon;
    }

    public void setLon(BigDecimal lon) {
        this.lon = lon;
    }
}
