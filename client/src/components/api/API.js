import axios from "axios";

export default {
    searchToDos: user => {
        console.log(user);
        return axios.get(`/api/list/${user}`);
    },
    addToDo: todo => {
        console.log(todo);
        return axios.post("/api/todo/",{todo});
    },
    deleteToDo: todo => {
        const ID = todo;
        return axios.delete(`/api/todo/${ID}`)
    }
  };