import ToxinSliderView from '../../../view.ts';
import XScale from '../xScale.ts';
import XDiapason from '../../../diapason/xDiapason/xDiapason.ts';
import XOutput from '../../../output/xOutput/xOutput.ts';
import XRunner from '../../../runner/xRunner/xRunner.ts';
import XTip from '../../../tip/xTip/xTip.ts';
import XProgressBar from '../../../progressBar/xProgressBar/xProgressBar.ts';
import * as $ from 'jquery';


        
describe('XScale', function() {
         
    let inpt: any;
    let view: any;
    let div: HTMLElement;
    const setSizes: voidFunction = function(state) {
        state.scale.scaleEl.style.width = '105px';
        state.runners[0].runnerEl.style.width = '5px';
        state.progressBars[0].setFontSize();
        state.runners[0].mousePosOnRunner = 0;
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
            current: 25,
            scaleValuesAmount: 2,
            direction: 'x',
            range: false,
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
        expect(XScale).toBeDefined();
    });
            
    it('Метод render вставляет шкалу с классом "scale x-scale" в элемент, переданный в параметрах', function() {
        view.state.scale.scaleEl.remove();
        view.state.scale.scaleEl = document.createElement('div');
        view.state.scale.render(div);
         
        expect(view.state.scale.scaleEl.className).toBe('scale x-scale');
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
            
//     it('при клике на значение шкалы ползунок перемещается на позицию этого значения', function() {
//             
//         for (let x = 8; x < 106; x++) {
//             const mouseEvent = document.createEvent("MouseEvents");
//             mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
//             view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
//             expect(parseFloat(view.sliderState.progressBars[0].progressBarEl.style.width) / parseFloat(view.sliderState.progressBars[0].progressBarEl.style.fontSize) + scaleStartX).toEqual(mouseEvent.clientX);
//         }
//             
//     });
//            
//     it('при клике на значение шкалы элемент над бегунком меняет текущее значение, если включен', function() {
//                
//         view.update({tip: true});
//         setSizes();
//         for (let x = 8; x < 106; x++) {
//             const mouseEvent = document.createEvent("MouseEvents");
//             mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
//             view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
//             expect(+view.sliderState.tips[0].tipEl.innerHTML + scaleStartX).toEqual(mouseEvent.clientX);
//         }
//                
//     });
//            
//     it('при клике на значение шкалы инпут меняет значение на текущее', function() {
//                
//         for (let x = 8; x < 106; x++) {
//             const mouseEvent = document.createEvent("MouseEvents");
//             mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
//             view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
//             expect(+view.sliderState.output.outputEl.value + scaleStartX).toEqual(mouseEvent.clientX);
//         }
//                
//     });
//            
//    it('при клике на значение шкалы оповещаются наблюдатели', function() {
//                
//        let testValue: number = 7;
//        
//        view.subject.addObserver(function() {
//            ++testValue;
//        });
//        for (let x = 8; x < 106; x++) {
//            const mouseEvent = document.createEvent("MouseEvents");
//            mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
//            view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
//            expect(testValue).toEqual(x);
//        }
//          
//     });

});
    
