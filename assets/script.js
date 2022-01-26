let currentDay = $("#currentDay");
let $divContainer = $(".container");
let header = $("header");
let clearBtnEl = $(".clearBtn");


// hours that will appear on calendar
let hoursArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// using moment.js to display the current date
displayTime();
function displayTime() {
    var rightNow = moment().format("dddd, MMM Do, YYYY [at] hh:mm:ss A");
    currentDay.text(rightNow);
}
// setInterval to update time every second
setInterval(displayTime, 1000);

printCalendar();

function printCalendar() {
    // iterate through hoursArray length to create rows
    for (let i = 0; i < hoursArray.length; i++) {
        let rowEl = $("<row>");
        rowEl.addClass("row time-block");
        // append created rows to container element
        $divContainer.append(rowEl);

        // create column to display hour
        let hourEl = $("<col>");
        hourEl.addClass("col-1 hour");
        // set inner hourEl text to display hour(hoursArray[i]) by using moment.js, hA format will set display as hour + am/pm
        hourEl.text(moment().set("hour", hoursArray[i]).format("hA"));
        rowEl.append(hourEl);

        // create textarea
        let textareaEl = $("<textarea>");
        textareaEl.addClass("col-10 description");
        //set each textarea HTML data attribute to 'data-hour=hoursArray[i]'
        textareaEl.data("hour", hoursArray[i]);

        // setting class styles to the text area depending on the current time
        if (moment().hour() > hoursArray[i]) {
            textareaEl.addClass("past");
        } else if (moment().hour() < hoursArray[i]) {
            textareaEl.addClass("future");
        } else {
            textareaEl.addClass("present");
        }
        // if localStorage != null, display ls text within textarea
        if (localStorage.getItem(hoursArray[i])) {
            let savedText = localStorage.getItem(hoursArray[i]);
            textareaEl.text(savedText);
        }
        rowEl.append(textareaEl);

        // create save buttons
        let saveBtn = $("<button>");
        saveBtn.addClass("col-1 saveBtn fas fa-check-circle");
        rowEl.append(saveBtn);
    };

    
    $divContainer.on("click", "button", saveTask);

    function saveTask(e) {
        e.preventDefault();
        // using previousElementsibling to obtain the value from textarea when clicking the save button
        // console.log($(this.previousElementSibling));
        let task = $(this.previousElementSibling).val();
        let workDayHour = $(this.previousElementSibling).data("hour");
        // console.log(task);
        // console.log(workDayHour);
        localStorage.setItem(workDayHour, task);
    }

    // when button is clicked, textarea is cleared and localstorage is wiped
    clearBtnEl.on("click", (e) => {
        e.preventDefault();
        $(".description").each(function () {
            $(this).val("")
        })
        localStorage.clear();
        showAlert('All tasks cleared');
    });

    // showAlert message
    function showAlert(message) {
        let div = $('<div>');
        div.addClass('alert alert-success');
        div.text(message);
        $divContainer.prepend(div);

        setTimeout(function () {
            $('.alert').remove();
        }, 3000);

    }
}
