import { MenuItem } from "../moleculs/MenuItem";

export interface MenuListProps {
  items: { text: string; url: string }[];
}
export function MenuList(props: MenuListProps) {
  return (
    <>
      <ul>
        {props.items.map((item) => {
          return <MenuItem item={item} />;
        })}
      </ul>
    </>
  );
}
