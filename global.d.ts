interface FirebaseTimestamp {
  nanoseconds: number;
  seconds: number;
  toDate(): Date;
  toString(): string;
  toJSON(): {seconds: number; nanoseconds: number};
}

interface Product {
  authorId: string;
  authorName: string;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  name: string;
  notes: string;
  isCompleted: boolean;
  productId: string;
}

interface ShoppingList {
  author: string;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  name: string;
  products_total: number;
  users: string[];
  products: Product[];
}

interface IList {
  id: string;
  author: string;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  name: string;
  products_total: number;
  users: string[];
}

interface ICategory {
  id?: string;
  name: string;
  image?: string;
  background?: string;
}
