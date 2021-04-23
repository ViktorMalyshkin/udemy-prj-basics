import {Injectable} from '@angular/core'
import {RecipeModel} from '../recipes/recipe.model'
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<RecipeModel[]>();

  private recipes: RecipeModel[] = [
    new RecipeModel(
      'Tasty Schnizel',
      'A super-tasty Schnizel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new IngredientModel('Meat', 1),
        new IngredientModel('French Fries', 20),
      ]),
    new RecipeModel(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new IngredientModel('Buns', 2),
        new IngredientModel('Meat', 1),
      ]),
  ]

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: RecipeModel){
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: RecipeModel){
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
}
