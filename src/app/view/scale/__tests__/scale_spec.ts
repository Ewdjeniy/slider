import ToxinSliderView from '../../view.ts';
import Scale from '../scale.ts';
import XScale from '../xScale/xScale.ts';
import XDiapason from '../../diapason/xDiapason/xDiapason.ts';
import XOutput from '../../output/xOutput/xOutput.ts';
import XRunner from '../../runner/xRunner/xRunner.ts';
import XTip from '../../tip/xTip/xTip.ts';
import XProgressBar from '../../progressBar/xProgressBar/xProgressBar.ts';
import * as $ from 'jquery';

 describe('Scale', function() {
        
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
         expect(Scale).toBeDefined();
     });
        
     it('получает ссылку на view.sliderState', function() {
         expect(view.sliderState.scale.sliderState).toBe(view.sliderState);
     });
        
     it('обладает методом setScaleValues, который отрисовавает значения шкалы в зависимости от view.sliderSettings.scaleValues', function() {
         view.update({scaleValues: 2});
         expect(view.sliderState.scale.scaleValuesEl.innerHTML).toBe('<span class="scale-first-value">0</span><span class="scale-last-value">100</span>');
     });
        
     it('обладает методом countScaleStep, который возвращает шаг бегунка в зависимости от ширины шкалы, бегунка, начального, конечного значения и шага слайдера', function() {
         view.update({step: 5});
         view.sliderState.scale.scaleEl.style.width = '105px';
         view.sliderState.runners[0].runnerEl.style.width = '5px';
         
         expect(view.sliderState.scale.countScaleStep(view.sliderState.runners[0].runnerEl)).toEqual(5);
         
         view.update({step: 10});
         view.sliderState.scale.scaleEl.style.width = '210px';
         view.sliderState.runners[0].runnerEl.style.width = '10px';
            
         expect(view.sliderState.scale.countScaleStep(view.sliderState.runners[0].runnerEl)).toEqual(20);
     });
        
});
