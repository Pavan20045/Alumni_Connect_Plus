const express = require('express');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 4000;
const upload1 = multer({ storage: multer.memoryStorage() });

// Firebase Admin SDK
const serviceAccount = require('D:/NEW WEB/web/catastrophe/src/alumniportal-9e858-firebase-adminsdk-fbsvc-ad60f28e4c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alumniportal-9e858-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create user route
app.post('/alumni/create_user', upload.single('profilePhoto'), async (req, res) => {
  try {
    const {
      name, username, password, dob, gender,
      areaOfExpertise, professionalBackground,
      LinkedinUrl, college, passoutYear
    } = req.body;

    const profilePhoto = req.file;

    if (
      !name || !username || !password || !dob || !gender ||
      !areaOfExpertise || !professionalBackground || !LinkedinUrl ||
      !college || !passoutYear || !profilePhoto
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const profilePhotoBase64 = profilePhoto.buffer.toString('base64');

    const userId = uuidv4();

    const userData = {
      name,
      username,
      password,
      dob,
      gender,
      areaOfExpertise,
      professionalBackground,
      LinkedinUrl,
      college,
      passoutYear: parseInt(passoutYear),
      profilePhotoBase64: `data:${profilePhoto.mimetype};base64,${profilePhotoBase64}`,
      createdAt: new Date().toISOString()
    };

    await db.ref('alumniUsers/' + userId).set(userData);

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Error saving user to Realtime Database" });
  }
});

// Login route
app.post('/alumni/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const ref = db.ref('alumniUsers');
    ref.once('value', snapshot => {
      const users = snapshot.val();
      const matchedUser = Object.values(users || {}).find(user =>
        user.username === username && user.password === password
      );

      if (matchedUser) {
        res.status(200).json({ message: 'Login success' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// GET user details
app.get('/alumni/details', async (req, res) => {
  const { username } = req.query;
  try {
    const snapshot = await db.ref('alumniUsers').orderByChild('username').equalTo(username).once('value');
    const data = snapshot.val();
    if (!data) return res.status(404).json({ error: 'User not found' });
    const userObj = Object.values(data)[0];
    const userId = Object.keys(data)[0];
    res.json({ ...userObj, userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching details' });
  }
});

// POST update user details
app.post('/alumni/update', async (req, res) => {
  const { userId, ...updatedData } = req.body;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  try {
    await db.ref(`alumniUsers/${userId}`).update(updatedData);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});



//Announcements
app.post('/alumni/post-event', upload1.single('image'), async (req, res) => {
  const { username, text, expiryDate } = req.body;
  const image = req.file;

  try {
    const ref = db.ref('alumniPosts').push();
    await ref.set({
      username,
      text,
      timestamp: Date.now(),
      expiryDate: expiryDate ? parseInt(expiryDate) : null, // ✅ Save expiryDate as timestamp
      image: image ? image.buffer.toString('base64') : null,
      imageType: image ? image.mimetype : null,
    });

    res.json({ message: 'Event posted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post event' });
  }
});


app.get('/alumni/events', async (req, res) => {
  try {
    const snapshot = await db.ref('alumniPosts').once('value');
    const data = snapshot.val() || {};
    const events = [];

    for (const [eventId, event] of Object.entries(data)) {
      if (!event.expiryDate || Date.now() < event.expiryDate) {
        events.push({ id: eventId, ...event });
      }
    }

    // Sort events by timestamp in descending order
    events.sort((a, b) => b.timestamp - a.timestamp);

    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to load events' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});