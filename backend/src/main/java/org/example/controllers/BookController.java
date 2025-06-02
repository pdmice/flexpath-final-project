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
    public List<Book> getAllBooks() {
        return bookDao.getAll();
    }
}


