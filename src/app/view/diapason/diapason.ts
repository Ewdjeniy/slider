import './diapason.css';

class Diapason {   
    
    diapasonEl: HTMLElement = document.createElement('div');
    mediator: any;
    
    constructor(options) {
        this.diapasonEl.className = options.direction == 'x' ? 'diapason diapason_x' : 'diapason diapason_y';
    }    
};

export default Diapason;