export interface ItemNode {
  name: string;
  quantity: number;
  icon_path: string;
  children: ItemNode[];
}
