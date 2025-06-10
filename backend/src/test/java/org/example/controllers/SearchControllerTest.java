package org.example.controllers;

import org.example.models.SearchObject;
import org.example.models.Sing;
import org.springframework.boot.test.context.SpringBootTest;
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

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;





@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SearchControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    @DisplayName(" Get /api/search/{username} should return a list of sings")
    public void getSingListByUser() {

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);


        ResponseEntity<Sing[]> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/search/admin",
                HttpMethod.GET,
                requestEntity,
                Sing[].class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }


    @Test
    @DisplayName(" Get /api/search/{keyword} should return a list of sings")
    public void getSingListByKeyword() {


        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);


        ResponseEntity<Sing[]> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/search/keyword/alabama",
                HttpMethod.GET,
                requestEntity,
                Sing[].class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }







    @Test
    @DisplayName(" Get /api/search/id/{id} should return a sing")
    public void getSingListById() {

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);


        ResponseEntity<Sing> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/search/id/1",
                HttpMethod.GET,
                requestEntity,
                Sing.class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName(" Post to /api/search should return a list of sings")
    public void getSingLocation() {

        String post = """
                {
                  "searchStart": "2025-05-01",
                  "searchEnd": "2025-07-01",
                  "searchRadius": 10000,
                  "searchLocation": " -75.81705458707128:40.235591551517"
                }
                """;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<String>(post,headers);


        ResponseEntity<Sing[]> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/search",
                HttpMethod.POST,
                requestEntity,
                Sing[].class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    }

