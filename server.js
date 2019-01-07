const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const stringSimilarity = require('string-similarity')

app.use(bodyParser.json())

Enigme = require("./models/enigme")
Marker = require("./models/marker")
Equipe = require("./models/equipe")

//Connect to Mongoose
mongoose.connect('mongodb://localhost/RAIDinLyon', { useNewUrlParser: true })
const db = mongoose.connection

//Options CORS
const corsOptions = {
    // origin: 'http://example.com',
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.get('/', function (req, res) {
    res.send('Please use /api/enigmes or /api/markers or /api/equipe')
})


app.get('/api/enigmes', function (req, res) {
    Enigme.getEnigmes(function (err, enigmes) {
        if (err) {
            throw err
        }
        res.json(enigmes)
    })
})

app.get('/api/markers', function (req, res) {
    Marker.getMarkers(function (err, markers) {
        if (err) {
            throw err
        }
        res.json(markers)
    })
})

app.get('/api/equipe', function (req, res) {
    Equipe.getEquipe(function (err, equipe) {
        if (err) {
            throw err
        }
        res.json(equipe)
    })
})

// proposition string
function comparaison(trueAnswer, toTestAnswer) {
    console.log(trueAnswer, toTestAnswer)
    let similarity = stringSimilarity.compareTwoStrings(trueAnswer, toTestAnswer);
    let status = false
    if (similarity >= 0.7) {
        status = true
    }
    return { similarity, status }
}
/*
ENIGMES
*/
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

app.post('/api/enigmes', function (req, res) {
    var enigme = req.body
    console.log(req.body)
    Enigme.addEnigme(enigme, function (err, enigme) {
        if (err) {
            throw err
        }
        res.json(enigme)
    })
})

app.put('/api/enigmes/:_id', function (req, res) {
    var id = req.params._id
    var enigme = req.body
    Enigme.updateEnigme(id, enigme, {}, function (err, enigme) {
        if (err) {
            throw err
        }
        res.json(enigme)
    })
})

app.delete('/api/enigmes/:_id', function (req, res) {
    var id = req.params._id
    Enigme.removeEnigme(id, function (err, enigme) {
        if (err) {
            throw err
        }
        res.json(enigme)
    })
})

app.get('/api/enigmes/:titre', (req, res) => {
    let titre = req.params.titre
    Enigme.find(titre, (err, items) => {
        if (err) res.status(500).send(error)

        res.status(200).json(items);
    });
});



/*
EQUIPE
*/
app.post('/api/equipe/:_id', function (req, res) {
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

app.post('/api/equipe', function (req, res) {
    var equipe = req.body
    console.log(req.body)
    Equipe.addEquipe(equipe, function (err, equipe) {
        if (err) {
            throw err
        }
        res.json(equipe)
    })
})

app.put('/api/equipe/:_id', function (req, res) {
    var id = req.params._id
    var equipe = req.body
    Equipe.updateEquipe(id, equipe, {}, function (err, equipe) {
        if (err) {
            throw err
        }
        res.json(equipe)
    })
})

app.delete('/api/equipe/:_id', function (req, res) {
    var id = req.params._id
    Equipe.removeEquipe(id, function (err, equipe) {
        if (err) {
            throw err
        }
        res.json(equipe)
    })
})

app.get('/api/equipe/:nom', (req, res) => {
    let nom = req.params.nom
    Equipe.find(nom, (err, items) => {
        if (err) res.status(500).send(error)

        res.status(200).json(items);
    });
});



app.listen(port, () => console.log(`Listening on port ${port}`));