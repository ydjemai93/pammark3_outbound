require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

// Récupération des identifiants Twilio et de la configuration depuis les variables d'environnement
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

// Endpoint qui déclenche l'appel sortant
app.post('/call', (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: 'Le numéro de téléphone est requis.' });
  }

  // L'URL qui retourne le TwiML pour le traitement de l'appel
  const twimlUrl = process.env.TWIML_URL;

  twilioClient.calls
    .create({
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: twimlUrl
    })
    .then(call => {
      res.json({ message: 'Appel initié', callSid: call.sid });
    })
    .catch(error => {
      console.error('Erreur lors de l\'appel :', error);
      res.status(500).json({ error: error.message });
    });
});

// Endpoint qui sert le TwiML pour gérer l'appel
app.get('/twiml', (req, res) => {
  res.type('text/xml');
  const twimlResponse = `<?xml version="1.0" encoding="UTF-8" ?>
<Response>
  <Say>Bienvenue dans l'appel sortant. Veuillez patienter.</Say>
  <Connect>
    <Stream url="wss://${process.env.NGROK_HOST}/streams" track="both">
      <Parameter name="customParam" value="valeurPersonnalisee" />
    </Stream>
  </Connect>
  <Pause length="3600"/>
</Response>`;
  res.send(twimlResponse);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveur outbound lancé sur le port ${PORT}`);
});
