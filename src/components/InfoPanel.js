import React, { Component } from 'react';


class InfoPanel extends Component {
    
   
    render() { 
        let classes;
        if (this.props.classes){
            classes = this.props.classes.map((item, id) => {
                return (
                    <li key={id} 
                      className={(item.workflow_state == "unpublished" ? "Alert" : "Ok")}>
                        {item.course_code}  {item.workflow_state}
                    </li>
                );
            });
        } else {
            classes = <li>No Courses Loaded</li>;
        }
        if (this.props.faculty == null) {
            return (
                <div>
                    <p>Select Faculty Member</p>
                </div>
            );
        } else {
            return ( 
                <div>
                    <h1>{`${this.props.faculty.FirstName} ${this.props.faculty.LastName}`}</h1>
                    Email: {this.props.faculty.email}<br/>
                    Canvas ID: ({this.props.faculty.canvasid})
                    <button onClick={() => this.props.getId(this.props.faculty.email)}>
                        Get Canvas ID
                    </button><br/>
                    <button onClick={() => this.props.getClasses("")}>
                        Show All Classes
                    </button>
                    <button onClick={() => this.props.getClasses("unpublished")}>
                        Show UnPublished Classes
                    </button><br/>
                    <ul>
                        {classes}
                    </ul>
                    <button onClick={() => this.props.newPage("first")}>
                        First
                    </button>
                    <button onClick={() => this.props.newPage("next")}>
                        Next
                    </button>
                    <button onClick={() => this.props.newPage("last")}>
                        Last
                    </button>
                </div>
             );
        }
        
    }
}
 
export default InfoPanel;