import './tip.css';

class Tip {   
    
    tipEl: HTMLElement = document.createElement('div');
    mediator: any;
    
    constructor(options) {
        this.tipEl.className = options.direction == 'x' ? 'tip tip_x' : 'tip tip_y';
        
        this.setValue(options.current);
    }
    
    setValue(value): void {
        this.tipEl.innerHTML = value;       
    }
    
};

export default Tip
