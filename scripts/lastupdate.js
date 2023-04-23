const lastupdate = document.querySelector("#lastupdate")

try {
	const date = {
    month: "2-digit",
		day: "2-digit",
		year: "numeric",
	};

  const time = {
    hourCycle: "h12"
  };
  
lastupdate.innerHTML = `Last Updated: <span>${new Date().toLocaleDateString("en-US", date)} ${new Date().toLocaleTimeString('it-US', time)}</span>`;}

catch (e) {
	console.log("Error with code");
}
