const jwt = require('jsonwebtoken')
const db = require('../dbconn/db')

exports.Register=(req,res)=>{
    
    const userName = req.body['username']
    const password = req.body['password']
    const user_type = req.body['user_type']
    const email = req.body['email']

    const sql = `INSERT INTO users(username, password, user_type,email) VALUES ('${userName}','${password}','${user_type}','${email}')`
    
    db.query(sql,(err,data)=>{

        if(err){
            res.status(400).json({message:"failed to register user!"})
        }else{
            res.status(201).json({message:"User Registered Successfully!",data:data})
        }
    })


}

exports.login=(req,res)=>{

    const userName = req.body['username'];
    const password = req.body['password'];
  
    const sql = `SELECT * FROM users WHERE username = '${userName}' AND password = '${password}'`;
  
    db.query(sql, (err, data) => {
      if (err) {
        res.status(400).json({ message: 'Error during login' });
      } else {
        if (data.length > 0) {

            let Payload ={
                exp:Math.floor(Date.now()/1000)+(60*60),
                data:data
            }
            let Token = jwt.sign(Payload,"MuhammadRafi2318");
            
            res.status(200).json({message:"User logged in Successfully!",data:data,token:Token})


        } else {

          res.status(401).json({ message: 'Invalid credentials' });

        }
      }
    });


}

exports.createCatalog=(req,res)=>{

  const user_type = req.body['user_type'];
  const seller_id = req.body['seller_id'];
  const catalog_name = req.body['catalog_name'];
 


  if(user_type !== "buyer"){

    const findSellerSql = `SELECT * FROM users WHERE id = ${seller_id}`;

    db.query(findSellerSql,(err,result)=>{

      if(result.length>0){

        const createCatalogSql = `INSERT INTO catalog(catalog_name,seller_id) VALUES ('${catalog_name}','${seller_id}')`
        db.query(createCatalogSql,(err,data)=>{

          if(err){
            res.status(400).json({message:"failed to create Catalog!"})
        }else{

            res.status(201).json({message:"Catalog Created Successfully!",data:data})
        }

        })
        
      }

    })


  }else{
    res.status(401).json({ message: 'Only Buyer can Access Seller List' });
  }

} 
exports.createProducts=(req,res)=>{

  const catalog_id = req.body['catalog_id'];
  const product_name = req.body['name'];
  const price = req.body['price'];


    const findCatalogSql = `SELECT * FROM catalog WHERE id = ${catalog_id}`;

    db.query(findCatalogSql,(err,result)=>{

      if(result.length>0){

        const createProductsgSql = `INSERT INTO products(catalog_id,name, price) VALUES ('${catalog_id}','${product_name}','${price}')`
        db.query(createProductsgSql,(err,data)=>{

          if(err){
            res.status(400).json({message:"failed to create Product!"})
        }else{

            res.status(201).json({message:"Product Created Successfully!",data:data})
        }

        })
        
      }

    })


} 

exports.sellerList=(req,res)=>{


    const findSellerSql = `SELECT * FROM users`;

    db.query(findSellerSql,(err,result)=>{

      if(result.length>0){

        res.status(200).json({ message: 'List of Seller!',data:result });

      }else{
        res.status(404).json({ message: 'Not Found!' });
      }

    })


} 
exports.sellerCatalog=(req,res)=>{

  const seller_id = req.params['seller_id']

    const findCatalog = `SELECT * FROM catalog where seller_id = '${seller_id}'`;

    db.query(findCatalog,(err,result)=>{

      if(result.length>0){

        res.status(200).json({ message: 'List of Catalog!',data:result });

      }else{
        res.status(404).json({ message: 'Not Found!' });
      }

    })


} 
exports.createOrder = (req, res) => {

  const seller_id = req.params['seller_id'];
  const buyer_id = req.body['buyer_id'];
  const product_ids = req.body['product_id'];
  const catalog_id = req.body['catalog_id'];
  const productIdsArray = product_ids.split(',').map((productId) => parseInt(productId.trim(), 10));

  // Validate product IDs
  const checkProductsQuery = `SELECT product_id FROM products WHERE product_id IN (${productIdsArray.join(',')})`;

  db.query(checkProductsQuery, (productsError, productsResult) => {
    if (productsError) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    const availableProductIds = productsResult.map(product => product.product_id);

    // Check if all ordered product IDs are available
    const unavailableProductIds = productIdsArray.filter(id => !availableProductIds.includes(id));

    // Filter out unavailable product IDs and insert only available products
    const availableProductItems = availableProductIds.map(productId => {
      return `('${productId}','${seller_id}','${buyer_id}','${catalog_id}')`;
    });

    const addOrderItemsQuery = `
      INSERT INTO orders (product_id, seller_id, buyer_id, catalog_id) 
      VALUES ${availableProductItems.join(',')}
    `;

    db.query(addOrderItemsQuery, (err, data) => {
      if (err) {
        res.status(400).json({ message: 'Error!', error: err });
      } else {
        res.status(201).json({ message: 'Order created successfully', data: data });
      }
    });
  });
};

exports.getOrders=(req,res)=>{

  const seller_id = req.params['seller_id'];
  const checkSellerSql = `SELECT * FROM users WHERE id = ${seller_id} AND user_type='seller'`;

  db.query(checkSellerSql,(err,data)=>{
    if(data.length>0){

      const sql = `SELECT * FROM orders WHERE seller_id ='${seller_id}'`
      db.query(sql,(err,data)=>{
        if (err) {
          res.status(400).json({ message: 'Error!', error: err });
        } else {
          res.status(201).json({ message: 'Order List', data: data });
        }
      })

    }else{
      res.status(404).json({ message: 'Invalid seller ID !', error: err });
    }
  })




}