var os = require("os");
var pty = require("node-pty");
var Terminal = require("xterm").Terminal;
// var FitAddon = require("xterm-addon-fit");
// import { FitAddon } from "xterm-addon-fit";

// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === "win32" ? "COMSPEC" : "SHELL"];
const ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env,
});

// Initialize xterm.js and attach it to the DOM
const xterm = new Terminal();
// const fitAddon = new FitAddon();
// xterm.loadAddon(fitAddon);
xterm.open(document.getElementById("xterm"));
// Make the terminal's size and geometry fit the size of #xterm
// fitAddon.fit();

// Setup communication between xterm.js and node-pty
xterm.onData((data) => ptyProcess.write(data));
ptyProcess.on("data", function (data) {
  xterm.write(data);
});
