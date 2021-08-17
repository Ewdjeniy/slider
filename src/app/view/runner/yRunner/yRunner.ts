import './yRunner.css';
import {Runner} from '../runner.ts';

export class YRunner extends Runner {   
    
    constructor(index: number, sliderState: any) {
        super(index, sliderState);
        this.runnerEl.onmousedown = this.updateSlider.bind(this);
    }
    
    updateSlider(e: MouseEvent): boolean {
        let changeProgressBar: any = this.sliderState.progressBars[this.index].setProgressBarHeight.bind(this.sliderState.progressBars[this.index]);
        const changeOutput: any = this.sliderState.output.countOutputValue.bind(this.sliderState.output);
        const removeListenersFromDocument = function() {
            document.removeEventListener('mousemove', changeProgressBar);
            document.removeEventListener('mousemove', changeOutput);
            document.removeEventListener('mouseup', removeListenersFromDocument);
        }
        
        this.mousePosOnRunner = this.runnerEl.getBoundingClientRect().bottom - e.clientY;
        
        
        document.addEventListener('mousemove', changeProgressBar);
        document.addEventListener('mousemove', changeOutput);
        document.addEventListener('mouseup', removeListenersFromDocument);
        return false;
    }
    
};
