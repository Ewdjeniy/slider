import './xDiapason.css';
import Diapason from '../diapason.ts';

class XDiapason extends Diapason {   
    
    constructor(index: number, sliderState: SliderState) {
        super(index, sliderState);
        this.renderDiapason();
    }
    
    renderDiapason(): void {
        this.rangeEl.className = 'x-diapason';
        this.sliderState.scale.scaleEl.append(this.rangeEl);
    }
    
};

export default XDiapason;