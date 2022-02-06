import './view.css';
import { defaultSliderSettingsView } from './defaults.ts';
import ObservableSubject from '../observers.ts';
import Output from './output/output.ts';
//import XRangeOutput from './output/xRangeOutput/xRangeOutput.ts';
//import YOutput from './output/yOutput/yOutput.ts';
//import YRangeOutput from './output/yRangeOutput/yRangeOutput.ts';
import Scale from './scale/scale.ts';
//import XRangeScale from './scale/xRangeScale/xRangeScale.ts';
//import YScale from './scale/yScale/yScale.ts';
//import YRangeScale from './scale/yRangeScale/yRangeScale.ts';
import ScaleValues from './scaleValues/scaleValues.ts';
//import XRangeScaleValues from './scaleValues/xRangeScaleValues/xRangeScaleValues.ts';
//import YScaleValues from './scaleValues/yScaleValues/yScaleValues.ts';
//import YRangeScaleValues from './scaleValues/yRangeScaleValues/yRangeScaleValues.ts';
import Diapason from './diapason/diapason.ts';
//import XRangeDiapason from './diapason/xRangeDiapason/xRangeDiapason.ts';
//import YDiapason from './diapason/yDiapason/yDiapason.ts';
//import YRangeDiapason from './diapason/yRangeDiapason/yRangeDiapason.ts';
import Runner from './runner/runner.ts';
//import XRangeRunner from './runner/xRangeRunner/xRangeRunner.ts';
//import YRunner from './runner/yRunner/yRunner.ts';
//import YRangeRunner from './runner/yRangeRunner/yRangeRunner.ts';
import Tip from './tip/tip.ts';
//import XRangeTip from './tip/xRangeTip/xRangeTip.ts';
//import YTip from './tip/yTip/yTip.ts';
//import YRangeTip from './tip/yRangeTip/yRangeTip.ts';
import ProgressBar from './progressBar/progressBar.ts';
//import XRangeProgressBar from './progressBar/xRangeProgressBar/xRangeProgressBar.ts';
//import YProgressBar from './progressBar/yProgressBar/yProgressBar.ts';
//import YRangeProgressBar from './progressBar/yRangeProgressBar/yRangeProgressBar.ts';

import Mediator from './mediator/mediator.ts';


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
        separator: '--'
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
        new Mediator(this.state);
        
    } 
    
    setState(): void {
        
        this.state.diapasones = [];
        this.state.runners = [];
        this.state.tips = [];
        this.state.progressBars = [];
        this.state.output = new Output({input: this.input, current: this.sliderSettings.current, separator: this.sliderSettings.separator});
        this.state.scale = new Scale();
        this.state.scaleValues = new ScaleValues({scaleValues: this.sliderSettings.scaleValues, scaleValuesAmount : this.sliderSettings.scaleValuesAmount, min: this.sliderSettings.min, max: this.sliderSettings.max, step: this.sliderSettings.step});
        
        this.sliderSettings.current.forEach((current) => {
            
            this.state.diapasones.push(new Diapason({max: this.sliderSettings.max, current: current}));
            this.state.runners.push(new Runner({max: this.sliderSettings.max, current: current}));
            this.state.tips.push(new Tip({current: current}));
            this.state.progressBars.push(new ProgressBar({min: this.sliderSettings.min, max: this.sliderSettings.max, step: this.sliderSettings.step, current: current}));
            
        });
        
    }
    
    render(): void {
        
        this.sliderEl = document.createElement('div');
        this.sliderEl.className = 'toxin-slider';
        this.sliderEl.className = this.sliderSettings.extraClass === '' ? this.sliderEl.className : this.sliderEl.className + ' ' + this.sliderSettings.extraClass;
        
        this.input.after(this.sliderEl);
        this.sliderEl.append(this.state.scale.scaleEl);
        this.state.scale.scaleEl.after(this.state.scaleValues.scaleValuesEl);
        this.sliderSettings.current.forEach((current, i) => {
            this.state.scale.scaleEl.append(this.state.diapasones[i].diapasonEl);
            this.state.diapasones[i].diapasonEl.append(this.state.runners[i].runnerEl);
            this.state.runners[i].runnerEl.before(this.state.progressBars[i].progressBarEl);
            this.state.runners[i].runnerEl.append(this.state.tips[i].tipEl);   
        });
        
    }
    
}


export default ToxinSliderView;