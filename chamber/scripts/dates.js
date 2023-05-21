const datefield = document.querySelector("#datefield");
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);
datefield.textContent = fulldate;