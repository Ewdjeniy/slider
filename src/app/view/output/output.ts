class Output {

    outputEl: HTMLInputElement;
    mediator: any;

    constructor(options: Object) {
        this.outputEl = options.input;
    }
    
    dispatchEvent(): void {
        let event = new Event("input");
        this.outputEl.dispatchEvent(event);
        event = new Event("change");
        this.outputEl.dispatchEvent(event); 
    }
    
};

export default Output;