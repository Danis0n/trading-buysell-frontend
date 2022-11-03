import React, {useState, useEffect} from 'react'
import Hr from '../../components/ui/hr/Hr';
import AdvertService from '../../service/AdvertService';

const SearchElement = ({title, brandHandler, subHandler,
   mainHandler, brandAvailables, subAvailables, mainAvailables}) => {
  
  const [mainType, setMainType] = useState([])
  const [subType, setSubType] = useState([])
  const [brandType, setBrandType] = useState([])

  const [brandName, setBrandName] = useState([])
  const [brandQuantity, setBrandQuantity] = useState([])

  const [subName, setSubName] = useState([])
  const [subQuantity, setSubQuantity] = useState([])

  const [mainName, setMainName] = useState([])
  const [mainQuantity, setMainQuantity] = useState([])

  const fetchCheckBoxBrand = async (titleType) => {
    try {
      const response = await AdvertService.getBrandTypeByTitleType(titleType);
      setBrandType(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCheckBoxMain = async (titleType) => {
      try {
        const response = await AdvertService.getMainTypeByTitleType(titleType);
        setMainType(response.data)
      } catch (error) {
        console.log(error);
      }
  }

  const fetchCheckBoxSub = async (titleType) => {
      try {
        const response = await AdvertService.getSubTypeByTitleType(titleType);
        setSubType(response.data)
      } catch (error) {
        console.log(error);
      }
  }

  const fetchData = async title => {
    fetchCheckBoxMain(title);
    fetchCheckBoxSub(title);        
    fetchCheckBoxBrand(title);
  }

  useEffect(() => {
    setBrandName([])
    setBrandQuantity([])
    NameArray(brandAvailables,setBrandName)
    QuantityArray(brandAvailables,setBrandQuantity)
  }, [brandAvailables])
  
  useEffect(() => {
    setSubName([])
    setSubQuantity([])
    NameArray(subAvailables,setSubName)
    QuantityArray(subAvailables,setSubQuantity)
  }, [subAvailables])
  
  useEffect(() => {
    setMainName([])
    setMainQuantity([])
    NameArray(mainAvailables,setMainName)
    QuantityArray(mainAvailables,setMainQuantity)
  }, [mainAvailables])

  useEffect(() => {
    if(title === '') return;
    fetchData(title);
  }, [title])

  const NameArray = (origin,set) => {
    origin.map(element => {
      set((prev) => prev.concat(element.name));
    })
  }

  const QuantityArray = (origin,set) => {
    origin.map(element => {
      set(element.quantity);
    })
  }

  return (
    <div>
      {mainType.map((element) => (
        <div key={element.name}>
          <input type='checkbox' disabled={!mainName.includes(element.name)} onChange={()=> mainHandler(element.name)}/>
          {element.description}
        </div>
      ))}
      <Hr/>
      {subType.map((element) => (
        <div key={element.name}>
          <input type='checkbox' disabled={!subName.includes(element.name)} onChange={()=> subHandler(element.name)}/>
          {element.description}
        </div>
      ))}
      <Hr/>
      {brandType.map((element) => (
        <div key={element.name}>
          <input type='checkbox' disabled={!brandName.includes(element.name)} onChange={()=> brandHandler(element.name)}/>
          {element.description} 
        </div>
      ))}      

    </div>
  )
}

export default SearchElement