function setAction(form) {

    hideIntroWelcome();
    var searchByYear = document.getElementById("byYear");
    var searchByGP = document.getElementById("byGP");
    var searchByDriver = document.getElementById("byDriver");

    if (searchByDriver.checked) {
        getDriverInfo();
        return false;
    }
    removeByDriverTable();
    var year = document.getElementById("input").value;

    $.getJSON("https://ergast.com/api/f1/" + year + "/driverStandings.json", function (data) {
        console.log(data);
        var arrayLength = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.length;
        console.log(arrayLength);
        var driversFN = [];
        var driversLN = [];
        var driversInitials = [];
        var driversDOB = [];
        var wins = [];
        var driverNum = [];
        var driverNationality = [];
        var driverPoints = [];
        var driverPosition = [];
        for (let i = 0; i < arrayLength; i++) {
            driversFN[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName;

            driversLN[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName;

            driversDOB[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.dateOfBirth;

            driversInitials[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.code;

            driverNum[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.permanentNumber;

            driverNationality[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality;

            driverPoints[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;

            driverPosition[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].position;

            wins[i] = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].wins;
            var className = ".driverName" + i;
            // $(className).text(driverPosition[i] + " " + driversFN[i] + driversLN[i] + " wins= " + wins[i] + " " + driverNationality[i] + " " + driversInitials[i] + " " + driversDOB[i] + " " + driverNum[i] + " " + driverPoints[i]);

            $(className + " .driverPosition").text(driverPosition[i]);
            $(className + " .driverFirstName").text(driversFN[i]);
            $(className + " .driverFamilyName").text(driversLN[i]);
            $(className + " .driverDOB").text(driversDOB[i]);
            $(className + " .driverABRV").text(driversInitials[i]);
            $(className + " .driverNumber").text(driverNum[i]);
            $(className + " .driverNationality").text(driverNationality[i]);
            $(className + " .driverPoints").text(driverPoints[i]);
            $(className + " .driverWins").text(wins[i]);
            var driverTable = document.getElementById("driverTable");
            driverTable.style.display = "table";
        }
    });
    return false;
}

function getDriverInfo() {
    removeByYearTable();
    var input = document.getElementById("input").value;
    var inputArray = input.split(",");
    console.log(inputArray[0] + "000000000000000000000000000000" + inputArray[1]);
    var driverInput = inputArray[0];
    var yearInput = inputArray[1];
    console.log("entered fun");
    $.getJSON("https://ergast.com/api/f1/" + yearInput + "/drivers/" + driverInput + "/results" + ".json", function (data) {
        console.log(data);
        displayByDriverTable();
        var totalRaces = data.MRData.RaceTable.Races.length;

        console.log(totalRaces);
        for (let i = 0; i < totalRaces; i++) {
            var raceName = data.MRData.RaceTable.Races[i].raceName;
            var round = data.MRData.RaceTable.Races[i].round;
            var driverPosition = data.MRData.RaceTable.Races[i].Results[0].position;
            var driverGrid = data.MRData.RaceTable.Races[i].Results[0].grid;
            var driverPoints = data.MRData.RaceTable.Races[i].Results[0].points;
            var driverStatus = data.MRData.RaceTable.Races[i].Results[0].status;
            var driverLaps = data.MRData.RaceTable.Races[i].Results[0].laps;
            var constructor = data.MRData.RaceTable.Races[i].Results[0].Constructor.name;
            if (driverPosition == 1 || driverStatus != "Finished") {
                var time = " ";
            }
            else {
                var time = data.MRData.RaceTable.Races[i].Results[0].Time.time;
            }

            var className = ".race" + i;
            $(className + " .raceName").text(raceName);
            $(className + " .Position").text(driverPosition);
            $(className + " .Round").text(round);
            $(className + " .Constructor").text(constructor);
            $(className + " .Laps").text(driverLaps);
            $(className + " .Grid").text(driverGrid);
            $(className + " .Time").text(time);
            $(className + " .Status").text(driverStatus);
            $(className + " .Points").text(driverPoints);
        }

    });


    $.getJSON("https://ergast.com/api/f1/drivers/" + driverInput + ".json", function (data) {
        console.log(data);
        var driverNumber = data.MRData.DriverTable.Drivers[0].permanentNumber;
        var driverDOB = data.MRData.DriverTable.Drivers[0].dateOfBirth;

        var driverFN = data.MRData.DriverTable.Drivers[0].givenName;

        var driverLN = data.MRData.DriverTable.Drivers[0].familyName;
        var driverCode = data.MRData.DriverTable.Drivers[0].code;
        var driverNationality = data.MRData.DriverTable.Drivers[0].nationality;

        $(".driverName0 .driverNumber").text(driverNumber);
        $(".driverName0 .driverDOB").text(driverDOB);
        $(".driverName0 .driverFirstName").text(driverFN);
        $(".driverName0 .driverFamilyName").text(driverLN);
        $(".driverName0 .driverABRV").text(driverCode);
        $(".driverName0 .driverNationality").text(driverNationality);
        displayByDriverTable();



    });
    return;
}

function displayByYearTable() {

    var driverTable = document.getElementById("driverTable");
    driverTable.style.display = "table";
    return;
}

function removeByYearTable() {

    var driverTable = document.getElementById("driverTable");
    driverTable.style.display = "none";
    return;
}

function displayByDriverTable() {

    var driverTable = document.getElementById("driverTableDriver");

    var driverResultsTable = document.getElementById("driverTableDriverResults");
    driverTable.style.display = "table";
    driverResultsTable.style.display = "table";
    return;
}

function removeByDriverTable() {

    var driverTable = document.getElementById("driverTableDriver");

    var driverResultsTable = document.getElementById("driverTableDriverResults");
    driverTable.style.display = "none";
    driverResultsTable.style.display = "none";
    return;
}

function hideIntroWelcome() {
    var introWelcome = document.getElementById("introWelcome");
    introWelcome.style.display = "none";
}
function changeSearchType() {
    var radioByYear = document.getElementById("byYear");
    var radioByGP = document.getElementById("byGP");
    var radioByDriver = document.getElementById("byDriver");
    var searchInput = document.getElementById("input");
    var searchButton = document.getElementById("searchButton");
    if (radioByYear.checked) {
        searchInput.setAttribute("placeholder", "ex: 2021");
    }
    else if (radioByGP.checked) {
        searchInput.setAttribute("placeholder", "Soon");
        searchButton.setAttribute("disabled", "");
    }
    else if (radioByDriver.checked) {
        searchInput.setAttribute("placeholder", "ex: vettel,2021");
    }
}