package org.example.daos;

import org.example.models.CustomUserGroup;
import org.example.models.Sing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class CustomUserGroupsDAO {

    private final JdbcTemplate jdbcTemplate;

    public CustomUserGroupsDAO(DataSource dataSource){

        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Autowired
    private SingDao singDao;


    public  int createCustomUserGroup(int isPublic, String uuid, String name){
        String sql = "INSERT INTO custom_user_groups (isPublic, users_uuid, custom_group_name) VALUES (?,?,?);";

        return jdbcTemplate.update(sql, isPublic, uuid, name);
    }

    public List<CustomUserGroup> getUsersCustomGroups(String uuid){
        String sql = "SELECT * FROM custom_user_groups WHERE users_uuid = ?";
        return jdbcTemplate.query(sql, this::mapToCustomUserGroup, uuid);
    }

    public List<CustomUserGroup> getUsersPublicCustomGroups(String uuid){
        String sql = "SELECT * FROM custom_user_groups WHERE users_uuid = ? AND isPublic = 1";
        return jdbcTemplate.query(sql, this::mapToCustomUserGroup, uuid);
    }
    public int addToUsersCustomGroup(int event_id, int group_id){
       String sql = "INSERT INTO custom_user_groups_events (group_id, event_id) VALUES (?,?)";
       return  jdbcTemplate.update(sql, group_id, event_id);
    }

    public CustomUserGroup  getCustomGroupByGroupId(int groupId){
        String sql = "SELECT * FROM custom_user_groups where id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapToCustomUserGroup, groupId);
    }

    public int deleteCustomGroupById(int id){
        String deleteEventsSql = "DELETE FROM custom_user_groups_events WHERE group_id = ?";
        jdbcTemplate.update(deleteEventsSql, id);

        String sql = "DELETE FROM custom_user_groups WHERE id = ?";

        return jdbcTemplate.update(sql, id);
    }

    public int deleteSingFromGroup(int group_id, int event_id){


        String sql = "DELETE FROM custom_user_groups_events where group_id = ? and event_id = ?;";
        return jdbcTemplate.update(sql, group_id, event_id );
    }

    public List<Sing>  getAllSingsByGroupId(int group_id){
        String sql = """
                SELECT
                                  s.id,
                                  s.isPublic,
                                  s.name,
                                  -- s.owner_id,
                                  u.username AS owner_id,
                                  s.start_date,
                                  s.end_date,
                                  s.when_description,
                                  s.start_time,
                                  s.end_time,
                                  -- s.primary_book,
                                  pb.name AS primary_book,
                                  -- s.secondary_book,
                                  sb.name AS secondary_book,
                                  s.contact_email,
                                  s.user_added_note,
                                  ST_AsText(s.location) AS location
                                FROM sings s
                                JOIN custom_user_groups_events AS ge ON s.id = ge.event_id
                                JOIN users AS u ON s.owner_id = u.uuid
                                LEFT JOIN books AS pb ON s.primary_book = pb.id
                                LEFT JOIN books AS sb ON s.secondary_book = sb.id
                                WHERE ge.group_id = ?;
                """;

        return jdbcTemplate.query(sql, singDao::mapToSing, group_id);
    }













    public CustomUserGroup mapToCustomUserGroup(ResultSet resultSet, int rowNumber) throws SQLException {
        return new CustomUserGroup(
                resultSet.getInt("id"),
                resultSet.getString("users_uuid"),
                resultSet.getInt("isPublic"),
                resultSet.getString("custom_group_name")
        );
    }
}
