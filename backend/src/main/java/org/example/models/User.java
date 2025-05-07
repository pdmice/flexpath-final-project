package org.example.models;

import java.util.UUID;

/**
 * Model class for users.
 */
public class User {
    /**
     * The username of the user.
     */
    private String username;

    /**
     * Use a UUID instead of user name
     */

    private String uuid;
    /**
     * The password of the user.
     */

    private String password;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    /**
     * Creates a new user.
     *
     * @param username The username of the user.
     * @param password The password of the user.
     */
    public User(String uuid, String username, String password) {
        this.uuid = uuid;
        this.username = username;
        this.password = password;
    }

    /**
     * Gets the username of the user.
     *
     * @return The username of the user.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user.
     *
     * @param username The username of the user.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the password of the user.
     *
     * @return The password of the user.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the user.
     *
     * @param password The password of the user.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
