package org.example.daos;

import org.example.exceptions.DaoException;
import org.example.models.Book;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
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


    private Book mapToBook(ResultSet resultSet, int rowNumber) throws SQLException {
        int id = resultSet.getInt("id");
        return new Book(
                id,
                resultSet.getString("name")
        );
    }

}
