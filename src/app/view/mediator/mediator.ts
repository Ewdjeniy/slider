import XOutput from '../output/xOutput/xOutput.ts';
import XScale from '../scale/xScale/xScale.ts';
import XScaleValues from '../scaleValues/xScaleValues/xScaleValues.ts';
import XDiapason from '../diapason/xDiapason/xDiapason.ts';
import XRunner from '../runner/xRunner/xRunner.ts';
import XTip from '../tip/xTip/xTip.ts';
import XProgressBar from '../progressBar/xProgressBar/xProgressBar.ts';

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
          
    }
    
    mediateScalePointerDown(pointerDown: PointerEvent): void {
        
        pointerDown = this.subviews.runners[0].returnHalfRunnerSize(pointerDown);
        
        const sliderValue = this.subviews.progressBars[0].returnProgressBarSize(pointerDown);
        this.subviews.output.setValue(sliderValue);
        this.subviews.tips[0].setValue(sliderValue);
    }
    
    mediateDragging(): void {
        
        const that = this;
        
        const removeListenersFromDocument = function() {
            document.removeEventListener('pointermove', updateSlider);
            document.removeEventListener('pointerup', removeListenersFromDocument);
        }
        
        const updateSlider: voidFunction = function(pointerMoveEvent) {
            
            pointerMoveEvent = that.subviews.runners[0].returnMousePosOnRunner(pointerMoveEvent);
            
            const sliderValue = that.subviews.progressBars[0].returnProgressBarSize(pointerMoveEvent);
            that.subviews.output.setValue(sliderValue);
            that.subviews.tips[0].setValue(sliderValue);
        }
        
        document.addEventListener('pointermove', updateSlider);
        document.addEventListener('pointerup', removeListenersFromDocument);
    }
    
};

export default Mediator;