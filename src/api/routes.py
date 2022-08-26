"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Recipes, Ingredients, Trivia, Categories, RecipesFavorites, IngredientsFavorites, RecipeCategories, RecipesIngredients
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, verify_jwt_in_request
import cloudinary 
import cloudinary.uploader
from sqlalchemy import func, any_



api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#Login
@api.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if not user:
        return jsonify({"message": "incorrect email or password"}), 400
    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token, "user":user.serialize()}), 200

 
@api.route('user/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get(id)
    return jsonify(user.serialize())


#User and userRegistration
@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    data = [user.serialize() for user in users]
    
    return jsonify(data), 200

@api.route('/user', methods=['POST'])
def create_user():
    data = request.json
    user = User(name=data.get('name'), last_name=data.get('lastName'), email=data.get('email'), password=data.get('password'))
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "everything ok"}), 200


#RecipesFavorites
@api.route('/recipesfavorites', methods=['GET'])
@jwt_required()
def get_recipes_Favorites():
    user_id = get_jwt_identity()
    print(user_id)
    favorites = RecipesFavorites.query.filter_by(user_id = user_id)
    data = [favorite.Recipes.serialize() for favorite in favorites]

    for recipe in data: 
        recipe["is_favorite"] = True
    
    print(data)
    return jsonify(data), 200


@api.route('/recipesfavorites', methods=['POST'])
@jwt_required()
def add_recipes_favorites():
    user_id = get_jwt_identity()
    data = request.json
    is_exist = RecipesFavorites.query.filter_by(user_id= user_id, recipe_id=data.get('recipe_id')).count()
    if is_exist: 
        return jsonify({"message": "recipe exist"}), 200
    recipes = RecipesFavorites(user_id= user_id, recipe_id=data.get('recipe_id'))
    db.session.add(recipes)
    db.session.commit()
    return jsonify({"message": "recipe added"}), 200


#Recipes
@api.route('/recipes', methods=['GET'])
@jwt_required(optional=True)
def get_recipes():
    user_id = get_jwt_identity()
    
    recipes = Recipes.query.order_by(Recipes.id.desc()).limit(10).all()
    data = [recipe.serialize() for recipe in recipes]
    print(user_id)
    if user_id:
        user = User.query.get(user_id)
        favoritesrecipes = [user_fav.Recipes.id for user_fav in user.recipes_fav]
    
        for recipe in data: 
            recipe["is_favorite"] = True if recipe["id"] in favoritesrecipes else False
    
    return jsonify(data), 200
    
@api.route('/recipes/<int:id>', methods=['GET'])
def detail_recipes(id):
    recipe = Recipes.query.get(id)
    
    return jsonify(recipe.serialize()), 200

@api.route('/recipes', methods=['POST'])
def create_recipes():
    data = request.json
    recipe = Recipes(name=data.get('name'), description=data.get('description'), image=data.get('image'), cookingtime=data.get('cooking_time'))
    db.session.add(recipe)
    db.session.commit()
    return jsonify({"message": "everything ok"}), 200


@api.route('/addrecipes', methods=['POST'])
@jwt_required()
def add_recipes():
    user_id = get_jwt_identity()
    data = request.form
    print(data)
    cloudinary.config( 
        cloud_name = os.getenv('cloud_name'), 
        api_key = os.getenv('api_key'), 
        api_secret = os.getenv('api_secret'),
    )
    image = request.files["image"]
    uploadresult = cloudinary.uploader.upload(image)
    recipe = Recipes(name=data.get('name'), description=data.get('description'), image = uploadresult["secure_url"], cookingtime=data.get('cookingtime'), user_id=user_id)
    db.session.add(recipe)
    db.session.commit()
    categories = data.get("categories", "").split(",")
    for category_id in categories: 
        category = RecipeCategories(recipe_id = recipe.id, category_id = category_id)
        db.session.add(category)
        db.session.commit()
    return jsonify({"recipe_id": recipe.id}), 200


#IngredientsFavorites
@api.route('/ingredientsfavorites', methods=['GET'])
@jwt_required()
def get_ingredients_Favorites():
    user_id = get_jwt_identity()
    favorites = IngredientsFavorites.query.filter_by(user_id = user_id)
    ingredients = Ingredients.query.all()
    data = [ingredient.serialize() for ingredient in ingredients]
    for ingredient in data: 
        for favorite in favorites: 
            if ingredient["id"] == favorite.ingredie_id: 
                ingredient["favorite"] = True
    
    return jsonify(data), 200



#Ingredients
@api.route('/ingredients', methods=['GET'])
def get_ingredients():
    ingredients = Ingredients.query.all()
    data = [ingredient.serialize() for ingredient in ingredients]
    
    return jsonify(data), 200

@api.route('/ingredients', methods=['POST'])
def create_ingredients():
    data = request.json
    ingredient = Ingredients(name=data.get('name'), image=data.get('image'))
    db.session.add(ingredient)
    db.session.commit()
    return jsonify({"message": "everything ok"}), 200


#Trivia
@api.route('/trivia', methods=['GET'])
def get_trivia():
    trivia = Trivia.query.all()
    data = [trivia.serialize() for trivia in trivia]
    
    return jsonify(data), 200

@api.route('/trivia', methods=['POST'])
def create_trivia():
    data = request.json
    trivia = Trivia(id=data.get('id'), text=data.get('text'), image=data.get('image'))
    db.session.add(trivia)
    db.session.commit()
    return jsonify({"message": "everything ok"}), 200



#Categories
@api.route('/categories', methods=['GET'])
def get_categories():
    categories = Categories.query.all()
    data = [categories.serialize() for categories in categories]
    
    return jsonify(data), 200

@api.route('/categories', methods=['POST'])
def create_categories():
    data = request.json
    categories = Categories(id=data.get('id'), name=data.get('name'))
    db.session.add(categories)
    db.session.commit()
    return jsonify({"message": "everything ok"}), 200
    

@api.route('/recipesbycategory/<name>', methods=['GET'])
def recipes_category(name):
    recipecategories = RecipeCategories.query.join(Categories).filter(Categories.name == name)
    recipes= [recipecategory.recipes.serialize() for recipecategory in recipecategories]
    return jsonify(recipes), 200


#searchBar
@api.route('/searchbar', methods=['POST'])
def searchbar():
    user_id = None
    try: 
        if verify_jwt_in_request():
            user_id = get_jwt_identity()
    except Exception as e:  
        print(f"error: {e}")       

    data = request.json
    text = data.get("data")
    if len(text):
        search_data = text.split(", ")
        search_data = [f"{word}%" for word in search_data]
        ingredients = Ingredients.query.filter(Ingredients.name.ilike(any_(search_data)))
        ingredients = [ingredient.id for ingredient in ingredients]
        recipe_ingredients = RecipesIngredients.query.filter(RecipesIngredients.ingredient_id.in_(ingredients))
        recipes_id = [recipe_ingredient.Recipes.id for recipe_ingredient in recipe_ingredients ]
        recipes = Recipes.query.filter(Recipes.id.in_(recipes_id))
        recipes = [recipe.serialize() for recipe in recipes]
        if user_id:
            user = User.query.get(user_id)
            favoritesrecipes = [user_fav.Recipes.id for user_fav in user.recipes_fav]
    
            for recipe in recipes:
                recipe["is_favorite"] = True if recipe["id"] in favoritesrecipes else False
        return jsonify(recipes), 200

    return jsonify([]), 200


@api.route('/top_recipes', methods=['GET'])
@jwt_required(optional=True)
def top_recipes():
    user_id = get_jwt_identity()

    top_recipes = RecipesFavorites.query.with_entities(RecipesFavorites.recipe_id, func.count(RecipesFavorites.recipe_id)).group_by(RecipesFavorites.recipe_id).all()
    top_recipes = [item[0] for item in top_recipes]
    top_recipes = Recipes.query.filter(Recipes.id.in_(top_recipes))
    recipes = [recipe_fav.serialize() for recipe_fav in top_recipes]
    if user_id:
        user = User.query.get(user_id)
        favoritesrecipes = [user_fav.Recipes.id for user_fav in user.recipes_fav]
    
        for recipe in recipes: 
            recipe["is_favorite"] = True if recipe["id"] in favoritesrecipes else False
    return jsonify(recipes), 200
