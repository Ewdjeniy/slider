import './view.css';
import { defaultSliderSettingsView } from './defaults.ts';
import ObservableSubject from '../observers.ts';
import XOutput from './output/xOutput/xOutput.ts';
//import XRangeOutput from './output/xRangeOutput/xRangeOutput.ts';
//import YOutput from './output/yOutput/yOutput.ts';
//import YRangeOutput from './output/yRangeOutput/yRangeOutput.ts';
import XScale from './scale/xScale/xScale.ts';
//import XRangeScale from './scale/xRangeScale/xRangeScale.ts';
//import YScale from './scale/yScale/yScale.ts';
//import YRangeScale from './scale/yRangeScale/yRangeScale.ts';
import XScaleValues from './scaleValues/xScaleValues/xScaleValues.ts';
//import XRangeScaleValues from './scaleValues/xRangeScaleValues/xRangeScaleValues.ts';
//import YScaleValues from './scaleValues/yScaleValues/yScaleValues.ts';
//import YRangeScaleValues from './scaleValues/yRangeScaleValues/yRangeScaleValues.ts';
import XDiapason from './diapason/xDiapason/xDiapason.ts';
//import XRangeDiapason from './diapason/xRangeDiapason/xRangeDiapason.ts';
//import YDiapason from './diapason/yDiapason/yDiapason.ts';
//import YRangeDiapason from './diapason/yRangeDiapason/yRangeDiapason.ts';
import XRunner from './runner/xRunner/xRunner.ts';
//import XRangeRunner from './runner/xRangeRunner/xRangeRunner.ts';
//import YRunner from './runner/yRunner/yRunner.ts';
//import YRangeRunner from './runner/yRangeRunner/yRangeRunner.ts';
import XTip from './tip/xTip/xTip.ts';
//import XRangeTip from './tip/xRangeTip/xRangeTip.ts';
//import YTip from './tip/yTip/yTip.ts';
//import YRangeTip from './tip/yRangeTip/yRangeTip.ts';
import XProgressBar from './progressBar/xProgressBar/xProgressBar.ts';
//import XRangeProgressBar from './progressBar/xRangeProgressBar/xRangeProgressBar.ts';
//import YProgressBar from './progressBar/yProgressBar/yProgressBar.ts';
//import YRangeProgressBar from './progressBar/yRangeProgressBar/yRangeProgressBar.ts';


class ToxinSliderView implements SliderView {
    
    subjectViewChangeCurrent: ObservableSubject = new ObservableSubject();
    input: HTMLInputElement;
    sliderEl: HTMLElement = document.createElement('div');
    sliderSettings: SliderSettings = {
        extraClass: '',
        min: 1,
        max: 2,
        step: 3,
        current: 4,
        scaleValues: true,
        scaleValuesAmount: 5,
        direction: 'x',
        range: false,
        tip: false,
        separator: 'q'
    };
    state: ViewState = {
        output: null,
        scale: null,
        scaleValues: null,
        diapasones: [],
        runners: [],
        tips: [],
        progressBars: [],
        stepsAmount: 0,
        stepsCoefficient: 0,
        decimalPlaces: 0
    };   
    
    constructor(input: HTMLInputElement) {
        
        for (let key in defaultSliderSettingsView) {
            this.sliderSettings[key] = defaultSliderSettingsView[key];
        }
        
        this.input = input;
        this.setState();
        this.render();
        
    } 
    
    setState(): void {
        
        this.state.diapasones = [];
        this.state.runners = [];
        this.state.tips = [];
        this.state.progressBars = [];
        this.state.stepsAmount = Math.round((this.sliderSettings.max - this.sliderSettings.min) / this.sliderSettings.step);        
        this.state.stepsCoefficient = ((this.sliderSettings.step * this.state.stepsAmount) / ((this.sliderSettings.max - this.sliderSettings.min) / 100)) / 100;
        this.state.decimalPlaces = this.sliderSettings.step.toString().includes('.') ? this.sliderSettings.step.toString().split('.')[1].length : 0;
        
        
        
        
        this.state.output = new XOutput({input: this.input, current: this.sliderSettings.current});
        this.state.scale = new XScale({min: this.sliderSettings.min, max: this.sliderSettings.max, step: this.sliderSettings.step});
        this.state.scaleValues = new XScaleValues();
        this.state.diapasones.push(new XDiapason());
        this.state.runners.push(new XRunner());
        this.state.tips.push(new XTip());
        this.state.progressBars.push(new XProgressBar({min: this.sliderSettings.min, max: this.sliderSettings.max, step: this.sliderSettings.step, current: this.sliderSettings.current}));
        
//        switch (this.sliderSettings.direction) {
//                
//            case 'x':
//                
//                this.state.output = this.sliderSettings.range ? new XRangeOutput(this.input) : new XOutput(this.input);
//                this.state.scale = this.sliderSettings.range ? new XRangeScale() : new XScale();
//                this.state.scaleValues = this.sliderSettings.range ? new XRangeScaleValues() : new XScaleValues();
//                if(this.sliderSettings.range) {
//                    this.state.diapasones.push(new XRangeDiapason());
//                    this.state.diapasones.push(new XRangeDiapason()); 
//                } else {
//                    this.state.diapasones.push(new XDiapason());
//                }
//                
//                for (let i = 0; i < this.state.diapasones.length; i++) {
//                    if (this.state.diapasones.length > 1) {
//                        this.state.runners.push(new XRangeRunner());
//                        if(this.sliderSettings.tip) {
//                            this.state.tips.push(new XRangeTip());
//                        }
//                        this.state.progressBars.push(new XRangeProgressBar());
//                    } else {
//                        this.state.runners.push(new XRunner());
//                        if(this.sliderSettings.tip) {
//                            this.state.tips.push(new XTip());
//                        }
//                        this.state.progressBars.push(new XProgressBar());
//                    }
//                }
//                
//                break;
//                
//            case 'y':
//                
//                this.state.output = this.sliderSettings.range ? new YRangeOutput(this.input) : new YOutput(this.input);
//                this.state.scale = this.sliderSettings.range ? new YRangeScale() : new YScale();
//                this.state.scaleValues = this.sliderSettings.range ? new YRangeScaleValues() : new YScaleValues();
//                if(this.sliderSettings.range) {
//                    this.state.diapasones.push(new YRangeDiapason());
//                    this.state.diapasones.push(new YRangeDiapason()); 
//                } else {
//                    this.state.diapasones.push(new YDiapason());
//                }
//                
//                for (let i = 0; i < this.state.diapasones.length; i++) {
//                    if (this.state.diapasones.length > 1) {
//                        this.state.runners.push(new YRangeRunner());
//                        if(this.sliderSettings.tip) {
//                            this.state.tips.push(new YRangeTip());
//                        }
//                        this.state.progressBars.push(new YRangeProgressBar());
//                    } else {
//                        this.state.runners.push(new YRunner());
//                        if(this.sliderSettings.tip) {
//                            this.state.tips.push(new YTip());
//                        }
//                        this.state.progressBars.push(new YProgressBar());
//                    }
//                }
//                
//                break;
//        }
        
    }
    
    render(): void {
        
        this.sliderEl = document.createElement('div');
        if (this.sliderSettings.direction == 'x' && !this.sliderSettings.range) {
            this.sliderEl.className = 'x-toxin-slider';      
        } else if (this.sliderSettings.direction == 'x' && this.sliderSettings.range) {
            this.sliderEl.className = 'x-range-toxin-slider';
        } else if (this.sliderSettings.direction == 'y' && !this.sliderSettings.range) {
            this.sliderEl.className = 'y-toxin-slider';      
        } else if (this.sliderSettings.direction == 'y' && this.sliderSettings.range) {
            this.sliderEl.className = 'y-range-toxin-slider';
        }
        this.sliderEl.className = this.sliderSettings.extraClass === '' ? this.sliderEl.className : this.sliderEl.className + ' ' + this.sliderSettings.extraClass;
        
        this.input.after(this.sliderEl);
        this.sliderEl.append(this.state.scale.scaleEl);
        
        switch (this.sliderSettings.direction) {
            case 'x':
                this.state.scale.scaleEl.after(this.state.scaleValues.scaleValuesEl);
                this.state.scale.scaleEl.append(this.state.diapasones[0].diapasonEl);
                this.state.diapasones[0].diapasonEl.append(this.state.runners[0].runnerEl);
                this.state.runners[0].runnerEl.before(this.state.progressBars[0].progressBarEl);
                this.state.runners[0].runnerEl.append(this.state.tips[0].tipEl);
                break;
        }
        
    }
    
}


export default ToxinSliderView;