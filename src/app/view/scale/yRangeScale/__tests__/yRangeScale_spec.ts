import ToxinSliderView from '../../../view.ts';
import YRangeScale from '../yRangeScale.ts';

const testYRangeScale = function(sliderSettings) {
    
    describe('YRangeScale', function() {    
         
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
            expect(YRangeScale).toBeDefined();
        });

        it('Метод render вставляет шкалу с классом "scale y-range-scale" в элемент, переданный в параметрах', function() {

            view.state.scale.scaleEl.remove();
            view.state.scale.render(view.sliderEl);

            expect(view.state.scale.scaleEl.className).toBe('scale y-range-scale');
            expect(view.state.scale.scaleEl.parentElement).toBe(view.sliderEl);

        });
        
        it('Метод returnScaleStart возвращает координату начала шкалы сложенную с шириной нижней границы и нижнего внутреннего отступа по оси Y', function() {
            
            const startScaleBottomPosition = view.state.scale.scaleEl.getBoundingClientRect().bottom + parseFloat(getComputedStyle(view.state.scale.scaleEl).borderBottom) + parseFloat(getComputedStyle(view.state.scale.scaleEl).paddingBottom);
            
            expect(view.state.scale.returnScaleStart()).toEqual(startScaleBottomPosition);
            
        });

        it('Метод returnScaleStep возвращает длинну одного шага бегунка (1em для прогресс бара)', function() {
            
            view.state.progressBars.forEach((bar, i) => {
                const scaleStep = view.state.scale.returnScaleStep(view.state.runners[i].runnerEl, view.state.stepsCoefficient, view.state.stepsAmount);

                expect(scaleStep.toFixed(3)).toEqual(parseFloat(bar.progressBarEl.style.fontSize).toFixed(3));
            });

        });
        
    });

}

export default testYRangeScale;