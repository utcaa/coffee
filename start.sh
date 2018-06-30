if [ ! -d "/output/coffee/logs/" ]; then
  sudo mkdir -p "/output/coffee/logs/"
fi 
npm install --no-optional
npm start