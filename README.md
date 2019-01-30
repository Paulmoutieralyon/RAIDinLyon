Bienvenue dans RaidInLyon,

Pour récupérer l'ensemble du projet il vous faut aller sur cette adresse :

https://github.com/Paulmoutieralyon/RAIDinLyon 

puis fork la branche dev.


Pour lancer le projet il vous faudra suivre quelques étapes, les voici :

- lancer via le terminal à la racine du projet les variables environnements suivantes, voici la commande à taper :

export userPass="raiddinguedetoi69" export userId="RaidWild"



- lancer, toujours via le terminal à la racine du projet, le server via cette commande :

node server.js


- ensuite, ouvrir votre navigateur ( google chrome ....) et mettre l'adresse suivante :

localhost:5000


et voilà pour le côté front de l'appli (côté utilisateur).


Pour le côté Back (Base de données...)

sur le navigateur (google chrome...) rajouter : 

/admin   à la page page d'acceuil de l'appli. 

Pour la base de données,

elle est hébérgée sur https://mlab.com/ , pour vous connecter ils vous suffit de rentrer les identifiants suivants :

USERNAME : RaidWild
PASSWORD : raiddinguedetoi


Pour ce qui est de l'architecture du code, voici le résumé :
 
 Le back se trouve à la racine (server.js...)

 le front est organisé dans raidapp, dedans il y'a deux dossiers : 
 
 Admin et Utilisateur.

 dans le dossier Utilisateur il y'a 3 sous dossiers :

 EnigmePage, HomePage et MapPage




 petite astuce :

 pour rentrer les coordonnées GPS lors de la création d'une énigme. Vous trouverez les ceux-ci sur le site :

 https://www.coordonnees-gps.fr/
