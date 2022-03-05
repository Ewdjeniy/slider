import './tip.css';
import ObservableSubject from '../../observers.ts';

class Tip {   
    
    min: number;
    max: number;
    step: number;
    direction: string;
    decimalPlaces: number;
    stepsAmount: number;
    stepInPx: number = 1;
    tipEl: HTMLElement = document.createElement('div');
    globalSubjects: Object = {};
    zeroPoint: Object = {x: 0, y: 0};
    
    constructor(settings, globalSubjects?: Object) {
        
        if (globalSubjects) {
            this.globalSubjects = globalSubjects;
        }
        this.min = settings.min;
        this.max = settings.max;
        this.step = settings.step;
        this.direction = settings.direction;
        this.decimalPlaces = settings.decimalPlaces;
        this.stepsAmount = Math.round((this.max - this.min) / this.step);
        this.tipEl.className = settings.direction == 'x' ? 'tip tip_x' : 'tip tip_y';
        
        this.setValue(settings.current);
    }
    
    setValue(value): void {
        this.tipEl.innerHTML = value;       
    }
    
    setValueOnEvent(e: PointerEvent): void {

        const sizeName: string = this.direction == 'x' ? 'width' : 'height';
        let value: number;
        const scaleValue: number = this.direction == 'x' ? 
            e.clientX - this.zeroPoint.x :
            this.zeroPoint.y - e.clientY;
        
        value = scaleValue >= 0 ? Math.round(scaleValue / this.stepInPx) : 0;
        value = value >= this.stepsAmount ? Math.ceil((this.max - this.min) / this.step) : value;
        this.tipEl.innerHTML = value.toString();
        
    }
    
};

export default Tip
