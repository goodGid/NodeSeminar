
const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');

const test = schedule.scheduleJob('0 * * * * *', function(){
  console.log("test scheduler!");
});
