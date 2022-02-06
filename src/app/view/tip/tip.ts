import './tip.css';

class Tip {   
    
    tipEl: HTMLElement = document.createElement('div');
    mediator: any;
    
    constructor(options) {
        this.tipEl.className = "tip";
        
        this.setValue(options.current);
    }
    
    setValue(value): void {
        this.tipEl.innerHTML = value;       
    }
    
};

export default Tip
