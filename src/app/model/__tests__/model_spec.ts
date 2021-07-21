import { ToxinSliderModel } from '../model.ts';

describe('ToxinSliderModel', function() {
    let inpt: any;
    
    beforeEach(function() {
        inpt = setFixtures('<input type="text" id="slider">');
    });
    
    it('должен быть объявлен', function() {
        expect(ToxinSliderModel).toBeDefined();
    });
    
    it('принимает опции и может менять дефолтные значения ', function() {
        const model: any = new ToxinSliderModel({
            start: 1,
            end: 2,
            current: 3,
            step: 4,
        });
        
        expect(model.state.start).toEqual(1);
        expect(model.state.end).toEqual(2);
        expect(model.state.current).toEqual(3);
        expect(model.state.step).toEqual(4);
    });
});