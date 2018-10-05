import React, { Component } from 'react';


class FacultyList extends Component {
        
    render() { 
        let facultyList = this.props.faculty.map( (faculty, id) => {
            return (
                <li key={faculty._id} className="FacultyLink">
                    <button className="LinkButton" onClick={() => this.props.getInfo(id)}>
                    {`${faculty.FirstName} ${faculty.LastName}`}
                    </button>
                </li>
            );
        });
        return ( 
            <div>
                <ul className="FacultyList">
                    {facultyList}
                </ul>
            </div> 
         );
    }
}
 
export default FacultyList;