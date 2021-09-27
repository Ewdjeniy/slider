import './xRangeScale.css';
import Scale from '../scale.ts';

class XRangeScale extends Scale implements SliderScale {
    
    constructor(sliderState: Object) {
        super(sliderState);
        this.renderScale();
        this.setScaleValues();
        this.scaleEl.onclick = this.setSliderValue.bind(this);
    }
    
    setSliderValue(event: PointerEvent): boolean | void {
        if (event.target == this.sliderState.runners[0].runnerEl || event.target == this.sliderState.runners[1].runnerEl) {
            return false;
        }
        let nearestRunnerIndex: number;
        if (event.clientX > this.sliderState.runners[1].runnerEl.getBoundingClientRect().left) {
            nearestRunnerIndex = 1;
        } else if (event.clientX < this.sliderState.runners[0].runnerEl.getBoundingClientRect().left) {
            nearestRunnerIndex = 0;      
        } else if (event.clientX - this.sliderState.runners[0].runnerEl.getBoundingClientRect().left < this.sliderState.runners[1].runnerEl.getBoundingClientRect().left - event.clientX) {
            nearestRunnerIndex = 0;      
        } else {
            nearestRunnerIndex = 1;
        }
        this.sliderState.progressBars[nearestRunnerIndex].setProgressBarSize(event);
        if (this.sliderState.sliderSettings.tip) {
            this.sliderState.tips[nearestRunnerIndex].showTip(); 
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
        div.className = 'x-range-scale'; 
        div.innerHTML = this.scaleHTML;
        this.sliderState.output.outputEl.after(div);
        this.scaleEl = div.getElementsByClassName('scale')[0];
        this.scaleValuesEl = div.getElementsByClassName('scale-values')[0];
    }
    
};

export default XRangeScale;