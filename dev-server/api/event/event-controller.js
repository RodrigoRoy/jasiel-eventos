import User from '../../model/user-model';
import Event from '../../model/event-model';
import moment from 'moment';
import * as auth from '../../services/auth-service';

export function index(req, res){
  // Find all events
  Event.find({}, (error, events) => {
    if(error){
      return res.status(500).json();
    }
    return res.status(200).json({events: events});
  }).populate('author', 'username')
  .sort({createdAt: -1});
}

export function create(req, res){
  // Create event
  const id = auth.getUserId(req);
  User.findOne({_id: id}, (error, user) => {
    if(error && !user){
      return res.status(500).json();
    }
    const event = new Event(req.body.event);
    event.author = user._id;

    event.save(error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(201).json({id: event._id});
    });
  });
}

export function update(req, res){
  // Update an event
  const id = auth.getUserId(req);

  User.findOne({_id: id}, (error, user) => {
    if(error){
      return res.status(500).json();
    }
    if(!user){
      return res.status(404).json();
    }

    const event = new Event(req.body.event);
    event.author = user._id;
    Event.findByIdAndUpdate({_id: event._id}, event, error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export function remove(req, res){
  // Delete an event
  const id = auth.getUserId(req);
  Event.findOne({_id: req.params.id}, (error, event) => {
    if(error){
      return res.status(500).json();
    }
    if(!event){
      return res.status(404).json();
    }
    if(event.author._id.toString() !== id){
      return res.status(403).json({message: 'Not allowed to delete another user\'s event'});
    }
    Event.deleteOne({_id: req.params.id}, error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export function show(req, res){
  // Get event by id
  Event.findOne({_id: req.params.id}, (error, event) => {
    if(error){
      return res.status(500).json();
    }
    if(!event){
      return res.status(400).json();
    }
    return res.status(200).json({event: event});
  });
}
