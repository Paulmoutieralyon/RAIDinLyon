Bienvenue dans RaidInLyon ! 

## RÉCUPÉRER LE PROJET SUR GITHUB 

https://github.com/Paulmoutieralyon/RAIDinLyon 

puis forkez la branche **chicken** (La branche dev et master ne sont pas les bonnes versions. Celle déployée est la "chicken").


### CONCERNANT LA BASE DE DONNÉE 

Elle est hébérgée sur https://mlab.com/ , pour vous connecter ils vous suffit de rentrer les identifiants présents sur le Word du dossier livré avec le projet.  


### LANCER LE PROJET EN LOCAL : 

1. Lancez via le terminal à la racine du projet les variables environnements suivantes, voici la commande à taper :

> export userPass="raiddinguedetoi69" export userId="RaidWild"


2. lancer, toujours via le terminal à la racine du projet, le server via cette commande :

> node server.js


3 - ensuite, ouvrir votre navigateur ( de préférence google chrome) et mettre l'adresse suivante :

> localhost:5000  


Vous êtes sur l'application, côté utilisateur. Pour accéder au coté administrateur, ajoutez "/admin" à l'URL.  




### CONCERNANT L'ARCHITECTURE DES DOSSIERS DU CODE#
 
 Le back se trouve à la racine du dossier et se compose des dossiers suivants : "Collections", "Models" et du fichier "server.js"  
 - Models : Il se compose des schema mongoDB
 - Collections : Il s'agit de fichiers JSON basiques pour chaque partie de la base de donnée alors que cette dernière n'était pas encore en ligne. On les laisse, toujours disponibles, ca peux servir ... !  
 
Retrouvez toute la partie front dans le dossier "Raid-app", dossier "src". Les dossiers Admin et Utilisateur sont au complet.


### L'astuce des coordonnées géographiques :

L'application nécéssite des coordonnées géographiques. N'hésitez pas à trouvez ces dernieres sur le site https://www.coordonnees-gps.fr/
