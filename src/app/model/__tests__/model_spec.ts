import ToxinSliderModel from '../model.ts';
import { defaultSliderSettingsModel } from '../defaults.ts';

describe('ToxinSliderModel', function() {
    
    let model: any;
    
    beforeEach(function() {
        model = new ToxinSliderModel();
    });
    
    it('Записывает дефолтные значения в свойство state', function() {
        const model: SliderModel = new ToxinSliderModel();
        expect(model.state).toEqual(defaultSliderSettingsModel);
    });
    
    it('Конструктор класса может менять дефолтные значения в свойстве state', function() {
        const testModel: SliderModel = new ToxinSliderModel({
            extraClass: 'test',
            min: 1,
            max: 20,
            step: 3,
            current: [4],
            scaleValues: true,
            scaleValuesAmount: 5,
            direction: 'y',
            range: false,
            tip: true,
            separator: ' : ',
            decimalPlaces: 6
        });
        
        expect(testModel.state.extraClass).toEqual('test');
        expect(testModel.state.min).toEqual(1);
        expect(testModel.state.max).toEqual(20);
        expect(testModel.state.step).toEqual(3);
        expect(testModel.state.current).toEqual([4]);
        expect(testModel.state.scaleValues).toEqual(true);
        expect(testModel.state.scaleValuesAmount).toEqual(5);
        expect(testModel.state.direction).toEqual('y');
        expect(testModel.state.range).toEqual(false);
        expect(testModel.state.tip).toEqual(true);
        expect(testModel.state.separator).toEqual(' : ');
        expect(testModel.state.decimalPlaces).toEqual(6);
    });
    
    it('Обладает методом setState, который переписывает свойство state', function() {
        model.setState({
            extraClass: 'test',
            min: 7,
            max: 80,
            step: 3,
            current: [10, 40],
            scaleValues: true,
            scaleValuesAmount: 9,
            direction: 'y',
            range: true,
            tip: true,
            separator: ' : ',
            decimalPlaces: 10
        });
        expect(model.state).toEqual({
            extraClass: 'test',
            min: 7,
            max: 80,
            step: 3,
            current: [10, 40],
            scaleValues: true,
            scaleValuesAmount: 9,
            direction: 'y',
            range: true,
            tip: true,
            separator: ' : ',
            decimalPlaces: 10
        });
    });
    
    it('Обладает методом update, который обновляет свойство state и уведомляет наблюдателей', function() {
        let testValue: number = 0;
        
        model.observableSubjects.subjectModelUpdateState.addObserver(function() {
            testValue = 1;
        });
        model.update({step: 4});
        expect(model.state.step).toEqual(4);
        expect(testValue).toEqual(1);
    });
    
    it('Обладает методом setCurrent, который меняет значение state.current и уведомляет наблюдателей', function() {
        let testValue: number = 0;
        
        model.observableSubjects.subjectModelChangeCurrent.addObserver(function() {
            testValue = 1;
        });
        model.setCurrent([25]);
        expect(model.state.current).toEqual([25]);
        expect(testValue).toEqual(1);
    });
    
    it('Обладает методом executeMethod, который может вызывать методы модели update, setCurrent и setState с переданными параметрами', function() {
        const model: any = new ToxinSliderModel();
        model.executeMethod('setState', {step: 0});
        model.executeMethod('update', {min: 1});
        model.executeMethod('setCurrent', 3)
        expect(model.state.step).toBe(0);
        expect(model.state.min).toBe(1);
        expect(model.state.current).toBe(3);
    });
    
});