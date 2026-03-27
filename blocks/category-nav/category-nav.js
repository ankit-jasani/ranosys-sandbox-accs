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
        query {
          categories(ids: "2") {
            children {
              name
              urlPath
            }
          }
        }
      `,
    }),
  });

  const response = await res.json();
  // ACCS returns an array, so we take the first element (ID "2") and get its children
  const categories = response.data?.categories[0]?.children || [];

  const ul = document.createElement('ul');
  categories.forEach((c) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.textContent = c.name;
    // This matches your da.live setup: /categories/default folder/page
    a.href = `/categories/default?urlPath=${c.urlPath}`;

    li.appendChild(a);
    ul.appendChild(li);
  });

  block.replaceChildren(ul);
}
