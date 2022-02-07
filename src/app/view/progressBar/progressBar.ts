import './progressBar.css';

class ProgressBar {
    
    min: number;
    max: number;
    step: number;
    stepsAmount: number;
    stepInPx: number = 1;
    mediator: any;
    progressBarEl: HTMLElement = document.createElement('div');
    
    constructor(options: Object) {
        
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.stepsAmount = Math.round((this.max - this.min) / this.step);
        
        this.progressBarEl.className = 'progress-bar'; 
        this.progressBarEl.style.zIndex = (Math.abs(this.max) + 1000 - options.current).toString();
        
        this.setValue(options.current);
        
    }
    
    returnValue(): number {
        return parseInt(this.progressBarEl.style.width) * this.step;
    }
    
    returnStepInPx(): number {
        return this.stepInPx;
    }
    
    
    setStepInPx(maxSizeInPx): void {
        this.stepInPx = maxSizeInPx / this.stepsAmount;
        this.progressBarEl.style.fontSize = this.stepInPx + 'px';
    }
    
    setValueOnEvent(e: PointerEvent): void {
        
        let size: number;
        const scaleValue: number = e.clientX - this.progressBarEl.getBoundingClientRect().left;
        
        size = scaleValue >= 0 ? Math.round(scaleValue / this.stepInPx) : 0;
        size = size > this.stepsAmount ? this.max / this.step : size;
        this.progressBarEl.style.width = size + 'em';
        
    }
    
    setValue(value): void {
        this.progressBarEl.style.width = Math.round((value - this.min) / this.step) + 'em';
        if (value == this.max) {
            this.progressBarEl.style.width = (this.max - this.min) / this.step + 'em';
        }
    }
    
};

export default ProgressBar;