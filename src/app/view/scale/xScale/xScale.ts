import './xScale.css';
import Scale from '../scale.ts';

class XScale extends Scale implements SliderScale {
    
    constructor(sliderState: Object) {
        super(sliderState);
        this.renderScale();
        this.setScaleValues();
        this.scaleEl.onclick = this.setSliderValue.bind(this);
    }
    
    setSliderValue(event: PointerEvent): boolean | void {
        if (event.target == this.sliderState.runners[0].runnerEl) {
            return false;
        }
        this.sliderState.progressBars[0].setProgressBarSize(event);
        if (this.sliderState.sliderSettings.tip) {
            this.sliderState.tips[0].showTip(); 
        }
        this.sliderState.output.countOutputValue();
    }
    
    renderScale(): void {
        const div: any = document.createElement('div');
        div.className = 'x-scale'; 
        div.innerHTML = this.scaleHTML;
        this.sliderState.output.outputEl.after(div);
        this.scaleEl = div.getElementsByClassName('scale')[0];
        this.scaleValuesEl = div.getElementsByClassName('scale-values')[0];
    }
    
};

export default XScale;
