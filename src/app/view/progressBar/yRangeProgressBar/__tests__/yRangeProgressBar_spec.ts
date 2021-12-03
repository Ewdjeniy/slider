import ToxinSliderView from '../../../view.ts';
import YRangeProgressBar from '../yRangeProgressBar.ts';
        
const testYRangeProgressBar = function(sliderSettings) {
    
    describe('YRangeProgressBar', function() {
         
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
            expect(YRangeProgressBar).toBeDefined();
        });

        it('Метод render вставляет div с классом "progressBar y-range-progressBar" за элементом, переданном в параметрах', function() {

            view.state.progressBars.forEach((bar, i) => {
                bar.progressBarEl.remove();
                bar.render(view.state.runners[i].runnerEl);

                expect(bar.progressBarEl.className).toBe('progress-bar y-range-progress-bar');
                expect(view.state.runners[i].runnerEl.nextElementSibling).toBe(bar.progressBarEl); 
            });

        });
        
        it('Метод setCurrent устанавливает начальную высоту каждого прогресс бара', function() {

            view.state.progressBars.forEach((bar, i) => {
                bar.setCurrent(view.sliderSettings.current, view.sliderSettings.start, view.sliderSettings.step, i);

                const expectedValue = Math.round((view.sliderSettings.current[i] - view.sliderSettings.start) / view.sliderSettings.step);

                expect(bar.progressBarEl.style.height).toBe(expectedValue + 'em');  
            });

        });
        
        it('Метод countProgressBarSize устанавливает ширину прогресс баров при наступлении события, возвращает это значение', function() {

            for ( let j = view.state.scale.scaleEl.getBoundingClientRect().bottom ; j > view.state.scale.scaleEl.getBoundingClientRect().top; j-- ) {

                const moveEvent = new PointerEvent("pointermove", {
                    clientY: j
                });
                const upEvent = new PointerEvent("pointerup", {});
                document.dispatchEvent(moveEvent);

                const progressBarSize = view.state.progressBars[1].countProgressBarSize(moveEvent, 0, 1, 0, view.state.progressBars[0].progressBarEl);

                expect(parseInt(view.state.progressBars[1].progressBarEl.style.height)).toEqual(progressBarSize);

                expect(parseInt(view.state.progressBars[0].progressBarEl.style.height) <= parseInt(view.state.progressBars[1].progressBarEl.style.height)).toBeTruthy();

                expect(parseInt(view.state.progressBars[1].progressBarEl.style.height) >= parseInt(view.state.progressBars[0].progressBarEl.style.height)).toBeTruthy();
                document.dispatchEvent(upEvent);

            }
            
            for ( let j = view.state.scale.scaleEl.getBoundingClientRect().bottom ; j > view.state.scale.scaleEl.getBoundingClientRect().top; j-- ) {

                const moveEvent = new PointerEvent("pointermove", {
                    clientY: j
                });
                const upEvent = new PointerEvent("pointerup", {});
                document.dispatchEvent(moveEvent);

                const progressBarSize = view.state.progressBars[0].countProgressBarSize(moveEvent, 0, 1, 0, view.state.progressBars[1].progressBarEl);

                expect(parseInt(view.state.progressBars[0].progressBarEl.style.height)).toEqual(progressBarSize);

                expect(parseInt(view.state.progressBars[0].progressBarEl.style.height) <= parseInt(view.state.progressBars[1].progressBarEl.style.height)).toBeTruthy();

                expect(parseInt(view.state.progressBars[1].progressBarEl.style.height) >= parseInt(view.state.progressBars[0].progressBarEl.style.height)).toBeTruthy();
                document.dispatchEvent(upEvent);

            }

        });
        
    });
    
}

export default testYRangeProgressBar;