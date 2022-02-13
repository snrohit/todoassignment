import React from "react";

import {Input, Button} from "@material-ui/core";

const AddTodoForm = ({ addTask }) => {
    const [task, setTask] = React.useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (task !== "") {
            addTask(task);
            setTask("");
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex" }}>
            <Input
                placeholder="Enter your todo task"
                inputProps={{
                    "aria-label": "Description"
                }}
                value={task}
                onChange={(e) => { setTask(e.target.value) }}
                style={{ width: "90%" }}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "10%" }}
            >
                Add
            </Button>
        </form>
    );

}

export default AddTodoForm;
