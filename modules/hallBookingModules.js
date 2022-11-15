const { ObjectID } = require("bson");
const mongo = require ('../connect')



   

// Room Creation 
module.exports.createRoom = async(req,res) =>{
   try{
    const insertedResponse = await mongo.selectedDB.collection("rooms").insertOne(req.body);
    res.send(insertedResponse);
   }catch(err){
    console.error(err);
    res.status(500).send(err);
   }
};

//==================================================================================================================


// Room Booking
module.exports.createRoomBooking = async (req,res,next) =>{
   const alreadyExists = (await mongo.selectedDB.collection("room_booking").find(
    {
        $and : [
            {'room_id' : req.body.room_id},
            {'booked_date' : req.body.booked_date},
            {'start_time' : req.body.start_time},
            {'end_time' : req.body.end_time},
        ]
    }
   ). count() > 0);
   if(alreadyExists){
    res.send([{'msg' : "customer already booked on the date"}]);
   }else{
    try{
        const insertedResponse = await mongo.selectedDB.collection("room_booking").insertOne(req.body);
        res.send(insertedResponse);
       }catch(err){
        console.error(err);
        res.status(500).send(err);
       }

   }
};

//==================================================================================================================
module.exports.listRooms = async (req,res,next) => {
    try{
        const listBookedRooms = await mongo.selectedDB.collection("rooms").aggregate ([
            { $lookup : {
                from : 'room_booking',
                localField : 'id',
                foreignField : 'room_id',
                as :'rooms_booked_date'
            }}
        ]).toArray();
        res.send(listBookedRooms);

    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}

//==================================================================================================================

module.exports.listCustomers =async (req,res,next) =>{
    try{
        const listBookedCustomers = await mongo.selectedDB.collection("room_booking").aggregate ([
            { $lookup : {
                from : 'rooms',
                localField : 'room_id',
                foreignField : 'id',
                as :'already booked'
            }}
        ]).toArray();
        res.send(listBookedCustomers);

    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
};