import React from 'react'

function MenuItemsList({items}) {
    return (
        <ul>
          {items.map(item => (
            <li key={item.ItemName}>
              <h3>{item.ItemName}</h3>
              <p>{item.category}</p>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      );
}

export default MenuItemsList