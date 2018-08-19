import { observable, computed, action } from "mobx";


import UserModel from "./UserModel";

class UserListModel {
  @observable todos = [];

  constructor(){
      // Retrieve the object from storage
      let todos = localStorage.getItem('myCat');
      this.todos = JSON.parse(localStorage.getItem('myCat'));

  }

  @action
  addItem(data) {
    this.todos.push(new UserModel(data));
      localStorage.setItem('myCat', JSON.stringify(this.todos));
  }

    @action
    updateItem(id, data) {
        this.todos[id] = (new UserModel(data));
        localStorage.setItem('myCat', JSON.stringify(this.todos));
    }
  @action
  delItem( id ) {
    this.todos.splice(id, 1);
      localStorage.setItem('myCat', JSON.stringify(this.todos));
  }
}

export default  new UserListModel();
