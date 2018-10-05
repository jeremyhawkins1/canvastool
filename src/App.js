import React, { Component } from 'react';
import axios from 'axios';
import parseLinkHeader from 'parse-link-header';

import InfoPanel from './components/InfoPanel';
import FacultyList from './components/FacultyList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            'sources': {
                'faculty': 'https://online-03.hccs.edu/apps/canvas/faculty',
                'canvas-fac': 'https://cors-anywhere.herokuapp.com/https://hccs.test.instructure.com/api/v1/accounts/1/users',
                'key': process.env.CANVAS_TOKEN
            },
            'page': 1,
            'limit': 10,
            'faculty': [],
            'selected': null
         }
         this.loadPage = this.loadPage.bind(this);
         this.loadInfo = this.loadInfo.bind(this);
         this.getCanvasInfo = this.getCanvasInfo.bind(this);
         this.getClasses = this.getClasses.bind(this);
         this.newClassPage = this.newClassPage.bind(this);
    }

    componentDidMount() {
        this.getFaculty(this.state.page, this.state.limit);
    }

    getClasses(limitparam) {
        console.log(limitparam);
        axios.get(`https://cors-anywhere.herokuapp.com/https://hccs.test.instructure.com/api/v1/users/${this.state.faculty[this.state.selected].canvasid}/courses`,
            {
                headers: {
                    "Authorization": "Bearer "+this.state.sources.key
                },
                params: {
                    state: limitparam
                }
            })
            .then((response) => {
                let linkHeaders = parseLinkHeader(response.headers.link);
                this.setState({
                    pagectl: linkHeaders,
                    classes: response.data
                });                
            })
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });
    }

    newClassPage(which) {
        axios.get(`https://cors-anywhere.herokuapp.com/${this.state.pagectl[which].url}`,
            {
                headers: {
                    "Authorization": "Bearer "+this.state.sources.key
                }
            })
            .then((response) => {
                let linkHeaders = parseLinkHeader(response.headers.link);
                this.setState({
                    pagectl: linkHeaders,
                    classes: response.data
                });                
            })
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });
    }

    getFaculty(page = 1, limit = 10){
        axios.get(this.state.sources.faculty,{
            params: {
                page: page,
                perpage: limit
            }
        }).then((response) => {
            console.log("Returned Data is: ",response.data);
            this.setState({
                'faculty': response.data
            });
        }).catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }

    loadPage(page) {
        this.setState({'page': page});
        console.log("Getting page: ",page);
        this.getFaculty(page, this.state.limit);
    }
    loadInfo(id){
        this.setState({'selected': id});
    }
    getCanvasInfo(term){
        console.log(`Looking up ${term} from Canvas`);
        axios.get(this.state.sources["canvas-fac"],{
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer ' + this.state.sources.key
            },
            params: {
                search_term: term
            }
        })
        .then(
            (response) => {
                this.setState({
                    'canvasid': response.data[0].id
                });
                console.log("Setting ID to: ",response.data[0].id);
            }
        )
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }

    render() { 
        let next = this.state.page + 1;
        let prev = this.state.page == 1 ? 1 : this.state.page - 1;
        let selected = this.state.selected;
        
        return ( 
                <div>
                    <h3>Faculty List:<small> Page {this.state.page}</small></h3>
                    <FacultyList faculty={this.state.faculty} getInfo={this.loadInfo} />
                    <div className="PageControls">
                        <button onClick={() => this.loadPage(1)}>
                            First
                        </button>
                        <button onClick={() => this.loadPage(prev)}>
                            Back
                        </button>
                        <button onClick={() => this.loadPage(next)}>
                            Forward
                        </button>
                    </div>
                    <InfoPanel 
                        faculty={this.state.faculty[selected]} 
                        classes={this.state.classes} 
                        getClasses={this.getClasses} 
                        newPage={this.newClassPage}
                    />
                </div>       
         );
    }
}
 
export default App;