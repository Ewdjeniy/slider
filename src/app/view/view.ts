import './view.css';
import { defaultSliderSettingsView } from './defaults.ts';
import ObservableSubject from '../observers.ts';
import XOutput from './output/xOutput/xOutput.ts';
import XRangeOutput from './output/xRangeOutput/xRangeOutput.ts';
import YOutput from './output/yOutput/yOutput.ts';
import YRangeOutput from './output/yRangeOutput/yRangeOutput.ts';
import XScale from './scale/xScale/xScale.ts';
import XRangeScale from './scale/xRangeScale/xRangeScale.ts';
import YScale from './scale/yScale/yScale.ts';
import YRangeScale from './scale/yRangeScale/yRangeScale.ts';
import XScaleValues from './scaleValues/xScaleValues/xScaleValues.ts';
import XRangeScaleValues from './scaleValues/xRangeScaleValues/xRangeScaleValues.ts';
import YScaleValues from './scaleValues/yScaleValues/yScaleValues.ts';
import YRangeScaleValues from './scaleValues/yRangeScaleValues/yRangeScaleValues.ts';
import XDiapason from './diapason/xDiapason/xDiapason.ts';
import XRangeDiapason from './diapason/xRangeDiapason/xRangeDiapason.ts';
import YDiapason from './diapason/yDiapason/yDiapason.ts';
import YRangeDiapason from './diapason/yRangeDiapason/yRangeDiapason.ts';
import XRunner from './runner/xRunner/xRunner.ts';
import XRangeRunner from './runner/xRangeRunner/xRangeRunner.ts';
import YRunner from './runner/yRunner/yRunner.ts';
import YRangeRunner from './runner/yRangeRunner/yRangeRunner.ts';
import XTip from './tip/xTip/xTip.ts';
import XRangeTip from './tip/xRangeTip/xRangeTip.ts';
import YTip from './tip/yTip/yTip.ts';
import YRangeTip from './tip/yRangeTip/yRangeTip.ts';
import XProgressBar from './progressBar/xProgressBar/xProgressBar.ts';
import XRangeProgressBar from './progressBar/xRangeProgressBar/xRangeProgressBar.ts';
import YProgressBar from './progressBar/yProgressBar/yProgressBar.ts';
import YRangeProgressBar from './progressBar/yRangeProgressBar/yRangeProgressBar.ts';


class ToxinSliderView implements SliderView {
    
    subjectViewChangeCurrent: ObservableSubject = new ObservableSubject();
    input: HTMLInputElement;
    sliderEl: HTMLElement;
    sliderSettings: SliderSettings = defaultSliderSettingsView;
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
        
        this.input = input;
        this.init();
        
    }
    
    init(): void {
        this.setState();
        this.render();
        this.setElementsValues();
        this.state.runners.forEach((runner, i) => {
            const that = this;
            runner.runnerEl.onpointerdown = function(pointerDownEvent) {
                that.updateSliderOnDragging(pointerDownEvent, i);
            };
        });
        this.state.scale.scaleEl.onpointerdown = this.updateSliderOnPointerDown.bind(this);
        this.state.scaleValues.scaleValuesEl.onclick = this.updateSliderOnScaleValuesClick.bind(this);
    }
    
    getCurrentValue(): number | number[] {
        let current: number | number[];
        current = this.state.output.countOutputValue(
            this.state.progressBars[0].progressBarEl,
            this.state.stepsAmount,
            this.sliderSettings.start,
            this.sliderSettings.end,
            this.sliderSettings.step,
            this.state.decimalPlaces,
            this.state.progressBars[1].progressBarEl,
            this.sliderSettings.separator
        );
        return current;
    }
    
    updateSliderOnScaleValuesClick(e: PointerEvent): void {
        
        const scaleValueElements = this.state.scaleValues.scaleValuesEl.getElementsByClassName('scale-value');
        const runnerIndex = this.returnNearestRunnerIndex(e);
        let current: any;
        
        for (let i = 0; i < scaleValueElements.length; i++) {
            if (scaleValueElements[i] == e.target) { 
                if (this.sliderSettings.range) {
                    current = this.state.output.outputEl.value.split(this.sliderSettings.separator);
                    current[runnerIndex] = scaleValueElements[i].innerHTML;
                } else {
                    current = +scaleValueElements[i].innerHTML;
                }
                
                this.state.progressBars[runnerIndex].setCurrent(current, this.sliderSettings.start, this.sliderSettings.end, this.sliderSettings.step, runnerIndex);
                this.state.output.setCurrent(current, this.sliderSettings.start, this.sliderSettings.end, this.sliderSettings.separator);
                this.state.tips.forEach((tip, i) => {
                    tip.setCurrent(current, this.sliderSettings.start, this.sliderSettings.end, i);
                });
                this.subjectViewChangeCurrent.notifyObservers(current);
                this.state.output.dispatchEvent();
                return;
            }
        }
        this.updateSliderOnPointerDown(e);
        
    }
    
    returnNearestRunnerIndex(e: PointerEvent): number {
        
        let nearestRunnerIndex;
    
        if (!this.sliderSettings.range) {
            nearestRunnerIndex = 0;
        } else {
            
            switch (this.sliderSettings.direction) {
             
                case 'x':
                    if (e.clientX > this.state.runners[1].runnerEl.getBoundingClientRect().right) {
                        nearestRunnerIndex = 1;
                    } else if (e.clientX < this.state.runners[0].runnerEl.getBoundingClientRect().left) {
                        nearestRunnerIndex = 0;
                    } else if (
                        e.clientX - (this.state.runners[0].runnerEl.getBoundingClientRect().left + parseFloat(getComputedStyle(this.state.runners[0].runnerEl).width) / 2) < (this.state.runners[1].runnerEl.getBoundingClientRect().left + parseFloat(getComputedStyle(this.state.runners[1].runnerEl).width) / 2) - e.clientX) {
                        nearestRunnerIndex = 0;
                    } else {
                        nearestRunnerIndex = 1;
                    }
                    break;
                    
                case 'y':
                    if (e.clientY < this.state.runners[1].runnerEl.getBoundingClientRect().top) {
                        nearestRunnerIndex = 1;
                    } else if (e.clientY > this.state.runners[0].runnerEl.getBoundingClientRect().bottom) {
                        nearestRunnerIndex = 0;
                    } else if (
                        e.clientY - (this.state.runners[0].runnerEl.getBoundingClientRect().top + parseFloat(getComputedStyle(this.state.runners[0].runnerEl).height) / 2) > (this.state.runners[1].runnerEl.getBoundingClientRect().bottom + parseFloat(getComputedStyle(this.state.runners[1].runnerEl).height) / 2) - e.clientY) {
                        nearestRunnerIndex = 0;
                    } else {
                        nearestRunnerIndex = 1;
                    }
                    break;

            }
            
        }
        return nearestRunnerIndex;
    }
    
    updateSliderOnPointerDown(e: PointerEvent): boolean {
        let n: number = 0;
        let current: number | number[];
        
        for (var i = 0; i < this.state.runners.length; i++) {
            if (event.target == this.state.runners[i].runnerEl) {
                return false;
            }
        }
        
        if (i == 1) {
            i -= 1;
        } else {
            i = this.returnNearestRunnerIndex(e);
            n = (i == 0) ? 1 : 0;
        }
        
        const mousePosOnRunner: number = parseFloat(getComputedStyle(this.state.runners[i].runnerEl).width) / 2;
        this.state.progressBars[i].countProgressBarSize(
            e,
            this.state.scale.returnScaleStart(),
            this.state.scale.returnScaleStep(this.state.runners[i].runnerEl, this.state.stepsCoefficient, this.state.stepsAmount),
            mousePosOnRunner
        );
        current = this.state.output.countOutputValue(
            this.state.progressBars[i].progressBarEl,
            this.state.stepsAmount,
            this.sliderSettings.start,
            this.sliderSettings.end,
            this.sliderSettings.step,
            this.state.decimalPlaces,
            this.state.progressBars[n].progressBarEl,
            this.sliderSettings.separator
        );
        
        this.state.tips.forEach((tip, j) => {
            tip.showTip(
                this.state.progressBars[j].progressBarEl,
                this.state.stepsAmount,
                this.sliderSettings.start,
                this.sliderSettings.end,
                this.sliderSettings.step,
                this.state.decimalPlaces
            );
        });
        
        this.subjectViewChangeCurrent.notifyObservers(current);
        this.state.output.dispatchEvent();
        
        return false;
        
    }  
    
    updateSliderOnDragging(pointerDownEvent: PointerEvent, runnerIndex): boolean {
        
        const that = this;
        const mousePosOnRunner: number = that.state.runners[runnerIndex].returnMousePosOnRunner(pointerDownEvent);
        const removeListenersFromDocument = function() {
            document.removeEventListener('pointermove', changeProgressBar);
            document.removeEventListener('pointermove', changeOutput);
            document.removeEventListener('pointermove', changeTip);
            document.removeEventListener('pointerup', removeListenersFromDocument);
        }
        const changeProgressBar: voidFunction = function(moveEvent) {
            let secondBarEl: boolean | HTMLElement = false;
            let size: number;
            
            if (that.state.progressBars.length > 1) {
                const n = (runnerIndex == 0) ? 1 : 0;
                secondBarEl = that.state.progressBars[n].progressBarEl;
            }
            
            size = that.state.progressBars[runnerIndex].countProgressBarSize(
                moveEvent,
                that.state.scale.returnScaleStart(),
                that.state.scale.returnScaleStep(that.state.runners[runnerIndex].runnerEl, that.state.stepsCoefficient, that.state.stepsAmount),
                mousePosOnRunner,
                secondBarEl
            );
            
        };
        const changeOutput: voidFunction = function() {
            let secondBarEl: boolean | HTMLElement = false;
            if (that.state.progressBars.length > 1) {
                const n = (runnerIndex == 0) ? 1 : 0;
                secondBarEl = that.state.progressBars[n].progressBarEl;
            }
            
            let current: number | number[] = that.state.output.countOutputValue(
                that.state.progressBars[runnerIndex].progressBarEl,
                that.state.stepsAmount,
                that.sliderSettings.start,
                that.sliderSettings.end,
                that.sliderSettings.step,
                that.state.decimalPlaces,
                secondBarEl,
                that.sliderSettings.separator
            );
            that.subjectViewChangeCurrent.notifyObservers(current);
            that.state.output.dispatchEvent();
        };
        const changeTip: voidFunction = function() {
            that.state.tips.forEach((tip, j) => {
                tip.showTip(
                    that.state.progressBars[j].progressBarEl,
                    that.state.stepsAmount,
                    that.sliderSettings.start,
                    that.sliderSettings.end,
                    that.sliderSettings.step,
                    that.state.decimalPlaces
                );
            });
        };
        
        document.addEventListener('pointermove', changeProgressBar);
        document.addEventListener('pointermove', changeOutput);
        document.addEventListener('pointermove', changeTip);
        document.addEventListener('pointerup', removeListenersFromDocument);
        
        return false;
        
    }
    
    setState(): void {
        
        this.state.diapasones = [];
        this.state.runners = [];
        this.state.tips = [];
        this.state.progressBars = [];
        this.state.stepsAmount = Math.round((this.sliderSettings.end - this.sliderSettings.start) / this.sliderSettings.step);
        this.state.stepsCoefficient = ((this.sliderSettings.step * this.state.stepsAmount) / ((this.sliderSettings.end - this.sliderSettings.start) / 100)) / 100;
        this.state.decimalPlaces = this.sliderSettings.step.toString().includes('.') ? this.sliderSettings.step.toString().split('.')[1].length : 0;
        
        switch (this.sliderSettings.direction) {
                
            case 'x':
                
                this.state.output = this.sliderSettings.range ? new XRangeOutput(this.input) : new XOutput(this.input);
                this.state.scale = this.sliderSettings.range ? new XRangeScale() : new XScale();
                this.state.scaleValues = this.sliderSettings.range ? new XRangeScaleValues() : new XScaleValues();
                if(this.sliderSettings.range) {
                    this.state.diapasones.push(new XRangeDiapason());
                    this.state.diapasones.push(new XRangeDiapason()); 
                } else {
                    this.state.diapasones.push(new XDiapason());
                }
                
                for (let i = 0; i < this.state.diapasones.length; i++) {
                    if (this.state.diapasones.length > 1) {
                        this.state.runners.push(new XRangeRunner());
                        if(this.sliderSettings.tip) {
                            this.state.tips.push(new XRangeTip());
                        }
                        this.state.progressBars.push(new XRangeProgressBar());
                    } else {
                        this.state.runners.push(new XRunner());
                        if(this.sliderSettings.tip) {
                            this.state.tips.push(new XTip());
                        }
                        this.state.progressBars.push(new XProgressBar());
                    }
                }
                
                break;
                
            case 'y':
                
                this.state.output = this.sliderSettings.range ? new YRangeOutput(this.input) : new YOutput(this.input);
                this.state.scale = this.sliderSettings.range ? new YRangeScale() : new YScale();
                this.state.scaleValues = this.sliderSettings.range ? new YRangeScaleValues() : new YScaleValues();
                if(this.sliderSettings.range) {
                    this.state.diapasones.push(new YRangeDiapason());
                    this.state.diapasones.push(new YRangeDiapason()); 
                } else {
                    this.state.diapasones.push(new YDiapason());
                }
                
                for (let i = 0; i < this.state.diapasones.length; i++) {
                    if (this.state.diapasones.length > 1) {
                        this.state.runners.push(new YRangeRunner());
                        if(this.sliderSettings.tip) {
                            this.state.tips.push(new YRangeTip());
                        }
                        this.state.progressBars.push(new YRangeProgressBar());
                    } else {
                        this.state.runners.push(new YRunner());
                        if(this.sliderSettings.tip) {
                            this.state.tips.push(new YTip());
                        }
                        this.state.progressBars.push(new YProgressBar());
                    }
                }
                
                break;
        }
        
    }
    
    setElementsValues(): void {
        this.state.scaleValues.setScaleValues(this.sliderSettings.scaleValuesAmount, this.sliderSettings.start, this.sliderSettings.end, this.sliderSettings.step, this.state.decimalPlaces);
        if (this.state.diapasones.length > 1) {
            this.state.diapasones[0].diapasonEl.style.zIndex = +getComputedStyle(this.state.diapasones[0].diapasonEl).zIndex + 1;
            this.state.diapasones[0].diapasonEl.style.background = getComputedStyle(this.state.scale.scaleEl).background;     
        }
        
        this.state.progressBars.forEach((bar, i) => {
            bar.setFontSize(this.state.scale.returnScaleStep(this.state.runners[i].runnerEl, this.state.stepsCoefficient, this.state.stepsAmount));
            bar.setCurrent(this.sliderSettings.current, this.sliderSettings.start, this.sliderSettings.end, this.sliderSettings.step, i);
        });
        this.state.output.setCurrent(this.sliderSettings.current, this.sliderSettings.start, this.sliderSettings.end, this.sliderSettings.separator);
        this.state.tips.forEach((tip, i) => {
            tip.setCurrent(this.sliderSettings.current, this.sliderSettings.start, this.sliderSettings.end, i);
        });
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
        this.input.after(this.sliderEl);
        this.state.scale.render(this.sliderEl);
        this.state.scaleValues.render(this.state.scale.scaleEl);
        this.state.diapasones.forEach((diapasone, i) => {
            
            diapasone.render(this.state.scale.scaleEl)
            this.state.runners[i].render(diapasone.diapasonEl);
            this.state.progressBars[i].render(this.state.runners[i].runnerEl);
            if (this.sliderSettings.tip) {
                this.state.tips[i].render(this.state.runners[i].runnerEl);
            }
            
        });
        
    }
    
    update(settings: Object): void {
        
        this.sliderEl.remove();
//        this.sliderSettings = {
//            start: 23,
//            end: 133,
//            step: 3,
//            current: 33,
//            scaleValuesAmount: 3,
//            direction: 'x',
//            range: false,
//            tip: true,
//            separator: ' - '
//        }
        for (let key in settings) {
            if (key in this.sliderSettings) {
                this.sliderSettings[key] = settings[key]; 
            }
        }
        this.init();   
    }

}


export default ToxinSliderView;