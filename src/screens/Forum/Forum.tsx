import { Card, Chip } from '@components/index';
import { useNavigationBottomTabSelect } from '@hooks/use-navigation';
import { useReduxAction, useReduxState } from '@hooks/use-redux';
import { Article } from '@interfaces/index';
import {
  fetchPublishedArticles,
  updateTagList
} from '@redux/actions/publishedArticles.actions';
import {
  filterArticlesBySelectedTags,
  isFetchingArticles
} from '@redux/selectors';
import React, { useEffect, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

function Forum() {
  const listRef = useRef<FlatList<Article>>(null);
  const articles = useReduxState(filterArticlesBySelectedTags);
  const isFetching = useReduxState(isFetchingArticles);
  const fetchArticles = useReduxAction(fetchPublishedArticles.request);
  const updateTagAction = useReduxAction(updateTagList);

  useEffect(() => {
    fetchArticles();
  }, []);

  useNavigationBottomTabSelect(e => {
    if (e.selectedTabIndex === 0 && e.unselectedTabIndex === 0) {
      if (listRef.current) {
        listRef.current.scrollToIndex({ index: 0 });
      }
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        <FlatList
          renderItem={({ item }) => (
            <Chip
              text={item}
              action={updateTagAction}
              style={{ margin: 5, backgroundColor: 'red' }}
            />
          )}
          testID={require('@navigation/testIDs').FLATLIST_FILTERS_TEST}
          horizontal={true}
          keyExtractor={item => item}
          contentContainerStyle={{ margin: 5 }}
          style={{ backgroundColor: '#1B2E63' }}
          data={[
            'javascript',
            'typescript',
            'flutter',
            'golang',
            'react',
            'node',
            'meta'
          ]}
        />
      </View>
      <FlatList<Article>
        data={articles}
        ref={listRef}
        keyExtractor={a => a.id + a.url}
        refreshing={isFetching}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item, index }) => <Card testID={index} {...item} />}
        onEndReached={fetchArticles}
        testID={require('@navigation/testIDs').FLATLIST_PUB_ARTICLES_TEST}
      />
    </View>
  );
}

export default Forum;
