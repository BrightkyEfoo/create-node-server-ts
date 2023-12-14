# Installation

`npm i -g create-node-express-ts`

# Projects structure

Now we implement only one project structure as in the image below<br/>
![img](https://raw.githubusercontent.com/BrightkyEfoo/create-node-server-ts/3409a4a6d9079ab43b7b37a43f614ef59361dfac/assets/Capture.PNG?token=GHSAT0AAAAAACJZNTLVQHTI2U25BACY46MYZLLG3EA)

## folders

### assets

this where you should put all assets files of your project

### src

It's he source code folder, where to store all of your typescript files

#### controllers

This folder shoud be used to store all of your express functions controllers like

```
export const readAllAppHandler = async (req: Request, res: Response) => {
  try {
    const apps = await appService.readAll();
    res.json(apps);
  } catch (error: any) {
    errHandler(error, res, "error reading all apps");
  }
};

```

#### database

It's where you should store your models and mock data
you can evenly add another file for exporting functions related to manage connection to your database. This folder is seperate into 2 sub-folders :

- mock
- models

#### middlewares

here's where you should save your middleware functions

#### routes

Define all of your api routes and endPoints

#### schemas

Save Schemas for zod validation or any validation library you want

#### services

Here you have to save all your services

#### typescript

Store your <span style="color:green;">types</span>, <span style="color:green;">interfaces</span> etc...

#### utils

Here you can store all functions that you think they're very usefull, like a errorHandler maybe. Just an example :

```
import { Response } from "express";

function errHandler(error: any, res: Response, message: string) {
  console.log("error", error);
  return res.status(400).json({
    message,
    error: error.message,
  });
}

export default errHandler;
```

# Dependencies and devDependencies

```
"devDependencies": {
    "@types/bcrypt": "^5.0.1",
    "@types/config": "^3.3.2",
    "@types/cors": "^2.8.15",
    "@types/express": "^4.17.20",
    "@types/jsonwebtoken": "^9.0.4",
    "@types/morgan": "^1.9.9",
    "ts-node-dev": "^2.0.0",
    "@types/node": "^20.8.10",
    "@types/serve-favicon": "^2.5.7",
    "morgan": "^1.10.0",
    "rimraf": "^5.0.5"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "config": "^3.3.9",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "serve-favicon": "^2.5.0",
    "zod": "^3.22.4"
  }
```

# Usage

Open a terminal, then install the package globally using this command : `npm i -g create-node-express-ts`
Then navigate to the parent folder of the folder you want populate.
Then run the command `create-node-server-ts [projectFolder]`
if You want use js anyway for your server code, then you can add the flag `--template=js` after the previous command and run it. The project will be initialized without TypeScript but rather with JavaScript. And the validation library will be Joi instead of Zod
It will take a couple of minutes it depend on your network speed, but be patient.
after that you have to navigate to the project folder and just run `npm run dev`
then open your favorite browser and navigate to http://localhost:9000

It's ok your express using server is already created. and configured

