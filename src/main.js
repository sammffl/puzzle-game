import './sass/main.scss';
import './utils/rem';
import Process from './js/process';

let processNum = null;

(function () {
    const $process = $('.loading-page__process span');
    processNum = new Process($process, {
        readyMilliseconds: 100,
        loadMilliseconds: 300
    });
    processNum.ready();
})();

window.addEventListener('load', () => {
    processNum.load(() => {
        // alert('loading结束');
    });
    console.log('load');
    // console.log(this.optionValue)
});

