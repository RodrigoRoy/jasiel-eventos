import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as config from '../../config';

export function setEnvironment(app){
  if(process.env.NODE_ENV != 'production'){
    setDevEnv(app);
  }
  else {
    setProdEnv(app);
  }
}

function setDevEnv(app){
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = `mongodb://localhost:27017/${config.dbname_dev}`;
  process.env.TOKEN_SECRET = config.token_dev;
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(cors());
}

function setProdEnv(app){
  process.env.DB_URL = `mongodb://localhost:27017/${config.dbname_prod}`;
  process.env.TOKEN_SECRET = config.token_prod;
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../dist'));
}
