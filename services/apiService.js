import API_URL from '../utils/api.js';
import axios from 'axios';

/**
 * TODO: Handle edge-case where api may not return a proper response.
 * 
 * Although, it seems unnecessary in this case, hence why i'm
 * returning the promise w/ the data early, perhaps wrap this in 
 * a try-catch and return false.
 */
export const getApiToken = async () => {
    return (await axios.post(API_URL.TOKEN, {}, {
        headers: {
            "Accept": "application/json",
        }
    })).data;
}

export const getVehicles = async () => {
    return (await axios.get(API_URL.VEHICLES)).data;
}

export const getPlanets = async () => {
    return (await axios.get(API_URL.PLANETS)).data;
}

export const findFalcone = async (apiRequestBody) => {
    return (await axios.post(API_URL.FIND, apiRequestBody, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })).data;
}

export * as apiService from './apiService.js';