import User from "../models/user.js";

//updateUser
export const updateUser = async (req, res, next) => {
  try {
    console.log("first", req.params.id);
    // après avoir trouver notre User nous allons mettez-le a jour avec la methode mongoDb set et passer ce que nous allons  changer $set req.body
    console.log("hedrtfgvbiniojioh", req.body);
    const updateUsers = await User.findByIdAndUpdate(
      req.params.id, // to take id
      {
        $set: req.body, // show what you updated
      },
      { new: true } // après la mise a jour il reviendra a nouveau  version de notre document
    );
    res.status(200).json(updateUsers);
  } catch (error) {
    next(err);
  }
};

//deleteUser
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(err);
  }
};

//getUser
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    res.status(200).json(user);
  } catch (error) {
    next(err);
  }
};

//getUsers
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // danc le cas de dlete nou n'en avons pas besoin c'est va etre seulement l id
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
