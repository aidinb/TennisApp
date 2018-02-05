import {observable, action} from 'mobx';


class AppState {
    @observable Service;
    @observable Baan;



    constructor() {
        this.Service= '';
        this.Baan= '';


    }

    @action setService(name) {
        this.Service = name;
    }

    @action setBaan(No) {
        this.Baan = No;
    }
}
const state = new AppState();

export default state;