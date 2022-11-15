const express = require ('express');

const router = express.Router();
const hallBookingModule = require('../modules/hallBookingModules');

router.post("/createRoom",hallBookingModule.createRoom );
router.post("/createRoomBooking",hallBookingModule.createRoomBooking);
router.get("/listRooms",hallBookingModule.listRooms);
router.get("/listCustomers", hallBookingModule.listCustomers);

module.exports = router;
