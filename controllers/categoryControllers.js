import Category from "../models/categoryModel.js";

// Get All Categories

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new category

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await Category.create({
      name,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a category

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const updatedCategory = await Category.update(
      { ...req.body },
      { where: { id: categoryId } }
    );

    if (updatedCategory > 0) {
      res.status(200).json({ message: "Category updated successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (err) {
    console.log("Could not update category" + err);
  }
};


// Delete a category

const deleteCategory = async (req,res) =>{
  const categoryId = req.params.id;

  try{
    const deletedCategory = await Category.destroy({where:{id: categoryId}})

    if(deletedCategory > 0){
      res.status(200).json({message:"Category deleted successfully"})
    } else{
      res.status(404).json({error:'Category not found'})
    }
  }
  catch(err){
    console.log(error)
    res.status(500).json({error:"Internal server error"})
  }
}

export { getAllCategories, createCategory, updateCategory , deleteCategory };
