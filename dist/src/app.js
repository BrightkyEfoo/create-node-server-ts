#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const rimraf_1 = require("rimraf");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const root = process.argv[2] || ".";
    const rootPath = path_1.default.resolve(root);
    const myPath = path_1.default.resolve(process.argv[1]);
    let resStr;
    (0, rimraf_1.rimrafSync)(root);
    shelljs_1.default.mkdir(root);
    shelljs_1.default.cd(root);
    shelljs_1.default.exec("git init");
    shelljs_1.default.exec("npm init -y");
    //   copy files
    shelljs_1.default.cp("-r", path_1.default.join(myPath, "..", "..", "files", "*"), ".");
    shelljs_1.default.cp("-r", path_1.default.join(myPath, "..", "..", "files", ".*"), ".");
    //   read package.json file
    const packageJson = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(rootPath, "package.json"), "utf-8"));
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
    (0, fs_1.writeFileSync)(path_1.default.join(rootPath, "package.json"), JSON.stringify(packageJson, null, 2));
    //   shell.exec("npm i");
    //   shell.exec("npm run dev");
    //   Start spinner
    // shell.cd(path.resolve(root));
    resStr = shelljs_1.default.exec("npm i");
    //   stop spinner
    shelljs_1.default.echo(`
  Success. 
  go to your new folder and Try to run npm run dev
  `);
});
main();
