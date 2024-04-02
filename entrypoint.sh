#!/bin/bash
# entrypoint.sh

# Wait for SQL Server to start up
# You can adjust the sleep time or make a loop to check if SQL Server is ready
sleep 20s

# Run the initialization script
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Mdpsecurise12." -i /usr/src/app/init-sql-server.sql

# Start the main process (keep the container running)
exec /opt/mssql/bin/sqlservr