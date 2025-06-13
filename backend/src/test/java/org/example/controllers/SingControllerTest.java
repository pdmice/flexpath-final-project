package org.example.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.daos.SingDao;
import org.example.daos.UserDao;
import org.example.models.Sing;
import org.example.models.User;
import org.junit.jupiter.api.DisplayName;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import org.springframework.http.*;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SingControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private SingDao singDao;

    String testSing = """
            {
                "id": 5,
                "name": "Something Else test",
                "owner_id": "admin",
                "start_date": "2026-02-28",
                "end_date": null,
                "when_Description": "Jan, New Yearnulls Day",
                "start_time": "10:00:00",
                "end_time": "15:00:00",
                "primary_book": "New Harp of Columbia",
                "secondary_book": null,
                "contact_email": null,
                "notes": null,
                "latitude": null,
                "longitude": null
            }
            
            """;




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

    @Test
    @DisplayName("GET to /api/sing/{id} should return a sing")
    public void getSingByIdTest(){
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);


        ResponseEntity<Sing> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/sings/1",
                HttpMethod.GET,
                requestEntity,
                Sing.class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    @DisplayName("Get /api/sings should return a list of all sings")
    public void getAllSingsTest(){

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);


        ResponseEntity<Sing[]> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/sings",
                HttpMethod.GET,
                requestEntity,
                Sing[].class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    @DisplayName("Posting to /api/sings/create with a json object should create a sing")
    public void createSingTest() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        String createdSing = """
                {
                
                    "name": "yet another test",
                    "owner_id": "10b2fd3b-0d98-4b38-9d1f-d4f7701913e7",
                    "start_date": "2026-02-28",
                    "end_date": null,
                    "when_Description": "Jan, New Yearnulls Day",
                    "start_time": "10:00:00",
                    "end_time": "15:00:00",
                    "primary_book": "1",
                    "secondary_book": null,
                    "contact_email": null,
                    "notes": null,
                    "latitude": "39.950581105991894",
                    "longitude": "-75.16416878868098"
                }
                """;


        HttpEntity<String> requestEntity = new HttpEntity<>(createdSing,headers);

        ResponseEntity<Sing> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/sings/create",
                HttpMethod.POST,
                requestEntity,
                Sing.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    @DisplayName("Sending a post to /update/{id} should update a sing with admin role")
    public void updateSingTest() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(AdminAuthToken());


        String createdSing = """
                {
              
                    "name": "yet another test again",
                    "owner_id": "admin",
                    "start_date": "2026-02-28",
                    "end_date": null,
                    "when_Description": "Jan, New Yearnulls Day",
                    "start_time": "10:00:00",
                    "end_time": "15:00:00",
                    "primary_book": "1",
                    "secondary_book": null,
                    "contact_email": null,
                    "notes": null,
                    "latitude": "39.950581105991894",
                    "longitude": "-75.16416878868098"
                }
                """;


        HttpEntity<String> requestEntity = new HttpEntity<>(createdSing,headers);

        ResponseEntity<Sing> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/sings/update/1",
                HttpMethod.POST,
                requestEntity,
                Sing.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);


    }

    @Test
    @DisplayName("Get /api/sings/delete/{id}/{username} should return 403 if not logged in")
    public void deleteUnauthedTest(){

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);


        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/sings/delete/1/admin",
                HttpMethod.GET,
                requestEntity,
                String.class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);

    }



}
