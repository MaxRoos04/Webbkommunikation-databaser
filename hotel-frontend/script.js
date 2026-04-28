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

        const typeText = room.type ? ` (${room.type})` : "";
        opt.value = room.id;
        opt.textContent = `${room.room_number}${typeText}`;

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
        li.textContent = `${b.firstname} ${b.lastname} booked room ${b.room_number} 
${b.datefrom} → ${b.dateto} (${b.nights} nights, ${b.total_price}€)`;
        list.appendChild(li);
    });
}

// Save booking
async function saveBooking() {
    const room_id = document.getElementById("roomSelect").value;
    const datefrom = document.getElementById("dateFrom").value;
    const dateto = document.getElementById("dateTo").value;

    const guestSelect = document.getElementById("guestSelect");
    const guest_id = guestSelect ? guestSelect.value : 1;

    const booking = {
        guest_id,
        room_id,
        datefrom,
        dateto
    };

    await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    alert("Booking saved!");
    loadBookings();
}

// Load guests
async function loadGuests() {
    const select = document.getElementById("guestSelect");
    if (!select) return; // If no dropdown exists, skip

    const res = await fetch(`${API}/guests`);
    const guests = await res.json();

    select.innerHTML = "";

    guests.forEach(g => {
        const opt = document.createElement("option");
        opt.value = g.id;
        opt.textContent = `${g.firstname} ${g.lastname} (${g.visits} visits)`;
        select.appendChild(opt);
    });
}

document.getElementById("saveBtn").addEventListener("click", saveBooking);

//Raport

async function getMonthlyReport() {
    const res = await fetch(`${API}/report/monthly`);
    const report = await res.json();

    document.getElementById("report-list").innerHTML = "";

    for (row of report) {
        document.getElementById("report-list").innerHTML += `
            <li>
                <strong>${row.month.substring(0, 7)}</strong><br>
                Omsättning: ${row.revenue} €<br>
                Nätter: ${row.total_nights}<br>
                Bokningar: ${row.total_bookings}<br>
                Mest populära rum: ${row.most_popular_room}
            </li>
        `;
    }
}


// Load everything on page load
loadRooms();
loadBookings();
loadGuests();
getMonthlyReport();