import ToxinSliderView from '../../../view.ts';
import YRunner from '../yRunner.ts';
        
const testYRunner = function(sliderSettings) {
    
    describe('YRunner', function() {
         
        let inpt: any;
        let view: any;
        const setSizes: voidFunction = function(view) {
            view.state.runners[0].runnerEl.style.height = '15px';

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
            expect(YRunner).toBeDefined();
        });

        it('Метод render вставляет бегунок с классом "runner y-runner" в элемент, переданный в параметрах', function() {

            view.state.runners[0].runnerEl.remove();
            view.state.runners[0].render(view.state.diapasones[0].diapasonEl);

            expect(view.state.runners[0].runnerEl.className).toBe('runner y-runner');
            expect(view.state.runners[0].runnerEl.parentElement).toBe(view.state.diapasones[0].diapasonEl);
        });
        
        it('Метод returnMousePosOnRunner возвращает разницу координат срабатывания события pointerdown и начала бегунка по оси Y', function() {

            view.state.runners.forEach((runner, j) => {
                
                const runnerStart = view.state.runners[j].runnerEl.getBoundingClientRect().bottom;
                const runnerEnd = view.state.runners[j].runnerEl.getBoundingClientRect().top;
                
                
                for (let i = runnerStart; i >= runnerEnd; i--) {
                    const downEvent = new PointerEvent("pointerdown", {
                        clientY: i
                    });
                    const upEvent = new PointerEvent("pointerup", {});
                    view.state.runners[j].runnerEl.dispatchEvent(downEvent);
                    expect(view.state.runners[j].returnMousePosOnRunner(downEvent)).toEqual(runnerStart - i);
                    document.dispatchEvent(upEvent);
                } 
            });

        });
        
    });

}
    
export default testYRunner;