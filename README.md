# Cesiveroo une application qui va révolutionner la livraison de nouriture

## Our Backend : SQL Server and MongoDB
Démarer le Backend: `docker compose up`

### MongoDB
**Se connecter à notre base en terminal**
<br>
`docker exec -it mongodb mongosh --port 27017`

### SQL Server
**Se connecter à notre base en terminal**
<br>
`docker exec -it sqlserver /bin/bash`
<br>
`/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Mdpsecurise12."`

**Récupérer les noms de base de données**
Remarque: Pour faire ça en terminal il faut avoir réalisé l'étape précédente
<br>
`SELECT name FROM master.sys.databases;`
<br>
`GO`
