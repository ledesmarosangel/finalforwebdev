import { useEffect, useState } from "react";
import Product from "../components/Product";
import {initMongoose} from "../lib/mongoose";
import {findAllProducts} from "./api/product";
import Footer from "../components/Footer";
import Layout from "../components/Layout";





export default function Home({products}) {
  
  const [phrase, setPhrase] = useState([]);
 
  const categoriesNames = [...new Set(products.map(p => p.category))];

  if(phrase){
      products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }
 
  return (
    <Layout>

  <header>
        <h1 className="text-3xl font-bold text-center">Sunflower Haven</h1>
      
      </header>

       
      <input value={phrase} onChange={e => setPhrase(e.target.value)}  type="text" placeholder="Search for products..." className="bg-gray-100 w-full py-2 px-4 rounded-xl"/>
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
              {products.find(p => p.category === categoryName) && (
                <div>
                  <h2 className="text-2xl capitalize text-center">{categoryName}</h2>
            <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide bg-gray-200 items-center">
            {products
              .filter(p => p.category === categoryName)
              .map(productInfo =>(
              <div key={productInfo._id} className="px-5 snap-start bg-gray-200 ">
                <Product {...productInfo} />
              </div>
            ))}
            </div>
                </div>
              )}
            
          </div>
        ))}
       
        </div>
    </Layout>
  )
};




export async function getServerSideProps(){

  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
  }
  
