import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import UsersList from "./components/UsersList";

import store from "./models/UserListModel";
import EditModal from './components/Modal'
import  Ctr from  './models/ModalController'


render(
  <div>
    <DevTools />
    <UsersList store={store} />
    <EditModal ctr={Ctr}  />

  </div>,
  document.getElementById("root")
);

//store.addTodo({fio:"Ася"});
//store.addTodo({fio:"Вася"});
//store.todos[0].finished = true;

setTimeout(() => {
 // store.addTodo({fio:"Гурген"});
}, 2000);

// playing around in the console
window.store = store;
