package org.example.models;

import java.sql.Blob;
import java.sql.Date;

public class SearchObject {

    private Blob searchLocation;

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
