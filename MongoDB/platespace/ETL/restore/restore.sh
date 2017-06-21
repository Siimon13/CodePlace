#!/bin/bash

export PRIMARY="<PRIMARY>"
export USERNAME="root"
export PASSWORD="root"

exists()
{
    command -v "$1" >/dev/null 2>&1
}

if exists mongorestore; then
    mongorestore --host $PRIMARY --ssl -u $USERNAME -p $PASSWORD --drop  --authenticationDatabase admin dump
else
    echo 'Your system does not have mongorestore, please go to https://www.mongodb.com/download-center#community and download 3.4.4 package of MongoDB'
fi


