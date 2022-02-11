class SettingsValidator {
    
    settings: ToxinSliderOptions;
    
    constructor() {

    }
    
    returnDecimalPlaces(num): number {
        const decimalPlaces = num.toString().includes('.') ? num.toString().split('.')[1].length : 0;
        return decimalPlaces;
    }
    
    validateSettings(settings: ToxinSliderOptions): void {
        this.settings = settings;
        this.validateCurrent();
        this.validateRange();
        this.validateStep();
        this.validateMax();
    }
    
    validateStep(): void {
        this.settings.step = (this.settings.step > (this.settings.max - this.settings.min)) ? this.settings.max - this.settings.min : this.settings.step;
    }
    
    validateMax(): void {
        this.settings.max = this.settings.max <= this.settings.min ? this.settings.min + this.settings.step : this.settings.max;
    }
    
    validateCurrent(): void {
        
        if (!(this.settings.current instanceof Array) && !isNaN(parseFloat(this.settings.current)) && isFinite(this.settings.current)) {
            this.settings.current = [this.settings.current];
        } else if (!(this.settings.current instanceof Array)) {
            this.settings.current = [this.settings.min];      
        }
        
        this.settings.current.forEach((cur) => {
            cur = cur < this.settings.min ? this.settings.min : cur;
            cur = cur > this.settings.max ? this.settings.max : cur;
            
            if ((this.settings.min * 100000000 - cur * 100000000) % (this.settings.step * 100000000) != 0) {
                cur = +(Math.round(cur / this.settings.step) * this.settings.step).toFixed(this.returnDecimalPlaces(this.settings.step));
            }
        });        
        
        if ((this.settings.current instanceof Array) && this.settings.current.length == 2 && this.settings.current[0] > this.settings.current[1]) {
            this.settings.current = [this.settings.current[1], this.settings.current[0]];   
        }
        
    }
    
    validateRange(): void {
        
        if ((this.settings.current instanceof Array) && this.settings.current.length > 1) {
            this.settings.range = true;
        } else {
            this.settings.range = false;
        }
        
    }
    
}

export default SettingsValidator;
