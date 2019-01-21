const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const stringSimilarity = require('string-similarity');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const morgan = require('morgan');

// Mongoose connexion to Mlab server with constiable as ID ans Password
const userID = require('./keys').userID
const userPass = require('./keys').userPass

mongoose.connect(`mongodb://${userID}:${userPass}@ds024748.mlab.com:24748/raidwild`, {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB Connected WOAW'))
    .catch(err => console.log("Error :", err, "IT DOESNT FUCKING WORK"))

mongoose.set('useFindAndModify', false);
//Options CORS
const corsOptions = {
    // origin: 'http://example.com',
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, constious SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors(corsOptions))

Enigme = require("./models/enigme")
Marker = require("./models/marker")
Administrateur = require("./models/administrateur")
Equipe = require("./models/equipe")
Session = require("./models/session")

process.env.SECRET_KEY = 'secret'

// =======================
// configuration =========
// =======================
// used to create, sign, and verify tokens
app.set('superSecret', process.env.SECRET_KEY); // secret constiable

// use morgan to log requests to the console
app.use(morgan('dev'));

// routes ================
// get an instance of the router for api routes
const apiRoutes = express.Router();


/*
AUTHENTIFICATION
*/
// route to authenticate a user (POST http://localhost:5000/api/authenticate)
apiRoutes.post('/authenticate', function (req, res) {
    // find the user
    Equipe.findOne({
        email: req.body.email
    }, function (err, user) {
        console.log("is it ok ?")
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    email: user.email
                };
                const token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });
                const id = user._id

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    id: id
                });
            }
        }

    })
});

// route to show a random message 
apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Hi guys' });
});

// route to return all users 
apiRoutes.get('/users', function (req, res) {
    Equipe.findOne({
        //email: req.body.email
    })
        .then(equipe => res.json(equipe))
});
// apply the routes to our application with the prefix /api
app.use(/* '/api',  */apiRoutes);

/*FIN AUTHENTIFICATION*/



//Récupération des marqueurs de position
app.get('/api/markers', function (req, res) {
    Marker.getMarkers(function (err, markers) {
        if (err) {
            throw err
        }
        res.json(markers)
    })
})


// Comparaison des réponses de l'utilisateur avec la réponse officielle de l'énigme
function comparaison(trueAnswer, toTestAnswer) {
    console.log(trueAnswer, toTestAnswer)
    let similarity = stringSimilarity.compareTwoStrings(trueAnswer, toTestAnswer);
    let status = false
    if (similarity >= 0.7) {
        status = true
    }
    return {
        similarity,
        status
    }
}

/*
ENIGMES
*/

// Création d'une énigme
app.post('/api/enigmes', function (req, res) {
    const enigme = req.body
    console.log(req.body)
    Enigme.addEnigme(enigme, function (err, enigme) {
        if (err) {
            throw err
        }
        res.json(enigme)
    })
})

//Récupération des énigmes
app.get('/api/enigmes', function (req, res) {
    Enigme.getEnigmes(function (err, enigmes) {
        if (err) {
            throw err
        }
        res.json(enigmes)
    })
})

app.post('/api/enigmes/:_id', function (req, res) {
    let id = req.params._id
    Enigme.getEnigmeById(id, function (err, enigme) {
        if (err) {
            throw err
        }
        const compar = comparaison(enigme.reponse, req.body.proposition)
        if (compar.status) res.json(compar)
        else res.json(compar)
    })
})

// Mise a jour d'une énigme en fonction de son ID
app.put('/api/enigmes/:_id', function (req, res) {
    const id = req.params._id
    const enigme = req.body
    Enigme.updateEnigme(id, {
        $set: {
            titre: enigme.titre,
            question: enigme.question,
            enonce: enigme.enonce,
            indices: [enigme.indices[0], enigme.indices[1], enigme.indices[2]],
            info: enigme.info,
            coordonnee: [enigme.coordonnee[0], enigme.coordonnee[1]],
            img: enigme.img,
            reponse: enigme.reponse
        }
    }, (err, result) => {
        if (err) {
            throw err
        }
        res.json(enigme)
    })
})

// Suppression d'une énigme en fonction de son ID
app.delete('/api/enigmes/:_id', function (req, res) {
    const id = req.params._id
    Enigme.removeEnigme(id, function (err, enigme) {
        if (err) {
            throw err
        }
        res.json(enigme)
    })
})

// Récuperation d'une énigme en fonction de son ID
app.get('/api/enigmes/:_id', function (req, res) {
    let _id = new ObjectId(req.params._id)
    Enigme.find({ _id }, function (err, items) {
        if (err) {
            throw err
        }
        res.json(items);
    })
});


/*
EQUIPES
*/

// Création d'un équipe
app.post('/api/equipes', function (req, res) {
    const equipe = req.body
    console.log(req.body)
    Equipe.addEquipe(equipe, function (err, equipe) {
        if (err) {
            throw err
        }
        res.json(equipe)
    })
})

// Suppression d'un équipe grace a son ID
app.delete('/api/equipes/:_id', function (req, res) {
    const id = req.params._id
    Equipe.removeEquipe(id, function (err, equipe) {
        if (err) {
            throw err
        }
        res.json(equipe)
    })
})

//Récupération des équipes
app.get('/api/equipes', function (req, res) {
    Equipe.getEquipe(function (err, equipe) {
        if (err) {
            throw err
        }
        res.json(equipe)
    })
})

// Récupération d'un équipe grâce a son ID
app.get('/api/equipe/:_id', (req, res) => {
    let id = ObjectId(req.params._id)
    Equipe.find({ _id: id }, (err, items) => {
        if (err) res.status(500).send(err)

        res.status(200).json(items);
    });
});

// Modification des informations d'une équipe en fonction de son ID
app.put('/api/equipes/donnees/:_id', function (req, res) {	
    const id = req.params._id	
    const equipe = req.body	
    console.log('Hello la team marche', equipe)	
    Equipe.updateInfoEquipe(id, {	
        $set: {	
            score: equipe.score,	
            nom: equipe.nom,	
            email: equipe.email,	
            telephone: equipe.telephone,	
            participants: equipe.participants,	
            h_fin: equipe.h_fin,	

         }	
    }, (err, result) => {	
        if (err) {	
            throw err	
        }	
        res.json(equipe)	
    })	
})

// Comparaison de la réponse de l'utilisateur avec la réponse de l'énigme
app.post('/api/equipes/:_id', function (req, res) {
    let id = req.params._id
    Equipe.getEquipeById(id, function (err, equipe) {
        if (err) {
            throw err
        }
        const compar = comparaison(equipe.reponse, req.body.proposition)
        if (compar.status) res.json(compar)
        else res.json(compar)
    })
})

//Mise a jour du score d'une équipe & progression dans le jeu
app.put('/api/equipes/:_id', function (req, res) {
    let id = req.params._id
    let equipe = req.body
    console.log(equipe._idQuestion)
    Equipe.updateEquipe(id, {
        $inc: {
            score: equipe.score,
        },
        $addToSet: {
            enigmes: {
                check: equipe.check,
                succeed: equipe.succeed,
                gain: equipe.gain,
                idquestion: equipe._idQuestion,
            }
        }
    }, (err, result) => {
        if (err) {
            throw err
        }
        res.json(equipe)
    })
})

//Classement des equipes par ordre décroissant de score
app.get('/api/equipes/byscore', function (req, res) {
    Equipe.getRank([{ $sort: { score: -1 } }], (err, rank) => {
        if (err) {
            throw err
        }
        res.json(rank)
    })
})

//ADMINISTRATEURS


//Récupération des administrateurs
app.get('/api/administrateurs', function (req, res) {
    Administrateur.getAdministrateurs(function (err, administrateurs) {
        if (err) {
            throw err
        }
        res.json(administrateurs)
    })
})

//Création d'un administrateur
app.post('/api/administrateurs', function (req, res) {
    const administrateur = req.body
    console.log(req.body)
    Administrateur.addAdministrateur(administrateur, function (err, administrateur) {
        if (err) {
            throw err
        }
        res.json(administrateur)
    })
})

//Suppression d'un administrateur
app.delete('/api/administrateurs/:_id', function (req, res) {
    const id = req.params._id
    Administrateur.removeAdministrateur(id, function (err, administrateur) {
        if (err) {
            throw err
        }
        res.json(administrateur)
    })
})

// SESSIONS //

//Récupération des sessions
app.get('/api/session', function (req, res) {
    Session.getSession(function (err, session) {
        if (err) {
            throw err
        }
        res.json(session)
    })
})

//Modification d'une session
app.put('/api/session', function (req, res) {
    var id = req.body.id
    var session = req.body
    Session.updateSession(id, {
        nom: session.nom,
        deadline: session.deadline
    }, (err, result) => {
        if (err) {
            throw err
        }
        res.json(session)
    })
})

//Modification de l'activation d'une session
app.put('/api/session/activation', function (req, res) {
    var id = req.body._id
    var session = req.body
    Session.updateSession(id, {
        isactivate: session.isactivate
    }, (err, result) => {
        if (err) {
            throw err
        }
        res.json(session)
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`));