import './sliderWithPanel.css';
import * as $ from 'jquery';


function synchronizePanelWithSlider(sliderInpt, el, min, max, step, scaleValues, direction, range, tip, separator, to, from) {
    
    const minInpt = el.getElementsByClassName('slider-with-panel__min-inpt')[0];
    const maxInpt = el.getElementsByClassName('slider-with-panel__max-inpt')[0];
    const fromInpt = el.getElementsByClassName('slider-with-panel__from-inpt')[0];
    const toInpt = el.getElementsByClassName('slider-with-panel__to-inpt')[0];
    const stepInpt = el.getElementsByClassName('slider-with-panel__step-inpt')[0];
    const scaleValuesInpt = el.getElementsByClassName('slider-with-panel__scale-values-inpt')[0];
    const directionInpts = el.getElementsByClassName('slider-with-panel__direction-inpt');
    const rangeInpts = el.getElementsByClassName('slider-with-panel__range-inpt');
    const tipInpt = el.getElementsByClassName('slider-with-panel__tip-inpt')[0];
    const updateSettingsOnInput = function() {
        
        const currentSetting = rangeInpts[0].checked ? +toInpt.value : [+fromInpt.value, +toInpt.value];
        const directionSetting = directionInpts[0].checked ? 'x' : 'y';
        const rangeSetting = rangeInpts[0].checked ? false : true;
        
        if (directionSetting == 'y') {
            el.classList.add('slider-with-panel_vertical'); 
        } else {
            el.classList.remove('slider-with-panel_vertical');
        }
        
        if (rangeSetting) {
            el.classList.add('slider-with-panel_range'); 
        } else {
            el.classList.remove('slider-with-panel_range');
        }
        
        $(sliderInpt).toxinSlider('update', {
            start: +minInpt.value,
            end: +maxInpt.value,
            step: +stepInpt.value,
            current: currentSetting,
            direction: directionSetting,
            range: rangeSetting,
            tip: tipInpt.checked,
            scaleValuesAmount: +scaleValuesInpt.value,
        });
        
        
        toInpt.step = +stepInpt.value;
        fromInpt.step = +stepInpt.value;
        toInpt.value = rangeSetting ? $(sliderInpt).toxinSlider('get', 'current')[1] : $(sliderInpt).toxinSlider('get', 'current');
        toInpt.nextElementSibling.value = toInpt.value;
        fromInpt.value = rangeSetting ? $(sliderInpt).toxinSlider('get', 'current')[0] : minInpt.value;
        fromInpt.nextElementSibling.value = fromInpt.value;
    }
    
    if (direction == 'y') {
        el.classList.add('slider-with-panel_vertical'); 
    }
    
    if (range) {
        el.classList.add('slider-with-panel_range'); 
    }
    
    //init inputs
    minInpt.value = min;
    minInpt.dispatchEvent(new Event('input'));
    
    maxInpt.value = max;
    maxInpt.dispatchEvent(new Event('input'));
    stepInpt.value = step;
    stepInpt.dispatchEvent(new Event('input'));
    toInpt.step = step;
    toInpt.dispatchEvent(new Event('input'));
    fromInpt.step = step;
    fromInpt.dispatchEvent(new Event('input'));
    scaleValuesInpt.value = scaleValues;
    scaleValuesInpt.dispatchEvent(new Event('input'));
    
    if (direction == 'x') {
        directionInpts[0].checked = true;
        directionInpts[0].dispatchEvent(new Event('change'));
    } else {
        directionInpts[1].checked = true;
        directionInpts[1].dispatchEvent(new Event('change'));
    }
    
    if (range) {
        rangeInpts[1].checked = true;
        rangeInpts[1].dispatchEvent(new Event('change'));
    } else {
        rangeInpts[0].checked = true;
        rangeInpts[0].dispatchEvent(new Event('change'));
    }
    
    if (tip) {
        tipInpt.checked = true;
        tipInpt.dispatchEvent(new Event('change'));
    }
    let initialCurrent;
    if ((range && from) || (range && from == 0)) {
        initialCurrent = [from, to];    
    } else if (range) {
        initialCurrent = [to, to];
    } else {
        initialCurrent = to;
    }
    
    $(sliderInpt).toxinSlider({
        start: min,
        end: max,
        step: step,
        current: initialCurrent,
        scaleValuesAmount: scaleValues,
        direction: direction,
        range: range,
        tip: tip,
        separator: separator
    });
    
    fromInpt.value = range ? $(sliderInpt).toxinSlider('get', 'current')[0] : min;
    fromInpt.dispatchEvent(new Event('input'));
    toInpt.value = range ? $(sliderInpt).toxinSlider('get', 'current')[1] : $(sliderInpt).toxinSlider('get', 'current');
    toInpt.dispatchEvent(new Event('input'));
    
    //tip    
    tipInpt.onchange = updateSettingsOnInput;
    
    //from    
    fromInpt.oninput = function () {
        
            if (+fromInpt.value < +minInpt.value) {
                minInpt.value = +fromInpt.value;
                minInpt.dispatchEvent(new Event('input'));
            } else if (+fromInpt.value > +maxInpt.value) {
                fromInpt.value = +maxInpt.value;
            }

            if (+fromInpt.value > +toInpt.value) {
                toInpt.value = fromInpt.value;
                toInpt.dispatchEvent(new Event('input'));
            }  
        
        updateSettingsOnInput();
    }
    
    //to    
    toInpt.oninput = function () {
        
        if (+toInpt.value > +maxInpt.value) {
            toInpt.value = maxInpt.value;
        } else if (+toInpt.value < +minInpt.value) {
            toInpt.value = minInpt.value;       
        }
        
        if (+toInpt.value < +fromInpt.value) {
            fromInpt.value = toInpt.value;
            fromInpt.dispatchEvent(new Event('input'));
        }
        
        updateSettingsOnInput();
    }
    
    //min    
    minInpt.oninput = function () {        
        if (+minInpt.value >= +maxInpt.value) {
            minInpt.value = +maxInpt.value - 1;
            return;
        }        
        updateSettingsOnInput();
    }
    
    //max    
    maxInpt.oninput = function () {
        if (+maxInpt.value <= +minInpt.value) {
            maxInpt.value = +minInpt.value + 1;
            return;
        }
        updateSettingsOnInput();
    }
    
    //step
    stepInpt.oninput = function () {
        if (+stepInpt.value <= 0) {
            stepInpt.value = 0;
            stepInpt.stepUp();
            stepInpt.nextElementSibling.value = stepInpt.value;
            return;
        }
        updateSettingsOnInput();
    }
    
    //scaleValues    
    scaleValuesInpt.oninput = function () {
        updateSettingsOnInput();
    }
    
    //direction
    directionInpts[0].onchange = updateSettingsOnInput;
    directionInpts[1].onchange = updateSettingsOnInput;
    
    //range    
    rangeInpts[0].onchange = updateSettingsOnInput;
    rangeInpts[1].onchange = updateSettingsOnInput;
    
    //sliderInpt
    sliderInpt.oninput = function() {
        if (!($(sliderInpt).toxinSlider('get', 'current') instanceof Array)) {
            toInpt.value = $(sliderInpt).toxinSlider('get', 'current');
            toInpt.nextElementSibling.value = toInpt.value;
            toInpt.nextElementSibling.style.width = ((toInpt.nextElementSibling.value.length + 1) * 8) + 'px';
        } else {
            fromInpt.value = $(sliderInpt).toxinSlider('get', 'current')[0];
            fromInpt.nextElementSibling.value = fromInpt.value;
            fromInpt.nextElementSibling.style.width = ((fromInpt.nextElementSibling.value.length + 1) * 8) + 'px';
            toInpt.value = $(sliderInpt).toxinSlider('get', 'current')[1];
            toInpt.nextElementSibling.value = toInpt.value;
            toInpt.nextElementSibling.style.width = ((toInpt.nextElementSibling.value.length + 1) * 8) + 'px';
        }
    }
}

export default synchronizePanelWithSlider;