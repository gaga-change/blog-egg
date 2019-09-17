FROM node:8.9-alpine
ENV NODE_ENV production
ENV PORT 80
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm --registry https://registry.npm.taobao.org install --production --silent && mv node_modules ../
RUN npm --registry https://registry.npm.taobao.org install --production --silent
COPY . .
EXPOSE 80
CMD node app/index.js