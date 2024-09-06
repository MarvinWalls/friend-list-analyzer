export function calculateLetterFrequency(names) {
    let letterFrequency = {};

    names.forEach(name => {
        let firstLetter = name.charAt(0).toUpperCase(); // Get the first letter and convert to uppercase

        // Check if the first letter is an English alphabet letter
        if (firstLetter >= 'A' && firstLetter <= 'Z') {
            if (letterFrequency[firstLetter]) {
                letterFrequency[firstLetter]++;
            } else {
                letterFrequency[firstLetter] = 1;
            }
        }
    });

    return letterFrequency;
}
