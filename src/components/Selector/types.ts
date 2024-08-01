export type Option = {
  label: string;
  icon: string;
  id: string;
  isActive: boolean;
}

export type SelectorProps = {
  data: Option[];
  onSelect: (option: Option) => void;
  onDelete: (id: string) => void;
};

export type OptionListType = {
  isVisible: boolean;
  searchValue: string;
  data: Option[];
  onSelect: (event: React.MouseEvent<HTMLLIElement>, option: Option) => void;
  selectedOptions: Record<string, boolean>
  handleDeleteOption: (event: React.MouseEvent<HTMLImageElement>, id: string) => void;
}