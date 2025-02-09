#!/usr/bin/env node
import inquirer from "inquirer";
import { Command } from "commander";
import { selection } from "./src/download.js";
import { remDir, setDir } from "./src/folder.js";
const program = new Command();

const questions = [
  [
    {
      type: "string",
      name: "path",
      message: "folder path to download videos?",
    },
  ],
  [
    {
      type: "confirm",
      name: "removal",
      message: "do you want to remove custom download folder directory?",
    },
  ],
  [
    {
      type: "string",
      name: "videoLink",
      message: "youtube video link address?",
    },
    {
      type: "list",
      name: "selection",
      message: "video or audio download?",
      choices: ["video", "audio"],
    },
  ],
  [
    {
      type: "string",
      name: "videoLink",
      message: "youtube video link address?",
    },
  ],
];

program
  .name("ydlr-cli")
  .description("a simple and easy to use youtube cli downloader")
  .usage("<command>")
  .version("1.0.0");

program
  .command("setDirectory")
  .alias("sdir")
  .description("sets a custom download directory path")
  .action(() => {
    inquirer.prompt(questions[0]).then((answers) => {
      setDir(answers);
    });
  });

program
  .command("removeDirectory")
  .alias("rdir")
  .description("removes custom download directory path")
  .action(() => {
    inquirer.prompt(questions[1]).then((answers) => {
      answers.removal === true ? remDir() : console.info("action aborted");
    });
  });
program
  .command("download")
  .alias("dld")
  .description("downloads a youtube video or audio")
  .action(() => {
    inquirer.prompt(questions[2]).then((answers) => {
      selection(answers.videoLink, answers.selection);
    });
  });

program.parse(process.argv);
