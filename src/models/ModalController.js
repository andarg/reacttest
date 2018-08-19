import { observable, computed, action } from "mobx";

 class ModalController {
  @observable isOpen = false;
  @observable name = '';
  @observable phone = '';
  @observable year = '';
  @observable month = '';
  @observable day= '';

  constructor(){
      this.userId = null;
  }

  @computed
  get validPhone() {
      return (this.phone == '' || /^\+7\(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(this.phone));
  }
  @computed
  get valid() {

      const t =( this.year && this.month && this.day && /^[ a-zA-Zа-яА-Я]{2,100}$/.test(this.name) &&   this.validPhone);

      return t
  }

  @action
  open() {
    this.isOpen  = true;
  }

  @action
  close() {
    this.userId = null;
    this.isOpen  = false;
  }

 @action
 editUser( index ) {
     this.userId = index;
     this.isOpen  = true;
 }
}


export default new ModalController();
