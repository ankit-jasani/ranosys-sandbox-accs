export default async function decorate(block) {
  const res = await fetch('https://na1-sandbox.api.commerce.adobe.com/Hy9ZaatDe2kixCZqGfcKK6/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Magento-Website-Code': 'base',
      'Magento-Store-View-Code': 'default',
      'x-api-key': 'YOUR_API_KEY' // Ensure your API key is here if needed
    },
    body: JSON.stringify({
      query: `
        query {
          categories(ids: "2") {
            children {
              name
              urlPath
            }
          }
        }
      `
    })
  });

  const response = await res.json();
  const categories = response.data?.categories[0]?.children || [];

  const ul = document.createElement('ul');
  categories.forEach((c) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.textContent = c.name;
    // Map to your da.live path: /categories/default
    // Pass the urlPath as a query param for the block to read
    a.href = `/categories/default?urlPath=${c.urlPath}`;

    li.appendChild(a);
    ul.appendChild(li);
  });

  block.replaceChildren(ul);
}
