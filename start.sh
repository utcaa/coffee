if [ ! -d "/output/coffee/logs/" ]; then
  sudo mkdir -p "/output/coffee/logs/"
  sudo chmod -R 777 "/output/coffee/logs"
fi 
npm install --no-optional
npm start
