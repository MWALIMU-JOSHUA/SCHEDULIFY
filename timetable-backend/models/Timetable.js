// models/Timetable.js
const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    examDate: { type: Date, required: true },
    examTime: { type: String, required: true },
    venue: { type: String, required: true },
    instructor: { type: String, required: true },
    seatingRow: { type: String, required: true },
});

module.exports = mongoose.model('Timetable', TimetableSchema);
