package org.example.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.daos.BookDao;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

public class BookControllerTest {



    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private BookDao bookDao;


    @Test
    @DisplayName("Get /api/books should return all books")
    public void getBooks() throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);


        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/api/books",
                HttpMethod.GET,
                requestEntity,
                String.class
        );

        //from there you can just make assertions:

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
