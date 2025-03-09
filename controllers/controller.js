import { readFile, unlink } from 'node:fs/promises';
import __dirname, { joinPath, makeDirectory, fetchFile } from '../utils/path.js';
import { apiService } from '../services/apiService.js';

export const index = async (req, res, next, err = null) => {
    const dataPath = joinPath('data');
    makeDirectory(dataPath);

    const [vehicles, planets] = await Promise.all([
        fetchFile('data/vehicles.json', apiService.getVehicles),
        fetchFile('data/planets.json', apiService.getPlanets),
        fetchFile('data/token.json', apiService.getApiToken)
    ]);

    res.status(200).render('home', {
        vehicles: JSON.parse(vehicles),
        planets: JSON.parse(planets),
        error: err,
    });
}

export const find = async (req, res, next) => {
    const tokenPath = joinPath('data/token.json');
    const payload = req.body;
    const tokenContents = await readFile(tokenPath, 'utf-8');
    let apiRequestBody = {
        "token": Object.values(JSON.parse(tokenContents))[0],
        "planet_names": [],
        "vehicle_names": [],
    };

    Object.keys(payload).forEach((key, index) => {
        if (key.startsWith("planet")) {
            const vehicleKey = key.replace("planet", "vehicle");
            const [planet, vehicle] = [payload[key]?.split("-"), payload[vehicleKey]?.split("-")];
            const [planetName, vehicleName] = [planet?.[0], vehicle?.[0]];

            apiRequestBody["planet_names"].push(planetName);
            apiRequestBody["vehicle_names"].push(vehicleName);
        }
    });
    const apiResponse = await apiService.findFalcone(apiRequestBody);
    if (apiResponse.hasOwnProperty("error")) {
        return index(req, res, next, apiResponse.error);
    }

    await (unlink(tokenPath));
    res.status(201).render('result', { 
        apiResponse: apiResponse, 
        timeTaken: payload['time-taken'] 
    });
}

export * as controller from './controller.js';