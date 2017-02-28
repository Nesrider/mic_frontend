export function sortByWords(articleA, articleB) {
	return articleA.words - articleB.words;
}

export function sortBySubmitted(articleA, articleB) {
	const dateA = new Date(articleA.publish_at);
	const dateB = new Date(articleB.publish_at);

	if (dateA > dateB) {
		return -1;
	} else if (dateA < dateB) {
		return 1;
	}

	return 0;
}
