from django.test import LiveServerTestCase
from selenium import webdriver
import unittest

class NewVisitorTest(LiveServerTestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)
    
    def tearDown(self):
        self.browser.quit()
    
    def test_can_start_game(self):
        # Stefan has heard about a cool new online tic-tac-toe app. He goes
        # to check out its homepage.
        self.browser.get(self.live_server_url)
        
        # He notices the page title and header mention Tic-Tac-Toe
        self.assertIn('Tic-Tac-Toe', self.browser.title)
        header_text = self.browser.find_element_by_tag_name('h1').text
        self.assertIn('Tic-Tac-Toe', header_text)
        
        # He notices an empty tic-tac-toe board game.
        canvas_text = self.browser.find_element_by_tag_name('canvas').text
        self.assertIn('Your browser does not support HTML5 canvas', canvas_text)
        
        
        # At the bottom of the screen, he notices a "Start Game" button, "How To Play?" button,
        # and a "Clear Score" button.
        start_btn = self.browser.find_element_by_id('startGameBtn')
        self.assertEqual('Start Game', start_btn.text, 'The start game button is misconfigured.')

        # Stefan decides to start a new game. 
        # Stefan is asked if he would like to be Player X or Player O.
        # Stefan selects Player X.
        self.fail('Finish the test!')
        
        # Stefan wonders which player will go first. He sees that the site randomly selects 
        # which player goes first.
        
        # The page updates and an empty tic-tac-toe board game is shown.
        
        # Stefan is asked to select a spot on the board. Stefan notices that when the 
        # computer takes a turn that it is quick and automatic.
        
        # Once the game is over, a pop up displays whether the player won or lost.
        
        # Stefan decides to check out the how to play tic-tac-toe instructions
        # and clicks the button to get more information
        
        
        # The page updates again, and now shows instructions on how to play tic-tac-toe
        
        # He closes the how to play instructions.     