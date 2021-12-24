import './xProgressBar.css';
import ProgressBar from '../progressBar.ts';

class XProgressBar extends ProgressBar implements SliderProgressBar {
    
    constructor(options: Object) {
        super(options);
        this.progressBarEl.className = 'progress-bar x-progress-bar';
        this.setCurrent(options.current, options.min, options.max, options.step);
        
        this.setFontSize = this.setFontSize.bind(this);
        document.addEventListener("DOMContentLoaded", this.setFontSize);
    }
    
    setFontSize(): void {
        this.progressBarEl.style.fontSize = this.returnProgressBarStep() + 'px';
    }
    
    returnProgressBarStep(): number {
        this.progressBarStep = parseFloat(getComputedStyle(this.progressBarEl).width) * this.stepsCoefficient / this.stepsAmount;
        return this.progressBarStep; 
    }
    
    returnProgressBarSize(e: PointerEvent): number {
        
        let size: number;
        const scaleValue: number = e.clientX - this.progressBarEl.getBoundingClientRect().left;
        
        size = scaleValue >= 0 ? Math.round(scaleValue / this.progressBarStep) : 0;
        size = size > this.stepsAmount ? this.max : size;
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