import ObservableSubject from '../observers.ts';
import XScale from './scale/xScale/xScale.ts';
import XRangeScale from './scale/xRangeScale/xRangeScale.ts';
import XDiapason from './diapason/xDiapason/xDiapason.ts';
import XRangeDiapason from './diapason/xRangeDiapason/xRangeDiapason.ts';
import XOutput from './output/xOutput/xOutput.ts';
import XRangeOutput from './output/xRangeOutput/xRangeOutput.ts';
import XRunner from './runner/xRunner/xRunner.ts';
import XRangeRunner from './runner/xRangeRunner/xRangeRunner.ts';
import XTip from './tip/xTip/xTip.ts';
import XRangeTip from './tip/xRangeTip/xRangeTip.ts';
import XProgressBar from './progressBar/xProgressBar/xProgressBar.ts';
import XRangeProgressBar from './progressBar/xRangeProgressBar/xRangeProgressBar.ts';


class ToxinSliderView implements SliderView {
    subject: ObservableSubject = new ObservableSubject();
    input: HTMLInputElement;
    sliderSettings: SliderSettings = {
        start: 0,
        end: 100,
        step: 1,
        current: 0,
        scaleValues: 0,
        direction: 'x',
        range: false,
        tip: false,
        separator: ' - '
    };
    
    sliderState: SliderState = {
        subject: null,
        sliderSettings: null,
        output: null,
        scale: null,
        ranges: [],
        runners: [],
        tips: [],
        progressBars: [],
        stepsAmount: 0,
        stepsCoefficient: 0,
    };
    
    constructor(input: HTMLInputElement) {
        this.input = input;
        this.sliderState.subject = this.subject;
        this.setState();
    }
    
    getCurrentValue(): number | number[] {
        return this.sliderState.output.countOutputValue();
    }
    
    setState(): void {
        
        if(this.sliderSettings.current instanceof Array) {
            this.sliderSettings.range = true;
        } else {
            this.sliderSettings.range = false;
        }
        this.sliderState.ranges = [];
        this.sliderState.runners = [];
        this.sliderState.tips = [];
        this.sliderState.progressBars = [];
        this.sliderState.stepsAmount = Math.round((this.sliderSettings.end - this.sliderSettings.start) / this.sliderSettings.step);
        this.sliderState.stepsCoefficient = ((this.sliderSettings.step * this.sliderState.stepsAmount) / ((this.sliderSettings.end - this.sliderSettings.start) / 100)) / 100;
        this.sliderState.sliderSettings = this.sliderSettings;
        
        switch (this.sliderSettings.direction) {
            case 'x':
                this.sliderState.output = this.sliderSettings.range ? new XRangeOutput(this.input, this.sliderState) : new XOutput(this.input, this.sliderState);
                this.sliderState.scale = this.sliderSettings.range ? new XRangeScale(this.sliderState) : new XScale(this.sliderState);
                if(this.sliderSettings.range) {
                    this.sliderState.ranges.push(new XRangeDiapason(0, this.sliderState));
                    this.sliderState.ranges.push(new XRangeDiapason(1, this.sliderState)); 
                } else {
                    this.sliderState.ranges.push(new XDiapason(0, this.sliderState));
                }
                this.sliderState.ranges.forEach((range, index) => {
                    if (this.sliderSettings.range) {
                        this.sliderState.runners.push(new XRangeRunner(index, this.sliderState));
                        if(this.sliderSettings.tip) {
                            this.sliderState.tips.push(new XRangeTip(index, this.sliderState));
                        }
                        this.sliderState.progressBars.push(new XRangeProgressBar(index, this.sliderState));
                    } else {
                        this.sliderState.runners.push(new XRunner(index, this.sliderState));
                        if(this.sliderSettings.tip) {
                            this.sliderState.tips.push(new XTip(index, this.sliderState));
                        }
                        this.sliderState.progressBars.push(new XProgressBar(index, this.sliderState));
                    }
                });
                break;
        }
        
    }
    
    update(settings: Object): void {
        
        this.sliderState.scale.scaleEl.parentElement.remove();
        for (let key in settings) {
            if (this.sliderSettings.hasOwnProperty(key)) {
                this.sliderSettings[key] = settings[key]; 
            }
        }
        this.setState();
        
    }
    
    updateCurrent(current: number | number[]): void {
        this.update({'current': current});
    }
    
}

export default ToxinSliderView;