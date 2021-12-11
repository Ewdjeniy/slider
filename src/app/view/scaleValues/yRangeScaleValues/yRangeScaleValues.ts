import './yRangeScaleValues.css';
import ScaleValues from '../scaleValues.ts';

class YRangeScaleValues extends ScaleValues implements SliderScaleValues {
    
    constructor() {
        super();
    }
    
    render(scaleEl, scaleValues): void {
        this.scaleValuesEl.className = scaleValues ? 'sсale-values y-range-scale-values y-sсale-values_on' : 'sсale-values y-range-scale-values'; 
        scaleEl.before(this.scaleValuesEl); 
    }
    
};

export default YRangeScaleValues;