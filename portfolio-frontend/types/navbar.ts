export interface Contact {
  label: string;
  icon: React.JSX.Element;
  url: string;
  onClick?: () => Promise<void>;
}

export type Contacts = Contact[];

export interface NavBarItem {
  label: string;
  icon: JSX.Element;
  id: string;
  onClick: () => void;
}

export type NavBarItems = NavBarItem[];
