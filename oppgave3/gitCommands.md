# oppgave 3
* git init
* git add README.md
* git commit -m "first commit"
* git branch -M master
* git remote add origin https://github.com/GossipDolphin/webApplikasjonerOblig3.git
* git push -u origin master
* git checkout -b dev   //lage ny branch med navn dev
* git push --set-upstream origin dev //lag upstream til github
* touch hiof.js
* git add hiof.js
* git commit -m "Lagt Til hiof.js"
* git push -u origin dev
* git fetch // hent endringer
* git pull // hent endringer
* git checkout master // switch tilbake til master branch
* git merge dev // merge endringer fra dev inn i master
* git add . //add alle endringene
* git commit -m "updateFromDev" //commit endringene som er fra dev branchen
* git push // så er alt oppdatert