#! /usr/bin/env node
import shell from "shelljs";
import { rimrafSync } from "rimraf";
import { readFileSync, readSync, writeFileSync } from "fs";
import { createInterface } from "readline";
import path from "path";
import { exit } from "process";
import colors from "colors";
import loadingSpinner, { LoadingSpinner } from "loading-spinner";

const main = async () => {
  const root = process.argv[2] || ".";
  const rootPath = path.resolve(root);
  const myPath = path.resolve(process.argv[1]);
  let resStr: string;
  // try remove directory
  try {
    startSpinner();
    if (root === ".") {
      console.log(colors.blue("Delete all files"));
      rimrafSync("./*");
    } else {
      console.log(colors.blue("Delete folder " + root));
      rimrafSync(root);
    }
  } catch (error) {
    console.log(colors.red("error"), error);
    exit(1);
  } finally {
    stopSpinner();
  }
  console.log(colors.green("Delete succeeded"));

  shell.mkdir(root);
  shell.cd(root);


  startSpinner();
  console.log(colors.blue("initialize git"));
  shell.exec("git init");
  console.log(colors.green("success"));
  stopSpinner();

  startSpinner();
  console.log(colors.blue("initialize npm project"));
  shell.exec("npm init -y");
  console.log(colors.green("success"));
  stopSpinner();

  //   copy files
  startSpinner();
  console.log(colors.blue("Copy project files"));
  shell.cp("-r", path.join(myPath, "..", "..", "files", "*"), ".");
  shell.cp("-r", path.join(myPath, "..", "..", "files", ".*"), ".");
  console.log(colors.blue("success"));
  stopSpinner();

  //   read package.json file
  startSpinner();
  console.log(colors.blue("add dependencies to package.json"));
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
  console.log(colors.green("success"));
  stopSpinner();

  //   shell.exec("npm i");
  //   shell.exec("npm run dev");
  //   Start spinner
  // shell.cd(path.resolve(root));
  startSpinner();
  console.log(colors.blue("installing project dependencies"));
  resStr = shell.exec("npm i");
  console.log(colors.green("success"));
  stopSpinner();
  
  //   stop spinner

  shell.echo(`
  Success. 
  go to your new folder and Try to run npm run dev
  `);
};

main();

function startSpinner() {
  (loadingSpinner as LoadingSpinner).start(
    100, // Interval (in ms) between each spinner sequence element
    {
      clearChar: true, // Clear the spinner when stop() is called
      clearLine: true, // Clear the entire line when stop() is called
      doNotBlock: false, // Does not prevent the process from exiting
      hideCursor: true, // Hide the cursor until stop() is called
    }
    ,
    
  );
}

function stopSpinner() {
  (loadingSpinner as LoadingSpinner).stop();
}
