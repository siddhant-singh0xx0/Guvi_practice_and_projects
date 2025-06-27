import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.completed === (filter === "completed"));

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask.trim(), completed: false }]);
    setNewTask("");
    inputRef.current?.focus();
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index, newText) => {
    if (newText.trim() === "") return;
    const updated = [...tasks];
    updated[index].text = newText.trim();
    setTasks(updated);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Daily Planner</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <InputGroup>
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder="Enter a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Add
              </Button>
            </InputGroup>
          </Form>

          <ButtonGroup className="w-100 my-3">
            <Button
              variant={filter === "all" ? "dark" : "outline-dark"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "dark" : "outline-dark"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
            <Button
              variant={filter === "incomplete" ? "dark" : "outline-dark"}
              onClick={() => setFilter("incomplete")}
            >
              Incomplete
            </Button>
          </ButtonGroup>

          <ListGroup>
            {filteredTasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                index={index}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

function TaskItem({ task, index, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
      <div className="flex-grow-1 me-3">
        {isEditing ? (
          <Form.Control
            type="text"
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => {
              editTask(index, editText);
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editTask(index, editText);
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
          </span>
        )}
      </div>
      <div className="mt-2 mt-md-0 d-flex flex-wrap gap-2">
        <Button
          variant={task.completed ? "secondary" : "success"}
          size="sm"
          onClick={() => toggleTask(index)}
        >
          {task.completed ? "Undo" : "Complete"}
        </Button>
        <Button
          variant="warning"
          size="sm"
          onClick={() => {
            setEditText(task.text);
            setIsEditing(true);
          }}
        >
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => deleteTask(index)}>
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}

export default App;
