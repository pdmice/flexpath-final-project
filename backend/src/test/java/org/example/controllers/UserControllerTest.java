package org.example.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import eu.fraho.spring.securityJwt.base.dto.JwtUser;
import org.example.SpringBootApplication;
import org.example.daos.UserDao;
import org.example.models.User;
import org.junit.jupiter.api.DisplayName;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import org.springframework.http.*;

import java.util.List;
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


    private String JoeDodAuthToken() throws JsonProcessingException {

        String authUrl = "http://localhost:" + port + "/auth/login";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = """
                {
                    "username": "joedod",
                    "password": "joedod"
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
    @DisplayName("Get /api/users/joedod return the user if they are the user")
    public void getUserByUserNameWithUsersToken() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(JoeDodAuthToken());
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/joedod",
                HttpMethod.GET,
                requestEntity,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    @DisplayName("Get /api/users/joe is forbidden as joedod")
    public void getUserByUserNameWithDifferentUsersToken() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(JoeDodAuthToken());
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users/joe",
                HttpMethod.GET,
                requestEntity,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);

    }


    String randomUser = UUID.randomUUID().toString();
    String randomPassword = UUID.randomUUID().toString();
    @Test
    @DisplayName("POST to /api/users should create a new user")
    public void createAUser() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        String createdUser = """
                {
                "uuid":"",
                "username":"%s",
                "password":"%s"
                }
                """.formatted(randomUser, randomPassword);


        HttpEntity<String> requestEntity = new HttpEntity<>(createdUser,headers);

        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/users",
                HttpMethod.POST,
                requestEntity,
                User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);

    }

}
