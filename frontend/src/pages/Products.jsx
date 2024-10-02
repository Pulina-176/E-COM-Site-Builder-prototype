import React, { useEffect, useState, useCallback, useContext } from 'react';
import Navbar from '../components/Navbar';
import ProductTile from '../components/Product-Tile';
import axios from 'axios';
import AddItemForm from '../components/AddItemForm';
import { PropContext } from '../components/PropContext';
import Spinner from '../components/Spinner';
import { ThemeContext } from '../context/ThemeContext';


const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Products = () => {

  const { theme } = useContext(ThemeContext); // Use context to access theme

  const list = ["Home", "Products", "Services", "Contact Us"];
  const [loading, setLoading] = useState(true); // State to handle the loading status

  // States to manage product categories, their IDs, and their properties
  const [productList, setProductList] = useState([]); //Product Category Name List  
  const [pIDList, setPIDList] = useState([]);         //Product ID list
  const [tileProps, setTileProps] = useState([]);     //tile properties
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
    }
  }, []);

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Render a loading message if data is still being fetched
  if (loading) {
    return <div><Spinner /></div>;;
  }

  return (
    <div className='pb-[50px]' style={{backgroundColor: theme.body,  color: theme.primaryText}}>
      <Navbar pages={list} />
      <h1 className='font-inter font-extrabold text-4xl ml-[60px] my-[30px]'
          style={{ color: theme.mainHead }}
      >
        Products
      </h1>
      {productList.map((item, index) => (
        <div key={index}>
          <h1 className='font-inter font-extrabold text-3xl ml-[60px] my-[30px]'>{item}</h1>
          <PropContext.Provider value={{ allProps, pIDList }}> {/* useContext usage for prop drilling */}
          <div className='flex flex-row'>
            <div className='ml-[60px] flex flex-row'>
              {productData[pIDList[index]]?.map((value, i) => (
                <div key={i} className='mx-[20px]'>
                  <ProductTile tileprops={tileProps[index]} productData={value} features={features[index]} index={index}/>
                </div>
              ))}
            </div>
            <AddItemForm propertyFields={allProps[index]} pID={pIDList[index]} features={features[index]}/>
          </div>
          </PropContext.Provider>
        </div>
      ))}
    </div>
  );
};

export default Products;
