import './runner.css';

export class Runner {   
    
    scale: HTMLElement;
    el: HTMLElement = document.createElement('div');
    
    constructor(scale: HTMLElement) {
        this.scale = scale;
        this.renderRunner();
    }
    
    renderRunner(): void {
        this.el.className = 'toxinSlider';
        this.scale.append(this.el);
    }
    
};