export default async function decorate(block) {
  const res = await fetch('https://na1-sandbox.api.commerce.adobe.com', {
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
          categories(filters: { parent_id: { eq: "2" } }) {
            items {
              name
              url_path
            }
          }
        }
      `,
    }),
  });

  const response = await res.json();
  
  // The Catalog Service returns a list within the 'items' field
  const categories = response.data?.categories?.items || [];

  const ul = document.createElement('ul');
  categories.forEach((c) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.textContent = c.name;
    // Ensuring the link points to your /categories/default route
    a.href = `/categories/default?urlPath=${c.url_path}`;

    li.appendChild(a);
    ul.appendChild(li);
  });

  block.replaceChildren(ul);
}
