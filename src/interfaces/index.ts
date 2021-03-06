type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface Common {
  name: string;
  username: string;
  profile_image: string;
  profile_image_90: string;
}

export interface User extends Common {
  twitter_username?: string;
  github_username?: string;
  website_url?: string;
}

export interface Organization extends Common {
  slug: string;
}

export interface Article {
  type_of: string;
  id: number;
  title: string;
  description: string;
  cover_image?: string;
  published_at: string;
  tag_list: string[];
  slug: string;
  path: string;
  url: string;
  canonical_url?: string;
  comments_count: number;
  positive_reactions_count: number;
  published_timestamp: Date;
  user: User;
  organization?: Organization;
}

export interface FetchedArticle extends Omit<Article, 'organization'> {
  readable_publish_date: string;
  social_image: string;
  last_comment_at: Date;
  body_html: string;
  body_markdown: string;
}
