import React, { useEffect, useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Filter from './components/Filter';

const LOCAL_STORAGE_KEY = 'todos-app';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (stored?.length) {
      setTodos(stored);
    } else {
      fetch('https://dummyjson.com/todos?limit=5')
        .then(res => res.json())
        .then(data => {
          const initial = data.todos.map(todo => ({
            id: todo.id,
            text: todo.todo,
            completed: todo.completed
          }));
          setTodos(initial);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Todo List</h1>
      <AddTodo onAdd={handleAdd} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleComplete} onDelete={deleteTodo} />
    </div>
  );
};

export default App;
