class SettingsValidator {
    
    settings: ToxinSliderSettings;
    
    returnValidatedSettings(settings: ToxinSliderSettings): ToxinSliderSettings {
        this.settings = settings;
        this.validateCurrentAndRange();
        this.validateStep();
        this.validateMax();
        this.validateScaleValuesAmount();
        this.validateDirection();
        this.validateDecimalPlaces();
        
        return Object.assign({}, this.settings);
    }
    
    validateScaleValuesAmount(): void {
        
        if (isNaN(this.settings.scaleValuesAmount) || !isFinite(this.settings.scaleValuesAmount) || parseInt((this.settings.scaleValuesAmount).toString()) !== this.settings.scaleValuesAmount || this.settings.scaleValuesAmount < 0) {
            this.settings.scaleValuesAmount = 0;
        }
        
    }
    
    validateStep(): void {
        this.settings.step = (this.settings.step > (this.settings.max - this.settings.min)) ? this.settings.max - this.settings.min : this.settings.step;
    }
    
    validateMax(): void {
        this.settings.max = this.settings.max <= this.settings.min ? this.settings.min + this.settings.step : this.settings.max;
    }
    
    validateCurrentAndRange(): void {
        
        this.settings.current = !(this.settings.current instanceof Array) ? [this.settings.current] : this.settings.current;
        
        for (let i = 0; i < this.settings.current.length; i++) {
            if (isNaN(this.settings.current[i]) || !isFinite(this.settings.current[i])) {
                this.settings.current[i] = this.settings.min;
            }
            this.settings.current[i] = this.settings.current[i] < this.settings.min ? this.settings.min : this.settings.current[i];
            this.settings.current[i] = this.settings.current[i] > this.settings.max ? this.settings.max : this.settings.current[i];
            
            if ((+(this.settings.current[i] * 100000000).toFixed() - (+(this.settings.min * 100000000).toFixed())) % +(this.settings.step * 100000000).toFixed() != 0) {
                this.settings.current[i] = +(Math.round(this.settings.current[i] / this.settings.step) * this.settings.step).toFixed(this.settings.step);
            }
        }
        
        if ((this.settings.current instanceof Array) && this.settings.current.length == 2 && this.settings.current[0] > this.settings.current[1]) {
            this.settings.current = [this.settings.current[1], this.settings.current[0]];   
        }
        
        if ((this.settings.current instanceof Array) && this.settings.current.length > 1) {
            this.settings.range = true;
        } else {
            this.settings.range = false;
        }
        
        
    }
    
    validateDirection(): void {
        this.settings.direction = this.settings.direction == 'y' ? this.settings.direction : 'x';
    }
    
    validateDecimalPlaces(): void {
        
        if (isNaN(this.settings.decimalPlaces) || !isFinite(this.settings.decimalPlaces) || parseInt((this.settings.decimalPlaces).toString()) !== this.settings.decimalPlaces || this.settings.decimalPlaces < 0) {
            this.settings.scaleValuesAmount = 0;
        }
        
    }
    
}

export default SettingsValidator;
