import React from 'react'
import cl from '../../styles/advert/AdvertsPage.module.css'
import Pagination from '../../components/ui/pagination/Pagination'
import AdvertElement from './AdvertElement'

const SearchedAdverts = ({currentAdverts, advertsPerPage, adverts, paginate}) => {
  return (
    <div className={cl.advertArea}>
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