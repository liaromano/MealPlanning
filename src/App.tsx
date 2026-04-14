import { Header, SummaryCard, MealCard, SeasonalBanner, BottomNav, InputView, SuggestionsView, ProfileView, HistoryView, MealDetailsView } from './components/MealPlanner';
import { INITIAL_MEALS, SUGGESTIONS, SEASONAL_OPTIONS, Meal, UserProfile, DEFAULT_PROFILE } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('meals');
    return saved ? JSON.parse(saved) : INITIAL_MEALS;
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });
  const [activeTab, setActiveTab] = useState('home');
  const [notification, setNotification] = useState<string | null>(null);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [viewDate, setViewDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const currentDayMeals = meals.filter(m => m.date === viewDate);
  const currentCalories = currentDayMeals.reduce((acc, m) => acc + m.calories, 0);
  const remainingCalories = userProfile.dailyGoal - currentCalories;

  const addMeal = (newMeal: Meal | Omit<Meal, 'id' | 'date'>) => {
    const mealDate = ('date' in newMeal) ? newMeal.date : viewDate;
    
    if ('id' in newMeal && meals.some(m => m.id === newMeal.id)) {
      setMeals(meals.map(m => m.id === newMeal.id ? { ...(newMeal as Meal), date: mealDate } : m));
      setNotification(`${newMeal.title} updated!`);
    } else {
      const mealWithId = { 
        ...newMeal, 
        id: Math.random().toString(36).substr(2, 9),
        date: mealDate 
      };
      setMeals([...meals, mealWithId as Meal]);
      setNotification(`${newMeal.title} added!`);
    }
    setEditingMeal(null);
    setTimeout(() => setNotification(null), 2000);
    if (activeTab !== 'home') setActiveTab('home');
  };

  const loadYesterdayMeals = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];
    const yesterdayMeals = meals.filter(m => m.date === yesterdayDate);
    
    if (yesterdayMeals.length === 0) {
      setNotification("No meals found for yesterday");
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    const newMeals = yesterdayMeals.map(m => ({
      ...m,
      id: Math.random().toString(36).substr(2, 9),
      date: viewDate,
      completed: false
    }));

    setMeals([...meals, ...newMeals]);
    setNotification(`Loaded ${newMeals.length} meals from yesterday`);
    setTimeout(() => setNotification(null), 2000);
  };

  const removeMeal = (id: string) => {
    const meal = meals.find(m => m.id === id);
    setMeals(meals.filter(m => m.id !== id));
    if (meal) {
      setNotification(`${meal.title} removed`);
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const toggleComplete = (id: string) => {
    setMeals(meals.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const startEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setActiveTab('input');
  };

  const isToday = viewDate === new Date().toISOString().split('T')[0];

  const getSeasonalMeal = () => {
    // Simple seed based on date string
    const seed = viewDate.split('-').reduce((acc, part) => acc + parseInt(part), 0);
    return SEASONAL_OPTIONS[seed % SEASONAL_OPTIONS.length];
  };

  const seasonalMeal = getSeasonalMeal();


  return (
    <div className="min-h-screen bg-background pb-32">
      <Header userName={userProfile.name} />
      
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <SummaryCard meals={currentDayMeals} dailyGoal={userProfile.dailyGoal} />

              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-headline font-bold tracking-tight">
                      {isToday ? "Today's Meals" : new Date(viewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </h3>
                    {!isToday && (
                      <button 
                        onClick={() => setViewDate(new Date().toISOString().split('T')[0])}
                        className="text-[10px] font-bold text-primary uppercase tracking-wider"
                      >
                        Return to Today
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className="text-primary font-bold text-sm hover:opacity-80 transition-opacity"
                  >
                    View History
                  </button>
                </div>

                {currentDayMeals.length === 0 ? (
                  <div className="bg-surface-container-low p-12 rounded-[32px] text-center space-y-4">
                    <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto">
                      <Utensils className="w-8 h-8 text-on-surface-variant/40" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold">Start by adding your first meal</h4>
                      <p className="text-sm text-on-surface-variant">Your personal assistant for smarter meal planning is ready!</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => setActiveTab('input')}
                        className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm"
                      >
                        Add First Meal
                      </button>
                      {isToday && (
                        <button 
                          onClick={loadYesterdayMeals}
                          className="text-primary text-xs font-bold hover:underline"
                        >
                          Load yesterday's meals
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {currentDayMeals.map((meal, index) => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <MealCard 
                          meal={meal} 
                          onRemove={removeMeal} 
                          onToggleComplete={toggleComplete}
                          onEdit={startEdit}
                          onViewDetails={(m) => {
                            setSelectedMeal(m);
                            setActiveTab('details');
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>

              <SeasonalBanner meal={seasonalMeal} onAdd={addMeal} />
            </motion.div>
          )}

          {activeTab === 'details' && selectedMeal && (
            <motion.div key="details">
              <MealDetailsView meal={selectedMeal} onBack={() => setActiveTab('home')} />
            </motion.div>
          )}

          {activeTab === 'input' && (
            <motion.div key="input">
              <InputView onAddMeal={addMeal} editingMeal={editingMeal} />
            </motion.div>
          )}

          {activeTab === 'summary' && (
            <motion.div key="summary" className="space-y-8">
              <h2 className="text-3xl font-headline font-extrabold tracking-tight">Daily Summary</h2>
              <SummaryCard meals={currentDayMeals} dailyGoal={userProfile.dailyGoal} />
              <div className="bg-surface-container-lowest p-8 rounded-[32px] editorial-shadow space-y-4">
                <h4 className="font-headline font-bold">Nutritional Breakdown</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Daily Goal</span>
                    <span className="font-bold">{userProfile.dailyGoal} kcal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Consumed</span>
                    <span className="font-bold text-primary">{currentCalories} kcal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Remaining</span>
                    <span className={`font-bold ${remainingCalories < 0 ? 'text-error' : 'text-secondary'}`}>
                      {remainingCalories} kcal
                    </span>
                  </div>
                  <div className="h-px bg-outline-variant/20 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Total Carbs</span>
                    <span className="font-bold">{currentDayMeals.reduce((acc, m) => acc + m.carbs, 0)}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Total Fats</span>
                    <span className="font-bold">{currentDayMeals.reduce((acc, m) => acc + m.fats, 0)}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Total Proteins</span>
                    <span className="font-bold">{currentDayMeals.reduce((acc, m) => acc + m.proteins, 0)}g</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div key="history">
              <HistoryView 
                meals={meals} 
                onBack={() => setActiveTab('home')} 
                onSelectDate={(date) => {
                  setViewDate(date);
                  setActiveTab('home');
                }}
              />
            </motion.div>
          )}

          {activeTab === 'suggestions' && (
            <motion.div key="suggestions">
              <SuggestionsView 
                suggestions={SUGGESTIONS} 
                onAdd={addMeal} 
                remainingCalories={remainingCalories}
              />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div key="profile">
              <ProfileView profile={userProfile} onUpdate={setUserProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActiveTab('input')}
        className="fixed bottom-28 right-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl z-50"
      >
        <Plus className="w-8 h-8" />
      </motion.button>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-6 py-3 rounded-full font-bold shadow-xl z-[60] text-sm"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
