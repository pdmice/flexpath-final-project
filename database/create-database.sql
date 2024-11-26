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


insert into users (username, password) values ('admin', '$2a$10$rdrt3j7YkAaVTQJcGnPX.ORrpMZ3ZXUMZqhfx0jR68vLaqB2jvsH2');
insert into roles (username, role) values ('admin', 'ADMIN');

insert into users (username, password) values ('user', '$2a$10$rdrt3j7YkAaVTQJcGnPX.ORrpMZ3ZXUMZqhfx0jR68vLaqB2jvsH2');
insert into roles (username, role) values ('user', 'USER');
