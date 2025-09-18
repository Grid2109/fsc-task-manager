import { useState } from "react";

import { Header } from "./Header";

export function Tasks() {
  const [taskName, setTaskName] = useState("teste");
  const [tasks, setTasks] = useState([
    { taskName: "Estudar React" },
    { taskName: "Estudar Node" },
    { taskName: "Estudar TypeScript" },
  ]);

  return (
    <div>
      <Header>
        <h1>Add Task</h1>
      </Header>
      <input
        type="text"
        placeholder="Create task..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button
        onClick={() => {
          setTasks([...tasks, { taskName }]);
          setTaskName("");
        }}
      >
        Add Task
      </button>
      <Header>
        <h1>My tasks</h1>
      </Header>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskName}>{task.taskName}</li>
        ))}
      </ul>
    </div>
  );
}
