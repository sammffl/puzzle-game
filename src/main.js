import './sass/main.scss';
import './utils/rem';
import Process from './js/process';
import SectionOne from './js/sectionOne';

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
        $('.loading-page__startBtn').show(100);
    });
});


(function () {
    $('.loading-page__startBtn').bind('touchend', function (e) {
        $('.loading-page').hide();
        new SectionOne();
    });
})();
