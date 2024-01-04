#Arrancamso desde una imagen de node, en este caso la versión 14
FROM node:14-alpine
#Seteamos cual va a ser la carpeta de trabajo dentro del contenedor.
WORKDIR /app
#Nos aseguramos de copiar el json con la definición de todos los paquetes 
#que vamos a necesitar para que nuestra apicación ejecute correctamente.
COPY package*.json ./
#Procedemos con la instalación de todos los paquetes mencionados anteriormente.
RUN npm install
#Copiamos la instalación en si misma.
COPY . .
#Nuestro contenedor expondrá y podrá ser accedido a través del puerto 3000
EXPOSE 3000
#Lanzamos el webserver para que la aplicación se ejecute y pueda ser navegada.
CMD ["npm", "start"]
