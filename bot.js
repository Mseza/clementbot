const Discord = require('discord.js');
const client = new Discord.Client();

var proposingMember = '';
var awaitedMessage = '';
var waitingAnswer = false;
var existing = false;
var awaitedAnswer = '';
var waitingApprove = false;
var customMessage = [];
var customAnswer = [];
var prefixe = "!";
var commandList = ['!say', '!shifumi', '!spoil', '!delete', '!spam', '!rename', '!addcommand', '!mute', '!demute', '!stopcommand', '!reusecommand', '!add', 'salut', 'yo', '\\o/', 'clément', 'ping', 'pong', '!see', 'onleye', 'lucas', 'mseza', 'archnova', 'tom', 'skryzad', 'loris', 'nathan', 'rorisu le vrai', '!help'];
var secretChannel = '';
var command = '';

client.on('ready', () => {

  console.log('I am ready!');

});

let spolier = '';

client.on('presenceUpdate', (oldMember, newMember) => {

  var channel = client.channels.get('367718654390829056');

  if(newMember.user.presence.status === 'online' && oldMember.user.presence.status === 'offline'){

    channel.send(newMember.user + ' s\'est connecté');

  }

});

client.on('message', message => {

  var secretChannel = client.channels.get('380363554722676736');

  if(waitingAnswer === true && message.author === proposingMember){

      awaitedAnswer = message.content;
      message.reply(" merci d'avoir soumis cette commande, en attente de l'approbation de mon maître");
      waitingAnswer = false;

      secretChannel.send('La commande suivante a été proposé : ');
      secretChannel.send(awaitedMessage);
      secretChannel.send('Avec cette réponse : ');
      secretChannel.send(awaitedAnswer);
      secretChannel.send('Approuvez-vous cette commande ?');
      waitingApprove = true;

  }

  if(message.channel === secretChannel){

    if(waitingApprove === true){

      if(message.content === 'approve'){
        customMessage.push(awaitedMessage);
        customAnswer.push(awaitedAnswer);
        awaitedMessage = '';
        awaitedAnswer = '';
        waitingApprove = false;
        proposingMember.send("La commande que vous avez proposé a été approuvée");

      } else if(message.content === 'disapprove'){

        awaitedMessage = '';
        awaitedAnswer = '';
        waitingApprove = false;
        proposingMember.send("La commande que vous avez proposé a été désapprouvée");

      }

    }

  }

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
      else if(command === 'addcommand'){

        if(message.content != ''){

            awaitedMessage = message.content.split(" ").slice(1).join(" ");
            message.reply('Tapez ce que je dois répondre à cette phrase');
            proposingMember = message.author;
            waitingAnswer = true;

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
            name: "Commandes sans paramètre",
            value: "- **salut** ou **yo** : pour me dire bonjour ;)\n- **ping** : pong \n- **pong** : ping\n- **\\o/** : J’adore lever les mains :)\n- **Une personne du serveur** : ce que je pense de lui\n-"
          },
          {
            name: "Commandes avec paramètres",
            value: "- **!add** + *nombres* : fait l’addition de ces nombres\n- **!say** + *message* : je dis le message que tu veux que je dise\n- **!rename** + *pseudo* + *nom* : renomme un membre par un nouveau nom, si aucun nom n’est spécifié, ce sera lui qui sera renommé\n- **!delete** + *nombre* : supprime un certain nombre de message au dessus\n- **!spam** + *nombre* + *message* : spam un certain nombre de fois un message, si aucun nombre n’est spécifié, le message sera spam 10 fois\n- **!spoil** + *message* : créer un spoiler sur ce message en le supprimant, la commande **!see** permet à une personne de voir ce spoiler."
          }
        ],
        footer: {
          text: "RAPPEL : Les gros mots sont interdits !"
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

client.login(process.env.BOT_TOKEN);
