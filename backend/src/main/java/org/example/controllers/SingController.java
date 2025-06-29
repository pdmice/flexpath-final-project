package org.example.controllers;


import org.example.daos.SingDao;
import org.example.exceptions.DaoException;
import org.example.models.Sing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @CrossOrigin
    public Sing create(@RequestBody Sing sing) {
        try{
            return singDao.createSing(sing);
        }
        catch(DaoException e){
            throw new DaoException("Failed to create sing");
        }
    }

    @CrossOrigin
    @PostMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Sing update(@PathVariable int id, @RequestBody Sing sing) {
        return singDao.updateSing(sing, id);
    }


    @CrossOrigin
    @GetMapping("/delete/{id}/{username}")
    @PreAuthorize("isAuthenticated() and @singSecurity.isOwner(#id, authentication.name) or  hasAuthority('ADMIN')")
    public int deleteSing(@PathVariable String username, @PathVariable int id){
        return singDao.deleteSing(id);
    }

    /*
    @GetMapping("/search/{searchId}")
    public List<Sing> searchByDistance(@PathVariable int searchId, @RequestBody SearchObject searchObject){
        try {
            return singDao.searchByDistance(searchId, searchObject);
        }
        catch(DaoException e ){throw new DaoException("No Sins Found");}
    }

     */
}
