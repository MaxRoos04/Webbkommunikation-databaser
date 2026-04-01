 //const apiUrl= "https://roosmaxj-rahti-projekt-roosmaxj-projekt-webbkommunikation.2.rahtiapp.fi/api/ip";
        const apiUrl= "http://127.0.0.1:8080"; 
        async function getRooms() {
            const res = await fetch(`${apiUrl}/rooms`);
            const rooms = await res.json(); 

            console.log(rooms)

              for (room of rooms) {
                     document.getElementById("room-list").innerHTML += `
                     <li>${room.room_number} - ${room.room_type} - ${room.price} </li>
                     `; 
              }
        }
        getRooms()