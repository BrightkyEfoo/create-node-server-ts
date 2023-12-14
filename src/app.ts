#! /usr/bin/env node
import shell from "shelljs";
import { rimrafSync } from "rimraf";
import { readFileSync, readSync, writeFileSync } from "fs";
import { createInterface } from "readline";
import path from "path";
import { exit } from "process";
import colors from "colors";
import loadingSpinner, { LoadingSpinner } from "loading-spinner";

const mainTs = async () => {
  const root = process.argv[2] || ".";
  const rootPath = path.resolve(root);
  const myPath = path.resolve(process.argv[1]);
  let resStr: string;
  // try remove directory
  try {
    if (root === ".") {
      console.log(colors.blue("Delete all files"));
      startSpinner();
      rimrafSync("./*");
    } else {
      console.log(colors.blue("Delete folder " + root));
      startSpinner();
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

  console.log(colors.blue("initialize git"));
  startSpinner();
  shell.exec("git init");
  console.log(colors.green("success"));
  stopSpinner();

  console.log(colors.blue("initialize npm project"));
  startSpinner();
  shell.exec("npm init -y");
  console.log(colors.green("success"));
  stopSpinner();

  //   copy files
  console.log(colors.blue("Copy project files"));
  startSpinner();
  shell.cp("-r", path.join(myPath, "..", "..", "files", "*"), ".");
  shell.cp("-r", path.join(myPath, "..", "..", "files", ".*"), ".");
  console.log(colors.blue("success"));
  stopSpinner();

  //   read package.json file
  console.log(colors.blue("add dependencies to package.json"));
  startSpinner();
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
  console.log(colors.blue("installing project dependencies"));
  startSpinner();
  resStr = shell.exec("npm i");
  console.log(colors.green("success"));
  stopSpinner();

  //   stop spinner

  shell.echo(`
  Success. 
  go to your new folder and Try to run npm run dev
  `);
};

const mainJs = () => {
  const root = process.argv[2] || ".";
  const rootPath = path.resolve(root);
  const myPath = path.resolve(process.argv[1]);
  let resStr: string;
  // try remove directory
  try {
    if (root === ".") {
      console.log(colors.blue("Delete all files"));
      startSpinner();
      rimrafSync("./*");
    } else {
      console.log(colors.blue("Delete folder " + root));
      startSpinner();
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

  console.log(colors.blue("initialize git"));
  startSpinner();
  shell.exec("git init");
  console.log(colors.green("success"));
  stopSpinner();

  console.log(colors.blue("initialize npm project"));
  startSpinner();
  shell.exec("npm init -y");
  console.log(colors.green("success"));
  stopSpinner();

  //   copy files
  console.log(colors.blue("Copy project files"));
  startSpinner();
  shell.cp("-r", path.join(myPath, "..", "..", "files", "*"), ".");
  shell.cp("-r", path.join(myPath, "..", "..", "files", ".*"), ".");
  console.log(colors.blue("success"));
  stopSpinner();

  //   read package.json file
  console.log(colors.blue("add dependencies to package.json"));
  startSpinner();
  const packageJson = JSON.parse(
    readFileSync(path.join(rootPath, "package.json"), "utf-8")
  );
  packageJson.description =
    "Created with create-node-express-ts by BrightkyEfoo";
  packageJson.scripts.start = "node src/app.js";
  packageJson.scripts.dev = "nodemon scr/app.js";
  packageJson.devDependencies = {
    "@types/bcrypt": "^5.0.1",
    "@types/config": "^3.3.2",
    "@types/cors": "^2.8.15",
    "@types/express": "^4.17.20",
    "@types/jsonwebtoken": "^9.0.4",
    "@types/morgan": "^1.9.9",
    "@types/node": "^20.8.10",
    "@types/serve-favicon": "^2.5.7",
    morgan: "^1.10.0",
    nodemon: "^3.0.1",
  };
  packageJson.dependencies = {
    bcrypt: "^5.1.1",
    config: "^3.3.9",
    cors: "^2.8.5",
    express: "^4.18.2",
    jsonwebtoken: "^9.0.2",
    dotenv: "^16.3.1",
    "serve-favicon": "^2.5.0",
    joi: "^17.11.0",
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
  console.log(colors.blue("installing project dependencies"));
  startSpinner();
  resStr = shell.exec("npm i");
  console.log(colors.green("success"));
  stopSpinner();

  //   stop spinner

  shell.echo(`
  Success. 
  go to your new folder and Try to run npm run dev
  `);
};

const main = () => {
  if (process.argv.indexOf("--template=js") > -1) {
    console.log("js template");
    mainJs();
  } else {
    console.log("default-template ts");
    mainTs();
  }
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
  );
}

function stopSpinner() {
  (loadingSpinner as LoadingSpinner).stop();
}
