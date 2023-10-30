# Folosește o imagine de bază Node.js
FROM node:18.17.1

# Setează directorul de lucru în container
WORKDIR /app

# Copiază pachetul de dependențe și fișierele de configurare
COPY package*.json ./
COPY angular.json .

# Instalează dependențele
RUN npm install

# Instalează Angular CLI global
RUN npm install -g @angular/cli

# Copiază codul sursă
COPY . .

# Compilează aplicația
RUN ng build

# Comanda pentru a porni aplicația Angular
CMD ["ng", "serve"]
