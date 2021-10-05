//import ToxinSliderView from '../../../view.ts';
//import Scale from '../../Scale.ts';
//import XRangeScale from '../xRangeScale.ts';
//import XRangeDiapason from '../../../diapason/xRangeDiapason/xRangeDiapason.ts';
//import XRangeOutput from '../../../output/xRangeOutput/xRangeOutput.ts';
//import XRangeRunner from '../../../runner/xRangeRunner/xRangeRunner.ts';
//import XRangeTip from '../../../tip/xRangeTip/xRangeTip.ts';
//import XRangeProgressBar from '../../../progressBar/xRangeProgressBar/xRangeProgressBar.ts';
//import * as $ from 'jquery';
//
//
//describe('XRangeScale', function() {
//         
//    let inpt: any;
//    let view: SliderView;
//    let scaleStartX: number;
//    
//    const setSizes: voidFunction = function() {
//        view.sliderState.scale.scaleEl.style.width = '105px';
//        view.sliderState.runners[0].runnerEl.style.width = '5px';
//        view.sliderState.runners[1].runnerEl.style.width = '5px';
//        view.sliderState.progressBars[0].setFontSize();
//        view.sliderState.progressBars[1].setFontSize();
//        view.sliderState.runners[0].mousePosOnRunner = 0;
//        view.sliderState.runners[1].mousePosOnRunner = 0;
//        scaleStartX = view.sliderState.scale.scaleEl.getBoundingClientRect().left + parseInt(getComputedStyle(view.sliderState.scale.scaleEl).borderLeftWidth) + parseInt(getComputedStyle(view.sliderState.scale.scaleEl).paddingLeft);
//    };
//
//     beforeEach(function() {
//         setFixtures('<input type="text" id="slider">');
//         inpt = document.getElementById('slider');
//         view = new ToxinSliderView(inpt);
//         view.update({tip: true, range: true, current: [0, 25]});
//         setSizes();
//     });
//        
//     it('должен быть объявлен', function() {
//         expect(XRangeScale).toBeDefined();
//     });
//            
//     it('отрисовывает шкалу с классом "x-range-scale" сразу за элементом на котором инициализирован слайдер', function() {
//         expect(view.sliderState.scale.scaleEl.parentElement.className).toBe('x-range-scale');
//         expect(inpt.nextElementSibling).toBe(view.sliderState.scale.scaleEl.parentElement);
//     });
//    
//    it('при клике на значение шкалы ближайший ползунок перемещается на позицию этого значения', function() {
//        
//        for (let x = 8; x < 106; x++) {
//            let nearestRunnerIndex: number;
//
//            const mouseEvent = document.createEvent("MouseEvents");
//            mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
//            view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
//
//            if (mouseEvent.clientX > view.sliderState.runners[1].runnerEl.getBoundingClientRect().left) {
//                nearestRunnerIndex = 1;
//            } else if (mouseEvent.clientX < view.sliderState.runners[0].runnerEl.getBoundingClientRect().left) {
//                nearestRunnerIndex = 0;      
//            } else if (mouseEvent.clientX - view.sliderState.runners[0].runnerEl.getBoundingClientRect().left < view.sliderState.runners[1].runnerEl.getBoundingClientRect().left - mouseEvent.clientX) {
//                nearestRunnerIndex = 0;      
//            } else {
//                nearestRunnerIndex = 1;
//            }
//
//            expect(parseFloat(view.sliderState.progressBars[nearestRunnerIndex].progressBarEl.style.width) / parseFloat(view.sliderState.progressBars[nearestRunnerIndex].progressBarEl.style.fontSize) + scaleStartX).toEqual(mouseEvent.clientX);
//        }
//             
//    });
//    
//    it('при клике на значение шкалы элемент над ближайшим бегунком меняет текущее значение, если включен', function() {
//                
//        for (let x = 8; x < 106; x++) {
//            let nearestRunnerIndex: number;
//
//            const mouseEvent = document.createEvent("MouseEvents");
//            mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
//            view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
//
//            if (mouseEvent.clientX > view.sliderState.runners[1].runnerEl.getBoundingClientRect().left) {
//                nearestRunnerIndex = 1;
//            } else if (mouseEvent.clientX < view.sliderState.runners[0].runnerEl.getBoundingClientRect().left) {
//                nearestRunnerIndex = 0;      
//            } else if (mouseEvent.clientX - view.sliderState.runners[0].runnerEl.getBoundingClientRect().left < view.sliderState.runners[1].runnerEl.getBoundingClientRect().left - mouseEvent.clientX) {
//                nearestRunnerIndex = 0;      
//            } else {
//                nearestRunnerIndex = 1;
//            }
//            expect(+view.sliderState.tips[nearestRunnerIndex].tipEl.innerHTML + scaleStartX).toEqual(mouseEvent.clientX);
//         }
//                
//     });
//    
//    it('при клике на значение шкалы инпут меняет значение на текущее', function() {
//        
//        let outputValue: string;
//        
//        for (let x = 8; x < 106; x++) {
//            
//            let nearestRunnerIndex: number;
//
//            const mouseEvent = document.createEvent("MouseEvents");
//            mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
//            view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
//
//            if (mouseEvent.clientX > view.sliderState.runners[1].runnerEl.getBoundingClientRect().left) {
//                nearestRunnerIndex = 1;
//            } else if (mouseEvent.clientX < view.sliderState.runners[0].runnerEl.getBoundingClientRect().left) {
//                nearestRunnerIndex = 0;      
//            } else if (mouseEvent.clientX - view.sliderState.runners[0].runnerEl.getBoundingClientRect().left < view.sliderState.runners[1].runnerEl.getBoundingClientRect().left - mouseEvent.clientX) {
//                nearestRunnerIndex = 0;      
//            } else {
//                nearestRunnerIndex = 1;
//            }
//            
//            console.log(view.sliderState.output.outputEl.value.split(view.sliderSettings.separator));
//            
//            if (nearestRunnerIndex == 0) {
//                outputValue = (mouseEvent.clientX - scaleStartX) + view.sliderSettings.separator + view.sliderState.output.outputEl.value.split(view.sliderSettings.separator)[1];
//            } else {
//                outputValue = view.sliderState.output.outputEl.value.split(view.sliderSettings.separator)[0] + view.sliderSettings.separator + (mouseEvent.clientX - scaleStartX);
//            }
//            
//            expect(view.sliderState.output.outputEl.value).toEqual(outputValue);
//        }
//                
//     });
//    
//    it('при клике на значение шкалы оповещаются наблюдатели', function() {
//                
//        let testValue: number = 7;
//        let x: number = 8;
//        
//        view.subject.addObserver(function() {
//            testValue = x;
//        });
//        for (x; x < 106; x++) {
//            const mouseEvent = document.createEvent("MouseEvents");
//            mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
//            view.sliderState.scale.scaleEl.dispatchEvent(mouseEvent);
//            expect(testValue).toEqual(x);
//        }
//          
//    });
//
//});
