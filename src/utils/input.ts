/*
* This script will fetch the input for today. 
* The actual call to the 'GetInputToday' function is completely at the bottom
* This script is called by running `bun run input`
*/
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

function GetInputToday(){
    GetInput();
}

async function GetInput(year?: number, day?: number){
    if (!year || !day){
        let now = new Date();
        year = now.getFullYear();
        day = now.getDay() + 1;
        console.log(`No input variables found for day and year. Filling in ${day} and ${year}`);
    }

    const dayFolder = join(__dirname, '..', 'days', `day${day}`);
    if (!existsSync(dayFolder)) {
        mkdirSync(dayFolder, { recursive: true });
        console.log(`Created folder for day ${day}`);
    }

    // Fetch the input from the advent of code site
    const inputFile = join(dayFolder, 'input.txt');
    if (!existsSync(inputFile)) {
        const url = `https://adventofcode.com/${year}/day/${day}/input`;
        let aoc_token = Bun.env.AOC_SESSION;
        const response = await fetch(url, {
            headers: {
                'Cookie': `session=${aoc_token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch input: ${response.statusText}`);
        }

        const input = await response.text();
        Bun.write(inputFile, input);
        console.log(`Downloaded and saved input for day ${day}`);
    }
}

GetInputToday();