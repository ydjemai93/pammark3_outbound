# Outbound Twilio Caller

Ce projet permet d'initier des appels sortants via Twilio. L'appel est déclenché via un endpoint HTTP qui reçoit le numéro de téléphone à appeler. Le projet utilise l'API Twilio pour initier l'appel et sert un TwiML personnalisable pour gérer le comportement de l'appel (streaming, message vocal, etc.).

## Installation

1. Clonez ce dépôt.
2. Exécutez `npm install` pour installer les dépendances.
3. Créez un fichier `.env` à la racine du projet (voir l'exemple ci-dessous).

## Fichier .env

Créez un fichier `.env` avec le contenu suivant en adaptant les valeurs :

