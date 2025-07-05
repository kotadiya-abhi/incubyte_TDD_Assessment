function escapeSpecial(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function add(numbers) {
    if (!numbers) return 0;

    let delimiters = [",", "\n"];

    if (numbers.startsWith("//")) {
        const parts = numbers.split("\n");
        const delimiterPart = parts[0].slice(2); // strip off //
        if (delimiterPart.startsWith("[")) {
            // multiple or multi-character delimiters
            const matches = delimiterPart.match(/\[([^\]]+)\]/g);
            if (matches) {
                delimiters = matches.map(d => escapeSpecial(d.slice(1, -1)));
            }
        } else {
            // single character delimiter
            delimiters = [escapeSpecial(delimiterPart)];
        }

        numbers = parts[1];
    }

    const splitRegex = new RegExp(delimiters.join("|"));
    const numberList = numbers.split(splitRegex).map(Number);
    const negatives = numberList.filter(n => n < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
    }

    return numberList
        .filter(n => !isNaN(n) && n <= 1000)
        .reduce((sum, n) => sum + n, 0);
}

module.exports = { add };
