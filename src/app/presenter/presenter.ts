import ObservableSubject from '../observers.ts';

class ToxinSliderPresenter implements SliderPresenter {
    
    model: SliderModel;
    view: SliderView;
    
    constructor(model: SliderModel, view: SliderView) {
        
        this.model = model;
        this.view = view;
        const that = this;
        
        this.view.update(this.convertModelOptionsIntoViewSettings(this.model.state));
        
        this.model.subjectModelUpdateState.addObserver(function() {
            that.view.update(that.convertModelOptionsIntoViewSettings(that.model.state));
        });
        
        this.model.subjectModelChangeCurrent.addObserver(function() {
            that.view.setValue(that.model.state.current);
        });
        
        this.view.subjectViewChangeCurrent.addObserver(function(currentValue) {
            that.model.executeMethod('setState', {current: currentValue});
        });
        
    }
    
    convertModelOptionsIntoViewSettings(modelOptions: ToxinSliderOptions): SliderSettings {
        return {
            extraClass: modelOptions.extraClass,
            min: modelOptions.min,
            max: modelOptions.max,
            step: modelOptions.step,
            current: modelOptions.current,
            scaleValues: modelOptions.scaleValues,
            scaleValuesAmount: modelOptions.scaleValuesAmount,
            direction: modelOptions.direction,
            range: modelOptions.range,
            tip: modelOptions.tip,
            separator: modelOptions.separator,
            decimalPlaces: modelOptions.decimalPlaces,
        };
    }
    
}

export default ToxinSliderPresenter;