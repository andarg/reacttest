import { observable, computed, action } from "mobx";


import UserModel from "./UserModel";

class UserListModel {
  @observable todos = [];

  constructor(){
      // Retrieve the object from storage
      let todos = localStorage.getItem('myCat');
      console.log('tototdododss ---> ', todos)
      this.todos = JSON.parse(localStorage.getItem('myCat'));

  }

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }



  @action
  addItem(data) {
    this.todos.push(new UserModel(data));
      localStorage.setItem('myCat', JSON.stringify(this.todos));
  }

    @action
    updateUser(id, data) {
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
