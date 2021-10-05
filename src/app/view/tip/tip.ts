import ObservableSubject from '../../observers.ts';

class Tip {   
    
    tipEl: HTMLElement = document.createElement('div');
    
    constructor() {

    }
    
    showTip(barEl, stepsAmount, start, end, step): number {
        let outputValue: number;
        
        if (parseInt(barEl.style.width) <= stepsAmount) {
            outputValue = +start + parseInt(barEl.style.width) * step;
        } else {
            outputValue = +end;
        }
        
        this.tipEl.innerHTML = outputValue.toString(); 
        return outputValue;
    }
    
};

export default Tip
