import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const eventList = document.getElementById("event-list");
const addEventBtn = document.getElementById("add-event-btn");

// Function to load events from Firestore
async function loadEvents() {
    eventList.innerHTML = "";

    const user = auth.currentUser;
    if (!user) return;

    const eventsQuery = query(collection(db, "events"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(eventsQuery);

    querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `${eventData.name} - ${eventData.location} - ${eventData.time} 
            <button class="delete-btn" data-id="${doc.id}">Delete</button>`;
        eventList.appendChild(li);
    });

    // Delete event function
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const eventId = event.target.getAttribute("data-id");
            await deleteDoc(doc(db, "events", eventId));
            loadEvents();
        });
    });
}

// Event listener for adding new events
addEventBtn.addEventListener("click", async () => {
    const name = document.getElementById("event-name").value;
    const location = document.getElementById("event-location").value;
    const time = document.getElementById("event-time").value;

    if (!name || !location || !time) {
        alert("All fields are required!");
        return;
    }

    try {
        const user = auth.currentUser;
        if (!user) {
            alert("Please log in first.");
            return;
        }

        await addDoc(collection(db, "events"), { 
            name, 
            location, 
            time, 
            userId: user.uid // Storing user ID to filter events
        });

        alert("Event added successfully!");
        loadEvents();
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Ensure the user is logged in before loading events
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadEvents();
    } else {
        window.location.href = "index.html";
    }
});
