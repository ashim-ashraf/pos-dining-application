import React from 'react';
import { App, Page, Navbar, Block, ListItem, BlockTitle, List } from 'konsta/react';

export default function MyApp() {
  
  return (
    <App theme="ios">
      <Page>
        <Navbar title="Yummers" />
        <BlockTitle>Restaurants</BlockTitle>
      <List strongIos outlineIos>

        <ListItem
          link
          chevronMaterial={false}
          title="Yellow Submarine"
          after="$15"
          subtitle="Beatles"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          media={
            <img
              className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
              src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg"
              width="80"
              alt="demo"
            />
          }
        />
        <ListItem
          link
          chevronMaterial={false}
          title="Don't Stop Me Now"
          after="$22"
          subtitle="Queen"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          media={
            <img
              className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
              src="https://cdn.framework7.io/placeholder/people-160x160-2.jpg"
              width="80"
              alt="demo"
            />
          }
        />
        <ListItem
          link
          chevronMaterial={false}
          title="Billie Jean"
          after="$16"
          subtitle="Michael Jackson"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          media={
            <img
              className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
              src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg"
              width="80"
              alt="demo"
            />
          }
        />
      </List>

        <Block strong>Hello world!</Block>
      </Page>
    </App>

  );
}