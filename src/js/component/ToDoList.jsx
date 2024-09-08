import React, { useState,useEffect } from "react";
import Task from "./Task";

const ToDoList = () => {
  const [newTask, setNewTask] = useState("");

  const [taskList, setTaskList] = useState([]);

const loadTasks = async () => {
  const response = await fetch('https://playground.4geeks.com/todo/users/TiToCirkus');
  if (response.ok) {
        
        const data = await response.json();
        setTaskList(data.todos)
        return data;
    } else {
        createUser()
        console.log('error: ', response.status, response.statusText);
        /* Handle the error returned by the HTTP request */
        return {error: {status: response.status, statusText: response.statusText}};
    };
};

const addNewTask = async() =>{
    const response = await fetch('https://playground.4geeks.com/todo/todos/TiToCirkus', {
        method: 'POST',
        body: JSON.stringify({
            label: newTask,
            is_done: false
          }), 
        headers: {
           'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        setNewTask("")
        loadTasks()    
    }

};
const deleteTask = async(id) =>{
    const response = await fetch('https://playground.4geeks.com/todo/todos/'+ id, {
        method: 'DELETE',
  
    });
    if (response.ok) {
      loadTasks()
    }
};

const deleteUser = async ()=>{
    const response = await fetch('https://playground.4geeks.com/todo/users/TiToCirkus', {
        method: 'DELETE',
  
    });
    setTaskList("");
}

const deleteList = async () =>{
    for(let i = 0; i < taskList.length; i++){
        deleteTask(taskList[i].id)
    }
}
  useEffect(()=>{
    loadTasks()
  },[]);
  return (
    <div className="container ">
      <p className="my-4 colorLetras ">todos</p>
      <div className="shadow-lg">
        <input
          type="text"
          style={{
            width: "100%",
            height: "75px",
            padding: "0px 100px 0px 150px",
          }}
          className="border fs-2 "
          value={newTask}
          placeholder="What do you want to do next?"
          onChange={(event) => setNewTask(event.target.value)}
          onKeyUp={(event) => {
            if (event.key == "Enter") {
              addNewTask()
            }
          }}
        />
        {taskList.map((tarea, indice) => (
          <Task
            task={tarea}
            key={indice}
            onRemove={() => {
            deleteTask(tarea.id)
            }}
          />
        ))}
        <p className="border text-start ps-2 bg-light">
          {taskList.length > 0 && <div>{taskList.length} items left</div>}
          {taskList.length == 0 && <div>No more task! Time for a drink!</div>}
        </p>
       
      </div>
      <button style={{
            border: "none",
          }} 
          onClick={()=>{
            deleteUser();
           }}>Borrar Usuario
           </button>

           <button style={{
            border: "none",
          }} 
          onClick={()=>{
            deleteList();
           }}>Borrar Lista
           </button>
    </div>
  );
};

export default ToDoList;
