import ToxinSliderView from '../../view.ts';
import ProgressBar from '../progressBar.ts';
import testXProgressBar from '../xProgressBar/__tests__/xProgressBar_spec.ts';
import testXRangeProgressBar from '../xRangeProgressBar/__tests__/xRangeProgressBar_spec.ts';
        
const testProgressBar = function(sliderSettings) {
       
    const describeFunc = function(testFunction?: any) {
        
        describe('ProgressBar', function() {

            let inpt: any;
            let view: any;
            const setSizes: voidFunction = function(view) {
                view.state.runners[0].runnerEl.style.width = '15px';
                if (view.state.runners[1]) {
                    view.state.runners[1].runnerEl.style.width = '15px';
                }

                view.state.progressBars[0].setFontSize(view.state.scale.returnScaleStep(view.state.runners[0].runnerEl, view.state.stepsCoefficient, view.state.stepsAmount));
                if (view.state.progressBars[1]) {
                    view.state.progressBars[1].setFontSize(view.state.scale.returnScaleStep(view.state.runners[1].runnerEl, view.state.stepsCoefficient, view.state.stepsAmount));
                }

                view.state.progressBars[0].setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.step);
                if (view.state.progressBars[1]) {
                    view.state.progressBars[1].setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.step);
                }
                view.state.diapasones[0].diapasonEl.style.zIndex = '100';
                view.state.diapasones[0].diapasonEl.style.display = 'flex';
                if (view.state.diapasones[1]) {
                    view.state.diapasones[1].diapasonEl.style.zIndex = '100';
                    view.state.diapasones[1].diapasonEl.style.display = 'flex';
                }
                view.setElementsValues();
            };

            beforeEach(function() {
                setFixtures('<div id="test" style="width: 120px;"><input type="text" id="slider"></div>');
                inpt = document.getElementById('slider');
                view = new ToxinSliderView(inpt);
                if (sliderSettings) {
                    view.update(sliderSettings);
                }
                setSizes(view);
            });

            afterEach (function() {
                view.sliderEl.remove();
            });

            it('Должен быть объявлен', function() {
                expect(ProgressBar).toBeDefined();
            });

            it('Метод setFontSize устанавливает размер шрифта прогресс бара равным числу, переданному в параметрах (один шаг шкалы)', function() {

                view.state.progressBars.forEach((bar, i) => {
                    const scaleStepVal = view.state.scale.returnScaleStep(view.state.runners[i].runnerEl, view.state.stepsCoefficient, view.state.stepsAmount);
                    
                    bar.setFontSize(scaleStepVal);
                    expect(parseFloat(bar.progressBarEl.style.fontSize)).toBeCloseTo(scaleStepVal, 4);
                });

            });

            if (testFunction) {
                testFunction(sliderSettings);
            }

        });
        
    }
    
    return {
        testItself: function() {describeFunc();},
        testItselfWithSubClass: function(testFunction: any) {
            describeFunc(testFunction);
        }
    };

}
    
export default testProgressBar;