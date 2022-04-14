function isValidDate(dateStr) {
    var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/; // requires 4 digit year

    var matchArray = dateStr.match(datePat); // is the format ok?
    if (matchArray == null) {
        alert("Date is not in a valid format.")
        return false;
    }
    month = matchArray[1]; // parse date into variables
    day = matchArray[3];
    year = matchArray[4];
    if (month < 1 || month > 12) { // check month range
        alert("Month must be between 1 and 12.");
        return false;
    }
    if (day < 1 || day > 31) {
        alert("Day must be between 1 and 31.");
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        alert("Month " + month + " doesn't have 31 days!")
        return false;
    }
    if (month == 2) { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isleap)) {
            alert("February " + year + " doesn't have " + day + " days!");
            return false;
        }
    }
    return true;
}

function dispDate(dateObj) {
    month = dateObj.getMonth() + 1;
    month = (month < 10) ? "0" + month : month;

    day = dateObj.getDate();
    day = (day < 10) ? "0" + day : day;

    year = dateObj.getYear();
    if (year < 2000) year += 1900;

    return (month + "/" + day + "/" + year);
}

function pregnancyCalc(pregform) {
    menstrual = new Date(); // creates new date objects
    ovulation = new Date();
    duedate = new Date();
    today = new Date();
    cycle = 0, luteal = 0; // sets variables to invalid state ==> 0

    if (isValidDate(pregform.menstrual.value)) { // Validates menstual date 
        menstrualinput = new Date(pregform.menstrual.value);
        menstrual.setTime(menstrualinput.getTime())
    }
    else return false; // otherwise exits

    cycle = (pregform.cycle.value == "" ? 28 : pregform.cycle.value); // defaults to 28
    // validates cycle range, from 22 to 45
    if (pregform.cycle.value != "" && (pregform.cycle.value < 22 || pregform.cycle.value > 45)) {
        alert("Your cycle length is either too short or too long for \n"
            + "calculations to be very accurate!  We will still try to \n"
            + "complete the calculation with the figure you entered. ");
    }

    luteal = (pregform.luteal.value == "" ? 14 : pregform.luteal.value); // defaults to 14
    // validates luteal range, from 9 to 16
    if (pregform.luteal.value != "" && (pregform.luteal.value < 9 || pregform.luteal.value > 16)) {
        alert("Your luteal phase length is either too short or too long for \n"
            + "calculations to be very accurate!  We will still try to complete \n"
            + "the calculation with the figure you entered. ");
    }

    ovulation.setTime(menstrual.getTime() + (cycle * 86400000) - (luteal * 86400000));
    pregform.conception.value = dispDate(ovulation);

    // sets due date to ovulation date plus 266 days
    duedate.setTime(ovulation.getTime() + 266 * 86400000);
    pregform.duedate.value = dispDate(duedate);

    // sets fetal age to 14 + 266 (pregnancy time) - time left
    var fetalage = 14 + 266 - ((duedate - today) / 86400000);
    weeks = parseInt(fetalage / 7); // sets weeks to whole number of weeks
    days = Math.floor(fetalage % 7); // sets days to the whole number remainder

    // fetal age message, automatically includes 's' on week and day if necessary
    fetalage = weeks + " week" + (weeks > 1 ? "s" : "") + ", " + days + " days";
    pregform.fetalage.value = fetalage;

    return false; // form should never submit, returns false
}