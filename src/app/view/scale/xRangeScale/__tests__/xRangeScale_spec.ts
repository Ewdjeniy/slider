import ToxinSliderView from '../../../view.ts';
import XRangeScale from '../xRangeScale.ts';
import XRangeDiapason from '../../../diapason/xRangeDiapason/xRangeDiapason.ts';
import XRangeOutput from '../../../output/xRangeOutput/xRangeOutput.ts';
import XRangeRunner from '../../../runner/xRangeRunner/xRangeRunner.ts';
import XRangeTip from '../../../tip/xRangeTip/xRangeTip.ts';
import XRangeProgressBar from '../../../progressBar/xRangeProgressBar/xRangeProgressBar.ts';
import * as $ from 'jquery';


describe('XRangeScale', function() {
         
    let inpt: any;
    let view: any;
    let scaleStartX: number;
    let div: HTMLElement;
    const setSizes: voidFunction = function(state) {
        state.scale.scaleEl.style.width = '105px';
        state.runners[0].runnerEl.style.width = '5px';
        state.runners[1].runnerEl.style.width = '5px';
        state.progressBars[0].setFontSize();
        state.progressBars[1].setFontSize();
    };

    beforeEach(function() {
        div = document.createElement('div');
        document.body.append(div);
        setFixtures('<input type="text" id="slider">');
        inpt = document.getElementById('slider');
        view = new ToxinSliderView(inpt);
        view.update({
            start: 0,
            end: 100,
            step: 1,
            current: [0,25],
            scaleValuesAmount: 2,
            direction: 'x',
            range: true,
            tip: true,
            separator: ' - '
        });
        setSizes(view.state);
    });
    
    afterEach (function() {
        div.remove();
        view.sliderEl.remove();
    });
        
    it('Должен быть объявлен', function() {
        expect(XRangeScale).toBeDefined();
    });
            
    it('Метод render вставляет шкалу с классом "scale x-range-scale" в элемент, переданный в параметрах', function() {
        view.state.scale.scaleEl.remove();
        view.state.scale.scaleEl = document.createElement('div');
        view.state.scale.render(div);
         
        expect(view.state.scale.scaleEl.className).toBe('scale x-range-scale');
        expect(view.state.scale.scaleEl.parentElement).toBe(div);
    });
    
    it('Метод returnScaleStart возвращает координату начала шкалы сложенную с шириной левой границы и левого внутреннего отступа по оси X', function() {
        const startScaleLeftPosition = view.state.scale.scaleEl.getBoundingClientRect().left;
        for (let i = 1; i < 50; i++) {
            view.state.scale.scaleEl.style.marginLeft = i + 'px';
            view.state.scale.scaleEl.style.border = i + 'px solid';
            view.state.scale.scaleEl.style.paddingLeft = i + 'px';
            expect(view.state.scale.returnScaleStart()).toEqual(startScaleLeftPosition + i * 3);
        }
    });
    
    it('Метод returnScaleStep возвращает длинну одного шага бегунка', function() {
        
        expect(view.state.scale.returnScaleStep(view.state.runners[0].runnerEl, view.state.stepsCoefficient, view.state.stepsAmount)).toEqual(1);
        
    });

});
