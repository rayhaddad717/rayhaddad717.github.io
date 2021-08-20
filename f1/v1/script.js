
function setAction(form) {

    hideIntroWelcome();
    const searchByYear = document.getElementById("byYear");
    const searchByGP = document.getElementById("byGP");
    const searchByDriver = document.getElementById("byDriver");

    if (searchByDriver.checked) {
        getDriverInfo();
        return false;
    }
    removeByDriverTable();
    const year = document.getElementById("input").value;

    $.getJSON("https://ergast.com/api/f1/" + year + "/driverStandings.json", (data) => {
        console.log(data);
        let arrayLength = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.length;
        console.log(arrayLength);
        let driversFN = [];
        let driversLN = [];
        let driversInitials = [];
        let driversDOB = [];
        let wins = [];
        let driverNum = [];
        let driverNationality = [];
        let driverPoints = [];
        let driverPosition = [];
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
            let className = ".driverName" + i;
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
            let driverTable = document.getElementById("driverTable");
            driverTable.style.display = "table";
        }
    });
    return false;
}

function getDriverInfo() {
    removeByYearTable();
    let input = document.getElementById("input").value;
    let inputArray = input.split(",");
    console.log(inputArray[0] + "000000000000000000000000000000" + inputArray[1]);
    let driverInput = inputArray[0];
    let yearInput = inputArray[1];
    console.log("entered fun");
    $.getJSON("https://ergast.com/api/f1/" + yearInput + "/drivers/" + driverInput + "/results" + ".json", function (data) {
        console.log(data);
        displayByDriverTable();
        let totalRaces = data.MRData.RaceTable.Races.length;

        console.log(totalRaces);
        for (let i = 0; i < totalRaces; i++) {
            let raceName = data.MRData.RaceTable.Races[i].raceName;
            let round = data.MRData.RaceTable.Races[i].round;
            let driverPosition = data.MRData.RaceTable.Races[i].Results[0].position;
            let driverGrid = data.MRData.RaceTable.Races[i].Results[0].grid;
            let driverPoints = data.MRData.RaceTable.Races[i].Results[0].points;
            let driverStatus = data.MRData.RaceTable.Races[i].Results[0].status;
            let driverLaps = data.MRData.RaceTable.Races[i].Results[0].laps;
            let constructor = data.MRData.RaceTable.Races[i].Results[0].Constructor.name;
            if (driverPosition == 1 || driverStatus != "Finished") {
                let time = " ";
            }
            else {
                let time = data.MRData.RaceTable.Races[i].Results[0].Time.time;
            }

            let className = ".race" + i;
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
        let driverNumber = data.MRData.DriverTable.Drivers[0].permanentNumber;
        let driverDOB = data.MRData.DriverTable.Drivers[0].dateOfBirth;

        let driverFN = data.MRData.DriverTable.Drivers[0].givenName;

        let driverLN = data.MRData.DriverTable.Drivers[0].familyName;
        let driverCode = data.MRData.DriverTable.Drivers[0].code;
        let driverNationality = data.MRData.DriverTable.Drivers[0].nationality;

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

    let driverTable = document.getElementById("driverTable");
    driverTable.style.display = "table";
    return;
}

function removeByYearTable() {

    let driverTable = document.getElementById("driverTable");
    driverTable.style.display = "none";
    return;
}

function displayByDriverTable() {

    let driverTable = document.getElementById("driverTableDriver");

    let driverResultsTable = document.getElementById("driverTableDriverResults");
    driverTable.style.display = "table";
    driverResultsTable.style.display = "table";
    return;
}

function removeByDriverTable() {

    let driverTable = document.getElementById("driverTableDriver");

    let driverResultsTable = document.getElementById("driverTableDriverResults");
    driverTable.style.display = "none";
    driverResultsTable.style.display = "none";
    return;
}

function hideIntroWelcome() {
    const introWelcome = document.getElementById("introWelcome");
    introWelcome.style.display = "none";
}
function changeSearchType() {
    let radioByYear = document.getElementById("byYear");
    let radioByGP = document.getElementById("byGP");
    let radioByDriver = document.getElementById("byDriver");
    let searchInput = document.getElementById("input");
    let searchButton = document.getElementById("searchButton");
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