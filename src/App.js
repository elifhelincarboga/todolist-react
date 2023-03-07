import './App.css';
import { useState, useMemo } from 'react';



function App() {

  const todoData = [
    {
      "done": true,
      "text": "Taste JavaScript"
    },
    {
      "text": "Code furiously",
      "done": true
    },
    {
      "text": "Promote Mavo",
      "done": false
    },
    {
      "text": "Give talks",
      "done": false
    },
    {
      "text": "Write tutorials",
      "done": true
    },
    {
      "text": "Have a life!",
      "done": false
    },
  ]

  const [todos, setTodo] = useState(todoData)
  const [currentStatus, setStatus] = useState('All')
  const [newTodo, setNewTodo] = useState('')

  function handleChecked(e, todo) {
    let todosTemp = [ ...todos ]
    let item = todosTemp.find(item => item.text === todo.text)
    item.done = e.target.checked
    setTodo(todosTemp)
  }

  function handleClick(todo) {
    let todosTemp = [ ...todos ]
    let index = todosTemp.findIndex(item => item.text === todo.text)
    delete todosTemp[index]
    setTodo(todosTemp)
  }

  function allCompleted () {
    let todosTemp = [ ...todos ]
    for (let i = 0; i < todosTemp.length; i++) {
      if (todosTemp[i].done===true){
        delete todosTemp[i]
      }    
    }
    setTodo(todosTemp)
  }

  function changeStatus (status) {
    setStatus(status)
  }

  function handleSubmit () {
    let todosTemp = [ ...todos ]
    todosTemp.push({
      text: newTodo,
      done: false
    })
    setTodo(todosTemp)
    setNewTodo('')
  }

  const activeTodoCount = useMemo(() => todos.filter(i => i.done === false)?.length, [todos])

  const filterTodo = useMemo(() => {
    if (currentStatus === 'Completed') {
      return todos.filter(i => i.done === true)
    }else if (currentStatus === 'Active') {
      return todos.filter(i=> i.done === false)
    }
    return todos
  }, [todos, currentStatus])

  return (
    <div>
      <section className="todoapp">
	      <header className="header">
		      <h1>todos</h1>
		      <form onSubmit={handleSubmit}>
			      <input className="new-todo" placeholder="What needs to be done?" autoFocus value={newTodo} onChange={e => setNewTodo(e.target.value)} />
		      </form>
	      </header>
	
	      <section className="main">
		      <input className="toggle-all" type="checkbox" />
		      <label htmlFor="toggle-all">
			      Mark all as complete
		      </label>

		      <ul className="todo-list">
			      {
              filterTodo.map((todo, index) =>
                <li key={index} className={todo.done ? 'completed' : ''}>
                  <div className="view">
                    <input onClick={event => handleChecked(event, todo)} className="toggle" type="checkbox" checked={todo.done} />
                    <label>{todo.text}</label>
                    <button onClick={event => handleClick(todo)} className="destroy"></button>
                  </div>
                </li>
              )
            }
		      </ul>
	      </section>
    
	      <footer className="footer">
	      	<span className="todo-count">
            <strong>{activeTodoCount} </strong>
	      		items left
	      	</span>

	      	<ul className="filters">
	      		<li onClick={e => changeStatus('All')}>
	      			<a href="#/" className={currentStatus === 'All' ? 'selected' : ''}>All</a>
	      		</li>
	      		<li onClick={e => changeStatus('Active')}>
	      			<a href="#/" className={currentStatus === 'Active' ? 'selected' : ''}>Active</a>
	      		</li>
	      		<li onClick={e => changeStatus('Completed')}>
	      			<a href="#/" className={currentStatus === 'Completed' ? 'selected' : ''}>Completed</a>
	      		</li>
	      	</ul>

	      	<button onClick={allCompleted} className="clear-completed">
	      		Clear completed
	      	</button>
	      </footer>
      </section>
    
      <footer className="info">
	      <p>Click to edit a todo</p>
	      <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
	      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>

  );
}
export default App;
