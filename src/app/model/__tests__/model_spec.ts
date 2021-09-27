import ToxinSliderModel from '../model.ts';
import defaultSliderSettings from '../../defaults.ts';

describe('ToxinSliderModel', function() {
    
    it('должен быть объявлен', function() {
        expect(ToxinSliderModel).toBeDefined();
    });
    
    it('должен записывать дефолтные значения в свойство state', function() {
        const model: SliderModel = new ToxinSliderModel();
        expect(model.state).toBe(defaultSliderSettings);
    });
    
    it('конструктор класса может менять дефолтные значения в свойстве state', function() {
        const model: SliderModel = new ToxinSliderModel({
            start: 1,
            end: 2,
            step: 3,
            current: 4,
            scaleValues: 5,
            direction: 'y',
            range: true,
            tip: true,
            separator: ' : '
        });
        
        expect(model.state.start).toEqual(1);
        expect(model.state.end).toEqual(2);
        expect(model.state.step).toEqual(3);
        expect(model.state.current).toEqual(4);
        expect(model.state.scaleValues).toEqual(5);
        expect(model.state.direction).toEqual('y');
        expect(model.state.range).toEqual(true);
        expect(model.state.tip).toEqual(true);
        expect(model.state.separator).toEqual(' : ');
    });
    
    it('Обладает методом setState, который переписывает свойство state', function() {
        const model: any = new ToxinSliderModel();
        model.setState({
            start: 1,
            end: 2,
            step: 3,
            current: 4,
            scaleValues: 5,
            direction: 'y',
            range: true,
            tip: true,
            separator: ' : '
        });
        expect(model.state).toEqual({
            start: 1,
            end: 2,
            step: 3,
            current: 4,
            scaleValues: 5,
            direction: 'y',
            range: true,
            tip: true,
            separator: ' : '
        });
    });
    
    it('Обладает методом update, который обновляет свойство state и уведомляет наблюдателей', function() {
        const model: any = new ToxinSliderModel();
        let testValue: number = 0;
        
        model.subject.addObserver(function() {
            testValue = 1;
        });
        model.update({step: 4});
        expect(model.state.step).toEqual(4);
        expect(testValue).toEqual(1);
    });
    
    it('Обладает методом setCurrent, который меняет значение state.current и уведомляет наблюдателей', function() {
        const model: any = new ToxinSliderModel();
        let testValue: number = 0;
        
        model.modelCurrent.addObserver(function() {
            testValue = 1;
        });
        model.setCurrent(25);
        expect(model.state.current).toEqual(25);
        expect(testValue).toEqual(1);
    });
    
    it('Обладает методом executeMethod, который может вызывать методы модели update, setCurrent и setState с переданными параметрами', function() {
        const model: any = new ToxinSliderModel();
        model.executeMethod('setState', {step: 0});
        model.executeMethod('update', {start: 1});
        model.executeMethod('setCurrent', 3)
        expect(model.state.step).toBe(0);
        expect(model.state.start).toBe(1);
        expect(model.state.current).toBe(3);
    });
    
});