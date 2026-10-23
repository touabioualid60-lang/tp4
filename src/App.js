import React, { useState } from 'react';

// Q1: Composant RecipeItem (Carte dyal recette wahda)
function RecipeItem({ recipe, onEdit, onDuplicate, onDelete }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: 'white', width: '250px' }}>
      <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
      <h3>{recipe.name}</h3>
      <span style={{ background: '#eee', padding: '2px 6px', fontSize: '12px', borderRadius: '4px' }}>{recipe.category}</span>
      <p>{recipe.description}</p>
      
      <div>
        <strong>Ingrédients : </strong>
        <ul>
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>

      <p>Difficulté : {recipe.difficulty} / 5</p>
      <p style={{ fontSize: '10px', color: 'gray' }}>Créée le : {recipe.date}</p>

      <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
        <button onClick={() => onEdit(recipe)}>Modifier</button>
        <button onClick={() => onDuplicate(recipe)}>Dupliquer</button>
        <button onClick={() => onDelete(recipe.id)} style={{ color: 'red' }}>Supprimer</button>
      </div>
    </div>
  );
}

// Q2: Composant RecipeList (La liste des recettes)
function RecipeList({ recipes, onEdit, onDuplicate, onDelete }) {
  return (
    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
      {recipes.map(recipe => (
        <RecipeItem 
          key={recipe.id} 
          recipe={recipe} 
          onEdit={onEdit} 
          onDuplicate={onDuplicate} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}

// Q4: Composant RecipeFilter (Recherche w Catégories)
function RecipeFilter({ search, setSearch, category, setCategory }) {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input 
        type="text" 
        placeholder="Rechercher..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        style={{ padding: '6px' }}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '6px' }}>
        <option value="Toutes">Toutes catégories</option>
        <option value="Entrée">Entrée</option>
        <option value="Plat">Plat</option>
        <option value="Dessert">Dessert</option>
        <option value="Boisson">Boisson</option>
      </select>
    </div>
  );
}

// Q3: Composant RecipeForm (Formulaire création / modification)
function RecipeForm({ show, onClose, onSave, editingRecipe }) {
  const [name, setName] = useState(editingRecipe ? editingRecipe.name : '');
  const [category, setCategory] = useState(editingRecipe ? editingRecipe.category : 'Plat');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState(editingRecipe ? editingRecipe.ingredients : []);
  const [difficulty, setDifficulty] = useState(editingRecipe ? editingRecipe.difficulty : 3);
  const [description, setDescription] = useState(editingRecipe ? editingRecipe.description : '');

  if (!show) return null;

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipeData = {
      id: editingRecipe ? editingRecipe.id : Date.now(),
      name,
      category,
      ingredients,
      difficulty,
      description,
      image: 'https://via.placeholder.com/150',
      date: new Date().toLocaleString()
    };
    onSave(newRecipeData);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '5px', width: '350px' }}>
        <h3>{editingRecipe ? 'Modifier la recette' : 'Nouvelle recette'}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom :</label><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%' }} />
          </div>
          <div>
            <label>Catégorie :</label><br />
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%' }}>
              <option value="Entrée">Entrée</option>
              <option value="Plat">Plat</option>
              <option value="Dessert">Dessert</option>
              <option value="Boisson">Boisson</option>
            </select>
          </div>
          <div>
            <label>Ingrédients :</label><br />
            <input type="text" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} placeholder="Ajouter un ingrédient" />
            <button type="button" onClick={handleAddIngredient}>Ajouter</button>
            <ul>
              {ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <label>Difficulté (1-5) :</label><br />
            <input type="number" min="1" max="5" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div>
            <label>Description :</label><br />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%' }}></textarea>
          </div>
          <br />
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Annuler</button>
        </form>
      </div>
    </div>
  );
}

// Composant Principal (MainPage / App)
export default function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Tacos méditerranéens',
      category: 'Plat',
      ingredients: ['Tortilla', 'Poulet', 'Tomate'],
      difficulty: 4,
      description: 'Tacos légers et parfumés.',
      image: 'https://via.placeholder.com/150',
      date: '11/19/2025, 12:47:37 PM'
    }
  ]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Toutes');
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Filtrer les recettes
  const filteredRecipes = recipes.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'Toutes' || r.category === category;
    return matchSearch && matchCategory;
  });

  const handleSave = (recipeData) => {
    const exists = recipes.find(r => r.id === recipeData.id);
    if (exists) {
      setRecipes(recipes.map(r => r.id === recipeData.id ? recipeData : r));
    } else {
      setRecipes([...recipes, recipeData]);
    }
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  const handleDuplicate = (recipe) => {
    const duplicated = { ...recipe, id: Date.now(), name: recipe.name + ' (Copie)' };
    setRecipes([...recipes, duplicated]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Creative Recipe Builder</h1>
      
      {/* Q4: Filter Component */}
      <RecipeFilter search={search} setSearch={setSearch} category={category} setCategory={setCategory} />

      <button onClick={() => { setEditingRecipe(null); setShowForm(true); }} style={{ marginBottom: '20px', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        + Créer une nouvelle recette
      </button>

      {/* Q2: RecipeList & Q1: RecipeItem */}
      <RecipeList 
        recipes={filteredRecipes} 
        onEdit={(recipe) => { setEditingRecipe(recipe); setShowForm(true); }} 
        onDuplicate={handleDuplicate} 
        onDelete={handleDelete} 
      />

      {/* Q3: RecipeForm Modal */}
      <RecipeForm 
        show={showForm} 
        onClose={() => setShowForm(false)} 
        onSave={handleSave} 
        editingRecipe={editingRecipe} 
      />
    </div>
  );
}