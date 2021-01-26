FROM node:14.11.0

# timezone lang
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

# system update
RUN apt-get update && \
    apt-get install -y vim

WORKDIR /usr/src/app
COPY . .

RUN npm install -g nodemon
RUN yarn install
