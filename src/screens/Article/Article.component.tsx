import { FetchedArticle } from '@interfaces/*';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Caption, Title } from 'react-native-paper';
import Markdown from 'react-native-simple-markdown';

export const Article = React.memo<FetchedArticle & { testID: string }>(
  ({ testID, ...article }) => {
    return (
      <ScrollView bounces={false} style={styles.container} testID={testID}>
        <ImageBackground
          style={styles.image}
          testID={'coverImageID'}
          source={{
            uri: article.cover_image || ''
          }}
        >
          <Avatar.Image
            style={styles.authorPhoto}
            size={77}
            source={{ uri: article.user.profile_image_90 }}
          />
          <Caption testID={'authorNameID'} style={styles.authorName}>
            {article.user.name}
          </Caption>
        </ImageBackground>
        <Title testID={'titleID'} style={styles.titleLabel}>
          {article.title}
        </Title>
        <Markdown styles={{ view: { marginHorizontal: 24, marginTop: 10 } }}>
          {article.body_markdown}
        </Markdown>
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    minHeight: 175
  },
  authorName: {
    fontSize: 20,
    color: '#000',
    position: 'absolute',
    left: 110,
    bottom: -25,
    margin: 0
  },
  authorPhoto: {
    position: 'absolute',
    left: 24,
    bottom: -22,
    margin: 0,
    borderWidth: 2
  },
  titleLabel: {
    color: '#000',
    marginHorizontal: 24,
    marginTop: 48
  }
});
