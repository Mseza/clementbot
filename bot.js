const Discord = require('discord.js');
const client = new Discord.Client();

let dico = ["chien", "livre", "meuble", "ordinateur", "lit", "fleur", "jambe", "bras", "ossement", "bougie"];
let wordSelected = "";
let letterKnown = [''];
let actualWord = "";
let player = "";
let isPlaying = false;
let essai = 9;
let letterInWord = false;
let yetLetter = false;
let gameChannel = "";
let prefixe = "!";

client.on('ready', () => {

  console.log('I am ready!');
  gameChannel = client.channels.get('381565314376138762');

});

let spolier = '';

client.on('presenceUpdate', (oldMember, newMember) => {

  var channel = client.channels.get('367718654390829056');

  if(newMember.user.presence.status === 'online' && oldMember.user.presence.status === 'offline'){

    channel.send(newMember.user + ' s\'est connecté');

  }

});

client.on('message', message => {

  let command = "";
  
    if(message.content.startsWith(prefixe)){

      command = message.content.split(" ")[0];
      command = command.split(prefixe)[1].toLowerCase();
      
    }

    let word = message.content.toLowerCase();

    let args = message.content.split(" ").slice(1).join(" ").toLowerCase();

      if(message.author.bot) return;

      if(command === 'say') {
        message.delete();
        args = message.content.split(" ").slice(1).join(" ");
        message.channel.send(args);
      }
      else if(command === "shifumi"){
        let numberChosen = Math.floor(Math.random() * 3 + 1);
        let signBot = "";

        if(numberChosen === 1){
          signBot = "pierre";
        }
        if(numberChosen === 2){
          signBot = "feuille";
        }
        if(numberChosen === 3){
          signBot = "ciseaux";
        }

        if(args === "pierre" || args === "feuille" || args === "ciseaux"){
          message.channel.send("J'ai choisi **" + signBot + "** et tu as choisi **" + args + "**.");
        }

        if(args === "pierre" && signBot === "feuille"){
          message.channel.send("La **pierre** perd contre la **feuille**, vous avez *perdu* !")
        }
        else if(args === "pierre" && signBot === "ciseaux"){
          message.channel.send("La **pierre** gagne contre les **ciseaux**, vous avez *gagné* !")
        }
        else if(args === "feuille" && signBot === "ciseaux"){
          message.channel.send("La **feuille** perd contre les **ciseaux**, vous avez *perdu* !")
        }
        else if(args === "feuille" && signBot === "pierre"){
          message.channel.send("La **feuille** gagne contre les **pierre**, vous avez *gagné* !")
        }
        else if(args === "ciseaux" && signBot === "feuille"){
          message.channel.send("Les **ciseaux** gagnent contre la **feuille**, vous avez *gagné* !")
        }
        else if(args === "ciseaux" && signBot === "pierre"){
          message.channel.send("Les **ciseaux** perdent contre la **pierre**, vous avez *perdu* !")
        }
        else if (args === signBot) {
          message.channel.send("Nous avons tous les deux choisi **" + signBot + "**, *match nul* !")
        }
        else {
          message.channel.send("```!shifumi [pierre, feuille ou ciseaux] pour jouer !```");
        }

      }
      else if(command === 'spoil') {
        message.delete();
        spoiler = args;
        message.channel.send(message.author + " a dit un spoiler, dites !!see pour le consulter");
      }
      else if(command === 'delete') {

        let count = 0;

        if(args === ''){

          count = 99;

        } else {

          count = parseInt(message.content.split(" ")[1]);

        }

        if(Number.isNaN(count)){

          message.reply('Apprends à écrire un nombre');

        }

        else if(count < 1 || count > 99){

          message.reply('Un nombre entre 1 et 99 s\'il te plaît !');

        }

        else {

          message.channel.fetchMessages({limit: count + 1})
          .then(messages => {
            let messagesArr = messages.array();
            let messageCount = messagesArr.length;

            message.channel.bulkDelete(messageCount);
            message.reply(messageCount - 1 + ' messages ont été supprimé')

          })

        }

      }
      else if(command === 'spam') {

        let count = 0;
        count = parseInt(message.content.split(" ")[1]);
        let order = 2;
        let spammed = '';

        if(Number.isNaN(count)){

          count = 10;
          order = 1;

        }

        if(count < 1){

          message.channel.send("Euh " + message.author + " comment tu veux spammer ' + count + ' fois un message ?");

        }

        else if (message.author.id === '238624444036284417') {

          spammed = (message.content.split(" ").slice(order));
          spammed = spammed.join(' ');

          if(message.mentions.members.first() != undefined || message.content.includes('@everyone')){

            message.reply('Ne spam pas en mentionnant quelqu\'un !');

          } else if(count > 20) {

            message.reply('Désolé, t\'as une limite fixée à 20 toi');

          }

          else {

            for (var i = 0; i < count; i++) {

              message.channel.send(spammed);
            }

          }

        }

        else if (message.author.id === '337176935719370752') {

          spammed = (message.content.split(" ").slice(order));
          spammed = spammed.join(' ');

          for (var i = 0; i < count; i++) {

            message.channel.send(spammed);
          }

        }

        else {

        message.channel.send("Désolé " + message.author + ", t'as pas le droit de spam");

        }

      }
      else if(command === 'rename') {
        let memberC = message.mentions.members.first();
        let nickName = message.content.split(" ").slice(2);

        if (message.mentions.users.size === 0) {

          memberC = message.author;
          nickName = message.content.split(" ").slice(1);
          message.reply('votre pseudo a été remplacé par ' + nickName);

        }

        else if(!memberC) {

          message.reply('apprend à faire une mention bordel !');

        }

        else if (message.mentions.users.size > 1) {

          message.reply("mec, tu mets qu'un nom à la fois, n'en met pas plein !");

        }

        else if (memberC != message.content.split(" ")[1]) {

        message.reply("la mention est au mauvais endroit !");

        }

        else if (message.author.id === '337176935719370752') {

          memberC.setNickname(nickName.join(' '));
          message.reply('son pseudo a été remplacé par ' + nickName);

        }

        else {

          message.reply("mec, t'as cru que tu pouvais jouer avec les noms es autres comma ça toi ?!");

        }

      }
      else if(command === 'add') {
        let numArray = args.split(" ").map(n=> parseInt(n));
        let total = numArray.reduce((p, c) => p+c);
        if(Number.isNaN(total)){

          message.reply('Tu sais pas écrire un nombre où ça se passe coment ?');

        } else {

          message.channel.send(total);

        }

      }
      else if(command === "dice"){
        message.channel.send("J'ai obtenu un **" + Math.floor(Math.random() * 6 + 1) + "** !");
      }
      else if(command === "alea"){
        let min = args.split(" ")[0];
        let max = args.split(" ")[1];
        let aléa = Math.floor(Math.random() * (max - min + 1) + min);
        if(isNaN(aléa) === false && Number.isInteger(parseFloat(min)) === true && Number.isInteger(parseFloat(max)) === true){
          message.channel.send("J'ai tiré au sort **" + aléa + "** !");
        }
      }
      else if(command === "choose"){
        args = args.split(" ");
        let lengthChoices = args.length;
        let aléa = Math.floor(Math.random() * lengthChoices);
        message.channel.send("Je choisirai **" + args[aléa] + "** !");
      }
      else if(command === "remindme"){
        let timer = args.split(" ")[0];
        let multiplicator = 1000;
        let timerText = "secondes"
        if(timer.endsWith("s")){
          timer = timer.split("s")[0];
          multiplicator = 1000;
          timerText = "seconde";
        }
        else if(timer.endsWith("m")){
          timer = timer.split("m")[0];
          multiplicator = 60000;
          timerText = "minute";
        }
        else if(timer.endsWith("s")){
          timer = timer.split("h")[0];
          multiplicator = 3600000;
          timerText = "heure";
        }

        if(timer > 1){
          timerText = timerText + "s";
        }

        let remind = message.content.split(" ").slice(2).join(" ");
        if(isNaN(timer) === false){
          message.channel.send("Je vous rappellerai **" + remind + "** dans **" + timer + " " + timerText + "** !");
          setTimeout(function(){
            message.reply(remind);
          }, timer * multiplicator);
        }
      }
      else if(message.channel = gameChannel){
        
        if(command === "pendu"){

          if(isPlaying === true){

            message.channel.send("Une partie est déjà en cours");

          } else {

            wordSelected = dico[Math.floor(Math.random() * (dico.length))];
            isPlaying = true;
            player = message.author;
            rewrite();
            endTurn();

          }

        }
        else if (isPlaying === true && message.author === player) {

          yetLetter = false;

          for(i = 0; i < dico.length; i++){

            if(letterKnown[i] === command){

              yetLetter = true;

            }

          }

          if(command.length > 1){

            message.reply("vous avez saisi plus d'un caractère");

          } else if(command.toUpperCase() === command){

            message.reply("vous avez saisi un caractère invalide");

          } else if(yetLetter === true) {

            message.reply("vous avez déjà saisi ce caractère");

          } else {

            checkLetter(command);
            endTurn();

          }
          
        }

      }
      else if (word === '\\o/') {
        message.channel.send('\\o/');
      }
      else if (word === 'salut') {
        message.channel.send('Salut ' + message.author);
      }
      else if (word === 'yo') {
        message.channel.send('Wesh ' + message.author + ' tranquille ?');
      }
      else if (word === 'clément') {
        message.channel.send('C\'est moi, le meilleur des bots');
      }
      else if (word === 'ping') {
        message.channel.send('pong');
      }
      else if (word === 'pong') {
        message.channel.send('ping');
      }
      else if(word === '!see'){
        message.author.send('Le spoiler est : "' + spoiler + '"');
      }
      else if (word === 'onleye' || word === 'lucas' || word === 'mseza') {
        message.channel.send('Mon créateur, le best');
      }
      else if (word === 'archnova' || word === 'tom') {
        message.channel.send('Un con (c\'est lui qui le dit), mais il a fait mon icone alors je l\'aime un peu');
      }
      else if(word === 'loris' || word === 'skryzad' || word === 'rorisu le vrai') {
        message.channel.send('ptdr c ki ?');
      }
      else if(word === 'nathan') {
        message.channel.send('Il pue la merde mais comme il rage quit on le remarque pas ? (Suggestion faite par Tom)');
      }
      else if (word === '!help') {

        message.channel.send({embed: {
          color: (0xFFD700),
          title: "Commandes sur ce serveur",
          description: "*Voici les commandes que je possède*",
          fields: [{
            name: "Commandes (sans préfixe) sans paramètre",
            value: "- **salut** ou **yo** : pour me dire bonjour ;) \n- **ping** : pong \n- **pong** : ping\n- **\\o/** : J’adore lever les mains :)\n- **Une personne du serveur** : ce que je pense de lui"
          },
          {
            name: "Commandes diverses (avec le préfixe \"!\") avec paramètres",
            value: "- **add** + *nombres* : fait l’addition de ces nombres\n- **say** + *message* : je dis le message que tu veux que je dise\n- **rename** + *membre* + *nom* : renomme un membre par un nouveau nom, si aucun nom n’est spécifié, ce sera l'auteur du message qui sera renommé\n- **delete** + *nombre* : supprime un certain nombre de message au dessus\n- **spam** + *nombre* + *message* : spam un certain nombre de fois un message, si aucun nombre n’est spécifié, le message sera spam 10 fois\n- **spoil** + *message* : créer un spoiler sur ce message en le supprimant, la commande **see** permet à une personne de voir ce spoiler.\n- **shifumi** + *signe* : on fait une partie de shifumi ?\n- **remindme** + *temps* + *message* : je vous rappelerai dans un certain temps (de base en secondes, mais les suffixes -m et -h existent) un certain message"
          },
          {
            name: "Commandes pour faire un choix aléatoire (avec le préfixe \"!\")",
            value: "- **dice** : je lancerai un dé à 6 faces\n- **alea** + *min* + *max* : je choisirai un nombre entre le min et le max (inclus)\n- **choose** + *propositions* : sépare plusieurs propositions par un espace, j'en choisira une au hasard"
          }
        ],
        footer: {
          text: "RAPPEL : Je suis le BOSS de ce serveur !"
        }

        }
          });
        }
      else {

        for(i = 0; i < customMessage.length; i++){

          if(message.content.toLowerCase() === customMessage[i].toLowerCase()){

            message.channel.send(customAnswer[i]);
            break;

          }

        }

      }

  });

function checkLetter (letter) {

  letterInWord = false;

  for(i = 0; i < wordSelected.length; i++){

    if(wordSelected.substr(i, 1) === letter){

        letterKnown.push(letter);
        letterInWord = true;
        rewrite();
        break;

    }

  }

  if(letterInWord === false){

    essai -= 1;

  }

}

function rewrite () {

  let foundLetter = false;
  actualWord = "";

  for(i = 0; i < wordSelected.length; i++){

    foundLetter = false;

    for(g = 0; g < letterKnown.length; g++){
      if(wordSelected.substr(i, 1) === letterKnown[g]){

          foundLetter = true;
          actualWord = actualWord + letterKnown[g];

      }

    }

    if(foundLetter === false){

      actualWord = actualWord + "- ";

    }

  }

}

function endTurn () {

  let str = " essai";
  if(essai > 1){

    str = str + "s";

  }

  if(essai <= 0){

    gameChannel.send("Vous avez *perdu* ! Le mot à trouver était **" + wordSelected + "**");
    endGame();

  }

  else if(actualWord === wordSelected){

    gameChannel.send("Vous avez *gagné* ! Vous avez trouvé le mot **" + wordSelected + "**");
    endGame();

  } else {

    gameChannel.send("Il vous reste : " + essai + str + "\nVoici le mot que vous devez trouvez : " + actualWord);

  }

}

function endGame () {

  isPlaying = false;
  letterKnown = [''];
  essai = 9;
  player = "";
  wordSelected = "";

}

client.login(process.env.BOT_TOKEN);
