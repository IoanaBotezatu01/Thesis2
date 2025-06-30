const Alert = require('../models/alertModel');
const Location= require('../models/locationModel')
const PestThreat = require('../models/pestThreatModel');
const Plantation = require('../models/plantationModel');

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

const alertController = {
  add: async (req, res) => {
    const { userId,threat, latitude, longitude, temperature,humidity,precipitation,wind,condition } = req.body;
    try {
        const newAlert = new Alert({
            userId,
            threat,
            latitude,
            longitude,
            temperature,
            humidity,
            precipitation,
            wind,
            condition
        });
        await newAlert.save();
        
      res.status(201).json({ message: 'Alert added successfuly!',
        alertId:newAlert._id
       });

        const approxLocations = await Location.find({
        latitude: { $gte: latitude - 1, $lte: latitude + 1 },
        longitude: { $gte: longitude - 1, $lte: longitude + 1 }
      });

      const nearbyLocations = approxLocations.filter(loc => {
        const dist = getDistanceFromLatLonInKm(latitude, longitude, loc.latitude, loc.longitude);
        return dist <= 30;
      });

      const nearbyUserIds = [...new Set(nearbyLocations.map(loc => loc.userId))];
      console.log('Nearby:',nearbyUserIds)

      const pestThreats = await PestThreat.find({ pest: threat });
      const affectedPlantationNames = pestThreats.map(p => p.plantation);
      if (affectedPlantationNames.length === 0) return;

      const userIdsToNotify = [];

      for (const loc of nearbyLocations) {
        const locationId = loc._id;
        const plantations = await Plantation.find({ locationId });

        const isThreatened = plantations.some(p =>
          affectedPlantationNames.includes(p.name)
        );

        if (isThreatened) {
          userIdsToNotify.push(loc.userId.toString());
        }
      }
      console.log('Threathened:',userIdsToNotify)

      const finalUserIdsToNotify = nearbyUserIds.filter(userId =>
  userIdsToNotify.includes(userId)
);
console.log(finalUserIdsToNotify)


        const io = req.app.get('io');
        const userSockets = req.app.get('userSockets');
        finalUserIdsToNotify.forEach(userId => {
        const socketIds = userSockets.get(userId);
        if (socketIds) {
          socketIds.forEach(socketId => {
            io.to(socketId).emit('new-alert', newAlert);
          });
        }

      });

    } catch (error) {
        console.log(error)
      res.status(400).json({ error: error.toString() });
    }
  },
  getAllAlerts:async(req,res)=>{
    try {
        const alerts = await Alert.find().sort({ created_at: -1 });
        res.status(200).json(alerts);
      } catch (error) {
        res.status(500).json({ error: error.toString() });
      }
  },

  getAlertById: async (req, res) => {
    const { alertId } = req.params;
    try {
      const alert = await Alert.findById(alertId);
      if (!alert) {
        return res.status(404).json({ error: 'Alerts not found' });
      }
      res.status(200).json(alert);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  getAlertsWithPlantationStatus: async (req, res) => {
    const {userId}=req.params
    try {
      
      const alerts = await Alert.find();

      
      const locations = await Location.find({userId});

      const plantations = await Plantation.find({userId});

      const pestThreats = await PestThreat.find();

      const RADIUS = 30; 

      const alertsWithStatus = await Promise.all(alerts.map(async alert => {
        let affectsPlantations = false;

        
        const affectedPlantationNames = pestThreats
          .filter(p => p.pest === alert.threat)
          .map(p => p.plantation);

        if (affectedPlantationNames.length === 0) {
          return {
            ...alert.toObject(),
            affectsPlantations: false,
          };
        }

        
        for (const location of locations) {
          const dist = getDistanceFromLatLonInKm(alert.latitude, alert.longitude, location.latitude, location.longitude);

          if (dist <= RADIUS) {
            
            const plantationsInLocation = plantations.filter(p => p.locationId.toString() === location._id.toString()
);

            
            const isThreatened = plantationsInLocation.some(p =>
              affectedPlantationNames.includes(p.name)
            );

            if (isThreatened) {
              affectsPlantations = true;
              break;
            }
          }
        }

        return {
          ...alert.toObject(),
          affectsPlantations,
        };
      }));

      res.status(200).json(alertsWithStatus);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = alertController;