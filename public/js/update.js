const updateTimeTaken = (vehicleSpeed, destinationDistance) => destinationDistance / vehicleSpeed;

const updatePlanetsDropdown = (planets) => {
    let selectedPlanets = new Set();
    planets.forEach(select => {
        if (select.value){
            selectedPlanets.add(select.value.split("-")[0]);
        }
    });
    planets.forEach(select => {
        select.querySelectorAll("option").forEach(option => {
            if (option.value) {
                const planetName = option.value.split("-")[0];
                option.disabled = selectedPlanets.has(planetName) && select.value !== option.value;                    
            }
        })
    });
}

const selectedVehiclesCount = {};
const updateVehiclesCount = (vehicles) => {
    Object.keys(selectedVehiclesCount).forEach(vehicle => selectedVehiclesCount[vehicle] = 0);

    vehicles.forEach(radio => {
        if (radio.checked) {
            const [vehicleName, , , totalNo] = radio.value.split("-");
            selectedVehiclesCount[vehicleName] = (selectedVehiclesCount[vehicleName] || 0) + 1;
        }
    });

    vehicles.forEach(radio => {
        const [vehicleName, , , totalNo] = radio.value.split("-");
        radio.disabled = selectedVehiclesCount[vehicleName] >= parseInt(totalNo) && ! radio.checked;
    });
}

export { updateTimeTaken, updatePlanetsDropdown, updateVehiclesCount };