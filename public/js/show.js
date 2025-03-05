import { splitDashedString } from "./helper.js";

const showAvailableVehicles = (destinationDistance, key, options) => {
    const vehicleKey = options[key];
    const vehicles = vehicleKey.vehicles;
    const container = vehicleKey.vehiclesContainer;

    vehicles.forEach((radio) => {
        radio.removeAttribute("disabled", false);
        radio.checked = false;

        const maxDistance = parseInt(splitDashedString(radio.value)[1]);
        if (maxDistance < destinationDistance) {
            radio.setAttribute("disabled", true);
        }
        container.removeAttribute("hidden");
    });
}

export { showAvailableVehicles };