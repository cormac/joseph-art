var mongoose = require('mongoose'),
    Piece = mongoose.model('Piece'),
    Charge = mongoose.model('Charge'),
    stripe = require('stripe')(process.env.STRIPE_SECRET);

var chargeUser = function(token, description, done) {
  stripe.charges.create({
    amount: parseInt(process.env.PIECE_PRICE, 10),
    currency: 'EUR',
    card: token,
    description: description
  },
  function(err, response) {
    if (err) done(err); 
    else done(null, response);
  });

};

var saveCharge = function() {};



exports.charge = function(req, res, next) {
  var chargeDetails = req.body;
  chargeUser(chargeDetails.token.id, chargeDetails.description, function(err, response) {
    if (err) return res.status(412).send(err);
    Piece.findOne({ _id: req.body.id }, function(err, piece) {
      if (err) return res.status(500).send(err);
      piece.sold = true;
      piece.save(function(err) {
        if(err) return res.status(500).send(err);
        res.json(piece);
      });

    });
  });
};

