package org.example.controllers;


import org.example.daos.SingDao;
import org.example.exceptions.DaoException;
import org.example.models.Sing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/sings")

public class SingController {

    @Autowired
    private SingDao singDao;

    @GetMapping
    public List<Sing> getAll() {
        return singDao.getSings();
    }

    @GetMapping("/{id}")
    public Sing getSingById(@PathVariable int id) {
        return singDao.getSingById(id);
    }

    @PostMapping("/create")
    public Sing create(@RequestBody Sing sing) {
        try{
            return singDao.createSing(sing);
        }
        catch(DaoException e){
            throw new DaoException("Failed to create sing");
        }
    }

    @PutMapping("/update/{id}")
    public Sing update(@PathVariable int id, @RequestBody Sing sing) {
        return singDao.updateSing(sing, id);
    }


}
