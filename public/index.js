/**
 * TODO:
 * 
 * - Get max_distance of each vehicles to filter only who can fly to the destination
 * - Blur the radio(s) that are unselectable vehicles
 * - Update the time taken to reach destination
 */

document.addEventListener('DOMContentLoaded', () => {
    const firstDestinationVehicles = document.getElementById('firstVehicle');
    const firstDestinationPlanets = document.getElementById('firstDestination');

    firstDestinationPlanets.addEventListener('change', (event) => {
        const eventPayload = event.target.value;
        console.log(eventPayload);
        showAvailableVehicles(eventPayload);
    });

    const showAvailableVehicles = (destinationDistance) => {
        // console.log(destinationDistance);
        firstDestinationVehicles.removeAttribute("hidden");
    }
});