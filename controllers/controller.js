import { readFile, writeFile } from 'node:fs/promises';
import __dirname from '../utils/basePath.js';
import { apiService } from '../services/apiService.js';
import { existsSync, mkdirSync } from 'node:fs';

export const index = async (req, res) => {
    const dataPath = `${__dirname}/data`;
    if (! existsSync(dataPath)) {
        mkdirSync(dataPath);
    }

    let vehicles;
    let planets;
    let token;

    if (! existsSync(`${dataPath}/vehicles.json`)) {
        const data = await apiService.getVehicles();
        await writeFile(`${dataPath}/vehicles.json`, JSON.stringify(data, null, 2));
    }
    const vehicleContents = await readFile(`${dataPath}/vehicles.json`, 'utf-8');
    vehicles = JSON.parse(vehicleContents);

    if (! existsSync(`${dataPath}/planets.json`)) {
        const data = await apiService.getPlanets();
        await writeFile(`${dataPath}/planets.json`, JSON.stringify(data, null ,2));
    }
    const planetContents = await readFile(`${dataPath}/planets.json`, 'utf-8');
    planets = JSON.parse(planetContents);

    if (! existsSync(`${dataPath}/token.json`)) {
        const data = await apiService.getApiToken();
        await writeFile(`${dataPath}/token.json`, JSON.stringify(data, null, 2));
    }
    const tokenContents = await readFile(`${dataPath}/token.json`, 'utf-8');
    token = JSON.parse(tokenContents);

    res.render('home', {
        vehicles: vehicles,
        planets: planets,
    });
}

export const find = (req, res) => {
    //
}

export * as controller from './controller.js';