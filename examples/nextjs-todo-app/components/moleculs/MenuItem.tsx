import Link from "next/link";

export interface MenuItemProps {
  item: {
    url: string;
    text: string;
  };
}

export function MenuItem({ item: { url, text } }: MenuItemProps) {  
  return <Link href={url}>{text}</Link>;
}
