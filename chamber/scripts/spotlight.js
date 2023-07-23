const url = 'https://raw.githubusercontent.com/Kasmodan1/wdd230/main/chamber/scripts/directory.json';

let displayMode = 'cards'; // Initial display mode is set to 'cards'
let data; // Define the data variable

async function getDirectoryData(url) {
  try {
    const response = await fetch(url);
    data = await response.json();

    // Display members in the spotlight section
    displaySpotlightMembers(data.businesses); // Make sure it's called here after data is fetched
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getDirectoryData(url);
  

function getRandomMemberByTier(businesses, tier) {
  const filteredMembers = businesses.filter((business) => business.membershiplevel >= tier);
  if (filteredMembers.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * filteredMembers.length);
  return filteredMembers[randomIndex];
}

function displaySpotlightMembers() {
  const spot1 = document.getElementById('spot1');
  const spot2 = document.getElementById('spot2');
  const spot3 = document.getElementById('spot3');

  const randomMemberFromPlatinumTier = getRandomMemberByTier(data.businesses, 4);
  const randomMemberFromDiamondTier = getRandomMemberByTier(data.businesses, 5);
  const randomMemberFromLegacyTier = getRandomMemberByTier(data.businesses, 6);

  spot1.innerHTML = createSpotlightCard(randomMemberFromPlatinumTier, 'Platinum');
  spot2.innerHTML = createSpotlightCard(randomMemberFromDiamondTier, 'Diamond');
  spot3.innerHTML = createSpotlightCard(randomMemberFromLegacyTier, 'Legacy');
}

function createSpotlightCard(member, tierName) {
  if (!member) {
    return '';
  }

  return`
    <section>
      <h1>${tierName} Spotlight</h1>
      <h2>${member.name}</h2>
      <img src="${member.image}" alt="Image of ${member.name}" loading="lazy" width="300" height="80">
      <p>Address: ${member.address}</p>
      <p>Phone: ${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a>
    </section>
  `;
}


function getRandomMembersByTier(businesses, tier) {
  const filteredMembers = businesses.filter((business) => business.membershiplevel >= tier);
  if (filteredMembers.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * filteredMembers.length);
  return filteredMembers[randomIndex];
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
