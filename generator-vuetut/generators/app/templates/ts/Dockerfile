FROM node:carbon

WORKDIR /usr/src/app

RUN npm install npm@latest -g
COPY package*.json ./
RUN npm -v
RUN node -v
RUN npm ci

<% if (nodeServerPresets) { %>
# Proxy / mock-server
# ENV PORT=<PORT>
# ENV PROXY_URL=<URL>

COPY server/package*.json ./server/
RUN cd server/ && npm ci && cd ../
<% } %>

COPY . .

# RUN npm run build
<% if (nodeServerPresets) { %>
# EXPOSE <PORT>
<% } %>
# CMD [ "npm", "run", "build" ]
<% if (nodeServerPresets) { %>
# CMD [ "npm", "run", "docker-server" ]
<% } %>
