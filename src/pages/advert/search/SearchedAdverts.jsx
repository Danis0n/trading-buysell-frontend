import React from 'react'
import Pagination from '../../../components/ui/pagination/Pagination'
import AdvertElement from '../AdvertElement'

const SearchedAdverts = ({currentAdverts, advertsPerPage, 
  adverts, paginate, style, isPageable, isCreator, refusedAdvert}) => {

  return (
    <div style={style}>

    {refusedAdvert ?
      <div>
        {currentAdverts.map((advert) => {
          if(!(refusedAdvert.id == advert.id))
            return <AdvertElement key={advert.id} advert={advert} isCreator={isCreator}/> 
        })}
      </div>
      :
      <div>
        {currentAdverts.map((advert) => {
          return <AdvertElement key={advert.id} advert={advert} isCreator={isCreator}/> 
        })}
      </div>
    }

      
        {isPageable
        ?
        <Pagination
          advertsPerPage={advertsPerPage}
          totalAdverts={adverts.length}
          paginate={paginate}
        />
        :
        <></>
        }

    </div>
  )
}

export default SearchedAdverts