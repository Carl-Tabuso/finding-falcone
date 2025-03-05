import API_URL from '../utils/api.js';

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

export const findFalcone = async (apiRequestBody) => {
    return (await fetch(API_URL.FIND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
    }))
    .json();
}

export * as apiService from './apiService.js';