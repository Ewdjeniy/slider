import './progressBar.css';
import ObservableSubject from '../../observers.ts';

class ProgressBar {
    
    sliderState: SliderState;
    index: number;
    progressBarEl: HTMLElement = document.createElement('div');
    
    constructor(index: number, sliderState: SliderState) {
        this.sliderState = sliderState;
        this.index = index;
        this.setFontSize();
    }
    
    setFontSize(): void {
        this.progressBarEl.style.fontSize = this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl) + 'px';
    }
    
};

export default ProgressBar;