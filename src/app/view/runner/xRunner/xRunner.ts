import './xRunner.css';
import {Runner} from '../runner.ts';

export class XRunner extends Runner {
    
    constructor(index: number, sliderState: any) {
        super(index, sliderState);
        this.runnerEl.onpointerdown = this.updateSlider.bind(this);
    }
    
    updateSlider(e: PointerEvent): boolean {
        let changeProgressBar: any = this.sliderState.progressBars[this.index].setProgressBarSize.bind(this.sliderState.progressBars[this.index]);
        const changeOutput: any = this.sliderState.output.countOutputValue.bind(this.sliderState.output);
        let showTip: any;
        if (this.sliderState.sliderSettings.tip) {
            showTip = () => this.sliderState.tips.forEach((tip) => tip.showTip());
        }
        const removeListenersFromDocument = function() {
            document.removeEventListener('pointermove', changeProgressBar);
            document.removeEventListener('pointermove', changeOutput);
            document.removeEventListener('pointermove', showTip);
            document.removeEventListener('pointerup', removeListenersFromDocument);
        }
        
        this.mousePosOnRunner = e.clientX - this.runnerEl.getBoundingClientRect().left;
        
        document.addEventListener('pointermove', changeProgressBar);
        document.addEventListener('pointermove', changeOutput);
        document.addEventListener('pointermove', showTip);
        document.addEventListener('pointerup', removeListenersFromDocument);
        return false;
    }
    
};
