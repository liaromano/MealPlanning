export interface Ingredient {
  name: string;
  amount: string;
}

export interface Macro {
  label: string;
  current: number;
  total: number;
  color: string;
  containerColor: string;
}

export interface Meal {
  id: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  title: string;
  description: string;
  calories: number;
  ingredients: Ingredient[];
  carbs: number;
  fats: number;
  proteins: number;
  completed?: boolean;
  date: string; // ISO date string YYYY-MM-DD
}

export const INITIAL_MEALS: Meal[] = [];

export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  dailyGoal: number;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: '',
  age: 25,
  gender: 'female',
  dailyGoal: 2200,
};

export const SEASONAL_OPTIONS: (Omit<Meal, 'id' | 'date'> & { image: string })[] = [
  {
    type: 'SNACK',
    title: 'Green Smoothie',
    description: 'Immunity booster with spinach and apple',
    calories: 220,
    carbs: 45,
    fats: 2,
    proteins: 5,
    ingredients: [
      { name: 'Spinach', amount: '1 cup' },
      { name: 'Green Apple', amount: '1' },
      { name: 'Ginger', amount: '1 tsp' }
    ],
    image: 'https://picsum.photos/seed/smoothie/800/600'
  },
  {
    type: 'LUNCH',
    title: 'Quinoa Power Bowl',
    description: 'Fresh seasonal veggies and quinoa',
    calories: 420,
    carbs: 55,
    fats: 15,
    proteins: 18,
    ingredients: [
      { name: 'Quinoa', amount: '1/2 cup' },
      { name: 'Cucumber', amount: '1/2' },
      { name: 'Cherry Tomatoes', amount: '5' },
      { name: 'Lemon Dressing', amount: '1 tbsp' }
    ],
    image: 'https://picsum.photos/seed/quinoa/800/600'
  },
  {
    type: 'BREAKFAST',
    title: 'Berry Chia Pudding',
    description: 'Overnight chia with fresh berries',
    calories: 280,
    carbs: 35,
    fats: 12,
    proteins: 8,
    ingredients: [
      { name: 'Chia Seeds', amount: '3 tbsp' },
      { name: 'Almond Milk', amount: '1 cup' },
      { name: 'Mixed Berries', amount: '1/4 cup' }
    ],
    image: 'https://picsum.photos/seed/chia/800/600'
  },
  {
    type: 'DINNER',
    title: 'Roasted Salmon',
    description: 'Perfectly seasoned seasonal fish',
    calories: 480,
    carbs: 5,
    fats: 28,
    proteins: 42,
    ingredients: [
      { name: 'Salmon Fillet', amount: '150g' },
      { name: 'Asparagus', amount: '5 spears' },
      { name: 'Olive Oil', amount: '1 tbsp' }
    ],
    image: 'https://picsum.photos/seed/salmon/800/600'
  }
];

export const SUGGESTIONS: Meal[] = [
  {
    id: 's1',
    type: 'SNACK',
    title: 'Greek Yogurt & Honey',
    description: 'High protein snack',
    calories: 180,
    carbs: 15,
    fats: 5,
    proteins: 18,
    ingredients: [
      { name: 'Greek Yogurt', amount: '150g' },
      { name: 'Honey', amount: '1 tsp' }
    ],
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 's2',
    type: 'LUNCH',
    title: 'Chicken Caesar Salad',
    description: 'Classic lunch option',
    calories: 450,
    carbs: 20,
    fats: 25,
    proteins: 35,
    ingredients: [
      { name: 'Chicken Breast', amount: '100g' },
      { name: 'Romaine Lettuce', amount: '2 cups' },
      { name: 'Caesar Dressing', amount: '2 tbsp' }
    ],
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 's3',
    type: 'BREAKFAST',
    title: 'Oatmeal with Berries',
    description: 'Slow-release energy',
    calories: 320,
    carbs: 55,
    fats: 6,
    proteins: 12,
    ingredients: [
      { name: 'Oats', amount: '1/2 cup' },
      { name: 'Blueberries', amount: '1/4 cup' },
      { name: 'Almond Milk', amount: '1 cup' }
    ],
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 's4',
    type: 'DINNER',
    title: 'Tofu Stir Fry',
    description: 'Plant-based protein',
    calories: 520,
    carbs: 40,
    fats: 22,
    proteins: 28,
    ingredients: [
      { name: 'Firm Tofu', amount: '200g' },
      { name: 'Broccoli', amount: '1 cup' },
      { name: 'Soy Sauce', amount: '1 tbsp' },
      { name: 'Brown Rice', amount: '1/2 cup' }
    ],
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 's5',
    type: 'SNACK',
    title: 'Apple & Peanut Butter',
    description: 'Perfect balance',
    calories: 210,
    carbs: 25,
    fats: 12,
    proteins: 4,
    ingredients: [
      { name: 'Apple', amount: '1' },
      { name: 'Peanut Butter', amount: '1 tbsp' }
    ],
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 's6',
    type: 'LUNCH',
    title: 'Turkey Wrap',
    description: 'Quick and easy',
    calories: 380,
    carbs: 30,
    fats: 15,
    proteins: 25,
    ingredients: [
      { name: 'Whole Wheat Tortilla', amount: '1' },
      { name: 'Turkey Breast', amount: '100g' },
      { name: 'Spinach', amount: '1/2 cup' }
    ],
    date: new Date().toISOString().split('T')[0]
  }
];
