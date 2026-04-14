 //const apiUrl= "https://roosmaxj-rahti-projekt-roosmaxj-projekt-webbkommunikation.2.rahtiapp.fi/api/ip";
const API = "http://localhost:8080";

// Load rooms into <select>
async function loadRooms() {
    const res = await fetch(`${API}/rooms`);
    const rooms = await res.json();

    const select = document.getElementById("roomSelect");
    select.innerHTML = "";

    rooms.forEach(room => {
        const opt = document.createElement("option");
        opt.value = room.id;
        opt.textContent = `${room.room_number} (${room.room_type})`;
        select.appendChild(opt);
    });
}

// Load all bookings
async function loadBookings() {
    const res = await fetch(`${API}/bookings`);
    const bookings = await res.json();

    const list = document.getElementById("bookingList");
    list.innerHTML = "";

    bookings.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `Room ${b.room_id}: ${b.datefrom} → ${b.dateto}`;
        list.appendChild(li);
    });
}

// Save booking
async function saveBooking() {
    const room_id = document.getElementById("roomSelect").value;
    const datefrom = document.getElementById("dateFrom").value;
    const dateto = document.getElementById("dateTo").value;
    const addinfo = document.getElementById("addInfo").value;

    const booking = {
        guest_id: 1,   // Hardcoded for now
        room_id,
        datefrom,
        dateto
    };

    const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    const data = await res.json();
    alert("Booking saved!");

    loadBookings();
}

document.getElementById("saveBtn").addEventListener("click", saveBooking);

// Load everything on page load
loadRooms();
loadBookings();