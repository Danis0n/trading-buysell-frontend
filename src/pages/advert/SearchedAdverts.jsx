import React from 'react'
import cl from '../../styles/advert/AdvertsPage.module.css'
import Pagination from '../../components/ui/pagination/Pagination'
import AdvertElement from './AdvertElement'

const SearchedAdverts = ({currentAdverts, advertsPerPage, adverts, paginate, style}) => {
  return (
    <div style={style}>
        {
        currentAdverts.map((advert) => (
            <AdvertElement key={advert.id} advert={advert}/> 
            ))
        }
        <Pagination
            advertsPerPage={advertsPerPage}
            totalAdverts={adverts.length}
            paginate={paginate}
        />


    </div>
  )
}

export default SearchedAdverts