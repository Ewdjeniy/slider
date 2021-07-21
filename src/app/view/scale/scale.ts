import './scale.css';

export class Scale {
    input: HTMLInputElement;
    sliderState: any;
    el:  HTMLElement = document.createElement('div');

    constructor(input: HTMLInputElement, sliderState: any) {
        this.input = input;
        this.sliderState = sliderState;
        this.renderScale();
    }
    
    renderScale(): void {
        this.el.className = 'toxinScale';
        this.input.after(this.el);
    }
    
};