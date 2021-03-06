#!/usr/bin/env node
const { argv } = require("yargs");
const exec = require("child_process").exec;
const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const HHX = require("@hhxjs/compiler");

switch (argv._[0]) {
  case "init":
    const spinner = ora({ spinner: "dots8", text: "Loading..." }).start();
    new Promise((resolve) => {
      resolve();
    })
      .then(() => {
        spinner.text = "Creating folders";
        if (argv.init === ".") {
          argv.init = "";
          fs.mkdirSync(`${process.cwd()}/bot`);
          fs.mkdirSync(`${process.cwd()}/utils`);
          fs.mkdirSync(`${process.cwd()}/events`);
        }
        if (!fs.existsSync(`${process.cwd()}/${argv._[1].init}`)) {
          fs.mkdirSync(`${process.cwd()}/${argv._[1]}`);
          fs.mkdirSync(`${process.cwd()}/${argv._[1]}/bot`);
          fs.mkdirSync(`${process.cwd()}/${argv._[1]}/bot/utils`);
          fs.mkdirSync(`${process.cwd()}/${argv._[1]}/bot/events`);
        }
      })
      .then(() => {
        spinner.text = "Creating files";
        const files = {
          bot: {
            room:
              "d2luZG93Lm9uSEJMb2FkZWQgPSAoKSA9PiB7CiAgY29uc3Qgcm9vbSA9IEhCSW5pdCh7CiAgICByb29tTmFtZTogIk15IHJvb20iLAogICAgbWF4UGxheWVyczogMTYsCiAgICBub1BsYXllcjogdHJ1ZSwKICAgIHRva2VuOiAidGhyMS5BQUFBQUY3OVVvLS02LXhfTXl3VklBLjdoNVRqdEpjNUR3IiwKICB9KTsKCiAgcm9vbS5zZXREZWZhdWx0U3RhZGl1bSgiQmlnIik7CiAgcm9vbS5zZXRTY29yZUxpbWl0KDUpOwogIHJvb20uc2V0VGltZUxpbWl0KDApOwoKICByb29tLm9uUGxheWVySm9pbiA9IChwbGF5ZXIpID0+CiAgICByZXF1aXJlKCIuL2V2ZW50cy9vblBsYXllckpvaW4iKShwbGF5ZXIsIHJvb20pOwogIHJvb20ub25QbGF5ZXJMZWF2ZSA9IChwbGF5ZXIpID0+CiAgICByZXF1aXJlKCIuL2V2ZW50cy9vblBsYXllckxlYXZlIikocGxheWVyLCByb29tKTsKICByb29tLm9uUm9vbUxpbmsgPSAobGluaykgPT4gY29uc29sZS5sb2cobGluayk7Cn07Cg==",
            utils: {
              updateAdmins:
                "bW9kdWxlLmV4cG9ydHMgPSAocm9vbSkgPT4gewogIHZhciBwbGF5ZXJzID0gcm9vbS5nZXRQbGF5ZXJMaXN0KCk7CiAgaWYgKHBsYXllcnMubGVuZ3RoID09IDApIHJldHVybjsKICBpZiAocGxheWVycy5maW5kKChwbGF5ZXIpID0+IHBsYXllci5hZG1pbikgIT0gbnVsbCkgcmV0dXJuOwogIHJvb20uc2V0UGxheWVyQWRtaW4ocGxheWVyc1swXS5pZCwgdHJ1ZSk7Cn07Cg==",
            },
            events: {
              onPlayerJoin:
                "Y29uc3QgdXBkYXRlQWRtaW5zID0gcmVxdWlyZSgiLi4vdXRpbHMvdXBkYXRlQWRtaW5zIik7Cgptb2R1bGUuZXhwb3J0cyA9IChwbGF5ZXIsIHJvb20pID0+IHsKICAgIHVwZGF0ZUFkbWlucyhyb29tKTsKfQ==",
              onPlayerLeave:
                "Y29uc3QgdXBkYXRlQWRtaW5zID0gcmVxdWlyZSgiLi4vdXRpbHMvdXBkYXRlQWRtaW5zIik7Cgptb2R1bGUuZXhwb3J0cyA9IChwbGF5ZXIsIHJvb20pID0+IHsKICAgIHVwZGF0ZUFkbWlucyhyb29tKTsKfQ==",
            },
          },
          index:
            "Y29uc3QgSEhYID0gcmVxdWlyZSgiQGhoeGpzL2NvbXBpbGVyIik7CmNvbnN0IGNsaWVudCA9IG5ldyBISFgoImJvdC9yb29tLmpzIik7CgpjbGllbnQuY29tcGlsZSgiZGlzdC9zY3JpcHQuanMiKTs=",
        };
        fs.writeFileSync(
          `${process.cwd()}/${argv._[1]}/index.js`,
          files.index,
          "base64"
        );
        fs.writeFileSync(
          `${process.cwd()}/${argv._[1]}/bot/room.js`,
          files.bot.room,
          "base64"
        );
        fs.writeFileSync(
          `${process.cwd()}/${argv._[1]}/bot/utils/updateAdmins.js`,
          files.bot.utils.updateAdmins,
          "base64"
        );
        fs.writeFileSync(
          `${process.cwd()}/${argv._[1]}/bot/events/onPlayerJoin.js`,
          files.bot.events.onPlayerJoin,
          "base64"
        );
        fs.writeFileSync(
          `${process.cwd()}/${argv._[1]}/bot/events/onPlayerLeave.js`,
          files.bot.events.onPlayerLeave,
          "base64"
        );
      })
      .then(() => {
        spinner.text = "Installing @hhxjs/compiler";
        exec(
          "npm init -y && npm install @hhxjs/compiler",
          { cwd: argv._[1] },
          () => {
            spinner.succeed("Success");
          }
        );
      });
    break;
  case "run":
    if (argv.output) {
      const compiler = new HHX(argv._[1]);
      compiler.compile(argv.output);
    }
    break;
  default:
    console.log(chalk.green(`HHX CLI - ${require("./package.json").version}v`));
    console.log("Options: ");
    console.log(chalk.white("  ") + chalk.whiteBright("init <name>"));
    console.log(
      chalk.white("  ") + chalk.whiteBright("run <entry> --output <output>")
    );
    break;
}
