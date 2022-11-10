import React, {useState, useEffect} from 'react'
import Hr from '../../components/ui/hr/Hr';
import AdvertService from '../../service/AdvertService';
import CheckboxFilter from './CheckboxFilter';

const SearchElement = ({title, brandHandler, subHandler, locationHandler,
   mainHandler, brandAvailables, subAvailables, mainAvailables, locationAvailables}) => {
  
  const [mainType, setMainType] = useState([])
  const [subType, setSubType] = useState([])
  const [brandType, setBrandType] = useState([])
  const [location, setLocation] = useState([])

  const [brandName, setBrandName] = useState([])
  const [brandQuantity, setBrandQuantity] = useState([])

  const [subName, setSubName] = useState([])
  const [subQuantity, setSubQuantity] = useState([])

  const [mainName, setMainName] = useState([])
  const [mainQuantity, setMainQuantity] = useState([])

  const [locationName, setLocationName] = useState([])
  const [locationQuantity, setLocationQuantity] = useState([])

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

  const fetchCheckBoxLocation = async () => {
    try {
      const response = await AdvertService.getLocations();
      setLocation(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async title => {
    fetchCheckBoxMain(title);
    fetchCheckBoxSub(title);        
    fetchCheckBoxBrand(title);
    fetchCheckBoxLocation();
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
    setLocationName([])
    setLocationQuantity([])
    NameArray(locationAvailables,setLocationName)
    QuantityArray(locationAvailables,setLocationQuantity)
  }, [locationAvailables])
  

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
      set((prev) => prev.concat(element.quantity));
    })
  }

  return (
    <div style={{
      marginTop: '25px',
      paddingBottom: '30px',  
    }}>
      <div style={{
        fontSize: '25px',
        padding: '5px',
        paddingBottom: '-5px'
      }}>
        Категории
        <Hr/>
      </div>
      <CheckboxFilter array={mainType} nameArray={mainName} handler={mainHandler}/>
      {/* <Hr/> */}
      <CheckboxFilter array={subType} nameArray={subName} handler={subHandler}/>
      {/* <Hr/> */}
      <CheckboxFilter array={brandType} nameArray={brandName} handler={brandHandler}/>
      {/* <Hr/> */}
      <CheckboxFilter array={location} nameArray={locationName} handler={locationHandler}/>
    </div>
  )
}

export default SearchElement