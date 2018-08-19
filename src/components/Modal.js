import React, { Component } from "react";
import { observer } from "mobx-react";
import Modal from 'react-modal';
import 'jquery-mask-plugin';
import $ from 'jquery'
import store from "../models/UserListModel";

Modal.setAppElement('#root');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

@observer
class EditModal extends React.Component {
    constructor() {
        super();

        this.state  = {name:"", year:""}
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }



    afterOpenModal() {
        if(this.props.ctr.userId!=null){
            let user = store.todos[this.props.ctr.userId]

            let [year,month,day] = user.birthday.split('-')

            console.log(year,month,day, user.birthday )
            this.setState({
                name: user.fio,
                phone: user.phone,
                addres: user.addres,
                city: user.city,
                year: year,
                month: month,
                day: day,
            })




            this.props.ctr.name = user.fio
            this.props.ctr.phone =  user.phone
            this.props.ctr.year =  year
            this.props.ctr.month =  month
            this.props.ctr.day =  day

        }

        $("#addUserBtn").hide();

        setTimeout(()=>{

        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});

        }, 100)
        M.updateTextFields();
        M.CharacterCounter.init($('input#icon_prefix'))

        $('#icon_telephone').mask("+7(999) 999-99-99", {

        });






    }

    closeModal() {
        $("#addUserBtn").show();
        this.setState({
            name: "",
            phone: "",
            addres: "",
            city: "",
            year: "",
            month: "",
            day: ""
        })

        this.props.ctr.close()
    }

    nameChangeHandler(e){
        this.setState({name: e.target.value})
        this.props.ctr.name=e.target.value
    }
    phoneChangeHandler(e){
        this.setState({phone: e.target.value})
        this.props.ctr.phone=e.target.value
    }

    saveUser(){
        let data = {}

        data.fio = this.state.name
        data.birthday = this.state.year + (this.state.month?'-'+this.state.month:"")+(this.state.day?  '-'+this.state.day:"")
        data.addres = this.state.addres
        data.city = this.state.city
        data.phone = this.state.phone


        console.dir( data )
        if(this.props.ctr.userId==null){

            store.addItem(data)
            this.closeModal();
        }else{
            store.updateUser(this.props.ctr.userId,data)
            this.closeModal();
        }

    }

    range(start, end ) {
        let  ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }

    getYears(){
        let start = (new Date()).getFullYear();
        return this.range(start-100, start).reverse()
    }

    setS(k, v){

        let _state = {}
        _state[k] = v
        this.setState(_state)
        this.props.ctr[k]=v

    }


    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.ctr.isOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >


                    <div className="row" >
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input required="required"  value={this.state.name} id="icon_prefix" type="text" data-length="100" onChange={this.nameChangeHandler.bind(this)} className="validate" />
                                    {this.state.name?'':<label htmlFor="icon_prefix"><i className={(this.state.name?'':'red-text')}>*</i> First Name</label>}
                                </div>
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">phone</i>
                                    <i> </i><input value={this.state.phone} id="icon_telephone" type="tel" className={"validate"+(this.props.ctr.validPhone ? "":" invalid")} onChange={this.phoneChangeHandler.bind(this)} />
                                    {(this.state.phone)?'':<label htmlFor="icon_telephone" >Telephone</label>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4">
                                    <select required="required" className="validate"  id='year' value={this.state.year} onChange={(e)=>this.setS('year', e.target.value)}>
                                        <option  ></option>
                                        {this.getYears().map(( i) => (
                                            <option value={i}>{i}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="year"><i className={(this.state.year?'':'red-text')}>*</i> Месяц рождения</label>
                                </div>
                                <div className="input-field col s4">
                                    <select value={this.state.month} id="monpth" required="required" className="validate"  onChange={(e)=>this.setS('month', e.target.value)}>
                                        <option     ></option>
                                        {this.range(1, 12).map(( i) => (
                                            <option value={i}>{i}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="monpth"><i className={(this.state.month?'':'red-text')}>*</i> Месяц рождения</label>

                                </div>
                                <div className="input-field col s4">
                                    <select value={this.state.day} onChange={(e)=>this.setS('day', e.target.value)}>
                                        <option    > </option>
                                        {this.range(1, 31).map(( i) => (
                                            <option value={i}>{i}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="day"><i className={(this.state.day?'':'red-text')}>*</i> День рождения</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">location_on</i>
                                    <input placeholder="Адрес" id="city" value={this.state.addres} id="addres" type="text" className="validate" onChange={(e)=>this.setS('addres', e.target.value)} />
                                </div>
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">location_city</i>
                                    <input placeholder="Город" id="city" value={this.state.city} type="tel" className="validate" onChange={(e)=>this.setS('city', e.target.value)} />

                                </div>
                            </div>
                            <br/><br/><br/><br/>

                            <div className="row right">

                                <button onClick={this.saveUser.bind(this)} disabled={!this.props.ctr.valid} className="btn waves-effect waves-light" type="button" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>

                            </div>
                        </form>
                    </div>

                </Modal>
            </div>
        );
    }

}

export default EditModal;
