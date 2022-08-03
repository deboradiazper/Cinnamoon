from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    recipes_fav = db.relationship('RecipesFavorites', backref = 'User')
    ingredients_fav = db.relationship('IngredientsFavorites', backref = 'User')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }



class RecipesFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    def __repr__(self):
        return f'<RecipesFavorites %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "recipe_id" : self.recipe_id,
        }



class Recipes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(250))
    favorites = db.relationship('RecipesFavorites', backref = 'Recipes')
    ingredients = db.relationship('RecipesIngredients', backref = 'Recipes')
    categories = db.relationship('Categories', backref = 'Recipes')

    def __repr__(self):
        return f'<Recipes %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": self.image,
        }


class Ingredients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    image = db.Column(db.String(250))
    favorites = db.relationship('IngredientsFavorites', backref = 'Ingredients')
    recipes = db.relationship('RecipesIngredients', backref = 'Ingredients')
    trivia = db.relationship('Trivia', backref = 'Ingredients')

    def __repr__(self):
        return f'<Ingredients %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
        }


class IngredientsFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<IngredientsFavorites %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "ingredient_id": self.ingredient_id,
            "user": self.user_id,
        }



class RecipesIngredients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    def __repr__(self):
        return f'<RecipesIngredients %r>' % self.Ingredients.name

    def serialize(self):
        return {
            "id": self.id,
            "recipe_id": self.recipe_id,
            "ingredient_id": self.ingredient_id,
        }



class Trivia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(250))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    def __repr__(self):
        return f'<Trivia %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "image": self.image,
            "ingredient_id": self.ingredient_id,
        }



class Categories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    def __repr__(self):
        return f'<Categories %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "recipe_id": self.recipe_id,
        }
