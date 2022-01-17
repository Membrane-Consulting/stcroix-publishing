export default function (url, query){
  const safeQuery = query.replace(/&/g, '%26')
  return `${url.hostname.includes('localhost') ? 'http' : 'https'}://${url.hostname.includes('localhost') ? `${url.hostname}:3000` : url.hostname}/api/sanity.json?query=${safeQuery}`;
}