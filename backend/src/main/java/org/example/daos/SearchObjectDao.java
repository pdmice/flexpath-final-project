package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Coords;
import org.example.models.SearchObject;
import org.example.models.Sing;
import org.example.models.User;
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

    @Autowired
    private UserDao userDao;

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
                ps.setObject(2, searchObject.getLat());
                ps.setObject(1, searchObject.getLon());
                return ps;
            }, keyHolder);
            return Objects.requireNonNull(keyHolder.getKey()).intValue();
        }
        catch(DaoException e ){throw new DaoException("Failed to insert searchobject to DB");}
    }

    public List<Sing> searchSings(SearchObject searchObject){
        int searchID = createSearch(searchObject);
        //There's a ludicrously long select string here. We need to select everything that we aren't renaming
        //with an AS clause so no SELECT pointB.*

        String sql = """
                SELECT\s
                    pointB.location, pointB.id, pointB.name, pointB.start_date, pointB.end_date, pointB.when_description, pointB.start_time, pointB.end_time, pointB.contact_email, pointB.user_added_note, b1.name AS primary_book,b2.name AS secondary_book,u1.username AS owner_id,\s
                    ST_Distance_Sphere(
                        pointA.search_location,\s
                        pointB.location
                    ) AS distance_in_meters
                FROM\s
                    (SELECT search_location, search_start, search_end, radius FROM searches WHERE id = ?) AS pointA,
                    sings AS pointB
                    LEFT JOIN books b1 ON pointB.primary_book = b1.id
                    LEFT JOIN books b2 ON pointB.secondary_book = b2.id
                    LEFT JOIN users u1 ON pointB.owner_id = u1.uuid
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

    public List<Sing> searchByUser(String user){

        User searchUser = userDao.getUserByUsername(user);
        String uuid = searchUser.getUuid();

        String sql = """
                SELECT  sings.id, sings.name, start_date, end_date,when_description,start_time, end_time, b1.name AS primary_book, b2.name as secondary_book,contact_email, user_added_note,location , u1.username AS owner_id\s
                FROM sings \s
                LEFT JOIN books b1 ON sings.primary_book = b1.id
                LEFT JOIN books b2 ON sings.secondary_book = b2.id
                LEFT JOIN users u1 ON sings.owner_id = u1.uuid \s
                where owner_id = ?;
                """;
        try {
            return jdbcTemplate.query(sql, singDao::mapToSing, uuid);
        }
        catch(DaoException e){throw new DaoException("Failed to retrieve sings by user");}
    }

    /*
    private SearchObject mapToSearch(ResultSet resultSet, int rowNumber) throws SQLException{

        return new SearchObject(
                resultSet.getInt("id"),
                resultSet.getDate("search_start"),
                resultSet.getDate("search_end"),
                resultSet.getFloat("radius"),
                resultSet.getBlob("search_location")
        );
    }
     */
}
