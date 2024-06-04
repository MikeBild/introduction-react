import { MenuItem } from "../moleculs/MenuItem";

export interface MenuListProps {
  items: { text: string; url: string }[];
}
export function MenuList(props: MenuListProps) {
  return (
    <ul>
      {props.items.map((item, idx) => (
        <li key={idx}>
          <MenuItem item={item} />
        </li>
      ))}
    </ul>
  );
}
