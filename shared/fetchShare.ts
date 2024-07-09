
export const peticionGraphql = async (query, token) => {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({query}),
  });

  const responseData = await response.json();

  return responseData
}