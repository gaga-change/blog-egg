FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm --registry https://registry.npm.taobao.org install --production --silent && mv node_modules ../
COPY . .
EXPOSE 9876
CMD node app/index.js