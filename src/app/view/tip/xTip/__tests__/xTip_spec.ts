import ToxinSliderView from '../../../view.ts';
import XTip from '../xTip.ts';
        
const testXTip = function(sliderSettings) {
    
    describe('XTip', function() {
         
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
            setFixtures('<div id="test" style="width: 1000px;"><input type="text" id="slider"></div>');
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
            expect(XTip).toBeDefined();
        });

        it('Метод render вставляет div с классом "tip x-tip" в элемент, переданный в параметрах', function() {

            view.state.tips[0].tipEl.remove();
            view.state.tips[0].render(view.state.runners[0].runnerEl);

            expect(view.state.tips[0].tipEl.className).toBe('tip x-tip');
            expect(view.state.tips[0].tipEl.parentElement).toBe(view.state.runners[0].runnerEl);

        });

        it('Метод setCurrent устанавливает текущее значение элемента', function() {
            
            let expectedValue = view.sliderSettings.current;
            expectedValue = (view.sliderSettings.current >= view.sliderSettings.start) ? expectedValue : view.sliderSettings.start;
            expectedValue = (view.sliderSettings.current <= view.sliderSettings.end) ? expectedValue : view.sliderSettings.end;
            
            view.state.tips[0].setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.end);
            expect(expectedValue.toString()).toEqual(view.state.tips[0].tipEl.innerHTML);

        });

        it('Метод showTip переписывает значение элемента в зависимости от длины прогресс бара и возвращает это значение', function() {

            const tipValue = view.state.tips[0].showTip(view.state.progressBars[0].progressBarEl, view.state.stepsAmount, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.step)

            expect(tipValue.toString()).toEqual(view.state.tips[0].tipEl.innerHTML);

        });
        
    });

}
    
export default testXTip;