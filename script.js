// URL for live Google Sheets CSV data
const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRWR7kK7kSqhRf04Vrqe25sojonkGikhm5kwNKIj4iCZnJHixF26ObR4czKvMXEJnpl15VxFYmq-sg1/pub?output=csv';

// Parse CSV data (supports both local CSV and Google Sheets CSV formats)
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
        
        if (values.length < 4) continue;
        
        // Column 0: full theater name from the CSV / Google Sheet (e.g., "AMC Lincoln Square 13")
        // Column 1: auditorium (e.g., "Theater 1")
        const location = values[0].trim();
        const theater = values[1].trim();
        const row = values[2].trim().toUpperCase(); // Normalize to uppercase
        const seatNum = parseInt(values[3].trim());
        const movie = values[4] ? values[4].trim() : '';
        const format = values[5] ? values[5].trim() : '';
        // For Google Sheets, column 6 is "Seat Rating" and column 7 is "Additional Notes".
        const rating = values[6] ? values[6].trim() : '';
        const additionalNotes = values[7] ? values[7].trim() : '';
        // Keep notes for backward compatibility (combine rating and additionalNotes)
        let notes = '';
        if (rating) {
            notes = rating;
        }
        if (additionalNotes) {
            notes = notes ? `${notes} - ${additionalNotes}` : additionalNotes;
        }
        
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
        
        // Store seat visit data with separate rating and additionalNotes fields
        const key = `${locationKey}-${theaterNum}-${row}-${seatNum}`;
        if (!seatVisits[key]) {
            seatVisits[key] = [];
        }
        seatVisits[key].push({ movie, format, notes, rating, additionalNotes, row, seat: seatNum });
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

// Get 34th St auditorium 8 layout
function get34thSt8Layout() {
    return [
        // Row A: 12 seats (A1-A12)
        { pattern: Array(12).fill('normal') },
        // Row B: 16 seats (B1-B16)
        { pattern: Array(16).fill('normal') },
        // Row C: 18 seats (C1-C18)
        { pattern: Array(18).fill('normal') },
        // Row D: 17 seats (D1-D17) with gap on the left
        { pattern: (() => {
            const seats = ['gap'];
            seats.push(...Array(17).fill('normal'));
            return seats;
        })() },
        // Row E: 17 seats (E1-E17) with gap on the left
        { pattern: (() => {
            const seats = ['gap'];
            seats.push(...Array(17).fill('normal'));
            return seats;
        })() },
        // Row F: 17 seats (F1-F17) with gap on the left
        { pattern: (() => {
            const seats = ['gap'];
            seats.push(...Array(17).fill('normal'));
            return seats;
        })() },
        // Row G: 17 seats (G1-G17) with gap on the left
        { pattern: (() => {
            const seats = ['gap'];
            seats.push(...Array(17).fill('normal'));
            return seats;
        })() },
        // Row H: 17 seats (H1-H17) with gap on the left
        { pattern: (() => {
            const seats = ['gap'];
            seats.push(...Array(17).fill('normal'));
            return seats;
        })() }
    ];
}

// Get 34th St auditorium 13 layout
function get34thSt13Layout() {
    return [
        // Row A: 17 seats (A1-A17)
        { pattern: Array(17).fill('normal') },
        // Row B: 19 seats (B1-B19)
        { pattern: Array(19).fill('normal') },
        // Row C: 16 seats (C1-C16), C7-C10 are accessible
        // Seats numbered right-to-left, so C7-C10 are indices 9, 8, 7, 6
        { pattern: (() => {
            const seats = Array(16).fill('normal');
            // Mark C7-C10 as accessible (indices 9, 8, 7, 6 from right)
            seats[9] = 'accessible';  // C7
            seats[8] = 'accessible';  // C8
            seats[7] = 'accessible';  // C9
            seats[6] = 'accessible';  // C10
            return seats;
        })() },
        // Row D: 18 seats (D1-D18)
        { pattern: Array(18).fill('normal') },
        // Row E: 18 seats (E1-E18)
        { pattern: Array(18).fill('normal') },
        // Row F: 18 seats (F1-F18)
        { pattern: Array(18).fill('normal') },
        // Row G: 18 seats (G1-G18)
        { pattern: Array(18).fill('normal') },
        // Row H: 18 seats (H1-H18)
        { pattern: Array(18).fill('normal') },
        // Row I: 18 seats (I1-I18)
        { pattern: Array(18).fill('normal') },
        // Row J: 18 seats (J1-J18)
        { pattern: Array(18).fill('normal') },
        // Row K: 18 seats (K1-K18)
        { pattern: Array(18).fill('normal') },
        // Row L: 22 seats (L1-L22)
        { pattern: Array(22).fill('normal') },
        // Row M: 19 seats (M1-M19), M4-M13 are accessible
        // Seats numbered right-to-left, so M4-M13 are indices 15 down to 6
        { pattern: (() => {
            const seats = Array(19).fill('normal');
            // Mark M4-M13 as accessible (indices 15, 14, 13, 12, 11, 10, 9, 8, 7, 6 from right)
            for (let i = 15; i >= 6; i--) {
                seats[i] = 'accessible';
            }
            return seats;
        })() }
    ];
}

// Get Lincoln Sq auditorium 1 layout
function getLincolnSq1Layout() {
    return {
        rows: [
        // Row A: 15 seats (A1-A15), A6, A7, A8, A9 accessible, shifted right by one space
        // System numbers right-to-left, so A1 is rightmost, A15 is leftmost
        // A6, A7, A8, A9 are 6th, 7th, 8th, 9th from right
        { pattern: (() => {
            const seats = [];
            // Gap at leftmost (shifts row right by one space)
            seats.push('gap');
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
        // Row B: 19 seats (B1-B19), shifted right by one space
        { pattern: (() => {
            const seats = [];
            // Gap at leftmost (shifts row right by one space)
            seats.push('gap');
            // 19 seats
            for (let i = 0; i < 19; i++) {
                seats.push('normal');
            }
            return seats;
        })() },
        // Row C: 24 seats (C1-C24)
        { pattern: Array(24).fill('normal') },
        // Row D: 28 seats (D1-D28)
        { pattern: Array(28).fill('normal') },
        // Row E: 26 seats with gaps
        // From right: 1-10, gap, 11-16, gap, 17-26
        // Seats 9-12 and 15-18 are accessible
        // Pattern positions: 0-9 (seats 26-17), 10 (gap), 11-16 (seats 16-11), 17 (gap), 18-27 (seats 10-1)
        { pattern: (() => {
            const seats = [];
            // Leftmost section: seats 17-26 (positions 0-9)
            // Positions 0-7: seats 26-19 (normal)
            for (let i = 0; i < 8; i++) {
                seats.push('normal');
            }
            // Position 8: seat 18 (accessible)
            seats.push('accessible');
            // Position 9: seat 17 (accessible)
            seats.push('accessible');
            // Gap (position 10)
            seats.push('gap');
            // Middle section: seats 11-16 (positions 11-16)
            // Position 11: seat 16 (accessible)
            seats.push('accessible');
            // Position 12: seat 15 (accessible)
            seats.push('accessible');
            // Positions 13-14: seats 14-13 (normal)
            for (let i = 0; i < 2; i++) {
                seats.push('normal');
            }
            // Position 15: seat 12 (accessible)
            seats.push('accessible');
            // Position 16: seat 11 (accessible)
            seats.push('accessible');
            // Gap (position 17)
            seats.push('gap');
            // Rightmost section: seats 1-10 (positions 18-27)
            // Position 18: seat 10 (accessible)
            seats.push('accessible');
            // Position 19: seat 9 (accessible)
            seats.push('accessible');
            // Positions 20-27: seats 8-1 (normal)
            for (let i = 0; i < 8; i++) {
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
        // Shifted right by 6 gaps to align J1 with H1 (H has 28 seats, J has 22 seats)
        { pattern: (() => {
            const seats = [];
            // 6 gaps on the left to align J1 with H1
            for (let i = 0; i < 6; i++) {
                seats.push('gap');
            }
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
        // Row K: 25 seats with gaps between seats 4-5 and 21-22, shifted right by one space
        // From right: seats 1-4, gap, seats 5-21, gap, seats 22-25
        { pattern: (() => {
            const seats = [];
            // Gap at leftmost (shifts row right by one space)
            seats.push('gap');
            // Leftmost section: seats 22-25 (4 seats)
            for (let i = 0; i < 4; i++) {
                seats.push('normal');
            }
            // Gap between seats 21 and 22
            seats.push('gap');
            // Middle section: seats 5-21 (17 seats)
            for (let i = 0; i < 17; i++) {
                seats.push('normal');
            }
            // Gap between seats 4 and 5
            seats.push('gap');
            // Rightmost section: seats 1-4 (4 seats)
            for (let i = 0; i < 4; i++) {
                seats.push('normal');
            }
            return seats;
        })(), seatNumbers: (() => {
            const nums = [];
            // Gap at leftmost
            nums.push(null);
            // Leftmost: 22-25
            for (let i = 25; i >= 22; i--) nums.push(i);
            nums.push(null); // Gap
            // Middle: 5-21
            for (let i = 21; i >= 5; i--) nums.push(i);
            nums.push(null); // Gap
            // Rightmost: 1-4
            for (let i = 4; i >= 1; i--) nums.push(i);
            return nums;
        })() },
        // Row L: 25 seats with gaps between seats 4-5 and 21-22, shifted right by one space
        // From right: seats 1-4, gap, seats 5-21, gap, seats 22-25
        { pattern: (() => {
            const seats = [];
            // Gap at leftmost (shifts row right by one space)
            seats.push('gap');
            // Leftmost section: seats 22-25 (4 seats)
            for (let i = 0; i < 4; i++) {
                seats.push('normal');
            }
            // Gap between seats 21 and 22
            seats.push('gap');
            // Middle section: seats 5-21 (17 seats)
            for (let i = 0; i < 17; i++) {
                seats.push('normal');
            }
            // Gap between seats 4 and 5
            seats.push('gap');
            // Rightmost section: seats 1-4 (4 seats)
            for (let i = 0; i < 4; i++) {
                seats.push('normal');
            }
            return seats;
        })(), seatNumbers: (() => {
            const nums = [];
            // Gap at leftmost
            nums.push(null);
            // Leftmost: 22-25
            for (let i = 25; i >= 22; i--) nums.push(i);
            nums.push(null); // Gap
            // Middle: 5-21
            for (let i = 21; i >= 5; i--) nums.push(i);
            nums.push(null); // Gap
            // Rightmost: 1-4
            for (let i = 4; i >= 1; i--) nums.push(i);
            return nums;
        })() },
        // Row M: 17 seats (M1-M17), shifted right by one space
        { pattern: (() => {
            const seats = [];
            // Gap at leftmost (shifts row right by one space)
            seats.push('gap');
            // 17 seats
            for (let i = 0; i < 17; i++) {
                seats.push('normal');
            }
            return seats;
        })() },
        // Row N: 12 seats with gaps, shifted right by three spaces
        // From right: seats 1-3, gap, seats 4-6, gap (10 spaces), seats 7-12, gap (3 spaces on left)
        { pattern: (() => {
            const seats = [];
            // Gap at leftmost (shifts row right by three spaces)
            seats.push('gap', 'gap', 'gap');
            // Leftmost section: seats 7-12 (6 seats)
            for (let i = 0; i < 6; i++) {
                seats.push('normal');
            }
            // Gap of 10 spaces
            for (let i = 0; i < 10; i++) {
                seats.push('gap');
            }
            // Middle section: seats 4-6 (3 seats)
            for (let i = 0; i < 3; i++) {
                seats.push('normal');
            }
            // Gap
            seats.push('gap');
            // Rightmost section: seats 1-3 (3 seats)
            for (let i = 0; i < 3; i++) {
                seats.push('normal');
            }
            return seats;
        })(), seatNumbers: (() => {
            const nums = [];
            // Gap at leftmost (3 spaces)
            nums.push(null, null, null);
            // Leftmost: 7-12
            for (let i = 12; i >= 7; i--) nums.push(i);
            // Gap of 10 spaces
            for (let i = 0; i < 10; i++) nums.push(null);
            // Middle: 4-6
            for (let i = 6; i >= 4; i--) nums.push(i);
            // Gap
            nums.push(null);
            // Rightmost: 1-3
            for (let i = 3; i >= 1; i--) nums.push(i);
            return nums;
        })() }
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

// Standard layout used as a reference for non-custom auditoriums
const standardLayout = getStandardLayout();

// Global theater state, populated after CSV load
let theaters = {};
let currentTheater = '';
let currentAuditorium = '';

// Build theaters object and initialize app from parsed CSV data
function initializeFromParsedData(parsed) {
    const { seatVisits, locations, theaterMap } = parsed;
    
    // Build theaters object from CSV data
    theaters = {};
    locations.forEach(location => {
        const locationKey = location.toLowerCase().replace(/\s+/g, '-');
        const locationName = location;
        theaters[locationKey] = {
            name: locationName,
            auditoriums: {}
        };
        
        const locationNameLower = location.toLowerCase();
        const theaterNums = Array.from(theaterMap[locationKey] || []).sort((a, b) => parseInt(a) - parseInt(b));
        theaterNums.forEach(theaterNum => {
            // Use specific layouts for certain theaters
            let layout;
            const isLincolnSq = locationNameLower.includes('lincoln square') || locationNameLower.includes('lincoln sq');
            const is19thSt = locationNameLower.includes('19th st');
            const is34thSt = locationNameLower.includes('34th st');
            
            if (is19thSt && theaterNum === '6') {
                layout = get19thStLayout();
            } else if (isLincolnSq && theaterNum === '1') {
                layout = getLincolnSq1Layout();
            } else if (isLincolnSq && theaterNum === '9') {
                layout = getLincolnSq9Layout();
            } else if (is34thSt && theaterNum === '1') {
                layout = get34thSt1Layout();
            } else if (is34thSt && theaterNum === '8') {
                layout = get34thSt8Layout();
            } else if (is34thSt && theaterNum === '13') {
                layout = get34thSt13Layout();
            } else {
                layout = standardLayout;
            }
            theaters[locationKey].auditoriums[theaterNum] = {
                name: `Theater ${theaterNum}`,
                layout: layout
            };
        });
    });
    
    // Store seat visit data globally for other functions
    window.seatVisits = seatVisits;
    
    // Current theater and auditorium (default to first location and theater)
    const firstLocation = locations[0] ? locations[0].toLowerCase().replace(/\s+/g, '-') : 'lincoln-sq';
    const firstTheater = Array.from(theaterMap[firstLocation] || [])[0] || '13';
    currentTheater = firstLocation;
    currentAuditorium = firstTheater;
    
    // Finish app initialization
    init();
}

// Load CSV data (prefer Google Sheets, fall back to local CSV) and initialize app
function loadDataAndInitialize() {
    fetch(GOOGLE_SHEETS_CSV_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        })
        .then(csvText => {
            const parsed = parseCSVData(csvText);
            initializeFromParsedData(parsed);
        })
        .catch(error => {
            console.error('Failed to load Google Sheets CSV. The application cannot be initialized without data.', error);
        });
}

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
                    additionalNotes: visit.additionalNotes || '',
                    rating: visit.rating || ''
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
function isLayoutUpdated(theaterLocationKey, auditorium) {
    const key = theaterLocationKey.toLowerCase();
    
    const isLincolnSq = key.includes('lincoln') && (key.includes('square') || key.includes('sq'));
    const is19thSt = key.includes('19th') && key.includes('st');
    const is34thSt = key.includes('34th') && key.includes('st');
    
    if (isLincolnSq && (auditorium === '1' || auditorium === '9')) return true;
    if (is19thSt && auditorium === '6') return true;
    if (is34thSt && (auditorium === '1' || auditorium === '8' || auditorium === '13')) return true;
    
    return false;
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
                let text = `${v.movie || ''}\n`;
                text += `${v.row || row}${v.seat || seatNumber}\n`;
                text += `Format: ${v.format || ''}\n`;
                const rating = v.rating && v.rating.trim() ? v.rating : 'None';
                let ratingEmoji = '';
                if (rating.toLowerCase() === 'good') {
                    ratingEmoji = ' 🟢';
                } else if (rating.toLowerCase() === 'okay') {
                    ratingEmoji = ' 🟡';
                } else if (rating.toLowerCase() === 'bad') {
                    ratingEmoji = ' 🔴';
                }
                text += `Seat Rating: ${rating}${ratingEmoji}\n`;
                if (v.additionalNotes && v.additionalNotes.trim()) {
                    text += `Additional Notes: ${v.additionalNotes}`;
                }
                return text;
            }).join('\n\n');
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
    if (visitData && visitData.length > 0 && hasBeenSatIn) {
        const tooltip = document.createElement('div');
        tooltip.className = 'seat-tooltip';
        const tooltipContent = visitData.map(v => {
            let text = `<strong>${v.movie || ''}</strong><br>`;
            text += `${v.row || row}${v.seat || seatNumber}<br>`;
            text += `Format: ${v.format || ''}<br>`;
            const rating = v.rating && v.rating.trim() ? v.rating : 'None';
            let ratingEmoji = '';
            if (rating.toLowerCase() === 'good') {
                ratingEmoji = ' 🟢';
            } else if (rating.toLowerCase() === 'okay') {
                ratingEmoji = ' 🟡';
            } else if (rating.toLowerCase() === 'bad') {
                ratingEmoji = ' 🔴';
            }
            text += `Seat Rating: ${rating}${ratingEmoji}<br>`;
            if (v.additionalNotes && v.additionalNotes.trim()) {
                text += `Additional Notes: ${v.additionalNotes}<br>`;
            }
            return `<div class="tooltip-entry">${text}</div>`;
        }).join('');
        tooltip.innerHTML = tooltipContent;
        seat.appendChild(tooltip);
    }
    
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
    const headers = ['Row', 'Seat', 'Movie', 'Format', 'Seat Rating', 'Notes'];
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
        
        const ratingCell = document.createElement('td');
        ratingCell.textContent = visit.rating || '';
        row.appendChild(ratingCell);
        
        const notesCell = document.createElement('td');
        notesCell.textContent = visit.additionalNotes || '';
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

// Navigation functions
function showHomePage() {
    const homePage = document.getElementById('homePage');
    const seatingPage = document.getElementById('seatingPage');
    if (homePage && seatingPage) {
        homePage.style.display = 'flex';
        seatingPage.style.display = 'none';
    }
}

function showSeatingPage() {
    const homePage = document.getElementById('homePage');
    const seatingPage = document.getElementById('seatingPage');
    if (homePage && seatingPage) {
        homePage.style.display = 'none';
        seatingPage.style.display = 'block';
        renderSeatingChart();
    }
}

// Initialize home page selectors
function initHomePageSelectors() {
    const homeTheaterSelect = document.getElementById('homeTheaterSelect');
    const homeAuditoriumSelect = document.getElementById('homeAuditoriumSelect');
    const goButton = document.getElementById('goButton');
    
    if (!homeTheaterSelect || !homeAuditoriumSelect || !goButton) return;
    
    // Populate theater dropdown
    homeTheaterSelect.innerHTML = '<option value="">Select a theater...</option>';
    Object.keys(theaters).forEach(theaterId => {
        const option = document.createElement('option');
        option.value = theaterId;
        option.textContent = theaters[theaterId].name;
        homeTheaterSelect.appendChild(option);
    });
    
    // Handle theater selection change
    homeTheaterSelect.addEventListener('change', () => {
        const selectedTheater = homeTheaterSelect.value;
        homeAuditoriumSelect.innerHTML = '<option value="">Select an auditorium...</option>';
        
        if (selectedTheater) {
            const auditoriums = theaters[selectedTheater]?.auditoriums || {};
            Object.keys(auditoriums).forEach(auditoriumId => {
                const option = document.createElement('option');
                option.value = auditoriumId;
                option.textContent = auditoriums[auditoriumId].name;
                homeAuditoriumSelect.appendChild(option);
            });
        }
        
        updateGoButton();
    });
    
    // Handle auditorium selection change
    homeAuditoriumSelect.addEventListener('change', () => {
        updateGoButton();
    });
    
    // Handle Go button click
    goButton.addEventListener('click', () => {
        const selectedTheater = homeTheaterSelect.value;
        const selectedAuditorium = homeAuditoriumSelect.value;
        
        if (selectedTheater && selectedAuditorium) {
            currentTheater = selectedTheater;
            currentAuditorium = selectedAuditorium;
            
            // Update seating page selectors
            const theaterSelect = document.getElementById('theaterSelect');
            const auditoriumSelect = document.getElementById('auditoriumSelect');
            if (theaterSelect) {
                theaterSelect.value = currentTheater;
            }
            updateAuditoriumDropdown();
            if (auditoriumSelect) {
                auditoriumSelect.value = currentAuditorium;
            }
            
            // Navigate to seating page
            showSeatingPage();
            updateLayoutNote();
        }
    });
    
    // Function to enable/disable Go button
    function updateGoButton() {
        goButton.disabled = !homeTheaterSelect.value || !homeAuditoriumSelect.value;
    }
}

// Initialize the application
function init() {
    loadSeatStates();
    
    // Initialize home page
    initHomePageSelectors();
    
    // Set up seating page theater dropdown
    const theaterSelect = document.getElementById('theaterSelect');
    if (theaterSelect) {
        theaterSelect.innerHTML = '';
        Object.keys(theaters).forEach(theaterId => {
            const option = document.createElement('option');
            option.value = theaterId;
            option.textContent = theaters[theaterId].name;
            theaterSelect.appendChild(option);
        });
        theaterSelect.value = currentTheater;
        theaterSelect.addEventListener('change', handleTheaterChange);
    }
    
    // Set up seating page auditorium dropdown
    updateAuditoriumDropdown();
    const auditoriumSelect = document.getElementById('auditoriumSelect');
    if (auditoriumSelect) {
        auditoriumSelect.addEventListener('change', handleAuditoriumChange);
    }
    
    // Set up home icon
    const homeIcon = document.getElementById('homeIcon');
    if (homeIcon) {
        homeIcon.addEventListener('click', showHomePage);
    }
    
    // Start on home page
    showHomePage();
}

// Initialize when page loads (load CSV first, then initialize app)
loadDataAndInitialize();
