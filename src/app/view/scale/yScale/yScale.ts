import './yScale.css';
import Scale from '../scale.ts';

class YScale extends Scale implements SliderScale {
    
    constructor() {
        super();
    }
    
    returnScaleStart(): number {
        return this.scaleEl.getBoundingClientRect().bottom + parseInt(getComputedStyle(this.scaleEl).borderBottomWidth) + parseInt(getComputedStyle(this.scaleEl).paddingBottom);
    }
    
    returnScaleStep(runnerEl, stepsCoefficient, stepsAmount): number {
        return (parseInt(getComputedStyle(this.scaleEl).height) * stepsCoefficient - parseInt(getComputedStyle(runnerEl).height)) / stepsAmount; 
    }
     
    render(sliderEl): void {
        this.scaleEl.className = 'scale y-scale'; 
        sliderEl.append(this.scaleEl);
    }
    
};

export default YScale;
