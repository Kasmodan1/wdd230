const lastupdate = document.querySelector("#lastupdate");
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
  
lastupdate.innerHTML = `Last Updated: <span>${lastModified.toLocaleDateString("en-US", date)} ${lastModified.toLocaleTimeString('en-US', time)}</span>`;}

catch (e) {
	console.log("Error with code");
}