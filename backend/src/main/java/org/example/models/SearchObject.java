package org.example.models;

import java.math.BigDecimal;
//import java.sql.Blob;
import java.util.Date;

public class SearchObject {

    private Date searchStart;
    private Date searchEnd;
    private Float searchRadius;
    public Coords searchLocation;

    /*
    public SearchObject(int id, java.sql.Date searchStart, java.sql.Date searchEnd, float radius, Blob searchLocation) {
    }
     */

    public Date getSearchStart() {
        return searchStart;
    }

    public void setSearchStart(Date searchStart) {
        this.searchStart = searchStart;
    }

    public Date getSearchEnd() {
        return searchEnd;
    }

    public void setSearchEnd(Date searchEnd) {
        this.searchEnd = searchEnd;
    }

    public Float getSearchRadius() {
        return searchRadius;
    }

    public void setSearchRadius(Float searchRadius) {
        this.searchRadius = searchRadius;
    }

    public Coords getSearchLocation() {
        return searchLocation;
    }

    public BigDecimal getLat(){return searchLocation.getLat();}

    public BigDecimal getLon(){return searchLocation.getLon();}

    public void setSearchLocation(Coords searchLocation) {
        this.searchLocation = searchLocation;
    }
}
