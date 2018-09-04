const express = require('express')
const router = new express.Router()

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


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

/// Employers ID setup

// Start Dummy Data
const dummy_employer_1 = {
  id: "XJBMNV",
  name: "Assurance Aerospace Engineering"
}

const dummy_employer_2 = {
  id: "PPJTRA",
  name: "; DROP TABLE \"COMPANIES\";-- LTD"
}


router.use(function (req, res, next) {
  if (!req.session.employers) {
    console.log("Adding employers to session");
    req.session.employers = [dummy_employer_1, dummy_employer_2];
  }
  next();
})


router.param('employer', function (req, res, next, employer) {
  var employers = req.session.employers.filter(e => e.id == employer);
  if (employers.length == 1) {
    res.locals.employer = employers[0];
  }
  next();
});

// Employer
// router.get('/version-1/:employer', function (req, res) {
 // res.render('version-1/home/index');
// })



///// End of employers ID stuff


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
              res.redirect(`/${req.version}/find/findaprovider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork bork')
            break;
        }
})


/// Add apprentices > confirm the training provider
router.get('/version-1/apprentices/add/confirming-training-provider' , function (req, res) {
  var confirmPro = req.query.confirmation
       switch (true) {
          case  (confirmPro == 'true'):
            res.redirect(`/${req.version}/apprentices/add/start-adding-apprentices`)
           break;

          case  (confirmPro == 'false'):
              res.redirect(`/${req.version}/apprentices/add/training-provider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})



/// Add apprentices > add apprentices yourself or send to provider
router.get('/version-1/apprentices/add/addingApprentices' , function (req, res) {
  var confirmAddApps = req.query.addApprentices
       switch (true) {
          case  (confirmAddApps == 'true'):
            res.redirect(`/${req.version}/apprentices/add/review-cohort`)
           break;

          case  (confirmAddApps == 'false'):
              res.redirect(`/${req.version}/apprentices/add/message-for-training-provider`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Add apprentices > add apprentices yourself or send to provider
router.get('/version-1/apprentices/cohorts/editFinishedApprentice' , function (req, res) {
  var appCohortFinishedOption = req.query.appCohortFinishedOption
       switch (true) {
          case  (appCohortFinishedOption == 'approve'):
            res.redirect(`/${req.version}/apprentices/cohorts/message-for-training-provider`)
           break;

          case  (appCohortFinishedOption == 'send'):
              res.redirect(`/${req.version}/apprentices/cohorts/message-for-training-provider`)
          break;

          case  (appCohortFinishedOption == 'save'):
              res.redirect(`/${req.version}/apprentices/cohorts`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})



/// Change apprentices status > 
router.get('/version-1/apprentices/manage/appsChangeStatusRobEdwards' , function (req, res) {
  var status = req.query.status
       switch (true) {
          case  (status == 'Paused'):
            res.redirect(`/${req.version}/apprentices/manage/confirmPaused`)
           break;

          case  (status == 'Stopped'):
              res.redirect(`/${req.version}/apprentices/manage/confirmStopped`)
          break;

          case  (status == 'Return'):
              res.redirect(`/${req.version}/apprentices/manage/robEdwardsLive`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})


/// Forecast > Delete an apprenticeship you are forecasting against
router.get('/version-1/finance/projection/deleteForecastApprenticeship' , function (req, res) {
  var confirm = req.query.confirm
       switch (true) {
          case  (confirm == 'yes'):
            res.redirect(`/${req.version}/finance/projection/appRemoved`)
           break;

          case  (confirm == 'no'):
              res.redirect(`/${req.version}/finance/projection/canFund`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Confirming an employer
router.get('/version-1/provider/proCohorts/providerAgreedTraining' , function (req, res) {
  var confirmEmployer = req.query.confirmEmployer
       switch (true) {
          case  (confirmEmployer == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/employerConnection`)
           break;

          case  (confirmEmployer == 'false'):
              res.redirect(`/${req.version}/finance/projection/NOTSUREYET`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Connected company check
router.get('/version-1/provider/proCohorts/employerConnectedCompany' , function (req, res) {
  var connectedCompany = req.query.connectedCompany
       switch (true) {
          case  (connectedCompany == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/cohortView`)
           break;

          case  (connectedCompany == 'false'):
              res.redirect(`/${req.version}/finance/projection/NOTSUREYET`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})

/// Provider > Delete apprentice record
router.get('/version-1/provider/proCohorts/providerDeleteApprentice' , function (req, res) {
  var deleteApp = req.query.deleteApp
       switch (true) {
          case  (deleteApp == 'true'):
            res.redirect(`/${req.version}/provider/proCohorts/cohortView`)
           break;

          case  (deleteApp == 'false'):
              res.redirect(`/${req.version}/provider/proCohorts//edit-apprentice`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})


/// Provider > Finished > send to employer
router.get('/version-1/provider/proCohorts/providerFinishedApprentice' , function (req, res) {
  var appCohortFinishedOption = req.query.appCohortFinishedOption
       switch (true) {
          case  (appCohortFinishedOption == 'approve'):
            res.redirect(`/${req.version}/provider/proCohorts/messageEmployers`)
           break;

          case  (appCohortFinishedOption == 'send'):
              res.redirect(`/${req.version}/provider/proCohorts/messageEmployers`)
          break;

           case  (appCohortFinishedOption == 'save'):
              res.redirect(`/${req.version}/provider/proCohorts`)
          break;

        default:
             console.log('gyahhhhhhhh, bork bork borka')
            break;
        }
})


/// Add apprentices > add apprentices yourself or send to provider
// router.get('/version-1/apprentices/add/finishAppEarly' , function (req, res) {
 // var optionFinishApps = req.query.optionFinishApps
   //    switch (true) {
     //     case  (optionFinishApps == 'send'):
       //     res.redirect(`/${req.version}/apprentices/cohorts/index`)
         //  break;

      //    case  (optionFinishApps == 'save'):
        //      res.redirect(`/${req.version}/apprentices/cohorts/index`)
          // break;

      //  default:
      //       console.log('gyahhhhhhhh, bork bork borka')
      //      break;
      //  }
// })



/// registration > what you'll need
//// Not using routes for this as has a weird behaviour on the no option, so dealt with in page.
/// manage-apprenticeships/whatyoullneed

/// registration > 




module.exports = router