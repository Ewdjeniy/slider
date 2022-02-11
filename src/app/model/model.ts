import * as $ from 'jquery';
import ObservableSubject from '../observers.ts';
import SettingsValidator from './settingsValidator.ts';
import { defaultSliderSettingsModel } from './defaults.ts';

class ToxinSliderModel implements SliderModel {
    
    subjectModelUpdateState: ObservableSubject = new ObservableSubject();
    subjectModelChangeCurrent: ObservableSubject = new ObservableSubject();
    state: ToxinSliderOptions = {};
    settingsValidator: any = new SettingsValidator();
    
    constructor(options?: ToxinSliderOptions) {
        this.init(options);
    }
    
    public executeMethod(method: string, args: any): void {
        if (method === 'get') {
            this.get[args]();
        } else if (this[method]) {
            this[method](args);
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.toxinSlider' );
        }
    }
    
    public get: any = {
        current: function() {
            return this.state.current;
        }
    }
    
    protected init(options?: ToxinSliderOptions): void {
        for (let key in defaultSliderSettingsModel) {
            this.state[key] = defaultSliderSettingsModel[key];
        }
        
        for (let key in this.get) {
            this.get[key] = this.get[key].bind(this);
        }
        this.setState(options);
        this.settingsValidator.validateSettings(this.state);
    }
    
    protected setState(options: ToxinSliderOptions): void {
        this.state = $.extend( this.state, options );
        this.settingsValidator.validateSettings(this.state);
    }
    
    protected update(options: ToxinSliderOptions): void {
        this.setState(options);
        this.subjectModelUpdateState.notifyObservers();
    }
    
    protected setCurrent(current: number[]): void {
        this.state.current = current;
        this.subjectModelChangeCurrent.notifyObservers();
    }
    
}

export default ToxinSliderModel;

//    protected returnDecimalPlaces(num): number {
//        const decimalPlaces = num.toString().includes('.') ? num.toString().split('.')[1].length : 0;
//        return decimalPlaces;
//    }

//    protected synchronizeSettings(): void {
//        
//        if (this.state.range && !(this.state.current instanceof Array)) {
//            this.state.current = [this.state.current, this.state.current];
//        } else if ((this.state.current instanceof Array) && !this.state.range) {
//            this.state.range = true;       
//        } else if (!this.state.range && (this.state.current instanceof Array)) {
//            this.state.current = this.state.current[1];
//        }
//        
//        if (!this.state.range) {
//            if (this.state.current <= this.state.start) {
//                this.state.current = this.state.start;
//            } else if (this.state.current >= this.state.end) {
//                this.state.current = this.state.end;
//            } else if ((this.state.start * 1000000 - this.state.current * 1000000) % (this.state.step * 1000000) != 0) {
//                this.state.current = +(Math.round(this.state.current / this.state.step) * this.state.step).toFixed(this.returnDecimalPlaces(this.state.step));
//            }
//        } else {
//            if (this.state.current[0] <= this.state.start) {
//                this.state.current[0] = this.state.start;
//            } else if (this.state.current[0] >= this.state.end) {
//                this.state.current[0] = this.state.end;
//            } else if ((this.state.start * 1000000 - this.state.current[0] * 1000000) % (this.state.step * 1000000) != 0) {
//                this.state.current[0] = Math.round(this.state.current[0] / this.state.step) * this.state.step;
//            }
//            
//            if (this.state.current[1] <= this.state.start) {
//                this.state.current[1] = this.state.start;
//            } else if (this.state.current[1] >= this.state.end) {
//                this.state.current[1] = this.state.end;
//            } else if ((this.state.start * 1000000 - this.state.current[1] * 1000000) % (this.state.step * 1000000) != 0) {
//                this.state.current[1] = Math.round(this.state.current[1] / this.state.step) * this.state.step;
//            }
//        }
//        
//    }