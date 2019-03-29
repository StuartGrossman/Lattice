Run Commands :

NPM INSTALL 


"build": "webpack --mode production",
"start": "npm run build && node src/server/index.js",
"client": "webpack-dev-server --mode development --devtool inline-source-map --hot",
"server": "nodemon src/server/index.js",
"test-unit": "mocha ./src/server/server-spec/index.spec.js",
"dev": "concurrently \"npm run server\" \"npm run client\""


MUST ADD YOUR OWN API KEY FILE - env.json in the root of the project

{"api_Key": "723424234324234"}
