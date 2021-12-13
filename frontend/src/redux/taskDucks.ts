import Task from "../models/task";
import axios from "axios";

const dataInitial = {
  array: [],
  dataEdit: {},
};

const GET_TASK_SUCCESS = "GET_TASK_SUCCESS";
const GET_TASK_SUCCESS_ID = "GET_TASK_SUCCESS_ID";
const POST_TASK_SUCCESS = "POST_TASK_SUCCESS";
const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";

export default function taskReducer(state = dataInitial, action: any) {
  switch (action.type) {
    case GET_TASK_SUCCESS:
      return { ...state, array: action.payload };
    case GET_TASK_SUCCESS_ID:
      return { ...state, dataEdit: action.paiload };
    case POST_TASK_SUCCESS:
      return { ...state, array: action.payload };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        array: state.array.filter(
          (array: Task) => array.taskItemId !== action.payload
        ),
      };
    default:
      return state;
  }
}

export const getTask = () => async (dispatch: any) => {
  console.log(dispatch.type);
  try {
    const answer = await axios.get(process.env.REACT_APP_TASK_BASE_URL + "");
    dispatch({ type: GET_TASK_SUCCESS, payload: answer.data });
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const getTaskId = (id: string) => async (dispatch: any) => {
  console.log(dispatch.type);
  try {
    const answer = await axios.get(
      process.env.REACT_APP_TASK_BASE_URL + "/" + id
    );
    dispatch({ type: GET_TASK_SUCCESS_ID, payload: answer.data });
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const postTask = (newTask: Task) => async (dispatch: any) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TASK_BASE_URL + "",
      newTask
    );
    const answer = await axios.get(process.env.REACT_APP_TASK_BASE_URL + "");
    dispatch({ type: POST_TASK_SUCCESS, payload: answer.data });
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const deleteTask = (id: string) => async (dispatch: any) => {
  try {
    const answer = await axios.delete(
      process.env.REACT_APP_TASK_BASE_URL + "/" + id
    );
    dispatch({ type: DELETE_TASK_SUCCESS, payload: id });
  } catch (error) {
    console.log("Error: " + error);
  }
};
