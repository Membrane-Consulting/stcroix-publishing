export default function buildUrl(query:string) {
	const safeQuery = encodeURIComponent(query);
	return `/api/sanity.json?query=${safeQuery}`;
}
