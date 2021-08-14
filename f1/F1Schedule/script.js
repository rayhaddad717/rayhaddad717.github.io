function getSchedule() {
    $.getJSON("https://ergast.com/api/f1/current.json", (data) => {
        console.log(data);
        const totalCicuits = data.MRData.total;
        const carouselItem = document.querySelectorAll('.carousel-item');
        const carouselItems = document.querySelector('#carouselItems');
        for (let i = 0; i < totalCicuits; i++) {
            const newTrack = document.createElement('div');
            newTrack.setAttribute('class', 'carousel-item');

            const caption = document.createElement('div');
            caption.setAttribute('class', 'carousel-caption d-none d-md-block');

            const title = document.createElement('h5');
            title.innerText = data.MRData.RaceTable.Races[i].Circuit.circuitId;

            const img = document.createElement('img');
            img.src = "../F1.svg.png";
            img.classList.add('d-block');
            img.classList.add('w-50');


            carouselItems.appendChild(newTrack);
            newTrack.appendChild(caption);
            caption.appendChild(title);
            newTrack.appendChild(img);
        }
        for (let i = 0; i < totalCicuits; i++) {
            const info = document.createElement('p');
            info.innerText = data.MRData.RaceTable.Races[i].Circuit.circuitId;
            carouselItem[i].appendChild(info);

        }

    });

};
getSchedule();