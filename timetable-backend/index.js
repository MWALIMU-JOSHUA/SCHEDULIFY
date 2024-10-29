const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Timetable = require('./models/Timetable'); // Ensure this file exists
const fs = require('fs'); // Required for reading file from disk
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/timetableDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

// Configure Multer to store files in the 'uploads/' folder
const upload = multer({ dest: 'uploads/' }); // 'dest' specifies directory for storage

// Middleware to parse JSON
app.use(express.json());

// Function to parse PDF text into structured timetable data
function parseTimetableData(text) {
    const lines = text.split('\n');
    const entries = [];

    lines.forEach(line => {
        const [courseCode, courseName, examDate, examTime, venue, instructor, seatingRow] = line.split(',');

        entries.push({
            courseCode: courseCode.trim(),
            courseName: courseName.trim(),
            examDate: new Date(examDate.trim()),
            examTime: examTime.trim(),
            venue: venue.trim(),
            instructor: instructor.trim(),
            seatingRow: seatingRow.trim(),
        });
    });

    return entries;
}

// Route for file upload and PDF processing
app.post('/upload', upload.single('timetable'), async (req, res) => {
    try {
        // Read the uploaded file from disk
        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath); // Read file into buffer

        // Parse the PDF using pdf-parse
        const pdfData = await pdfParse(fileBuffer);
        const text = pdfData.text;

        // (Optional) Process timetable data
        const timetableEntries = parseTimetableData(text);
        await Timetable.insertMany(timetableEntries); // Save entries to MongoDB

        res.status(200).json({ message: "PDF uploaded and processed successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to process the PDF." });
    } finally {
        // Clean up: remove file from disk to avoid clutter
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
    }
});

// Existing imports and configurations

// Route for uploading and parsing the PDF (already implemented)
app.post('/upload', upload.single('timetable'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(fileBuffer);
        const text = pdfData.text;

        const timetableEntries = parseTimetableData(text);
        await Timetable.insertMany(timetableEntries);

        res.status(200).json({ message: "PDF uploaded and processed successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to process the PDF." });
    } finally {
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
    }
});

// Route for searching timetable data by course code or course name
app.get('/timetable', async (req, res) => {
    const { courseCode, courseName } = req.query;

    try {
        // Build query object based on provided search parameters
        const query = {};
        if (courseCode) query.courseCode = courseCode;
        if (courseName) query.courseName = courseName;

        // Query the Timetable model for matching entries
        const results = await Timetable.find(query);

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve timetable data." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
