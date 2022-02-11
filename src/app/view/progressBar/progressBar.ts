import './progressBar.css';

class ProgressBar {
    
    min: number;
    max: number;
    step: number;
    direction: string;
    decimalPlaces: number;
    stepsAmount: number;
    stepInPx: number = 1;
    mediator: any;
    progressBarEl: HTMLElement = document.createElement('div');
    
    constructor(options: Object) {
        
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.direction = options.direction;
        this.decimalPlaces = options.decimalPlaces;
        this.stepsAmount = Math.round((this.max - this.min) / this.step);
        
        this.progressBarEl.className = options.direction == 'x' ? 'progress-bar progress-bar_x' : 'progress-bar progress-bar_y'; 
        
        this.setValue(options.current);
        
    }
    
    setZindex(value: string): void {
        this.progressBarEl.style.zIndex = value;
    }
    
    setBackground(background: string): void {
        this.progressBarEl.style.background = background;
    }
    
    returnValue(): number {
        
        const sizeName = this.direction == 'x' ? 'width' : 'height';
        let value = this.min + parseInt(this.progressBarEl.style[sizeName]) * this.step;
        value = value >= this.max ? this.max : value;
        value = +value.toFixed(this.decimalPlaces);
        
        return value;
    }
    
    returnStepInPx(): number {
        return this.stepInPx;
    }
    
    
    setStepInPx(maxSizeInPx: number): void {
        this.stepInPx = maxSizeInPx / this.stepsAmount;
        this.progressBarEl.style.fontSize = this.stepInPx + 'px';
    }
    
    setValueOnEvent(e: PointerEvent): void {
        
        e.preventDefault();

        const sizeName: string = this.direction == 'x' ? 'width' : 'height';
        let size: number;
        const scaleValue: number = this.direction == 'x' ? 
            e.clientX - this.progressBarEl.getBoundingClientRect().left :
            this.progressBarEl.getBoundingClientRect().bottom - e.clientY;
        
        size = scaleValue >= 0 ? Math.round(scaleValue / this.stepInPx) : 0;
        size = size >= this.stepsAmount ? Math.ceil((this.max - this.min) / this.step) : size;
        this.progressBarEl.style[sizeName] = size + 'em';
        
    }
    
    setValue(value: number): void {
        
        const size = this.direction == 'x' ? 'width' : 'height';
        
        this.progressBarEl.style[size] = Math.round((value - this.min) / this.step) + 'em';
        if (value == this.max) {
            this.progressBarEl.style[size] = (this.max - this.min) / this.step + 'em';
        }
    }
    
};

export default ProgressBar;