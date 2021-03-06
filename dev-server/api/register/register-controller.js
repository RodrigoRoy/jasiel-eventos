// import { StringUtil } from '../../utilities/string-util';
import * as StringUtil from '../../utilities/string-util';
import User from '../../model/user-model';

export function index(req, res){
  // console.log('req.body ', req.body);
  const validation = validateIndex(req.body);
  if(!validation.isValid){
    return res.status(400).json({message: validation.message});
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
  });
  user.save(error => {
    if(error){
      if(error.code === 11000){
        return res.status(403).json({message: 'Username is already taken'});
      }
      return res.status(500).json();
    }
    return res.status(201).json();
  });
}

function validateIndex(body){
  let errors = '';
  if(StringUtil.isEmpty(body.username)){
    errors += 'Username is required. ';
  }
  if(StringUtil.isEmpty(body.email)){
    errors += 'Email is required. ';
  }
  if(StringUtil.isEmpty(body.password)){
    errors += 'Password is required. ';
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  }
}
