import { List, ListItem } from 'konsta/react';
import React from 'react'

function MenuItemsList({items}) {
    return (
        // <ul>
        //   {items?.length>0 && items.map(item => (
        //     <li key={item.ItemName}>
        //       <h3>{item.ItemName}</h3>
        //       <p>{item.category}</p>
        //       <p>{item.description}</p>
        //     </li>
        //   ))}
        // </ul>

       <List strongIos outlineIos>
          {
           items?.length>0 && items.map((menu,index) => (
            <div key={index} >
            <ListItem
              link
              chevronMaterial={false}
              title={menu.itemName}
              // after="$22"
              subtitle={menu.category}
              text={menu.description}
              media={
                <img
                  className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                  src={menu?.image[0]?.location}
                  width="80"
                  alt={menu.itemName}
                />
              }
            //   onClick={() => handleclick(restaurants.id)}
            />
            </div>
          ))}
        </List> 
      );
}

export default MenuItemsList