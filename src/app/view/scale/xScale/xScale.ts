import './xScale.css';
import Scale from '../scale.ts';

class XScale extends Scale implements SliderScale {
    
    constructor() {
        super();
    }
     
    render(sliderEl): void {
        this.scaleEl.className = 'scale x-scale'; 
        sliderEl.append(this.scaleEl);
    }
    
};

export default XScale;
