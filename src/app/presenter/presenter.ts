import ObservableSubject from '../observers.ts';

class ToxinSliderPresenter implements SliderPresenter {
    
    model: SliderModel;
    view: SliderView;
    
    constructor(model: SliderModel, view: SliderView) {
        
        this.model = model;
        this.view = view;
        const that = this;
        
        this.view.update(this.model.state);
        
        this.model.subjectModelUpdateState.addObserver(function() {
            that.view.update(that.model.state);
        });
        
        this.model.subjectModelChangeCurrent.addObserver(function() {
            that.view.update({current: model.state.current});
        });
        
        this.view.subjectViewChangeCurrent.addObserver(function(currentValue) {
            that.model.executeMethod('setState', {current: currentValue});
        });
        
    }
    
}

export default ToxinSliderPresenter;