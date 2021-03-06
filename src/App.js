import React, { Component } from 'react';
import './App.css';
import ViewUser from "./components/ViewUser";
import {getUsers, deleteUser, updateUser} from "./Api/Users";
import UsersForm from "./components/UsersForm";

class App extends Component {

  state = {
    users: [],
    user: {}
  }

  componentDidMount =()=>{
    getUsers().then(response => {
      this.setState({
        users: response.data
      });
    })
    .catch(error=>{
      alert('حدث خطأ غير معروف');
    });
  }

  setActive = (user) => {
    this.setState({'user': user});
  }

  deleteUser = (user) => {
    // delete from server
    deleteUser(user.id)
      .then(()=>{
        // delete from state
        let users = this.state.users;
        const index = users.indexOf(user);
        users.splice(index, 1);
        this.setState({users});
      })
      .catch(error=>{
        alert('حدث خطأ غير معروف');
      });
  }

  updateUser = (values)=>{
    const id = this.state.user.id;
    updateUser(id, values)
      .then(()=>{
        alert('Success');
      })
      .catch(error=>{
        alert('حدث خطأ غير معروف');
      });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.users.map(user=>
            <li key={user.id}>
              <p>{user.name} {' '}</p>
              <button className="active" onClick={()=>this.setActive(user)}>View</button>
              <button className="delete" onClick={()=>this.deleteUser(user)}>Delete</button>
            </li>
          )}
        </ul>
        <div className="details">
          <h3>User Details</h3>
          {this.state.user.id > 0 ? 
            <ViewUser user={this.state.user} />
            : 'please select a user'
          }
        </div>

        <div className="edit">
          <h3>Edit User</h3>
          {this.state.user.id > 0 ? 
            <UsersForm 
              values={this.state.user} 
              onSubmit={this.updateUser}/>
            : 'please select a user'
          }
        </div>
      </div>
    );
  }
}

export default App;
