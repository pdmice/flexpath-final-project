package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Book;
import org.example.models.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.server.ResponseStatusException;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class BookDao {
    /**
     * The JDBC template for querying the database.
     */
    private final JdbcTemplate jdbcTemplate;


    public BookDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Book> getAll(){
        String sql = "SELECT * FROM books;";
        return jdbcTemplate.query(sql, this::mapToBook);
    }


    public Book getBookById(int id){
        String sql = "SELECT * FROM books WHERE id = ?";

        try{
            return jdbcTemplate.queryForObject(sql, this::mapToBook, id);
        }
        catch(EmptyResultDataAccessException e){
            return null;
        }
    }

    public Book createBook(String name){
        int topId = getAll().size() + 1;
        String sql = "INSERT INTO books (id, name) VALUES(?,?);";

        try{
            jdbcTemplate.update(sql, topId, name);
            return getBookById(topId);
        }
        catch(EmptyResultDataAccessException e){
            throw new DaoException("Failed to create book");
        }
    }


    public int deleteBook(int id){
        String sql = "DELETE * FROM books WHERE id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, id):

        if (rowsAffected == 0 ){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");}
        else{return rowsAffected;}
    }



    private Book mapToBook(ResultSet resultSet, int rowNumber) throws SQLException {
        int id = resultSet.getInt("id");
        return new Book(
                id,
                resultSet.getString("name")
        );
    }

}
