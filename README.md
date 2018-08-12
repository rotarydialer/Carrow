# Carrow
PoC written in node.js (express, postgres)

To install:

## Express and Express Generator must be installed:
npm install express express-generator -g

## First time, generate the application with ejs as the view engine:
express --view=ejs carrow

## After generating, move the bin/ directory into the project root:
mv carrow/bin/ .

## Install:
npm install

## Thereafter, just starting will suffice:
npm start
