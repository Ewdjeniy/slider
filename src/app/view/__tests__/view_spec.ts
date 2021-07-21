import { ToxinSliderView } from '../view.ts';
import { Scale } from '../scale/scale.ts';
import { Runner } from '../runner/runner.ts';
import { Progress } from '../progress/progress.ts';
import * as $ from 'jquery';

describe('ToxinSliderView', function() {
    let inpt: any;
    
    beforeEach(function() {
        inpt = setFixtures('<input type="text" id="slider">');
    });
    
    it('должен быть объявлен', function() {
        expect(ToxinSliderView).toBeDefined();
    });
    
    it('получает ссылку на элемент на котором был инициализирован слайдер', function() {
        const view = new ToxinSliderView(inpt);
        expect(view.input).toBe(inpt);     
    });
    
    describe('Scale', function() {
        
        it('должен быть объявлен', function() {
            expect(Scale).toBeDefined();
        });
        
        it('получает ссылку на элемент на котором был инициализирован слайдер', function() {
            const scale = new Scale(inpt, {});
            expect(scale.input).toBe(inpt);       
        });
        
        it('отрисовывает шкалу сразу за элементом на котором иницилизирован слайдер', function() {
            const scale = new Scale(inpt, {});
            expect($(inpt).next()).toHaveClass('toxinScale');
        });
        
    });
    
//    describe('Runner', function() {
//        
//        it('должен быть объявлен', function() {
//            expect(Runner).toBeDefined();
//        });
//        
//        it('получает ссылку на свою шкалу', function() {
//            const scale = new Scale(inpt);
//            const runner = new Runner(scale.el);
//            expect(runner.scale).toBe(scale.el);
//        });
//        
//        it('отрисовывает бегунок внутри своей шкалы', function() {
//            const scale = new Scale(inpt);
//            const runner = new Runner(scale.el);
//            expect(scale.el).toContainElement(runner.el);
//        });
//        
//    });
    
//    describe('Progress', function() {
//        
//        it('должен быть объявлен', function() {
//            expect(Progress).toBeDefined();
//        });
//        
//        it('получает ссылку на элемент на котором был инициализирован слайдер', function() {
//            const scale = new Scale(inpt);
//            const runner = new Runner(scale.el);
//            const progress = new Progress(inpt, runner.el);
//            expect(progress.input).toBe(inpt);
//        });
//        
//        it('получает ссылку на бегунок', function() {
//            const scale = new Scale(inpt);
//            const runner = new Runner(scale.el);
//            const progress = new Progress(inpt, runner.el);
//            expect(progress.runner).toBe(runner.el);
//        });
//        
//        it('отрисовывает прогресс бар перед бегунком', function() {
//            const scale = new Scale(inpt);
//            const runner = new Runner(scale.el);
//            const progress = new Progress(inpt, runner.el);
//            expect($(runner.el).prev()).toEqual(progress.el);
//        });
//        
//        it('меняет значение элемента на котором был инициализирован слайдер на значение записанное в state.start', function() {
//            const scale = new Scale(inpt);
//            const runner = new Runner(scale.el);
//            const progress = new Progress(inpt, runner.el);
//            expect(inpt.value).toEqual(progress.state.start);
//        });
//        
//    });
    
});