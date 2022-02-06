import './diapason.css';

class Diapason {   
    
    diapasonEl: HTMLElement = document.createElement('div');
    mediator: any;
    
    constructor(options) {
        this.diapasonEl.className = 'diapason';
    }    
};

export default Diapason;