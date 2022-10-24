import React, {useState} from 'react'
import cl from '../../styles/advert/AdvertsPage.module.css'
import Pagination from '../../components/ui/pagination/Pagination'
import AdvertElement from './AdvertElement'

const SearchedAdverts = ({currentAdverts, advertsPerPage, 
  adverts, paginate, style, isPageable, isAdmin}) => {

  return (
    <div style={style}>

      <div>
        {
        currentAdverts.map((advert) => (
          <AdvertElement key={advert.id} advert={advert} isAdmin={isAdmin}/> 
        ))
        }
      </div>
      

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