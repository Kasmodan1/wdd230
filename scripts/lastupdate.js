const lastupdate = document.querySelector("#lastupdate");
const year = document.querySelector("#year");
const lastModified = new Date(document.lastModified);

try {
	const date = {
    month: "2-digit",
		day: "2-digit",
		year: "numeric",
	};

  const time = {
    hourCycle: "h12"
	};

	const currentYear = {
		year: "numeric"
	};
  
lastupdate.innerHTML = `Last Updated: <span>${lastModified.toLocaleDateString("en-US", date)} ${lastModified.toLocaleTimeString('en-US', time)}</span>`;

year.innerHTML = `<span>${lastModified.toLocaleDateString('en-US', currentYear)}</span>`;
}

catch (e) {
	console.log("Error with code");
}