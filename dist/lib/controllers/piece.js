var mongoose = require('mongoose'),
    Piece = mongoose.model('Piece');

exports.pieces = function(req, res, next) {
  Piece.find(function (err, pieces) {
    if (err) next(err);
    return res.json(pieces);
  });
};

exports.getPiece = function(req, res, next) {
  Piece.find({_id: req.params.pieceId}, function (err, piece) {
    if (err) next(err);
    return res.json(piece);
  });
};

exports.postPiece = function(req, res, next) {
  var piece = new Piece(req.body);
  piece.save(function(err) {
    if (err) next(err);
    return res.json(piece);
  });
};

exports.deletePiece = function(req, res, next) {
  Piece.findByIdAndRemove(req.params.pieceId, function(err, piece) {
    if (err) next(err);
    res.json({});
  });
};
