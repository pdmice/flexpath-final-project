package org.example.daos;

import com.sun.jna.platform.win32.OaIdl;
import org.example.exceptions.DaoException;
import org.example.models.Coords;
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
        return jdbcTemplate.query(sql, this::mapToSing, owner_id);
    }

    public Sing getSingById(int id){
        //String sql = "SELECT * FROM sings WHERE id = ?;";
        String sql = """
                 SELECT sings.id, sings.isPublic, sings.name, start_date, end_date,when_description,start_time, end_time, b1.name AS primary_book, b2.name as secondary_book,contact_email, user_added_note,location , u1.username AS owner_id\s
                                    FROM sings\s
                                    LEFT JOIN books b1 ON sings.primary_book = b1.id
                                    LEFT JOIN books b2 ON sings.secondary_book = b2.id
                                    LEFT JOIN users u1 ON sings.owner_id = u1.uuid\s
                                    WHERE sings.id = ?;
                """;
        try{
            return jdbcTemplate.queryForObject(sql,this::mapToSing, id);
        }
        catch(EmptyResultDataAccessException e){throw new DaoException("Didn't find sing: ");
        }
    }

    public Sing createSing(Sing sing){
        String sql = "insert into  sings (isPublic, name,owner_id, start_date, end_date, start_time, end_time, primary_book, secondary_book, contact_email, user_added_note,location)" +
                " values (?, ?,?,?,?,?,?,?,?,?,?,POINT(?,?));";
        String Lat = sing.getLatitude().toString();
        String Lon =  sing.getLongitude().toString();
        String loc = Lat + ":" + Lon;
        Coords coords = new Coords(loc);
        BigDecimal lat = coords.getLat();
        BigDecimal lon = coords.getLon();

        try{
           jdbcTemplate.update(sql,
                    sing.getIsPublic(),
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
                   lat,
                   lon

           );
           return sing;
        }
        catch(EmptyResultDataAccessException e){
            throw new DaoException("Failed to create new sing");
        }

    }

    public Sing updateSing(Sing sing, int id){
        String conversionObject = "SELECT * FROM sings WHERE id = ?;";

        Sing singObjectForConversionBack = jdbcTemplate.queryForObject(conversionObject,this::mapToSing,id);
        String sql = """
                UPDATE sings 
                set name = ?, owner_id = ?, start_date = ?, end_date = ?,  when_description = ?, start_time = ?, end_time = ?, primary_book = ?, secondary_book = ?, contact_email = ?, user_added_note = ?
                WHERE id = ?;
                """;
        try{
            jdbcTemplate.update(sql,
                    sing.getName(),
                    singObjectForConversionBack.getOwner_id(),
                    sing.getStart_date(),
                    sing.getEnd_date(),
                    sing.getWhen_Description(),
                    sing.getStart_time(),
                    sing.getEnd_time(),
                    singObjectForConversionBack.getPrimary_book(),
                    singObjectForConversionBack.getSecondary_book(),
                    sing.getContact_email(),
                    sing.getNotes(),

                    id);
            return sing;
        }
        catch(EmptyResultDataAccessException e){
            throw new DaoException("Failed to update sing");
        }

    }

    public int deleteSing(int id){
        String sql = "DELETE FROM sings where id = ?;";
        return jdbcTemplate.update(sql, id);
    }




    public Sing mapToSing(ResultSet resultSet, int rowNumber) throws SQLException {
        int id = resultSet.getInt("id");
        return new Sing(
                resultSet.getInt("id"),
                resultSet.getInt("isPublic"),
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
