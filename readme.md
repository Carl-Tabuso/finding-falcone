## Finding Falcone Exercise

### Installation

- Clone this repository `git clone https://github.com/Carl-Tabuso/finding-falcone.git`
- Navigate `cd finding-falcone`
- Run `npm install` to download some "few dependencies".

### Local Server

- Run `npm run start` to start local dev server
- Visit [localhost:3000/api](http://localhost:3000/api) 

> [!NOTE]
> - This uses local disk for storing token, planets, and vehicles in `.json`, since except for the token, the external api returns the same set of planets and vehicles.
> - Hitting the `external_api_url/find` and returning a successful response will unlink/delete the `token.json`. Every `Start Again` will make a post request to the external api for a new token.

> Built using Node.js and Express.js ...and spite :))))