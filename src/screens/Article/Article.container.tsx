import { CommonError } from '@components/index';
import { useNavigationButtonPress } from '@hooks/use-navigation';
import { useReduxAction, useReduxState } from '@hooks/use-redux';
import { fetchPublishedArticle } from '@redux/actions/publishedArticles.actions';
import {
  getPublishedArticle,
  hasErrorArticle,
  isFetchingArticle
} from '@redux/selectors';
import { shareItem } from '@utils/index';
import React, { useCallback, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { Article as ArticleView } from './Article.component';

interface ArticleProps {
  id: number;
  name: string;
  componentId: string;
}

function Article({ id, componentId }: ArticleProps) {
  const error = useReduxState(hasErrorArticle);
  const isFetching = useReduxState(isFetchingArticle);
  const article = useReduxState(getPublishedArticle);
  const fetchArticle = useReduxAction(fetchPublishedArticle.request);
  const cancelFetch = useReduxAction(fetchPublishedArticle.cancel);
  const fetchArticleCallback = useCallback(() => {
    fetchArticle(id);
  }, [id]);

  useEffect(() => {
    fetchArticleCallback();
    () => cancelFetch();
  }, []);

  useNavigationButtonPress(
    _ => {
      shareItem({
        url: article.url,
        message: article.description,
        title: article.title
      });
    },
    componentId,
    'shareArticle'
  );

  return (
    <>
      {error && (
        <CommonError
          testID={'errorArticleTestID'}
          retryAction={fetchArticleCallback}
        />
      )}
      {(isFetching || !article) && (
        <Text style={{ color: '#000' }} testID={'articleFetching'}>
          Im fetching an article :)
        </Text>
      )}
      {article && Object.keys(article).length > 0 && (
        <ArticleView testID={'articleRootView'} {...article} />
      )}
    </>
  );
}

export default Article;
