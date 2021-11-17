import './yScaleValues.css';
import ScaleValues from '../scaleValues.ts';

class YScaleValues extends ScaleValues implements SliderScaleValues {
    
    constructor() {
        super();

    }
    
    render(scaleEl): void {
        this.scaleValuesEl.className = 'sсale-values y-scale-values'; 
        scaleEl.before(this.scaleValuesEl);
    }
    
};

export default YScaleValues;
