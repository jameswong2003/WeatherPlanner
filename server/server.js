const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')

const app = express();

app.use(cors());
app.use(express.json());

// Connect to Online DataBase on Atlas
// Make sure to cover up password for security measures
mongoose.connect("mongodb+srv://jameswong:jwong123@cluster0.pjc6myt.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to DB")).
  catch(console.error);

const Calendar_day = require('./models/calendar_model');

/**
 * Finds all the available data within the calendar
 */
app.get('/calendar', async (req, res) => {
  const calendar = await Calendar_day.find();

  res.json(calendar);
});

/**
 * Create a new calendar_day data
 */
app.post('/calendar/new', (req, res) => {
  const calendar_day = new Calendar_day( {
    date: req.body.text
  });

  calendar_day.save()

  res.json(calendar_day)
});

/**
 * Delete existing calendar date by id
 */
app.delete('/calendar/delete/:id', async (req, res) => {
	const result = await Calendar_day.findByIdAndDelete(req.params.id);

	res.json({result});
});

// app.get("/message", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.listen(8000, () => {
//   console.log(`Server is running on port 8000.`);
// });

app.listen(3001, () => console.log("Server started on port 3001"));