import {observable, action} from 'mobx';


class AppState {
    @observable Service;
    @observable Baan;
    @observable Services;



    constructor() {
        this.Service= '';
        this.Baan= '';
        this.Services= false;


    }

    @action setService(name) {
        this.Service = name;
    }

    @action setBaan(No) {
        this.Baan = No;
    }

    @action setServices(set) {
        this.Services = set;
    }
}
const state = new AppState();

export default state;