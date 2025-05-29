package org.example.controllers;

import org.example.daos.BookDao;
import org.example.exceptions.DaoException;
import org.example.models.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/books")

public class BookController {

    @Autowired
    private BookDao bookDao;

    @GetMapping
    public List<Book> getAllBooks() {return bookDao.getAll();}

//    @GetMapping("/{id}")
//    public Book getBookById(int id){return bookDao.getBookById(id);}
//
//    @PostMapping("/create")
//    public Book create(@RequestBody String name) {
//        try{
//            return bookDao.createBook(name);
//        }
//        catch(DaoException e){
//            throw new DaoException("Failed to create sing");
//        }
//    }

    @DeleteMapping("/{id}")
    public void deleteBookById(@PathVariable int id) { bookDao.deleteBook(id);}

    @PutMapping("/update/{id}")
    public Book update(@RequestBody Book book) {
        return bookDao.updateBook(book);
    }
}
