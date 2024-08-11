import React, { useState } from "react";
import Task from "./Task";

const ToDoList = () => {
  const [newTask, setNewTask] = useState("");

  const [taskList, setTaskList] = useState([]);
  console.log(taskList.length);

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
              setTaskList([newTask, ...taskList]);
              setNewTask("");
            }
          }}
        />
        {taskList.map((tarea, indice) => (
          <Task
            task={tarea}
            key={indice}
            onRemove={() => {
              setTaskList(
                taskList.filter(
                  (_tarea, indiceABorrar) => indice != indiceABorrar
                )
              );
            }}
          />
        ))}
        <p className="border text-start ps-2 bg-light">
          {taskList.length > 0 && <div>{taskList.length} items left</div>}
          {taskList.length == 0 && <div>No more task! Time for a drink!</div>}
        </p>
      </div>
    </div>
  );
};

export default ToDoList;
