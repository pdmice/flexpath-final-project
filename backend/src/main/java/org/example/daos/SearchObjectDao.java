package org.example.daos;

import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class SearchObjectDao {

    private final JdbcTemplate jdbcTemplate;

    public SearchObjectDao(DataSource dataSource){

        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }


}
