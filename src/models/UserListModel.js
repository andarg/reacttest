import { observable, computed, action } from "mobx";


import UserModel from "./UserModel";

class UserListModel {
  @observable todos = [];

  constructor(){
      this.todos = JSON.parse(localStorage.getItem('myCat'));
  }

  @action
  addItem(data) {
    this.todos.push(new UserModel(data));
    this.save()
  }

  @action
  updateItem(id, data) {
      this.todos[id] = (new UserModel(data));
      this.save()
    }

  @action
  delItem( id ) {
    this.todos.splice(id, 1);
    this.save()
  }

  save(){
      localStorage.setItem('myCat', JSON.stringify(this.todos));
  }
}

export default  new UserListModel();
