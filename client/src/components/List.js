import React, { Component } from "react";
import ToDo from "./ToDo";
import users from "../users.json";
import API from "./api/API";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: users,
            select: "Brian",
            todo: "",
            list: []
        }
    }

    delete = key => {
        const filtered = this.state.list.filter(todo => todo._id !== key);
        this.setState({list: filtered});
    }

    handleChange = async event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
    
        // Set the state for the appropriate input field
        await this.setState({
          [name]: value
        });
        this.searchAPI();
      };

    searchAPI = () => {
        API.searchToDos(this.state.select)
        .then(response => {
            console.log(response);
            console.log(response.data);
            if(response.data.length === 0) {
                this.setState({list: []});
            }else {
                this.setState({list: response.data});
            }
            
        });
    }
/*     function normalize(things) {
        return arrayOfThings.map(item => {
            return {
                stuff
            }
        })
    } */
    
    addToDo = event => {
        event.preventDefault();
        const ToDo = {user: this.state.select,todo: this.state.todo};
        API.addToDo(ToDo)
        .then(result => {
            const newList = this.state.list;
            newList.push(result.data);
            this.setState({list: newList})
            this.setState({todo: ""})
        })
    }  

    componentDidMount () {
        this.searchAPI();
    }

    render() {
        return(
            <div>
                <label>
                    Choose a User:
                    <select value={this.state.select} onChange={this.handleChange} name="select" className="form-control">
                        {this.state.users.map(user => (
                            <option value={user}>{user}</option>
                        ))}
                    </select>
                </label>
                <form className="form-inline">
                    <input type="text" value={this.state.todo} onChange={this.handleChange} name="todo" className="mb-2" placeholder="Type a book title or subject to search!" />
                    <button type="submit" className="btn btn-success mb-2" onClick={this.addToDo}>Add a ToDo</button>
                </form>
                <div>
                    <h2>ToDo List for {this.state.select}</h2>
                    <br />
                    {this.state.list.map((todo, index) => (
                        <ToDo 
                        key={todo._id}
                        todo={todo.todo}
                        id={todo._id}
                        number={index + 1}
                        delete={this.delete}

                        />

                    ))}
                </div>
            </div>
        )
    }


}

export default List;