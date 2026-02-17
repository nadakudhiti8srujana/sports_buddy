window.onload = function(){
  loadEvents();
  loadJoined();
}

function logout(){
  window.location.href = "login.html";
}

function addEvent(){
  const sport = document.getElementById("sportName").value;
  const city = document.getElementById("city").value;
  const time = document.getElementById("time").value;

  if(!sport || !city || !time){
    alert("Fill all fields");
    return;
  }

  let events = JSON.parse(localStorage.getItem("events")) || [];

  events.push({sport, city, time});

  localStorage.setItem("events", JSON.stringify(events));

  loadEvents();
}

function loadEvents(){
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const container = document.getElementById("eventsList");
  container.innerHTML="";

  events.forEach((e,i)=>{
    const card = document.createElement("div");
    card.className="card";

    card.innerHTML = `
      <h4>${e.sport}</h4>
      <p>${e.city}</p>
      <p>${e.time}</p>
      <button onclick="joinEvent(${i})">Join</button>
    `;

    container.appendChild(card);
  });
}

function joinEvent(index){
  let events = JSON.parse(localStorage.getItem("events")) || [];
  let joined = JSON.parse(localStorage.getItem("joined")) || [];

  joined.push(events[index]);

  localStorage.setItem("joined", JSON.stringify(joined));

  loadJoined();
}

function loadJoined(){
  const joined = JSON.parse(localStorage.getItem("joined")) || [];
  const container = document.getElementById("joinedList");
  container.innerHTML="";

  joined.forEach(e=>{
    const card=document.createElement("div");
    card.className="card";

    card.innerHTML = `
      <h4>${e.sport}</h4>
      <p>${e.city}</p>
      <p>${e.time}</p>
      <span style="color:green;">Joined</span>
    `;

    container.appendChild(card);
  });
}
