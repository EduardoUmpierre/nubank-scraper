# Nubank scraper
A web scraper created to get user data from Nubank's dashboard.

## Prerequisites
- [Python](https://www.python.org/downloads/)
- [PhantomJS](http://phantomjs.org/download.html)
- [CasperJS](http://docs.casperjs.org/en/latest/installation.html)
- [Node.js](https://nodejs.org/en/download/)

## Installation
- Clone this repository
- Run `npm install` to install the dependencies
- Run `npm start` to serve the application
- Open `http://localhost:3000/` at your browser

## API
| Field | Type | Description | Example |
| ----- | ---- | ----------- | ------- |
| limits | Object | List of all limits available at the dashboard | `"limits": { "future": { "text": "Próximas Faturas", "value": "R$1000,00" }, "open": { "text": "Fatura Atual", "value": "R$500,00" }, "available": { "text": "Limite Disponível", "value": "R$2000,00" }`} |
| name | String | User full name | `"name": "John Doe"` |
| lastTransactions | Array<Object> | List of last transactions | `"lastTransactions": [{ "amount": "R$ 15,90", "category": "transporte", "date": "3 OUT", "title": "99 Pop" }]`

## Todo
- Handle errors
