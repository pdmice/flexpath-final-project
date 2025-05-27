package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.User;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Data access object for users.
 */
@Component
public class UserDao {
    /**
     * The JDBC template for querying the database.
     */
    private final JdbcTemplate jdbcTemplate;

    /**
     * The password encoder for the DAO.
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * Creates a new user data access object.
     *
     * @param dataSource The data source for the DAO.
     * @param passwordEncoder The password encoder for the DAO.
     */
    public UserDao(DataSource dataSource, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Gets all users.
     *
     * @return List of User
     */
    public List<User> getUsers() {
        return jdbcTemplate.query("SELECT * FROM users ORDER BY username;", this::mapToUser);
    }

    /**
     * Gets a user by username.
     *
     * @param username The username of the user.
     * @return User
     */
    public User getUserByUsername(String username) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", this::mapToUser, username);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User getUserByUUID(String uuid) {
        try{
            return jdbcTemplate.queryForObject("SELECT * FROM users WHERE uuid = ?", this::mapToUser, uuid);
        }
        catch(EmptyResultDataAccessException e){return null;}
    }

    /**
     * Creates a new user.
     * @param user The user to create.
     * @return User The created user.
     */
    public User createUser(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        String uuid = java.util.UUID.randomUUID().toString();
        String sql = "INSERT INTO users (uuid, username, password) VALUES (?,?,?);";
        try {
            jdbcTemplate.update(sql,uuid, user.getUsername(), hashedPassword);
            return getUserByUUID(user.getUuid());
        } catch (EmptyResultDataAccessException e) {
            throw new DaoException("Failed to create user.");
        }
    }

    /**
     * Updates a user's password.
     *
     * @param user The user to update.
     * @return User
     */
    public User updatePassword(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        String sql = "UPDATE users SET password = ? WHERE uuid = ?";
        int rowsAffected = jdbcTemplate.update(sql, hashedPassword, user.getUuid());
        if (rowsAffected == 0) {
            throw new DaoException("Zero rows affected, expected at least one.");
        } else {
            return getUserByUsername(user.getUsername());
        }
    }

    /**
     * Deletes a user.
     *
     * @param uuid The uuid of the user.
     */
    public int deleteUser(String uuid) {
        String sql = "DELETE FROM users WHERE uuid = ? ";
        return jdbcTemplate.update(sql, uuid);
    }

    /**
     * Gets all roles for a user.
     *
     * @param username The uuid of the user.
     * @return List of String
     */
    public List<String> getRoles(String username) {
        return jdbcTemplate.queryForList("SELECT role FROM roles WHERE username = ?;", String.class, username);
    }

    /**
     * Adds a role to a user.
     *
     * @param uuid The uuid of the user.
     * @param role The role to add.
     * @return List of String
     */
    public List<String> addRole(String uuid, String username ,String role) {
        try {
            String sql = "INSERT INTO roles (uuid,username,role) VALUES (?,?,?);";
            jdbcTemplate.update(sql, uuid,username,  role);
        } catch (DataAccessException e) {
        }
        return getRoles(uuid);
    }

    /**
     * Deletes a role from a user.
     *
     * @param uuid The uuid of the user.
     * @param role The role to delete.
     */
    public int deleteRole(String uuid, String role) {
        String sql = "DELETE FROM roles WHERE uuid = ? AND role = ?";
        return jdbcTemplate.update(sql, uuid, role);
    }

    public int addToMySing(String uuid, int singID, int isPublic){
        String sql = "INSERT INTO users_events (user_id, event_id, public) VALUES (?,?,?);";

        try{
           return jdbcTemplate.update(sql, uuid, singID,isPublic);
        }
        catch(DaoException e) {throw new DaoException("Failed to add event to users_events table");}
    }

    /**
     * Maps a row in the ResultSet to a User object.
     *
     * @param resultSet The result set to map.
     * @param rowNumber The row number.
     * @return User The user object.
     * @throws SQLException If an error occurs while mapping the result set.
     */
    public User mapToUser(ResultSet resultSet, int rowNumber) throws SQLException {
        //String username = resultSet.getString("username");
        return new User(
                resultSet.getString("uuid"),
                resultSet.getString("username"),
                resultSet.getString("password")
        );
    }
}
