package org.example.models;

import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.Date;

public class SearchObject {

    private Blob searchLocation;

    private BigDecimal searchRadius;

    private Date searchStart;

    private Date searchEnd;

    public SearchObject(Date searchStart, Date searchEnd, float radius, Blob searchLocation) {
    }

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

    public BigDecimal getSearchRadius() {
        return searchRadius;
    }

    public void setSearchRadius(BigDecimal searchRadius) {
        this.searchRadius = searchRadius;
    }

    private Date searchStartDate;

    private Date searchEndDate;

    public SearchObject(Blob searchLocation, Date searchStartDate, Date searchEndDate) {
        this.searchLocation = searchLocation;
        this.searchStartDate = searchStartDate;
        this.searchEndDate = searchEndDate;
    }

    public Blob getSearchLocation() {
        return searchLocation;
    }

    public void setSearchLocation(Blob searchLocation) {
        this.searchLocation = searchLocation;
    }

    public Date getSearchStartDate() {
        return searchStartDate;
    }

    public void setSearchStartDate(Date searchStartDate) {
        this.searchStartDate = searchStartDate;
    }

    public Date getSearchEndDate() {
        return searchEndDate;
    }

    public void setSearchEndDate(Date searchEndDate) {
        this.searchEndDate = searchEndDate;
    }
}
