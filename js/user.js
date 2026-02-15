import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, onValue } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Add Event
window.addEvent = function() {
    const name = document.getElementById("sportName").value;
    const city = document.getElementById("city").value;
    const time = document.getElementById("time").value;

    if(name === "" || city === "" || time === "") {
        alert("Please fill all fields");
        return;
    }

    const eventsRef = ref(database, "events");
    push(eventsRef, {
        name: name,
        city: city,
        time: time
    });

    alert("Event Added Successfully");
}

// Load Events
const eventsRef = ref(database, "events");

onValue(eventsRef, (snapshot) => {
    const data = snapshot.val();
    const list = document.getElementById("eventsList");
    list.innerHTML = "";

    for(let id in data) {
        list.innerHTML += `
            <div class="card">
                <h4>${data[id].name}</h4>
                <p>City: ${data[id].city}</p>
                <p>Time: ${data[id].time}</p>
            </div>
        `;
    }
});

// Logout
window.logout = function() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
}
