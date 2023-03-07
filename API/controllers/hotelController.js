import Hotel from "../models/Hotel.js";

//createHolel
export const createHolel = async (req, res, next) => {
  // faire ici async parce que  nous somme  va se connecter a notre base de données
  const newHotel = new Hotel(req.body);
  try {
    const saveHotels = await newHotel.save();
    res.status(200).json(saveHotels);
  } catch (error) {
    next(err);
  }
};

//updateHolel
export const updateHolel = async (req, res, next) => {
  try {
    console.log("first", req.params.id);
    // après avoir trouver notre hotel nous allons mettez-le a jour avec la methode mongoDb set et passer ce que nous allons  changer $set req.body
    console.log("hedrtfgvbiniojioh", req.body);
    const updateHotels = await Hotel.findByIdAndUpdate(
      req.params.id, // to take id
      {
        $set: req.body, // show what you updated
      },
      { new: true } // après la mise a jour il reviendra a nouveau  version de notre document
    );
    res.status(200).json(updateHotels);
  } catch (error) {
    next(err);
  }
};

//deleteHolel
export const deleteHolel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(err);
  }
};

//getHolel
export const getHolel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        //la méthode asynchrone renvoie une promesse de fournir la valeur à un moment donné dans le futur.
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
//getHolels
export const getHolels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find(); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
