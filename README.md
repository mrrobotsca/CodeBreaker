# Frontend Engineering Challenge - Color Code Breaker

## Overview

The purpose of this challenge is to gauge your experience with React, Redux and other JavaScript concepts, along with your CSS/design skills. This is important to us as our frontend application is currently built with these technologies. You will be provided with a half started project, and your goal is to complete the tasks from this initial boilerplate. Feel free to modify the provided code however you wish, it is just something to get you started. We are looking for well structured, maintainable and readable code and state management. That doesn’t mean over do it, nothing is worse than a file with two lines of comments for every single definition. Just do your best and help us understand your process. This codebase does not need to be deployed anywhere, just something that we can run locally.

## Jobs to be done

There are several objectives of this challenge:

1. Make the game page a protected route that requires a user to log in. The "call" to login should be asynchronous but should simulate an API call. You can store the logged in user's ID in local storage to prevent having to enter credentials again. See provided logout functionality for how this should be stored. You should not be able to access the game page if not logged in.

1. Create the logic for a "code breaker" type of game. A bare bones layout is provided for you. The objective of the game is to try and guess a code. Game rules explained below.

1. Create a timer that records how long a user takes to guess the code. Display the timer to the user.

## Game Rules

The purpose of the game is for the user to try and guess a code. When a new game is started (by clicking "Start New Game"), a code of 5 color blocks is randomly generated (not shown to user) and a timer is started. The user then selects a color for each block of the code and "checks" their answer by clicking "Guess". If they guessed right, they are notified and told how many guesses it took them and how long it took them. If they didn't get the entire code right, they are able to guess again. The user should be able to see a list of previous guesses. This list of previous guesses should also display which blocks they guessed correctly (up to you how this is displayed). A user can guess unlimited number of times until they get the code right. Starting a new game removes old guesses, generates a new code, and restarts the timer. They should not be able to score a "guess" unless they have started a game and the timer is running.

## Considerations and Preferences

- Although you can manage this game in local component state, we also dropped in a Redux store to manage some of your state. We know Redux is overkill for this situation, but we just want to see that you know how to use it. Boilerplate has been included if you choose to use it. Keep in mind, this is optional, and not everything needs to go into Redux if you choose to use it.

- You can style the application however you wish. Most of the boilerplate uses styled-components, but you can use imported CSS or CSS modules if you wish. We use CSS modules internally.

- We prefer the use of functional components and hooks over class-based components. The scaffold provided for you doesn't use many components (by design), but feel free to create as many as you think makes sense.

- There are no right or wrong answers to this, we just want to see how you think about building upon it or changing it. Make the game your own.

- You can modify and change the provided code as much as you want. It is there because we want to assess your ability to drop into a codebase, while also giving you a better idea of how the game works. Feel free to change the layout, component tree or state management as you see fit.

## Bonus tasks - Not required, but cool if you have the time

1. Display information about the current user

1. Handle errors and loading states nicely in the Login UI. Not required, but a nice touch.

1. Improve the styling of the game, feel free to do what you wish here. We are not assessing design skills, but it is also a nice touch.

1. Allow user to choose a difficulty level. For example, easy is a 3 block code, medium is a 5 block code and hard is a 7 block code.

1. Create a maximum number of guesses, so the user can now "lose" the game.

1. Create another page that displays the user's previous scores / times. Try to pause the game timer if the user changes pages mid game.

1. Write tests for your components.
