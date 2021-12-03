import './radio.css';
import './_checked/radio_checked.css';



const radios = document.getElementsByClassName('radio');
for (let i = 0; i < radios.length; i++) {
    const radioInpt = radios[i].getElementsByClassName('radio__inpt')[0];
    
    radioInpt.addEventListener('change', function () {
        const radioArr = document.getElementsByName(radios[i].getElementsByClassName('radio__inpt')[0].name)
        
        for (let j = 0; j < radioArr.length; j++) {
            if (radioArr[j].checked == false) {
                radioArr[j].parentElement.parentElement.parentElement.classList.remove('radio_checked');
            }
        }
        
        radios[i].classList.add('radio_checked');
        radios[i].getElementsByClassName('radio__inpt')[0].click();
    });
    
    radios[i].onclick = function() {
        this.getElementsByClassName('radio__inpt')[0].click();
    }
        
}
