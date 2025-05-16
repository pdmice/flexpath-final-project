package org.example.models;

import java.util.Date;

public class SearchObject {

    private Date searchStart;
    private Date searchEnd;
    private Float searchRadius;
    private Coords searchLocation;

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

    public void setSearchLocation(Coords searchLocation) {
        this.searchLocation = searchLocation;
    }
}
