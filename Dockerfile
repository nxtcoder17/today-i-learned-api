FROM node:current-alpine3.10
WORKDIR /app
COPY ./env/My_Project-05573916050d.json /app/google-application-credentials.json
COPY dist /app/dist/
COPY package.json /app/
EXPOSE 3000
CMD ["npm", "start"]
