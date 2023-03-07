import Room from "../models/room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/errors.js";

export const createRoom = async (req, res, next) => {
  const hotelID = req.params.hotelid; //ici notre id hotel
  const newRoom = new Room(req.body);

  try {
    const saveRoom = await newRoom.save(); //pour save notre room

    try {
      await Hotel.findByIdAndUpdate(hotelID, {
        $push: { rooms: saveRoom._id },
      }); // ajouter savedRoom id a linterieure de lhotel et des chambre
      //{$push:} cela nous permet de pousser nimporte quel  element dans nimporte quel tableau
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveRoom); //nous allons envoyer notre status
  } catch (err) {
    next(err);
  }
};

//updateHolel
export const updateRoom = async (req, res, next) => {
  try {
    console.log("first", req.params.id);
    // après avoir trouver notre hotel nous allons mettez-le a jour avec la methode mongoDb set et passer ce que nous allons  changer $set req.body
    console.log("hedrtfgvbiniojioh", req.body);
    const updateRoom = await Hotel.findByIdAndUpdate(
      req.params.id, // to take id
      {
        $set: req.body, // show what you updated
      },
      { new: true } // après la mise a jour il reviendra a nouveau  version de notre document
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

//deleteRoom
export const deleteRoom = async (req, res, next) => {
  const hotelID = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    try {
      await Hotel.findByIdAndUpdate(hotelID, {
        $pull: { rooms: req.params.id },
      }); // ajouter savedRoom id a linterieure de lhotel et des chambre
      //{$push:} cela nous permet de pousser nimporte quel  element dans nimporte quel tableau
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(err);
  }
};

//getRoom
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    res.status(200).json(room);
  } catch (error) {
    next(err);
  }
};

//getRooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find(); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
