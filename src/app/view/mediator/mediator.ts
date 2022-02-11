import Output from '../output/output.ts';
import Scale from '../scale/scale.ts';
import ScaleValues from '../scaleValues/scaleValues.ts';
import Diapason from '../diapason/diapason.ts';
import Runner from '../runner/runner.ts';
import Tip from '../tip/tip.ts';
import ProgressBar from '../progressBar/progressBar.ts';
import ObservableSubject from '../../observers.ts';

class Mediator {
    
    private subviews: any;
    direction: string;
    subjectViewChangeCurrentLink: ObservableSubject;
    
    constructor(subviews: ViewState, subjectViewChangeCurrentLink: ObservableSubject) {
        
        this.subviews = subviews;
        this.subjectViewChangeCurrentLink = subjectViewChangeCurrentLink;
        this.direction = this.subviews.scale.scaleEl.clientWidth > this.subviews.scale.scaleEl.clientHeight ? 'x' : 'y';
        subviews.output.mediator = subviews.output ? this : undefined;
        subviews.scale.mediator = subviews.scale ? this : undefined;
        subviews.scaleValues.mediator = subviews.scaleValues ? this : undefined;
        subviews.diapasones.forEach((diapason) => {diapason.mediator = this});
        subviews.tips.forEach((tip) => {tip.mediator = this});
        subviews.runners.forEach((runner) => {runner.mediator = this});
        subviews.progressBars.forEach((bar) => {bar.mediator = this});
        
        if (subviews.progressBars[0]) {
            subviews.progressBars[0].setZindex('100000'); 
        }
        
        if (subviews.runners[0]) {
            subviews.runners[0].setZindex('100000'); 
        }
        
        if (subviews.progressBars[subviews.progressBars.length - 1]) {
            
            subviews.progressBars[subviews.progressBars.length - 1].setBackground('linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%)');
            
        }
        
        this.setSliderStepInPx();
        
        if (this.subviews.scaleValues && this.direction == 'x') {
            this.subviews.scaleValues.moveScaleValues('left', this.subviews.runners[0].runnerEl.offsetWidth / 2);
        } else if (this.subviews.scaleValues && this.direction == 'y') {
            this.subviews.scaleValues.moveScaleValues('top', (-1) * this.subviews.runners[0].runnerEl.offsetWidth / 2);       
        }
          
    }
    
    setSliderStepInPx(): void {
        
        const size = this.direction == 'x' ? 'width' : 'height';
        
        const progressBarMaxSize = parseFloat(getComputedStyle(this.subviews.scale.scaleEl)[size]) - parseFloat(getComputedStyle(this.subviews.runners[0].runnerEl)[size]);
        this.subviews.progressBars.forEach((bar) => {
            bar.setStepInPx(progressBarMaxSize);
        });
        this.subviews.scaleValues.setStepInPx(this.subviews.progressBars[0].returnStepInPx());
    }
    
    returnNearestToEventRunnerIndex(pointerDownEvent: PointerEvent): number {
        
        let nearestRunnerIndex: number = 0;
        
        let runnerIndex = 1;
        
        while (runnerIndex < this.subviews.runners.length) {
            
            switch (this.direction) {
                case 'x':
                    if (
                        pointerDownEvent.clientX > this.subviews.runners[runnerIndex].runnerEl.getBoundingClientRect().right ||
                        pointerDownEvent.clientX - (this.subviews.runners[nearestRunnerIndex].runnerEl.getBoundingClientRect().left + parseFloat(getComputedStyle(this.subviews.runners[nearestRunnerIndex].runnerEl).width) / 2) > (this.subviews.runners[runnerIndex].runnerEl.getBoundingClientRect().left + parseFloat(getComputedStyle(this.subviews.runners[runnerIndex].runnerEl).width) / 2) - pointerDownEvent.clientX
                    ){
                        return runnerIndex;
                    }
                    break;
                    
                case 'y':
                    if (
                        pointerDownEvent.clientY < this.subviews.runners[runnerIndex].runnerEl.getBoundingClientRect().top ||
                        pointerDownEvent.clientY - (this.subviews.runners[nearestRunnerIndex].runnerEl.getBoundingClientRect().top + parseFloat(getComputedStyle(this.subviews.runners[nearestRunnerIndex].runnerEl).height) / 2) < (this.subviews.runners[runnerIndex].runnerEl.getBoundingClientRect().bottom + parseFloat(getComputedStyle(this.subviews.runners[runnerIndex].runnerEl).height) / 2) - pointerDownEvent.clientY
                    ){
                        return runnerIndex;
                    }
                    break;
            }
            
            runnerIndex++;
        }
        
        return nearestRunnerIndex;
        
    }
    
    mediateValuePointerDown(pointerDown: PointerEvent, value: number): void {
        this.setSliderStepInPx();
        const i = this.returnNearestToEventRunnerIndex(pointerDown);
        
        this.subviews.progressBars[i].setValue(value);
        
        const sliderValue = this.subviews.progressBars[i].returnValue();
        this.subviews.output.setValue(sliderValue, i);
        if (this.subviews.tips[i]) {
            this.subviews.tips[i].setValue(sliderValue); 
        }
        this.subjectViewChangeCurrentLink.notifyObservers(this.subviews.output.returnValue());
        
    }
    
    mediateScalePointerDown(pointerDown: PointerEvent): void {
        
        this.setSliderStepInPx();
        
        const i = this.returnNearestToEventRunnerIndex(pointerDown);
        pointerDown = this.subviews.runners[0].returnHalfRunnerSize(pointerDown);
        
        this.subviews.progressBars[i].setValueOnEvent(pointerDown);

        const sliderValue = this.subviews.progressBars[i].returnValue();
        this.subviews.output.setValue(sliderValue, i);
        if (this.subviews.tips[i]) {
            this.subviews.tips[i].setValue(sliderValue); 
        }
        this.subjectViewChangeCurrentLink.notifyObservers(this.subviews.output.returnValue());
    }
    
    mediateDragging(pointerDown: PointerEvent): void {
        
        this.setSliderStepInPx();
        
        const that = this;
        let i = this.returnNearestToEventRunnerIndex(pointerDown);
        
        this.subviews.runners.forEach((runner) => {
            runner.setCurrentZedIndex();
        });
        this.subviews.runners[i].setHigerZedIndex();
        
        const removeListenersFromDocument = function() {
            document.removeEventListener('pointermove', updateSlider);
            document.removeEventListener('pointerup', removeListenersFromDocument);
        }
        
        const updateSlider: voidFunction = function(pointerMoveEvent) {
            
            pointerMoveEvent = that.subviews.runners[i].returnMousePosOnRunner(pointerMoveEvent);
            
            that.subviews.progressBars[i].setValueOnEvent(pointerMoveEvent);
            
            const sliderValue = that.subviews.progressBars[i].returnValue();
            that.subviews.output.setValue(sliderValue, i);
            if (that.subviews.tips[i]) {
                that.subviews.tips[i].setValue(sliderValue); 
            }
            
            if (that.subviews.progressBars[1] && that.subviews.progressBars[0].returnValue() > that.subviews.progressBars[1].returnValue()) {
                
                that.subviews.progressBars[1].setValueOnEvent(pointerMoveEvent);
                const firstProgressBarValue = that.subviews.progressBars[1].returnValue();
                that.subviews.progressBars[0].setValue(firstProgressBarValue);
                
                that.subviews.tips.forEach((tip, j) => {
                    that.subviews.output.setValue(firstProgressBarValue, j);
                    that.subviews.tips[j].setValue(firstProgressBarValue);
                });
                
            }
            
            that.subjectViewChangeCurrentLink.notifyObservers(that.subviews.output.returnValue());
                
        }
        
        document.addEventListener('pointermove', updateSlider);
        document.addEventListener('pointerup', removeListenersFromDocument);
    }
    
    mediateSettingValue(value: number[]) {
        value.forEach((val, i) => {
            this.subviews.progressBars[i].setValue(val);
            const sliderValue = this.subviews.progressBars[i].returnValue();
            this.subviews.output.setValue(sliderValue, i);
            if (this.subviews.tips[i]) {
                this.subviews.tips[i].setValue(sliderValue); 
            }
        });
    }
    
};

export default Mediator;