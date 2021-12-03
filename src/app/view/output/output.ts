class Output {

    outputEl: HTMLInputElement;

    constructor(input: HTMLInputElement) {
        this.outputEl = input;
    }
    
    dispatchEvent(): void {
        let event = new Event("input");
        this.outputEl.dispatchEvent(event);
        event = new Event("change");
        this.outputEl.dispatchEvent(event); 
    }
    
};

export default Output;