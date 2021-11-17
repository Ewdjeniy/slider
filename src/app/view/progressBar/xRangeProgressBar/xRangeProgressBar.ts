import './xRangeProgressBar.css';
import ProgressBar from '../progressBar.ts';

class XRangeProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor() {
        super();
    }
    
    setCurrent(current, start, step, i): void {
        this.progressBarEl.style.width = Math.round((current[i] - start) / step) + 'em';
    }
    
    countProgressBarSize(event: PointerEvent, scaleStartX, scaleStep, mousePosOnRunner, el): number {
				const scaleValue: number = event.clientX - scaleStartX - mousePosOnRunner;
        let size: number;
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / scaleStep);
				} else {
            size = 0;
				}
        
        this.progressBarEl.style.width = size + 'em';
        
        if (el && 
            +getComputedStyle(el.parentElement).zIndex > +getComputedStyle(this.progressBarEl.parentElement).zIndex && 
            parseFloat(getComputedStyle(el).width) > parseFloat(getComputedStyle(this.progressBarEl).width)) {
            el.style.width = size + 'em';
        } else if (el && 
            +getComputedStyle(el.parentElement).zIndex < +getComputedStyle(this.progressBarEl.parentElement).zIndex && 
            parseFloat(getComputedStyle(el).width) <= parseFloat(getComputedStyle(this.progressBarEl).width)) {
            el.style.width = size + 'em';
        }
        
        return size;
    }
    
    render(el): void {
        this.progressBarEl.className = 'progress-bar x-range-progress-bar';
        el.before(this.progressBarEl);
    }
};

export default XRangeProgressBar;