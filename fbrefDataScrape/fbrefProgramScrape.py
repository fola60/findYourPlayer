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
totalShots = soup.find_all('td', attrs={'data-stat': 'shots'})
shotsOnTarget = soup.find_all('td', attrs={'data-stat': 'shots_on_target'})
shotsOnTargetPct = soup.find_all('td', attrs={'data-stat': 'shots_on_target_pct'})
shotsPerNineties = soup.find_all('td', attrs={'data-stat': 'shots_per90'})
shotsOnTargetPerNin = soup.find_all('td', attrs={'data-stat': 'shots_on_target_per90'})
goalsPerShot = soup.find_all('td', attrs={'data-stat': 'goals_per_shot'})
goalsPerShotOnTarget = soup.find_all('td', attrs={'data-stat': 'goals_per_shot_on_target'})
averageShotsDistance = soup.find_all('td', attrs={'data-stat': 'average_shot_distance'})
shotsFromFK = soup.find_all('td', attrs={'data-stat': 'shots_free_kicks'})
penaltyKicksMade = soup.find_all('td', attrs={'data-stat': 'pens_made'})
penaltysAttempt = soup.find_all('td', attrs={'data-stat': 'pens_att'})
xgs = soup.find_all('td', attrs={'data-stat': 'xg'})
npxgs = soup.find_all('td', attrs={'data-stat': 'npxg'})
npxgsPerShot = soup.find_all('td', attrs={'data-stat': 'npxg_per_shot'})
gMinusXgs = soup.find_all('td', attrs={'data-stat': 'xg_net'})
gMinusNpxgs = soup.find_all('td', attrs={'data-stat': 'npxg_net'})

#Creating csv for player Data
with open('playerData.csv', 'w', newline='', encoding = 'utf8') as f:
    theWriter = writer(f)
    header = ['Index', 'PlayerName', 'Nation', 'position', 'Squad', 'Competition', 'Age', 'BirthYear', 'Full 90s Played', 'Goals Scored', 'Total Shots', 'Shots on Target', 'Shots on Target%', 'Shots Per90', 'Shots on Target P90', 'Goals Per Shot', 'G/SOT', 'Average shot Distance', 'Shots from free kicks', 'Penalties created', 'Penalties attempted', 'xG', 'npxg', 'npxG/Sh', 'G-xG', 'npG-npxG']#Definng header
    theWriter.writerow(header)
    
    for i,player in enumerate(place):#Sorting through every player and putting info into csv
        index = place[i].get_text()
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
        totalShot = totalShots[i].get_text()
        shotOnTarget = shotsOnTarget[i].get_text()
        if shotsOnTargetPct[i].get_text() == '':
            shotOnTargetPct = '0.0'
        else:
            shotOnTargetPct = shotsOnTargetPct[i].get_text()

        shotsPerNinety = shotsPerNineties[i].get_text()
        shotOnTargetPerNin = shotsOnTargetPerNin[i].get_text()

        if goalsPerShot[i].get_text() == '':
            goalPerShot = '0.00'
        else:
            goalPerShot = goalsPerShot[i].get_text()

        if goalsPerShotOnTarget[i].get_text() == '':
            goalPerShotOnTarget = '0.00'
        else:
            goalPerShotOnTarget = goalsPerShotOnTarget[i].get_text()

        if averageShotsDistance[i].get_text() == '':
            averageShotDistance = '0.0'
        else:
            averageShotDistance = averageShotsDistance[i].get_text()

        shotFromFk = shotsFromFK[i].get_text()
        penaltyKickMade = penaltyKicksMade[i].get_text()
        penaltyAttempt = penaltysAttempt[i].get_text()
        xg = xgs[i].get_text()
        npxg = npxgs[i].get_text()
        npxgPerShot = npxgsPerShot[i].get_text()
        gMinusXg = gMinusXgs[i].get_text()
        gMinusNpxg = gMinusNpxgs[i].get_text()

        statlist = [index, playerN, nationality, position, team, competition, age, birthYear, ninetyPlayed, goalScored, totalShot, shotOnTarget, shotOnTargetPct, shotsPerNinety, shotOnTargetPerNin, goalPerShot, goalPerShotOnTarget, averageShotDistance, shotFromFk, penaltyKickMade, penaltyAttempt, xg, npxg, npxgPerShot, gMinusXg, gMinusNpxg]
        theWriter.writerow(statlist)