const url = 'https://raw.githubusercontent.com/Kasmodan1/wdd230/main/chamber/scripts/directory.json';

let displayMode = 'cards'; // Initial display mode is set to 'cards'
let data; // Define the data variable

async function getDirectoryData(url) {
  const response = await fetch(url);
  data = await response.json();
  
  if (displayMode === 'cards') {
    displayDirectoryAsCards(data.businesses);
  } else if (displayMode === 'list') {
    displayDirectoryAsList(data.businesses);
  }
}

getDirectoryData(url);
  
function toggleDisplayMode() {
  const toggleButton = document.getElementById('toggleButton');
  
  if (displayMode === 'cards') {
    displayMode = 'list';
    toggleButton.innerHTML = '<i class="fas fa-list"></i>'; // Change to list icon
    toggleButton.setAttribute('title', 'Switch to Cards');
    displayDirectoryAsList(data.businesses);
  } else if (displayMode === 'list') {
    displayMode = 'cards';
    toggleButton.innerHTML = '<i class="fas fa-th-large"></i>'; // Change to card icon
    toggleButton.setAttribute('title', 'Switch to List');
    displayDirectoryAsCards(data.businesses);
  }
}

const displayDirectoryAsCards = (businesses) => {
  const cardsContainer = document.querySelector('.cards');
  const listContainer = document.querySelector('.list');

  cardsContainer.style.display = 'grid'; // Show the cards container
  listContainer.style.display = 'none'; // Hide the list container
	listContainer.innerHTML = ''; // Clear the existing content
  
  businesses.forEach((business) => {
    let card = createCardElement(business);
    cardsContainer.appendChild(card);
  });
};

const displayDirectoryAsList = (businesses) => {
  const cardsContainer = document.querySelector('.cards');
  const listContainer = document.querySelector('.list');
  
  cardsContainer.style.display = 'none'; // Hide the cards container
  listContainer.style.display = 'block'; // Show the list container
  listContainer.innerHTML = ''; // Clear the existing content
  
  businesses.forEach((business) => {
    let listItem = createListItemElement(business);
    listContainer.appendChild(listItem);
  });
}

const createCardElement = (business) => {
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
  image.setAttribute('width', '300');
  image.setAttribute('height', '80');

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

  return card;
};

const createListItemElement = (business) => {
  let listItem = document.createElement('li');
  listItem.classList.add('directorylistitem', 'row');

  let name = document.createElement('span');
  name.classList.add('directorylistname', 'col');
  name.textContent = business.name;

  let address = document.createElement('span');
  address.classList.add('directorylistaddress', 'col');
  address.textContent = 'Address: ' + business.address;

  let phone = document.createElement('span');
  phone.classList.add('directorylistphone', 'col');
  phone.textContent = 'Phone: ' + business.phone;

  let website = document.createElement('a');
  website.classList.add('directorylistwebsite', 'col');
  website.setAttribute('href', business.website);
  website.setAttribute('target', '_blank');
  website.textContent = business.website.replace('https://', '');

  let membership = document.createElement('span');
  membership.classList.add('directorylistmembership', 'col');
  membership.textContent = business.membershiplevel ? 'Membership Level: ' + business.membershiplevel : '';

  listItem.appendChild(name);
  listItem.appendChild(address);
  listItem.appendChild(phone);
  listItem.appendChild(website);
  listItem.appendChild(membership);

  return listItem;
};
