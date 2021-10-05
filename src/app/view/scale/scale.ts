import ObservableSubject from '../../observers.ts';

class Scale {

    scaleEl:  HTMLElement = document.createElement('div');;
    subject: ObservableSubject = new ObservableSubject();
    
    constructor() {
        
    }
    
    returnScaleStart(): number {
        return this.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.scaleEl).paddingLeft);
    }
    
    returnScaleStep(runnerEl, stepsCoefficient, stepsAmount): number {
        return (parseInt(getComputedStyle(this.scaleEl).width) * stepsCoefficient - parseInt(getComputedStyle(runnerEl).width)) / stepsAmount; 
    }
    
};

export default Scale;