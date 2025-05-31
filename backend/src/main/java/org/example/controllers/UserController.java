package org.example.controllers;

import org.example.daos.SingDao;
import org.example.models.Sing;
import org.example.models.User;
import org.example.daos.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URISyntaxException;
import java.nio.file.Path;
import java.util.List;

/**
 * Controller for users.
 * This class is responsible for handling all HTTP requests related to users.
 */
@RestController
@CrossOrigin
@RequestMapping("/api/users")
@PreAuthorize("hasAuthority('ADMIN')")
public class UserController {
    /**
     * The user data access object.
     */
    @Autowired
    private UserDao userDao;

    @Autowired
    private SingDao singDao;

    /**
     * Gets all users.
     *
     * @return A list of all users.
     */
    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        try{
            return  ResponseEntity.ok(userDao.getUsers());
        }catch(Exception e ){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }



    /**
     * Gets a user by their username.
     *
     * @param username The username of the user.
     * @return The user with the given username.
     */
    @GetMapping(path = "/{username}")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public User get(@PathVariable String username) {
        return userDao.getUserByUsername(username);
    }

    /**
     * Creates a new user.
     *
     * @param user The user to create.
     * @return The created user.
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @PreAuthorize("permitAll()")
    public User create(@RequestBody User user) {
        return userDao.createUser(user);
    }

    /**
     * Updates a specific user's password.
     *
     * @param password The new password.
     * @param username The username of the user.
     * @return The updated user.
     */
    @PutMapping(path = "/passchange/{username}")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public User updatePassword(@RequestBody String password, @PathVariable String username) {
        User user = userDao.getUserByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
        }
        user.setPassword(password);
        return userDao.updatePassword(user);
    }

    /**
     * Deletes a user.
     *
     * @param username The username of the user to delete.
     */
    @DeleteMapping(path = "/{username}")
    public int delete(@PathVariable String username) {
        return userDao.deleteUser(username);
    }

    /**
     * Gets all roles for a user.
     *
     * @return A list of all roles for the user.
     */
    @GetMapping(path = "/{username}/roles")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public List<String> getRoles(@PathVariable String username) {
        return userDao.getRoles(username);
    }

    @GetMapping(path = "/{username}/events/{isPublic}/{id}")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public int addToUsersEvents(@PathVariable String username, @PathVariable int isPublic ,@PathVariable int id){
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();
        return userDao.addToMySing(uuid,id, isPublic);
    }
    /**
     * Adds a role to a user.
     *
     * @param username The username of the user.
     * @param role The role to add.
     * @return A list of all roles for the user.
     */
    @PostMapping(path = "/{username}/roles")
    public List<String> addRole(@PathVariable String username, @RequestBody String role) {
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid().toString();
        return userDao.addRole(uuid, username, role.toUpperCase());
    }

    /**
     * Deletes a role from a user.
     *
     * @param username The username of the user.
     * @param role The role to delete.
     */
    @DeleteMapping(path = "/{username}/roles/{role}")
    public int deleteRole(@PathVariable String username, @PathVariable String role) {
        var affectedRows = userDao.deleteRole(username, role.toUpperCase());
        if (affectedRows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found");
        } else {
            return affectedRows;
        }
    }

    @GetMapping(path = "/events/{username}")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public List<Sing> getMyAttendingSings(@PathVariable String username){
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        return userDao.getMyEventsIDS(uuid);

    }

    @GetMapping(path = "/events/future/{username}")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public List<Sing> getMyFutureSings(@PathVariable String username){
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        return userDao.getUsersEventsIDS(uuid);

    }

    @GetMapping(path = "/events/past/{username}")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public List<Sing> getMyPastSings(@PathVariable String username){
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        return userDao.getMysPastEventsIDS(uuid);

    }

    @GetMapping(path = "/events/delete/{username}/{id}")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public int deleteMySing(@PathVariable String username, @PathVariable int id){ return userDao.deleteFromMyEvents(username, id);};







    @GetMapping("/events/public/{username}")
    @PreAuthorize("permitAll()")
    public List<Sing> getUsersSings(@PathVariable String username){
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        return userDao.getUsersEventsIDS(uuid);

    }

    @GetMapping("/events/public/past/{username}")
    @PreAuthorize("permitAll()")
    public List<Sing> getUsersPastSings(@PathVariable String username){
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        return userDao.getUsersPastEventsIDS(uuid);

    }

    @GetMapping("/events/public/future/{username}")
    @PreAuthorize("permitAll()")
    public List<Sing> getUsersFutureSings(@PathVariable String username){
        User user = userDao.getUserByUsername(username);
        String uuid = user.getUuid();

        return userDao.getUsersFutureEventsIDS(uuid);

    }


}
