FROM node:20-alpine3.21 As base 

WORKDIR /app

COPY package.json package-lock.json ./

RUN \
if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \ 
elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
else echo "Lockfile not found." && exit 1; \
fi

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
#End of Dockerfile
#docker build -t davidbolarinwa/david_wealth_site_devops:latest .
# i used the "--legacy-peer-deps" flag to avoid peer dependency issues 
# An error is occurring because your project is using React 19.1.0, but one of your dependencies, 
#typewriter-effect@2.21.0, requires React 17.x or 18.x. This is causing a peer dependency conflict during the npm installation step."
#BY David Bolarinwa 