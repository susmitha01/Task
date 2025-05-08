import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Filter from './Filter';

const LOCAL_STORAGE_KEY = 'todos';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // ✅ Load from localStorage OR fallback to dummyjson.com
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (stored) {
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

  // ✅ Save todos to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo =>
    filter === 'all'
      ? true
      : filter === 'completed'
      ? todo.completed
      : !todo.completed
  );

  return (
    <div className="todo-container">
      <h2>📝 To-Do App</h2>
      <AddTodo addTodo={addTodo} />
      <Filter setFilter={setFilter} current={filter} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;