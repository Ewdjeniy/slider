import ToxinSliderView from '../../../view.ts';
import YRangeRunner from '../yRangeRunner.ts';
        
const testYRangeRunner = function(sliderSettings) {
         
    describe('YRangeRunner', function() {
    
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
            expect(YRangeRunner).toBeDefined();
        });

        it('Метод render вставляет бегунок с классом "runner x-range-runner" в элемент, переданный в параметрах', function() {

            view.state.runners.forEach((runner, i) => {

                view.state.runners[i].runnerEl.remove();
                view.state.runners[i].render(view.state.diapasones[i].diapasonEl);

                expect(view.state.runners[i].runnerEl.className).toBe('runner x-range-runner');
                expect(view.state.runners[i].runnerEl.parentElement).toBe(view.state.diapasones[i].diapasonEl); 

            });

        });

    });
}
   
export default testYRangeRunner;