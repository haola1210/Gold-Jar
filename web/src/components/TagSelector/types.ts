import { type IncomeTag } from '@interfaces/tag.type';
import { type SpendingTag } from '@interfaces/tag.type';
import { type ActionType } from '@interfaces/action.type';

export interface ITag {
  tag: IncomeTag | SpendingTag;
  active: boolean;
  className?: string;
  onClick: (_tag: ITag['tag']) => void;
}

type TagType = SpendingTag | IncomeTag;

export interface ITagSelector {
  type: ActionType;
  onSelectTag: (_tag: TagType | undefined) => void;
  selectedTag: TagType | undefined;
}
