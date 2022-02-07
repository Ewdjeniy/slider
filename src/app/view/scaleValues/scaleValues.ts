import './scaleValues.css';

class ScaleValues {

    scaleValuesEl:  HTMLElement = document.createElement('div');
    scaleValuesModTurner: string = 'lines';
    scaleValuesAmount: number;
    mediator: any;
    min: number;
    max: number;
    step: number;
    stepInPx: number = 1;
    decimalPlaces: number;
    
    constructor(options) {
        this.scaleValuesModTurner = options.scaleValues ? 'number' : 'lines';
        this.scaleValuesAmount = options.scaleValuesAmount;
        this.setScaleValuesMod();
        
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.decimalPlaces = this.step.toString().includes('.') ? this.step.toString().split('.')[1].length : 0;
        
        this.setValues();
        
        this.onScaleValuesPointerDown = this.onScaleValuesPointerDown.bind(this);
        this.scaleValuesEl.onpointerdown = this.onScaleValuesPointerDown;
        
    }
    
    onScaleValuesPointerDown(e: PointerEvent): void {
        if (this.mediator) {
            this.mediator.mediateScalePointerDown(e);
        }
    }
    
    moveScaleValues(direction, moveValue): void {
        
        direction = direction[0].toUpperCase() + direction.slice(1);
        
        direction = 'margin' + direction;
        this.scaleValuesEl.style[direction] = moveValue + 'px';
    }
    
    setValues(): void {
        
        const that = this;
        
        let result: string = this.scaleValuesAmount > 0 ? '<div class="scale-value" style="left: 0">' + this.min + '</div>' : '';
        
        for (let i = 1; i < this.scaleValuesAmount; i++) {
            
            const stepsAmountInOneValue = Math.round(((this.max - this.min) / this.step) / (this.scaleValuesAmount - 1));
            
            if (this.min + stepsAmountInOneValue * i * this.step <= this.max) {
                result += i !== this.scaleValuesAmount - 1 ? 
                    '<div class="scale-value" style="left: ' + stepsAmountInOneValue * i * this.stepInPx + 'px;">':
                    '<div class="scale-value" style="left: ' + this.max / this.step * this.stepInPx + 'px;">';
                result += i !== this.scaleValuesAmount - 1 ? parseFloat((this.min + stepsAmountInOneValue * i * this.step).toFixed(this.decimalPlaces)) : this.max;
                result += '</div>';  
            }
            
        }
        this.scaleValuesEl.innerHTML = result;
        
        const scaleValues = this.scaleValuesEl.getElementsByClassName('scale-value') as HTMLCollectionOf<HTMLElement>;
        this.scaleValuesEl.style.height = this.scaleValuesAmount > 0 ? scaleValues[0].offsetHeight + 'px' : '0';
        for (let i = 0; i < scaleValues.length; i++) {
            scaleValues[i].style.left = parseFloat(scaleValues[i].style.left) - parseFloat(getComputedStyle(scaleValues[i]).width) / 2 + 'px';
            
            scaleValues[i].onpointerdown = (e: PointerEvent) => {
                if (that.mediator) {
                    that.mediator.mediateValuePointerDown(e, +scaleValues[i].innerHTML);
                }
                e.stopPropagation();
            }
        }
    }
    
    setStepInPx(stepInPx): void {
        this.stepInPx = stepInPx;
        this.setValues();
    }
    
    setScaleValuesMod(): void {
        this.scaleValuesEl.className = this.scaleValuesModTurner == 'number' ? 'scale-values sсale-values_numbers' : 'scale-values';
    }
    
};

export default ScaleValues;
