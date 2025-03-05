import { readFile, unlink } from 'node:fs/promises';
import __dirname, { joinPath, makeDirectory, fetchFile } from '../utils/path.js';
import { apiService } from '../services/apiService.js';

export const index = async (req, res) => {
    const dataPath = joinPath('data');
    makeDirectory(dataPath);

    const [vehicles, planets, tokens] = await Promise.all([
        fetchFile('data/vehicles.json', apiService.getVehicles),
        fetchFile('data/planets.json', apiService.getPlanets),
        fetchFile('data/token.json', apiService.getApiToken)
    ]);

    res.status(200);
    res.render('home', {
        vehicles: JSON.parse(vehicles),
        planets: JSON.parse(planets),
    });
}

export const find = async (req, res) => {
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
    await (unlink(tokenPath));
    res.status(200);
    res.render('result', { 
        apiResponse: apiResponse, 
        timeTaken: payload['time-taken'] 
    });
}

export * as controller from './controller.js';