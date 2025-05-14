package org.example.controllers;

import org.example.daos.SearchObjectDao;
import org.example.models.SearchObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchObjectDao searchObjectDao;

    @PostMapping
    public int getSearch(@RequestBody SearchObject search){
        int searchID = searchObjectDao.createSearch(search);
        return
    }
}
