import './xRangeScale.css';
import Scale from '../scale.ts';

class XRangeScale extends Scale implements SliderScale {
    
    constructor() {
        super();
    }
    
    returnScaleStart(): number {
        return this.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.scaleEl).paddingLeft);
    }
    
    returnScaleStep(runnerEl, stepsCoefficient, stepsAmount): number {
        return (parseInt(getComputedStyle(this.scaleEl).width) * stepsCoefficient - parseInt(getComputedStyle(runnerEl).width)) / stepsAmount; 
    }
    
    render(sliderEl): void {
        this.scaleEl.className = 'scale x-range-scale'; 
        sliderEl.append(this.scaleEl);
    }
    
};

export default XRangeScale;