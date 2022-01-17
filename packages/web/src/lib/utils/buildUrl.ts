export default function (page, query){
  const safeQuery = query.replace(/&/g, '%26')
  return `${page.host.includes('localhost') ? 'http' : 'https'}://${page.host}/api/sanity.json?query=${safeQuery}`;
}