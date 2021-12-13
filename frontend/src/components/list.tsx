import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../redux/taskDucks";
import Task from "../models/task";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  handleEdit: (id: string) => void;
}

const List: React.FC<Props> = ({ handleEdit }) => {
  const tasks = useSelector((store: any) => store.tasks.array);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);

  const onDelete = async (e: MouseEvent, id: string) => {
    e.preventDefault();
    await dispatch(deleteTask(id));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TableContainer sx={{ maxHeight: 621 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableHead>
          <TableBody>
            {!!tasks &&
              tasks.map((task: Task) => {
                return (
                  <TableRow key={task.taskItemId}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      <IconButton
                        title="delete"
                        onClick={(e: MouseEvent) =>
                          onDelete(e, task.taskItemId)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        title="Edit"
                        onClick={() => handleEdit(task.taskItemId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default List;
