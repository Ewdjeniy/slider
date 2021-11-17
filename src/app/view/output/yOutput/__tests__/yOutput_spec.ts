import ToxinSliderView from '../../../view.ts';
import YOutput from '../yOutput.ts';
        
const testYOutput = function(sliderSettings) {
    
    describe('YOutput', function() {
        
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

        it('должен быть объявлен', function() {
            expect(YOutput).toBeDefined();
        });
        
        it('метод setCurrent записывает значение, переданное в параметрах, в инпут', function() {
            
            let expectedValue = view.sliderSettings.current;
            expectedValue = (view.sliderSettings.current >= view.sliderSettings.start) ? expectedValue : view.sliderSettings.start;
            expectedValue = (view.sliderSettings.current <= view.sliderSettings.end) ? expectedValue : view.sliderSettings.end;
            
            view.state.output.setCurrent(expectedValue, view.sliderSettings.start, view.sliderSettings.end);
            expect(expectedValue.toString()).toEqual(view.state.output.outputEl.value);

        });
        
        it('countOutputValue переписывает значение инпута в зависимости от высоты прогресс бара и возвращает это значение', function() {

            const outputValue = view.state.output.countOutputValue(view.state.progressBars[0].progressBarEl, view.state.stepsAmount, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.step);

            expect(outputValue.toString()).toEqual(inpt.value);

        });
        
    });

}
    
export default testYOutput;