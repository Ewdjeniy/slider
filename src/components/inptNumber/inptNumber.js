import './inptNumber.css';

const inptNumbers = document.getElementsByClassName('inpt-number');

for (let i = 0; i < inptNumbers.length; i++) {
    
    const minus = inptNumbers[i].getElementsByClassName('inpt-number__minus')[0];
    const value = inptNumbers[i].getElementsByClassName('inpt-number__value')[0];
    const plus = inptNumbers[i].getElementsByClassName('inpt-number__plus')[0];
    const inpt = inptNumbers[i].getElementsByClassName('inpt-number__inpt')[0];
    let stepIntervalId;
    
    inpt.addEventListener('input', function() {
        value.value = inpt.value;
        value.style.width = ((value.value.length + 1) * 8) + 'px';
    });
    
    value.oninput = function() {
        if (+value.value || value.value == '0') {
            inpt.value = value.value;
            inpt.dispatchEvent(new Event('input'));
        }
    }
    
    plus.onclick = function() {
        inpt.stepUp();
        value.value = inpt.value;
        inpt.dispatchEvent(new Event('input'));
    }
    
    plus.onpointerdown = function() {
        stepIntervalId = setInterval(() => {
            inpt.stepUp();
            value.value = inpt.value;
            inpt.dispatchEvent(new Event('input'));
        }, 120);
    }
    
    plus.onpointerup = function() {
        clearInterval(stepIntervalId);
    }
    
    minus.onclick = function() {
        inpt.stepDown();
        value.value = inpt.value;
        inpt.dispatchEvent(new Event('input'));
    }
    
    minus.onpointerdown = function() {
        stepIntervalId = setInterval(() => {
            inpt.stepDown();
            value.value = inpt.value;
            inpt.dispatchEvent(new Event('input'));
        }, 120);
    }
    
    minus.onpointerup = function() {
        clearInterval(stepIntervalId);
    }
    
}
