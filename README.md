*** Rajiste Bennin / Tues July 11, 2017 ***

[BLACKJACK] Proposal

##What is Blackjack?

Blackjack 21 is one of the most widely played casino games in the world.
It's primarily a comparison card game with players competing against the dealer with
the objective of winning by being the getting 21 points or reaching a higher score
than the dealer without going over 21 points. 



##Wireframe

[image](BlackJack21/BlackJack_Wireframe.png)

##Initial thoughts on game structure

I found some sprites of playing cards in .jpg format so my initial wariness
regarding doing my own card images was greatly reduced. The biggest part of the game now
would be the game logic within the card comparisons and also how that would affect the betting
as well. 

##Phases of Completion

Phase 1: Acquire all images, the deck of cards and potentially the betting chips too.

Phase 2: Format the HTML and then apply CSS to the Index.html file to make sure everything is sized and placed properly. Standard practice is to do the logic first however, I feel that the
HTML and CSS for me is a frustrating endeavor at time where I would be best served to get it out of
the way as soon as possible. 

Phase 3: Initial logic dealing with creating a deck of cards and enacting a function to shuffle all of the cards. Addittionally have to implement a shuffle function (will us Fisher-Yates shuffle) in order to gaurantee that the logic does not pull the same exact card twice. 

Phase 4: Implement the game logic dealing with comparing the player hand to the dealer's hand and alerting/logging/showing which person won that round of the game. This logic would also include the dealer receiving extra cards when the player "stands" on his/her hand. 

Phase 5: Implement the betting and pot functions to represent the amount of "cash" that was risked and how much the player wins when his/her hand wins a round. 

Phase 6: Testing and debugging the game.

Phase 7: If there is enough time, add audio and casino chip animations to add realism. 

Phase 8: Submit final iteration of the project. 

##User Stories
1. I click on one of the betting buttons to add my bet to the pot.
2. I click 'GO' to start the game and deal the cards.
3. I am able to click on 'Hit' or "Stay" depending on what I want to do with the hand I was dealt.
4. The dealer plays their hand and I will win or lose this round.
5. I win, lose or push this round and can click on one of the betting buttons to start another round. 

##Links and Resources

I found the cards through a website called Opengameart.org and hopefully can find some sprites of
casino chips too. 

For the audio, I signed up for freesounds.org online and picked out a few audio clips from there to add some extras to the game. 

A key piece of code that I used was the Fisher Yates shuffle algorithm that I found online and created my own version of in order for me to properly shuffle and randomize the card deck. 

##Unsolved Problems

This is not a perfectly working BlackJack game as I did find some bugs. One occurs on counting Aces as 1 or 11's and another occurs when mistakingly pressing a button twice which throws off the entire game causing the user to refresh the page. Another issue that had occured was the dealer taking too many cards when the player "stayed" on a hand. 

It seems as if that error is not happening as often anymore but throughout the coding of this game, many times I would fix one thing and something else would break. I relentlessly stayed on top of the debugger in the developer tools but I could not really find a workable solution in the time we had before the submission deadline. 

I definitely want to improve on this game by refactoring most of the code into methods in objects. I also want to improve the logic to add addittional options for the player including "split", "insurance", etc.
