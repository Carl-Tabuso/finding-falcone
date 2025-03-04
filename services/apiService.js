import API_URL from '../utils/demoApi.js';

export const getApiToken = async () => {
    return (await fetch(API_URL.TOKEN, {
        method: "POST",
        headers: {
            "Accept": "application/json",
        }
    }))
    .json();
}

export const getVehicles = async () => {
    return (await fetch(API_URL.VEHICLES)).json();
}

export const getPlanets = async () => {
    return (await fetch(API_URL.PLANETS)).json();
}

export const find = (req, res) => {
    //
}

export * as apiService from './apiService.js';