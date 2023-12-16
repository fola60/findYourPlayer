from bs4 import BeautifulSoup
import requests
import pandas as pd
import csv
from csv import writer


html_text = requests.get('https://fbref.com/en/comps/Big5/shooting/players/Big-5-European-Leagues-Stats').text
soup = BeautifulSoup(html_text, 'lxml')


#Defining arrays of unscraped info
players = soup.find_all('td', attrs={'data-stat': 'player'})
place = soup.find_all('th', attrs={'scope': 'row'})
nationalities = soup.find_all('td', attrs={'data-stat': 'nationality'})
positions = soup.find_all('td', attrs={'data-stat': 'position'})
teams = soup.find_all('td',attrs={'data-stat': 'team'})
competitions = soup.find_all('td',attrs={'data-stat': 'comp_level'})
ages = soup.find_all('td', attrs={'data-stat': 'age'})
birthYears = soup.find_all('td', attrs={'data-stat': 'birth_year'})
ninetiesPlayed = soup.find_all('td', attrs={'data-stat': 'minutes_90s'})
goalsScored = soup.find_all('td', attrs={'data-stat': 'goals'})

#Creating csv for player Data
with open('playerData.csv', 'w', newline='', encoding = 'utf8') as f:
    theWriter = writer(f)
    header = ['Index', 'PlayerName', 'Nation', 'position', 'Squad', 'Competition', 'Age', 'Born']#Definng header
    theWriter.writerow(header)
    
    for i,player in enumerate(place):#Sorting through every player and putting info into csv
        index = place[i].text()
        playerN = players[i].find('a',).text
        if nationalities[i].find('span',attrs={"class style": None}) == None:
            nationality = 'Unknown'
        else:
            nationality = nationalities[i].find('span',attrs={"class style": None}).get_text().split(' ', 1)[1]
        position = positions[i].get_text()
        team = teams[i].find('a',).get_text()
        competition = competitions[i].find('a',).get_text()
        age = ages[i].get_text()
        birthYear = birthYears[i].get_text()
        ninetyPlayed = ninetiesPlayed[i].get_text()
        goalScored = goalsScored[i].get_text()