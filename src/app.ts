#! /usr/bin/env node
import shell from "shelljs";
import { rimrafSync } from "rimraf";
import { readFileSync, readSync, writeFileSync } from "fs";
import path from "path";

const main = async () => {
  const root = process.argv[2] || ".";
  const rootPath = path.resolve(root);
  const myPath = path.resolve(process.argv[1]);
  let resStr: string;
  rimrafSync(root);
  shell.mkdir(root);
  shell.cd(root);
  shell.exec("git init");
  shell.exec("npm init -y");
  //   copy files
  shell.cp("-r", path.join(myPath, "..", "..", "files", "*"), ".");
  shell.cp("-r", path.join(myPath, "..", "..", "files", ".*"), ".");
  //   read package.json file
  const packageJson = JSON.parse(
    readFileSync(path.join(rootPath, "package.json"), "utf-8")
  );
  packageJson.description =
    "Created with create-node-express-ts by BrightkyEfoo";
  packageJson.scripts.start = "npm run build && node build/src/app.js";
  packageJson.scripts.build = "rimraf ./build && tsc";
  packageJson.scripts.dev = "ts-node-dev --respawn --transpile-only src/app.ts";
  packageJson.devDependencies = {
    "@types/bcrypt": "^5.0.1",
    "@types/config": "^3.3.2",
    "@types/cors": "^2.8.15",
    "@types/express": "^4.17.20",
    "@types/jsonwebtoken": "^9.0.4",
    "@types/morgan": "^1.9.9",
    "ts-node-dev": "^2.0.0",
    "@types/node": "^20.8.10",
    "@types/serve-favicon": "^2.5.7",
    morgan: "^1.10.0",
    rimraf: "^5.0.5",
  };
  packageJson.dependencies = {
    bcrypt: "^5.1.1",
    config: "^3.3.9",
    cors: "^2.8.5",
    express: "^4.18.2",
    jsonwebtoken: "^9.0.2",
    dotenv: "^16.3.1",
    "serve-favicon": "^2.5.0",
    zod: "^3.22.4",
  };

  writeFileSync(
    path.join(rootPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
  //   shell.exec("npm i");
  //   shell.exec("npm run dev");
  //   Start spinner
  // shell.cd(path.resolve(root));
  resStr = shell.exec("npm i");
  //   stop spinner

  shell.echo(`
  Success. 
  go to your new folder and Try to run npm run dev
  `);
};

main();
