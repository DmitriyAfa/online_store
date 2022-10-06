# Интернет-магазин

## About pgAdmin 4

If you can't connect to the server after "please enter the password for the user 'postgres' to connect the server - "postgresql 14" --->
You can go to ...PostgreSQL\14\data and find pg_hba.conf. You need to change all scram-sha-256 to trust. --->
Open pgAdmin and try to put any pass and press OK.
That's what helped me.

https://stackoverflow.com/questions/64198359/pg-admin-4-password-for-postgres-user-when-trying-to-connect-to-postgresql-1
