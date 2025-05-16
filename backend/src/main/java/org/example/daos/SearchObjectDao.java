package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Coords;
import org.example.models.SearchObject;
import org.example.models.Sing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

@Component
public class SearchObjectDao {

    private final JdbcTemplate jdbcTemplate;

    public SearchObjectDao(DataSource dataSource){

        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Autowired
    private SingDao singDao;

    public int createSearch(SearchObject searchObject){
        String sql = "INSERT INTO searches (search_location,search_start,search_end, radius) VALUES(POINT(?,?),?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        BigDecimal searchRadius = BigDecimal.valueOf(searchObject.getSearchRadius() * 1609.344);
        try{

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setObject(3, searchObject.getSearchStart());
                ps.setObject(4, searchObject.getSearchEnd());
                ps.setObject(5, searchRadius);
                ps.setObject(1, searchObject.getLat());
                ps.setObject(2, searchObject.getLon());
                return ps;
            }, keyHolder);
            return Objects.requireNonNull(keyHolder.getKey()).intValue();
        }
        catch(DaoException e ){throw new DaoException("Failed to insert searchobject to DB");}
    }

    public List<Sing> searchSings(SearchObject searchObject){
        int searchID = createSearch(searchObject);
        String sql = """
                SELECT\s
                    pointB.*, \s
                    ST_Distance_Sphere(
                        pointA.search_location,\s
                        pointB.location
                    ) AS distance_in_meters
                FROM\s
                    (SELECT search_location, search_start, search_end, radius FROM searches WHERE id = ?) AS pointA,
                    sings AS pointB
                WHERE\s
                    ST_Distance_Sphere(
                        pointA.search_location,\s
                        pointB.location
                    ) <= pointA.radius
                    AND pointB.start_date BETWEEN pointA.search_start AND pointA.search_end
                ORDER BY\s
                    distance_in_meters ASC;
                
                
                """;
        try{
            return jdbcTemplate.query(sql, singDao::mapToSing, searchID);
        }
        catch(DaoException e ){throw new DaoException("Failed to retrieve search results from DB");}
    }
/*
    private SearchObject mapToSearch(ResultSet resultSet, int rowNumber) throws SQLException{
        int id = resultSet.getInt("id");

        return new SearchObject(
                resultSet.getDate("search_start"),
                resultSet.getDate("search_end"),
                resultSet.getFloat("radius"),
                resultSet.getBlob("search_location")
        );
    }*/
}
