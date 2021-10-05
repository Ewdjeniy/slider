import './xRangeScale.css';
import Scale from '../scale.ts';

class XRangeScale extends Scale implements SliderScale {
    
    constructor() {
        super();
    }
    
    render(sliderEl): void {
        this.scaleEl.className = 'scale x-range-scale'; 
        sliderEl.append(this.scaleEl);
    }
    
};

export default XRangeScale;