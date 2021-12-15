import './xScale.css';
import Scale from '../scale.ts';

class XScale extends Scale implements SliderScale {
    
    constructor() {
        super();
    }
    
    returnScaleStart(): number {
        return this.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.scaleEl).paddingLeft);
    }
    
    returnScaleStep(runnerEl, stepsCoefficient, stepsAmount): number {
        return ((parseFloat(getComputedStyle(this.scaleEl).width)) * stepsCoefficient - parseFloat(getComputedStyle(runnerEl).width)) / stepsAmount; 
    }
     
    render(sliderEl): void {
        this.scaleEl.className = 'scale x-scale'; 
        sliderEl.append(this.scaleEl);
    }
    
};

export default XScale;
