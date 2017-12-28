#### Delete Based on Pattern
redis-cli -a `<auth`> -n `<db`> KEYS "`<pattern`>" | xargs redis-cli -a `<auth`> -n `<db`>  DEL
