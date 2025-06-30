const Location = require('../models/locationModel');



function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const locationController = {
  add: async (req, res) => {
    const { userId, latitude, longitude, name } = req.body;
    try {
        const newLocation = new Location({
            userId,
            latitude,
            longitude, 
            name
        });
        await newLocation.save();
      res.status(201).json({ message: 'Location added successfuly!',
        locationId:newLocation._id
       });
    } catch (error) {
        console.log(error)
      res.status(400).json({ error: error.toString() });
    }
  },


  getLocationByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const location = await Location.find({userId});
      if (!location) {
        return res.status(404).json({ error: 'Locations not found' });
      }
      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  getLocationById: async (req, res) => {
    const { locationId } = req.params;
    try {
      const location = await Location.findById(locationId);
      if (!location) {
        return res.status(404).json({ error: 'Locations not found' });
      }
      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  getUsersByLocation: async (req, res) => {
    const { latitude, longitude } = req.query; 
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Missing latitude or longitude in query' });
    }

    try {
      const locations = await Location.find(); 
      const nearbyUserIds = new Set();

      locations.forEach((loc) => {
        const dist = getDistanceFromLatLonInKm(
          parseFloat(latitude),
          parseFloat(longitude),
          loc.latitude,
          loc.longitude
        );

        if (dist <= 100) {
          nearbyUserIds.add(loc.userId);
        }
      });
      console.log(nearbyUserIds)

      res.status(200).json({ userIds: Array.from(nearbyUserIds) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    }
  }
};

module.exports = locationController;