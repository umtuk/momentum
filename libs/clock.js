 var date = new Date();
 var dayForm = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

var getTimeForm = function() {
    var form = new Object();

    var hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    var timeForm = hours + ':' + minutes;
    form.time = timeForm;   // 18:14
    form.day = date.getDay();

    return form;
}

var setClockDOM = function(clockForm) {
    console.log(clockForm);

    var clockNode = document.getElementById('clock');
    var content = clockForm.time + ' ' + dayForm[clockForm.day];

    clockNode.innerText = content;

    return 0;
}

var setClock = function() {
    date = new Date();
    var clockForm = getTimeForm();
    setClockDOM(clockForm);
    var timer = setTimeout(function() {
        setClock();
    }, (60 - date.getSeconds()) * 1000);
}

setClock();
