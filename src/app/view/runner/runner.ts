import './runner.css';
import ObservableSubject from '../../observers.ts';

export class Runner {   
    
    subject: any = new ObservableSubject();
    sliderState: any;
    index: number;
    runnerEl: HTMLElement = document.createElement('div');
    mousePosOnRunner: number = 0;
    
    constructor(index: number, sliderState: any) {
        this.sliderState = sliderState;
        this.index = index;
        this.renderRunner();
    }
    
    renderRunner(): void {
        this.runnerEl.className = 'toxinRunner';
        this.sliderState.ranges[this.index].rangeEl.append(this.runnerEl);
    }
    
};
