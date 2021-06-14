import { RequestHandler } from "express";

const axios = require('axios').default;

export const getLastWeeksDate = (): Date => {
    const today: Date = new Date((new Date).setHours(0,0,0,0));
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
}

export const getDayAfterLastWeeksDate = (): Date => {
    const lastWeeksDate: Date = getLastWeeksDate();

    return new Date(lastWeeksDate.getFullYear(), lastWeeksDate.getMonth(), lastWeeksDate.getDate() +1);
}

export const cleanAndSplitString = (text: string): string[] => {
    if (!text){
        return [];
    }

    let result: string[] = text.replace(/[^0-9a-zA-Z ]+/g, '').split(' '); 
    let emptyElemIdx: number = result.indexOf('');

    if (emptyElemIdx >= 0){
        result.splice(emptyElemIdx, 1);
    }

    return result;
}

export const countWordOccurrences = (text: string, wordCounts: any): void => {
    if (!text.length) {
        return;
    }

    let words: string[] = cleanAndSplitString(text);

    for (var i = 0; i < words.length; i++) {
        wordCounts[words[i]] = (wordCounts[words[i]] || 0) + 1;
    }
}

export default async (req: RequestHandler, res: any) => {
    //Step 1: get stories (id's) from the day of exactly the last week
    const lastWeeksDate: Date = getLastWeeksDate();
    const lastWeeksDatePlus1: Date = getDayAfterLastWeeksDate();

    let storiesIds: any = (await axios.get(`https://hacker-news.firebaseio.com/v0/newstories.json?type=story&time>=${lastWeeksDate.getTime()}&time<${lastWeeksDatePlus1.getTime()}`)).data;

    //Step 2: get most occurring words    
    let wordCounts: any = {};    
    await Promise.all(storiesIds.map(async (id: number) => {
        let story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

        if (!story.data || !story.data.title) {
            return;
        }
        countWordOccurrences(story.data.title, wordCounts);
    }))

    //Step 3: Convert object to array and then sort by occurrence
    let result: any[] = [];

    for (const key of Object.keys(wordCounts)) {
        result.push({ word: key, count: wordCounts[key] });
    }

    result.sort((a, b) => { return b.count - a.count });

    //Step 4: show top 10 most occurring words as .json    
    const top10words: string[] = result.map(obj => obj.word).slice(0, 10);
    
    res.json({data: top10words})
}