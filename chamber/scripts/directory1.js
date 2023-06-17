const url = 'https://github.com/Kasmodan1/wdd230/blob/main/chamber/scripts/directory.json';

async function getDirectoryData(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayDirectory(data.businesses);
}

getDirectoryData(src);

const displayDirectory = (businesses) => {
    const cards = document.querySelector('div.cards');
  
    businesses.forEach((business) => {
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let image = document.createElement('img');
        let address = document.createElement('p');
        let phone = document.createElement('p');

        h2.textContent = business.name;

        image.setAttribute('src', business.image);
        image.setAttribute('alt', `Image of ${business.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');

        address.textContent = `Address: ${business.address}`;
        phone.textContent = `Phone: ${business.phone}`;

        card.appendChild(h2);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);

        cards.appendChild(card);
    });
};
