package org.example.controllers;

import org.example.daos.SearchObjectDao;
import org.example.models.SearchObject;
import org.example.models.Sing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchObjectDao searchObjectDao;

    @CrossOrigin
    @PostMapping
    public List<Sing> getSearch(@RequestBody SearchObject search){
        return searchObjectDao.searchSings(search);
    }
}
