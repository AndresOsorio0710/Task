import { Box, Grid } from "@mui/material";
import List from "./list";
import React, { useState} from "react";
import { Routes, Route } from "react-router-dom";
import Add from "./add";
import Edit from "./edit";
import Task from "./../models/task";
import { useDispatch, useSelector } from "react-redux";
import { getTaskId, postTask } from "../redux/taskDucks";

const Master = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dataEdit = useSelector((store: any) => store.tasks.dataEdit);

  const [data, setData] = useState<Task>({
    taskItemId: "",
    title: "",
    description: "",
    priority: false,
    dateSave: new Date(),
  });

  const clearData = () => {
    setData({
      taskItemId: "",
      title: "",
      description: "",
      priority: false,
      dateSave: new Date(),
    });
  };

  const handleEdit = async (id: string) => {
    setIsEdit(true);
    await dispatch(getTaskId(id));
  };

  const handleAddOrEdit = async (data: Task) => {
    if (!isEdit) {
      await dispatch(postTask(data));
    } else {
      console.log("Edit");
    }
    clearData();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} xl={3}>
          <Routes>
            {isEdit ? (
              <Route
                path="/"
                element={
                  <Add
                    isEdit={isEdit}
                    handleAddOrEdit={handleAddOrEdit}
                    data={dataEdit}
                  />
                }
              />
            ) : (
              <Route
                path="/"
                element={
                  <Add
                    isEdit={isEdit}
                    handleAddOrEdit={handleAddOrEdit}
                    data={data}
                  />
                }
              />
            )}
            <Route path="/:id" element={<Edit />} />
          </Routes>
        </Grid>
        <Grid item xs={12} md={6} xl={9}>
          <List handleEdit={handleEdit} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Master;
