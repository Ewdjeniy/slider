import './scaleValues.css';
import ObservableSubject from '../../observers.ts';

class ScaleValues {

    scaleValuesEl:  HTMLElement = document.createElement('div');
    scaleValuesModTurner: string = 'lines';
    scaleValuesAmount: number;
    globalSubjects: Object = {};
    min: number;
    max: number;
    step: number;
    direction: string;
    stepInPx: number = 1;
    zeroPoint: Object = {x: 0, y: 0};
    decimalPlaces: number;
    
    constructor(settings, globalSubjects?: Object) {
        
        if (globalSubjects) {
            this.globalSubjects = globalSubjects;
        }
        this.scaleValuesModTurner = settings.scaleValues ? 'number' : 'lines';
        this.scaleValuesAmount = settings.scaleValuesAmount;
        this.min = settings.min;
        this.max = settings.max;
        this.step = settings.step;
        this.direction = settings.direction;
        this.decimalPlaces = this.step.toString().includes('.') ? this.step.toString().split('.')[1].length : 0;
        
        this.setScaleValuesMod();
        this.setValues();
        
        this.onScaleValuesPointerDown = this.onScaleValuesPointerDown.bind(this);
        this.scaleValuesEl.onpointerdown = this.onScaleValuesPointerDown;
        
    }
    
    onScaleValuesPointerDown(e: PointerEvent): boolean {

        return false;
    }
    
    moveScaleValues(direction, moveValue): void {
        
        direction = direction[0].toUpperCase() + direction.slice(1);
        
        direction = 'margin' + direction;
        
        this.scaleValuesEl.style[direction] = moveValue + 'px';
    }
    
    setValues(): void {
        
        const that = this;
        const directionName = this.direction == 'x' ? 'left' : 'bottom';
        const sizeName = this.direction == 'x' ? 'height' : 'width';
        
        let result: string = this.scaleValuesAmount > 0 ? '<div class="scale-value" style="' + directionName +': 0">' + this.min + '</div>' : '';
        
        for (let i = 1; i < this.scaleValuesAmount; i++) {
            
            const stepsAmountInOneValue = Math.round(((this.max - this.min) / this.step) / (this.scaleValuesAmount - 1));
            
            result += i !== this.scaleValuesAmount - 1 ? 
                '<div class="scale-value" style="' + directionName +': ' + stepsAmountInOneValue * i * this.stepInPx + 'px;">':
                '<div class="scale-value" style="' + directionName +': ' + Math.round((this.max - this.min) / this.step) * this.stepInPx + 'px;">';
            result += i !== this.scaleValuesAmount - 1 ? parseFloat((this.min + stepsAmountInOneValue * i * this.step).toFixed(this.decimalPlaces)) : this.max;
            result += '</div>';
            
        }
        this.scaleValuesEl.innerHTML = result;
        
        const scaleValues = this.scaleValuesEl.getElementsByClassName('scale-value') as HTMLCollectionOf<HTMLElement>;
        let longestScaleValue = scaleValues[0];
        
        this.scaleValuesEl.style[sizeName] = this.scaleValuesAmount > 0 ? parseFloat(getComputedStyle(scaleValues[0])[sizeName]) + 'px' : '0';
        
        for (let i = 0; i < scaleValues.length; i++) {
            
            if (this.direction == 'x') {
                scaleValues[i].style.left = parseFloat(scaleValues[i].style.left) - parseFloat(getComputedStyle(scaleValues[i]).width) / 2 + 'px';
            } else if (this.direction == 'y') {
                scaleValues[i].style.bottom = parseFloat(scaleValues[i].style.bottom) - parseFloat(getComputedStyle(scaleValues[i]).height) / 2 + 'px';
            }
            
            if (parseFloat(getComputedStyle(scaleValues[i]).width) > parseFloat(getComputedStyle(longestScaleValue).width)) {
                longestScaleValue = scaleValues[i].offsetWidth > longestScaleValue.clientWidth ? scaleValues[i] : longestScaleValue;
            }
            
            scaleValues[i].onpointerdown = (e: PointerEvent) => {
                e.stopPropagation();
            }
        }
        if (this.direction == 'x') {
            this.scaleValuesEl.style.height = this.scaleValuesAmount > 0 ? scaleValues[0].offsetHeight + 'px' : '0'; 
        } else if (this.direction == 'y') {
            this.scaleValuesEl.style.width = this.scaleValuesAmount > 0 ? longestScaleValue.offsetWidth + 'px' : '0';
        }
    }
    
    setStepInPx(stepInPx): void {
        this.stepInPx = stepInPx;
        this.setValues();
    }
    
    setScaleValuesMod(): void {
        
        switch (this.scaleValuesModTurner) {
                
            case 'number':
                this.scaleValuesEl.className = this.direction == 'x' ? 'scale-values scale-values_x sсale-values_numbers' : 'scale-values scale-values_y sсale-values_numbers'
                break;
                
            case 'lines':
                this.scaleValuesEl.className = this.direction == 'x' ? 'scale-values scale-values_x sсale-values_lines' : 'scale-values scale-values_y sсale-values_lines'
                break;
                
        }
        
    }
    
};

export default ScaleValues;
