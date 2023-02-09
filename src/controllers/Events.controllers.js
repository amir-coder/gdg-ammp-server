const EventModel = require('../models/Events.model')
const ObjectId = require("mongoose").Types.ObjectId;





// get all Events

module.exports.readEvents = async (req, res) => {
  const Events = await EventModel.find().sort({ createdAt: -1 });
  res.status(200).json(Events);
};

// Create a new Event
module.exports.createEvents = async (req, res) => {
  const newEvent = new EventModel({
    name: req.body.name,
    description: req.body.description,
    GlobalStatistics: req.body.GlobalStatistics,
   
    Organisation: req.body.Organisation,
  });
  try {
    const Event = await newEvent.save();
    // UserModel.findOne({ _id: req.params.id }).populate("EventerId");
    res.status(200).json({ message: "Event created", Event });
  } catch (error) {
    res.status(400).json({ message: "failed to created new Event ", error });
  }
};





// get Event info  by id

module.exports.getEventInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  EventModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown:" + err);
  })
};

// update Event by id

module.exports.updateEvent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const updateEvent = await EventModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
            name: req.body.name,
            description: req.body.description,
            Organisation: req.body.Organisation,
          GlobalStatistics: req.body.GlobalStatistics,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: "Event updated", updateEvent });
  } catch (error) {
    res.status(400).json({ message: "failed to update Event ", error });
  }
};

// delete Event by id

module.exports.deleteEvent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const deleteEvent = await EventModel.deleteOne({_id:req.params.id}).exec();
    res.status(200).json({ message: "Event deleted", deleteEvent });
  } catch (error) {
    res.status(400).json({ message: "failed to delete Event ", error });
  }
};
