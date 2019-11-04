const uuid = require('uuid/v1');
const Version = require('./version');
// const RecipeService = require('../services/recipe-service');

module.exports = class Recipe {
  constructor(title, id, dateCreated) {
    this.title = title;
    this.id = id || `${this.title.replace(' ', '').toLowerCase()}-${uuid()}`;
    this.dateCreated = dateCreated || new Date;
    this.versions = [];

    // this.images = [] // TODO: implement an images array
  }

  addVersion(recipeDetails) {
    const allItems = this.versions;
    const lastItem = allItems[allItems.length - 1];
    const lastItemsId = (lastItem && lastItem.id) || 0;

    let version = new Version(recipeDetails, (lastItemsId + 1));
    // console.log(version);
    if (recipeDetails.ingredients.length > 0) {
      version.saveIngredients(recipeDetails.ingredients);
    }

    this.versions.push(version);
  }

  getVersion(versionNo) {
    return this.versions[versionNo - 1];
  }

  deleteVersionById(id) {
    this.versions = this.versions.filter(version => version.id !== id);

    // RecipeService.update(this);
  }

  static create({ title, id, dateCreated, versions }) {
    const recipe = new Recipe(title, id, dateCreated);

    recipe.versions = versions.map(version => Version.create(version));

    return recipe;
  }
};