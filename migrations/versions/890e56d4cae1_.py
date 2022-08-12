"""empty message

Revision ID: 890e56d4cae1
Revises: a2bd78b6b62e
Create Date: 2022-08-08 18:19:31.602907

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '890e56d4cae1'
down_revision = 'a2bd78b6b62e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipe_categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_constraint('categories_recipe_id_fkey', 'categories', type_='foreignkey')
    op.drop_column('categories', 'recipe_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('categories', sa.Column('recipe_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('categories_recipe_id_fkey', 'categories', 'recipes', ['recipe_id'], ['id'])
    op.drop_table('recipe_categories')
    # ### end Alembic commands ###