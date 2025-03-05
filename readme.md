## Finding Falcone Exercise

### Installation

- Clone this repository `git clone https://github.com/Carl-Tabuso/finding-falcone.git`
- Navigate `cd finding-falcone`
- Run `npm install` to download some "few dependencies".

### Run Development Serer

- Run `npm run start` to start local dev server
- Visit [localhost:3000/api](http://localhost:3000/api)

### Basic Information

- This doesn't use a database, instead, the responses of external api are stored in `.json` files under `./data/` directory -- it'll be automatically made in first page load on the browser. This will save the token, planets, and vehicles.
- Clicking **Start Again** button after every post request to https://findfalcone.geektrust.com/find will delete the token and generate a new one upon redirection to home page.

#### Built using Node and Express
