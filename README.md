
Folder Structure and Setup Instructions

client/
  App.jsx        -> React component with form and listing
  index.jsx      -> React entry point

server/
  index.js       -> Express server entry
  .env           -> Environment config
  routes/projects.js         -> Project routes
  models/Project.js          -> Mongoose schema
  controllers/projectController.js -> Controller logic

To run backend:
  cd server
  npm install
  node index.js

To run frontend (after vite init):
  cd client
  npm install
  npm run dev
