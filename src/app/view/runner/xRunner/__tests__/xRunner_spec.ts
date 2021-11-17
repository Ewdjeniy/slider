import ToxinSliderView from '../../../view.ts';
import XRunner from '../xRunner.ts';
        
const testXRunner = function(sliderSettings) {
    
    describe('XRunner', function() {
         
        let inpt: any;
        let view: any;
        const setSizes: voidFunction = function(view) {
            view.state.runners[0].runnerEl.style.width = '15px';

            view.state.progressBars[0].setFontSize(view.state.scale.returnScaleStep(view.state.runners[0].runnerEl, view.state.stepsCoefficient, view.state.stepsAmount));

            view.state.progressBars[0].setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.step);
            view.setElementsValues();
            view.state.diapasones[0].diapasonEl.style.display = 'flex';

        };

        beforeEach(function() {
            setFixtures('<div style="width: 120px;"><input type="text" id="slider"></div>');
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
            expect(XRunner).toBeDefined();
        });

        it('Метод render вставляет бегунок с классом "runner x-runner" в элемент, переданный в параметрах', function() {

            view.state.runners[0].runnerEl.remove();
            view.state.runners[0].render(view.state.diapasones[0].diapasonEl);

            expect(view.state.runners[0].runnerEl.className).toBe('runner x-runner');
            expect(view.state.runners[0].runnerEl.parentElement).toBe(view.state.diapasones[0].diapasonEl);
        });

        it('Метод returnMousePosOnRunner возвращает разницу координат срабатывания события pointerdown и начала бегунка по оси X', function() {

            view.state.runners.forEach((runner, j) => {
                
                const runnerStart = view.state.runners[j].runnerEl.getBoundingClientRect().left;
                const runnerEnd = view.state.runners[j].runnerEl.getBoundingClientRect().right;
                
                for (let i = runnerStart; i <= runnerEnd; i++) {
                    const downEvent = new PointerEvent("pointerdown", {
                        clientX: i
                    });
                    const upEvent = new PointerEvent("pointerup", {});
                    view.state.runners[j].runnerEl.dispatchEvent(downEvent);
                    expect(view.state.runners[j].returnMousePosOnRunner(downEvent)).toEqual(i - runnerStart);
                    document.dispatchEvent(upEvent);
                } 
            });

        });
        
    });

}
    
export default testXRunner;