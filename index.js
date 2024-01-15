
const BillValidator = require('./libs/billValidator');

// if you need start localserver do it - npm i express
const express = require('express');
const app = express() // Экземпляр сервера
const PORT = 4000 // port backend
let started = false // isStart
let cashResult = 0 // Start money
let debug = true // or false for off debug

app.listen(PORT, ()=>{
	console.log("Server work!!!");
})

app.get('/getUpdate', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(`${cashResult}`)
})

app.get('/', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(`Started!`)
	cashResult = 0
	started = true
	AcceptBills()
})

app.get('/kill', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(`Finish!`)
	AcceptStop()
	// Чтобы завершить процесс с последующим перезапуском  
	// npm i pm2 
	// pm2 start index.js --watch
	// process.exit()
})

const device = new BillValidator({
	//Скорость передачи 9600 или 19200
	baudRate: 9600,
	// Название порта
	path: 'COM1',
});

// Функция запуска
function AcceptBills(){
	device.connect()
	priemCash = setInterval(() => device.start(), 999)
}

// Функция остановки
function AcceptStop(){
	clearInterval(priemCash)
	device.close()
	setTimeout(() =>device.disconnect(), 0);
	started = false
}

/* Device handle disable event */
device.on('disabled', ()=>{
	if(debug) console.log('Device disable');
});

/* Get device status functions*/
device.on('error', (error) => {
	if(debug) console.log('Device error:', error);
	AcceptStop()
	AcceptBills()
	// process.exit()
});

device.on('status', (sts) => {
	if(debug) console.log('Status:', sts, `cash = ${cashResult}`);
	if(sts == 80 || sts == 11 || sts == 43) device.stack()
});

/* Get device real-time information */
device.on('powerup', function () {
	if(debug) console.log('Device power up');
});

device.on('powerdown', () => {
	if(debug) console.log('Device power down');
});

device.on('reset', function () {
	if(debug) console.log('Device reset');
});

device.on('initialize', () => {
	if(debug) console.log('Device initialize');
});

device.on('idling', () => {
	if(debug) console.log('Device on idling state');
});

device.on('cassetteRemoved', () => {
	if(debug) console.log('Cassette removed');
});

device.on('cassetteFull', () => {
	if(debug) console.log('Cassette full');
});

device.on('hold', () => {
	if(debug) console.log('Device on hold');
});

/* Handel device cash accept process */
device.on('escrow', (cash) => {
	if(debug & cash) console.log('Amount ESCROW:', cash.amount);
	
	try {
		let rubCash = cash.amount
		if(debug) console.log(`accepted: ${rubCash}` );
		if(rubCash == 1) rubCash = 10
		if(rubCash == 2) rubCash = 50
		if(rubCash === 5) rubCash = 100
		if(rubCash === 10) rubCash = 500
		if(rubCash === 20) rubCash = 1000
		if(rubCash === 50) rubCash = 5000

		cashResult = +cashResult + rubCash
		return

	} catch (error) {
		if(debug) console.log(error.message);
	}
});

device.on('returned', (cash) => {
	if(debug) console.log('Cash returned:', cash.amount);
});

device.on('stacked', (cash) => {
	if(debug) console.log('Cash stacked:', cash.amount);
});

device.on('reject', () => {
	if(debug) console.log('chash Rejected ');
});


