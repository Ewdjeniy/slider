import ToxinSliderView from '../../../view.ts';
import Scale from '../../Scale.ts';
import XScale from '../xScale.ts';
import XDiapason from '../../../diapason/xDiapason/xDiapason.ts';
import XOutput from '../../../output/xOutput/xOutput.ts';
import XRunner from '../../../runner/xRunner/xRunner.ts';
import XTip from '../../../tip/xTip/xTip.ts';
import XProgressBar from '../../../progressBar/xProgressBar/xProgressBar.ts';
import * as $ from 'jquery';


        
describe('XScale', function() {
         
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
         expect(XScale).toBeDefined();
     });
            
     it('отрисовывает шкалу с классом "x-scale" сразу за элементом на котором инициализирован слайдер', function() {
         expect(view.sliderState.scale.scaleEl.parentElement.className).toBe('x-scale');
         expect(inpt.nextElementSibling).toBe(view.sliderState.scale.scaleEl.parentElement);
     });
            
     it('при клике на значение шкалы ползунок перемещается на позицию этого значения', function() {
             
         for (let x = 8; x < 106; x++) {
             const mouseEvent = document.createEvent("MouseEvents");
             mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
             view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
             expect(parseFloat(view.sliderState.progressBars[0].progressBarEl.style.width) / parseFloat(view.sliderState.progressBars[0].progressBarEl.style.fontSize) + scaleStartX).toEqual(mouseEvent.clientX);
         }
             
     });
            
     it('при клике на значение шкалы элемент над бегунком меняет текущее значение, если включен', function() {
                
         view.update({tip: true});
         setSizes();
         for (let x = 8; x < 106; x++) {
             const mouseEvent = document.createEvent("MouseEvents");
             mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
             view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
             expect(+view.sliderState.tips[0].tipEl.innerHTML + scaleStartX).toEqual(mouseEvent.clientX);
         }
                
     });
            
     it('при клике на значение шкалы инпут меняет значение на текущее', function() {
                
         for (let x = 8; x < 106; x++) {
             const mouseEvent = document.createEvent("MouseEvents");
             mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
             view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
             expect(+view.sliderState.output.outputEl.value + scaleStartX).toEqual(mouseEvent.clientX);
         }
                
     });
            
    it('при клике на значение шкалы оповещаются наблюдатели', function() {
                
        let testValue: number = 7;
        
        view.subject.addObserver(function() {
            ++testValue;
        });
        for (let x = 8; x < 106; x++) {
            const mouseEvent = document.createEvent("MouseEvents");
            mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
            view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
            expect(testValue).toEqual(x);
        }
          
     });

});
    
