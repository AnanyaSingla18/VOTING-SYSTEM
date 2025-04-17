const mongoose = require('mongoose');

// Define the Vote schema
const voteSchema = new mongoose.Schema({
    candidate: String,
    voter: String,
    timestamp: { type: Date, default: Date.now }
});

const Vote = mongoose.model('Vote', voteSchema);

// Controller methods
exports.getAllVotes = (req, res) => {
    Vote.find()
        .then(votes => res.json(votes))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getVoteById = (req, res) => {
    Vote.findById(req.params.id)
        .then(vote => res.json(vote))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.createVote = (req, res) => {
    const newVote = new Vote(req.body);
    newVote.save()
        .then(vote => res.json(vote))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateVote = (req, res) => {
    Vote.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(vote => res.json(vote))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteVote = (req, res) => {
    Vote.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Vote deleted' }))
        .catch(err => res.status(500).json({ error: err.message }));
};




exports.createVote = (req, res) => {
    console.log('Received Vote Data:', req.body); // Log request data
    const newVote = new Vote(req.body);
    newVote.save()
        .then(vote => res.json(vote))
        .catch(err => {
            console.error('Error:', err); // Log error if something goes wrong
            res.status(500).json({ error: err.message });
        });
};
