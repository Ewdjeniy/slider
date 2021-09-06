import ObservableSubject from '../observers.ts';
import {XScale} from './scale/xScale/xScale.ts';
import {XRangeScale} from './scale/xRangeScale/xRangeScale.ts';
import {Range} from './range/range.ts';
import {SingleOutput} from './output/singleOutput/singleOutput.ts';
import {RangeOutput} from './output/rangeOutput/rangeOutput.ts';
import {XRunner} from './runner/xRunner/xRunner.ts';
import {XTip} from './tip/xTip/xTip.ts';
import {XRangeTip} from './tip/xRangeTip/xRangeTip.ts';
import {XProgressBar} from './progressBar/xProgressBar/xProgressBar.ts';
import {XRangeProgressBar} from './progressBar/xRangeProgressBar/xRangeProgressBar.ts';


export class ToxinSliderView {
    subject: any = new ObservableSubject();
    input: HTMLInputElement;
    sliderSettings: any = {
        start: 0,
        end: 100,
        step: 5,
        current: 0,
        scaleValues: 0,
        direction: 'x',
        range: false,
        tip: true,
        separator: ' - '
    };
    
    sliderState: any = {
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
    
    getCurrentValue(): any {
        return this.sliderState.output.countOutputValue();
    }
    
    setState(): void {
        this.sliderState.ranges = [];
        this.sliderState.runners = [];
        this.sliderState.tips = [];
        this.sliderState.progressBars = [];
        this.sliderState.stepsAmount = Math.round((this.sliderSettings.end - this.sliderSettings.start) / this.sliderSettings.step);
        this.sliderState.stepsCoefficient = ((this.sliderSettings.step * this.sliderState.stepsAmount) / ((this.sliderSettings.end - this.sliderSettings.start) / 100)) / 100;
        this.sliderState.sliderSettings = this.sliderSettings;
        
        this.sliderState.output = this.sliderSettings.range ? new RangeOutput(this.input, this.sliderState) : new SingleOutput(this.input, this.sliderState);
        switch (this.sliderSettings.direction) {
            case 'x':
                if(this.sliderSettings.range) {
                    this.sliderState.scale = new XRangeScale(this.sliderState);
                } else {
                    this.sliderState.scale = new XScale(this.sliderState);
                }
                break;
        }
        if(this.sliderSettings.range) {
            this.sliderState.ranges.push(new Range(this.sliderState));
            this.sliderState.ranges.push(new Range(this.sliderState));
        } else {
            this.sliderState.ranges.push(new Range(this.sliderState));
        }
        this.sliderState.ranges.forEach((range, index) => {
            switch (this.sliderSettings.direction) {
                case 'x':
                    this.sliderState.runners.push(new XRunner(index, this.sliderState));
                    if(this.sliderSettings.tip) {
                        if (this.sliderSettings.range) {
                            this.sliderState.tips.push(new XRangeTip(index, this.sliderState));
                        } else {
                            this.sliderState.tips.push(new XTip(index, this.sliderState));  
                        }
                    }
                    if (this.sliderSettings.range) {
                        this.sliderState.progressBars.push(new XRangeProgressBar(index, this.sliderState));
                    } else {
                        this.sliderState.progressBars.push(new XProgressBar(index, this.sliderState));  
                    }
                    break;
            }
        });
    }
    
    update(settings: any): void {
        this.sliderState.scale.scaleEl.remove();
        this.sliderState.scale.scaleValuesEl.remove();
        for (let key in settings) {
            if (this.sliderSettings.hasOwnProperty(key)) {
                this.sliderSettings[key] = settings[key]; 
            }
        }
        this.setState();
    }
    
    updateCurrent(current: any): void {
        this.sliderState.sliderSettings.current = current;
        this.sliderState.progressBars.forEach((bar) => {
            bar.setCurrent();
        });
        this.sliderState.tips.forEach((tip) => {
            tip.setCurrent();
        });
        this.sliderState.output.setCurrent();
    }
}
