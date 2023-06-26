import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import FoodItem from './models/FoodItem.js';
import Table from './models/Table.js';
import Order from './models/Order.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, ()=>{
    console.log('Connected to MongoDB');
})

// signup

app.post('/signup', async(req, res)=>{
    const { name, phone, email, password, role} = req.body;
    
    // validation to check if all fields are filled ends here

    // validation to check if email already exists starts here

    const existingUser = await User.findOne({email: email});
    if(existingUser){
        return res.json({
            success: false,
            message: "Email already exists"
        })
    }

    // validation to check if email already exists ends here

     // validation to check if phone already exists starts here

     const existingUserPhone = await User.findOne({ phone: phone });
     if(existingUserPhone){
         return res.json({
             success: false,
             message: "Phone already exists"
         })
     }
 
     // validation to check if phone already exists ends here

    const emptyFields = [];
    if(!name) emptyFields.push('name');
    if(!phone) emptyFields.push('phone');
    if(!email) emptyFields.push('email');
    if(!password) emptyFields.push('password');
    if(!role) emptyFields.push('role');

    if(emptyFields.length > 0){
        return res.status(400).json({
            success: false,
            message: `${emptyFields.join(', ')} are required`
        })
    }

    const user = new User({
        name: name,
        phone: phone,
        email: email,
        password: password,
        role: role
    })

    const savedUser = await user.save();
    res.json({
        success: true,
        message: "User created successfully",
        data: savedUser
    })
})

// login

app.post('/login', async(req, res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.json({
            success: false,
            message: "Email and password are required"
        })
    }

    const existingUser = await User.findOne({email: email, password: password});
    if(existingUser){
        return res.json({
            success: true,
            message: "Login successful",
            data: existingUser
        })
    }
    else{
        return res.json({
            success: false,
            message: "Invalid email or password"
        })
    }
})

// create table

app.post("/createTable", async(req, res)=>{
    const {tableNumber} = req.body;

    const existingTable = await Table.findOne({ tableNumber: tableNumber });
    if (existingTable) {
        return res.json({
            success: false,
            message: "Table already exists"
        })
    }

    const table = new Table({
        tableNumber: tableNumber,
        occupied: false
    })

    const savedTable = await table.save();

    res.json({
        success: true,
        message: "Table created successfully",
        data: savedTable
    })
})

app.post("/bookTable", async(req, res)=>{
    const { tableNumber, UserId } = req.body;
    
    const existingTable = await Table.findOne({ tableNumber: tableNumber });
    if (existingTable && existingTable.occupied) {
        return res.json({
            success: false,
            message: "Table already occupied"
        })
    }
    if(existingTable){
        existingTable.occupied = true;
        existingTable.occupiedBy = UserId;
        await existingTable.save();
    }

    res.json({
        success: true,
        message: "Table booked successfully",
        data: existingTable
    })
})

app.post("/unbookTable", async(req, res)=>{
    const { tableNumber } = req.body;
    
    const existingTable = await Table.findOne({ tableNumber: tableNumber });
   
    if(existingTable){
        existingTable.occupied = false;
        existingTable.occupiedBy = null;
        await existingTable.save();
    }

    res.json({
        success: true,
        message: "Table unbooked successfully",
        data: existingTable
    })
})

app.get("/availableTable", async (req, res)=>{
    const availableTables = await Table.find({ occupied: false });

    res.json({
        success: true,
        message: "Available tables fetched successfully",
        data: availableTables
    })
})

// Food items

app.post("/createFoodItem", async(req, res)=>{
    const {title, description, imgUrl, price, category} = req.body;
    const foodItem = new FoodItem({
        title: title,
        description: description,
        imgUrl: imgUrl,
        price: price,
        category: category
    })

    const savedFoodItem = await foodItem.save();

    res.json({
        success: true,
        message: "Food Item created successfully",
        data: savedFoodItem
    })
})

// http://localhost:5000/foodItemsByCategory?category=breakfast

app.get("/foodItemsByCategory", async(req, res)=>{
    const {category} = req.query;

    const foodItems = await FoodItem.find({
        category: {$regex: category, $options: 'i'}
    })

    res.json({
        success: true,
        message: "Food Items fetched successfully",
        data: foodItems
    })
})

// http://localhost:5000/foodItems?title=pizza

app.get("/foodItems", async(req, res)=>{
    const {title} = req.query;

    const foodItems = await FoodItem.find({
        title: {$regex: title, $options: 'i'}
    })

    res.json({
        success: true,
        message: "Food Items fetched successfully",
        data: foodItems
    })
})

app.post("/orderFoodItems", async(req, res)=>{
    const { UserId, tableNumber, items} = req.body;

    // count total order

    const totalOrders = await Order.countDocuments();
    const orderId = totalOrders + 1;

    const order = new Order({
        orderId: orderId,
        UserId: UserId,
        tableNumber: tableNumber,
        items: items
})

    const savedOrder = await order.save();

    res.json({
        success: true,
        message: "Food Items ordered successfully",
        data: savedOrder
    })
})

// order food route
app.post("/order-food", async (req, res) => {
    const { userId, foodItems, tableNumber } = req.body;
  
    // validation of empty fields start here
    if (!userId) {
      return res.status(422).json({
        error: "Please add user id",
      });
    }
    if (!foodItems || foodItems.length === 0) {
      return res.status(422).json({
        error: "Please add food items",
      });
    }
    if (!tableNumber) {
      return res.status(422).json({
        error: "Please add table number",
      });
    }
    // validation of empty fields end here
  
    //check if table exists and is occupied by the user
    // const table = await Table.findOne({ tableNumber: tableNumber });
    // if (!table) {
    //   return res.status(422).json({
    //     error: "Table does not exist",
    //   });
    // }
    // if (table.occupiedBy !== userId) {
    //   return res.status(422).json({
    //     error: "Table is not occupied by you",
    //   });
    // }
  
    // TODO: feature to add food items //to the cart and then place the order
  
    // const orderId = uuidv4(); // npm i uuid
    const orderId = "ORDER-" + Date.now();
  
    // count the number of orders
    const count = await Order.countDocuments();
  
    const order = new Order({
      userId: userId,
      foodItems: foodItems,
      tableNumber: tableNumber,
      orderId: orderId,
      orderNumber: count + 1,
    });
  
    const savedOrder = await order.save();
  
    res.json({
      success: true,
      message: "Order placed successfully",
      data: savedOrder,
    });
  });  

app.get("/order", async (req, res)=>{
    const {orderId} = req.query;

    const order = await Order.findOne({orderId: orderId});

    res.json({
        success: true,
        message: "Order fetched successfully",
        data: order
    })
})

app.get("/ordersByUserId", async(req, res)=>{
    const {userId} = req.query;

    const orders = await Order.find({userId: userId});

    res.json({
        success: true,
        message: "Orders fetched successfully",
        data: orders
    })
})

// delete item
app.delete('/item',async(req,res) => {
    try{
        let itemId
        const {id} = req.query
        itemId = id
        const item = await FoodItem.findById(itemId)
        if(!item){
            return res.status(404).json({
                success:false,
                message:"Item not found"
            })
        }
        await FoodItem.findByIdAndDelete(itemId)
        res.json({
            success:true,
            message:"Item deleted successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})

// update the order by adding or removing food items from the order by the user id
app.put("/update-order", async (req, res) => {
    const { userId, foodItems } = req.body;
  
    // validation of empty fields start here
    if (!userId) {
      return res.status(422).json({
        error: "Please add user id",
      });
    }
    if (!foodItems || foodItems.length === 0) {
      return res.status(422).json({
        error: "Please add food items",
      });
    }
    // validation of empty fields end here
  
    const order = await Order.findOne({ userId: userId });
  
    if (!order) {
      return res.status(422).json({
        error: "Order does not exist",
      });
    }
  
    //  update the order by just adding the new food items to the existing order
    order.foodItems = [...order.foodItems, ...foodItems];
  
    await order.save();
  
    res.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  });
  
  // get the orders of a user
  app.get("/user-orders", async (req, res) => {
    const { userId } = req.query;
  
    const userOrders = await Order.findOne({ userId: userId });
  
    if (!userOrders) {
      return res.status(422).json({
        error: "User orders does not exist",
      });
    }
  
    res.json({
      success: true,
      message: "User orders fetched successfully",
      data: userOrders,
    });
    // add a query string to the url like this: http://localhost:5000/user-orders?userId=60e1b1b0b0b5a8a0f4b0b0a1
  });
  

// update item
app.put('/item',async(req,res) => {
    try{
        let itemId
        const {id} = req.query
        itemId = id
        const item = await FoodItem.findById(itemId)
        if(!item){
            return res.status(404).json({
                success:false,
                message:"Item not found"
            })
        }
        const {title, description, imgUrl, price, category} = req.body;
        item.title = title
        item.description = description
        item.imgUrl = imgUrl
        item.price = price
        item.category = category
        await item.save()
        res.json({
            success:true,
            message:"Item updated successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})

// api routes ends here

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})