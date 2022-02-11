import './sliderWithPanel.css';
import * as $ from 'jquery';


function synchronizePanelWithSlider(panel, options) {
    
    const sliderInpt = panel.getElementsByClassName('slider-with-panel__slider')[0];
    const minInpt = panel.getElementsByClassName('slider-with-panel__min-inpt')[0];
    const maxInpt = panel.getElementsByClassName('slider-with-panel__max-inpt')[0];
    const fromInpt = panel.getElementsByClassName('slider-with-panel__from-inpt')[0];
    const toInpt = panel.getElementsByClassName('slider-with-panel__to-inpt')[0];
    const stepInpt = panel.getElementsByClassName('slider-with-panel__step-inpt')[0];
    const scaleValuesInpt = panel.getElementsByClassName('slider-with-panel__scale-values-inpt')[0];
    const scaleValuesAmountInpt = panel.getElementsByClassName('slider-with-panel__scale-values-amount-inpt')[0];
    const directionInpts = panel.getElementsByClassName('slider-with-panel__direction-inpt');
    const rangeInpts = panel.getElementsByClassName('slider-with-panel__range-inpt');
    const tipInpt = panel.getElementsByClassName('slider-with-panel__tip-inpt')[0];
    const updateSettingsOnInput = function() {
        
        const currentSetting = rangeInpts[0].checked ? [+toInpt.value] : [+fromInpt.value, +toInpt.value];
        const directionSetting = directionInpts[0].checked ? 'x' : 'y';
        const rangeSetting = rangeInpts[0].checked ? false : true;
        
        if (directionSetting == 'y') {
            panel.classList.add('slider-with-panel_vertical'); 
        } else {
            panel.classList.remove('slider-with-panel_vertical');
        }
        
        if (rangeSetting) {
            panel.classList.add('slider-with-panel_range'); 
        } else {
            panel.classList.remove('slider-with-panel_range');
        }
        
        $(sliderInpt).toxinSlider('update', {
            min: +minInpt.value,
            max: +maxInpt.value,
            step: +stepInpt.value,
            current: currentSetting,
            direction: directionSetting,
            range: rangeSetting,
            tip: tipInpt.checked,
            scaleValues: scaleValuesInpt.checked,
            scaleValuesAmount: +scaleValuesAmountInpt.value,
        });
        
        
        toInpt.step = +stepInpt.value;
        fromInpt.step = +stepInpt.value;
        toInpt.value = rangeSetting ? $(sliderInpt).toxinSlider('get', 'current')[1] : $(sliderInpt).toxinSlider('get', 'current')[0];
        toInpt.nextElementSibling.value = toInpt.value;
        fromInpt.value = rangeSetting ? $(sliderInpt).toxinSlider('get', 'current')[0] : minInpt.value;
        fromInpt.nextElementSibling.value = fromInpt.value;
    }
    
    if (options.direction == 'y') {
        panel.classList.add('slider-with-panel_vertical'); 
    }
    
    if (options.range) {
        panel.classList.add('slider-with-panel_range'); 
    }
    
    //init inputs
    minInpt.value = options.min;
    minInpt.dispatchEvent(new Event('input'));

    maxInpt.value = options.max;
    maxInpt.dispatchEvent(new Event('input'));
    stepInpt.value = options.step;
    stepInpt.dispatchEvent(new Event('input'));
    toInpt.step = options.step;
    toInpt.dispatchEvent(new Event('input'));
    fromInpt.step = options.step;
    fromInpt.dispatchEvent(new Event('input'));
    scaleValuesAmountInpt.value = options.scaleValuesAmount;
    scaleValuesAmountInpt.dispatchEvent(new Event('input'));
    
    if (options.direction == 'x') {
        directionInpts[0].checked = true;
        directionInpts[0].dispatchEvent(new Event('change'));
    } else {
        directionInpts[1].checked = true;
        directionInpts[1].dispatchEvent(new Event('change'));
    }
    
    if (options.range) {
        rangeInpts[1].checked = true;
        rangeInpts[1].dispatchEvent(new Event('change'));
    } else {
        rangeInpts[0].checked = true;
        rangeInpts[0].dispatchEvent(new Event('change'));
    }
    
    if (options.scaleValues) {
        scaleValuesInpt.checked = true;
        scaleValuesInpt.dispatchEvent(new Event('change'));
    }
    
    if (options.tip) {
        tipInpt.checked = true;
        tipInpt.dispatchEvent(new Event('change'));
    }

    $(sliderInpt).toxinSlider(options);
    
    fromInpt.value = options.range ? $(sliderInpt).toxinSlider('get', 'current')[0] : options.min;
    fromInpt.dispatchEvent(new Event('input'));
    
    toInpt.value = options.range ? $(sliderInpt).toxinSlider('get', 'current')[1] : $(sliderInpt).toxinSlider('get', 'current')[0];
    toInpt.dispatchEvent(new Event('input'));
    
    //scaleValues
    scaleValuesInpt.onchange = updateSettingsOnInput;
    
    //tip    
    tipInpt.onchange = updateSettingsOnInput;
    
    //from    
    fromInpt.oninput = updateSettingsOnInput;
    
    //to    
    toInpt.oninput = updateSettingsOnInput;
    
    //min    
    minInpt.oninput = updateSettingsOnInput;
    
    //max    
    maxInpt.oninput = updateSettingsOnInput;
    
    //step
    stepInpt.oninput = updateSettingsOnInput;
    
    //scaleValuesAmount    
    scaleValuesAmountInpt.oninput = updateSettingsOnInput;
    
    //direction
    directionInpts[0].onchange = updateSettingsOnInput;
    directionInpts[1].onchange = updateSettingsOnInput;
    
    //range    
    rangeInpts[0].onchange = updateSettingsOnInput;
    rangeInpts[1].onchange = updateSettingsOnInput;
    
    //sliderInpt
    sliderInpt.oninput = function() {
        if ($(sliderInpt).toxinSlider('get', 'current').length < 2) {
            toInpt.value = $(sliderInpt).toxinSlider('get', 'current')[0];
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//    //from    
//    fromInpt.oninput = function () {
//        
//            if (+fromInpt.value < +minInpt.value) {
//                minInpt.value = +fromInpt.value;
//                minInpt.dispatchEvent(new Event('input'));
//            } else if (+fromInpt.value > +maxInpt.value) {
//                fromInpt.value = +maxInpt.value;
//            }
//
//            if (+fromInpt.value > +toInpt.value) {
//                toInpt.value = fromInpt.value;
//                toInpt.dispatchEvent(new Event('input'));
//            }  
//        
//        updateSettingsOnInput();
//    }
    
//    //to    
//    toInpt.oninput = function () {
//        
//        if (+toInpt.value > +maxInpt.value) {
//            toInpt.value = maxInpt.value;
//        } else if (+toInpt.value < +minInpt.value) {
//            toInpt.value = minInpt.value;       
//        }
//        
//        if (+toInpt.value < +fromInpt.value) {
//            fromInpt.value = toInpt.value;
//            fromInpt.dispatchEvent(new Event('input'));
//        }
//        
//        updateSettingsOnInput();
//    }
//    
//    //min    
//    minInpt.oninput = function () {        
//        if (+minInpt.value >= +maxInpt.value) {
//            minInpt.value = +maxInpt.value - 1;
//            return;
//        }        
//        updateSettingsOnInput();
//    }
//    
//    //max    
//    maxInpt.oninput = function () {
//        if (+maxInpt.value <= +minInpt.value) {
//            maxInpt.value = +minInpt.value + 1;
//            return;
//        }
//        updateSettingsOnInput();
//    }
//    
//    //step
//    stepInpt.oninput = function () {
//        if (+stepInpt.value <= 0) {
//            stepInpt.value = 0;
//            stepInpt.stepUp();
//            stepInpt.nextElementSibling.value = stepInpt.value;
//            return;
//        }
//        updateSettingsOnInput();
//    }
//    
//    //scaleValuesAmount    
//    scaleValuesAmountInpt.oninput = function () {
//        updateSettingsOnInput();
//    }
//    
//    //direction
//    directionInpts[0].onchange = updateSettingsOnInput;
//    directionInpts[1].onchange = updateSettingsOnInput;
//    
//    //range    
//    rangeInpts[0].onchange = updateSettingsOnInput;
//    rangeInpts[1].onchange = updateSettingsOnInput;
//    
//    //sliderInpt
//    sliderInpt.oninput = function() {
//        if (!($(sliderInpt).toxinSlider('get', 'current') instanceof Array)) {
//            toInpt.value = $(sliderInpt).toxinSlider('get', 'current');
//            toInpt.nextElementSibling.value = toInpt.value;
//            toInpt.nextElementSibling.style.width = ((toInpt.nextElementSibling.value.length + 1) * 8) + 'px';
//        } else {
//            fromInpt.value = $(sliderInpt).toxinSlider('get', 'current')[0];
//            fromInpt.nextElementSibling.value = fromInpt.value;
//            fromInpt.nextElementSibling.style.width = ((fromInpt.nextElementSibling.value.length + 1) * 8) + 'px';
//            toInpt.value = $(sliderInpt).toxinSlider('get', 'current')[1];
//            toInpt.nextElementSibling.value = toInpt.value;
//            toInpt.nextElementSibling.style.width = ((toInpt.nextElementSibling.value.length + 1) * 8) + 'px';
//        }
//    }
}

export default synchronizePanelWithSlider;