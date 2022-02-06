class Output {

    outputEl: HTMLInputElement;
    separator: string;
    current: number[];
    mediator: any;

    constructor(options: Object) {
        this.outputEl = options.input;
        this.separator = options.separator;
        this.current = options.current;
        
        this.current.forEach((current, i) => {
            this.setValue(current, i); 
        });
    }
    
    setValue(value: number, i: number): void {
        
        this.current[i] = value;
        
        this.outputEl.value = this.current[0].toString();
        let j = 1;
        while (j < this.current.length) {
            this.outputEl.value += this.separator + this.current[j];
            j++;
        }
    }
    
    dispatchEvent(): void {
        let event = new Event("input");
        this.outputEl.dispatchEvent(event);
        event = new Event("change");
        this.outputEl.dispatchEvent(event); 
    }
    
};

export default Output;