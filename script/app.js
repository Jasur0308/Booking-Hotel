const $hotelForm = document.getElementById("hotelForm");
const $inputs = $hotelForm.querySelectorAll(".formInput");
const $resultForm = document.getElementById("resultForm");

let ALL_RESIDENTS = JSON.parse(localStorage.getItem("Residents")) || [];

function Resident(name, surname, phone, email, room, arrivalDate, departureDate) {
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.room = room;
    this.arrivalDate = arrivalDate;
    this.departureDate = departureDate;
}

const renderResidents = (residents) => {
    while($resultForm.firstChild) {
        $resultForm.removeChild($resultForm.firstChild);
    }

    if(residents.length === 0) {
        $resultForm.innerHTML = 'No residents found';
    } else {
        residents.forEach((resident, index) => {
            const $residentItemDiv = document.createElement("div");
            $residentItemDiv.className = "flex w-full text-black gap-[10px] justify-between text-left my-[10px] border-b-[3px]";
            $residentItemDiv.innerHTML = `
                <p><strong>Name </strong><br>${resident.name}</p>
                <p><strong>Surname    </strong><br>${resident.surname}</p>
                <p><strong>Phone Number    </strong><br>${resident.phone}</p>
                <p><strong>Email   </strong><br>${resident.email}</p>
                <p><strong>Room    </strong><br>${resident.room}</p>
                <p><strong>Arrival Date    </strong><br>${resident.arrivalDate}</p>
                <p><strong>Departure Date  </strong><br>${resident.departureDate}</p>
                <button data-index="${index}" class="edit bg-yellow-500 px-[20px] h-[40px] text-[18px] rounded-lg text-white">Edit</button>
                <button data-index="${index}" class="delete bg-red-500 px-[20px] h-[40px] text-[18px] rounded-lg text-white">Delete</button>
            `;
            $resultForm.appendChild($residentItemDiv);
        });
    }
}

const addResident = (e) => {
    e.preventDefault();
    
    const values = Array.from($inputs).map(input => input.value.trim());

    if(values.every(value => value)) {
        let resident = new Resident(...values);
        ALL_RESIDENTS.push(resident);
        localStorage.setItem("Residents", JSON.stringify(ALL_RESIDENTS));
        renderResidents(ALL_RESIDENTS);
        $inputs.forEach(input => input.value = "");
    } else {
        alert("Please, fill in all the fields!");
    }
}

renderResidents(ALL_RESIDENTS);

const handleAction = (e) => {
    if(e.target.classList.contains("delete")){
        const id = +e.target.getAttribute("data-index");
        ALL_RESIDENTS = ALL_RESIDENTS.filter((item, index) => index !== id);
        localStorage.setItem("Residents", JSON.stringify(ALL_RESIDENTS));
    } else if(e.target.classList.contains("edit")) {
        const id = +e.target.getAttribute("data-index");
        let foundResident = ALL_RESIDENTS[id];
        const newValues = prompt("Enter new Resident details (name, surname, phone, email, room, arrivalDate, departureDate):").split(",");
        if (newValues.length === 7) {
            foundResident.name = newValues[0].trim();
            foundResident.surname = newValues[1].trim();
            foundResident.phone = newValues[2].trim();
            foundResident.email = newValues[3].trim();
            foundResident.room = newValues[4].trim();
            foundResident.arrivalDate = newValues[5].trim();
            foundResident.departureDate = newValues[6].trim();
            ALL_RESIDENTS[id] = foundResident;
            localStorage.setItem("Residents", JSON.stringify(ALL_RESIDENTS));
        } else {
            alert("Please enter all details correctly!");
        }
    }

    ALL_RESIDENTS = JSON.parse(localStorage.getItem("Residents"));

    renderResidents(ALL_RESIDENTS);
}

$hotelForm.addEventListener("submit", addResident);
$resultForm.addEventListener("click", handleAction);
