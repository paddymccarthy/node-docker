FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
    echo 'IN IF'; \
    npm install ; \
    else \
    echo 'IN ELSE'; \
    npm install --production ; \
    fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]