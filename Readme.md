
# Chatbot Tezos Integration

Un projet simple qui démontre comment intégrer un chatbot avec des interactions basiques sur la blockchain Tezos. Le chatbot peut envoyer des instructions pour  faire les operations  

## Caractéristiques

- Chatbot intégré avec une logique de minting et de transfert sur la blockchain Tezos.
- Utilise `taquito` pour interagir avec la blockchain Tezos.
- Réponse structurée du chatbot pour les transactions.

## Prérequis

- Node.js v14+ 
- Yarn ou npm
- Un nœud Tezos (par exemple via [Teznode](https://teznode.com/))
- Une clé privée pour signer les transactions

## Installation

1. Clonez ce dépôt :
   
   ```bash
   git clone <lien-du-depot>
   cd nom-du-dossier
   ```

2. Installez les dépendances :
   
   ```bash
   yarn install
   ```

   ou

   ```bash
   npm install
   ```

3. Créez un fichier `.env` dans le dossier principal et ajoutez votre clé privée et l'URL du nœud Tezos :

   ```
   TEZOS_PRIVATE_KEY=edsk...
   TEZOS_NODE_URL=https://<your-tezos-node-url>
   ```

## Utilisation

1. Lancez le projet :

   ```bash
   yarn start
   ```

   ou 

   ```bash
   npm start
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:3000` pour voir le chatbot en action.

3. Posez une question au chatbot. Lorsqu'il répond avec une instruction "buy" ou "transfert", le système déclenchera automatiquement les transactions sur la blockchain Tezos.

## Contribution

Si vous souhaitez contribuer à ce projet, n'hésitez pas à ouvrir un Pull Request ou à signaler des problèmes sur la page des issues.

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENCE](LICENCE) pour plus de détails.

---

N'oubliez pas d'ajouter tous les fichiers nécessaires (comme une LICENCE) mentionnés dans le README si vous prévoyez de rendre votre projet public. Vous devrez également vous assurer que toutes les informations sensibles (comme les clés privées) sont sécurisées et ne sont pas poussées dans le dépôt git.
