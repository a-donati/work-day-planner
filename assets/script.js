let currentDay = $('#currentDay');
let $divContainer = $('.container');

// hours that will appear on calendar
let hoursArray = [9,10,11,12,13,14,15,16,17];

// using moment.js to display the current date
displayTime();
function displayTime() {
    var rightNow = moment().format('dddd, MMM Do, YYYY');
    currentDay.text(rightNow);
}

// printCalendar();

// using IIFE for fun
(function printCalendar() {
    // iterate through hoursArray length to create rows
    for(let i=0; i < hoursArray.length; i++) {
        let rowEl = $("<row>");
        rowEl.addClass('row time-block');
        // append created rows to container element
        $divContainer.append(rowEl);

        // create column to display hour
        let hourEl = $("<col>");
        hourEl.addClass('col-1 hour');
        // set inner hourEl to set moment() by using hoursArray[i], hA format will set hour + am/pm
        hourEl.text(moment().set("hour", hoursArray[i]).format("hA"));
        rowEl.append(hourEl);

        // create textarea
        let textareaEl = $('<textarea>');
        textareaEl.addClass('col-10 description');
        //set textarea HTML data attribute to data-hour: hoursArray[i]
        textareaEl.data('hour', hoursArray[i]);
        rowEl.append(textareaEl);

        // create buttons
        let saveBtn = $('<button>');
        saveBtn.addClass('col-1 saveBtn');
        rowEl.append(saveBtn);
    }
})()



// moment() of selected date, get piece of out of for specific format
// monent() get todays date, 
// moment() gives today, moment(selected_Date) gives the specific time or date 
// for each row that === the hour, apply the past, present, future class. 
// moment() is before/ is after syntax
// build the row with id/class 
// capital HH for 24 hour clock in moment()


