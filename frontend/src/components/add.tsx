import { Box, Button, TextField, Typography, Checkbox } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Task from "../models/task";

interface Props {
  isEdit: boolean;
  handleAddOrEdit: (data: Task) => void;
  data: Task;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("The Title is required."),
  description: Yup.string().required("The Description is required."),
  priority: Yup.boolean(),
});

const Add: React.FC<Props> = ({ isEdit, handleAddOrEdit, data }) => {
  const handleSubmitOrEdit = (data: any, { resetForm }: any) => {
    handleAddOrEdit(data);
    resetForm({});
  };

  const initValue = () => {
    console.log(data);
    return {
      taskItemId: data.taskItemId,
      title: data.title,
      description: data.description,
      priority: data.priority,
      dateSave: data.dateSave,
    };
  };

  const formik = useFormik({
    initialValues: initValue(),
    validationSchema,
    onSubmit: handleSubmitOrEdit,
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" align="inherit">
            {isEdit ? "Edit Task" : "New Task"}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <TextField
                fullWidth
                id="title"
                name="title"
                size="small"
                label="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.errors.title && formik.touched.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
              <TextField
                fullWidth
                multiline
                label="Description"
                id="description"
                name="description"
                size="small"
                type="text"
                rows={5}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.errors.description && formik.touched.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
              <Typography variant="caption" align="inherit">
                Is priority
              </Typography>
              <Checkbox
                aria-label="priority"
                id="priority"
                name="priority"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.priority}
              />
              <Button fullWidth variant="contained" type="submit">
                {isEdit ? "Update" : "Add"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Add;
