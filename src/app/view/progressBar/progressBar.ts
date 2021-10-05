import './progressBar.css';
import ObservableSubject from '../../observers.ts';

class ProgressBar {
    
    progressBarEl: HTMLElement = document.createElement('div');
    
    constructor() {

    }
    
    setFontSize(scaleStepVal): void {
        this.progressBarEl.style.fontSize = scaleStepVal + 'px';
    }
    
};

export default ProgressBar;