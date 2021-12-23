import './xScale.css';
import Scale from '../scale.ts';

class XScale extends Scale implements SliderScale {
    
    constructor(options) {
        super(options);
        this.scaleEl.className = 'scale x-scale';
    }
    
    returnScaleStart(): number {
        return this.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.scaleEl).paddingLeft);
    }
    
    returnScaleStep(runnerEl): number {
        return (parseFloat(getComputedStyle(this.scaleEl).width) * this.stepsCoefficient - parseFloat(getComputedStyle(runnerEl).width)) / this.stepsAmount; 
    }
    
};

export default XScale;
