'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Piece Schema
 */
var ChargeSchema = new Schema({
  title: String,
  cost: String,
  emailAddress: Number,
});

mongoose.model('Charge', ChargeSchema);
