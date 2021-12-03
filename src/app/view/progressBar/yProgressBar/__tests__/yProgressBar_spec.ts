import ToxinSliderView from '../../../view.ts';
import YProgressBar from '../yProgressBar.ts';
        
const testYProgressBar = function(sliderSettings) {
         
    describe('YProgressBar', function() {
    
        let inpt: any;
        let view: any;
        const setSizes: voidFunction = function(view) {
            view.state.runners[0].runnerEl.style.height = '15px';
            if (view.state.runners[1]) {
                view.state.runners[1].runnerEl.style.height = '15px';
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
            view.state.diapasones[0].diapasonEl.style.flexDirection = 'column';
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
            expect(YProgressBar).toBeDefined();
        });

        it('Метод render вставляет div с классом "progressBar y-progressBar" за элементом, переданном в параметрах', function() {

            view.state.progressBars[0].progressBarEl.remove();
            view.state.progressBars[0].render(view.state.runners[0].runnerEl);

            expect(view.state.progressBars[0].progressBarEl.className).toBe('progress-bar y-progress-bar');
            expect(view.state.runners[0].runnerEl.nextElementSibling).toBe(view.state.progressBars[0].progressBarEl);

        });
        
        it('Метод setCurrent устанавливает начальную высоту прогресс бара', function() {

            view.state.progressBars[0].setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.step);

            const expectedValue = Math.round((view.sliderSettings.current - view.sliderSettings.start) / view.sliderSettings.step);

            expect(view.state.progressBars[0].progressBarEl.style.height).toBe(expectedValue + 'em');
            
        });
        
        it('Метод countProgressBarSize устанавливает высоту прогресс бара при наступлении события и возвращает это значение', function() {

            for ( let i = view.state.scale.scaleEl.getBoundingClientRect().bottom ; i > view.state.scale.scaleEl.getBoundingClientRect().top; i-- ) {
                const moveEvent = new PointerEvent("pointermove", {
                    clientY: i
                });
                const upEvent = new PointerEvent("pointerup", {});
                document.dispatchEvent(moveEvent);
                const progressBarSize = view.state.progressBars[0].countProgressBarSize(moveEvent, 0, 1, 0);

                expect(parseInt(view.state.progressBars[0].progressBarEl.style.height)).toEqual(progressBarSize);
                document.dispatchEvent(upEvent);
            }

        });
        
    });
    
}
    
export default testYProgressBar;