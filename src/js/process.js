/**
 * Created by SamMFFL on 17/4/26.
 */

export default class Process {
    /**
     * 模拟页面加载进度条计数，ready的时候用短步长计数，load用长步长计数
     * @param $processNum
     * @param options
     */
    constructor($processNum, options) {
        const originalOption = {
            readyMin: 1,
            readyMax: 3,
            readyMilliseconds: 500,
            loadMin: 3,
            loadMax: 5,
            loadMilliseconds: 1000,
            max: 100,
        };
        this.options = $.extend({}, originalOption, options);
        this.$num = $($processNum);
        this._init();
    }

    _init() {
        this.num = 0;
        this.timer = null;
        this.$num.html(0);
    }

    /**
     * 页面元素加载
     */
    ready() {
        const {
            readyMilliseconds,
            readyMin,
            readyMax,
        } = this.options;

        const runReady = this.curryRun(readyMilliseconds, 0.9);
        runReady(readyMin, readyMax);
    }

    /**
     * 页面素材加载，完成加载执行callback
     * @param callback
     */
    load(callback) {
        clearInterval(this.timer);
        this.timer = null;

        const {
            loadMilliseconds,
            loadMin,
            loadMax
        } = this.options;

        const runLoad = this.curryRun(loadMilliseconds, 1);
        runLoad(loadMin, loadMax, callback);
    }

    _randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * 柯里化思想处理ready和load循环计数时间不一致的问题
     * @param milliseconds
     * @param limit
     * @returns {function(*=, *=, *=)}
     */
    curryRun(milliseconds, limit) {
        return (min, max, callback) => {
            const limitNum = Math.floor(this.options.max * limit);
            this.timer = setInterval(() => {
                this.num += this._randomNum(min, max);
                if (this.num >= limitNum) {
                    this.num = limitNum;
                    this.$num.html(limitNum);
                    clearInterval(this.timer);
                    this.timer = null;
                    setTimeout(() => {
                        !!callback && callback();
                    }, 100);
                } else {
                    this.$num.html(this.num);
                }
            }, milliseconds)
        }
    }
}
