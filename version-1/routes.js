
const express = require('express')
const router = new express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

console.log('version 1 routes loaded');
// Add your routes here - above the module.exports line
// Branching
router.get('/version-1/manage-apprenticeships/branch1', function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var over18 = req.query.over18

  if (over18 === 'false') {
    // Redirect to the relevant page
     console.log("yes, running");
    res.redirect(`/${req.version}/manage-apprenticeships/branch2`)
  } else {
    // If over18 is any other value (or is missing) render the page requested
         console.log("render thing triggered");
    res.render(`${req.version}/manage-apprenticeships/branch1`)
  }
})

module.exports = router