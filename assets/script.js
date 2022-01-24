let currentDay = $('#currentDay');
let $divContainer = $('.container');
console.log(moment().hour);

// hours that will appear on calendar
let hoursArray = [9,10,11,12,13,14,15,16,17];

// using moment.js to display the current date
displayTime();
function displayTime() {
    var rightNow = moment().format('dddd, MMM Do, YYYY [at] hh:mm:ss A');
    currentDay.text(rightNow);
}
// setInterval to update time every second
setInterval(displayTime, 1000);

// using IIFE for fun ~ probably unecessary
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
        // set inner hourEl text to display hour(hoursArray[i]) by using moment.js, hA format will set display as hour + am/pm
        hourEl.text(moment().set("hour", hoursArray[i]).format("hA"));
        rowEl.append(hourEl);

        // create textarea
        let textareaEl = $('<textarea>');
        textareaEl.addClass('col-10 description');
        //set  each textarea HTML data attribute to 'data-hour=hoursArray[i]'
        textareaEl.data('hour', hoursArray[i]);
        rowEl.append(textareaEl);

        // create buttons
        let saveBtn = $('<button>');
        saveBtn.addClass('col-1 saveBtn fas fa-check-circle');
        rowEl.append(saveBtn);
        
        // when right clicking on the save button, textarea is cleared
        $divContainer.on('contextmenu', (e)=> {
            e.preventDefault();
            textareaEl.val("");
        })
    }
    
})()

$divContainer.on('click', 'button', saveTask)
function saveTask(e) {
    e.preventDefault()
    // using previoussibling to obtain the value from textarea when clicking the save button 
    console.log($(this.previousElementSibling));
    let task = $(this.previousElementSibling).val();
    console.log(task);
}
// click save button to save text input to local storage for each respective hour

// moment() of selected date, get piece of out of for specific format
// monent() get todays date, 
// moment() gives today, moment(selected_Date) gives the specific time or date 
// for each row that === the hour, apply the past, present, future class. 
// moment() is before/ is after syntax
// build the row with id/class 
// capital HH for 24 hour clock in moment()