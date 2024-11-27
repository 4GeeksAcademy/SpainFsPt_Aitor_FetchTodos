import React from "react";
import { useEffect, useState } from "react";


const Home = () => {


/*Variables*/

const url = 'https://playground.4geeks.com/todo'
const [userData, setUserData] = useState([])
const [task, setTask] = useState('')
const handleSubmit = e => {
	e.preventDefault();
	createTask();
}
const [userName, setUserName] = useState('');

/*Creación de usuario*/

const crearUsuario= async () => {
	try{
		const resp = await fetch(`${url}/users/${userName}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if(!resp.ok) throw new Error ('Algo ha ido mal!')
		const data = await resp.json()
		console.log(data)
	} catch (error) {
		console.error(error)
	}

}


/*Traer tareas*/

const getUserData= async () => {
	try{
		const resp = await fetch(`${url}/users/${userName}`);
		if(!resp.ok) throw new Error ('Algo ha ido mal!')
		const data = await resp.json()
		setUserData(data);
	} catch (error) {
		console.error(error)
	}

}

/*Crear tareas*/

const createTask= async () => {
	try{
		const resp = await fetch(`${url}/todos/${userName}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label: task,
				is_done: false
			})
		});
		if(!resp.ok) throw new Error ('Algo ha ido mal!')
		const data = await resp.json()
		getUserData();
		setTask('')
	} catch (error) {
		console.error(error)
	}

}

/*Eliminar tareas*/

const handleDelete= async (id) => {
	try{
		const resp = await fetch(`${url}/todos/${id}`, {
			method: 'DELETE'
		});
		if(!resp.ok) throw new Error ('Algo ha ido mal!')
		getUserData();
	} catch (error) {
		console.error(error)
	}

}



	return (
		<div className="container text-center">

			<form onSubmit={e=>e.preventDefault()}>
				<input type="text" placeholder="Who are you?" value={userName} onChange={e=>setUserName(e.target.value)} required/>
			</form>

			<div className="my-3">
				{userName ?
				<>
					<h2>
						Welcome {userName}
					</h2>
					<button className="btn" onClick={crearUsuario}>Create user</button>
					<button className="btn" onClick={getUserData}>Check tasks</button>
				</>
					: ''}
			</div>

			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Add a new task" value={task} onChange={e=>setTask(e.target.value)} required/>
			</form>

			<ul>
				{userData.todos?.map(el=> <li key={el.id}>{el.label} <span className="fa-solid fa-x" onClick={e=>handleDelete(el.id)}></span></li>)}
			</ul>
		</div>
	);
};

export default Home;
