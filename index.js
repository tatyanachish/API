const express = require('express');
const app = express();

// импортируем документ Recipes.js
const recipes = require('./Recipes')
console.log(recipes)

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get('/api/recipes',(req,res) => {
    res.json(recipes)
})
app.post('/api/recipes',(req,res) => {
    const newRecipe = {
        name: req.body.name,
        category: req.body.category,
        time: req.body.time
    }
    recipes.push(newRecipe);
    res.json(recipes);
})
app.delete('/api/recipes/:name',(req,res)=>{
    let { name } = req.params;
    let recipeToBeDeleted = recipes.find(recipe => recipe.name === name);

    if (recipeToBeDeleted) {
        res.json({
            message: 'Recipe deleted',
            recipes: recipes.filter(recipe => recipe.name !== name)
        })
    } else {
        res.status(404)
        .json({message:`Recipe doesn't exist`})
    }
})

app.put('api/recipes/:name',(req,res) => {
    let { name } = req.params;
    let recipeToBeUpdated = recipes.find(recipe => recipe.name === name);
    if (recipeToBeUpdated) {
        const updatedRecipe = req.body;
        recipes.forEach(recipe=>{
            if(recipe.name === req.params.name) {
                recipe.name = updatedRecipe;
                res.json({message:'Recipe updated',recipe})
            }           
        })
    }else {
        res.status(404)
        .json({message:`Recipe ${req.params.name} doesn't exist`})
    }

})


app.listen(3000, ()=> {
    console.log("I'm working")
})