// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

//Fake data
const profiles = {
  sjobs: {
    name: 'Steve Jobs',
    company: 'Apple',
    languages: ['javascript', 'swift', 'python'],
    image: '/images/steve.jpg'
  },
  lula: {
    name: 'Luke Laws',
    company: 'Antecursor',
    languages: ['javascript', 'python'],
    image: '/images/luke.jfif'
  },
  jsr: {
    name: 'Jhon Smith',
    company: 'Nasa',
    languages: ['java', 'C#', 'python'],
    image: '/images/jsr.jfif'
  },
  bgates:{
    name: 'Bill Gates',
    company: 'Nasa',
    languages: ['.net', 'C#', 'visual'],
    image: '/images/bill.jpg'
  }
}

router.get('/', (req, res) => {
  res.render('index', { text: 'This is the dynamic data. Open index.js from the routes directory to see.' })
})

router.post('/addprofile', (req, res) => {
  const body = req.body
  body.languages = req.body.languages.split(', ');

  profiles[body.username] = body

  res.redirect('/profile/'+body.username)
})
// router.post('/post', (req, res) => {
//   const body = req.body;
//   res.json({
//     confirmation: 'success',
//     data: body
//   })
// })

router.get('/query', (req, res) => {
  const name = req.query.name
  const ocupation = req.query.ocupation
  data = {
    query: 'query',
    name,
    ocupation
  }

  res.render('profile', data)
})

router.get('/profiles', (req, res) => {
  var profilesFormatted = [];

  for (var prop in profiles){
    if (profiles.hasOwnProperty(prop)){
      profilesFormatted.push({
        'key' : prop,
        'value' : profiles[prop]
      });
    }
  }

  
  res.render('profiles', {profiles: profilesFormatted, timestamp: req.timestamp})
})



router.get('/:word', (req, res) => {
  const word = req.params.word
  res.json({
    data: 'This is your word: ' + word
  })
})



router.get('/profile/:username', (req, res) => {
  const profile = req.params.profile;
  const username = req.params.username;
  const currentProfile = profiles[username];
  currentProfile.timestamp = req.timestamp;

  !currentProfile ?  
    res.json({confimation: 'Failed', message: username + ' not found'}) 
  :
    res.render('profile', currentProfile)
})


module.exports = router
