import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    const activity=result.activity;
    const type = result.type;
    const participants = result.participants;

    res.render("index.ejs", { activity:activity,type:type, participants:participants, error: null  });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria. https://bored-api.appbrewery.com/filter?type=charity&participants=1"
  console.log(req.body);
  const itype=req.body.type;
  const iparticipants=req.body.participants;
  let n=Math.floor(Math.random() * 17);
  try {
  const response = await axios.get("https://bored-api.appbrewery.com/filter?type="+itype+"&participants="+iparticipants);
  const result = response.data;
  const fresult=result[n];
  const activity=fresult.activity;
  const type = fresult.type;
  const participants = fresult.participants;

    res.render("index.ejs", { activity:activity,type:type, participants:participants,error: null  });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
