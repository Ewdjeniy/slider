import './xRangeDiapason.css';
import Diapason from '../diapason.ts';

class XRangeDiapason extends Diapason {   
    
    constructor(index: number, sliderState: SliderState) {
        super(index,sliderState);
        this.renderDiapason();
        if (this.sliderState.sliderSettings.range && this.sliderState.ranges[0]) {
            this.sliderState.ranges[0].rangeEl.style.zIndex = +getComputedStyle(this.sliderState.ranges[0].rangeEl).zIndex + 1;
            this.sliderState.ranges[0].rangeEl.style.background = getComputedStyle(this.sliderState.scale.scaleEl).background;
        }
    }
    
    renderDiapason(): void {
        this.rangeEl.className = 'x-range-diapason';
        this.sliderState.scale.scaleEl.append(this.rangeEl);
    }
    
};

export default XRangeDiapason;