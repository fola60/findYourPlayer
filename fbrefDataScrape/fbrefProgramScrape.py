from bs4 import BeautifulSoup
import requests
import pandas as pd
import csv
from csv import writer


shooting_html = requests.get('https://fbref.com/en/comps/Big5/shooting/players/Big-5-European-Leagues-Stats').text
passing_html = requests.get('https://fbref.com/en/comps/Big5/passing/players/Big-5-European-Leagues-Stats').text
defence_html = requests.get('https://fbref.com/en/comps/Big5/defense/players/Big-5-European-Leagues-Stats').text
shotCreation_html = requests.get('https://fbref.com/en/comps/Big5/gca/players/Big-5-European-Leagues-Stats').text
possesion_html = requests.get('https://fbref.com/en/comps/Big5/possession/players/Big-5-European-Leagues-Stats').text

shooting = BeautifulSoup(shooting_html, 'lxml')
passing = BeautifulSoup(passing_html,'lxml')
defence = BeautifulSoup(defence_html,'lxml')
shotCreation = BeautifulSoup(shotCreation_html,'lxml')
possesion = BeautifulSoup(possesion_html,'lxml')

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

tackles = defence.find_all('td', attrs={'data-stat' : 'tackles'})
tacklesTurnOver = defence.find_all('td', attrs={'data-stat' : 'tackles_won'})
tacklesDef3rd = defence.find_all('td', attrs={'data-stat' : 'tackles_def_3rd'})
tacklesMid3rd = defence.find_all('td', attrs={'data-stat' : 'tackles_mid_3rd'})
tacklesAtt3rd = defence.find_all('td', attrs={'data-stat' : 'tackles_att_3rd'})
dribblersTackled = defence.find_all('td', attrs={'data-stat' : 'challenge_tackles'})
dribblesChallenged = defence.find_all('td', attrs={'data-stat' : 'challenges'})
dribblersTackledPCT = defence.find_all('td', attrs={'data-stat' : 'challenge_tackles_pct'})
challengesLost = defence.find_all('td', attrs={'data-stat' : 'challenges_lost'})
blocks = defence.find_all('td', attrs={'data-stat' :'blocks'})
shotsBlocked = defence.find_all('td', attrs={'data-stat' : 'blocked_shots'})
passesBlocked = defence.find_all('td', attrs={'data-stat' : 'blocked_passes'})
interceptions = defence.find_all('td', attrs={'data-stat' : 'interceptions'})
clearances = defence.find_all('td', attrs={'data-stat' : 'clearances'})

scaS = shotCreation.find_all('td', attrs={'data-stat' : 'sca'})
scaSP90 = shotCreation.find_all('td', attrs={'data-stat' : 'sca_per90'})
scaSPassLive = shotCreation.find_all('td', attrs={'data-stat' : 'sca_passes_live'})
scaSPassDead = shotCreation.find_all('td', attrs={'data-stat' : 'sca_passes_dead'})
scaSTakeOn = shotCreation.find_all('td', attrs={'data-stat' : 'sca_take_ons'})
scaSShot = shotCreation.find_all('td', attrs={'data-stat' : 'sca_shots'})
scaSFoulsDrawn = shotCreation.find_all('td', attrs={'data-stat' : 'sca_fouled'})
scaSDefence = shotCreation.find_all('td', attrs={'data-stat' : 'sca_defense'})
gcaS = shotCreation.find_all('td', attrs={'data-stat' : 'gca'})
gcaSPer90 = shotCreation.find_all('td', attrs={'data-stat' : 'gca_per90'})
gcaSTakeOn = shotCreation.find_all('td', attrs={'data-stat' : 'gca_take_ons'})

touches = possesion.find_all('td', attrs={'data-stat' :'touches'})
touchesDefPenArea = possesion.find_all('td', attrs={'data-stat' :'touches_def_pen_area'})
touchesDef3rd = possesion.find_all('td', attrs={'data-stat':'touches_def_3rd'})
touchesMid3rd = possesion.find_all('td', attrs={'data-stat':'touches_mid_3rd'})
touchesAtt3rd = possesion.find_all('td', attrs={'data-stat':'touches_att_3rd'})
touchesAttPenArea = possesion.find_all('td', attrs={'data-stat':'touches_att_pen_area'})
takeOnsAttempted = possesion.find_all('td', attrs={'data-stat':'take_ons'})
takeOnsSuccesful = possesion.find_all('td', attrs={'data-stat':'take_ons_won'})
takeOnsSuccesfulPCT = possesion.find_all('td', attrs={'data-stat':'take_ons_won_pct'})
takeOnsTackled = possesion.find_all('td', attrs={'data-stat':'take_ons_tackled'})
takeOnsTackledPCT = possesion.find_all('td', attrs={'data-stat':'take_ons_tackled_pct'})
carries = possesion.find_all('td', attrs={'data-stat':'carries'})
carriesDis = possesion.find_all('td', attrs={'data-stat':'carries_distance'})
progressiveCarryingDis = possesion.find_all('td', attrs={'data-stat':'carries_progressive_distance'})
progressiveCarries = possesion.find_all('td', attrs={'data-stat':'progressive_carries'})
carriesFinal3rd = possesion.find_all('td', attrs={'data-stat':'carries_into_final_third'})
carriesIntoPen = possesion.find_all('td', attrs={'data-stat':'carries_into_penalty_area'})
miscontrolls = possesion.find_all('td', attrs={'data-stat':'miscontrols'})
dispossessed = possesion.find_all('td', attrs={'data-stat':'dispossessed'})
passesReceived = possesion.find_all('td', attrs={'data-stat':'passes_received'})
progPassesReceived = possesion.find_all('td', attrs={'data-stat':'progressive_passes_received'})


#Creating csv for player Data
with open('playerData.csv', 'w', newline='', encoding = 'utf8') as f:
    theWriter = writer(f)
    #header = ['Index', 'PlayerName', 'Nation', 'position', 'Squad', 'Competition', 'Age', 'BirthYear', 'Full90s Played', 'Goals-Scored', 'Total-Shots', 'Shots-on-Target', 'Shots-on-Target%', 'Shots-Per90', 'Shots-on-TargetP90', 'GoalsPerShot', 'G/SOT', 'Average-shot-Distance', 'Shots-from-free-kicks', 'Penalties-created', 'Penalties-attempted', 'xG', 'npxg', 'npxG/Sh', 'G-xG', 'npG-npxG','completed-passes','pass-attempted','pass-completion%','total-pass-distance','progPass-distance','short-pass-completed','short-pass-attempted','short-completion%','medium-pass-completed','medium-pass-attempted','medium-completion%','long-pass-completed','long-pass-attempted','long-completion%','assists','xAg','a-xAg','keypasses','final3rdpasses','passPenArea','crossPenArea','progressivePasses','tackle','tackleTurnOver','tackleDef3rd','tackleMid3rd','tackleAtt3rd','dribblerTackled','dribblersChallenged','dribblersTackled%','challengesLost','blocks','shotsblocked','passesBlocked','interception','clearances']#Definng header
    #theWriter.writerow(header)
    
    for i,player in enumerate(place):#Sorting through every player and putting info into csv
        print(i)
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

        if birthYears[i].get_text() == '':
            birthYear = 0
        else:
            birthYear = float(birthYears[i].get_text())

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

        if goalsPerShot[i].get_text() == '' :
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

        if xAs[i].get_text() == '':
            xA = 0.0
        else:
            xA = float(xAs[i].get_text())

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

        if tackles[i].get_text() == '':
            tackle = 0.0
        else:
            tackle = float(tackles[i].get_text())
        
        if tacklesTurnOver[i].get_text() == '':
            tackleTurnOver = 0.0
        else:
            tackleTurnOver = float(tacklesTurnOver[i].get_text())

        if tacklesDef3rd[i].get_text() == '':
            tackleDef3rd = 0.0
        else:
            tackleDef3rd = float(tacklesDef3rd[i].get_text())
        
        if tacklesMid3rd[i].get_text() == '':
            tackleMid3rd = 0.0
        else:
            tackleMid3rd = float(tacklesMid3rd[i].get_text())

        if tacklesAtt3rd[i].get_text() == '':
            tackleAtt3rd = 0.0
        else:
            tackleAtt3rd = float(tacklesAtt3rd[i].get_text())

        if dribblersTackled[i].get_text() == '':
            dribblerTackled = 0.0
        else:
            dribblerTackled = float(dribblersTackled[i].get_text())

        if dribblesChallenged[i].get_text() == '':
            dribbleChallenged = 0.0
        else:
            dribbleChallenged = float(dribblesChallenged[i].get_text())

        if dribblersTackledPCT[i].get_text() == '':
            dribblerTackledPCT = 0.0
        else:
            dribblerTackledPCT = float(dribblersTackledPCT[i].get_text())

        if challengesLost[i].get_text() == '':
            challengeLost = 0.0
        else:
            challengeLost = float(challengesLost[i].get_text())

        if blocks[i].get_text() == '':
            block = 0.0
        else:
            block = float(blocks[i].get_text())

        if shotsBlocked[i].get_text() == '':
            shotBlocked = 0.0
        else:
            shotBlocked = float(shotsBlocked[i].get_text())

        if passesBlocked[i].get_text() == '':
            passBlocked = 0.0
        else:
            passBlocked = float(passesBlocked[i].get_text())

        if interceptions[i].get_text() == '':
            interception = 0.0
        else:
            interception = float(interceptions[i].get_text())

        if clearances[i].get_text() == '':
            clearnce = 0.0
        else:
            clearance = float(clearances[i].get_text())

        if scaS[i].get_text() == '':
            sca = 0.0
        else:
            sca = float(scaS[i].get_text())
        
        if scaSP90[i].get_text() == '':
            scaP90 = 0.0
        else:
            scaP90 = float(scaSP90[i].get_text())

        if scaSPassLive[i].get_text() == '':
            scaPassLive = 0.0
        else:
            scaPassLive = float(scaSPassLive[i].get_text())

        if scaSPassDead[i].get_text() == '':
            scaPassDead = 0.0
        else:
            scaPassDead = float(scaSPassDead[i].get_text())

        if scaSTakeOn[i].get_text() == '':
            scaTakeOn = 0.0
        else:
            scaTakeOn = float(scaSTakeOn[i].get_text())
        
        if scaSShot[i].get_text() == '':
            scaShot = 0.0
        else:
            scaShot = float(scaSShot[i].get_text())

        if scaSFoulsDrawn[i].get_text() == '':
            scaFoulDrawn = 0.0
        else:
            scaFoulDrawn = float(scaSFoulsDrawn[i].get_text())

        if scaSDefence[i].get_text() == '':
            scaDefence = 0.0
        else:
            scaDefence = float(scaSDefence[i].get_text())

        if gcaS[i].get_text() == '':
            gca = 0.0
        else:
            gca = float(gcaS[i].get_text())

        if gcaSPer90[i].get_text() == '':
            gcaPer90 = 0.0
        else:
            gcaPer90 = float(gcaSPer90[i].get_text())

        if gcaSTakeOn[i].get_text() == '':
            gcaTakeOn = 0.0
        else:
            gcaTakeOn = float(gcaSTakeOn[i].get_text())

        if touches[i].get_text() == '':
            touch = 0.0
        else:
            touch = float(touches[i].get_text())

        if touchesDefPenArea[i].get_text() == '':
            touchDefPenArea = 0.0
        else:
            touchDefPenArea = float(touchesDefPenArea[i].get_text())

        if touchesDef3rd[i].get_text() == '':
            touchDef3rd = 0.0
        else:
            touchDef3rd = float(touchesDef3rd[i].get_text())

        if touchesMid3rd[i].get_text() == '':
            touchMid3rd = 0.0
        else:
            touchMid3rd = float(touchesMid3rd[i].get_text())

        if touchesAtt3rd[i].get_text() == '':
            touchAtt3rd = 0.0
        else:
            touchAtt3rd = float(touchesAtt3rd[i].get_text())

        if touchesAttPenArea[i].get_text() == '':
            touchAttPenArea = 0.0
        else:
            touchAttPenArea = float(touchesAttPenArea[i].get_text())

        if takeOnsAttempted[i].get_text() == '':
            takeOnAttempted = 0.0
        else:
            takeOnAttempted = float(takeOnsAttempted[i].get_text())

        if takeOnsSuccesful[i].get_text() == '':
            takeOnSuccesful = 0.0
        else:
            takeOnSuccesful = float(takeOnsSuccesful[i].get_text())

        if takeOnsSuccesfulPCT[i].get_text() == '':
            takeOnSuccesfulPCT = 0.0
        else:
            takeOnSuccesfulPCT = float(takeOnsSuccesfulPCT[i].get_text())

        if takeOnsTackled[i].get_text() == '':
            takeOnTackled = 0.0
        else:
            takeOnTackled = float(takeOnsTackled[i].get_text())

        if takeOnsTackledPCT[i].get_text() == '':
            takeOnTackledPCT = 0.0
        else:
            takeOnTackledPCT = float(takeOnsTackledPCT[i].get_text())

        if carries[i].get_text() == '':
            carry = 0.0
        else:
            carry = float(carries[i].get_text())

        if carriesDis[i].get_text() == '':
            carryDis = 0.0
        else:
            carryDis = float(carriesDis[i].get_text())

        if progressiveCarryingDis[i].get_text() == '':
            progressiveCarryDis = 0.0
        else:
            progressiveCarryDis = float(progressiveCarryingDis[i].get_text())

        if progressiveCarries[i].get_text() == '':
            progressiveCarry = 0.0
        else:
            progressiveCarry = float(progressiveCarries[i].get_text())

        if carriesFinal3rd[i].get_text() == '':
            carryFinal3rd = 0.0
        else:
            carryFinal3rd = float(carriesFinal3rd[i].get_text())

        if carriesIntoPen[i].get_text() == '':
            carryIntoPen = 0.0
        else:
            carryIntoPen = float(carriesIntoPen[i].get_text())

        if miscontrolls[i].get_text() == '':
            miscontrol = 0.0
        else:
            miscontrol = float(miscontrolls[i].get_text())
        
        if dispossessed[i].get_text() == '':
            dispos = 0.0
        else:
            dispos = float(dispossessed[i].get_text())
        
        if passesReceived[i].get_text() == '':
            passReceived = 0.0
        else:
            passReceived = float(passesReceived[i].get_text())

        if progPassesReceived[i].get_text() == '':
            progPassReceived = 0.0
        else:
            progPassReceived = float(progPassesReceived[i].get_text())
        


        statlist = [index,playerN, nationality, position, team, competition, age, birthYear, ninetyPlayed, goalScored, totalShot, shotOnTarget, shotOnTargetPct, shotsPerNinety, goalPerShot, goalPerShotOnTarget, averageShotDistance, shotFromFk, penaltyKickMade, penaltyAttempt, xg, npxg, npxgPerShot, gMinusXg, gMinusNpxg,completedPass,passAttempted,passCompletionPCT,totpassDis,progPassDis,shortComPass,shortAttPass,shortComPCT,mediumComPass,mediumAttPass,mediumComPCT,longComPass,longAttPass,longComPCT,assist,xAg,xA,aMinusXag,keyPass,final3rdPass,passPenArea,crossPenArea,progressivePass,tackle,tackleTurnOver,tackleDef3rd,tackleMid3rd,tackleAtt3rd,dribblerTackled,dribbleChallenged,dribblerTackledPCT,challengeLost,block,shotBlocked,passBlocked,interception,clearance,sca,scaP90,scaPassLive,scaPassDead,scaTakeOn,scaShot,scaFoulDrawn,scaDefence,gca,gcaPer90,gcaTakeOn,touch,touchDefPenArea,touchDef3rd,touchMid3rd,touchAtt3rd,touchAttPenArea,takeOnAttempted,takeOnSuccesful,takeOnSuccesfulPCT,takeOnTackledPCT,carry,carryDis,progressiveCarryDis,progressiveCarry,carryFinal3rd,carryIntoPen,miscontrol,dispos,passReceived,progPassReceived]
        theWriter.writerow(statlist)
print("I cant believe that we made it this far")