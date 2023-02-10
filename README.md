# AI RECIPES - AI Recipes for the Web

## What is AI Recipes?

AI Recipes is a web application for the creation of cooking recipes using artificial intelligence. 

## How does it work?

AI Recipes uses the cohere API to generate recipes. The cohere API is a natural language generation API that uses machine learning to generate text. The cohere API is trained on a large corpus of recipes and can generate recipes based on a set of ingredients. For more information on the cohere API, please visit https://cohere.ai

## How do I use it?

To use AI Recipes, simply select the ingredients list and click "Generate Recipe!" button. The generated recipe will appear in the text box below.

## How to configure it?

To configure AI Recipes, you will need to create a cohere API key. You can create a cohere API key by visiting https://cohere.ai and clicking "Get Started". Once you have created a cohere API key, you can configure the application by creating a file called ".env" in the root directory of the project. The ".env" file should contain the following line:

```
VITE_COHERE_API_KEY=<YOUR_COHERE_API_KEY>
``` 
## How do I run it locally?

To run AI Recipes locally, you will need to install the following dependencies:

* NPM
* Node.js

Once you have installed the dependencies, you can run the following commands to run the application:

```
npm install
npm start
```
Once the application is running, you can access it at http://localhost:3000.


## Live Demo

You can view a live demo of AI Recipes at https://dhsosa98.github.io/ai-recipes/
