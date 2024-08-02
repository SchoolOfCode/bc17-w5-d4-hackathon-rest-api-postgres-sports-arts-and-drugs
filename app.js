// Import the required modules
import express from "express";
import dotenv from "dotenv"; //we imported this one
import morgan from "morgan"; //we imported this one (milestone 4)

// Load environment variables
dotenv.config();

// // Debugging logs to check environment variables (we were getting an "undefined port")
// console.log("Environment Variables Loaded:");
// console.log("DB_CONNECTION_STRING:", process.env.DB_CONNECTION_STRING);
// console.log("PORT:", process.env.PORT);

// Import helper functions for artists
import {
  getArtists,
  getArtistById,
  createArtist,
  updateArtistById,
  deleteArtistById,
} from "./artists.js";

// Import helper functions for sports
import {
  getSports,
  getSportById,
  createSport,
  updateSportById,
  deleteSportById,
} from "./sports.js";

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests
app.use(morgan("dev")) // milestone 4

// Artists Route Handlers

// Endpoint to retrieve all artists
app.get("/artists", async function (req, res) {
    try {
      const artists = await getArtists();
      res.status(200).json({ status: "success", data: artists });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
});

// Endpoint to retrieve an artist by id
app.get("/artists/:id", async function (req, res) {
  try {
    const artist = await getArtistById(req.params.id);
    if (artist) {
      res.status(200).json({ status: "success", data: artist });
    } else {
      res.status(404).json({ status: "fail", message: "Artist not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to create a new artist
app.post("/artists/", async function (req, res) {
  try {
    const newArtist = await createArtist(req.body);
    res.status(201).json({ status: "success", data: newArtist });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to update a specific artist by id
app.patch("/artists/:id", async function (req, res) {
  try {
    const updatedArtist = await updateArtistById(req.params.id, req.body);
    if (updatedArtist) {
      res.status(200).json({ status: "success", data: updatedArtist });
    } else {
      res.status(404).json({ status: "fail", message: "Artist not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Endpoint to delete a specific artist by id
app.delete("/artists/:id", async function (req, res) {
  try {
    const deletedArtist = await deleteArtistById(req.params.id);
    if (deletedArtist) {
      res.status(200).json({ status: "success", data: deletedArtist });
    } else {
      res.status(404).json({ status: "fail", message: "Artist not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Sports Route Handlers

// Endpoint to retrieve all sports
app.get("/sports", async function (req, res) {
  try {
    const sports = await getSports();
    res.status(200).json({ status: "success", data: sports });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
  
// Endpoint to retrieve a sport by id
app.get("/sports/:id", async function (req, res) {
  try {
    const sport = await getSportById(req.params.id);
    if (sport) {
      res.status(200).json({ status: "success", data: sport });
    } else {
      res.status(404).json({ status: "fail", message: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
  
// Endpoint to create a new sport
app.post("/sports/", async function (req, res) {
  try {
    const newSport = await createSport(req.body);
    res.status(201).json({ status: "success", data: newSport });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
  
// Endpoint to update a specific sport by id
app.patch("/sports/:id", async function (req, res) {
  try {
    const updatedSport = await updateSportById(req.params.id, req.body);
    if (updatedSport) {
      res.status(200).json({ status: "success", data: updatedSport });
    } else {
      res.status(404).json({ status: "fail", message: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
  
// Endpoint to delete a specific sport by id
app.delete("/sports/:id", async function (req, res) {
  try {
    const deletedSport = await deleteSportById(req.params.id);
    if (deletedSport) {
      res.status(200).json({ status: "success", data: deletedSport });
    } else {
      res.status(404).json({ status: "fail", message: "Sport not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});