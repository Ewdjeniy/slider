import './xRangeRunner.css';
import Runner from '../runner.ts';

class XRangeRunner extends Runner implements SliderRunner {
    
    constructor(index: number, sliderState: SliderState) {
        super(index, sliderState);
        this.renderRunner();
        this.runnerEl.onpointerdown = this.updateSlider.bind(this);
    }
    
    updateSlider(e: PointerEvent): boolean {
        let changeProgressBar: voidFunction = this.sliderState.progressBars[this.index].setProgressBarSize.bind(this.sliderState.progressBars[this.index]);
        const changeOutput: voidFunction = this.sliderState.output.countOutputValue.bind(this.sliderState.output);
        let showTip: voidFunction;
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
    
    renderRunner(): void {
        this.runnerEl.className = 'x-range-runner';
        this.sliderState.ranges[this.index].rangeEl.append(this.runnerEl);
    }
    
};

export default XRangeRunner;