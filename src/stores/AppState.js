import {observable, action} from 'mobx';


class AppState {
    @observable HasService;
    @observable HasWinner;
    @observable HasStroke;
    @observable Service;
    @observable Baan;
    @observable Services;



    constructor() {
        this.HasService= false;
        this.HasWinner= false;
        this.HasStroke= false;
        this.Service= '';
        this.Baan= '';
        this.Services= false;


    }

    @action setHasService(res) {
        this.HasService = res;
    }

    @action setHasWinner(res) {
        this.HasWinner = res;
    }

    @action setHasStroke(res) {
        this.HasStroke = res;
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