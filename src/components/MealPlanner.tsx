import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, ChevronRight, Clock, Plus, Utensils, Home, PlusCircle, BarChart2, ShoppingBasket, Sparkles, ArrowRight, X, User, CheckCircle2, Edit3, Calendar, ArrowLeft } from 'lucide-react';
import { Meal, UserProfile } from '../types';

export function Header({ userName }: { userName?: string }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-20 bg-background/80 backdrop-blur-2xl border-b border-outline-variant/10">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-black text-primary tracking-tighter font-headline">MealPlanning</h1>
        </div>
        <p className="text-[10px] font-medium text-on-surface-variant/70 italic">Your personal assistant for smarter meal planning!</p>
      </div>
      <div className="flex items-center gap-3">
        {userName && (
          <span className="text-xs font-bold text-on-surface-variant hidden sm:block">Hi, {userName}</span>
        )}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
          <img 
            alt="User profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2w8eSqy2o2lifpf7PmYkGhp0At1-MbbimKAfgkDIVIkMcsjoYgPpUPDyMF6iuHQQnatQkKND-P6fkHI46zWMu1HoUXjuW7cr-vjCcmrNN7BBRkx4hTUpe6r-WP-KiLkjn9Ft7hXJG6HRJxzsYYc37lAZr3r2MaapoZP_WlcG2sFYt-D1R_MJbePbt1Gsr_bzZmtovWw3h6LvwXbNok6XV_IhmowB0JeUkbKKdc5xOQNC0HVh1wbtjMyVXTxgmGDOg09W2krNAdPE"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}

export function SummaryCard({ meals, dailyGoal }: { meals: Meal[]; dailyGoal: number }) {
  const currentCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const totalCalories = dailyGoal;
  
  const macros = [
    { label: 'Carbs', current: meals.reduce((acc, meal) => acc + meal.carbs, 0), total: 200, color: 'bg-primary', containerColor: 'bg-primary-container' },
    { label: 'Fats', current: meals.reduce((acc, meal) => acc + meal.fats, 0), total: 100, color: 'bg-secondary', containerColor: 'bg-secondary-container' },
    { label: 'Proteins', current: meals.reduce((acc, meal) => acc + meal.proteins, 0), total: 100, color: 'bg-tertiary', containerColor: 'bg-tertiary-container' },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container-lowest rounded-[32px] p-8 editorial-shadow relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-bl-full -mr-8 -mt-8" />
      <div className="relative z-10 flex flex-col gap-1">
        <span className="font-label text-sm text-on-surface-variant uppercase tracking-widest font-semibold">Today's Balance</span>
        <div className="flex items-baseline gap-2 mt-2">
          <h2 className="text-6xl font-headline font-extrabold tracking-tighter text-primary">{currentCalories.toLocaleString()}</h2>
          <span className="text-xl font-headline font-bold text-on-surface-variant">/ {totalCalories.toLocaleString()} kcal</span>
        </div>
        
        <div className="flex gap-6 mt-8">
          {macros.map((macro) => (
            <div key={macro.label} className="flex flex-col gap-2">
              <div className={`w-12 h-1 ${macro.containerColor} rounded-full overflow-hidden`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (macro.current / macro.total) * 100)}%` }}
                  className={`h-full ${macro.color}`} 
                />
              </div>
              <span className="text-[10px] font-label font-bold uppercase tracking-wider text-on-surface-variant">{macro.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const mealTypeConfig = {
  BREAKFAST: { color: 'bg-yellow-50 text-yellow-800', label: 'Breakfast' },
  LUNCH: { color: 'bg-blue-50 text-blue-800', label: 'Lunch' },
  DINNER: { color: 'bg-purple-50 text-purple-800', label: 'Dinner' },
  SNACK: { color: 'bg-pink-50 text-pink-800', label: 'Snack' },
};

export function MealCard({ meal, onRemove, onToggleComplete, onViewDetails }: { meal: Meal; onRemove?: (id: string) => void; onToggleComplete?: (id: string) => void; onEdit?: (meal: Meal) => void; onViewDetails?: (meal: Meal) => void }) {
  const config = mealTypeConfig[meal.type as keyof typeof mealTypeConfig] || mealTypeConfig.SNACK;

  return (
    <motion.div 
      layout
      whileHover={{ scale: 1.01 }}
      className={`group bg-surface-container-lowest rounded-[28px] editorial-shadow overflow-hidden flex flex-col relative transition-all h-[260px] w-full ${meal.completed ? 'opacity-60 grayscale-[0.5]' : ''}`}
    >
      {onRemove && (
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(meal.id); }}
          className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-error/10 transition-colors text-error"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className={`h-24 min-h-[96px] w-full ${config.color} flex items-center justify-center relative flex-shrink-0`}>
        <div className="bg-white/40 w-12 h-12 rounded-2xl backdrop-blur-sm flex items-center justify-center text-2xl">
          🍴
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-wider">
          {config.label}
        </div>
        {meal.completed && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center backdrop-blur-[1px]">
            <CheckCircle2 className="w-10 h-10 text-primary drop-shadow-sm" />
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`text-lg font-headline font-bold line-clamp-1 ${meal.completed ? 'line-through decoration-primary/40' : ''}`}>{meal.title}</h4>
            {onToggleComplete && (
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleComplete(meal.id); }}
                className={`p-1 rounded-full transition-colors flex-shrink-0 ${meal.completed ? 'text-primary' : 'text-on-surface-variant/30 hover:text-primary/50'}`}
              >
                <CheckCircle2 className="w-6 h-6" />
              </button>
            )}
          </div>
          <p className="text-xs text-on-surface-variant font-body line-clamp-2 leading-relaxed">{meal.description}</p>
        </div>
        
        <div className="pt-4 flex items-center justify-between border-t border-outline-variant/5 mt-auto">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-on-surface">{meal.calories} kcal</span>
          </div>
          {onViewDetails && (
            <button 
              onClick={() => onViewDetails(meal)}
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}


export function SeasonalBanner({ meal, onAdd }: { meal: any; onAdd?: (meal: any) => void }) {
  return (
    <section className="rounded-[32px] overflow-hidden relative p-8 h-48 flex flex-col justify-end">
      <img 
        className="absolute inset-0 w-full h-full object-cover" 
        src={meal.image} 
        alt={meal.title}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/40 to-transparent" />
      <div className="relative z-10 space-y-1">
        <span className="text-[10px] font-label font-bold uppercase text-white/70 tracking-widest">Daily Seasonal Suggestion</span>
        <h3 className="text-xl font-headline font-extrabold text-white leading-tight line-clamp-2">{meal.title}</h3>
        <button 
          onClick={() => onAdd?.(meal)}
          className="mt-2 text-white font-bold flex items-center gap-2 text-xs group"
        >
          Add to Plan 
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export function BottomNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'input', icon: PlusCircle, label: 'Add' },
    { id: 'summary', icon: BarChart2, label: 'Summary' },
    { id: 'suggestions', icon: Sparkles, label: 'Ideas' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-8 bg-background/90 backdrop-blur-xl rounded-t-[32px] shadow-[0_-4px_24px_rgba(44,47,46,0.06)]">
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all ${
            activeTab === item.id 
              ? 'bg-primary text-white scale-105' 
              : 'text-on-surface-variant/60 hover:bg-surface-container-low'
          }`}
        >
          <item.icon className="w-6 h-6" />
          <span className="font-label text-[10px] font-bold uppercase mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function InputView({ onAddMeal, editingMeal }: { onAddMeal: (meal: any) => void; editingMeal?: Meal | null }) {
  const [title, setTitle] = useState(editingMeal?.title || '');
  const [calories, setCalories] = useState(editingMeal?.calories.toString() || '');
  const [type, setType] = useState<Meal['type']>(editingMeal?.type || 'BREAKFAST');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredients, setIngredients] = useState<{ name: string; amount: string }[]>(editingMeal?.ingredients || []);

  useEffect(() => {
    if (editingMeal) {
      setTitle(editingMeal.title);
      setCalories(editingMeal.calories.toString());
      setType(editingMeal.type);
      setIngredients(editingMeal.ingredients);
    }
  }, [editingMeal]);

  const addIngredient = () => {
    if (!ingredientName) return;
    setIngredients([...ingredients, { name: ingredientName, amount: '1 unit' }]);
    setIngredientName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !calories) return;
    onAddMeal({
      ...(editingMeal ? { id: editingMeal.id, date: editingMeal.date } : {}),
      title,
      calories: parseInt(calories),
      type,
      description: editingMeal?.description || 'Custom meal',
      ingredients: ingredients,
      carbs: Math.round(parseInt(calories) * 0.4 / 4),
      fats: Math.round(parseInt(calories) * 0.3 / 9),
      proteins: Math.round(parseInt(calories) * 0.3 / 4),
      completed: editingMeal?.completed || false,
    });
    setTitle('');
    setCalories('');
    setIngredients([]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-headline font-extrabold tracking-tight">{editingMeal ? 'Edit Meal' : 'Add a Meal'}</h2>
      <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 rounded-[32px] editorial-shadow space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-label font-bold uppercase text-on-surface-variant">Meal Type</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  type === t ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-label font-bold uppercase text-on-surface-variant">Meal Name</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Berry Smoothie"
            className="w-full bg-surface-container-high p-4 rounded-2xl outline-none focus:ring-2 ring-primary/20 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-label font-bold uppercase text-on-surface-variant">Calories</label>
          <input 
            type="number" 
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="e.g. 350"
            className="w-full bg-surface-container-high p-4 rounded-2xl outline-none focus:ring-2 ring-primary/20 transition-all"
          />
        </div>
        
        <div className="space-y-4">
          <label className="text-xs font-label font-bold uppercase text-on-surface-variant">Ingredients</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              placeholder="Add ingredient..."
              className="flex-1 bg-surface-container-high p-4 rounded-2xl outline-none focus:ring-2 ring-primary/20 transition-all"
            />
            <button 
              type="button"
              onClick={addIngredient}
              className="bg-primary-container text-primary p-4 rounded-2xl"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing, i) => (
              <span key={i} className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant flex items-center gap-2">
                {ing.name}
                <button type="button" onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== i))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary text-white p-4 rounded-2xl font-bold hover:opacity-90 transition-opacity"
        >
          Add to Plan
        </button>
      </form>
    </motion.div>
  );
}

export function ShoppingListView({ meals }: { meals: Meal[] }) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  if (meals.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 text-center py-12"
      >
        <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBasket className="w-10 h-10 text-on-surface-variant/40" />
        </div>
        <h2 className="text-2xl font-headline font-bold">Your list is empty</h2>
        <p className="text-on-surface-variant max-w-xs mx-auto">Add some meals to your plan and we'll generate a shopping list for you.</p>
      </motion.div>
    );
  }

  const ingredients = meals.reduce((acc, meal) => {
    meal.ingredients.forEach(ing => {
      const existing = acc.find(a => a.name === ing.name);
      if (existing) {
        // Simple aggregation logic
        if (!existing.amount.includes(ing.amount)) {
          existing.amount += `, ${ing.amount}`;
        }
      } else {
        acc.push({ ...ing });
      }
    });
    return acc;
  }, [] as { name: string; amount: string }[]);

  const toggleItem = (name: string) => {
    if (checkedItems.includes(name)) {
      setCheckedItems(checkedItems.filter(i => i !== name));
    } else {
      setCheckedItems([...checkedItems, name]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-headline font-extrabold tracking-tight">Shopping List</h2>
      <div className="bg-surface-container-lowest p-8 rounded-[32px] editorial-shadow space-y-4">
        {ingredients.length === 0 ? (
          <p className="text-on-surface-variant text-center py-8">No ingredients needed yet.</p>
        ) : (
          ingredients.map((ing, i) => (
            <div 
              key={i} 
              onClick={() => toggleItem(ing.name)}
              className="flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-0 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 transition-colors flex items-center justify-center ${
                  checkedItems.includes(ing.name) ? 'bg-primary border-primary' : 'border-outline-variant'
                }`}>
                  {checkedItems.includes(ing.name) && <X className="w-3 h-3 text-white" />}
                </div>
                <span className={`font-bold transition-all ${
                  checkedItems.includes(ing.name) ? 'text-on-surface-variant/40 line-through' : 'text-on-surface'
                }`}>
                  {ing.name}
                </span>
              </div>
              <span className={`text-sm transition-all ${
                checkedItems.includes(ing.name) ? 'text-on-surface-variant/20' : 'text-on-surface-variant'
              }`}>
                {ing.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export function MealDetailsView({ meal, onBack }: { meal: Meal; onBack: () => void }) {
  const config = mealTypeConfig[meal.type as keyof typeof mealTypeConfig] || mealTypeConfig.SNACK;
  
  const nutrition = [
    { label: 'Carbs', value: meal.carbs, unit: 'g', color: 'bg-primary' },
    { label: 'Protein', value: meal.proteins, unit: 'g', color: 'bg-tertiary' },
    { label: 'Fats', value: meal.fats, unit: 'g', color: 'bg-secondary' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-surface-container-low rounded-xl text-primary hover:bg-surface-container-high transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-headline font-extrabold tracking-tight">Meal Details</h2>
      </div>

      <div className="bg-surface-container-lowest rounded-[40px] overflow-hidden editorial-shadow">
        <div className={`min-h-[16rem] md:h-48 w-full ${config.color} flex flex-col md:block items-center justify-center p-8 md:p-0 relative`}>
          <div className="bg-white/40 w-20 h-20 md:w-24 md:h-24 rounded-[32px] backdrop-blur-sm flex items-center justify-center text-4xl md:text-5xl md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 mb-6 md:mb-0">
            🍴
          </div>
          <div className="md:absolute md:bottom-6 md:left-8 text-center md:text-left">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-label font-bold uppercase tracking-wider text-on-surface mb-2 inline-block">
              {config.label}
            </span>
            <h3 className="text-2xl md:text-4xl font-headline font-extrabold text-on-surface line-clamp-2">
              {meal.title}
            </h3>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {nutrition.map((item) => (
              <div key={item.label} className="bg-surface-container-low p-4 rounded-3xl text-center">
                <div className={`w-2 h-2 rounded-full ${item.color} mx-auto mb-2`} />
                <p className="text-2xl font-headline font-bold">{item.value}{item.unit}</p>
                <p className="text-[10px] font-label font-bold uppercase text-on-surface-variant">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-headline font-bold">Ingredients</h4>
              <span className="text-sm font-bold text-primary">{meal.calories} kcal</span>
            </div>
            <div className="grid gap-3">
              {meal.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                  <span className="font-bold">{ing.name}</span>
                  <span className="text-sm text-on-surface-variant">{ing.amount}</span>
                </div>
              ))}
              {meal.ingredients.length === 0 && (
                <p className="text-on-surface-variant italic text-center py-4">No ingredients listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HistoryView({ meals, onBack, onSelectDate }: { meals: Meal[]; onBack: () => void; onSelectDate: (date: string) => void }) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-surface-container-low rounded-xl text-primary hover:bg-surface-container-high transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight">Meal History</h2>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-8 rounded-[32px] editorial-shadow space-y-6">
        <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Select a Day</span>
          <span className="text-xs font-medium text-primary">Last 7 Days</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {last7Days.map((date) => {
            const dayMeals = meals.filter(m => m.date === date);
            const totalCals = dayMeals.reduce((acc, m) => acc + m.calories, 0);
            const isToday = date === new Date().toISOString().split('T')[0];

            return (
              <button
                key={date}
                onClick={() => onSelectDate(date)}
                className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-all text-left"
              >
                <div>
                  <p className="font-bold text-on-surface">
                    {isToday ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-on-surface-variant uppercase font-bold">{dayMeals.length} meals recorded</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary">{totalCals} kcal</span>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/40" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function SuggestionsView({ suggestions, onAdd, remainingCalories }: { suggestions: Meal[]; onAdd: (meal: Meal | Omit<Meal, 'id'>) => void; remainingCalories: number }) {
  const [showCount, setShowCount] = useState(3);
  const filteredSuggestions = suggestions.filter(s => s.calories <= remainingCalories + 200).slice(0, showCount);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-headline font-extrabold tracking-tight">Ideas</h2>
        <span className="text-xs font-label font-bold text-primary bg-primary-container px-3 py-1 rounded-full">
          {remainingCalories > 0 ? `${remainingCalories} kcal left` : 'Goal reached'}
        </span>
      </div>
      
      {filteredSuggestions.length === 0 ? (
        <div className="text-center py-12 bg-surface-container-low rounded-[32px]">
          <Sparkles className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-4" />
          <p className="text-on-surface-variant font-medium">No suggestions fit your remaining calories.</p>
          <p className="text-xs text-on-surface-variant/60 mt-1">Try increasing your daily goal or removing a meal.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4">
            {filteredSuggestions.map((meal) => (
              <div key={meal.id} className="relative">
                <MealCard meal={meal} />
                <button 
                  onClick={() => onAdd(meal)}
                  className="absolute bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          {showCount < suggestions.length && (
            <button 
              onClick={() => setShowCount(prev => prev + 3)}
              className="w-full py-4 bg-surface-container-low rounded-2xl font-bold text-primary hover:bg-surface-container-high transition-colors"
            >
              More suggestions
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function ProfileView({ profile, onUpdate }: { profile: UserProfile; onUpdate: (profile: UserProfile) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-headline font-extrabold tracking-tight">Profile & Goals</h2>
      
      <div className="bg-surface-container-lowest p-8 rounded-[32px] editorial-shadow space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-label font-bold uppercase text-on-surface-variant">Full Name</label>
          <input 
            type="text" 
            value={profile.name}
            placeholder="Your name"
            onChange={(e) => onUpdate({ ...profile, name: e.target.value })}
            className="w-full bg-surface-container-high p-4 rounded-2xl outline-none focus:ring-2 ring-primary/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-label font-bold uppercase text-on-surface-variant">Age</label>
            <input 
              type="number" 
              value={profile.age}
              onChange={(e) => onUpdate({ ...profile, age: parseInt(e.target.value) || 0 })}
              className="w-full bg-surface-container-high p-4 rounded-2xl outline-none focus:ring-2 ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-label font-bold uppercase text-on-surface-variant">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => onUpdate({ ...profile, gender: e.target.value as any })}
              className="w-full bg-surface-container-high p-4 rounded-2xl outline-none focus:ring-2 ring-primary/20 transition-all appearance-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-label font-bold uppercase text-on-surface-variant">Daily Calorie Goal</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="1200"
              max="4000"
              step="50"
              value={profile.dailyGoal}
              onChange={(e) => onUpdate({ ...profile, dailyGoal: parseInt(e.target.value) })}
              className="flex-1 accent-primary"
            />
            <span className="text-xl font-headline font-bold text-primary w-20 text-right">{profile.dailyGoal}</span>
          </div>
        </div>

        <div className="pt-4 p-4 bg-primary-container/20 rounded-2xl border border-primary-container/50">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Your daily goal helps us suggest the right meals and track your progress throughout the day.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
