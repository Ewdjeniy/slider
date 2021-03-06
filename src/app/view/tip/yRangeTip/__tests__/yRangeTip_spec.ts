import ToxinSliderView from '../../../view.ts';
import YRangeTip from '../yRangeTip.ts';
        
const testYRangeTip = function(sliderSettings) {
    
    describe('YRangeTip', function() {
         
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
            setFixtures('<input type="text" id="slider">');
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
            expect(YRangeTip).toBeDefined();
        });

        it('Метод render вставляет div с классом "tip y-range-tip" в элемент, переданный в параметрах', function() {

            view.state.tips.forEach((tip, i) => {

                tip.tipEl.remove();
                tip.render(view.state.runners[i].runnerEl);

                expect(tip.tipEl.className).toBe('tip y-range-tip');
                expect(tip.tipEl.parentElement).toBe(view.state.runners[i].runnerEl);

            });

        });
        
        it('Метод setCurrent устанавливает значение элемента', function() {

            view.state.tips.forEach((tip, i) => {
                let expectedValue = view.sliderSettings.current[i];
                expectedValue = (view.sliderSettings.current[i] >= view.sliderSettings.start) ? expectedValue : view.sliderSettings.start;
                expectedValue = (view.sliderSettings.current[i] <= view.sliderSettings.end) ? expectedValue : view.sliderSettings.end;

                
                view.state.tips[i].setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.end, i);
                
                expect(expectedValue.toString()).toEqual(view.state.tips[i].tipEl.innerHTML);
            });

        });
        
        it('Метод showTip переписывает значения элементов в зависимости от длин прогресс баров и возвращает эти значения', function() {

            view.state.tips.forEach((tip, i) => {

                const tipValue = view.state.tips[i].showTip(view.state.progressBars[i].progressBarEl, view.state.stepsAmount, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.step)

                expect(tipValue.toString()).toEqual(view.state.tips[i].tipEl.innerHTML);
            });

        });
        
    });

}
    
export default testYRangeTip;