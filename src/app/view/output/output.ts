import ObservableSubject from '../../observers.ts';

class Output {

    outputEl: HTMLInputElement;
    separator: string;
    current: number[];
    stepInPx: number = 1;
    zeroPoint: Object = {x: 0, y: 0};
    globalSubjects: Object = {};

    constructor(input: HTMLInputElement, settings: Object, globalSubjects?: Object) {
        
        this.init(input, settings);
        
    }
    
    init(input: HTMLInputElement, settings: Object, globalSubjects?: Object): void {
        
        if (globalSubjects) {
            this.globalSubjects = globalSubjects;
        }
        
        this.outputEl = input;
        this.separator = settings.separator;
        this.current = settings.current;
        
        this.current.forEach((current, i) => {
            this.setValue(current, i); 
        });
        
    }
    
    returnValue(): number[] {
        return this.current;
    }
    
    setValue(value: number, i: number): void {
        
        this.current[i] = value;
        
        this.outputEl.value = this.current[0].toString();
        let j = 1;
        while (j < this.current.length) {
            this.outputEl.value += this.separator + this.current[j];
            j++;
        }
        this.dispatchEvent();
    }
    
    dispatchEvent(): void {
        this.outputEl.dispatchEvent(new Event("input"));
        this.outputEl.dispatchEvent(new Event("change")); 
    }
    
};

export default Output;