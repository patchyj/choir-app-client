FROM node:12
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install -g serve
COPY . /app
RUN npm run build
CMD serve -p $PORT -s build