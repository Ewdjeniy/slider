import './range.css';
import ObservableSubject from '../../observers.ts';

export class Range {   
    
    subject: any = new ObservableSubject();
    sliderState: any;
    rangeEl: HTMLElement = document.createElement('div');
    
    constructor(sliderState: any) {
        this.sliderState = sliderState;
        this.renderRange();
        if (this.sliderState.sliderSettings.range && this.sliderState.ranges[0]) {
            this.sliderState.ranges[0].rangeEl.style.zIndex = +getComputedStyle(this.sliderState.ranges[0].rangeEl).zIndex + 1;
            this.sliderState.ranges[0].rangeEl.style.background = getComputedStyle(this.sliderState.scale.scaleEl).background;
        }
    }
    
    renderRange(): void {
        this.rangeEl.className = 'toxinRange';
        this.sliderState.scale.scaleEl.append(this.rangeEl);
    }
    
};