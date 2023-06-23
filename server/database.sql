/*not related with other files, only to record the database information*/
CREATE DATABASE pretodo;

CREATE TABLE todo{
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
};
