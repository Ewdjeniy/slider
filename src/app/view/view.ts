import './view.css';
import { defaultSliderSettingsView } from './defaults.ts';
import ObservableSubject from '../observers.ts';
import Output from './output/output.ts';
import Scale from './scale/scale.ts';
import ScaleValues from './scaleValues/scaleValues.ts';
import Diapason from './diapason/diapason.ts';
import Runner from './runner/runner.ts';
import Tip from './tip/tip.ts';
import ProgressBar from './progressBar/progressBar.ts';
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
        separator: '--',
        decimalPlaces: 100
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
    subviewsMediator: Object = null;
    
    constructor(input: HTMLInputElement) {
        this.init(input);
    }
    
    init(input: HTMLInputElement): void {
        
        this.setSettings(defaultSliderSettingsView);      
        this.input = input;
    }
    
    update(settings: SliderSettings): void {
        
        this.sliderEl.remove();
        this.setSettings(settings);
        this.setState();
        this.render();
        this.subviewsMediator = new Mediator(this.state, this.subjectViewChangeCurrent);
        
    }
    
    setSettings(settings: Object): void {
        for (let key in settings) {
            if(key in this.sliderSettings) {
                this.sliderSettings[key] = settings[key];
            }
        }
    }
    
    setValue(value: number[]): void {
        this.subviewsMediator.mediateSettingValue(value);
    }
    
    setState(): void {
        this.state.diapasones = [];
        this.state.runners = [];
        this.state.tips = [];
        this.state.progressBars = [];
        this.state.output = new Output({input: this.input, current: this.sliderSettings.current, separator: this.sliderSettings.separator});
        this.state.scale = new Scale({direction: this.sliderSettings.direction});
        this.state.scaleValues = new ScaleValues({direction: this.sliderSettings.direction, scaleValues: this.sliderSettings.scaleValues, scaleValuesAmount : this.sliderSettings.scaleValuesAmount, min: this.sliderSettings.min, max: this.sliderSettings.max, step: this.sliderSettings.step});
        
        this.sliderSettings.current.forEach((current) => {
            
            this.state.diapasones.push(new Diapason({direction: this.sliderSettings.direction}));
            this.state.runners.push(new Runner({max: this.sliderSettings.max, current: current, direction: this.sliderSettings.direction}));
            if (this.sliderSettings.tip) {
                this.state.tips.push(new Tip({current: current, direction: this.sliderSettings.direction}));
            }
            this.state.progressBars.push(new ProgressBar({direction: this.sliderSettings.direction, min: this.sliderSettings.min, max: this.sliderSettings.max, step: this.sliderSettings.step, current: current, decimalPlaces: this.sliderSettings.decimalPlaces}));
            
        });
        
    }
    
    render(): void {
        
        this.sliderEl = document.createElement('div');
        
        switch (this.sliderSettings.direction) {
            case 'x':
                this.sliderEl.className = 'toxin-slider toxin-slider_x';
                this.sliderEl.className = this.sliderSettings.extraClass === '' ? this.sliderEl.className : this.sliderEl.className + ' ' + this.sliderSettings.extraClass;
                this.input.after(this.sliderEl);
                this.sliderEl.append(this.state.scale.scaleEl);
                this.state.scale.scaleEl.after(this.state.scaleValues.scaleValuesEl);
                this.sliderSettings.current.forEach((current, i) => {
                    this.state.scale.scaleEl.append(this.state.diapasones[i].diapasonEl);
                    this.state.diapasones[i].diapasonEl.append(this.state.runners[i].runnerEl);
                    this.state.runners[i].runnerEl.before(this.state.progressBars[i].progressBarEl);
                    
                    if (this.sliderSettings.tip) {
                        this.state.runners[i].runnerEl.append(this.state.tips[i].tipEl); 
                    }   
                });
                break;
                
            case 'y':
                this.sliderEl.className = 'toxin-slider toxin-slider_y';
                this.sliderEl.className = this.sliderSettings.extraClass === '' ? this.sliderEl.className : this.sliderEl.className + ' ' + this.sliderSettings.extraClass;
                this.input.after(this.sliderEl);
                this.sliderEl.append(this.state.scale.scaleEl);
                this.state.scale.scaleEl.before(this.state.scaleValues.scaleValuesEl);
                this.sliderSettings.current.forEach((current, i) => {
                    this.state.scale.scaleEl.append(this.state.diapasones[i].diapasonEl);
                    this.state.diapasones[i].diapasonEl.append(this.state.runners[i].runnerEl);
                    this.state.runners[i].runnerEl.after(this.state.progressBars[i].progressBarEl);
                    if (this.sliderSettings.tip) {
                        this.state.runners[i].runnerEl.append(this.state.tips[i].tipEl); 
                    }
                });
                break;
        }
        
    }
    
}


export default ToxinSliderView;