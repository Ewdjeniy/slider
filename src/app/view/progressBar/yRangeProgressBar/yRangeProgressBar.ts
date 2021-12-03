import './yRangeProgressBar.css';
import ProgressBar from '../progressBar.ts';

class YRangeProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, end, step, i): void {
        this.progressBarEl.style.height = Math.round((current[i] - start) / step) + 'em';
        if (current[i] == end) {
            this.progressBarEl.style.height = (end - start) / step + 'em'; 
        }
    }
    
    countProgressBarSize(event: PointerEvent, scaleStartY, scaleStep, mousePosOnRunner, el): number {
				const scaleValue: number =  scaleStartY - event.clientY - mousePosOnRunner;
        let size: number;
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / scaleStep);
				} else {
            size = 0;
				}
        
        this.progressBarEl.style.height = size + 'em';
        
        if (el && 
            +getComputedStyle(el.parentElement).zIndex > +getComputedStyle(this.progressBarEl.parentElement).zIndex && 
            parseFloat(getComputedStyle(el).height) > parseFloat(getComputedStyle(this.progressBarEl).height)) {
            el.style.height = size + 'em';
        } else if (el && 
            +getComputedStyle(el.parentElement).zIndex < +getComputedStyle(this.progressBarEl.parentElement).zIndex && 
            parseFloat(getComputedStyle(el).height) <= parseFloat(getComputedStyle(this.progressBarEl).height)) {
            el.style.height = size + 'em';
        }
        
        return size;
    }
    
    render(el): void {
        this.progressBarEl.className = 'progress-bar y-range-progress-bar';
        el.after(this.progressBarEl);
    }
};

export default YRangeProgressBar;