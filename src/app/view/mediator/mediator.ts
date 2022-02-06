import Output from '../output/output.ts';
import Scale from '../scale/scale.ts';
import ScaleValues from '../scaleValues/scaleValues.ts';
import Diapason from '../diapason/diapason.ts';
import Runner from '../runner/runner.ts';
import Tip from '../tip/tip.ts';
import ProgressBar from '../progressBar/progressBar.ts';

class Mediator {
    
    private subviews: any;
    
    constructor(subviews: ViewState) {
        
        this.subviews = subviews;
        subviews.output.mediator = subviews.output ? this : undefined;
        subviews.scale.mediator = subviews.scale ? this : undefined;
        subviews.scaleValues.mediator = subviews.scale ? this : undefined;
        subviews.diapasones.forEach((diapason) => {diapason.mediator = this});
        subviews.tips.forEach((tip) => {tip.mediator = this});
        subviews.runners.forEach((runner) => {runner.mediator = this});
        subviews.progressBars.forEach((bar) => {bar.mediator = this});
        
        subviews.progressBars[subviews.progressBars.length - 1].progressBarEl.style.background = 'linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%)';
          
    }
    
    returnNearestToEventRunnerIndex(pointerDownEvent: PointerEvent): number {
        
        let nearestRunnerIndex: number = 0;
        
        let runnerIndex = 1;
        
        while (runnerIndex < this.subviews.runners.length) {
            
            if (pointerDownEvent.clientX > this.subviews.runners[runnerIndex].runnerEl.getBoundingClientRect().right ||
                pointerDownEvent.clientX - (this.subviews.runners[nearestRunnerIndex].runnerEl.getBoundingClientRect().left + parseFloat(getComputedStyle(this.subviews.runners[nearestRunnerIndex].runnerEl).width) / 2) > (this.subviews.runners[runnerIndex].runnerEl.getBoundingClientRect().left + parseFloat(getComputedStyle(this.subviews.runners[runnerIndex].runnerEl).width) / 2) - pointerDownEvent.clientX
            ){
                return runnerIndex;
            }
            
            runnerIndex++;
        }
        
        return nearestRunnerIndex;
        
    }
    
    mediateScalePointerDown(pointerDown: PointerEvent): void {
        
        pointerDown = this.subviews.runners[0].returnHalfRunnerSize(pointerDown);
        const i = this.returnNearestToEventRunnerIndex(pointerDown);

        const sliderValue = this.subviews.progressBars[i].returnProgressBarSize(pointerDown);
        this.subviews.output.setValue(sliderValue, i);
        this.subviews.tips[i].setValue(sliderValue);
    }
    
    mediateDragging(pointerDown: PointerEvent): void {
        
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
            
            const sliderValue = that.subviews.progressBars[i].returnProgressBarSize(pointerMoveEvent);
            that.subviews.output.setValue(sliderValue, i);
            that.subviews.tips[i].setValue(sliderValue);
            
            if (that.subviews.progressBars[1] && that.subviews.progressBars[0].returnProgressBarValue() > that.subviews.progressBars[1].returnProgressBarValue()) {
                
                const firstProgressBarValue = that.subviews.progressBars[1].returnProgressBarSize(pointerMoveEvent);
                that.subviews.progressBars[0].setCurrent(firstProgressBarValue);
                
                that.subviews.tips.forEach((tip, j) => {
                    that.subviews.output.setValue(firstProgressBarValue, j);
                    that.subviews.tips[j].setValue(firstProgressBarValue);
                });
                
            }
                
        }
        
        document.addEventListener('pointermove', updateSlider);
        document.addEventListener('pointerup', removeListenersFromDocument);
    }
    
};

export default Mediator;