import './checkbox.css';

function hangCheckboxesHandler() {
    const checkboxes = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        const checkboxInpt = checkboxes[i].getElementsByClassName('checkbox__inpt')[0];
//        if (checkboxes[i].getElementsByClassName('checkbox__hidden')[0].checked) {
//            checkboxes[i].classList.add('checkbox_checked');
//        } else {
//            checkboxes[i].classList.remove('checkbox_checked');
//        }
        checkboxInpt.addEventListener('change', function () {
            if (this.checked) {
                checkboxes[i].classList.add('checkbox_checked');
            } else {
                checkboxes[i].classList.remove('checkbox_checked');
            }
        });
        
        checkboxes[i].onclick = function () {
            checkboxInpt.click();
        };
    }
}
hangCheckboxesHandler();



export default hangCheckboxesHandler;
