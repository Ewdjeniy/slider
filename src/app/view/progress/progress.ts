import './progress.css';

export class Progress {
    state: any = {
        'start': 0,
        'end': 100,
    };
    runner: HTMLElement;
    input: HTMLInputElement;
    el: HTMLElement = document.createElement('div');
    
    constructor(input: HTMLInputElement, runner: HTMLElement) {
        this.input = input;
        this.runner = runner;
        this.renderRunner();
        this.updateStart();
        this.runner.onmousedown = this.updateProgress.bind(this);
    }
    
    renderRunner(): void {
        this.el.className = 'progressBar';
        this.runner.before(this.el);
    }
    
    updateProgress(): void {
        const self: any = this;
        document.onmousemove = function(event: MouseEvent) {
            self.el.style.width = event.clientX + 'px';	
        }
        document.onmousemove = function(event: MouseEvent) {
            self.el.style.width = event.clientX + 'px';	
        }
        
        document.onmouseup = function(event: MouseEvent) {
            document.onmousemove = function(event: MouseEvent) {
                return false;	
            }
        };
    }
    
    updateStart() : void {
        this.input.value = this.state.start;
    }
};