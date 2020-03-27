sudo apt-get update
sudo apt-get install build-essential libssl-dev

curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh -o install_nvm.sh

bash install_nvm.sh
source ~/.profile

nvm install 10
sudo apt-get install libx11-xcb1 libxcomposite1 libxi6 libxext6 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0
