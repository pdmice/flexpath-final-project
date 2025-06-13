package org.example.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.daos.UserDao;
import org.example.models.User;
import org.junit.jupiter.api.DisplayName;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import org.springframework.http.*;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserDao userDao;



    private String AdminAuthToken() throws JsonProcessingException {

        String authUrl = "http://localhost:" + port + "/auth/login";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = """
                {
                    "username": "admin",
                    "password": "admin"
                }
                """;

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(authUrl, request,String.class);

        try {
            //ObjectMapper is from Jackson JSON parsing lib to make an Object from json
            ObjectMapper mapper = new ObjectMapper();
            //JsonNode just gives us the top of a Json tree
            JsonNode top = mapper.readTree(response.getBody());
            //use .path() to traverse it
            return top.path("accessToken").path("token").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse token", e);
        }


    }

    String randomUser = UUID.randomUUID().toString();
    String randomPassword = "testPassword";



    @Test
    @DisplayName("POST to /api/users should create a new user")
    public void createAUser() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        String createdUser = """
                {
                "uuid":"",
                "username":"%s",
                "password":"testPassword"
                }
                """.formatted(randomUser);


        HttpEntity<String> requestEntity = new HttpEntity<>(createdUser,headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users",
                HttpMethod.POST,
                requestEntity,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);

    }

    private String TestUserAuthToken() throws JsonProcessingException {

        /// /////////////////////////////////////////////////////////////////////////////
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        String createdUser = """
                {
                "uuid":"",
                "username":"%s",
                "password":"testPassword"
                }
                """.formatted(randomUser);


        HttpEntity<String> requestEntity = new HttpEntity<>(createdUser,headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users",
                HttpMethod.POST,
                requestEntity,
                User.class);

        /// ////////////////////////////////////////////////////////////////////////////////////


        String authUrl = "http://localhost:" + port + "/auth/login";
        HttpHeaders headers2 = new HttpHeaders();
        headers2.setContentType(MediaType.APPLICATION_JSON);

        String body = "{\"username\":" +  "\"" + randomUser + "\"" + ",\"password\":" + "\"testPassword\"" + "}";



        HttpEntity<String> request = new HttpEntity<>(body, headers2);

        ResponseEntity<String> response2 = restTemplate.postForEntity(authUrl, request,String.class);

        try {
            //ObjectMapper is from Jackson JSON parsing lib to make an Object from json
            ObjectMapper mapper = new ObjectMapper();
            //JsonNode just gives us the top of a Json tree
            JsonNode top1 = mapper.readTree(response2.getBody());
            //use .path() to traverse it
            return top1.path("accessToken").path("token").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse token", e);
        }


    }



    @Test
    @DisplayName("Get /api/users should return all users if admin")
    public void getAllUsersWithAdminAuth() throws JsonProcessingException {
        //Get an auth token to put in the headers
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(AdminAuthToken());
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        //ResponseEntity is a handy type for HttP responses
        //restTemplate is provided by the springboot test web client
        //and will handle making request
        ResponseEntity<User[]> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users",
                HttpMethod.GET,
                requestEntity,
                User[].class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    //Do it again but with less auth for more fail

    @Test
    @DisplayName("Get /api/users should return all users if admin")
    public void getAllUsersWithOutAdminAuth() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth("Do I need to fake a token here, or will anything != a good token still come back as unauthorized?");
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<User[]> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users",
                HttpMethod.GET,
                requestEntity,
                User[].class
        );

        //Just scroll through the suggestions for the http status you need. Handy
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @DisplayName("Get /api/users/joe  should return the users if admin")
    public void getUserByUserNameWithAdminAuth() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(AdminAuthToken());
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/joe",
                HttpMethod.GET,
                requestEntity,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }


    @Test
    @DisplayName("Get /api/users/joe  should be unauthorized if !admin")
    public void getUserByUserNameWithOutAdminAuth() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth("Pretend there's a token here");
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/joe",
                HttpMethod.GET,
                requestEntity,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);

    }


    @Test
    @DisplayName("Get /api/users/testuser return the user if they are the user")
    public void getUserByUserNameWithUsersToken() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(TestUserAuthToken());
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/" + randomUser,
                HttpMethod.GET,
                requestEntity,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    @DisplayName("Get /api/users/janedoe is forbidden as testuser123")
    public void getUserByUserNameWithDifferentUsersToken() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(TestUserAuthToken());
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/janedoe",
                HttpMethod.GET,
                requestEntity,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);

    }





    @Test
    @DisplayName("PUT to /api/users/passchange/{username} should change password")
    public void updatePassword() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(TestUserAuthToken());
        headers.setContentType(MediaType.APPLICATION_JSON);

        String putString = "testPassword";

        HttpEntity<String> request = new HttpEntity<>(putString, headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/passchange/" + randomUser,
                HttpMethod.PUT,
                request,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);



    }

    @Test
    @DisplayName("DELETE to /api/users/{username} should delete the user")
    public void deleteUser() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(AdminAuthToken());
        headers.setContentType(MediaType.APPLICATION_JSON);

        String putString = randomPassword;

        HttpEntity<String> request = new HttpEntity<>(putString, headers);

        String url = String.format("http://localhost:%d/api/users/%s", port, randomUser);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.DELETE,
                request,
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }




}
