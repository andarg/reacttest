import { observable, computed, action } from "mobx";

 class ModalController {
  @observable isOpen = false;
  @observable name = '';
  @observable phone = '';

  constructor(){
      this.userId = null;
  }

  @computed
  get valid() {

      let t =(/^[ a-zA-Zа-яА-Я]{1,100}$/.test(this.name) &&   (this.phone == '' || /^\+7\(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(this.phone)));

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
      console.log( index )
     this.userId = index;
     this.isOpen  = true;
 }
}


export default new ModalController();
