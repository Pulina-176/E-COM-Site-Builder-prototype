import React, { useEffect, useState, useCallback, useContext } from 'react';
import Navbar_User from '../components-user/Navbar-user';
import axios from 'axios';
import { PropContext } from '../context/PropContext';
import Footer from '../components-user/Footer';
import ProductTile_user from '../components-user/Product-Tile-user';               // Product card with purchase button
import ProductTile_user_no_buy from '../components-user/Product-Tile-user-no-buy'; // Product card with no purchase button
import Spinner from '../components/Spinner';
import { ThemeContext } from '../context/ThemeContext';


const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Products_user = () => {

  const { theme } = useContext(ThemeContext); // Use context to access theme

  const list = ["Home", "Products", "Services", "Contact Us"];
  const [loading, setLoading] = useState(true); // State to handle the loading status

  // States to manage product categories, their IDs, and their properties
  const [productList, setProductList] = useState([]); //Product Category Name List  
  const [pIDList, setPIDList] = useState([]);         //Product ID list
  const [tileProps, setTileProps] = useState([]);     //properties viewed on tile
  const [allProps, setAllProps] = useState([]);       //all properties  
  const [productData, setProductData] = useState({}); //Data of individual product items
  const [features, setFeatures] = useState([]);       //Features of product categories (feature string)   

  // Fetch data function wrapped in useCallback to avoid unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      // Fetch object structure data
      const response = await axios.get(`${backendUrl}/custom-p-com`);
      const temp = response.data;

      const temp2 = [];           // Intermediate variable for productList
      const temp3 = [];           // Intermediate variable for pIDList
      const tilePropsTemp = [];   // Intermediate variable for tileProps
      const allPropsTemp = [];    // Intermediate variable for allProps
      const feats = [];           // Intermediate variable for features

      // Clear state variables for best performance
      setTileProps([]);    
      setAllProps([]);

      console.log(temp)

      // Process the fetched data
      temp.forEach((block) => {
        const temp4 = []; // Properties to display in the product tile
        const temp5 = []; // All properties of the product

        temp2.push(block.GroupName);
        temp3.push(block.ProductID);
        feats.push(block.Feature_string);

        for (const prop in block.Field_info){
          if (block.Field_info[prop].on_off === 1){
            temp4.push(prop); // Properties to display in the product tile
          }
          temp5.push(prop); // All properties of the product
        }  

        tilePropsTemp.push(temp4);
        allPropsTemp.push(temp5);
      });

      // Update state with processed data
      setTileProps(tilePropsTemp);
      setAllProps(allPropsTemp);
      setProductList(temp2);
      setPIDList(temp3);
      setFeatures(feats)

      // Fetch product data based on product IDs
      if (temp3.length > 0) {
        const productPromises = temp3.map((pID) =>
          axios.get(`${backendUrl}/products/${pID}`)
        );

        // Wait for all product data to be fetched
        const responses = await Promise.all(productPromises);
        const tempData = {};
        
        // Map the fetched data to the corresponding product ID
        responses.forEach((response, index) => {
          tempData[temp3[index]] = response.data;
        });

        setProductData(tempData); // Update state with fetched product data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
      console.log("list: ",pIDList[0])
    }
  }, []);

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Render a loading message if data is still being fetched
  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div className='pb-[0px]' style={{backgroundColor: theme.body,  color: theme.primaryText }}>
      <Navbar_User pages={list} />
      <h1 className='font-inter font-extrabold text-4xl ml-[60px] my-[30px]'
          style={{ color: theme.mainHead }}
      >
        Products </h1>
      
      {productList.map((item, index) => (
        <div key={index}>
          <h1 className='font-inter font-extrabold text-3xl ml-[60px] my-[30px]'>{item}</h1>
          <PropContext.Provider value={{ allProps, pIDList }}> {/* useContext usage for prop drilling */}
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mx-[10px] sm:mx-[20px] md:mx-[40px] lg:mx-[60px]'>
              {productData[pIDList[index]]?.map((value, i) => (
                <div key={i} className='mx-[20px] mb-[40px]'>
                  {features[index][1]==0? //check for buy option in feature string
                  <ProductTile_user_no_buy tileprops={tileProps[index]} features={features[index]} productData={value} index={index} />: 
                  <ProductTile_user tileprops={tileProps[index]} features={features[index]} productData={value} index={index} PID={pIDList[index]}/>}
                </div>
              ))}
            </div>
          </PropContext.Provider>
        </div>
      ))}

    {/* Footer Section */}
    <Footer 
    socialLinks={{
      facebook: 'https://facebook.com/yourpage',
      instagram: 'https://instagram.com/yourpage',
      twitter: 'https://twitter.com/yourpage',
    }}
    contactDetails={{
      email: 'info@yourcompany.com',
      phone: '+123 456 7890',
    }}
    />

    </div>
  );
};

export default Products_user;
