const url = 'https://raw.githubusercontent.com/Kasmodan1/wdd230/main/chamber/scripts/directory.json';

async function getDirectoryData(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayDirectory(data.businesses);
}

getDirectoryData(url);

const displayDirectory = (businesses) => {
  const cards = document.querySelector('div.cards');

  businesses.forEach((business) => {
    let card = document.createElement('section');
    card.classList.add('directorysection');

    let h2 = document.createElement('h2');
    h2.classList.add('directoryh2');
    h2.textContent = business.name;

    let image = document.createElement('img');
    image.classList.add('directoryimg');
    image.setAttribute('src', business.image);
    image.setAttribute('alt', 'Image of ' + business.name);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '340');
    image.setAttribute('height', '440');

    let address = document.createElement('p');
    address.classList.add('directoryp');
    address.textContent = 'Address: ' + business.address;

    let phone = document.createElement('p');
    phone.classList.add('directoryp');
    phone.textContent = 'Phone: ' + business.phone;

    let website = document.createElement('a');
    website.classList.add('directoryp');
    website.setAttribute('href', business.website);
    website.setAttribute('target', '_blank');
    website.textContent = business.website.replace('https://', '');

    card.appendChild(h2);
    card.appendChild(image);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    cards.appendChild(card);
  });
};

