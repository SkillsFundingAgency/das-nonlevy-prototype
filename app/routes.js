const express = require('express')
const router = new express.Router()

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


// Start Dummy Data
const dummy_employer_1 = {
  id: "XJBMNV",
  name: "Nice Employer"
}

const dummy_employer_2 = {
  id: "PPJTRA",
  name: "Good Employer"
}

router.use(function (req, res, next) {
//  if (!req.session.cohorts) {
  //  console.log("Adding cohorts to session");
    //req.session.cohorts = [dummy_cohort_1, dummy_cohort_2, dummy_cohort_3, dummy_cohort_4, dummy_cohort_5];
 // }
  if (!req.session.employers) {
    console.log("Adding employers to session");
    req.session.employers = [dummy_employer_1, dummy_employer_2];
  }
//  if (!req.session.apprentices) {
//    console.log("Adding apprentices to session");
//    req.session.apprentices = [dummy_apprentice_1, dummy_apprentice_2, dummy_apprentice_3, dummy_apprentice_4, dummy_apprentice_5];
//  }
  // if (!req.session.transactions) {
  //   console.log("Adding transactions to session");
  //   req.session.transactions = [
  //     dummy_transaction_a1, dummy_transaction_a2, dummy_transaction_a3, dummy_transaction_a4,
  //     dummy_transaction_b1, dummy_transaction_b2, dummy_transaction_b3, dummy_transaction_b4,
  //     dummy_transaction_c1, dummy_transaction_c2, dummy_transaction_c3, dummy_transaction_c4,
  //     dummy_transaction_d1, dummy_transaction_d2, dummy_transaction_d3, dummy_transaction_d4,
  //     dummy_transaction_e1, dummy_transaction_e2, dummy_transaction_e3, dummy_transaction_e4,
  //     dummy_transaction_f1, dummy_transaction_f2, dummy_transaction_f3, dummy_transaction_f4,
  //     dummy_transaction_g1, dummy_transaction_g2, dummy_transaction_g3, dummy_transaction_g4,
  //     dummy_transaction_h1, dummy_transaction_h2, dummy_transaction_h3, dummy_transaction_h4,
  //     dummy_transaction_i1, dummy_transaction_i2, dummy_transaction_i3, dummy_transaction_i4,
  //     dummy_transaction_j1, dummy_transaction_j2, dummy_transaction_j3, dummy_transaction_j4,
  //     dummy_transaction_k1, dummy_transaction_k2, dummy_transaction_k3, dummy_transaction_k4,
  //     dummy_transaction_l1, dummy_transaction_l2, dummy_transaction_l3, dummy_transaction_l4,
  //     dummy_transaction_m1, dummy_transaction_m2, dummy_transaction_m3, dummy_transaction_m4,
  //   ];
  // }
 
 // if (!req.session.connectionRequests) {
 //   console.log("Adding connectionRequests to session");
 //   req.session.connectionRequests = [];
 // }
  next();
})


// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
  req.version = req.originalUrl.split('/')[1] // this is added by DC project
  req.feature = req.originalUrl.split('/')[1]
  req.sprint = req.originalUrl.split('/')[2]
  res.locals.version = req.version // this is added by DC project
  res.locals.feature = req.feature
  res.locals.sprint = req.sprint
 // var arse = req.params[0];
  next()
})

// Versions routing stuff - so indivdual routes are in the sub version
router.use(/\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/version-${req.params[0]}/routes`)(req, res, next);
})

console.log('main routes loaded');
router.get('/', (req, res) => {
  res.render('index')
})


// routing the app 
/// This is just a test version.
router.get('/version-1/manage-apprenticeships/branch1' , function (req, res) {
  // Get the answer from the query string (eg. ?over18=false)
  var over18 = req.query.over18

  if (over18 === 'false') {
    // Redirect to the relevant page
    res.redirect(`/${req.version}/manage-apprenticeships/branch2`)
  } else {
    // If over18 is any other value (or is missing) render the page requested
    res.render(`${req.version}/manage-apprenticeships/branch1`)
  }
})

/// registration > used service before?
router.get('/version-1/manage-apprenticeships/signin' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/manage-apprenticeships/whatyoullneed`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})

/*
/// team > added new team member where to
router.get('/version-1/team/whatsNextTeam' , function (req, res) {
  var teamWhatsNext = req.query.teamwhatsnext
  if (teamWhatsNext === 'another') {
    res.redirect(`/${req.version}/arse`)
  } else {}
    if (teamWhatsNext === 'viewall') {
    res.redirect(`/${req.version}/arse32`)
  } 
    if (teamWhatsNext === 'returnhome') {
    res.redirect(`/${req.version}/arse3`)
  }  
})
*/

// This should remove a trailing slash from the end of the URL that occassionaly breaks the urls and redirects
router.use(function(req, res, next) {
      if (req.path.length > 1 && /\/$/.test(req.path)) {
        var query = req.url.slice(req.path.length)
        res.redirect(301, req.path.slice(0, -1) + query)
      } else {
        next()
      }
    });



/// team > added new team member where to
router.get('/version-1/team/whatsNextTeam' , function (req, res) {
  var teamWhatsNext = req.query.teamwhatsnext
       switch (true) {
          case  (teamWhatsNext == 'another'):
           res.redirect(`/${req.version}/team/add-new-user`)
            break;
        case  (teamWhatsNext == 'viewall'):
        res.redirect(`/${req.version}/team`)
          break
         case  (teamWhatsNext == 'returnhome'):
          res.redirect(`/${req.version}/home`)
          break
        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// orgs > whats next after adding an org
router.get('/version-1/orgs/whatsNextOrgs' , function (req, res) {
  var orgsWhatsNext = req.query.orgswhatsnext
       switch (true) {
          case  (orgsWhatsNext == 'agreement'):
           res.redirect(`/${req.version}/orgs/droptablesign`)
            break;
        case  (orgsWhatsNext == 'team'):
        res.redirect(`/${req.version}/team`)
          break
         case  (orgsWhatsNext == 'another'):
          res.redirect(`/${req.version}/orgs/searchOrg`)
          break
                   case  (orgsWhatsNext == 'home'):
          res.redirect(`/${req.version}/home`)
          break
        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// paye > whats next after adding an paye
router.get('/version-1/paye/whatsNextPaye' , function (req, res) {
  var payeWhatsNext = req.query.payeWhatsNext
       switch (true) {
          case  (payeWhatsNext == 'paye'):
            res.redirect(`/${req.version}/paye/allowtaxdetails`)
           break;

          case  (payeWhatsNext == 'finance'):
              res.redirect(`/${req.version}/finance`)
          break;

          case  (payeWhatsNext == 'home'):
              res.redirect(`/${req.version}/home`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// paye > whats next after removing a paye
router.get('/version-1/paye/payeRemove' , function (req, res) {
  var removePaye = req.query.removePaye
       switch (true) {
          case  (removePaye == 'true'):
            res.redirect(`/${req.version}/paye`)
           break;

          case  (removePaye == 'false'):
              res.redirect(`/${req.version}/paye`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})

/// paye > whats next after removing a paye
router.get('/version-1/find/chooseFATType' , function (req, res) {
  var fatType = req.query.fatType
       switch (true) {
          case  (fatType == 'apprenticeship'):
            res.redirect(`/${req.version}/find/appreticeshipsearch`)
           break;

          case  (fatType == 'provider'):
              res.redirect(`/${req.version}/find/providersearch`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// registration > what you'll need
//// Not using routes for this as has a weird behaviour on the no option, so dealt with in page.
/// manage-apprenticeships/whatyoullneed

/// registration > 


module.exports = router