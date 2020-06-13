const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userModel = require('../database/usersModel');
const tokenMake = require('./tokenMake');

router.post('/register', async(req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash;
  try{
    const newUser = await userModel.add(user);
    res.status(201).json(newUser)
  }catch(err){
    console.log(`__CATCH__ : ${err}`)
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  userModel.findBy({username})
            .first()
            .then( user => {
                if( user && bcrypt.compareSync(password, user.password)){
                    const token = tokenMake(user)
                    res.status(200).json({message:`Welcome ${username}`, token: token,})
                }else{
                    res.status(401).json({message:`Invalid Credentials`})
                }
            })
            .catch( err => { res.status(500).json(err)})
});

module.exports = router;
