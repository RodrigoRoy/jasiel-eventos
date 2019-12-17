import {http} from './HttpService'

export function getAllEvents(){
  return http().get('/event');
}

export function getEventById(id){
  return http().get(`/event/${id}`);
}

export function createEvent(evento){
  return http().post('/event', evento);
}

export function deleteEvent(id){
  return http().delete(`/event/${id}`);
}

export function updateEvent(evento){
  return http().put('/event', evento);
}
