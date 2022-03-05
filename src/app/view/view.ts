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
import ProgressBarsOperator from './progressBarsOperator/progressBarsOperator.ts';
import TipsOperator from './tipsOperator/tipsOperator.ts';
import RunnersOperator from './runnersOperator/runnersOperator.ts';
import SliderRenderer from './sliderRenderer/sliderRenderer.ts';


class ToxinSliderView extends SliderRenderer {
    
    sliderEl: HTMLElement;
    renderer: any = new SliderRenderer();
    state: any = {
        class: "toxin-slider",
        extraClass: '',
        min: 1,
        max: 2,
        step: 3,
        current: 4,
        scaleValues: true,
        scaleValuesAmount: 5,
        direction: "x",
        range: false,
        tip: false,
        separator: "--",
        decimalPlaces: 100
    };
    
    constructor(input: HTMLInputElement) {
        
        super();
        this.init(input);
        
    }
    
    init(input: HTMLInputElement): void {
        
        const root: HTMLElement = document.createElement('div');
        root.className = 'root';
        input.after(root);
        
    }
    
    render(): void {
        
    }
    
}


export default ToxinSliderView;


//    update(settings: SliderSettings): void {
//        this.setSettings(settings);
//        this.render();
//    }

//    sliderSettings: SliderSettings = {
//        extraClass: '',
//        min: 1,
//        max: 2,
//        step: 3,
//        current: 4,
//        scaleValues: true,
//        scaleValuesAmount: 5,
//        direction: 'x',
//        range: false,
//        tip: false,
//        separator: '--',
//        decimalPlaces: 100
//    };
//
//state: ViewState = {
//        output: null,
//        scale: null,
//        scaleValues: null,
//        diapasones: [],
//        runners: [],
//        tips: [],
//        progressBars: []
//    };

// render(): void {
//        
//        this.sliderEl = document.createElement('div');
//        
//        switch (this.sliderSettings.direction) {
//            case 'x':
//                this.sliderEl.className = 'toxin-slider toxin-slider_x';
//                this.sliderEl.className = this.sliderSettings.extraClass === '' ? this.sliderEl.className : this.sliderEl.className + ' ' + this.sliderSettings.extraClass;
//                this.input.after(this.sliderEl);
//                this.sliderEl.append(this.state.scale.scaleEl);
//                this.state.scale.scaleEl.after(this.state.scaleValues.scaleValuesEl);
//                this.sliderSettings.current.forEach((current, i) => {
//                    this.state.scale.scaleEl.append(this.state.diapasones[i].diapasonEl);
//                    this.state.diapasones[i].diapasonEl.append(this.state.runners[i].runnerEl);
//                    this.state.runners[i].runnerEl.before(this.state.progressBars[i].progressBarEl);
//                    
//                    if (this.sliderSettings.tip) {
//                        this.state.runners[i].runnerEl.append(this.state.tips[i].tipEl); 
//                    }   
//                });
//                break;
//                
//            case 'y':
//                this.sliderEl.className = 'toxin-slider toxin-slider_y';
//                this.sliderEl.className = this.sliderSettings.extraClass === '' ? this.sliderEl.className : this.sliderEl.className + ' ' + this.sliderSettings.extraClass;
//                this.input.after(this.sliderEl);
//                this.sliderEl.append(this.state.scale.scaleEl);
//                this.state.scale.scaleEl.before(this.state.scaleValues.scaleValuesEl);
//                this.sliderSettings.current.forEach((current, i) => {
//                    this.state.scale.scaleEl.append(this.state.diapasones[i].diapasonEl);
//                    this.state.diapasones[i].diapasonEl.append(this.state.runners[i].runnerEl);
//                    this.state.runners[i].runnerEl.after(this.state.progressBars[i].progressBarEl);
//                    if (this.sliderSettings.tip) {
//                        this.state.runners[i].runnerEl.append(this.state.tips[i].tipEl); 
//                    }
//                });
//                break;
//        }    
//    
//    }

//    setSliderStepInPx(): void {
//        
//        const sizeName: string = this.sliderSettings.direction == 'x' ? 'width' : 'height';
//        let sliderStepInPx: number = 0;
//        
//        const progressBarMaxSize = parseFloat(getComputedStyle(this.state.scale.scaleEl)[sizeName]) - parseFloat(getComputedStyle(this.state.runners[0].runnerEl)[sizeName]);
//        
//        sliderStepInPx = progressBarMaxSize / Math.floor((this.sliderSettings.max - this.sliderSettings.min) / this.sliderSettings.step);
//        
//    }

//    setState(): void {
//        
//        this.state.diapasones = [];
//        this.state.runners = [];
//        this.state.tips = [];
//        this.state.progressBars = [];
//        this.state.output = new Output(this.input, Object.assign({}, this.sliderSettings), this.globalSubjects);
//        this.state.scale = new Scale({
//            elToReplace: this.sliderEl.getElementsByClassName('scale')[0],
//            settings: Object.assign({}, this.sliderSettings),
//            globalSubjects: this.globalSubjects
//        });    
//        this.state.scaleValues = new ScaleValues(Object.assign({}, this.sliderSettings), this.globalSubjects);
//        
//        this.sliderSettings.current.forEach((current) => {
//            
//            this.state.diapasones.push(new Diapason(Object.assign({}, this.sliderSettings, {current: current}), this.globalSubjects));
//            this.state.runners.push(new Runner(Object.assign({}, this.sliderSettings, {current: current}), this.globalSubjects));
//            this.state.tips.push(new Tip(Object.assign({}, this.sliderSettings, {current: current}), this.globalSubjects));
//            this.state.progressBars.push(new ProgressBar(Object.assign({}, this.sliderSettings, {current: current}), this.globalSubjects));
//            
//        });
//        
//    }