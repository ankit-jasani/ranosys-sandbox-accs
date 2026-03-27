export default async function decorate(block) {
  const res = await fetch('https://na1-sandbox.api.commerce.adobe.com/Hy9ZaatDe2kixCZqGfcKK6/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Magento-Website-Code': 'base',
      'Magento-Store-View-Code': 'default',
      'x-api-key': '3bd3bd507c214ff0961a92cf21d5ba5b',
      'x-gw-ims-org-id': '25A85A255EF9D5320A495CCC@AdobeOrg',
    },
    body: JSON.stringify({
      query: `
        query GetNavCategories {
          categories(ids: ["2"], subtree: { startLevel: 1, depth: 1 }) {
            name
            urlPath
          }
        }
      `,
    }),
  });

  const response = await res.json();
  
  // Catalog Service returns an array of CategoryView objects directly
  const categories = response.data?.categories || [];

  const ul = document.createElement('ul');
  categories.forEach((c) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.textContent = c.name;
    // Maps to your folder /categories/default and passes the urlPath
    a.href = `/categories/default?urlPath=${c.urlPath}`;

    li.appendChild(a);
    ul.appendChild(li);
  });

  block.replaceChildren(ul);
}
