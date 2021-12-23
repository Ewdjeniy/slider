import './progressBar.css';
import ObservableSubject from '../../observers.ts';

class ProgressBar {
    
    progressBarEl: HTMLElement = document.createElement('div');
    min: number;
    max: number;
    step: number;
    stepsAmount: number;
    stepsCoefficient: number;
    
    constructor(options: Object) {
        
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.stepsAmount = Math.round((this.max - this.min) / this.step);        
        this.stepsCoefficient = ((this.step * this.stepsAmount) / ((this.max - this.min) / 100)) / 100;
        
    }
    
    setFontSize(scaleStepVal): void {
        this.progressBarEl.style.fontSize = scaleStepVal + 'px';
    }
    
};

export default ProgressBar;