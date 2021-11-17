import './xRangeScaleValues.css';
import ScaleValues from '../scaleValues.ts';

class XRangeScaleValues extends ScaleValues implements SliderScaleValues {
    
    constructor() {
        super();
    }
    
    render(scaleEl): void {
        this.scaleValuesEl.className = 'sсale-values x-range-scale-values'; 
        scaleEl.after(this.scaleValuesEl); 
    }
    
};

export default XRangeScaleValues;