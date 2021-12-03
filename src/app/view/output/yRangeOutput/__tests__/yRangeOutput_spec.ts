import ToxinSliderView from '../../../view.ts';
import YRangeOutput from '../yRangeOutput.ts';

const testYRangeOutput = function(sliderSettings) {
    
    describe('YRangeOutput', function() {
        
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

        it('должен быть объявлен', function() {
            expect(YRangeOutput).toBeDefined();
        });
        
        it('метод setCurrent записывает значение, переданное в параметрах, в инпут', function() {
            
            let expectedArr = view.sliderSettings.current;
            expectedArr[0] = (view.sliderSettings.current[0] >= view.sliderSettings.start) ? expectedArr[0] : view.sliderSettings.start;
            expectedArr[0] = (view.sliderSettings.current[0] <= view.sliderSettings.end) ? expectedArr[0] : view.sliderSettings.end;
            expectedArr[1] = (view.sliderSettings.current[1] >= view.sliderSettings.start) ? expectedArr[1] : view.sliderSettings.start;
            expectedArr[1] = (view.sliderSettings.current[1] <= view.sliderSettings.end) ? expectedArr[1] : view.sliderSettings.end;

            view.state.output.setCurrent(expectedArr, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.separator);

            expect(view.state.output.outputEl.value).toEqual(expectedArr[0] + view.sliderSettings.separator + expectedArr[1]);

        });
        
        it('countOutputValue переписывает значение инпута в зависимости от высот прогресс баров и возвращает это значение', function() {

            const outputValue: number[] = view.state.output.countOutputValue(view.state.progressBars[0].progressBarEl, view.state.stepsAmount, view.sliderSettings.start, view.sliderSettings.end, view.sliderSettings.step, view.state.progressBars[1].progressBarEl, view.sliderSettings.separator);

            expect(outputValue[0] + view.sliderSettings.separator + outputValue[1]).toEqual(inpt.value);

        });
        
    });

}

export default testYRangeOutput;