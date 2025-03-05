import { updateTimeTaken, updatePlanetsDropdown } from "./update.js";
import { showAvailableVehicles } from "./show.js";
import { splitDashedString } from "./helper.js";

document.addEventListener('DOMContentLoaded', () => {
    const timeTakenContainer = document.getElementById('timeTaken');
    const planets = document.querySelectorAll("select[name^='planet-']");
    let hiddenInput = document.getElementById("hiddenTimeTaken");
    let timeTaken = 0;

    const options = {
        first: {
            destinations: document.getElementById('planet1'),
            vehicles: document.querySelectorAll("#vehicle1 input[type='radio']"),
            vehiclesContainer: document.getElementById('vehicle1'),
        },
        second: {
            destinations: document.getElementById('planet2'),
            vehicles: document.querySelectorAll("#vehicle2 input[type='radio']"),
            vehiclesContainer: document.getElementById('vehicle2'),
        },
        third: {
            destinations: document.getElementById('planet3'),
            vehicles: document.querySelectorAll("#vehicle3 input[type='radio']"),
            vehiclesContainer: document.getElementById('vehicle3'),
        },
        fourth: {
            destinations: document.getElementById('planet4'),
            vehicles: document.querySelectorAll("#vehicle4 input[type='radio']"),
            vehiclesContainer: document.getElementById('vehicle4'),
        }
    }

    planets.forEach(select => select.addEventListener("change", () => updatePlanetsDropdown(planets)));

    Object.entries(options).forEach(([key, data]) => {
        const destinations = data.destinations;
        if (destinations instanceof HTMLElement) {
            destinations.addEventListener("change", (event) => {
                const pair = splitDashedString(event.target.value);
                const destinationDistance = parseInt(pair[1]);
                showAvailableVehicles(destinationDistance, key, options);
            });
        }

        data.vehicles.forEach((radio) => {
            radio.addEventListener("click", (event) => {
                if (event.target.type === "radio") {
                    let [_, __, vehicleSpeed] = splitDashedString(event.target.value);
                    vehicleSpeed = parseInt(vehicleSpeed);
                    let vehicleDestinations = splitDashedString(data.destinations.value)[1];
                    vehicleDestinations = parseInt(vehicleDestinations);
                    const increase = updateTimeTaken(vehicleSpeed, vehicleDestinations);
                    timeTaken += increase;
                    timeTakenContainer.innerHTML = `Time Taken: ${timeTaken}`;
                    hiddenInput.value = timeTaken;
                }
            });
        });
    });
});