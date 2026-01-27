var season = new Date().getFullYear();
var league = 0;
const team = 2620 // Iceland men
const stage = 'EHF Euro - Regular Season';
var groupTeams = [];
var originalStandings = null;
var allMatchesData = [];
var currentGroup = null;
var originalMatchScores = {}; // Store original match scores to track changes
if (season % 2 == 0) {
    league = 177; //Euros men
} else {
    league = 153; // world cup men
}
async function getGames(date, sport) {
    try {
        const response = await fetch(`https://milliridill-server.onrender.com/api/games?date=${date}`);
        const result = await response.json();
        if (result.response.length === 0) {
            console.log('No games found');
            return [];
        } else {
            console.log('Games found');
        }
        return result.response;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}



async function getStandings(group) {
    try {
        const response = await fetch(`https://milliridill-server.onrender.com/api/standings?league=${league}&season=${season}&group=${group}`);
        const result = await response.json();
        return result.response;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}
async function getGroups() {
    try {
        const response = await fetch(`https://milliridill-server.onrender.com/api/standings/groups?league=${league}&season=${season}`);
        const result = await response.json();
        return result.response;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}
// Function to get current match score (from input or original)
function getCurrentMatchScore(matchId) {
    const homeInput = document.querySelector(`.home-score[data-match-id="${matchId}"]`);
    const awayInput = document.querySelector(`.away-score[data-match-id="${matchId}"]`);

    if (homeInput && awayInput) {
        return {
            home: parseInt(homeInput.value) || 0,
            away: parseInt(awayInput.value) || 0,
            homeTeam: homeInput.dataset.homeTeam,
            awayTeam: homeInput.dataset.awayTeam
        };
    }

    // Fallback to original match data
    const match = allMatchesData.find(m => m.id == matchId);
    if (match) {
        return {
            home: match.scores.home || 0,
            away: match.scores.away || 0,
            homeTeam: match.teams.home.name,
            awayTeam: match.teams.away.name
        };
    }

    return null;
}

function createStandingsTable(standings, recalculated = false) {
    const table = document.querySelector('table tbody');
    table.innerHTML = '';

    // Store original standings if not recalculated
    if (!recalculated) {
        originalStandings = JSON.parse(JSON.stringify(standings));
        // Reset and populate groupTeams from standings
        groupTeams = [];
    }

    // Build team data array for sorting
    const teamData = [];
    Object.keys(standings).forEach(key => {
        const standing = standings[key];
        Object.keys(standing).forEach(key => {
            var currentTeam = standing[key];
if (currentTeam.stage == stage) {
    var teamName = currentTeam.team.name;
                if (!recalculated && !groupTeams.some(t => t.name === teamName)) {
        console.log('adding team', teamName);
                    groupTeams.push({ 'name': teamName, 'id': currentTeam.team.id });
    }
    var position = currentTeam.position;
    var played = currentTeam.games.played;
    var won = currentTeam.games.win.total;
    var lost = currentTeam.games.lose.total;
    var draw = currentTeam.games.draw.total;
    var goalsFor = currentTeam.goals.for;
    var goalsAgainst = currentTeam.goals.against;
    var goalDifference = goalsFor - goalsAgainst;
    var points = currentTeam.points;
                teamData.push({
                    position,
                    teamName,
                    played,
                    won,
                    lost,
                    draw,
                    goalsFor,
                    goalsAgainst,
                    goalDifference,
                    points
                });
}
        });
    });

    // Function to get current match score (from input or original) - now using global function
    // (keeping comment for reference, but using the global function above)
    // Function to calculate head-to-head stats between two teams
    function calculateHeadToHead(team1Name, team2Name) {
        let team1Points = 0;
        let team1GoalsFor = 0;
        let team1GoalsAgainst = 0;

        // Find all matches between these two teams
        allMatchesData.forEach(match => {
            const score = getCurrentMatchScore(match.id);
            if (!score) return;

            const isTeam1Home = score.homeTeam === team1Name;
            const isTeam1Away = score.awayTeam === team1Name;
            const isTeam2Home = score.homeTeam === team2Name;
            const isTeam2Away = score.awayTeam === team2Name;

            if ((isTeam1Home && isTeam2Away) || (isTeam1Away && isTeam2Home)) {
                const team1Score = isTeam1Home ? score.home : score.away;
                const team2Score = isTeam2Home ? score.home : score.away;

                team1GoalsFor += team1Score;
                team1GoalsAgainst += team2Score;

                if (team1Score > team2Score) {
                    team1Points += 2;
                } else if (team1Score === team2Score && team1Score > 0) {
                    team1Points += 1;
                }
            }
        });

        return {
            points: team1Points,
            goalDifference: team1GoalsFor - team1GoalsAgainst,
            goalsFor: team1GoalsFor
        };
    }

    // Check if all main round matches are completed
    const gamesPerTeam = teamData.length > 0 ? (teamData.length - 1) : 0;
    const allMatchesCompleted = teamData.every(team => team.played === gamesPerTeam);
    
    // Sort according to official rules
    teamData.sort((a, b) => {
        // 1) Points (always first)
        if (b.points !== a.points) return b.points - a.points;

        if (allMatchesCompleted) {
            // After completion of main round matches:
            // Calculate head-to-head stats for both teams
            const h2hA = calculateHeadToHead(a.teamName, b.teamName);
            const h2hB = calculateHeadToHead(b.teamName, a.teamName);
            const hasPlayed = h2hA.goalsFor + h2hA.goalsAgainst > 0;

            if (hasPlayed) {
                // a) Higher number of points obtained in the group matches played amongst the teams in question
                if (h2hA.points !== h2hB.points) return h2hB.points - h2hA.points;

                // b) Superior goal difference from the group matches played amongst the teams in question
                if (h2hA.goalDifference !== h2hB.goalDifference) {
                    return h2hB.goalDifference - h2hA.goalDifference;
                }

                // c) Higher number of goals scored in the group matches played amongst the teams in question
                if (h2hA.goalsFor !== h2hB.goalsFor) return h2hB.goalsFor - h2hA.goalsFor;
            }

            // d) Superior goal difference from all group matches
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;

            // e) Higher number of goals scored in all group matches
            if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        } else {
            // During the main round matches:
            // a) Superior goal difference from all group matches
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;

            // b) Higher number of goals scored in all group matches
            if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

            // c) Alphabetical order
            return a.teamName.localeCompare(b.teamName);
        }

        return 0;
    });

    // Comprehensive qualification calculation (top 2 advance)
    // A team is guaranteed if they cannot be mathematically eliminated from top 2
    const totalTeams = teamData.length;
    const teamsGuaranteed = new Set();
    const totalGamesPerTeam = totalTeams - 1;
    
    // Helper function to simulate worst-case scenario and check if team finishes in top 2
    function isTeamGuaranteed(teamIndex) {
        if (teamIndex >= 2) return false; // Only check teams in top 2 positions
        
        const team = teamData[teamIndex];
        const teamWorstCasePoints = team.points; // If they lose all remaining games
        
        // Build list of all teams with their best possible points
        const teamScenarios = teamData.map((t, idx) => {
            const remainingGames = totalGamesPerTeam - t.played;
            const bestCasePoints = t.points + (remainingGames * 2);
            const worstCasePoints = t.points;
            
            return {
                teamName: t.teamName,
                index: idx,
                currentPoints: t.points,
                bestCasePoints: bestCasePoints,
                worstCasePoints: worstCasePoints,
                played: t.played,
                goalDifference: t.goalDifference,
                goalsFor: t.goalsFor
            };
        });
        
        // Check if at least 2 teams can finish above this team in worst case
        // We need to find the scenario where this team finishes lowest (3rd or worse)
        let teamsThatCanFinishAbove = 0;
        
        // Count teams currently above this team that will definitely finish above
        for (let i = 0; i < teamIndex; i++) {
            const teamAbove = teamScenarios[i];
            // Team above will finish above if their worst case >= this team's worst case
            if (teamAbove.worstCasePoints >= teamWorstCasePoints) {
                // Check tiebreaker if points are equal
                if (teamAbove.worstCasePoints === teamWorstCasePoints) {
                    const h2h = calculateHeadToHead(team.teamName, teamAbove.teamName);
                    const h2hAbove = calculateHeadToHead(teamAbove.teamName, team.teamName);
                    // If head-to-head favors team above, or goal difference favors them
                    if (h2hAbove.points > h2h.points ||
                        (h2hAbove.points === h2h.points && 
                         (teamAbove.goalDifference > team.goalDifference ||
                          (teamAbove.goalDifference === team.goalDifference && teamAbove.goalsFor > team.goalsFor)))) {
                        teamsThatCanFinishAbove++;
                    }
                } else {
                    teamsThatCanFinishAbove++;
                }
            }
        }
        
        // Check teams below that could potentially finish above
        for (let j = teamIndex + 1; j < totalTeams; j++) {
            const competitor = teamScenarios[j];
            
            // Competitor can finish above if their best case > team's worst case
            if (competitor.bestCasePoints > teamWorstCasePoints) {
                teamsThatCanFinishAbove++;
            } else if (competitor.bestCasePoints === teamWorstCasePoints) {
                // Tie scenario - check if competitor can win on tiebreakers
                const h2h = calculateHeadToHead(team.teamName, competitor.teamName);
                const h2hCompetitor = calculateHeadToHead(competitor.teamName, team.teamName);
                
                // Competitor wins tiebreaker if they have better h2h points, or better goal diff
                if (h2hCompetitor.points > h2h.points ||
                    (h2hCompetitor.points === h2h.points && 
                     (h2hCompetitor.goalDifference > h2h.goalDifference ||
                      (h2hCompetitor.goalDifference === h2h.goalDifference && 
                       h2hCompetitor.goalsFor > h2h.goalsFor)))) {
                    teamsThatCanFinishAbove++;
                } else if (h2hCompetitor.points === h2h.points && 
                          h2hCompetitor.goalDifference === h2h.goalDifference &&
                          h2hCompetitor.goalsFor === h2h.goalsFor) {
                    // Complete tie on h2h, check overall goal difference
                    if (competitor.goalDifference > team.goalDifference ||
                        (competitor.goalDifference === team.goalDifference && 
                         competitor.goalsFor > team.goalsFor)) {
                        teamsThatCanFinishAbove++;
                    }
                }
            }
            
            // If we already have 2 teams that can finish above, team is not guaranteed
            if (teamsThatCanFinishAbove >= 2) {
                return false;
            }
        }
        
        // Team is guaranteed if less than 2 teams can finish above them
        return teamsThatCanFinishAbove < 2;
    }
    
    // Check each team in top 2 positions
    for (let i = 0; i < Math.min(2, totalTeams); i++) {
        if (isTeamGuaranteed(i)) {
            teamsGuaranteed.add(teamData[i].teamName);
        }
    }
    
    // Special case: if only 2 teams, both are guaranteed
    if (totalTeams === 2) {
        teamData.forEach(team => teamsGuaranteed.add(team.teamName));
    }

    // Create table rows
    teamData.forEach((team, index) => {
        var tr = document.createElement('tr');
        if (index + 1 <= 2) {
            tr.classList.add('first');
        }
        const isGuaranteed = teamsGuaranteed.has(team.teamName);
        const qualifiedIndicator = isGuaranteed ? ' ✓' : '';
        tr.innerHTML = `<td class="align-left">${index + 1}. ${team.teamName}${qualifiedIndicator}</td><td>${team.played}</td><td>${team.won}</td><td>${team.lost}</td><td>${team.draw}</td><td>${team.goalsFor} : ${team.goalsAgainst}</td><td>${team.goalDifference}</td><td>${team.points}</td>`;
        table.appendChild(tr);
    });
}
async function getMatches(teamId) {
    try {
        const response = await fetch(`https://milliridill-server.onrender.com/api/games?team=${teamId}&season=${season}&league=${league}`);
        const result = await response.json();
        return result.response;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}

 function createMatches(matchlist) {
    console.log('matches', matchlist);
    const matchDom = document.querySelector('#matches');
    matchDom.innerHTML = '';
    // Reset original match scores when new matches are loaded
    originalMatchScores = {};
    // Sort matches by date (newest first, oldest at bottom)
    const sortedMatches = matchlist.sort((a, b) => new Date(b.date) - new Date(a.date));
    allMatchesData = sortedMatches; // Store matches data

    // Find the earliest main round match date dynamically
    // Main round matches are those with stage matching the current stage
    let earliestMainRoundDate = null;
    sortedMatches.forEach(match => {
        const matchStage = match.league?.round || match.stage || '';
        if (matchStage.includes('Regular Season') || matchStage === stage) {
            const matchDate = new Date(match.date);
            if (!earliestMainRoundDate || matchDate < earliestMainRoundDate) {
                earliestMainRoundDate = matchDate;
            }
        }
    });
    
    // If no stage info, use a fallback: find the date where most recent matches cluster
    // (assuming prelims are earlier and main round is more recent)
    if (!earliestMainRoundDate && sortedMatches.length > 0) {
        // Sort by date and take the most recent matches as main round
        const dates = sortedMatches.map(m => new Date(m.date)).sort((a, b) => b - a);
        // Use the median date as cutoff (assuming prelims are older)
        if (dates.length > 2) {
            earliestMainRoundDate = dates[Math.floor(dates.length / 2)];
        } else if (dates.length > 0) {
            earliestMainRoundDate = dates[0];
        }
    }

    sortedMatches.forEach((match, index) => {
        var homeTeam = match.teams.home.name;
        var awayTeam = match.teams.away.name;
        var homeTeamScore = match.scores.home ?? null;
        var awayTeamScore = match.scores.away ?? null;
        var homeTeamLogo = match.teams.home.logo;
        var awayTeamLogo = match.teams.away.logo;
        var matchDate = new Date(match.date);
        var gameStatus = match.status.short;
        const matchStage = match.league?.round || match.stage || '';
        
        // Check if this is a main round match (either by stage or by date)
        const isMainRound = matchStage.includes('Regular Season') || 
                          matchStage === stage || 
                          (earliestMainRoundDate && matchDate >= earliestMainRoundDate);
        
        if (isMainRound) {
            // Store original scores (only for main round matches)
            originalMatchScores[match.id] = {
                home: homeTeamScore ?? 0,
                away: awayTeamScore ?? 0,
                homeTeam: homeTeam,
                awayTeam: awayTeam
            };
            const matchRow = document.createElement('div');
            matchRow.className = 'match-row';
            // Ensure values are numbers or empty string for input elements
            const homeScoreValue = homeTeamScore != null ? homeTeamScore : '';
            const awayScoreValue = awayTeamScore != null ? awayTeamScore : '';
            matchRow.innerHTML = `<p class="team-name home-team-name"><img src="${homeTeamLogo}" alt="${homeTeam}" width="20" height="20">${homeTeam}</p> <input ${gameStatus == 'FT' ? 'disabled' : ''} type="number" class="home-score" data-match-id="${match.id}" data-home-team="${homeTeam}" data-away-team="${awayTeam}" value="${homeScoreValue}" min="0" max="99"><span class="vs"> vs </span> <input ${gameStatus == 'FT' ? 'disabled' : ''} type="number" class="away-score" data-match-id="${match.id}" data-home-team="${homeTeam}" data-away-team="${awayTeam}" value="${awayScoreValue}" min="0" max="99"> <input type="number" value="${match.id}" hidden><p class="team-name away-team-name"><img src="${awayTeamLogo}" alt="${awayTeam}" width="20" height="20">${awayTeam}</p>`;
            matchDom.appendChild(matchRow);
        }
    });

    // Add event listeners to score inputs
    const scoreInputs = matchDom.querySelectorAll('.home-score, .away-score');
    scoreInputs.forEach(input => {
        input.addEventListener('input', updateStandings);
    });

    // Update head-to-head table
    createH2HTable();
}

function createH2HTable() {
    if (groupTeams.length === 0 || allMatchesData.length === 0) return;

    const h2hContent = document.querySelector('#h2h-content');
    if (!h2hContent) return;

    h2hContent.innerHTML = '';

    // Get current team points from the standings table
    const teamPoints = {};
    const standingsTable = document.querySelector('table tbody');
    if (standingsTable) {
        const rows = standingsTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 8) {
                // First cell contains "position. teamName" - extract team name
                const firstCellText = cells[0].textContent.trim();
                const teamName = firstCellText.replace(/^\d+\.\s*/, '').trim(); // Remove "1. " prefix
                const points = parseInt(cells[7].textContent.trim()) || 0;
                teamPoints[teamName] = points;
            }
        });
    }

    // Find teams that are tied on points
    const pointsGroups = {};
    Object.keys(teamPoints).forEach(teamName => {
        const points = teamPoints[teamName];
        if (!pointsGroups[points]) {
            pointsGroups[points] = [];
        }
        pointsGroups[points].push(teamName);
    });

    // Process each group of tied teams, sorted by points (descending)
    const sortedPoints = Object.keys(pointsGroups).map(p => parseInt(p)).sort((a, b) => b - a);
    
    sortedPoints.forEach(points => {
        const tiedTeams = pointsGroups[points.toString()];
        // Only show if there are 2 or more teams tied
        if (tiedTeams.length < 2) return;

        // Calculate head-to-head stats for each tied team
        const h2hStats = {};
        const teamLogos = {}; // Store team logos

        tiedTeams.forEach(teamName => {
            h2hStats[teamName] = {
                teamName: teamName,
                goalsFor: 0,
                goalsAgainst: 0,
                points: 0
            };
            // Find logo from match data
            const match = allMatchesData.find(m => {
                const score = getCurrentMatchScore(m.id);
                if (!score) return false;
                return score.homeTeam === teamName || score.awayTeam === teamName;
            });
            if (match) {
                if (match.teams.home.name === teamName) {
                    teamLogos[teamName] = match.teams.home.logo;
                } else if (match.teams.away.name === teamName) {
                    teamLogos[teamName] = match.teams.away.logo;
                }
            }
        });

        // Find all matches between tied teams
        allMatchesData.forEach(match => {
            const score = getCurrentMatchScore(match.id);
            if (!score) return;

            const homeTeam = score.homeTeam;
            const awayTeam = score.awayTeam;
            const homeScore = score.home || 0;
            const awayScore = score.away || 0;

            // Check if both teams are in the tied teams group
            if (tiedTeams.includes(homeTeam) && tiedTeams.includes(awayTeam)) {
                // Only count matches from the main round (after January 22)
                const matchDate = new Date(match.date);
                const mainRoundStartDate = new Date(season, 0, 23); // January 22 of current season year
                const isMainRound = true; // const isMainRound = matchDate >= mainRoundStartDate; 
                if (!isMainRound) return; // Skip preliminary round matches
                
                // Only count matches that have been played (status is FT or has actual scores)
                const matchStatus = match.status?.short || '';
                const isMatchPlayed = (homeScore > 0 && awayScore > 0);
                
                if (!isMatchPlayed) return; // Skip unplayed matches

                // Update home team stats
                h2hStats[homeTeam].goalsFor += homeScore;
                h2hStats[homeTeam].goalsAgainst += awayScore;

                // Update away team stats
                h2hStats[awayTeam].goalsFor += awayScore;
                h2hStats[awayTeam].goalsAgainst += homeScore;

                // Calculate points
                if (homeScore > awayScore) {
                    h2hStats[homeTeam].points += 2;
                } else if (awayScore > homeScore) {
                    h2hStats[awayTeam].points += 2;
                } else if (homeScore === awayScore && (homeScore > 0 || awayScore > 0)) {
                    h2hStats[homeTeam].points += 1;
                    h2hStats[awayTeam].points += 1;
                }
            }
        });

        // Convert to array and calculate goal difference
        const teamData = tiedTeams.map(teamName => {
            const stats = h2hStats[teamName];
            return {
                teamName: stats.teamName,
                logo: teamLogos[teamName] || '',
                goalsFor: stats.goalsFor,
                goalsAgainst: stats.goalsAgainst,
                goalDifference: stats.goalsFor - stats.goalsAgainst,
                points: stats.points
            };
        });

        // Sort by goal difference (primary), then points, then goals scored
        teamData.sort((a, b) => {
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
            if (b.points !== a.points) return b.points - a.points;
            return b.goalsFor - a.goalsFor;
        });

        // Create table for this tied group
        const table = document.createElement('table');
        table.className = 'h2h-table';
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th class="align-left">Team</th>
                <th>PTS</th>
                <th>Goals</th>
                <th>DIFF</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        teamData.forEach((team, index) => {
            const tr = document.createElement('tr');
            if (index + 1 <= 2) {
                tr.classList.add('first');
            }
            tr.innerHTML = `<td class="align-left">${index + 1}. ${team.teamName}</td><td>${team.points}</td><td>${team.goalsFor} : ${team.goalsAgainst}</td><td>${team.goalDifference}</td>`;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);

        // Add heading for this tied group
        const heading = document.createElement('h3');
        heading.textContent = `Teams tied on ${points} points`;
        h2hContent.appendChild(heading);
        h2hContent.appendChild(table);
    });

    // If no teams are tied, show message
    if (h2hContent.innerHTML === '') {
        h2hContent.innerHTML = '<p>No teams are currently tied on points.</p>';
    }
}

function updateStandings() {
    if (!originalStandings || !currentGroup) return;

    // Create a copy of original standings for recalculation
    const recalculatedStandings = JSON.parse(JSON.stringify(originalStandings));

    // Get all current match scores
    const matchScores = {};
    const scoreInputs = document.querySelectorAll('.home-score, .away-score');

    scoreInputs.forEach(input => {
        const matchId = input.dataset.matchId;
        if (!matchScores[matchId]) {
            matchScores[matchId] = {};
        }
        if (input.classList.contains('home-score')) {
            matchScores[matchId].home = parseInt(input.value) || 0;
            matchScores[matchId].homeTeam = input.dataset.homeTeam;
            matchScores[matchId].awayTeam = input.dataset.awayTeam;
        } else {
            matchScores[matchId].away = parseInt(input.value) || 0;
        }
    });

    // Helper function to apply match result to a team
    function applyMatchResult(team, teamScore, opponentScore, addStats) {
        const multiplier = addStats ? 1 : -1;

        if (teamScore !== null && opponentScore !== null && (teamScore > 0 || opponentScore > 0)) {
            team.games.played += multiplier;
            team.goals.for += multiplier * teamScore;
            team.goals.against += multiplier * opponentScore;

            if (teamScore > opponentScore) {
                team.games.win.total += multiplier;
                team.points += multiplier * 2;
            } else if (teamScore < opponentScore) {
                team.games.lose.total += multiplier;
            } else if (teamScore === opponentScore && teamScore > 0) {
                team.games.draw.total += multiplier;
                team.points += multiplier * 1;
            }
        }
    }

    // Helper function to find team in standings
    function findTeamInStandings(teamName) {
        let foundTeam = null;
        Object.keys(recalculatedStandings).forEach(key => {
            const standing = recalculatedStandings[key];
            Object.keys(standing).forEach(key => {
                const team = standing[key];
                if (team.stage == stage && team.team.name === teamName) {
                    foundTeam = team;
                }
            });
        });
        return foundTeam;
    }

    // Only update stats for matches that have been changed
    Object.keys(matchScores).forEach(matchId => {
        const match = matchScores[matchId];
        if (match.home !== undefined && match.away !== undefined && originalMatchScores[matchId]) {
            const newHomeScore = match.home;
            const newAwayScore = match.away;
            const homeTeamName = match.homeTeam;
            const awayTeamName = match.awayTeam;

            const originalMatch = originalMatchScores[matchId];
            const originalHomeScore = originalMatch.home || 0;
            const originalAwayScore = originalMatch.away || 0;

            // Check if this match has been changed
            const hasChanged = (newHomeScore !== originalHomeScore) || (newAwayScore !== originalAwayScore);

            if (hasChanged) {
                const homeTeam = findTeamInStandings(homeTeamName);
                const awayTeam = findTeamInStandings(awayTeamName);

                if (homeTeam) {
                    // Remove original stats
                    applyMatchResult(homeTeam, originalHomeScore, originalAwayScore, false);
                    // Add new stats
                    applyMatchResult(homeTeam, newHomeScore, newAwayScore, true);
                }

                if (awayTeam) {
                    // Remove original stats
                    applyMatchResult(awayTeam, originalAwayScore, originalHomeScore, false);
                    // Add new stats
                    applyMatchResult(awayTeam, newAwayScore, newHomeScore, true);
                }
            }
        }
    });

    // Update the table with recalculated standings
    createStandingsTable(recalculatedStandings, true);
    // Update head-to-head table
    createH2HTable();
}
getGroups()
    .then(groups => {
        if (!Array.isArray(groups) || groups.length === 0) {
            console.log('No valid groups found');
            return;
        }
        // Filter out empty/falsey/error groups
        const validGroups = groups.filter(
            group => typeof group === 'string' && group.trim().length > 0
        );
        if (validGroups.length === 0) {
            console.log('No valid groups after filtering');
            return;
        }
        validGroups.forEach(group => {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        document.getElementById('group').appendChild(option);
    });
    
    // Set default to group 2 and load its data
    const groupSelect = document.getElementById('group');
    const group2Value = validGroups.find(g => g.includes('2') || g === '2' || g.toLowerCase().includes('group 2'));
    if (group2Value) {
        groupSelect.value = group2Value;
        // Trigger change event to load group 2 data
        groupSelect.dispatchEvent(new Event('change'));
    } else if (validGroups.length > 1) {
        // If no exact "2" match, try to find it by index or use second group
        groupSelect.value = validGroups[1] || validGroups[0];
        groupSelect.dispatchEvent(new Event('change'));
    }
    })
    .catch(err => {
        console.log('Error fetching groups', err);
    });

document.getElementById('group').addEventListener('change', (event) => {
    currentGroup = event.target.value;
    getStandings(event.target.value).then(standings => {
        createStandingsTable(standings);
        // Wait for groupTeams to be populated, then fetch matches
        console.log('groupTeams populated:', groupTeams);
        if (groupTeams.length > 0) {
            Promise.all(groupTeams.map(item => getMatches(item.id)))
                .then(allMatches => {
                    // Flatten the array of arrays into a single array
                    const combinedMatches = allMatches.flat();
                    // Remove duplicates by match ID
                    const uniqueMatches = combinedMatches.filter((match, index, self) =>
                        index === self.findIndex(m => m.id === match.id)
                    );
                    createMatches(uniqueMatches);
                })
                .catch(error => {
                    console.log('error fetching matches', error);
                });
        } else {
            console.log('No teams found in group');
        }
    }).catch(error => {
        console.log('error', error);
    });
});