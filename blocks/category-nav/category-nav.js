  export default async function decorate(block) {
    const res = await fetch('https://na1-sandbox.api.commerce.adobe.com/Hy9ZaatDe2kixCZqGfcKK6/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Magento-Website-Code': 'base',
        'Magento-Store-View-Code': 'default'
      },
      body: JSON.stringify({
        query: `
          query {
            categories {
              name
            }
          }
        `
      })
    });
  
    const data = await res.json();
    const categories = data.data.categories;
  
    const ul = document.createElement('ul');
  
    categories
      .filter(c => c.name !== 'Default Category')
      .forEach(c => {
        const li = document.createElement('li');
        const a = document.createElement('a');
  
        a.textContent = c.name;
        a.href = `/categories/default?filter=categoryPath:${c.name.toLowerCase()}`;
  
        li.appendChild(a);
        ul.appendChild(li);
      });
  
    block.appendChild(ul);
  }