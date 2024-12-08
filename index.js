const fs = require("fs");
const filePath = "D:\\web\\Backend\\Task Tracker CLI\\task.json";

function initializeJsonFile() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 0), "utf8");
    return;
  }
  return;
}

const listTasks = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);
    console.log(JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const addTask = (task) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);

    const now = new Date();
    const isoTime = now.toISOString().slice(0, 19);
    const newTask = {
      id: tasks.length + 1,
      description: task,
      status: "todo",
      createdAt: isoTime,
      updatedAt: isoTime,
    };
    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
  } catch (error) {
    console.log(error);
    return;
  }
};

const deleteTask = (taskId) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex === -1) {
      console.log(`Don't found task with ID: ${taskId}`);
      return;
    }
    tasks.forEach((task) => {
      if (task.id > taskId) {
        task.id -= 1;
      }
    });
    tasks.splice(taskIndex, 1);

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
  } catch (error) {
    console.log(error);
    return;
  }
};

const updateTask = (taskId, taskDescription) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex === -1) {
      console.log(`Don't found task with ID: ${taskId}`);
      return;
    }
    const now = new Date();
    const isoTime = now.toISOString().slice(0, 19);
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      description: taskDescription,
      updatedAt: isoTime,
    };

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
  } catch (error) {
    console.log(error);
    return;
  }
};

const markTaskInProgress = (taskId) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex === -1) {
      console.log(`Don't found task with ID: ${taskId}`);
      return;
    }
    const now = new Date();
    const isoTime = now.toISOString().slice(0, 19);
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: "in-progress",
      updatedAt: isoTime,
    };

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
  } catch (error) {
    console.log(error);
  }
};

const markTaskDone = (taskId) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex === -1) {
      console.log(`Don't found task with ID: ${taskId}`);
      return;
    }

    const now = new Date();
    const isoTime = now.toISOString().slice(0, 19);
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      status: "done",
      updatedAt: isoTime,
    };

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
  } catch (error) {
    console.log(error);
  }
};

const listTasksDone = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);
    let doneTasks = tasks.filter((task) => task.status === "done");
    doneTasks = JSON.stringify(doneTasks, null, 2);
    console.log(doneTasks);
  } catch (error) {
    console.log(error);
  }
};

const listTasksToDo = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);
    let toDoTasks = tasks.filter((task) => task.status === "todo");
    toDoTasks = JSON.stringify(toDoTasks, null, 2);
    console.log(toDoTasks);
  } catch (error) {
    console.log(error);
  }
};

const listTasksInProgress = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);
    let inProgressTasks = tasks.filter((task) => task.status === "in-progress");
    inProgressTasks = JSON.stringify(inProgressTasks, null, 2);
    console.log(inProgressTasks);
  } catch (error) {
    console.log(error);
  }
};

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "list":
    initializeJsonFile();
    if (args.length === 1) {
      listTasks();
    } else {
      if (args[1] === "done") {
        listTasksDone();
      } else if (args[1] === "todo") {
        listTasksToDo();
      } else if (args[1] === "in-progress") {
        listTasksInProgress();
      }
    }
    break;
  case "add":
    initializeJsonFile();
    addTask(args[1]);
    break;
  case "update":
    initializeJsonFile();
    updateTask(args[1], args[2]);
    break;
  case "delete":
    initializeJsonFile();
    deleteTask(args[1]);
    break;
  case "mark-done":
    initializeJsonFile();
    markTaskDone(args[1]);
    break;
  case "mark-in-progress":
    initializeJsonFile();
    markTaskInProgress(args[1]);
    break;
  default:
    console.log("Invalid command");
    break;
}
