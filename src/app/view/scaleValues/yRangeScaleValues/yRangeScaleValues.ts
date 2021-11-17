import './yRangeScaleValues.css';
import ScaleValues from '../scaleValues.ts';

class YRangeScaleValues extends ScaleValues implements SliderScaleValues {
    
    constructor() {
        super();
    }
    
    render(scaleEl): void {
        this.scaleValuesEl.className = 'sсale-values y-range-scale-values'; 
        scaleEl.after(this.scaleValuesEl); 
    }
    
};

export default YRangeScaleValues;