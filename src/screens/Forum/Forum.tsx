import { Card, Chip } from '@components/index';
import {
  useNavigationBottomTabSelect,
  useNavigationScreen
} from '@hooks/use-navigation';
import { useReduxAction, useReduxState } from '@hooks/use-redux';
import { Article } from '@interfaces/index';
import { ARTICLE_SCREEN } from '@navigation/constants';
import {
  fetchPublishedArticles,
  updateTagList
} from '@redux/actions/publishedArticles.actions';
import {
  filterArticlesBySelectedTags,
  isFetchingArticles
} from '@redux/selectors';
import { loadIcons } from '@utils/index';
import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

function Forum({ componentId }: { componentId: string }) {
  const listRef = useRef<FlatList<Article>>(null);
  const articles = useReduxState(filterArticlesBySelectedTags);
  const isFetching = useReduxState(isFetchingArticles);
  const fetchArticles = useReduxAction(fetchPublishedArticles.request);
  const updateTagAction = useReduxAction(updateTagList);
  const pushToArticle = useCallback(async (id: number) => {
    const shareIcon = await loadIcons([{ name: 'share' }]);
    useNavigationScreen({
      componentId,
      actionType: 'push',
      name: ARTICLE_SCREEN,
      options: {
        topBar: {
          testID: require('@navigation/testIDs').ARTICLE_TOP_BAR_TEST,
          rightButtons: [
            {
              testID: require('@navigation/testIDs').SHARE_ARTICLE_BUTTON_TEST,
              id: 'shareArticle',
              icon: shareIcon[0],
              color: '#FFF'
            }
          ],
          title: {
            text: 'Article'
          }
        },
        bottomTabs: {
          drawBehind: true,
          visible: false
        }
      },
      passProps: { id }
    });
  }, []);

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
      <FlatList<string>
        renderItem={({ item }) => (
          <Chip
            text={item}
            action={updateTagAction}
            style={{
              justifyContent: 'center',
              margin: 5,
              backgroundColor: '#5472D3'
            }}
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
      <FlatList<Article>
        data={articles}
        ref={listRef}
        keyExtractor={a => a.id + a.url}
        refreshing={isFetching}
        ItemSeparatorComponent={Divider}
        renderItem={({ item, index }) => (
          <Card onPress={pushToArticle} testID={index} {...item} />
        )}
        onEndReached={fetchArticles}
        testID={require('@navigation/testIDs').FLATLIST_PUB_ARTICLES_TEST}
      />
    </View>
  );
}

export default Forum;
