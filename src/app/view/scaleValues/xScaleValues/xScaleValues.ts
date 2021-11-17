import './xScaleValues.css';
import ScaleValues from '../scaleValues.ts';

class XScaleValues extends ScaleValues implements SliderScaleValues {
    
    constructor() {
        super();

    }
    
    render(scaleEl): void {
        this.scaleValuesEl.className = 'sсale-values x-scale-values'; 
        scaleEl.after(this.scaleValuesEl);
    }
    
};

export default XScaleValues;
