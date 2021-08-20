const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const clearTableFromBody = () => {
    const driverTable = document.querySelector('#driverTable');
    if (driverTable) { driverTable.remove(); return; }
    const driverRaceResultsAll = document.querySelectorAll('.driverRaceResultsContainer');
    if (driverRaceResultsAll.length > 0) {
        for (container of driverRaceResultsAll) {
            container.remove();
        }
        return;
    }
}
const createDriverTable = () => {
    const containerFluid = document.createElement('div');
    containerFluid.classList.add('container-fluid');
    containerFluid.id = 'driverTableContainer';

    const driverTable = document.createElement('table');
    driverTable.id = 'driverTable';
    driverTable.classList.add('driverTable');

    const tHead = document.createElement('thead');
    tHead.classList.add('row');

    const trOfTHead = document.createElement('tr');
    trOfTHead.classList.add('row');

    const colnames = ['Position', 'First Name', 'Family Name', 'Wins', 'Nationality', 'ABRV', 'Date of Birth', 'Driver Number', 'Points'];

    for (let name of colnames) {
        const th = document.createElement('th');
        th.classList.add('col');
        th.innerText = name;
        trOfTHead.appendChild(th);
    }
    tHead.appendChild(trOfTHead);
    driverTable.appendChild(tHead);
    containerFluid.appendChild(driverTable);
    document.body.appendChild(containerFluid);
}

const createInfoHeaders = () => {
    try {
        const tRow = document.createElement('tr');
        tRow.classList.add('row');
        const colnames = ['Position', 'Round', 'Constructor', 'Laps', 'Grid', 'Time', 'Status', 'Points '];
        for (col of colnames) {
            const colTitle = document.createElement('th');
            colTitle.classList.add('col');
            colTitle.innerText = col;
            tRow.appendChild(colTitle);
        }
        return tRow;
    } catch (e) { alert(e); }

}
//Start Code to Fill Results by Year
const fillDriverRow = (driverRow, driver) => {
    const { position, Driver, wins, points } = driver;
    const { givenName, familyName, nationality, code, dateOfBirth, permanentNumber } = Driver;
    const data = [position, givenName, familyName, wins, nationality, code, dateOfBirth, permanentNumber, points];
    for (value of data) {
        const cell = document.createElement('td');
        cell.classList.add('col');
        cell.innerText = value;
        driverRow.appendChild(cell);
    }

}
const fillDrivers = (drivers) => {
    const tBody = document.createElement('tbody');
    tBody.classList.add('row');
    tBody.id = 'tbody'
    for (let driver of drivers) {
        const driverRow = document.createElement('tr');
        driverRow.classList.add('row');
        fillDriverRow(driverRow, driver);
        tBody.appendChild(driverRow);
    }
    document.querySelector('#driverTable').appendChild(tBody);
}

const searchByYear = async (searchQuery) => {
    clearTableFromBody();
    try {
        alert('entered');
        const q = `https://ergast.com/api/f1/${parseInt(searchQuery)}/driverStandings.json`;
        const standings = await axios.get(q);
        createDriverTable();
        const drivers = standings.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        fillDrivers(drivers);
    } catch (e) {
        console.log('ERROR', e);
    }
}


//Start Code to Fill Driver Results by Driver Name And Year

//Function to Fill each Row
const fillRaceRow = (raceTable, race) => {
    try {
        const { Results, round } = race;
        const { grid, laps, points, position, status, Constructor } = Results[0];
        const { name: constructorName } = Constructor;
        let Time = 'N/A';
        if (status === 'Finished' && position !== 1) {
            Time = Results[0].Time.time;
        }
        const columns = [position, round, constructorName, laps, grid, Time, status, points];

        const tBody = document.createElement('tbody');
        // tBody.classList.add('');

        const resultsRow = document.createElement('tr');
        resultsRow.classList.add('row');
        //Write the values of the columns from the race object into the table
        for (col of columns) {
            const colInfo = document.createElement('td');
            colInfo.classList.add('col');
            colInfo.innerText = col;
            resultsRow.appendChild(colInfo);
        }
        tBody.appendChild(resultsRow);
        raceTable.appendChild(tBody);
    } catch (e) { alert(e); }


}

const createDriverRaceResultTable = (race) => {
    //Create my table container
    // const tableContainerFluid = document.createElement('div');
    // tableContainerFluid.classList.add('container-fluid');
    // tableContainerFluid.classList.add('driverRaceResultsContainer');

    //Create my race table
    const raceTable = document.createElement('table');
    raceTable.classList.add('raceTable');
    raceTable.classList.add('driverRaceResultsContainer');

    //Create my table Header
    //Create my Race Name Header
    const tHead = document.createElement('thead');
    tHead.classList.add('row');

    const trOfCircuitNameTHead = document.createElement('tr');
    trOfCircuitNameTHead.classList.add('row');
    const circuitNameTD = document.createElement('th');
    circuitNameTD.classList.add('raceName');
    circuitNameTD.classList.add('col');
    circuitNameTD.innerText = race.Circuit.circuitName;

    trOfCircuitNameTHead.appendChild(circuitNameTD);
    tHead.appendChild(trOfCircuitNameTHead);

    //Create my Columns
    const colnames = ['Position', 'Round', 'Constructor', 'Laps', 'Grid', 'Time', 'Status', 'Points '];

    const colNamesTR = document.createElement('tr');
    colNamesTR.classList.add('row');
    for (let name of colnames) {
        const th = document.createElement('th');
        th.classList.add('col');
        th.innerText = name;
        colNamesTR.appendChild(th);
    }

    //Append my creates elements to the page
    tHead.appendChild(colNamesTR);
    raceTable.appendChild(tHead);
    document.body.appendChild(raceTable);

    //Fill the driver Race Results In MY table
    fillRaceRow(raceTable, race);
}
const createDriverInfoTable = info => {

    const driverInfoTable = document.createElement('table');
    driverInfoTable.classList.add('raceTable');
    driverInfoTable.classList.add('container-fluid');
    driverInfoTable.classList.add('driverRaceResultsContainer');

    const tHead = document.createElement('thead');
    // tHead.classList.add('row');

    const trOfHead = document.createElement('tr');
    trOfHead.classList.add('row');
    const colNames = ['First Name', 'Last Name', 'Nationality', 'ABRV', 'Date of Birth', 'Driver Number'];

    for (col of colNames) {
        const th = document.createElement('th');
        th.innerText = col;
        th.classList.add('col');
        trOfHead.appendChild(th);
    }
    const tBody = document.createElement('tbody');
    const driverInfoRow = document.createElement('tr');
    driverInfoRow.classList.add('row');


    for (INFO of info) {
        const td = document.createElement('td');
        td.innerText = INFO;
        td.classList.add('col');
        driverInfoRow.appendChild(td);
    }
    tHead.appendChild(trOfHead);
    tBody.appendChild(driverInfoRow);
    driverInfoTable.appendChild(tHead);
    driverInfoTable.appendChild(tBody);
    document.body.appendChild(driverInfoTable);

}

const addDriverInfo = async (driver) => {
    try {
        const queryString = `http://ergast.com/api/f1/drivers/${driver}.json`;
        const driverInfo = await axios.get(queryString);
        const { givenName: FN, familyName: LN, dateOfBirth: dob, nationality, code: ABRV, permanentNumber: nb } = driverInfo.data.MRData.DriverTable.Drivers[0];
        const info = [FN, LN, dob, nationality, ABRV, nb];
        createDriverInfoTable(info);
    } catch (e) { console.log(`ERROR line 216 ${e}`); }
}

const searchByDriverAndYear = async (searchQuery) => {
    clearTableFromBody();
    let [driver, year] = searchQuery.split(',');
    if (year[0] === ' ') { year = year.slice(1); }
    addDriverInfo(driver);
    try {
        const queryString = `https://ergast.com/api/f1/${parseInt(year)}/drivers/${driver}/results.json`;
        const results = await axios.get(queryString);
        console.log(results);
        const races = results.data.MRData.RaceTable.Races;
        for (let race of races) {
            createDriverRaceResultTable(race);
        }
    } catch (e) { console.log(`ERROR ${e}`); }
}
const search = (searchQuery, searchType) => {
    switch (searchType) {
        case 'byGP': console.log("by gp"); break;
        case 'byYear': searchByYear(searchQuery); break;
        case 'byDriverAndYear': searchByDriverAndYear(searchQuery); break;
        default: alert('invalid selection');


    }
}
searchForm.addEventListener('submit', (e) => {
    const searchQuery = searchInput.value;
    let searchType;
    try { searchType = document.querySelector('input[name="searchType"]:checked').id; }
    catch {
        alert('Please enter a valid search type.');
    }

    search(searchQuery, searchType);
    e.preventDefault();
});