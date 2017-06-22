/*globals console require export */
/*jshint esversion: 6 */

const data = {
    "01.01.2015": 33.3,
    "02.01.2015": 20.2,
    "03.01.2015": 18.3,
    "04.01.2015": 22.2,
    "05.01.2015": 30.0,
    "05.02.2015": 10.2,
    "06.01.2015": 40.2,
    "07.01.2015": 22.3,
    "08.01.2015": 23.2,
    "09.01.2015": 24.2,
    "10.01.2015": 25.2,
    "11.01.2015": 30.2,
    "12.01.2015": 30.2,
    "13.01.2015": 31.2,
    "14.01.2015": 10.2,
    "14.02.2015": 10.2
};

const weekDays = {
    "4": "понеделник",
    "5": "вторник",
    "6": "сряда",
    "0": "четвъртък",
    "1": "петък",
    "2": "събота",
    "3": "неделя"
};

const monthDaysNames = [
    "първи",
    "втори",
    "трети",
    "четвърти",
    "пети",
    "шести",
    "седми",
    "осми",
    "девети",
    "десети",
    "единадесети",
    "дванадесети",
    "тринадесети",
    "четиринадесети"
];

const monthNames = [
    "януари",
    "февруари",
    "март",
    "април",
    "май",
    "юни", "юли",
    "август",
    "септември",
    "октомври",
    "ноември",
    "декември"
];

// DATA PARS AND SORCE
let sortedData = data;

sortedData = (function trasnformAndSortData() {
    let dataInf = sortedData;

    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    dataInf = Object.keys(dataInf)
        .map((e) => [e, dataInf[e]])
        .map(x => {
            x[0] = new Date(x[0].replace(pattern, '$3-$2-$1'));
            return x;
        });

    dataInf.sort(function (a, b) {
        return a[0] - b[0];
    });
    return dataInf;
})();

// END DATA PARS AND SORCE

// ADDING TEMPERATURE DIFFERENCES IN sortedData

sortedData = (function dayTempDifference() {
    let valueDiffrence;

    for (let i = 0; i < sortedData.length; i += 1) {
        if (i === 0) {
            sortedData[0].push(sortedData[0][1]);
        } else {
            valueDiffrence = (sortedData[i][1] - sortedData[i - 1][1]).toFixed(1);
            sortedData[i].push(valueDiffrence);
        }
    }
    return sortedData;
})();


// WEEKLY TEMPERATURE DIFFERENCES FOR HTML

function weeklyTempreture(weekOfMonth) {
    let weekEnd = weekOfMonth * 7,
        weekTemp = 0;

    for (let i = weekEnd - 7; i < weekEnd; i += 1) {
        weekTemp += sortedData[i][1];
    }
    return (weekTemp / 7).toFixed(1);
}

//  DATA FOR THE MAIN.HTML

let dataPars = (function monthDayTextPrint() {

    let data = sortedData,
        weekDayBg,
        monthDayBg,
        monthNameBg,
        finalData = [];

    for (let i = 0; i < data.length; i += 1) {

        weekDayBg = data[i][0].getDay();
        weekDayBg = weekDays[weekDayBg];

        monthDayBg = data[i][0].getDate() - 1;
        monthDayBg = monthDaysNames[monthDayBg];

        monthNameBg = data[i][0].getMonth();
        monthNameBg = monthNames[monthNameBg];

        if (data.length - 1 === i) {
            finalData.push((`${weekDayBg}, ${monthDayBg} ${monthNameBg}: ${data[i][2]}`));
        } else {
            finalData.push((`${weekDayBg}, ${monthDayBg} ${monthNameBg}: ${data[i][2]},`));
        }
    }
    return finalData;
})();

// WEEKLY TEMPRETURE DIFFRENCE ADDING TO HTML

let paramValue = document.getElementsByTagName("span");
paramValue[0].innerHTML = weeklyTempreture(1);
paramValue[1].innerHTML = weeklyTempreture(2);


// LIST ADDING TO HTML

let ulElement = document.getElementsByTagName("ul")[0];
let listTemperature = document.createDocumentFragment();
let liElement = document.createElement("li");

Array.from(dataPars, (val) => {
    let elem = liElement.cloneNode(true);
    elem.innerHTML = val;
    listTemperature.appendChild(elem);

});

ulElement.appendChild(listTemperature);
