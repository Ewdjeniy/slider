import './progressBar.css';
import ObservableSubject from '../../observers.ts';

export class ProgressBar {
    
    subject: any = new ObservableSubject();
    sliderState: any;
    index: number;
    progressBarEl: HTMLElement = document.createElement('div');
    
    constructor(index: number, sliderState: any) {
        this.sliderState = sliderState;
        this.index = index;
        this.setFontSize();
    }
    
    setFontSize(): void {
        this.progressBarEl.style.fontSize = this.sliderState.scale.countScaleStep(this.sliderState.runners[this.index].runnerEl) + 'px';
    }
    
};
