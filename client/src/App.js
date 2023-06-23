import React, { Fragment } from 'react';
import './App.css';

//components

//const InputTodo = require("./components/InputTodo");
//use import rather than require
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodo";

function App() {
  return (
    <Fragment>
      <div className='container'>
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
