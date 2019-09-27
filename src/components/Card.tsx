import { Article } from '@interfaces/index';
import React from 'react';
import {
  Avatar,
  Card as PaperCard,
  Paragraph,
  Title
} from 'react-native-paper';

export const Card = React.memo<Article & { testID: number }>(
  ({
    testID,
    title,
    cover_image,
    tag_list,
    user: { name, profile_image_90 }
  }) => (
    <PaperCard
      testID={`article-${testID}`}
      style={{ backgroundColor: '#141F2D', margin: 5 }}
    >
      {cover_image && (
        <PaperCard.Cover testID={'paperCover'} source={{ uri: cover_image }} />
      )}
      <Title style={{ alignSelf: 'center', padding: 5 }} children={title} />
      <PaperCard.Content style={{ flexDirection: 'row' }}>
        <Avatar.Image size={40} source={{ uri: profile_image_90 }} />
        <PaperCard.Content>
          <Title>{name}</Title>
          <Paragraph>{tag_list.map(tag => `#${tag} `)}</Paragraph>
        </PaperCard.Content>
      </PaperCard.Content>
    </PaperCard>
  )
);
