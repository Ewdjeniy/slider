import './yRangeScale.css';
import Scale from '../scale.ts';

class YRangeScale extends Scale implements SliderScale {
    
    constructor() {
        super();
    }
    
    returnScaleStart(): number {
        return 0;
    }
    
    returnScaleStep(runnerEl, stepsCoefficient, stepsAmount): number {
        return 0; 
    }
    
    render(sliderEl): void {
        this.scaleEl.className = 'scale y-range-scale'; 
        sliderEl.append(this.scaleEl);
    }
    
};

export default YRangeScale;