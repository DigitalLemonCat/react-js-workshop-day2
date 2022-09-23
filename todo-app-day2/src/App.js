import React, { useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();                             //żeby się strona nie odświeżała po kliknięciu w Go

    if (editId) {
       const editTodo = todos.find((i) => i.id === editId);
       const updatedTodos = todos.map((t) => t.id === editTodo.id ? (
        t = { id: t.id, todo }) : { id: t.id, todo: t.todo }
       );
    setTodos(updatedTodos);
    setEditId(0);
    setTodo('');
    return;
    }

  if (todo !== '') {
     setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]) //operator spread rozsyłania/rozprzestrzeniania...zajmuje wszystkie czynnosci które już były w środku  inaczej mówiąć pozwala nam szybko skopiować całość lub część istniejącej tablicy lub obiektu do innej tablicy lub obiektu.
     setTodo('');
  }
};

const handleDelete = (id) => {
  const delTodo = todos.filter((to) => to.id !== id);
  setTodos([...delTodo]);
};

const handleEdit = (id) => {
      const editTodo = todos.find((i) => i.id === id );
      setTodo(editTodo.todo);
      setEditId(id);
}


//map i filter const arr = [1, 2, 3, 4, 5];
{/*
const arr = [
  {
    id: 1,
    name: 'a',
  },
  {
    id: 2,
    name: 'b',
  },
];

*/}

  return (
    <div className="App">
  
     {/*
      {
      arr.map((num) => (              
        <div>{num} ,</div>
      ))}  
      */}
     {/*
      {
      arr.filter((num) => ( num!==3 ))
      }
       */}
  {/*  
    {arr.map((num) => {               //jak nawias klamrowy to dodać return jak nawias okrągły to bez
        return <div key={num.id}>{num.name}</div>;
      })}  
        */}
        <div className='container'>
           <h1>Todo List App</h1>
               <TodoForm handleSubmit={handleSubmit} todo={todo} editId={editId} setTodo={setTodo}  />
               <TodoList todos={todos} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    </div>  
  );
};

export default App;

