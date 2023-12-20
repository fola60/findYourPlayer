from bs4 import BeautifulSoup
import requests
import pandas as pd
import csv
from csv import writer


shooting_html = requests.get('https://fbref.com/en/comps/Big5/shooting/players/Big-5-European-Leagues-Stats').text
passing_html = requests.get('https://fbref.com/en/comps/Big5/passing/players/Big-5-European-Leagues-Stats').text

shooting = BeautifulSoup(shooting_html, 'lxml')
passing = BeautifulSoup(passing_html,'lxml')

#Defining arrays of unscraped info
players = shooting.find_all('td', attrs={'data-stat': 'player'})
place = shooting.find_all('th', attrs={'scope': 'row'})
nationalities = shooting.find_all('td', attrs={'data-stat': 'nationality'})
positions = shooting.find_all('td', attrs={'data-stat': 'position'})
teams = shooting.find_all('td',attrs={'data-stat': 'team'})
competitions = shooting.find_all('td',attrs={'data-stat': 'comp_level'})
ages = shooting.find_all('td', attrs={'data-stat': 'age'})
birthYears = shooting.find_all('td', attrs={'data-stat': 'birth_year'})
ninetiesPlayed = shooting.find_all('td', attrs={'data-stat': 'minutes_90s'})
goalsScored = shooting.find_all('td', attrs={'data-stat': 'goals'})
totalShots = shooting.find_all('td', attrs={'data-stat': 'shots'})
shotsOnTarget = shooting.find_all('td', attrs={'data-stat': 'shots_on_target'})
shotsOnTargetPct = shooting.find_all('td', attrs={'data-stat': 'shots_on_target_pct'})
shotsPerNineties = shooting.find_all('td', attrs={'data-stat': 'shots_per90'})
shotsOnTargetPerNin = shooting.find_all('td', attrs={'data-stat': 'shots_on_target_per90'})
goalsPerShot = shooting.find_all('td', attrs={'data-stat': 'goals_per_shot'})
goalsPerShotOnTarget = shooting.find_all('td', attrs={'data-stat': 'goals_per_shot_on_target'})
averageShotsDistance = shooting.find_all('td', attrs={'data-stat': 'average_shot_distance'})
shotsFromFK = shooting.find_all('td', attrs={'data-stat': 'shots_free_kicks'})
penaltyKicksMade = shooting.find_all('td', attrs={'data-stat': 'pens_made'})
penaltysAttempt = shooting.find_all('td', attrs={'data-stat': 'pens_att'})
xgs = shooting.find_all('td', attrs={'data-stat': 'xg'})
npxgs = shooting.find_all('td', attrs={'data-stat': 'npxg'})
npxgsPerShot = shooting.find_all('td', attrs={'data-stat': 'npxg_per_shot'})
gMinusXgs = shooting.find_all('td', attrs={'data-stat': 'xg_net'})
gMinusNpxgs = shooting.find_all('td', attrs={'data-stat': 'npxg_net'})

completedPasses = passing.find_all('td', attrs={'data-stat' : 'passes_completed'})
passesAttempted = passing.find_all('td', attrs={'data-stat' : 'passes'})
passesCompletionPCT = passing.find_all('td', attrs={'data-stat' : 'passes_pct'})
totPassingDis = passing.find_all('td', attrs={'data-stat' : 'passes_total_distance'})
progPassingDis = passing.find_all('td', attrs={'data-stat' : 'passes_progressive_distance'})
shortComPasses = passing.find_all('td', attrs={'data-stat' : 'passes_completed_short'})
shortAttPasses = passing.find_all('td', attrs={'data-stat' : 'passes_short'})
shortsComPCT = passing.find_all('td', attrs={'data-stat' : 'passes_pct_short'})
mediumComPasses = passing.find_all('td', attrs={'data-stat' : 'passes_completed_medium'})
mediumAttPasses = passing.find_all('td', attrs={'data-stat' : 'passes_medium'})
mediumsComPCT = passing.find_all('td', attrs={'data-stat' : 'passes_pct_medium'})
longComPasses = passing.find_all('td', attrs={'data-stat' : 'passes_completed_long'})
longAttPasses = passing.find_all('td', attrs={'data-stat' : 'passes_long'})
longsComPCT = passing.find_all('td', attrs={'data-stat' : 'passes_pct_long'})
assists = passing.find_all('td', attrs={'data-stat' : 'assists'})
xAgs = passing.find_all('td', attrs={'data-stat' : 'xg_assist'})
xAs = passing.find_all('td', attrs={'data-stat' : 'pass_xa'})
aMinusXags = passing.find_all('td', attrs={'data-stat' : 'xg_assist_net'})
keyPasses = passing.find_all('td', attrs={'data-stat' : 'assisted_shots'})
final3rdPasses = passing.find_all('td', attrs={'data-stat' : 'passes_into_final_third'})
passesPenArea = passing.find_all('td', attrs={'data-stat' : 'passes_into_penalty_area'})
crossesPenArea = passing.find_all('td', attrs={'data-stat' : 'crosses_into_penalty_area'})
progressivePasses = passing.find_all('td', attrs={'data-stat' : 'progressive_passes'})



#Creating csv for player Data
with open('playerData.csv', 'w', newline='', encoding = 'utf8') as f:
    theWriter = writer(f)
    header = ['Index', 'PlayerName', 'Nation', 'position', 'Squad', 'Competition', 'Age', 'BirthYear', 'Full90s Played', 'Goals-Scored', 'Total-Shots', 'Shots-on-Target', 'Shots-on-Target%', 'Shots-Per90', 'Shots-on-TargetP90', 'GoalsPerShot', 'G/SOT', 'Average-shot-Distance', 'Shots-from-free-kicks', 'Penalties-created', 'Penalties-attempted', 'xG', 'npxg', 'npxG/Sh', 'G-xG', 'npG-npxG','completed-passes','pass-attempted','pass-completion%','total-pass-distance','progPass-distance','short-pass-completed','short-pass-attempted','short-completion%','medium-pass-completed','medium-pass-attempted','medium-completion%','long-pass-completed','long-pass-attempted','long-completion%','assists','xAg','a-xAg','keypasses','final3rdpasses','passPenArea','crossPenArea','progressivePasses']#Definng header
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
        ninetyPlayed = float(ninetiesPlayed[i].get_text())
        goalScored = float(goalsScored[i].get_text())
        totalShot = float(totalShots[i].get_text())
        shotOnTarget = float(shotsOnTarget[i].get_text())
        if shotsOnTargetPct[i].get_text() == '':
            shotOnTargetPct = 0.0
        else:
            shotOnTargetPct = float(shotsOnTargetPct[i].get_text())

        shotsPerNinety = float(shotsPerNineties[i].get_text())
        shotOnTargetPerNin = float(shotsOnTargetPerNin[i].get_text())

        if goalsPerShot[i].get_text() == '':
            goalPerShot = 0.00
        else:
            goalPerShot = float(goalsPerShot[i].get_text())

        if goalsPerShotOnTarget[i].get_text() == '':
            goalPerShotOnTarget = 0.00
        else:
            goalPerShotOnTarget = float(goalsPerShotOnTarget[i].get_text())

        if averageShotsDistance[i].get_text() == '':
            averageShotDistance = 0.0
        else:
            averageShotDistance = float(averageShotsDistance[i].get_text())

        if shotsFromFK[i].get_text() == '':
            shotFromFk = 0.0
        else:
            shotFromFk = float(shotsFromFK[i].get_text())

        penaltyKickMade = float(penaltyKicksMade[i].get_text())
        penaltyAttempt = float(penaltysAttempt[i].get_text())

        if xgs[i].get_text() == '':
            xg = 0.0
        else:
            xg = float(xgs[i].get_text())

        if npxgs[i].get_text() == '':
            npxg = 0.0
        else:
            npxg = float(npxgs[i].get_text())

        if npxgsPerShot[i].get_text() == '':
            npxgPerShot = 0.0
        else:
            npxgPerShot = float(npxgsPerShot[i].get_text())

        if gMinusXgs[i].get_text() == '':
            gMinusXg = 0.0
        else:
            gMinusXg = float(gMinusXgs[i].get_text())

        if gMinusNpxgs[i].get_text() == '':
            gMinusNpxg = 0.0
        else:
            gMinusNpxg = float(gMinusNpxgs[i].get_text())

        if completedPasses[i].get_text() == '':
            completedPass = 0.0
        else:
            completedPass = float(completedPasses[i].get_text())

        if passesAttempted[i].get_text() == '':
            passAttempted = 0.0
        else:
            passAttempted = float(passesAttempted[i].get_text())

        if passesCompletionPCT[i].get_text() == '':
            passCompletionPCT = 0.0
        else:
            passCompletionPCT = float(passesCompletionPCT[i].get_text())

        if totPassingDis[i].get_text() == '':
            totpassDis = 0.0
        else:
            totpassDis = float(totPassingDis[i].get_text())

        if progPassingDis[i].get_text() == '':
            progPassDis  = 0.0
        else:
            progPassDis = float(progPassingDis[i].get_text())

        if shortComPasses[i].get_text() == '':
            shortComPass = 0.0
        else:
            shortComPass = float(shortComPasses[i].get_text())

        if shortAttPasses[i].get_text() == '':
            shortAttPass = 0.0
        else:
            shortAttPass = float(shortAttPasses[i].get_text())

        if shortsComPCT[i].get_text() == '':
            shortComPCT = 0.0
        else:
            shortComPCT = float(shortsComPCT[i].get_text())

        if mediumComPasses[i].get_text() == '':
            mediumComPass = 0.0
        else:
            mediumComPass = float(mediumComPasses[i].get_text())

        if mediumAttPasses[i].get_text() == '':
            mediumAttPass = 0.0
        else:
            mediumAttPass = float(mediumAttPasses[i].get_text())

        if mediumsComPCT[i].get_text() == '':
            mediumComPCT = 0.0
        else:
            mediumComPCT = float(mediumsComPCT[i].get_text())

        if longComPasses[i].get_text() == '':
            longComPass = 0.0
        else:
            longComPass = float(longComPasses[i].get_text())

        if longAttPasses[i].get_text() == '':
            longAttPass = 0.0
        else:
            longAttPass = float(longAttPasses[i].get_text())

        if longsComPCT[i].get_text() == '':
            longComPCT = 0.0
        else:
            longComPCT = float(longsComPCT[i].get_text())



        if assists[i].get_text() == '':
            assist = 0.0
        else:
            assist = float(assists[i].get_text())

        if xAgs[i].get_text() == '':
            xAg = 0.0
        else:
            xAg = float(xAgs[i].get_text())

        if aMinusXags[i].get_text() == '':
            aMinusXag = 0.0
        else:
            aMinusXag = float(aMinusXags[i].get_text())

        if keyPasses[i].get_text() == '':
            keyPass = 0.0
        else:
            keyPass = float(keyPasses[i].get_text())

        if final3rdPasses[i].get_text() == '':
            final3rdPass = 0.0
        else:
            final3rdPass = float(final3rdPasses[i].get_text())

        if passesPenArea[i].get_text() == '':
            passPenArea = 0.0
        else:
            passPenArea = float(passesPenArea[i].get_text())

        if crossesPenArea[i].get_text() == '':
            crossPenArea = 0.0
        else:
            crossPenArea = float(crossesPenArea[i].get_text())

        if progressivePasses[i].get_text() == '':
            progressivePass = 0.0
        else:
            progressivePass = float(progressivePasses[i].get_text())  

        statlist = [index, playerN, nationality, position, team, competition, age, birthYear, ninetyPlayed, goalScored, totalShot, shotOnTarget, shotOnTargetPct, shotsPerNinety, shotOnTargetPerNin, goalPerShot, goalPerShotOnTarget, averageShotDistance, shotFromFk, penaltyKickMade, penaltyAttempt, xg, npxg, npxgPerShot, gMinusXg, gMinusNpxg,completedPass,passAttempted,passCompletionPCT,totpassDis,progPassDis,shortComPass,shortAttPass,shortComPCT,mediumComPass,mediumAttPass,mediumComPCT,longComPass,longAttPass,longComPCT,assist,xAg,aMinusXag,keyPass,final3rdPass,passPenArea,crossPenArea,progressivePass]
        theWriter.writerow(statlist)