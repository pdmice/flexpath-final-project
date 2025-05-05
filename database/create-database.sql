create database if not exists flexpath_final;
use flexpath_final;

drop table if exists users, roles;

create table users (
    username varchar(255) primary key,
    password varchar(255)
);

create table roles (
    username varchar(255) not null,
    role varchar(250) not null,
    primary key (username, role),
    foreign key (username) references users(username) on delete cascade
);

create table books (
	id int auto_increment PRIMARY KEY,
    name VARCHAR(100)
);
create table sings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    start_date DATE not null,
    end_date DATE, -- This can be null, if so we assume single day event.
    /*
     when_description will be used to generate dates if the only data available is in the form of 'Apr, Sat before 1st Sunday'
     as that's what's in the CSV I have.
     PROBABLY won't be necessary. Look for a way to scrape actual dates. 
    */
    when_description VARCHAR(100), 
    start_time TIME not null ,
    end_time TIME,
    primary_book_id int,
    secondary_book_id int,
    contact_email VARCHAR(320), -- 320 == limit of length for a valid email + @ symbol
    user_added_note VARCHAR(1000), -- Various notes i.e. Behind the barn next to the church or whatever
    location POINT NOT NULL,
    SPATIAL INDEX(location),
    foreign key(primary_book_id) references books(id),
    foreign key(secondary_book_id) references books(id)
);




insert into users (username, password) values ('admin', '$2a$10$tBTfzHzjmQVKza3VSa5lsOX6/iL93xPVLlLXYg2FhT6a.jb1o6VDq');
insert into roles (username, role) values ('admin', 'ADMIN');

insert into users (username, password) values ('user', '$2a$10$tBTfzHzjmQVKza3VSa5lsOX6/iL93xPVLlLXYg2FhT6a.jb1o6VDq');
insert into roles (username, role) values ('user', 'USER');


insert into books (id, name) VALUES (1, "Denson Book");

insert into  sings 
(name, start_date, end_date, start_time, end_time, primary_book_id, secondary_book_id, contact_email, user_added_note, location) 
values (
    "Huntsville Sacred Harp Singing",
    '2025-05-03',
    null,
    '09:30:00',
    '14:30:00',
    1,
    null,
    "test@test.com",
    "Previous minutes at fasola.org",
    POINT(34.71942056886259, -86.53928298246798)
);
 
