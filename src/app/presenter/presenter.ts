import ObservableSubject from '../observers.ts';

class ToxinSliderPresenter implements SliderPresenter {
    
    model: Object;
    view: Object;
    
    constructor(model: Object, view: Object) {
        
        this.model = model;
        this.view = view;
        const that = this;
     
//        that.view.setState(that.convertModelSettingsIntoViewSettings(that.model.returnModelStateInstance()));
//        
//        this.model.observableSubjects.subjectModelUpdateState.addObserver(function(settings) {
//            that.view.setState(that.convertModelSettingsIntoViewSettings(settings));
//        });
        
//        this.model.observableSubjects.subjectModelChangeCurrent.addObserver(function(current) {
//            that.view.setValue(current);
//        });
//        
//        this.view.globalSubjects.subjectViewChangeCurrent.addObserver(function(currentValue) {
//            that.model.executeMethod('setState', {current: currentValue});
//        });
        
    }
    
    convertModelSettingsIntoViewSettings(modelSettings: ToxinSliderSettings): SliderSettings {
        return {
            extraClass: modelSettings.extraClass,
            min: modelSettings.min,
            max: modelSettings.max,
            step: modelSettings.step,
            current: modelSettings.current,
            scaleValues: modelSettings.scaleValues,
            scaleValuesAmount: modelSettings.scaleValuesAmount,
            direction: modelSettings.direction,
            range: modelSettings.range,
            tip: modelSettings.tip,
            separator: modelSettings.separator,
            decimalPlaces: modelSettings.decimalPlaces,
        };
    }
    
}

export default ToxinSliderPresenter;