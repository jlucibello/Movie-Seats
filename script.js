// CSV data - seat visits
const csvData = `Location,Theater,Seat Row,Seat Number,Movie,Premium Format,Notes
Lincoln Sq,Theater 1,F,7,Hamnet,Dolby,
Lincoln Sq,Theater 1,J,19,Challengers,Dolby,
Lincoln Sq,Theater 1,J,20,Challengers,Dolby,
Lincoln Sq,Theater 2,D,10,The Brutalist,70MM,
Lincoln Sq,Theater 2,E,8,Lurker,Standard,Q&A
Lincoln Sq,Theater 2,L,11,The Smashing Machine,Standard,
Lincoln Sq,Theater 2,N,10,Marty Supreme,70MM,
Lincoln Sq,Theater 2,N,11,Marty Supreme,70MM,
Lincoln Sq,Theater 3,E,10,Friendship,Standard,
Lincoln Sq,Theater 4,K,16,Better Man,Standard,Q&A
Lincoln Sq,Theater 6,D,6,Nickel Boys,Standard,
Lincoln Sq,Theater 8,E,6,Freakier Friday,Standard,
Lincoln Sq,Theater 8,E,7,Freakier Friday,Standard,
Lincoln Sq,Theater 9,E,8,I'm Still Here,Standard,
Lincoln Sq,Theater 10,H,9,Anyone But You,Standard,
Lincoln Sq,Theater 10,H,10,Anyone But You,Standard,
Lincoln Sq,Theater 11,H,5,Poor Things,Standard,
Lincoln Sq,Theater 12,C,9,Is This Thing On?,Standard,
Lincoln Sq,Theater 13,A,22,Interstellar,IMAX 70MM,
Lincoln Sq,Theater 13,B,7,The Running Man,IMAX,Q&A
Lincoln Sq,Theater 13,E,26,Oppenheimer,IMAX 70MM,
Lincoln Sq,Theater 13,E,26,Thunderbolts*,IMAX,
Lincoln Sq,Theater 13,E,29,Avatar: Fire and Ash,IMAX,
Lincoln Sq,Theater 13,F,20,One Battle After Another,IMAX 70MM,
Lincoln Sq,Theater 13,G,32,Superman,IMAX,
Lincoln Sq,Theater 13,H,4,Dune: Part Two,IMAX 70MM,
Lincoln Sq,Theater 13,H,5,Dune: Part Two,IMAX 70MM,
Lincoln Sq,Theater 13,H,16,Alien: Romulus,IMAX,
Lincoln Sq,Theater 13,H,26,Sinners,IMAX 70MM,
Lincoln Sq,Theater 13,H,27,Sinners,IMAX 70MM,Rewatch
Lincoln Sq,Theater 13,H,32,Fantastic Four: First Steps,IMAX,
Lincoln Sq,Theater 13,J,10,Talk to Me,IMAX,
Lincoln Sq,Theater 13,J,13,Megalopolis,IMAX,
Lincoln Sq,Theater 13,K,6,Oppenheimer,IMAX 70MM,
Lincoln Sq,Theater 13,K,32,Apollo 13,IMAX,
Lincoln Sq,Theater 13,L,19,Inside Out 2,IMAX,
Lincoln Sq,Theater 13,L,20,Inside Out 2,IMAX,
Lincoln Sq,Theater 13,L,31,Interstellar,IMAX 70MM,Rewatch
Lincoln Sq,Theater 13,L,32,Interstellar,IMAX 70MM,Rewatch
Lincoln Sq,Theater 13,L,34,Furiosa: A Mad Max Saga,IMAX,
Lincoln Sq,Theater 13,L,36,F1 The Movie,IMAX,
34th St,Theater 1,D,5,Lilo & Stitch,Standard,
34th St,Theater 1,D,6,Lilo & Stitch,Standard,
34th St,Theater 1,F,4,Warfare,Standard,
34th St,Theater 1,G,4,Bob Marley: One Love,Standard,
34th St,Theater 2,E,9,We Live in Time,Standard,
34th St,Theater 2,E,10,We Live in Time,Standard,
34th St,Theater 3,G,4,The Fall Guy,Standard,
34th St,Theater 4,E,5,Speak No Evil,Standard,
34th St,Theater 4,E,6,Speak No Evil,Standard,
34th St,Theater 5,D,10,Blink Twice,Standard,
34th St,Theater 5,D,11,Blink Twice,Standard,
34th St,Theater 5,E,7,Deadpool & Wolverine,Standard,
34th St,Theater 5,E,8,Deadpool & Wolverine,Standard,
34th St,Theater 6,F,7,Babygirl,Standard,
34th St,Theater 6,F,8,Babygirl,Standard,
34th St,Theater 6,H,5,Kinds of Kindness,Standard,
34th St,Theater 7,G,5,Monkey Man,Standard,
34th St,Theater 8,C,15,The Roses,Standard,
34th St,Theater 8,E,8,A Minecraft Movie,Dolby,
34th St,Theater 8,E,9,A Minecraft Movie,Dolby,
34th St,Theater 8,E,10,A Minecraft Movie,Dolby,
34th St,Theater 9,E,4,Moana 2,Standard,
34th St,Theater 9,E,5,Moana 2,Standard,
34th St,Theater 10,F,9,Madame Web,Standard,
34th St,Theater 12,A,9,Eddington,Standard,
34th St,Theater 12,D,5,Kung Fu Panda 4,Standard,
34th St,Theater 12,D,6,Kung Fu Panda 4,Standard,
34th St,Theater 13,D,8,Weapons,IMAX,
34th St,Theater 13,D,12,Wolf Man,IMAX,
34th St,Theater 13,E,9,Se7en,IMAX,
34th St,Theater 13,H,11,Civil War,IMAX,
34th St,Theater 13,J,10,Kingdom of the Planet of the Apes,IMAX,
34th St,Theater 13,J,11,Kingdom of the Planet of the Apes,IMAX,
34th St,Theater 13,L,10,Everything Everywhere All At Once,IMAX,
34th St,Theater 13,M,16,Uncut Gems,IMAX,
19th St,Theater 1,F,1,Twisters,Standard,
19th St,Theater 1,F,2,Twisters,Standard,
19th St,Theater 2,G,9,Godzilla x King: The New Empire,Standard,
19th St,Theater 4,E,8,Ghostbusters: Frozen Empire,Standard,
19th St,Theater 5,F,5,A Quiet Place: Day One,Standard,
19th St,Theater 5,F,6,A Quiet Place: Day One,Standard,
19th St,Theater 6,B,8,Together,Standard,
Riverside,Theater 1,K,7,Avatar: The Way of Water,Standard,
Riverside,Theater 1,K,8,Avatar: The Way of Water,Standard,
Riverside,Theater 2,H,15,Guardians of the Galaxy Vol. 3,Standard,
Riverside,Theater 2,H,16,Guardians of the Galaxy Vol. 3,Standard,
Riverside,Theater 2,H,17,Guardians of the Galaxy Vol. 3,Standard,
Riverside,Theater 2,J,11,Unknown,Standard,Movie not listed
Riverside,Theater 2,J,12,Unknown,Standard,Movie not listed
Riverside,Theater 3,F,9,One Battle After Another,Standard,
Riverside,Theater 3,F,10,One Battle After Another,Standard,
Riverside,Theater 3,F,11,One Battle After Another,Standard,
Riverside,Theater 3,H,7,Thor: Love and Thunder,Standard,
Riverside,Theater 3,H,8,Thor: Love and Thunder,Standard,
Riverside,Theater 4,G,14,Ant-Man and the Wasp: Quantumania,Standard,
Riverside,Theater 4,G,15,Ant-Man and the Wasp: Quantumania,Standard,
Riverside,Theater 4,G,16,Ant-Man and the Wasp: Quantumania,Standard,
Riverside,Theater 5,E,7,Star Wars Episode I: The Phantom Menace,Standard,
Riverside,Theater 5,E,8,Star Wars Episode I: The Phantom Menace,Standard,
Riverside,Theater 5,E,9,Star Wars Episode I: The Phantom Menace,Standard,
Riverside,Theater 5,E,10,Star Wars Episode I: The Phantom Menace,Standard,
Riverside,Theater 5,E,11,Star Wars Episode I: The Phantom Menace,Standard,
Riverside,Theater 5,F,15,Black Panther: Wakanda Forever,Standard,
Riverside,Theater 5,F,16,Black Panther: Wakanda Forever,Standard,
Riverside,Theater 7,D,5,Don't Worry Darling,Standard,
Riverside,Theater 7,D,6,Don't Worry Darling,Standard,
Riverside,Theater 7,E,3,The Amateur,Standard,
Riverside,Theater 7,E,4,The Amateur,Standard,
Riverside,Theater 7,E,4,Naked Gun,Standard,
Riverside,Theater 7,E,5,Naked Gun,Standard,
Riverside,Theater 7,E,6,Naked Gun,Standard,
Garden State Plaza,Theater 3,E,13,Mickey 17,Standard,
Garden State Plaza,Theater 14,L,18,A Complete Unknown,Standard,
Garden State Plaza,Theater 14,L,19,A Complete Unknown,Standard,
Garden State Plaza,Theater 15,M,18,The Phoenician Scheme,Standard,
Garden State Plaza,Theater 15,M,19,The Phoenician Scheme,Standard,
Garden State Plaza,Theater 15,N,7,Oppenheimer,Standard,
Garden State Plaza,Theater 15,N,8,Oppenheimer,Standard,
Garden State Plaza,Theater 15,N,9,Oppenheimer,Standard,
Garden State Plaza,Theater 15,N,10,Oppenheimer,Standard,
Palisades,Theater 2,H,9,Creed III,Standard,
Palisades,Theater 2,H,10,Creed III,Standard,
Palisades,Theater 3,G,9,Spider-Man: Across the Spider-Verse,Standard,
Palisades,Theater 3,G,10,Spider-Man: Across the Spider-Verse,Standard,
Palisades,Theater 3,G,11,Spider-Man: Across the Spider-Verse,Standard,
Palisades,Theater 3,G,12,Spider-Man: Across the Spider-Verse,Standard,
Palisades,Theater 11,F,13,Barbie,Standard,
Palisades,Theater 11,F,14,Barbie,Standard,
Palisades,Theater 13,E,5,Top Gun: Maverick,Standard,
Palisades,Theater 13,E,6,Top Gun: Maverick,Standard,
Palisades,Theater 18,E,4,Saturday Night,Standard,
Palisades,Theater 18,E,5,Saturday Night,Standard,
Palisades,Theater 18,E,6,Saturday Night,Standard,
Wayne,Theater 6,D,10,Unknown,Standard,Movie not listed
Wayne,Theater 6,D,11,Unknown,Standard,Movie not listed
Wayne,Theater 6,D,12,Unknown,Standard,Movie not listed
Alderwood Mall,Theater 13,G,12,Longlegs,Standard,
Alderwood Mall,Theater 13,G,13,Longlegs,Standard,
Alderwood Mall,Theater 13,G,14,Longlegs,Standard`;

// Parse CSV data
function parseCSVData(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const seatVisits = {};
    const locations = new Set();
    const theaterMap = {};
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        // Handle CSV parsing (simple split, may need improvement for quoted fields)
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        
        if (values.length < 6) continue;
        
        const location = values[0].trim();
        const theater = values[1].trim();
        const row = values[2].trim().toUpperCase(); // Normalize to uppercase
        const seatNum = parseInt(values[3].trim());
        const movie = values[4].trim();
        const format = values[5].trim();
        const notes = values[6] ? values[6].trim() : '';
        
        if (!location || !theater || !row || isNaN(seatNum)) continue;
        
        locations.add(location);
        
        // Create location key
        const locationKey = location.toLowerCase().replace(/\s+/g, '-');
        if (!theaterMap[locationKey]) {
            theaterMap[locationKey] = new Set();
        }
        
        // Extract theater number
        const theaterMatch = theater.match(/\d+/);
        const theaterNum = theaterMatch ? theaterMatch[0] : theater;
        theaterMap[locationKey].add(theaterNum);
        
        // Store seat visit data
        const key = `${locationKey}-${theaterNum}-${row}-${seatNum}`;
        if (!seatVisits[key]) {
            seatVisits[key] = [];
        }
        seatVisits[key].push({ movie, format, notes });
    }
    
    return { seatVisits, locations: Array.from(locations), theaterMap };
}

// Get 34th St auditorium 1 layout
function get34thSt1Layout() {
    return [
        // Row A: 14 seats (A1-A14, right-to-left numbering)
        { pattern: Array(14).fill('normal') },
        // Row B: 14 seats (B1-B14, right-to-left numbering)
        { pattern: Array(14).fill('normal') },
        // Row C: 8 accessible seats (1-8) with gaps on both sides
        // From left to right: gaps, 8 accessible seats, gaps
        { pattern: (() => {
            const seats = [];
            // Left gap (approximately 2-3 seat widths based on image)
            seats.push('gap', 'gap');
            // 8 accessible seats (numbered 1-8)
            for (let i = 0; i < 8; i++) {
                seats.push('accessible');
            }
            // Right gap (approximately 2-3 seat widths)
            seats.push('gap', 'gap');
            return seats;
        })() },
        // Row D: 10 seats (1-10)
        { pattern: Array(10).fill('normal') },
        // Row E: 10 seats (1-10)
        { pattern: Array(10).fill('normal') },
        // Row F: 10 seats (1-10)
        { pattern: Array(10).fill('normal') },
        // Row G: 10 seats (1-10)
        { pattern: Array(10).fill('normal') }
    ];
}

// Get Lincoln Sq auditorium 1 layout
function getLincolnSq1Layout() {
    return {
        rows: [
        // Row A: 15 seats (A1-A15), A6, A7, A8, A9 accessible
        // System numbers right-to-left, so A1 is rightmost, A15 is leftmost
        // A6, A7, A8, A9 are 6th, 7th, 8th, 9th from right
        { pattern: (() => {
            const seats = [];
            // Leftmost 6 seats (A15-A10) - normal
            for (let i = 0; i < 6; i++) {
                seats.push('normal');
            }
            // Next 4 seats (A9-A6) - accessible
            for (let i = 0; i < 4; i++) {
                seats.push('accessible');
            }
            // Rightmost 5 seats (A5-A1) - normal
            for (let i = 0; i < 5; i++) {
                seats.push('normal');
            }
            return seats;
        })() },
        // Row B: 19 seats (B1-B19)
        { pattern: Array(19).fill('normal') },
        // Row C: 24 seats (C1-C24)
        { pattern: Array(24).fill('normal') },
        // Row D: 28 seats (D1-D28)
        { pattern: Array(28).fill('normal') },
        // Row E: 26 seats with gaps
        // From right: 1-10, gap, 11-16, gap, 17-26
        { pattern: (() => {
            const seats = [];
            // Leftmost section: seats 17-26 (10 seats)
            for (let i = 0; i < 10; i++) {
                seats.push('normal');
            }
            // Gap
            seats.push('gap');
            // Middle section: seats 11-16 (6 seats)
            for (let i = 0; i < 6; i++) {
                seats.push('normal');
            }
            // Gap
            seats.push('gap');
            // Rightmost section: seats 1-10 (10 seats)
            for (let i = 0; i < 10; i++) {
                seats.push('normal');
            }
            return seats;
        })(), seatNumbers: (() => {
            const nums = [];
            // Leftmost: 17-26
            for (let i = 26; i >= 17; i--) nums.push(i);
            nums.push(null); // Gap
            // Middle: 11-16
            for (let i = 16; i >= 11; i--) nums.push(i);
            nums.push(null); // Gap
            // Rightmost: 1-10
            for (let i = 10; i >= 1; i--) nums.push(i);
            return nums;
        })() },
        // Row F: 28 seats (F1-F28)
        { pattern: Array(28).fill('normal') },
        // Row G: 28 seats (G1-G28)
        { pattern: Array(28).fill('normal') },
        // Row H: 28 seats (H1-H28)
        { pattern: Array(28).fill('normal') },
        // Row J: 22 seats (J1-J22), J14, J15, J16, J17 accessible
        // System numbers right-to-left, so J1 is rightmost, J22 is leftmost
        // J14, J15, J16, J17 are 14th, 15th, 16th, 17th from right
        { pattern: (() => {
            const seats = [];
            // Leftmost 5 seats (J22-J18) - normal
            for (let i = 0; i < 5; i++) {
                seats.push('normal');
            }
            // Next 4 seats (J17-J14) - accessible
            for (let i = 0; i < 4; i++) {
                seats.push('accessible');
            }
            // Rightmost 13 seats (J13-J1) - normal
            for (let i = 0; i < 13; i++) {
                seats.push('normal');
            }
            return seats;
        })() },
        // Row K: Based on image pattern, likely similar to other rows
        // User didn't specify, but image shows pattern. Let me use a reasonable default
        // I'll make it 28 seats like F, G, H
        { pattern: Array(28).fill('normal') },
        // Row L: 28 seats
        { pattern: Array(28).fill('normal') },
        // Row M: 28 seats
        { pattern: Array(28).fill('normal') },
        // Row N: 28 seats
        { pattern: Array(28).fill('normal') }
        ],
        rowLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N'] // Skip row I
    };
}

// Get Lincoln Sq auditorium 9 layout
function getLincolnSq9Layout() {
    return [
        // Row A: gap, gap, 3, 4, 5, 6, 7, 8, 9, 10 (from right to left visually)
        // Gaps on the right, seats on the left. Rightmost seat should be A3, so offset is 2
        { pattern: (() => {
            const seats = [];
            // 2 gaps on the right (representing missing seats 1 and 2 on the right)
            for (let i = 0; i < 8; i++) {
                seats.push('normal');
            }
            seats.push('gap', 'gap');
            // 8 seats on the left (will be numbered 1-8, displayed as 3-10)
            return seats;
        })(), seatNumberOffset: 2 }, // Offset: add 2 to seat numbers (1 becomes 3, 8 becomes 10)
        // Row B: gap, 2, 3, 4, 5, 6, 7, 8, 9, 10 (from right to left visually) with B2 and B3 accessible
        // Gap on the left, seats on the right. B2 and B3 are the rightmost two seats (accessible)
        { pattern: (() => {
            const seats = [];
            // 7 normal seats
            for (let i = 0; i < 7; i++) {
                seats.push('normal');
            }
            // B2 and B3 are the rightmost two seats (accessible)
            seats.push('accessible', 'accessible');
            // 1 gap on the right (representing missing seat 1 on the right)
            seats.push('gap');
            return seats;
        })(), seatNumberOffset: 1 }, // Offset: add 1 to seat numbers (1 becomes 2, 9 becomes 10)
        // Rows C through K: seats 1 through 10 - 9 rows, each with 10 seats
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row C
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row D
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row E
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row F
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row G
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row H
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row I
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row J
        { pattern: Array(10).fill('normal'), seatNumberOffset: 0 }, // Row K
        // Row L: seats 2 through 9 (from right) - 8 seats, missing seats 1 and 10, all accessible
        // Rightmost seat should be L2, so offset is 1 (seats numbered 1-8 display as 2-9)
        { pattern: (() => {
            const seats = [];
            seats.push('gap'); // Missing seat 10 (leftmost)
            // 8 accessible seats that will be numbered 1-8, displayed as 2-9
            for (let i = 0; i < 8; i++) {
                seats.push('accessible');
            }
            seats.push('gap'); // Missing seat 1 (rightmost)
            return seats;
        })(), seatNumberOffset: 1 } // Offset: add 1 to seat numbers (1 becomes 2, 8 becomes 9)
    ];
}

// Get 19th St theater layout (Auditorium 6)
function get19thStLayout() {
    return [
        // Row A: 10 seats
        { pattern: Array(10).fill('normal') },
        // Row B: 10 seats
        { pattern: Array(10).fill('normal') },
        // Row C: 10 seats
        { pattern: Array(10).fill('normal') },
        // Row D: 10 seats
        { pattern: Array(10).fill('normal') },
        // Row E: 10 seats
        { pattern: Array(10).fill('normal') },
        // Row F: 10 seats
        { pattern: Array(10).fill('normal') },
        // Row G: 8 seats, all accessible/handicap
        { pattern: Array(8).fill('accessible') },
        // Row H: 6 seats - from the right: seat 1, 2, 3, 4, gap, gap, 5, 6
        // System numbers right-to-left (rightmost=1), so pattern should be:
        // [seat6, seat5, gap, gap, seat4, seat3, seat2, seat1] from left to right
        { pattern: (() => {
            const seats = [];
            seats.push('normal', 'normal'); // Leftmost seats (will be numbered 6, 5)
            seats.push('gap', 'gap'); // Two gaps
            seats.push('normal', 'normal', 'normal', 'normal'); // Rightmost seats (will be numbered 4, 3, 2, 1)
            return seats;
        })() }
    ];
}

// Get standard layout (same for all theaters for now)
function getStandardLayout() {
    return [
        // Row A: 33 seats, A28, A29, A30, A31 are accessible
        { pattern: (() => {
            const seats = Array(33).fill('normal');
            seats[5] = 'accessible'; // A28
            seats[4] = 'accessible'; // A29
            seats[3] = 'accessible'; // A30
            seats[2] = 'accessible'; // A31
            return seats;
        })() },
        // Row B: 35 seats
        { pattern: Array(35).fill('normal') },
        // Row C: 38 seats
        { pattern: Array(38).fill('normal') },
        // Row D: 41 seats
        { pattern: Array(41).fill('normal') },
        // Row E: 42 seats
        { pattern: Array(42).fill('normal') },
        // Row F: 42 seats
        { pattern: Array(42).fill('normal') },
        // Row G: 42 seats
        { pattern: Array(42).fill('normal') },
        // Row H: 42 seats
        { pattern: Array(42).fill('normal') },
        // Row I: 42 seats
        { pattern: Array(42).fill('normal') },
        // Row J: 42 seats
        { pattern: Array(42).fill('normal') },
        // Row K: 42 seats
        { pattern: Array(42).fill('normal') },
        // Row L: 42 seats
        { pattern: Array(42).fill('normal') },
        // Row M: 39 seats, M10, M11, M12, M13, M18, M19, M20, M21, M26, M27, M28, M29 are accessible
        { pattern: (() => {
            const seats = Array(39).fill('normal');
            const accessibleSeatNumbers = [10, 11, 12, 13, 18, 19, 20, 21, 26, 27, 28, 29];
            accessibleSeatNumbers.forEach(seatNum => {
                const index = 39 - seatNum;
                seats[index] = 'accessible';
            });
            return seats;
        })() },
        // Row N: 42 seats (assumed - same as other rows)
        { pattern: Array(42).fill('normal') }
    ];
}

// Parse CSV and build theater structure
const { seatVisits, locations, theaterMap } = parseCSVData(csvData);
const standardLayout = getStandardLayout();

// Build theaters object from CSV data
const theaters = {};
locations.forEach(location => {
    const locationKey = location.toLowerCase().replace(/\s+/g, '-');
    const locationName = location;
    theaters[locationKey] = {
        name: locationName,
        auditoriums: {}
    };
    
    const theaterNums = Array.from(theaterMap[locationKey] || []).sort((a, b) => parseInt(a) - parseInt(b));
    theaterNums.forEach(theaterNum => {
        // Use specific layouts for certain theaters
        let layout;
        if (locationKey === '19th-st' && theaterNum === '6') {
            layout = get19thStLayout();
        } else if (locationKey === 'lincoln-sq' && theaterNum === '1') {
            layout = getLincolnSq1Layout();
        } else if (locationKey === 'lincoln-sq' && theaterNum === '9') {
            layout = getLincolnSq9Layout();
        } else if (locationKey === '34th-st' && theaterNum === '1') {
            layout = get34thSt1Layout();
        } else {
            layout = standardLayout;
        }
        theaters[locationKey].auditoriums[theaterNum] = {
            name: `Theater ${theaterNum}`,
            layout: layout
        };
    });
});

// Store seat visit data globally
window.seatVisits = seatVisits;

// Current theater and auditorium (default to first location and theater)
const firstLocation = locations[0] ? locations[0].toLowerCase().replace(/\s+/g, '-') : 'lincoln-sq';
const firstTheater = Array.from(theaterMap[firstLocation] || [])[0] || '13';
let currentTheater = firstLocation;
let currentAuditorium = firstTheater;

// Store seat states (sat in or not) per theater/auditorium
let seatStates = {};

// Initialize seat states from localStorage if available
function loadSeatStates() {
    const saved = localStorage.getItem('seatStates');
    if (saved) {
        seatStates = JSON.parse(saved);
    } else {
        seatStates = {};
    }
}

// Reset all seats for current theater/auditorium to "not sat in"
function resetAllSeats() {
    const seatLayout = getCurrentSeatLayout();
    if (!seatLayout || seatLayout.length === 0) return;
    
    const rowLetters = getCurrentRowLetters();
    const prefix = `${currentTheater}-${currentAuditorium}-`;
    
    // Remove all keys for current theater/auditorium
    Object.keys(seatStates).forEach(key => {
        if (key.startsWith(prefix)) {
            delete seatStates[key];
        }
    });
    
    saveSeatStates();
    renderSeatingChart();
}

// Clear all seat data (for all theaters/auditoriums)
function clearAllSeatData() {
    seatStates = {};
    saveSeatStates();
    renderSeatingChart();
}

// Save seat states to localStorage
function saveSeatStates() {
    localStorage.setItem('seatStates', JSON.stringify(seatStates));
}

// Get seat key (theater + auditorium + row + seat number)
function getSeatKey(theater, auditorium, row, seatNumber) {
    return `${theater}-${auditorium}-${row}-${seatNumber}`;
}

// Get current seat key
function getCurrentSeatKey(row, seatNumber) {
    return getSeatKey(currentTheater, currentAuditorium, row, seatNumber);
}

// Get visit data for a seat
function getSeatVisitData(row, seatNumber) {
    const key = getCurrentSeatKey(row, seatNumber);
    return window.seatVisits[key] || null;
}

// Check if seat has been sat in (either in localStorage or CSV data)
function hasSatIn(row, seatNumber) {
    const key = getCurrentSeatKey(row, seatNumber);
    // Check CSV visit data first
    if (window.seatVisits && window.seatVisits[key] && window.seatVisits[key].length > 0) {
        return true;
    }
    // Check localStorage
    return seatStates[key] === true;
}

// Toggle seat state
function toggleSeat(row, seatNumber) {
    const key = getCurrentSeatKey(row, seatNumber);
    seatStates[key] = !seatStates[key];
    saveSeatStates();
    renderSeatingChart();
}

// Check if current auditorium uses standard layout
function usesStandardLayout() {
    const layout = theaters[currentTheater]?.auditoriums[currentAuditorium]?.layout;
    if (!layout) return false;
    
    // Check if it's the standard layout by comparing with the standard layout reference
    return layout === standardLayout;
}

// Get all seat visit data for current theater/auditorium
function getSeatVisitDataForCurrentAuditorium() {
    const visits = [];
    const prefix = `${currentTheater}-${currentAuditorium}-`;
    
    Object.keys(window.seatVisits).forEach(key => {
        if (key.startsWith(prefix)) {
            // Remove the prefix to get the row-seat part
            const remainder = key.substring(prefix.length);
            // Split by '-' to get row and seat number
            const parts = remainder.split('-');
            const row = parts[0];
            const seatNum = parseInt(parts[1]);
            const visitData = window.seatVisits[key];
            
            visitData.forEach(visit => {
                visits.push({
                    row: row,
                    seat: seatNum,
                    movie: visit.movie,
                    format: visit.format,
                    notes: visit.notes
                });
            });
        }
    });
    
    // Sort by row (A-Z) then by seat number
    visits.sort((a, b) => {
        if (a.row !== b.row) {
            return a.row.localeCompare(b.row);
        }
        return a.seat - b.seat;
    });
    
    return visits;
}

// Get current seat layout
function getCurrentSeatLayout() {
    const layout = theaters[currentTheater]?.auditoriums[currentAuditorium]?.layout || [];
    // If layout is an object with rows property, return the rows array
    if (layout && typeof layout === 'object' && !Array.isArray(layout) && layout.rows) {
        return layout.rows;
    }
    return layout;
}

// Get custom row letters for current layout
function getCurrentRowLetters() {
    const layout = theaters[currentTheater]?.auditoriums[currentAuditorium]?.layout || [];
    // If layout is an object with rowLetters property, return it
    if (layout && typeof layout === 'object' && !Array.isArray(layout) && layout.rowLetters) {
        return layout.rowLetters;
    }
    // Default row letters
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
}

// Update auditorium dropdown based on selected theater
function updateAuditoriumDropdown() {
    const auditoriumSelect = document.getElementById('auditoriumSelect');
    auditoriumSelect.innerHTML = '';
    
    const auditoriums = theaters[currentTheater]?.auditoriums || {};
    Object.keys(auditoriums).forEach(auditoriumId => {
        const option = document.createElement('option');
        option.value = auditoriumId;
        option.textContent = auditoriums[auditoriumId].name;
        auditoriumSelect.appendChild(option);
    });
    
    // Set current auditorium if it exists, otherwise set to first
    if (auditoriums[currentAuditorium]) {
        auditoriumSelect.value = currentAuditorium;
    } else {
        const firstAuditorium = Object.keys(auditoriums)[0];
        if (firstAuditorium) {
            currentAuditorium = firstAuditorium;
            auditoriumSelect.value = currentAuditorium;
        }
    }
}

// Check if current auditorium has updated layout
function isLayoutUpdated(theater, auditorium) {
    // List of updated auditoriums: location-key, auditorium-number
    const updatedAuditoriums = [
        { location: 'lincoln-sq', auditorium: '1' },
        { location: 'lincoln-sq', auditorium: '9' },
        { location: '19th-st', auditorium: '6' },
        { location: '34th-st', auditorium: '1' }
    ];
    
    return updatedAuditoriums.some(item => 
        item.location === theater && item.auditorium === auditorium
    );
}

// Update layout note visibility
function updateLayoutNote() {
    const layoutNote = document.getElementById('layoutNote');
    if (layoutNote) {
        const isUpdated = isLayoutUpdated(currentTheater, currentAuditorium);
        layoutNote.style.display = isUpdated ? 'none' : 'block';
    }
}

// Handle theater selection change
function handleTheaterChange() {
    const theaterSelect = document.getElementById('theaterSelect');
    currentTheater = theaterSelect.value;
    updateAuditoriumDropdown();
    updateLayoutNote();
    renderSeatingChart();
}

// Handle auditorium selection change
function handleAuditoriumChange() {
    const auditoriumSelect = document.getElementById('auditoriumSelect');
    currentAuditorium = auditoriumSelect.value;
    updateLayoutNote();
    renderSeatingChart();
}

// Create a seat element
function createSeat(row, seatNumber, accessible = false) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    
    if (accessible) {
        seat.classList.add('accessible');
    }
    
    const visitData = getSeatVisitData(row, seatNumber);
    const hasBeenSatIn = hasSatIn(row, seatNumber);
    
    if (hasBeenSatIn) {
        seat.classList.add('sat-in');
        // Add tooltip data
        if (visitData && visitData.length > 0) {
            seat.setAttribute('data-tooltip', 'true');
            const tooltipText = visitData.map(v => {
                let text = `${v.movie} (${v.format})`;
                if (v.notes) {
                    text += ` - ${v.notes}`;
                }
                return text;
            }).join('\n');
            seat.setAttribute('title', tooltipText);
            seat.setAttribute('data-movies', JSON.stringify(visitData));
        }
    } else {
        seat.classList.add('available');
    }
    
    const seatNumberLabel = document.createElement('span');
    seatNumberLabel.className = 'seat-number';
    seatNumberLabel.textContent = seatNumber;
    seat.appendChild(seatNumberLabel);
    
    // Add tooltip element for hover
    if (visitData && visitData.length > 0) {
        const tooltip = document.createElement('div');
        tooltip.className = 'seat-tooltip';
        const tooltipContent = visitData.map(v => {
            let text = `<strong>${v.movie}</strong><br>${v.format}`;
            if (v.notes) {
                text += `<br><em>${v.notes}</em>`;
            }
            return `<div class="tooltip-entry">${text}</div>`;
        }).join('');
        tooltip.innerHTML = tooltipContent;
        seat.appendChild(tooltip);
    }
    
    seat.addEventListener('click', () => toggleSeat(row, seatNumber));
    
    return seat;
}

// Create an unavailable seat (gray outline)
function createUnavailableSeat() {
    const seat = document.createElement('div');
    seat.className = 'seat unavailable';
    seat.style.background = 'transparent';
    seat.style.border = '2px solid #666';
    seat.style.cursor = 'not-allowed';
    seat.style.opacity = '0.5';
    return seat;
}

// Render seat visit data as a table
function renderSeatVisitTable() {
    const chart = document.getElementById('seatingChart');
    chart.innerHTML = '';
    
    // Hide the screen element when showing table
    const screen = document.querySelector('.screen');
    if (screen) {
        screen.style.display = 'none';
    }
    
    // Hide the legend when showing table
    const legend = document.querySelector('.legend');
    if (legend) {
        legend.style.display = 'none';
    }
    
    const visits = getSeatVisitDataForCurrentAuditorium();
    
    if (visits.length === 0) {
        chart.innerHTML = '<p style="color: white; text-align: center; padding: 40px;">No seat visit data available for this auditorium.</p>';
        return;
    }
    
    // Create table
    const table = document.createElement('table');
    table.className = 'seat-visit-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Row', 'Seat', 'Movie', 'Format', 'Notes'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    visits.forEach(visit => {
        const row = document.createElement('tr');
        
        const rowCell = document.createElement('td');
        rowCell.textContent = visit.row;
        row.appendChild(rowCell);
        
        const seatCell = document.createElement('td');
        seatCell.textContent = visit.seat;
        row.appendChild(seatCell);
        
        const movieCell = document.createElement('td');
        movieCell.textContent = visit.movie;
        row.appendChild(movieCell);
        
        const formatCell = document.createElement('td');
        formatCell.textContent = visit.format;
        row.appendChild(formatCell);
        
        const notesCell = document.createElement('td');
        notesCell.textContent = visit.notes || '';
        row.appendChild(notesCell);
        
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    chart.appendChild(table);
}

// Render the seating chart
function renderSeatingChart() {
    const chart = document.getElementById('seatingChart');
    chart.innerHTML = '';
    
    // If using standard layout, show table instead
    if (usesStandardLayout()) {
        renderSeatVisitTable();
        return;
    }
    
    // Show the screen element when showing seating chart
    const screen = document.querySelector('.screen');
    if (screen) {
        screen.style.display = 'block';
    }
    
    // Show the legend when showing seating chart
    const legend = document.querySelector('.legend');
    if (legend) {
        legend.style.display = 'flex';
    }
    
    const seatLayout = getCurrentSeatLayout();
    if (!seatLayout || seatLayout.length === 0) {
        chart.innerHTML = '<p style="color: white;">No seating layout available for this auditorium.</p>';
        return;
    }
    
    const rowLetters = getCurrentRowLetters();
    
    seatLayout.forEach((rowData, rowIndex) => {
        const row = document.createElement('div');
        row.className = 'row';
        
        const rowLabelLeft = document.createElement('div');
        rowLabelLeft.className = 'row-label row-label-left';
        rowLabelLeft.textContent = rowLetters[rowIndex];
        row.appendChild(rowLabelLeft);
        
        // Count actual seats (excluding gaps) for numbering
        const actualSeats = rowData.pattern.filter(seatType => seatType !== 'gap').length;
        let seatsSeenSoFar = 0;
        let patternIndex = 0;
        
        // Number seats right to left (seat 1 is on the right)
        // Iterate left to right through pattern, number seats from right to left
        rowData.pattern.forEach((seatType) => {
            if (seatType === 'gap') {
                // Create empty space for gap
                const gap = document.createElement('div');
                gap.style.width = '28px';
                gap.style.height = '28px';
                row.appendChild(gap);
            } else {
                // Use custom seat number if available, otherwise calculate it
                let seatNumber;
                if (rowData.seatNumbers && rowData.seatNumbers[patternIndex] !== null && rowData.seatNumbers[patternIndex] !== undefined) {
                    seatNumber = rowData.seatNumbers[patternIndex];
                } else {
                    // Calculate seat number: rightmost seat is 1, leftmost is actualSeats
                    // seatNumber = actualSeats - seatsSeenSoFar
                    seatNumber = actualSeats - seatsSeenSoFar;
                    // Apply offset if specified (for rows that don't start at seat 1)
                    const offset = rowData.seatNumberOffset || 0;
                    seatNumber += offset;
                }
                const accessible = seatType === 'accessible';
                row.appendChild(createSeat(rowLetters[rowIndex], seatNumber, accessible));
                seatsSeenSoFar++;
            }
            patternIndex++;
        });
        
        const rowLabelRight = document.createElement('div');
        rowLabelRight.className = 'row-label row-label-right';
        rowLabelRight.textContent = rowLetters[rowIndex];
        row.appendChild(rowLabelRight);
        
        chart.appendChild(row);
    });
}

// Initialize the application
function init() {
    loadSeatStates();
    
    // Set up theater dropdown
    const theaterSelect = document.getElementById('theaterSelect');
    theaterSelect.innerHTML = '';
    Object.keys(theaters).forEach(theaterId => {
        const option = document.createElement('option');
        option.value = theaterId;
        option.textContent = theaters[theaterId].name;
        theaterSelect.appendChild(option);
    });
    theaterSelect.value = currentTheater;
    theaterSelect.addEventListener('change', handleTheaterChange);
    
    // Set up auditorium dropdown
    updateAuditoriumDropdown();
    const auditoriumSelect = document.getElementById('auditoriumSelect');
    auditoriumSelect.addEventListener('change', handleAuditoriumChange);
    
    // Update layout note visibility
    updateLayoutNote();
    
    // Don't reset seats - use CSV data instead
    renderSeatingChart();
}

// Initialize when page loads
init();
