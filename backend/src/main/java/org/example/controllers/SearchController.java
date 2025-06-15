package org.example.controllers;

import org.example.daos.SearchObjectDao;
import org.example.models.SearchObject;
import org.example.models.Sing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// For the cross origin, try updating to something like:
// @CrossOrigin(origins = {"http://localhost:5173"})
// to only allow cross origin requests from the intended front end
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

    @CrossOrigin
    @GetMapping("/all/{username}")
    @PreAuthorize("#username == authentication.name OR hasAuthority('ADMIN')")
    public List<Sing> searchByUsername(@PathVariable String username){return searchObjectDao.searchALLByUser(username);}

    @GetMapping("/keyword/{keyword}")
    public List<Sing> searchByKeyword(@PathVariable String keyword){return searchObjectDao.searchByKeywork(keyword);}

    @CrossOrigin
    @GetMapping("/id/{id}")
    public Sing searchById(@PathVariable int id){return searchObjectDao.searchById(id);}
}
