import { getLastWeeksDate, getDayAfterLastWeeksDate, cleanAndSplitString, countWordOccurrences } from './topwords';

describe("getLastWeek()", () =>{
    it("should return a week before today (today minus 7 days) without timestamp", () => {
        let expectedDate: Date = new Date();
        expectedDate.setHours(0, 0, 0, 0);
        expectedDate.setDate(expectedDate.getDate() - 7);
        expect(getLastWeeksDate()).toStrictEqual(expectedDate);
    })

    it("should not return a week before today (today minus 7 days) with timestamp", () => {
        let expectedDate: Date = new Date();
        expectedDate.setDate(expectedDate.getDate() - 7);
        expect(getLastWeeksDate()).not.toStrictEqual(expectedDate);
    })
})

describe("getDayAfterLastWeeksDate()", () => {
    it("should return today minus 6 days", () => {
        let expectedDate: Date = new Date();
        expectedDate.setHours(0, 0, 0, 0);
        expectedDate.setDate(expectedDate.getDate() - 6);
        expect(getDayAfterLastWeeksDate()).toStrictEqual(expectedDate);
    })
})

describe("cleanAndSplitString()", () => {
    it("should return an array of words when using a valid string (alphanumeric)", () => {
        let text: string = 'test case 1';
        expect(cleanAndSplitString(text)).toStrictEqual(['test', 'case', '1']);
    })
    
    it("should return an empty array when using an empty string", () => {
        let text: string = '';
        expect(cleanAndSplitString(text)).toStrictEqual([]);
    })

    it("should return an array of words ignoring non-alphanumeric chars", () => {
        let text: string = 'example: with ! different chars 123??';
        expect(cleanAndSplitString(text)).toStrictEqual(['example', 'with', 'different', 'chars', '123']);
    })
})

describe("countWordOccurrences()", () => {
    it("should increment counters for recurring words and include count for new words", () => {
        let text: string = 'Hello, meet my dog, Jest.';
        let wordCounts: any = {my: 1, name: 3, is: 2, Jest: 1};
    
        countWordOccurrences(text, wordCounts);
        expect(wordCounts).toStrictEqual({my: 2, name: 3, is: 2, Jest: 2, Hello: 1, meet: 1, dog: 1});
    })
})

describe("topwords.default()", () => {
    it.todo("should return an object with the top 10 most occurring words from last week")
})