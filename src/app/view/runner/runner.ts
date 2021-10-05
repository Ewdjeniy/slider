import ObservableSubject from '../../observers.ts';

class Runner {   
    
    runnerEl: HTMLElement = document.createElement('div');
    subject: ObservableSubject = new ObservableSubject();
    mousePosOnRunner: number = 0;
    
    constructor() {

    }
    
};

export default Runner;