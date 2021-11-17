import ToxinSliderView from '../view.ts';
import testToxinSliderView from './view_spec.ts';
import { defaultSliderSettingsView } from '../defaults.ts';
import testDiapason from '../diapason/__tests__/diapason_spec.ts';
import testXDiapason from '../diapason/xDiapason/__tests__/xDiapason_spec.ts';
import testXRangeDiapason from '../diapason/xRangeDiapason/__tests__/xRangeDiapason_spec.ts';
import testYDiapason from '../diapason/yDiapason/__tests__/yDiapason_spec.ts';
import testYRangeDiapason from '../diapason/yRangeDiapason/__tests__/yRangeDiapason_spec.ts';
import testOutput from '../output/__tests__/output_spec.ts';
import testXOutput from '../output/xOutput/__tests__/xOutput_spec.ts';
import testXRangeOutput from '../output/xRangeOutput/__tests__/xRangeOutput_spec.ts';
import testYOutput from '../output/yOutput/__tests__/yOutput_spec.ts';
import testYRangeOutput from '../output/yRangeOutput/__tests__/yRangeOutput_spec.ts';
import testProgressBar from '../progressBar/__tests__/progressBar_spec.ts';
import testXProgressBar from '../progressBar/xProgressBar/__tests__/xProgressBar_spec.ts';
import testXRangeProgressBar from '../progressBar/xRangeProgressBar/__tests__/xRangeProgressBar_spec.ts';
import testYProgressBar from '../progressBar/yProgressBar/__tests__/yProgressBar_spec.ts';
import testYRangeProgressBar from '../progressBar/yRangeProgressBar/__tests__/yRangeProgressBar_spec.ts';
import testRunner from '../runner/__tests__/runner_spec.ts';
import testXRunner from '../runner/xRunner/__tests__/xRunner_spec.ts';
import testXRangeRunner from '../runner/xRangeRunner/__tests__/xRangeRunner_spec.ts';
import testYRunner from '../runner/yRunner/__tests__/yRunner_spec.ts';
import testYRangeRunner from '../runner/yRangeRunner/__tests__/yRangeRunner_spec.ts';
import testScale from '../scale/__tests__/scale_spec.ts';
import testXScale from '../scale/xScale/__tests__/xScale_spec.ts';
import testXRangeScale from '../scale/xRangeScale/__tests__/xRangeScale_spec.ts';
import testYScale from '../scale/yScale/__tests__/yScale_spec.ts';
import testYRangeScale from '../scale/yRangeScale/__tests__/yRangeScale_spec.ts';
import testScaleValues from '../scaleValues/__tests__/scaleValues_spec.ts';
import testXScaleValues from '../scaleValues/xScaleValues/__tests__/xScaleValues_spec.ts';
import testXRangeScaleValues from '../scaleValues/xRangeScaleValues/__tests__/xRangeScaleValues_spec.ts';
import testYScaleValues from '../scaleValues/yScaleValues/__tests__/yScaleValues_spec.ts';
import testYRangeScaleValues from '../scaleValues/yRangeScaleValues/__tests__/yRangeScaleValues_spec.ts';
import testTip from '../tip/__tests__/tip_spec.ts';
import testXTip from '../tip/xTip/__tests__/xTip_spec.ts';
import testXRangeTip from '../tip/xRangeTip/__tests__/xRangeTip_spec.ts';
import testYTip from '../tip/yTip/__tests__/yTip_spec.ts';
import testYRangeTip from '../tip/yRangeTip/__tests__/yRangeTip_spec.ts';

const testsRunner: any = {
    
    'settings':  defaultSliderSettingsView,
    'cloneSettings': function() {
        
        let clone = {};
        let cloneCurrent = [];

        for (let key in this.settings) {
            
            if (key == 'current' && (this.settings.current instanceof Array)) {
                for (let i = 0; i < this.settings.current.length; i++) {
                    cloneCurrent[i] = this.settings.current[i]; 
                }
                clone['current'] = cloneCurrent;
            } else {
                clone[key] = this.settings[key];   
            }
            
        }
        
        return clone;
        
    },
    'testToxinSliderView' : testToxinSliderView,
    'testDiapason' : testDiapason,
    'testXDiapason' : testXDiapason,
    'testXRangeDiapason' : testXRangeDiapason,
    'testYDiapason' : testYDiapason,
    'testYRangeDiapason' : testYRangeDiapason,
    'testOutput' : testOutput,
    'testXOutput' : testXOutput,
    'testXRangeOutput' : testXRangeOutput,
    'testYOutput' : testYOutput,
    'testYRangeOutput' : testYRangeOutput,
    'testProgressBar' : testProgressBar,
    'testXProgressBar' : testXProgressBar,
    'testXRangeProgressBar' : testXRangeProgressBar,
    'testYProgressBar' : testYProgressBar,
    'testYRangeProgressBar' : testYRangeProgressBar, 
    'testRunner' : testRunner,
    'testXRunner' : testXRunner,
    'testXRangeRunner' : testXRangeRunner,
    'testYRunner' : testYRunner,
    'testYRangeRunner' : testYRangeRunner,
    'testScale' : testScale,
    'testXScale' : testXScale,
    'testXRangeScale' : testXRangeScale,
    'testYScale' : testYScale,
    'testYRangeScale' : testYRangeScale,
    'testScaleValues' : testScaleValues,
    'testXScaleValues' : testXScaleValues,
    'testXRangeScaleValues' : testXRangeScaleValues,
    'testYScaleValues' : testYScaleValues,
    'testYRangeScaleValues' : testYRangeScaleValues,
    'testTip' : testTip,
    'testXTip' : testXTip,
    'testXRangeTip' : testXRangeTip,
    'testYTip' : testYTip,
    'testYRangeTip' : testYRangeTip,
    'startArr': [],
    'endArr': [],
    'stepArr': [],
    'currentArr': [],
    'scaleValuesAmountArr': [],
    
    'autoTestView': function (testFunctionKey: string) {
        
        const that = this;
        const autoTest = function (arr, setting: string, testFunctionKey: string, f?: any) {
            
            if (setting == 'current' && ((that.settings.current instanceof Array) || that.settings.range)) {
                that.settings.current = (that.settings.current instanceof Array) ? that.settings.current : [that.settings.current, that.settings.current];
                arr = (arr.length == 3) ? [arr,arr] : arr;
                
                that.settings.range = true;
                
                that.settings.current[1] = arr[1][0]
                
                for (let i = arr[0][0]; i < arr[0][1]; i += arr[0][2]) {
                    that.settings.current[0] = i;

                    if (f) {
                        f();
                    }   else {
                        if (testFunctionKey == 'all') {
                            that.runAll(that.cloneSettings());
                        } else {
                            that.runClassTests(that[testFunctionKey], that.cloneSettings());
                        }   
                    }
                }
                
                for (let i = arr[1][0] + arr[1][2]; i < arr[1][1]; i += arr[1][2]) {
                    that.settings.current[1] = i;
                    
                    if (f) {
                        f();
                    }   else {
                        if (testFunctionKey == 'all') {
                            that.runAll(that.cloneSettings());
                        } else {
                            that.runClassTests(that[testFunctionKey], that.cloneSettings());
                        }   
                    }
                }
                return;
            }

            for (let i = arr[0]; i < arr[1]; i += arr[2]) {
                that.settings[setting] = i;

                if (f) {
                    f();
                }   else {
                    if (testFunctionKey == 'all') {
                        that.runAll(that.cloneSettings());
                    } else {
                        that.runClassTests(that[testFunctionKey], that.cloneSettings());
                    }   
                }
            }

        }
    
        autoTest(that.startArr, 'start', testFunctionKey, function() {
            autoTest(that.endArr, 'end', testFunctionKey, function() {
                autoTest(that.stepArr, 'step', testFunctionKey, function() {
                    autoTest(that.currentArr, 'current', testFunctionKey, function() {
                        autoTest(that.scaleValuesAmountArr, 'scaleValuesAmount', testFunctionKey); 
                    }); 
                });
            });
        });

    },    
    'runAll': function(sliderSettings?: any) {
        const that = this;
        const testSubViews = function() {
            if (that.settings.direction == 'x' && !that.settings.range) {
                that.testDiapason(sliderSettings).testItselfWithSubClass(testXDiapason);
                that.testOutput(sliderSettings).testItselfWithSubClass(testXOutput);
                that.testProgressBar(sliderSettings).testItselfWithSubClass(testXProgressBar);
                that.testRunner(sliderSettings).testItselfWithSubClass(testXRunner);
                that.testScale(sliderSettings).testItselfWithSubClass(testXScale);
                that.testScaleValues(sliderSettings).testItselfWithSubClass(testXScaleValues);
                that.testProgressBar('XProgressBar', that.testXProgressBar);
                that.testRunner('XRunner', that.testXRunner);
                that.testScale('XScale', that.testXScale);
                that.testScaleValues('XScaleValues', that.testXScaleValues);
                if (that.settings.tip) {
                    that.testTip(sliderSettings).testItselfWithSubClass(testXTip);
                }
            } else if (that.settings.direction == 'x' && that.settings.range) {
                that.testDiapason(sliderSettings).testItselfWithSubClass(testXRangeDiapason);
                that.testOutput(sliderSettings).testItselfWithSubClass(testXRangeOutput);
                that.testProgressBar(sliderSettings).testItselfWithSubClass(testXRangeProgressBar);
                that.testRunner(sliderSettings).testItselfWithSubClass(testXRangeRunner);
                that.testScale(sliderSettings).testItselfWithSubClass(testXRangeScale);
                that.testScaleValues(sliderSettings).testItselfWithSubClass(testXRangeScaleValues);
                that.testProgressBar('XProgressBar', that.testXRangeProgressBar);
                that.testRunner('XRunner', that.testXRangeRunner);
                that.testScale('XScale', that.testXRangeScale);
                that.testScaleValues('XScaleValues', that.testXRangeScaleValues);
                if (that.settings.tip) {
                    that.testTip(sliderSettings).testItselfWithSubClass(testXRangeTip);
                }
            } else if (that.settings.direction == 'y' && !that.settings.range) {
                that.testDiapason(sliderSettings).testItselfWithSubClass(testYDiapason);
                that.testOutput(sliderSettings).testItselfWithSubClass(testYOutput);
                that.testProgressBar(sliderSettings).testItselfWithSubClass(testYProgressBar);
                that.testRunner(sliderSettings).testItselfWithSubClass(testYRunner);
                that.testScale(sliderSettings).testItselfWithSubClass(testYScale);
                that.testScaleValues(sliderSettings).testItselfWithSubClass(testYScaleValues);
                if (that.settings.tip) {
                    that.testTip(sliderSettings).testItselfWithSubClass(testYTip);
                }
            }
        }
        this.testToxinSliderView(sliderSettings).testItselfWithSubViews(testSubViews);
    },
    
    'runClassTests': function(testClass, sliderSettings?: any) {
        if (typeof(testClass(sliderSettings)) == 'object') {
            testClass(sliderSettings).testItself(); 
        }
    },
    
};
testsRunner.startArr = [testsRunner.settings.start, testsRunner.settings.start + 1, 1];
testsRunner.endArr = [testsRunner.settings.end, testsRunner.settings.end + 1, 1];
testsRunner.stepArr = [testsRunner.settings.step, testsRunner.settings.step + 1, 1];
testsRunner.currentArr = [testsRunner.settings.current, testsRunner.settings.current + 1, 1];
testsRunner.scaleValuesAmountArr = [testsRunner.settings.scaleValuesAmount, testsRunner.settings.scaleValuesAmount + 1, 1];

//testsRunner.settings.direction = 'x';
//testsRunner.settings.range = true;
//testsRunner.startArr = [-5, 5, 1];
//testsRunner.endArr = [10, 20, 1];
//testsRunner.stepArr = [1, 10, 1];
//testsRunner.currentArr = [-5, 5, 1];
//testsRunner.currentArr = [[-10, 10, 1],[11, 20, 1]];
//testsRunner.scaleValuesAmountArr = [0, 10, 1];

testsRunner.autoTestView('all');

//testsRunner.autoTestView('testToxinSliderView');

//testsRunner.autoTestView('testDiapason');
//testsRunner.autoTestView('testXDiapason');
//testsRunner.autoTestView('testXRangeDiapason');
//testsRunner.autoTestView('testYDiapason');
//testsRunner.autoTestView('testYRangeDiapason');

//testsRunner.autoTestView('testOutput');
//testsRunner.autoTestView('testXOutput');
//testsRunner.autoTestView('testXRangeOutput');
//testsRunner.autoTestView('testYOutput');
//testsRunner.autoTestView('testYRangeOutput');

//testsRunner.autoTestView('testProgressBar');
//testsRunner.autoTestView('testXProgressBar');
//testsRunner.autoTestView('testXRangeProgressBar');
//testsRunner.autoTestView('testYProgressBar');
//testsRunner.autoTestView('testYRangeProgressBar');

//testsRunner.autoTestView('testRunner');
//testsRunner.autoTestView('testXRunner');
//testsRunner.autoTestView('testXRangeRunner');
//testsRunner.autoTestView('testYRunner');
//testsRunner.autoTestView('testYRangeRunner');

//testsRunner.autoTestView('testScale');
//testsRunner.autoTestView('testXScale');
//testsRunner.autoTestView('testXRangeScale');
//testsRunner.autoTestView('testYScale');
//testsRunner.autoTestView('testYRangeScale');

//testsRunner.autoTestView('testScaleValues');
//testsRunner.autoTestView('testXScaleValues');
//testsRunner.autoTestView('testXRangeScaleValues');
//testsRunner.autoTestView('testYScaleValues');
//testsRunner.autoTestView('testYRangeScaleValues');

//testsRunner.autoTestView('testTip');
//testsRunner.autoTestView('testXTip');
//testsRunner.autoTestView('testXRangeTip');
//testsRunner.autoTestView('testYTip');
//testsRunner.autoTestView('testYRangeTip');