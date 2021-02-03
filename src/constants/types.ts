export interface Recipe {
  id: string;
  timestamp: Date;
  name: string;
  user: User;
  img: string;
  intro: string;
  results: Result[];
  ingredients: Ingredient[];
  steps: Step[];
  stars: User[];
  tags: Tag[];
}

export interface Step {
  order: number;
  description: string;
  duration: number;
  source: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  photoUrl: string;
  recipes: Recipe[];
  stars: Recipe[];
  followers: User[];
  following: User[];
}

export interface Result {
  timestamp: Date;
  source: string;
  user: User[];
}

export interface Tag {
  name: string;
  recipes: Recipe[];
}

export interface IngredientList {
  order: number;
  name: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
}
