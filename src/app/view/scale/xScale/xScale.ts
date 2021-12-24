import './xScale.css';
import Scale from '../scale.ts';

class XScale extends Scale implements SliderScale {
    
    constructor() {
        super();
        this.scaleEl.className = 'scale x-scale';
        this.onScalePointerDown = this.onScalePointerDown.bind(this);
        this.scaleEl.onpointerdown = this.onScalePointerDown;
    }
    
    onScalePointerDown(e: PointerEvent): boolean {
        if (this.mediator) {
            this.mediator.mediateScalePointerDown(e);
        }
        return false;
    }
    
    returnScaleStart(): number {
        return this.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(this.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(this.scaleEl).paddingLeft);
    }
    
};

export default XScale;
