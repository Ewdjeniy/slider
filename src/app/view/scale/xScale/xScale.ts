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
        this.sliderState.subject.notifyObservers();
    }
    
    setScaleValues(): void {
        if (this.sliderState.sliderSettings.scaleValues == 1) {
            this.scaleValuesEl.innerHTML = '<span class="scale-first-value">' + this.sliderState.sliderSettings.start + '</span>'; 
        } else if (this.sliderState.sliderSettings.scaleValues == 2) {
            this.scaleValuesEl.innerHTML = '<span class="scale-first-value">' + this.sliderState.sliderSettings.start + '</span>' + '<span class="scale-last-value">' + this.sliderState.sliderSettings.end + '</span>';      
        } else if (this.sliderState.sliderSettings.scaleValues > 2) {
            let result: string = '<span class="scale-first-value">' + this.sliderState.sliderSettings.start + '</span>';
            for (let i = 1; i < this.sliderState.sliderSettings.scaleValues - 1; i++) {
                result += '<span class="scale-value">';
                result += Math.round(+this.sliderState.sliderSettings.start + ((+this.sliderState.sliderSettings.end - (+this.sliderState.sliderSettings.start))  / (this.sliderState.sliderSettings.scaleValues - 1)) * i);
                result += '</span>';
            }
            result += '<span class="scale-last-value">' + this.sliderState.sliderSettings.end + '</span>';
            this.scaleValuesEl.innerHTML = result;
        }
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
