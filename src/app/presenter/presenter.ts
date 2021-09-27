import ObservableSubject from '../observers.ts';

class ToxinSliderPresenter implements SliderPresenter {
    
    model: SliderModel;
    view: SliderView;
    
    constructor(model: SliderModel, view: SliderView) {
        this.model = model;
        this.view = view;
        const that = this;
        
        this.view.update(this.model.state);
        
        this.model.subject.addObserver(function() {
            that.view.update(model.state);
        });
        
        this.model.modelCurrent.addObserver(function() {
            that.view.updateCurrent(model.state.current);
        });
        
        this.view.subject.addObserver(function() {
            that.model.executeMethod('setState', {current: view.getCurrentValue()});
        });
    }
    
}

export default ToxinSliderPresenter;