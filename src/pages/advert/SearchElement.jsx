import React, {useState, useEffect} from 'react'
import Hr from '../../components/ui/hr/Hr';
import AdvertService from '../../service/AdvertService';

const SearchElement = ({title, brandHandler, subHandler, mainHandler}) => {
  
  const [mainType, setMainType] = useState([])
  const [subType, setSubType] = useState([])
  const [brandType, setBrandType] = useState([])
  
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
    if(title === '') return;
    fetchData(title);
  }, [title])
  
  return (
    <div>
      {mainType.map((element) => (
        <div key={element.name}>
          <input type='checkbox' onChange={()=> mainHandler(element.name)}/>
          {element.description}
        </div>
      ))}
      <Hr/>
      {subType.map((element) => (
        <div key={element.name}>
          <input type='checkbox' onChange={()=> subHandler(element.name)}/>
          {element.description}
        </div>
      ))}
      <Hr/>
      {brandType.map((element) => (
        <div key={element.name}>
          <input type='checkbox' onChange={()=> brandHandler(element.name)}/>
          {element.description}
        </div>
      ))}      

    </div>
  )
}

export default SearchElement