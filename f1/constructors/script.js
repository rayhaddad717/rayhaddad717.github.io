const makeCarouselSlide = constructor => {
    const imagePath = `resources/${constructor.constructorId}.png`;
    const carouselSlide = document.createElement('div');
    carouselSlide.classList.add('carousel-item');
    carouselSlide.classList.add('w-50');

    const image = document.createElement('img');
    image.classList.add('d-block');
    image.classList.add('w-100');
    image.src = imagePath;

    const captionDiv = document.createElement('div');
    captionDiv.classList.add('carousel-caption');
    captionDiv.classList.add('d-none');
    captionDiv.classList.add('d-md-block');

    const { name: constructorName, nationality } = constructor;

    const constructorNameHeader = document.createElement('h5');
    constructorNameHeader.innerText = constructorName;
    constructorNameHeader.style.color = "black";

    const nationalityCaption = document.createElement('p');
    nationalityCaption.innerText = nationality;
    nationalityCaption.style.color = "black";

    captionDiv.appendChild(constructorNameHeader);
    captionDiv.appendChild(nationalityCaption);

    carouselSlide.appendChild(image);
    carouselSlide.appendChild(captionDiv);
    return carouselSlide;
}
const includePrevNextButton = () => {
    const prev = document.createElement('a');
    const next = document.createElement('a');
    const buttons = [prev, next];
    prev.classList.add('carousel-control-prev');
    next.classList.add('carousel-control-next');
    for (button of buttons) {
        button.setAttribute('href', '#carouselExampleControls');
        button.setAttribute('role', 'button');

    }
    prev.setAttribute('data-slide', 'prev');
    next.setAttribute('data-slide', 'next');

    const prevIcon = document.createElement('span');
    prevIcon.classList.add('carousel-control-prev-icon');
    prevIcon.setAttribute('aria-hidden', 'true');

    const prevText = document.createElement('span');
    prevText.classList.add('sr-only');
    prevText.innerText = "Previous";

    prev.appendChild(prevIcon);
    prev.appendChild(prevText);

    const nextIcon = document.createElement('span');
    nextIcon.classList.add('carousel-control-next-icon');
    nextIcon.setAttribute('aria-hidden', 'true');

    const nextText = document.createElement('span');
    nextText.classList.add('sr-only');
    nextText.innerText = "Next";

    next.appendChild(nextIcon);
    next.appendChild(nextText);
    document.querySelector('#carouselExampleControls').appendChild(prev);
    document.querySelector('#carouselExampleControls').appendChild(next);
}
const makeCarousel = (constructors) => {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    carousel.classList.add('slide');
    carousel.id = 'carouselExampleControls';

    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');
    for (constructor of constructors) {
        makeCarouselSlide(constructor);
        carouselInner.appendChild(makeCarouselSlide(constructor));
    }
    carousel.appendChild(carouselInner);
    carousel.setAttribute('data-ride', 'carousel');
    // document.body.appendChild(carousel);
    document.querySelector('.navbar').insertAdjacentElement('afterend', carousel);
    includePrevNextButton();
}
const getImages = async () => {
    const queryString = `http://ergast.com/api/f1/current/constructors.json`;
    const data = await axios.get(queryString);
    console.log(data);
    const constructors = data.data.MRData.ConstructorTable.Constructors;
    const year = data.data.MRData.ConstructorTable.season;
    makeCarousel(constructors);
    document.querySelector('.carousel-item').classList.add('active');
}
getImages();