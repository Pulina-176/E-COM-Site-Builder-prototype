import React, {useEffect, useState, useRef, useCallback} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import DropDown from '../components/DropDown';
import DropDown2 from '../components/DropDown2';
import DropDown3 from '../components/DropDown3';
import { BsPlusCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import SavingSpinner from '../components/SavingSpinner';

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const UpdateCommodity = () => {

  const [isSaving, setIsSaving] = useState(false); // State to handle saving ongoing state


  const [loading, setLoading] = useState(true); // State to handle the loading status
  const [pageError, setError] = useState(false) // this handles if mismatching "Type" parameter is passed to the route of Router UpdateCommmodity

  const { Type, ID } = useParams(); // Accessing route parameters

  const list = ["Home", "Products", "Services", "Contact Us"]

  const [initialValues, setInitialValues] = useState([]) //Load values of the commodity object into the forms and dropdowns

  const [typePK, setTypePK] = useState([])  //Type of Primary Key (Title field) 
  const [types, setTypes] = useState([])

  const [commodity, setCommodity] = useState({})   //Saves the commodity data from database
  const [dataprocessing, setProcessing] = useState(true)  //State that decides if data processing is over

  //For Selection of Commondity Type
  const [com_Type, setCom_Type] = useState() //Product, Service or etc...

  const fetchData = useCallback(async() => { //Fetch Data from Products and Services Commodity type Tables
    try{                                     // ** Implement using switch method in next code review
        if(Type=="Product"){
            setCom_Type("Product")
            const response = await axios.get(`${backendUrl}/custom-p-com/${ID}`)
            if (response.lenght==0) {
                return(<div><p>
                    404 Error Not found;
                    mismatch in database</p>
                </div>)
            }
            setCommodity(response.data[0])
            ProcessData(response.data[0])
        }
        else if(Type=="Service"){
            setCom_Type("Service")
            const response = await axios.get(`${backendUrl}/custom-s-com/${ID}`)
            if (response.lenght==0) {
                return(<div><p>
                    404 Error Not found;
                    mismatch in database</p>
                </div>)
            }
            setCommodity(response.data[0])
            ProcessData(response.data[0])
            
        }
        else{
            setError(true)
        }

    }
    catch (error) {
        console.error("Error fetching data:", error);
    } 
    finally {
    setLoading(false); // Set loading to false after fetching is done
    }

  }, [])

  useEffect(() => {
    fetchData();
    console.log(commodity)
  }, [fetchData])

  const genProp = () => {
    setTypes([...types, "String"])
    setInitialValues([...initialValues, " "])
    console.log(types)
  }

  function delProp(indexToDelete) {
    setTypes((prevTypes) => prevTypes.filter((_, index) => index !== indexToDelete))
  }

  function saveCustomObj() {
    const PK = document.getElementById("PK").value;

    setIsSaving(true);

    const GName = document.getElementById("grp-name").value.trim();
    //check if all mandatory data is completed by user.
    let valid;
    (["Product","Service"].includes(com_Type) && GName!="") ? valid=1 : valid=0
    if(!valid) { alert("You have missing mandatory Information. Complete to proceed"); return 0;}
  
    //checking the toggle buttons dedicated for the feature string. 
    // FeatureString is a string which contains information on...
    // [image(s), View only/not?, show fieldname on tiles?, description page?]
    let featStr = [toggle_prc, toggle_pur, toggle_shw, toggle_des] 

    if (com_Type == "Service") {featStr = [toggle_prc, toggle_pur, toggle_shw, toggle_des, toggle_service_des]}

    //Fieldmap creation 
    const Fieldmap = {}    
    dropDown2Refs.current.map((field, index) => {
                        const name = field.current.innerHTML
                        const on_off = tileValues[index]
                        let isPK = 0
                        const type = fields[name]
                        name==PK ? isPK = 1 : isPK = 0
                        //return {name, type, on_off, isPK}
                        Fieldmap[name] = {
                          "type": type,
                          "on_off": on_off,
                          "isPK": isPK
                        }
                })
    
    console.log(Fieldmap)

    const customObj = {/*Body to post objects into "Products-commodities"*/}
    customObj["GroupName"] = GName
    customObj["Field_info"] = Fieldmap
    customObj["Feature_string"] = featStr
    console.log(customObj)

    let patchURL;
    switch(com_Type){
      case "Product":
        patchURL=`${backendUrl}/custom-p-com`
        break
      case "Service":
        patchURL=`${backendUrl}/custom-s-com`
        break
    }

    axios.patch(`${patchURL}/${ID}`, customObj)
         .then(() => {
            console.log("successfully updated a new type of Commodity"); 
            alert(`Updated ${com_Type} Commodity, Successfully!`)
            // Clear localStorage
            localStorage.removeItem("options");
            // Reload the page
            window.location.reload();
          })
         .catch((error) => {
            console.log(error); 
            alert(`Error: ${error}`)
          })
         .finally(() => {
            // Hide loading spinner
            setIsSaving(false);
         })

  }

  //Toggle-button Referencing for child components
  const dropDown2Refs = useRef([]);


  function pinChanges() { //For the pin changes button
    const PK = document.getElementById("PK").value;
    const fieldlist = []
    fieldlist.push(PK);
    types.forEach((_ , index) => {
      const name = document.getElementById(`prop-${index}`).value
      fieldlist.push(name)
    })
    setOptions(fieldlist)
    console.log(options)

    if (dropDown2Refs.current.length != (types.lenght + 1)){
      dropDown2Refs.current = Array(types.length + 1).fill().map((_,i) => dropDown2Refs.current[i] || React.createRef());
    }
    setTileValues(Array(types.length + 1).fill(0));

    //for the use of passing types along with names of fields to the fieldMap
    const dict_fields = {}
    dict_fields[PK] = typePK[0]
    types.forEach((type , index) => {
      const name = document.getElementById(`prop-${index}`).value
      dict_fields[name] = type
    })
    setFields(dict_fields)

  }
  const [fields, setFields] = useState({});

  //Toggle Button operations
  const [tileValues, setTileValues] = useState([]); //on-off Tile values
  
                                                    //Toggle-button marker variables
  const [toggle_prc, setTogglePRC] = useState(0);    //Images enabled on tile
  const [toggle_pur, setTogglePUR] = useState(0);    //Purchasing option for items OR only viewing
  const [toggle_shw, setToggleSHW] = useState(0);    //show field name on tile
  const [toggle_des, setToggleDES] = useState(0);    //enable description page
  const [toggle_service_des, setToggleServiceDES] = useState(0);  //enable mini rich text for service card for description


  const handleToggleChange = (index) => () => { //This is for the ontile-offtile toggles
    const checkbox = document.getElementById(`toggle-${index}`);
    if (checkbox) {
      const isChecked = checkbox.checked;
      isChecked ? tileValues[index] = 1 : tileValues[index] = 0 
      console.log(`Checkbox ${index} is ${isChecked ? 'checked' : 'unchecked'}`);
      console.log(tileValues)
    }
  };

  const handleToggle = (id) => () => {//This is for "feature string" toggle buttons
    const checkbox = document.getElementById(`${id}`);
    if (checkbox) {
      const isChecked = checkbox.checked;
      if (isChecked){
          if (id=='toggle-prc') setTogglePRC(1)
          else if (id=='toggle-shw') setToggleSHW(1)
          else if (id=='toggle-pur') setTogglePUR(1)
          else if (id=='toggle-des') setToggleDES(1)
          else if (id=='toggle-service-des') setToggleServiceDES(1)
      } 
      else{
          if (id=='toggle-prc') setTogglePRC(0)
          else if (id=='toggle-shw') setToggleSHW(0)
          else if (id=='toggle-pur') setTogglePUR(0)
          else if (id=='toggle-des') setToggleDES(0)
          else if (id=='toggle-service-des') setToggleServiceDES(0)
      }
      if (id=='toggle-prc' && isChecked==1) {
        const checkbox2 = document.getElementById(`toggle-pur`);
        checkbox2.disabled = false;
      }

      if (id=='toggle-prc' && isChecked==0) {
        const checkbox2 = document.getElementById(`toggle-pur`);
        checkbox2.checked = false;
        checkbox2.disabled = true;
        setTogglePUR(0)
      }
      console.log(`Checkbox ${id} is ${isChecked ? 'checked' : 'unchecked'}`);
    }
  };

  //For DropDown2 components
  const [options, setOptions] = useState(['',''])
  const [selectedValues, setSelectedValues] = useState(Array(options.length).fill(''));

  //Rendering and temporary saving~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    // Load stored values from localStorage
    const opt = JSON.parse(localStorage.getItem("options"));
    if (opt) setOptions(opt)
  }, [])

  useEffect(() => {
    // Save values to localStorage when they change
    localStorage.setItem("options", JSON.stringify(options))
  }, [options])

  
  //Cancel Changes Button~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function cancelChanges(){
    localStorage.clear();
    location.reload();
  }

  function ProcessData (data) {  //for loading data
        setTogglePRC(data.Feature_string[0])
        setTogglePUR(data.Feature_string[1])
        setToggleSHW(data.Feature_string[2])
        setToggleDES(data.Feature_string[3])
        setToggleServiceDES(data.Feature_string[4])
        
        //for the default values
        let defaultvalueList = [["first", "field"]]

        Object.keys(data.Field_info).map((field) => { //setting the default values for add fields section.
            const item = data.Field_info[field]
            const temp = [field, item]

            if (item.isPK){         //Set the type and default value of the title field (pk)
                setTypePK([item.type])

                //setting index 0 of defaultvalueList as the title field entry
                defaultvalueList[0] = temp
            }
            else if(!item.isPK){    //Set the types and default values for the rest of the fields
                const getTypes = types
                getTypes.push(item.type)
                setTypes(getTypes)
                
                //pushing into defaultvalueList
                defaultvalueList.push(temp)
            }
            
        })

        setInitialValues(defaultvalueList)
        console.log(defaultvalueList)

        setProcessing(false); //confirms process over
  }


  // Render loading if data is still being fetched
  if (loading) {
      return <div><Spinner></Spinner></div>;
      }

  // Render loading if data is still being processed
  if (dataprocessing) {
      return <div><Spinner></Spinner></div>;
      }

  if(pageError) { //Not correct route (/Products or /Services)
    return(<div>
        Wrong parameters. Try again
    </div>)
  }

  // Render a saving message if data is still being saved
  if (isSaving) {
    return <div><SavingSpinner /></div>;
  }

  return (<>
    <div class="container">
        <Navbar pages={list}></Navbar>

        <div className='flex flex-row align-center'>
          <h1 className='font-poppins font-extrabold text-4xl ml-[60px] my-[auto]'>Update Commodity</h1>
          <button className="btn w-[180px] btn-outline btn-accent ml-[650px] my-[30px]" onClick={saveCustomObj}>Save Changes</button>
          <button className="btn w-[180px] btn-outline btn-error ml-[60px] my-[30px]" onClick={cancelChanges}>Cancel Changes</button>
        </div>

        
        <div className='flex flex-col'>
          <div className='flex flex-row'>
              <div className='w-[40%] h-[200px] bg-[#F0F3FF] ml-[60px] rounded-[10px]'>
                <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px] mb-[10px]'>Commodity Type</p>
                <p className='mx-[60px]'><DropDown3 values={[`${Type}`]} setComType={setCom_Type}></DropDown3></p>
              </div>

              <div className='w-[40%] h-[200px] bg-[#F0F3FF] ml-[120px] rounded-[10px]'>
                <div className='flex flex-row'>
                  <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px] mb-[10px]'>Commodity Main Category :</p>
                  <input id="main-cat" type="text" className='mt-[20px] text-[14px] border-b border-black bg-[#F0F3FF] w-[auto] h-[20px] px-4 outline-none' value={com_Type} disabled/>
                </div>
                <div className='flex flex-row'>
                  <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px] mb-[10px]'>Commodity Group Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                  <input id='grp-name' type="text" className='mt-[20px] text-[14px] border-b border-black bg-[#F0F3FF] w-[auto] h-[20px] px-4 outline-none' defaultValue={commodity.GroupName}/>
                </div>
              </div>
          </div>
          
          <div className='flex flex-row'>
            
              {/* ~~~~~~~~~~~~~~~~~~##############################~~~~~~~~~~~~~~~~~~~~~ */}
              {/* This Section is the sector where User can design custom Product Cards/Tiles */}

              <div className='w-[40%] h-[auto] bg-[#F0F3FF] ml-[60px] rounded-[10px] my-[55px] flex flex-col justify-center'>
                <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px] mb-[10px]'>Design Commodity Fields</p>

                <p className='font-inter text-base font-regular mx-[40px] mt-[20px]'>Select Title Field</p>
                <hr className='mx-[40px] border-t-1 border-black mb-[20px]'></hr>
                <div className='flex flex-row align-center'>
                  <input id="PK" type="text" className="bg-[#B9B4C7] rounded-lg border px-4 py-2 w-[200px] h-[30px] mx-[52px] my-[auto]" defaultValue={initialValues[0][0]}/>
                  <DropDown index={0} type={typePK} setType={setTypePK}/>
                </div>
                
                <p className='font-inter text-base font-regular mx-[40px] mt-[20px]'>Other Fields</p>
                <hr className='mx-[40px] border-t-1 border-black mb-[20px]'></hr>
                {types.map((type, ind)=>(
                  <div key={ind} className='flex flex-row mb-[15px]'>
                    <input id={`prop-${ind}`} type="text" className="bg-[#B9B4C7] rounded-lg border px-4 py-2 w-[200px] h-[30px] mx-[52px] my-[auto]" defaultValue={initialValues[ind+1][0]}/>
                    <DropDown id={`prop-${ind}-type`} index={ind} type={types} setType={setTypes}></DropDown>
                    <BsPlusCircle className='ml-[20px] mr-[9px] my-[auto]' color="#27E1C1" onClick={genProp}/>
                    <BsXCircle className='mx-[] my-[auto]' color="#D37676" onClick={() => delProp(ind)}/>
                  </div>
                ))}
                <button className="btn w-[100px] btn-outline btn-accent mx-[40px] my-[30px]" onClick={pinChanges}>Pin Changes</button>
                <div className='my-[10px]'></div>
              </div>

              {/* End of Design Product Card section */}
              {/* ~~~~~~~~~~~~~~~~~~##############################~~~~~~~~~~~~~~~~~~~~~ */}

              <div className='w-[40%] h-fit bg-[#F0F3FF] pb-[20px] ml-[120px] my-[55px] rounded-[10px]'>
                <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px] mb-[10px]'>Customize Commodity Display Tile</p>
                <div className='flex flex-row'>

                  <div className='mx-[40px]'>
                    {options.map((value, index) => (
                      <div className='flex flex-row mb-[15px]'>
                        <DropDown2
                          key={index}
                          ref={dropDown2Refs.current[index]}
                          index={index}
                          options={options}
                          selectedValues={selectedValues}
                          setSelectedValues={setSelectedValues}
                        />
                        <div className='mx-[60px] flex flex-row items-center'>
                          <p>Off-tile</p>
                          <input id={`toggle-${index}`} type="checkbox" className="toggle toggle-success mx-[10px]" onChange={handleToggleChange(index)} />
                          <p>On-tile</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                      <div className='mx-[60px] flex flex-row items-center mb-4'>
                        <p>Price Field</p>
                        <input id={"toggle-prc"} type="checkbox" className="toggle toggle-error mx-[10px]" onChange={handleToggle("toggle-prc")} defaultChecked={toggle_prc === 1}/>
                      </div>
                      <div className='mx-[60px] flex flex-row items-center mb-4'>
                        <p>Buy/Book option</p>
                        <input id={"toggle-pur"} type="checkbox" className="toggle toggle-warning mx-[10px]" onChange={handleToggle("toggle-pur")} defaultChecked={toggle_pur === 1}/>
                      </div>
                      <div className='mx-[60px] flex flex-row items-center mb-4'>
                        <p>Show fieldnames on tile</p>
                        <input id={"toggle-shw"} type="checkbox" className="toggle toggle-info mx-[10px]" onChange={handleToggle("toggle-shw")} defaultChecked={toggle_shw === 1}/>
                      </div>
                      <div className='mx-[60px] flex flex-row items-center mb-4'>
                        <p>Enable descriptive page</p>
                        <input id={"toggle-des"} type="checkbox" className="toggle toggle-secondary mx-[10px]" onChange={handleToggle("toggle-des")} defaultChecked={toggle_des === 1}/>
                      </div>
                      {com_Type=="Service" && 
                      <div className='mx-[60px] flex flex-row items-center mb-4'>
                        <p>Enable Mini description in tile</p>
                        <input id={"toggle-service-des"} type="checkbox" className="toggle toggle-[#0000FF] mx-[10px]" onChange={handleToggle("toggle-service-des")} defaultChecked={toggle_service_des === 1}/>  
                      </div>}
                  </div>
                  
                </div>
              </div>
          
          </div>
        </div>
        
    </div>

</>)
}

export default UpdateCommodity