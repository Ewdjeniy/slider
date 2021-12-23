import './xProgressBar.css';
import ProgressBar from '../progressBar.ts';

class XProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor(options: Object) {
        super(options);
        this.progressBarEl.className = 'progress-bar x-progress-bar';
        this.setCurrent(options.current, options.min, options.max, options.step);
        
        this.test = this.test.bind(this);
        document.addEventListener("DOMContentLoaded", this.test);
    }
    
    test(): void {
        this.setFontSize(this.returnProgressBarStep());
    }
    
    setFontSize(scaleStepVal): void {
        this.progressBarEl.style.fontSize = scaleStepVal + 'px';
    }
    
    returnProgressBarStep(): number {
        return parseFloat(getComputedStyle(this.progressBarEl).width) * this.stepsCoefficient / this.stepsAmount; 
    }
    
    countProgressBarSize(event: PointerEvent, scaleStartX, scaleStep, mousePosOnRunner): number {
				const scaleValue: number = event.clientX - scaleStartX - mousePosOnRunner;
        let size: number;
        if (scaleValue >= 0) {
            size = Math.round(scaleValue / scaleStep);
				} else {
            size = 0;
				}
        this.progressBarEl.style.width = size + 'em';
        return size;
    }
    
    setCurrent(current, start, end, step): void {
        this.progressBarEl.style.width = Math.round((current - start) / step) + 'em';
        if (current == end) {
            this.progressBarEl.style.width = (end - start) / step + 'em';
        }
    }
    
};

export default XProgressBar;