package org.example.daos;

import com.sun.jna.platform.win32.OaIdl;
import org.example.exceptions.DaoException;
import org.example.models.SearchObject;
import org.example.models.Sing;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class SingDao {

    private final JdbcTemplate jdbcTemplate;

    public SingDao(DataSource dataSource){

        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Sing> getSings(){
        String sql = "SELECT * FROM sings;";
        return jdbcTemplate.query(sql, this::mapToSing);
    }

    public List<Sing> getSingsByOwner(String owner_id){
        String sql = "SELECT * FROM sings WHERE owner_id = ?;";
        return jdbcTemplate.query(sql, this::mapToSing);
    }

    public Sing getSingById(int id){
        String sql = "SELECT * FROM sings WHERE id = ?;";

        try{
            return jdbcTemplate.queryForObject(sql,this::mapToSing, id);
        }
        catch(EmptyResultDataAccessException e){throw new DaoException("Didn't find sing: ");
        }
    }

    public Sing createSing(Sing sing){
        String sql = "insert into  sings (name,owner_id, start_date, end_date, start_time, end_time, primary_book_id, secondary_book_id, contact_email, user_added_note, location)" +
                " values (?,?,?,?,?,?,?,?,?,?,?);";

        try{
           jdbcTemplate.update(sql,
                    sing.getName(),
                    sing.getOwner_id(),
                    sing.getStart_date(),
                    sing.getEnd_date(),
                    sing.getStart_time(),
                    sing.getEnd_time(),
                    sing.getPrimary_book(),
                    sing.getSecondary_book(),
                    sing.getContact_email(),
                    sing.getNotes(),
                    sing.getLatitude() + "," +  sing.getLongitude());
           return sing;
        }
        catch(EmptyResultDataAccessException e){
            throw new DaoException("Failed to create new sing");
        }

    }

    public Sing updateSing(Sing sing, int id){
        String sql = "UPDATE sings set name = ?, owner_id = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ?, primary_book = ?, secondary_book = ?, contact_email = ?, user_added_note = ?, location = ?, WHERE id = ?;";
        try{
            jdbcTemplate.update(sql,
                    sing.getName(),
                    sing.getOwner_id(),
                    sing.getStart_date(),
                    sing.getEnd_date(),
                    sing.getStart_time(),
                    sing.getEnd_time(),
                    sing.getPrimary_book(),
                    sing.getSecondary_book(),
                    sing.getContact_email(),
                    sing.getNotes(),
                    sing.getLatitude() + "," +  sing.getLongitude(),
                    id);
            return sing;
        }
        catch(EmptyResultDataAccessException e){
            throw new DaoException("Failed to update sing");
        }

    }

    public int deleteSing(int id){
        String sql = "DELETE * FROM sings where id = ?;";
        return jdbcTemplate.update(sql, id);
    }

    public List<Sing> searchByDistance (int searchId, SearchObject searchObject){
        String sql = "SELECT pointB.*, ST_Distance_Sphere(pointA.location, pointB.location) AS distance_in_meters FROM (SELECT location FROM searches where id = ?) AS pointA, sings AS pointB WHERE ST_Distance_Sphere(pointA.location, pointB.location) <= ?  AND pointB.start_date BETWEEN ? AND ? ORDER BY distance_in_meters ASC;";
        try{
            return jdbcTemplate.query(sql, this::mapToSing,searchId, searchDistance, searchStart, searchEnd);
        }
        catch(DaoException e){ throw new DaoException("No sings found");}
    }


    private Sing mapToSing(ResultSet resultSet, int rowNumber) throws SQLException {
        int id = resultSet.getInt("id");
        return new Sing(
                resultSet.getInt("id"),
                resultSet.getString("name"),
                resultSet.getString("owner_id"),
                resultSet.getDate("start_date"),
                resultSet.getDate("end_date"),
                resultSet.getString("when_description"),
                resultSet.getTime("start_time"),
                resultSet.getTime("end_time"),
                resultSet.getString("primary_book"),
                resultSet.getString("secondary_book"),
                resultSet.getString("contact_email"),
                resultSet.getString("user_added_note"),
                //resultSet.getBigDecimal("latitude"),
                //resultSet.getBigDecimal("longitude")
                resultSet.getBlob("location")
        );
    }
}
