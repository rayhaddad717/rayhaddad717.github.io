function setAction(form) {
    var year = document.getElementById("yearInput").value;

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
            $(className).text(driverPosition[i] + " " + driversFN[i] + driversLN[i] + " wins= " + wins[i] + " " + driverNationality[i] + " " + driversInitials[i] + " " + driversDOB[i] + " " + driverNum[i] + " " + driverPoints[i]);
        }
    });
    return false;
}
