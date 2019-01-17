import React, { Component } from "react";
import API from "./api/API";

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    delete = () => {
        API.deleteToDo(this.props.id)
        .then(response =>{
            console.log(response);
            this.props.delete(this.props.id);
        })
    }

    render() {
        return(
            <div>
                <p><span>{this.props.number}<button type="button" onClick={this.delete}>X</button></span>{this.props.todo}</p>
            </div>
        )
    }

}

export default ToDo;