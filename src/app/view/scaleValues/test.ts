//import './scaleValues.css';
//
//class ScaleValues {
//
//    scaleValuesEl:  HTMLElement = document.createElement('div');
//    scaleValuesModTurner: string;
//    mediator: any;
//    min: number;
//    max: number;
//    step: number;
//    scaleValuesAmount: number;
//    stepsAmount: number;
//    parentClone: HTMLElement = document.createElement('div');
//    maxSizeMeter: HTMLElement;
//    decimalPlaces: number;
//    
//    constructor(options) {
//        this.scaleValuesModTurner = options.scaleValues ? 'number' : 'lines';
//        this.min = options.min;
//        this.max = options.max;
//        this.step = options.step;
//        this.scaleValuesAmount = options.scaleValuesAmount;
//        this.stepsAmount = Math.round((this.max - this.min) / this.step);
//        this.decimalPlaces = this.step.toString().includes('.') ? this.step.toString().split('.')[1].length : 0;
//        
//        this.setScaleValuesMod();
//        this.insertMaxSizeMeter = this.insertMaxSizeMeter.bind(this);
//        this.setScaleValues = this.setScaleValues.bind(this);
//        
////        document.addEventListener("DOMContentLoaded", this.insertMaxSizeMeter);
////        document.addEventListener("DOMContentLoaded", this.setScaleValues);
//    }
//    
//    insertMaxSizeMeter(): void {
//        this.parentClone.className = 'scale-values-parent-clone';
//        this.parentClone.innerHTML = this.scaleValuesEl.parentElement.outerHTML;
//        this.scaleValuesEl.parentElement.before(this.parentClone);
//        
//        this.maxSizeMeter = this.parentClone.getElementsByClassName('scale-values')[0] as HTMLElement;
//        this.maxSizeMeter.style.width = '100vw';
//        console.log(this.maxSizeMeter.clientWidth);
//    }
//    
//    returnStepInPx(): number {
//        return this.maxSizeMeter.clientWidth / this.stepsAmount; 
//    }
//    
//    setScaleValuesMod(): void {
//        this.scaleValuesEl.className = this.scaleValuesModTurner == 'number' ? 'scale-values sсale-values_numbers' : 'scale-values sсale-values_lines';
//    }
//    
//    setScaleValues(): void {
//        
//        let result: string = '<div class="scale-value" style="left: 0">' + this.min + '</div>';
//        for (let i = 1; i < this.scaleValuesAmount - 1; i++) {
//            
//            const stepsAmountInOneValue = Math.round(((this.max - this.min) / this.step) / (this.scaleValuesAmount - 1));
//            
//            result += '<div class="scale-value" style="left: ' + stepsAmountInOneValue * i * this.returnStepInPx() + 'px;">';
//            result += parseFloat((this.min + stepsAmountInOneValue * i * this.step).toFixed(this.decimalPlaces));
//            result += '</div>';
//            
//        }
//        result += '<div class="scale-value end-value">' + this.max + '</div>';
//        this.scaleValuesEl.innerHTML = result;
//        
////        const scaleValues = this.scaleValuesEl.getElementsByClassName('scale-value') as HTMLCollectionOf<HTMLElement>;;
////        for (let i = 0; i < scaleValues.length; i++) {
////            scaleValues[i].style.left = parseFloat(scaleValues[i].style.left) - parseFloat(getComputedStyle(scaleValues[i]).width) / 2 + 'px';
////        }
//        
//    }
//    
//};
//
//export default ScaleValues;
//
//
////    setScaleValues(scaleValuesAmount, start, end, step, decimalPlaces, progressBarFontSize, runnerEl): void {
////        
////        const runnerWidth = parseFloat(getComputedStyle(runnerEl).width);
////        
////        let result: string = '<div class="scale-value" style="left: 0">' + start + '</div>';
////        for (let i = 1; i < scaleValuesAmount - 1; i++) {
////            const stepsAmountInOneValue = Math.round(((end - start) / step) / (scaleValuesAmount - 1));
////            
////            if (parseFloat(start + stepsAmountInOneValue * i * step) <= end) {
////                result += '<div class="scale-value" style="left: ' + stepsAmountInOneValue * i * progressBarFontSize + 'px;">';
////                result += parseFloat((start + stepsAmountInOneValue * i * step).toFixed(decimalPlaces));
////                result += '</div>';  
////            }
////        }
////        result += '<div class="scale-value end-value" style="right: calc(0px + ' + runnerWidth / 2 + 'px)">' + end + '</div>';
////        this.scaleValuesEl.innerHTML = result;
////        this.scaleValuesEl.style.marginLeft = runnerWidth / 2 + 'px';
////        this.scaleValuesEl.style.height = getComputedStyle(this.scaleValuesEl.getElementsByClassName('scale-value')[0]).height;
////        
////        const scaleValues = this.scaleValuesEl.getElementsByClassName('scale-value') as HTMLCollectionOf<HTMLElement>;;
////        for (let i = 0; i < scaleValues.length; i++) {
////            scaleValues[i].style.left = parseFloat(scaleValues[i].style.left) - parseFloat(getComputedStyle(scaleValues[i]).width) / 2 + 'px';
////        }
////    }