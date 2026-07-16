FROM node:24.14.0-alpine

WORKDIR /app

# TODO: copy package.json/package-lock.json first (χώρια από τον υπόλοιπο κώδικα)
# ώστε το npm install να γίνεται cache-άρει από το Docker layer caching

# TODO: npm install

# TODO: copy τον υπόλοιπο κώδικα μέσα στο container

# TODO: prisma generate (χρειάζεται πριν το build, το Prisma Client πρέπει να υπάρχει)

# TODO: build το TypeScript (npm run build)

# TODO: expose το port που ακούει ο server (δες .env / index.ts)

# TODO: CMD -> τι εντολή θα τρέξει όταν ξεκινάει το container;
# (σκέψου: χρειάζεται να τρέξουν migrations πριν ξεκινήσει ο server;)