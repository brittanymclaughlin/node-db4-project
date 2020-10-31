
exports.up = async function(knex) {
    await knex.schema.createTable("recipes", (table)=>{
        table.increments("id").unique()
        table.text("recipeName").notNull()
        table.integer("created").defaultTo(knex.raw("current_timestamp"))
    })
    await knex.schema.createTable("ingredients", (table)=>{
        table.increments("id").unique()
        table.text("ingredientName").notNull()
    })
    await knex.schema.createTable("recipeSteps", (table)=>{
        table.increments("id").unique()
        table.integer("recipeId").notNull().references("id").inTable("recipes")
        table.text("instructions").notNull()
        table.integer("stepNumber").notNull()
    })
    await knex.schema.createTable("recipeIngredients", (table)=>{
        table.integer("recipeId").notNull().references("id").inTable("recipes")
        table.integer("ingredientId").notNull().references("id").inTable("ingredients")
        table.text("quantity").notNull()
        table.primary(["recipeId", "ingredientId"])
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("recipeIngredients")
    await knex.schema.dropTableIfExists("recipeSteps")
    await knex.schema.dropTableIfExists("ingredients")
    await knex.schema.dropTableIfExists("recipes")
  };
  