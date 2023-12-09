export interface AppContextTypes {
  children: React.ReactElement;
}

export interface AppIndexTypes {}

export interface NewsListTypes {}

export interface ListItemsTypes {
  title: string;
  imageUrl: string;
  description: string;
  id: string | number;
  isPinned: boolean;
  object: Object;
}
