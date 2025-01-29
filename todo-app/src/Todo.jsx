export default function Todo(props) {
    const { todo, setTodos } = props;

    // Update Todo Status
    const updateTodo = async (todoId, currentStatus) => {
        const newStatus = !currentStatus;  // Toggle status

        const res = await fetch(`/api/todo/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: newStatus }),  // Send the new status
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await res.json();
        if (json.mssg === "Todo updated successfully") {  // Check if update is successful
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: newStatus };  // Update status in the state
                    }
                    return currentTodo;
                });
            });
        }
    };

    // Delete Todo
    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todo/${todoId}`, {
            method: "DELETE"
        });

        const json = await res.json();
        if (json.mssg === "Todo deleted successfully") {  // Check if delete is successful
            setTodos(currentTodos => {
                return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);  // Remove from state
            });
        }
    };

    return (
        <div className="todo">
            <p>{todo.todo}</p>
            <div className="mutations">
                <button
                    className="todo__status"
                    onClick={() => updateTodo(todo._id, todo.status)}  // Pass current status to toggle it
                >
                    {todo.status ? "☑" : "☐"}
                </button>
                <button
                    className="todo__delete"
                    onClick={() => deleteTodo(todo._id)}  // Call delete function
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}
