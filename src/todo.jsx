import React from "react";

import AddTodoForm from "./AddToDoFrom";
import Search from "./Search";

import { List, ListItem, makeStyles, Divider, Box, ListItemText, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Star, StarBorder, Delete } from "@material-ui/icons";
import { useConfirm } from "material-ui-confirm";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    item: {
        padding: theme.spacing(1.2)
    },
    avatar: { marginRight: theme.spacing(5) },
    paginator: {
        justifyContent: "center",
        padding: "10px"
    }
}));

const ToDo = (props) => {
    const classes = useStyles();
    const itemsPerPage = 4;
    const [id, setId] = React.useState(100);
    const [page, setPage] = React.useState(1);
    const [task, setTask] = React.useState(todoList);
    const [searchInput, setSearchInput] = React.useState("");
    const [noOfPages, setNoOfPages] = React.useState(
        Math.ceil((task.length / itemsPerPage))
    );
    const confirm = useConfirm();

    const pagination = React.useCallback(() => {
        setNoOfPages(Math.ceil(task.filter(e => e.task.includes(searchInput)).length / itemsPerPage));
    }, [task, searchInput])

    const sortFavourite = () => {
        setTask(task => task.sort((a, b) => a.isFavourite - b.isFavourite).reverse())
    }

    React.useEffect(() => {
        pagination()
        sortFavourite()
    }, [task, pagination])

    React.useEffect(() => {
        setTask(todoList)
        sortFavourite();
    }, [])

    React.useEffect(() => {
        pagination();
        sortFavourite()
    }, [searchInput, pagination])


    const deleteTask = (id) => {
        confirm({ description: `This task will permanently deleted.` })
            .then(() => setTask(task => task.filter(item => item.id !== id)))
            .catch(() => console.log("Deletion cancelled."));
    }


    const setFavourite = (state, id) => {
        setTask(task =>
            task.map(item =>
                item.id === id
                    ? { ...item, isFavourite: state }
                    : item
            ))
        sortFavourite();
    }

    const incrementId = () => {
        let count = id + 1;
        setId(count);
    }

    const addTask = (data) => {
        incrementId();
        const obj = {
            id: id,
            task: data,
            isFavourite: false
        }
        setTask(task => [...task, obj]);
    }

    const search = (input) => {
        setSearchInput(input);
        setPage(1);
        pagination()
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography>To Do List</Typography>
            <Search searchInput={search} />
            <List dense compoent="span">
                {task && task
                    .filter(e => e.task.toLowerCase().includes(searchInput.toLowerCase()))
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((e, index) => {
                        const labelId = `list-secondary-label-${e.task}`;
                        return (
                            <ListItem
                                key={e.id}
                                button
                            >
                                <ListItemText
                                    id={labelId}
                                    primary={e.task}
                                    className={classes.item}
                                />
                                {e.isFavourite ?
                                    <Star onClick={(event) => setFavourite(false, e.id)} />
                                    :
                                    <StarBorder onClick={(event) => setFavourite(true, e.id)} />
                                }
                                <Delete onClick={(event) => { deleteTask(e.id) }} />
                            </ListItem>
                        );
                    })}
            </List>
            <AddTodoForm addTask={addTask} />
            <Divider />
            <Box component="span">
                <Pagination
                    count={noOfPages}
                    page={page}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    showFirstButton
                    onChange={handleChange}
                    showLastButton
                    classes={{ ul: classes.paginator }}
                />
            </Box>



        </div>
    );
};

export default ToDo;

const todoList = [
    {
        id: 1,
        task: "Feed Dog",
        isFavourite: true
    },
    {
        id: 2,
        task: "Call parents",
        isFavourite: true
    },
    {
        id: 3,
        task: "Buy a new gaming Laptop",
        isFavourite: false
    }
];
