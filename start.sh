#!/bin/bash
echo "creating log folders"
if [ ! -d "/output/coffee/logs/" ]; then
  sudo mkdir -p "/output/coffee/logs/"
  sudo chmod -R 777 "/output/coffee/logs"
fi
echo "installing dependencies"
npm install --no-optional

echo "updating mysql initial databases"
mysql -u root -p < ./app/db/scripts/init.sql

echo "preparing migration"
node ./app/db/scripts/sequelizeConfig.js

echo "starting migration"
node_modules/.bin/sequelize db:migrate

echo "starting seeders"
node_modules/.bin/sequelize db:seed:all

npm start
