## Postgres Cheats

#### Check All PG Processes
select * from pg_stat_activity where state = 'active';

#### Stop a PG Process
select pg_cancel_backend(`<pid`>)

#### Get All Schemas from a db
select nspname from pg_namespace;
