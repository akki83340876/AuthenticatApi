const express = require('express');
const db = require('../config/connection'); // Import your database module

const User= db.User;
const app = express();

// Insert Data
var postUsers= async(req,res)=>{
  var postData=req.body;
  if(postData.length>1){
var data = await User.bulkCreate(postData)
  }else{
  var data = await User.create(postData)
  } 
  res.status(200).json({result:"Data added successfull....."});
  res.status(200).json({data:data});
}


// Find All data
  var getUsers = async(req,res)=>{
    const data = await User.findAll({})
    res.status(200).json({data:data})
  }

// Find data according to field
  var getUser = async(req,res)=>{
    const data = await User.findOne({
      include:["userDetails", "userProfile"],
      where:{
        id:req.params.id
      }
    })
    res.status(200).json({data:data})
  }

    //Delete Data
  var deleteUser = async(req,res)=>{
    const data = await User.destroy({
      where:{
        id:req.params.id
      }
    })
    res.status(200).json({data:data})
  }

  //Update data
  var patchUser = async(req,res)=>{
     var updateData = req.body;
    const data = await User.update(updateData,{
      where:{
        id:req.params.id
      }
    })
    res.status(200).json({data:data})
  }
  module.exports=({

    postUsers,
     getUsers,
     getUser,
     deleteUser,
     patchUser
   })

// //create DB
// var createdb = async (req, res) => {
//   try {
//     let sql = 'CREATE DATABASE crud_2';
//     await db.query(sql);
//     res.send('Database Created...');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error creating database');
//   }
// };

   //    // finding and Agreegation according to operator

//   var queryUser = async(req,res)=>{
//     var data = await User.findAll({
//     //attributes:['id',[Sequelize.fn('COUNT',Sequelize.col('id')),'count']] //Counting available data in our table
//     where:{
//       [Op.or]:[{id:1},{id:5}]
//     }
//     });
//    res.status(200).json({data:data})
//  }  
// //findandcreate
// var findUser = async(req,res)=>{
//     const [user, created] = await User.findOrCreate({
//       where: { name: 'virat_420' },
//       defaults: {
//         lastName: 'khare',email:"viru@gmail.com",password:"123456"
//       }
//     });
//  res.status(200).json({data:user,created:created})
// }

//       include: [
//         {
//             model: userDetails,
//             as: "userDetails",
//         },
//         {
//             model: userProfile,
//             as: "userProfile",
//         },
//  ],



