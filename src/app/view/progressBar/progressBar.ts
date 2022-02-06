import './progressBar.css';

class ProgressBar {
    
    mediator: any;
    progressBarEl: HTMLElement = document.createElement('div');
    min: number;
    max: number;
    step: number;
    stepsAmount: number;
    parentClone: HTMLElement = document.createElement('div');
    maxSizeMeter: HTMLElement;
    
    constructor(options: Object) {
        
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.stepsAmount = Math.round((this.max - this.min) / this.step);
        
        this.progressBarEl.className = 'progress-bar';
        this.setCurrent(options.current);
        
        this.insertMaxSizeMeter = this.insertMaxSizeMeter.bind(this);
        this.setFontSize = this.setFontSize.bind(this);     
        this.progressBarEl.style.zIndex = (Math.abs(this.max) + 1000 - options.current).toString();
        
        document.addEventListener("DOMContentLoaded", this.insertMaxSizeMeter);
        document.addEventListener("DOMContentLoaded", this.setFontSize);
    }
    
    returnProgressBarValue(): number {
        return parseInt(this.progressBarEl.style.width) * this.step;
    }
    
    insertMaxSizeMeter(): void {
        this.parentClone.className = 'progress-bar-parent-clone';
        this.parentClone.innerHTML = this.progressBarEl.parentElement.outerHTML;
        this.progressBarEl.parentElement.before(this.parentClone);
        
        this.maxSizeMeter = this.parentClone.getElementsByClassName('progress-bar')[0] as HTMLElement;
        this.maxSizeMeter.style.width = '100vw';
    }
    
    setFontSize(): void {
        this.progressBarEl.style.fontSize = this.returnProgressBarStepInPx() + 'px';
    }
    
    returnProgressBarStepInPx(): number {
        return this.maxSizeMeter.clientWidth / this.stepsAmount; 
    }
    
    returnProgressBarSize(e: PointerEvent): number {
        
        let size: number;
        const scaleValue: number = e.clientX - this.progressBarEl.getBoundingClientRect().left;
        
        size = scaleValue >= 0 ? Math.round(scaleValue / this.returnProgressBarStepInPx()) : 0;
        size = size > this.stepsAmount ? this.max / this.step : size;
        this.progressBarEl.style.width = size + 'em';
        return size * this.step;
        
    }
    
    setCurrent(current): void {
        this.progressBarEl.style.width = Math.round((current - this.min) / this.step) + 'em';
        if (current == this.max) {
            this.progressBarEl.style.width = (this.max - this.min) / this.step + 'em';
        }
    }
    
};

export default ProgressBar;