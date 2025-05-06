package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Sing;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class SingDao {

    private final JdbcTemplate jdbcTemplate;

    public SingDao(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate();
    }

    public List<Sing> getSings(){
        String sql = "SELECT * FROM sings;";
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

    public int deleteSing(int id){
        String sql = "DELETE * FROM sings where id = ?;";
        return jdbcTemplate.update(sql, id);
    }


    private Sing mapToSing(ResultSet resultSet, int rowNumber) throws SQLException {
        int id = resultSet.getInt("id");
        return new Sing(
                resultSet.getInt("id"),
                resultSet.getString("name"),
                resultSet.getString("owner_id"),
                resultSet.getDate("start_date").toLocalDate(),
                resultSet.getDate("end_date").toLocalDate(),
                resultSet.getString("when_description"),
                resultSet.getTime("start_time").toLocalTime(),
                resultSet.getTime("end_time").toLocalTime(),
                resultSet.getString("primary_book"),
                resultSet.getString("secondary_book"),
                resultSet.getString("contact_email"),
                resultSet.getString("notes"),
                resultSet.getBigDecimal("latitude"),
                resultSet.getBigDecimal("longitude")

        );
    }
}
