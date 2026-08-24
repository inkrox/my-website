(function () {
    'use strict';

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    /* 渲染一圈刻度数字（角度 rotate + 平移） */
    function renderDial(selector, radius) {
        for (var i = 0; i < 60; i++) {
            $(selector).append(
                '<span style="transform: rotate(' + 6 * i + 'deg) translateX(' + radius + 'px)">' + i + '</span>'
            );
        }
    }

    function updateClock() {
        var now = new Date();
        var second = now.getSeconds();
        var minute = now.getMinutes();
        var hour = now.getHours();
        var timeText = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        var dayIndex = now.getDay();
        var monthIndex = now.getMonth();
        var dateText = now.getDate() + ' . ' + monthNames[monthIndex];

        var secondDeg = second * -6;
        var minuteDeg = minute * -6;
        var hourDeg = hour * -30;

        $('.second').css('transform', 'rotate(' + secondDeg + 'deg)');
        $('.minute').css('transform', 'rotate(' + minuteDeg + 'deg)');
        $('.hour').css('transform', 'rotate(' + hourDeg + 'deg)');

        $('.time').text(timeText);
        $('.day').text(dayNames[dayIndex]);
        $('.date').text(dateText);
    }

    renderDial('.second', 195);
    renderDial('.minute', 145);
    renderDial('.dail', 230);

    for (var i = 1; i < 13; i++) {
        $('.hour').append(
            '<span style="transform: rotate(' + 30 * i + 'deg) translateX(100px)">' + i + '</span>'
        );
    }

    setInterval(updateClock, 1000);
    updateClock();
})();
