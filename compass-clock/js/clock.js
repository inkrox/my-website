$.fn.extend({
    /* 罗盘时钟插件 */
    clock: function () {
        var clock = {};
        clock.$el = $(this);
        clock.zhNumberNames = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

        /* 数字转简体中文 */
        clock.toChineseNumber = function (value) {
            /* 小于 10 */
            if (value < 10) {
                return this.zhNumberNames[value];
            }

            var digits = value.toString();
            var str = '';
            /* 整 10 */
            if (digits.charAt(1) == 0) {
                if (digits.charAt(0) != 1) {
                    str = this.zhNumberNames[parseInt(digits.charAt(0), 10)];
                }
                str += this.zhNumberNames[10];
                return str;
            }

            /* 小于 20 */
            if (value < 20) {
                str = this.zhNumberNames[10] + this.zhNumberNames[parseInt(digits.charAt(1), 10)];
                return str;
            }
            str = this.zhNumberNames[parseInt(digits.charAt(0), 10)] + this.zhNumberNames[10] +
                this.zhNumberNames[parseInt(digits.charAt(1), 10)];
            return str;
        };

        /* 设置日期 */
        clock.setDate = function () {
            var yearStr = '';
            var monthStr = '';
            var dayStr = '';
            var yearDigits = this.dateInfo.year.toString();
            for (var i = 0; i < yearDigits.length; i++) {
                yearStr += this.toChineseNumber(parseInt(yearDigits.charAt(i), 10));
            }
            monthStr = this.toChineseNumber(this.dateInfo.month);
            dayStr = this.toChineseNumber(this.dateInfo.day);
            if (this.elements) {
                this.elements.date.html(yearStr + '年' + monthStr + '月' + dayStr + '日');
            } else {
                this.$el.append('<li class="date">' + (yearStr + '年' + monthStr + '月' + dayStr + '日') + '</li>');
            }
        };

        /* 生成一圈刻度并旋转到当前时间 */
        clock.buildDial = function (total, range, rotateClass, className, unit, nextStep) {
            var html = '';
            var rotateDegrees = [];
            for (var i = 1; i <= total; i++) {
                rotateDegrees.push(range / total * (i - 1) * -1);
                html += '<div><div>' + (this.toChineseNumber(i)) + unit + '</div></div>';
            }
            this.$el.append('<li class="' + className + '">' + html + '</li>');
            setTimeout(function () {
                clock.$el.find('.' + rotateClass + '>div').each(function (index, el) {
                    $(el).css({
                        'transform': 'rotate(' + rotateDegrees[index] + 'deg)'
                    });
                });
                setTimeout(function () {
                    nextStep.call(clock);
                }, 300);
            }, 100);
        };

        /* 设置小时刻度 */
        clock.setHour = function () {
            this.buildDial(24, 360, 'on-hour', 'hour on-hour', '时', this.setMinute);
        };

        /* 设置分钟刻度 */
        clock.setMinute = function () {
            this.buildDial(60, 360, 'on-minute', 'hour minute on-minute', '分', this.setSec);
        };

        /* 设置秒刻度 */
        clock.setSec = function () {
            this.buildDial(60, 360, 'on-sec', 'hour sec on-sec', '秒', this.initRotate);
        };

        /* 初始化滚动位置 */
        clock.initRotate = function () {
            this.rotateInfo = {
                'h': 360 / 24 * (this.dateInfo.hour - 1),
                'm': 360 / 60 * (this.dateInfo.minute - 1),
                's': 360 / 60 * (this.dateInfo.sec - 1)
            };
            this.elements = {
                'date': this.$el.find('.date'),
                'hour': this.$el.find('.on-hour'),
                'minute': this.$el.find('.on-minute'),
                'sec': this.$el.find('.on-sec')
            };
            this.elements.hour.css({
                'transform': 'rotate(' + this.rotateInfo.h + 'deg)'
            });
            this.elements.minute.css({
                'transform': 'rotate(' + this.rotateInfo.m + 'deg)'
            });
            this.elements.sec.css({
                'transform': 'rotate(' + this.rotateInfo.s + 'deg)'
            });
            setTimeout(function () {
                clock.$el.find('hr').addClass('active').css({
                    'width': '49%'
                });
                clock.start();
            }, 300);
        };

        /* 启动走时 */
        clock.start = function () {
            setTimeout(function () {
                if (clock.dateInfo.sec <= 60) {
                    clock.dateInfo.sec++;
                    var secondDeg = 360 / 60 * (clock.dateInfo.sec - 1);
                    clock.elements.sec.css({
                        'transform': 'rotate(' + secondDeg + 'deg)'
                    });
                    clock.increaseMinute();
                    clock.start();
                } else {
                    console.log(clock.dateInfo.sec);
                }
            }, 1000);
        };

        /* 秒满 60 进位到分钟 */
        clock.increaseMinute = function () {
            if (clock.dateInfo.sec == 60 + 1) {
                setTimeout(function () {
                    clock.elements.sec.css({
                        'transform': 'rotate(0deg)',
                        'transition-duration': '0s'
                    });
                    clock.dateInfo.sec = 1;
                    setTimeout(function () {
                        clock.elements.sec.attr('style', 'transform:rotate(0deg)');
                    }, 100);
                    clock.dateInfo.minute++;
                    var minuteDeg = 360 / 60 * (clock.dateInfo.minute - 1);
                    clock.elements.minute.css({
                        'transform': 'rotate(' + minuteDeg + 'deg)'
                    });
                    clock.increaseHour();
                }, 300);
            }
        };

        /* 分钟满 60 进位到小时 */
        clock.increaseHour = function () {
            if (clock.dateInfo.minute == 60 + 1) {
                setTimeout(function () {
                    clock.elements.minute.css({
                        'transform': 'rotate(0deg)',
                        'transition-duration': '0s'
                    });
                    clock.dateInfo.minute = 1;
                    setTimeout(function () {
                        clock.elements.minute.attr('style', 'transform:rotate(0deg)');
                    }, 100);
                    clock.dateInfo.hour++;
                    var hourDeg = 360 / 24 * (clock.dateInfo.hour - 1);
                    clock.elements.hour.css({
                        'transform': 'rotate(' + hourDeg + 'deg)'
                    });
                    clock.increaseDay();
                }, 300);
            }
        };

        /* 小时满 24 进位到天数 */
        clock.increaseDay = function () {
            if (clock.dateInfo.hour == 24 + 1) {
                setTimeout(function () {
                    clock.elements.hour.css({
                        'transform': 'rotate(0deg)',
                        'transition-duration': '0s'
                    });
                    clock.dateInfo.hour = 1;
                    setTimeout(function () {
                        clock.elements.hour.attr('style', 'transform:rotate(0deg)');
                    }, 100);

                    var nowDate = new Date();
                    clock.dateInfo.year = nowDate.getFullYear();
                    clock.dateInfo.month = nowDate.getMonth() + 1;
                    clock.dateInfo.day = nowDate.getDate();
                    clock.setDate();
                }, 300);
            }
        };

        /* 初始化 */
        clock.init = function () {
            var nowDate = new Date();
            this.dateInfo = {
                'year': nowDate.getFullYear(),
                'month': nowDate.getMonth() + 1,
                'day': nowDate.getDate(),
                'hour': nowDate.getHours(),
                'minute': nowDate.getMinutes(),
                'sec': nowDate.getSeconds()
            };
            console.log(this.dateInfo);
            this.setDate();
            this.setHour();
        };
        clock.init();
    }
});
