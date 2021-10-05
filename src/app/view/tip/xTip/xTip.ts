import './xTip.css';
import Tip from '../tip.ts';

class XTip extends Tip implements SliderTip {   
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, end): void {
        if (current > end) {
            this.tipEl.innerHTML = end.toString();
        } else if (current < start) {
            this.tipEl.innerHTML = start.toString();      
        } else {
            this.tipEl.innerHTML = current.toString();        
        }
    }
    
    render(runnerEl): void {
        this.tipEl.className = "tip x-tip";
        runnerEl.append(this.tipEl);
    }
    
};

export default XTip;
