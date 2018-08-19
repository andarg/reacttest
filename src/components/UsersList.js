import React, { Component } from "react";
import { observer } from "mobx-react";
import Ctr from '../models/ModalController'

@observer
class UsersList extends React.Component {


    deleteUser( i ){
        const r = window.confirm("Удалить пользователя?");
        if(r === true){
            this.props.store.delItem(i)
        }
    }

    render() {
        return (
            <div>
                <a id='addUserBtn' className="btn-floating btn-large waves-effect waves-light green" onClick={Ctr.open.bind(Ctr)}><i className="material-icons">person_add</i></a>
                <ul className="collection">
                    {this.props.store.todos.map((todo, i) => (

                        <li className="collection-item avatar" key={"user_key"+i}>
                            <i className="material-icons circle  blue lighten-1 ">person</i>
                            <span className="title">{todo.fio}</span>
                        <p>
                            <i className="material-icons prefix small">date_range</i> Дата рождения  <b>{todo.birthday}</b><br/>
                            <i className="material-icons prefix">location_on</i> Адрес <b>{todo.addres}</b><br/>
                            <i className="material-icons prefix">location_city</i> Город <b>{todo.city}</b><br/>
                            <i className="material-icons prefix">phone</i> Телефон <b>{todo.phone}</b><br/>
                        </p>
                            <span className="secondary-content" >
                        <a href="#!" onClick={()=>{Ctr.editUser(i)}}><i className="material-icons">edit</i></a><br/>
                        <a href="#!" onClick={()=>this.deleteUser( i )}><i className="material-icons">delete_forever</i></a>

                                </span>
                        </li>

                    ))}

                </ul>
            </div>
        );
    }
}

export default UsersList;
