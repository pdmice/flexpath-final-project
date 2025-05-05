package org.example.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class Sing {

    private int id;

    private String name;

    private String owner_id;

    private LocalDate start_date;

    private LocalDate end_date;

    private String when_Description;

    private LocalTime start_time;

    private LocalTime end_time;

    private String primary_book;

    private String secondary_book;

    private String contact_email;

    private String notes;

    private BigDecimal latitude;

    private BigDecimal longitude;

    public Sing() {

    }

    public Sing(int id, String name, String owner_id, LocalDate start_date, LocalDate end_date, String when_Description, LocalTime start_time, LocalTime end_time, String primary_book, String secondary_book, String contact_email, String notes, BigDecimal latitude, BigDecimal longitude) {
        this.id = id;
        this.name = name;
        this.owner_id = owner_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.when_Description = when_Description;
        this.start_time = start_time;
        this.end_time = end_time;
        this.primary_book = primary_book;
        this.secondary_book = secondary_book;
        this.contact_email = contact_email;
        this.notes = notes;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(String owner_id) {
        this.owner_id = owner_id;
    }

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public LocalDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDate end_date) {
        this.end_date = end_date;
    }

    public String getWhen_Description() {
        return when_Description;
    }

    public void setWhen_Description(String when_Description) {
        this.when_Description = when_Description;
    }

    public LocalTime getStart_time() {
        return start_time;
    }

    public void setStart_time(LocalTime start_time) {
        this.start_time = start_time;
    }

    public LocalTime getEnd_time() {
        return end_time;
    }

    public void setEnd_time(LocalTime end_time) {
        this.end_time = end_time;
    }

    public String getPrimary_book() {
        return primary_book;
    }

    public void setPrimary_book(String primary_book) {
        this.primary_book = primary_book;
    }

    public String getSecondary_book() {
        return secondary_book;
    }

    public void setSecondary_book(String secondary_book) {
        this.secondary_book = secondary_book;
    }

    public String getContact_email() {
        return contact_email;
    }

    public void setContact_email(String contact_email) {
        this.contact_email = contact_email;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }
}
