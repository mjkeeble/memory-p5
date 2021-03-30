![memory-3](https://user-images.githubusercontent.com/66460031/113012554-2accc580-917b-11eb-88de-a83402824169.png)
# (Not so) Superhero Memory

During the third week of Ironhacks Web Development Bootcamp we were tasked with creating a game using either DOM Manupulation or the P5.js animation library. After some thought I decided to develop a P5-based version of the classic Memory card game using the library's animation capabilities to spice things up!

## What is the game?

Assemble your team of not entirely super-heroes to save the world. Find the matching pairs, but be careful. For every pair you find you are rewarded with a quote from one of my favourite series, "The Tick".

But don't think this is going to be easy - the heroes are a restless bunch and have a habit of moving around! And if that's not enough, someone has left Kryptinite crystals lying around. Find a pair of those it's GAME OVER. 

## The challenges

The main challenges in developing this game were.

* Setting up a system for tracking the position of the cards and their status on the board, which I solved with an array of objects
* Matching the location of button clicks to individual cards, which was achieved using grid coordinates on the P5 canvas
* Creating card movements, which was a achieved by manipulation ther position variables within the card objects. To start the movement the coordinates of the card on the board are changed to the destination position and then during each screen render the actual position of the card is compared to the destination and an incremental movement is applied until it arrives.

## What could be better

The styling of the game is not great. With more time I would have liked to make this cleaner and more professional, but I've kept it as it is so that you can see what I was able to do within the couple of days actually available to complete the project.

I would also have liked to add more types of random movement to make this more interesting. Some optimisation would also be required to get a good balance of interest and challenge or difficult levels could be added, which would control how frequent random movements occur

## Conclusion

This game was a lot of fun to make. I learned that planning at the start of the project is perhaps the most important thing, with particular attention paid to the data structure, the type of manipulation required and how to implement this.

I also learned never to play with Kryptonite!


