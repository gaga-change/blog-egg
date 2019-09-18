FROM node:12.10.0-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm --registry https://registry.npm.taobao.org install --production --silent && mv node_modules ../
# RUN npm --registry https://registry.npm.taobao.org install --production --silent
RUN npm install --production --silent
COPY . .
EXPOSE 80
CMD npm start