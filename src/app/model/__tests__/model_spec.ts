import ToxinSliderModel from '../model.ts';
import { defaultSliderSettingsModel } from '../../defaults.ts';

describe('ToxinSliderModel', function() {
    
    let model: any;
    
    beforeEach(function() {
        model = new ToxinSliderModel();
    });
    
    it('Должен быть объявлен', function() {
        expect(ToxinSliderModel).toBeDefined();
    });
    
    it('Записывает дефолтные значения в свойство state', function() {
        const model: SliderModel = new ToxinSliderModel();
        expect(model.state).toBe(defaultSliderSettingsModel);
    });
    
    it('Конструктор класса может менять дефолтные значения в свойстве state', function() {
        const testModel: SliderModel = new ToxinSliderModel({
            start: 1,
            end: 2,
            step: 3,
            current: 4,
            scaleValuesAmount: 5,
            direction: 'y',
            range: true,
            tip: true,
            separator: ' : '
        });
        
        expect(testModel.state.start).toEqual(1);
        expect(testModel.state.end).toEqual(2);
        expect(testModel.state.step).toEqual(3);
        expect(testModel.state.current).toEqual(4);
        expect(testModel.state.scaleValuesAmount).toEqual(5);
        expect(testModel.state.direction).toEqual('y');
        expect(testModel.state.range).toEqual(true);
        expect(testModel.state.tip).toEqual(true);
        expect(testModel.state.separator).toEqual(' : ');
    });
    
    it('Обладает методом setState, который переписывает свойство state', function() {
        model.setState({
            start: 1,
            end: 2,
            step: 3,
            current: 4,
            scaleValuesAmount: 5,
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
            scaleValuesAmount: 5,
            direction: 'y',
            range: true,
            tip: true,
            separator: ' : '
        });
    });
    
    it('Обладает методом update, который обновляет свойство state и уведомляет наблюдателей', function() {
        const model: any = new ToxinSliderModel();
        let testValue: number = 0;
        
        model.subjectModelUpdateState.addObserver(function() {
            testValue = 1;
        });
        model.update({step: 4});
        expect(model.state.step).toEqual(4);
        expect(testValue).toEqual(1);
    });
    
    it('Обладает методом setCurrent, который меняет значение state.current и уведомляет наблюдателей', function() {
        const model: any = new ToxinSliderModel();
        let testValue: number = 0;
        
        model.subjectModelChangeCurrent.addObserver(function() {
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