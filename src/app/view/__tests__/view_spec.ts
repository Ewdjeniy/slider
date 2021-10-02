import ToxinSliderView from '../view.ts';
import ObservableSubject from '../../observers.ts';
import Scale from '../scale/scale.ts';
import XScale from '../scale/xScale/xScale.ts';
import XRangeScale from '../scale/xRangeScale/xRangeScale.ts';
import XDiapason from '../diapason/xDiapason/xDiapason.ts';
import XRangeDiapason from '../diapason/xRangeDiapason/xRangeDiapason.ts';
import XOutput from '../output/xOutput/xOutput.ts';
import XRangeOutput from '../output/xRangeOutput/xRangeOutput.ts';
import XRunner from '../runner/xRunner/xRunner.ts';
import XRangeRunner from '../runner/xRangeRunner/xRangeRunner.ts';
import XTip from '../tip/xTip/xTip.ts';
import XRangeTip from '../tip/xRangeTip/xRangeTip.ts';
import XProgressBar from '../progressBar/xProgressBar/xProgressBar.ts';
import XRangeProgressBar from '../progressBar/xRangeProgressBar/xRangeProgressBar.ts';
import * as $ from 'jquery';

describe('ToxinSliderView', function() {
    let inpt: any;
    let view: SliderView;
    let scaleStartX: number;
    const setSizes: voidFunction = function() {
        view.sliderState.scale.scaleEl.style.width = '105px';
        view.sliderState.runners[0].runnerEl.style.width = '5px';
        view.sliderState.progressBars[0].setFontSize();
        view.sliderState.runners[0].mousePosOnRunner = 0;
        scaleStartX = view.sliderState.scale.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(view.sliderState.scale.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(view.sliderState.scale.scaleEl).paddingLeft);
    };
    
    beforeEach(function() {
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
        setSizes();
    });
    
    it('должен быть объявлен', function() {
        expect(ToxinSliderView).toBeDefined();
    });
    
    it('получает ссылку на элемент на котором был инициализирован слайдер', function() {
        expect(view.input).toBe(inpt);     
    });
    
    it('обладает свойством sliderSettings в котором записаны настройки необходимые для представления слайдера', function() {
        
        expect(view.sliderSettings).toBeDefined();
        expect(view.sliderSettings.start).toBeDefined();
        expect(view.sliderSettings.end).toBeDefined();
        expect(view.sliderSettings.step).toBeDefined();
        expect(view.sliderSettings.current).toBeDefined();
        expect(view.sliderSettings.scaleValues).toBeDefined();
        expect(view.sliderSettings.direction).toBeDefined();
        expect(view.sliderSettings.range).toBeDefined();
        expect(view.sliderSettings.tip).toBeDefined();
        expect(view.sliderSettings.separator).toBeDefined();
        
    });
    
    it('обладает свойством sliderState в котором хранятся ссылки на все элементы представления', function() {
        
        expect(view.sliderState).toBeDefined();
        expect(view.sliderState.subject).toBeDefined();
        expect(view.sliderState.sliderSettings).toBeDefined();
        expect(view.sliderState.output).toBeDefined();
        expect(view.sliderState.scale).toBeDefined();
        expect(view.sliderState.ranges).toBeDefined();
        expect(view.sliderState.runners).toBeDefined();
        expect(view.sliderState.tips).toBeDefined();
        expect(view.sliderState.progressBars).toBeDefined();
        expect(view.sliderState.stepsAmount).toBeDefined();
        expect(view.sliderState.stepsCoefficient).toBeDefined();

    });
    
    it('метод setState переписывает свойство sliderState в зависимости от sliderSettings', function() {
        
        const testSliderState = function(outputClass, scaleClass, diapasonClass, runnerClass, tipClass, progressBarClass) {
            expect(view.sliderState.subject).toEqual(new ObservableSubject());
            expect(view.sliderState.sliderSettings).toEqual(view.sliderSettings);
            expect(view.sliderState.output instanceof outputClass).toBe(true);
            expect(view.sliderState.scale instanceof scaleClass).toBe(true);
            view.sliderState.ranges.forEach(range => {
                expect(range instanceof diapasonClass).toBe(true);
            });
            view.sliderState.runners.forEach(runner => {
                expect(runner instanceof runnerClass).toBe(true);
            });
            view.sliderState.tips.forEach(tip => {
                expect(tip instanceof tipClass).toBe(true);
            });
            view.sliderState.progressBars.forEach(progressBar => {
                expect(progressBar instanceof progressBarClass).toBe(true);
            });
            expect(view.sliderState.stepsAmount).toEqual(Math.round((view.sliderSettings.end - view.sliderSettings.start) / view.sliderSettings.step));
            expect(view.sliderState.stepsCoefficient).toEqual(((view.sliderSettings.step * view.sliderState.stepsAmount) / ((view.sliderSettings.end - view.sliderSettings.start) / 100)) / 100);
        };
        
        view.sliderSettings = {
            start: 0,
            end: 1,
            step: 2,
            current: 3,
            scaleValues: 4,
            direction: 'x',
            range: false,
            tip: true,
            separator: ' - '
        };
        
        view.setState();
        testSliderState(XOutput, XScale, XDiapason, XRunner, XTip, XProgressBar);
        
        view.sliderSettings = {
            start: 0,
            end: 1,
            step: 2,
            current: [3,4],
            scaleValues: 5,
            direction: 'x',
            range: true,
            tip: true,
            separator: ' - '
        };
        
        view.setState();
        testSliderState(XRangeOutput, XRangeScale, XRangeDiapason, XRangeRunner, XRangeTip, XRangeProgressBar);
    });
    
    it('метод update меняет свойство sliderSettings и запускает метод setState с обновлённым sliderSettings', function() {
        const testState = {
            start: 6,
            end: 7,
            step: 8,
            current: [9,10],
            scaleValues: 11,
            direction: 'x',
            range: true,
            tip: true,
            separator: ' - '
        };
        
        spyOn(view, 'setState');
        view.update(testState);
        expect(view.sliderSettings).toEqual(testState);
        expect(view.setState).toHaveBeenCalled();
        expect(view.sliderState.sliderSettings).toEqual(testState);
    });
    
    it('обладает методом getCurrentValue, который возвращает текущее значение слайдера', function() {
        expect(view.getCurrentValue()).toEqual(view.sliderSettings.current);
    });
    
    it('обладает методом updateCurrent, который меняет текущее значение слайдера на переданный параметр', function() {
        view.updateCurrent(75);
        
        expect(view.sliderSettings.current).toEqual(75);
        expect(view.sliderState.sliderSettings.current).toEqual(75);
        view.sliderState.progressBars.forEach((bar) => {
            expect(parseFloat(bar.progressBarEl.style.width)).toEqual(75);
        });
        view.sliderState.tips.forEach((tip) => {
            expect(parseFloat(tip.tipEl.innerHTML)).toEqual(75);
        });
        expect(+view.sliderState.output.outputEl.value).toEqual(75);
        
        const testCurrent = [5,25];
        view.updateCurrent(testCurrent);
        
        expect(view.sliderSettings.current).toEqual(testCurrent);
        expect(view.sliderState.sliderSettings.current).toEqual(testCurrent);
        view.sliderState.progressBars.forEach((bar, index) => {
            expect(parseFloat(bar.progressBarEl.style.width)).toEqual(testCurrent[index]);
        });
        view.sliderState.tips.forEach((tip, index) => {
            expect(parseFloat(tip.tipEl.innerHTML)).toEqual(testCurrent[index]);
        });
        expect(view.sliderState.output.outputEl.value).toEqual(testCurrent[0] + view.sliderSettings.separator + testCurrent[1]);
        
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