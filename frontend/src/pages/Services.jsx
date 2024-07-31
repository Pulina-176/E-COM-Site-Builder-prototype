import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '../components/Navbar';
import ServiceCard from '../components/Service-Card';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { PropContext } from '../components/PropContext';

import AddItemForm_Services from '../components/AddItemForm-Services';

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Services = () => {

    const list = ["Home", "Products", "Services", "Contact Us"];
    const [loading, setLoading] = useState(true); // State to handle the loading status
    
    // States to manage service categories, their IDs, and their properties
    const [serviceList, setServiceList] = useState([]); //Service Category Name List  
    const [sIDList, setSIDList] = useState([]);         //Service ID list
    const [tileProps, setTileProps] = useState([]);     //tile properties
    const [allProps, setAllProps] = useState([]);       //all properties  
    const [serviceData, setServiceData] = useState({}); //Data of individual Service items 

    // Fetch data function wrapped in useCallback to avoid unnecessary re-renders
    const fetchData = useCallback(async () => {
    try {
        // Fetch object structure data
        const response = await axios.get(`${backendUrl}/custom-s-com`);
        const temp = response.data;
        const temp2 = [];           // Intermediate variable for productList
        const temp3 = [];           // Intermediate variable for pIDList
        const tilePropsTemp = [];   // Intermediate variable for tileProps
        const allPropsTemp = [];    // Intermediate variable for allProps

        // Clear state variables for best performance
        setTileProps([]);    
        setAllProps([]);

        // Process the fetched data
        temp.forEach((block) => {
        const temp4 = []; // Properties to display in the service tile
        const temp5 = []; // All properties of the service

        temp2.push(block.GroupName);
        temp3.push(block.ServiceID);

        for (const prop in block.Field_info){
            if (block.Field_info[prop].on_off === 1){
            temp4.push(prop); // Properties to display in the service tile
            }
            temp5.push(prop); // All properties of the service
        }  
        
        tilePropsTemp.push(temp4);
        allPropsTemp.push(temp5);
        });

        // Update state with processed data
        setTileProps(tilePropsTemp);
        setAllProps(allPropsTemp);
        setServiceList(temp2);
        setSIDList(temp3);

        // Fetch service data based on service IDs (items under single category)
        if (temp3.length > 0) {
        const productPromises = temp3.map((sID) =>
            axios.get(`${backendUrl}/services/${sID}`)
        );

        // Wait for all service data to be fetched
        const responses = await Promise.all(productPromises);
        const tempData = {};
        
        // Map the fetched data to the corresponding product ID
        responses.forEach((response, index) => {
            tempData[temp3[index]] = response.data;
        });

        setServiceData(tempData); // Update state with fetched product data
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
    return <div><Spinner /></div>;
  }
    
  return (
    <div>
      <Navbar pages={list} />
      <h1 className='font-inter font-extrabold text-4xl ml-[60px] my-[30px]'>Services</h1>
      
      {serviceList.map((item, index) => (
        <div key={index}>
            <h1 className='font-inter font-extrabold text-3xl ml-[60px] my-[30px]'>{item}</h1>
            <PropContext.Provider value={{ allProps, sIDList }}> {/* useContext usage for prop drilling */}
            <div className='flex flex-row'>
                <div className='ml-[60px] flex flex-row'>
                {serviceData[sIDList[index]]?.map((value, i) => (
                    <div key={i} className='mx-[20px]'>
                      <ServiceCard tileprops={tileProps[index]} serviceData={value} index={index}/>
                    </div>
                ))}
                </div>
                <AddItemForm_Services propertyFields={allProps[index]} sID={sIDList[index]}/>
            </div>
            </PropContext.Provider>
        </div>
      ))}
      
      
    </div>
  )
}

export default Services