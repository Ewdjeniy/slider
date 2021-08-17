import './xRunner.css';
import {Runner} from '../runner.ts';

export class XRunner extends Runner {
    
    constructor(index: number, sliderState: any) {
        super(index, sliderState);
        this.runnerEl.onmousedown = this.updateSlider.bind(this);
    }
    
    updateSlider(e: MouseEvent): boolean {
        this.subject.notifyObservers();
        let changeProgressBar: any = this.sliderState.progressBars[this.index].setProgressBarSize.bind(this.sliderState.progressBars[this.index]);
        const changeOutput: any = this.sliderState.output.countOutputValue.bind(this.sliderState.output);
        let showTip: any;
        if (this.sliderState.sliderSettings.tip) {
            showTip = this.sliderState.tips[this.index].showTip.bind(this.sliderState.tips[this.index]);
        }
        const removeListenersFromDocument = function() {
            document.removeEventListener('mousemove', changeProgressBar);
            document.removeEventListener('mousemove', changeOutput);
            document.removeEventListener('mousemove', showTip);
            document.removeEventListener('mouseup', removeListenersFromDocument);
        }
        
        this.mousePosOnRunner = e.clientX - this.runnerEl.getBoundingClientRect().left;
        
        document.addEventListener('mousemove', changeProgressBar);
        document.addEventListener('mousemove', changeOutput);
        document.addEventListener('mousemove', showTip);
        document.addEventListener('mouseup', removeListenersFromDocument);
        return false;
    }
    
};
