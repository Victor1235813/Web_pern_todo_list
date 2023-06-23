const express = require('express');
const cors = require('cors');
const pool = require('./db.js');

const app = express();

const HOST = '127.0.0.1';
const PORT = '5000';

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method + ' @ ' + req.url);
    next();
});

//ROUTES//
//create a todo
app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]);
        //newTodo is a JSON file
        res.json(newTodo.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id; // *
        const {description} = req.body; // equivalent as *
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]);
        res.json(`todo id ${id} is updated!`);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", 
            [id]);
        res.json(`todo id ${id} is deleted!`);
    } catch (err) {
        console.error(err.message);
    }
});

//start the server
app.listen(PORT, HOST, (err) => {
    if (err) console.log(err.message);
    console.log(`Server is running at ${PORT} of ${HOST}...`);
});