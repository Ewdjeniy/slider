import './xRangeTip.css';
import Tip from '../tip.ts';

class XRangeTip extends Tip implements SliderTip {   
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, end, i): void {
        if (current > end) {
            this.tipEl.innerHTML = end.toString();
        } else if (current < start) {
            this.tipEl.innerHTML = start.toString();      
        } else {
            this.tipEl.innerHTML = current[i].toString();        
        }
    }
    
    render(runnerEl): void {
        this.tipEl.className = "tip x-range-tip";
        runnerEl.append(this.tipEl);
    }
    
};

export default XRangeTip;
