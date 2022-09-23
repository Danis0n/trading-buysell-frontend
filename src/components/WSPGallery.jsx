import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronLeft, 
  faCircleChevronRight, 
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

import './wsp-gallery.css'

const WSPGallery = ({galleryImages}) => {

  return (
    <div>
      <div className='galleryWrap'>
        {
          galleryImages && galleryImages.map((slide, index) => {
            return(
              <div 
                className='single' 
                key={index}
              >
                <img src={slide.url} alt='' />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default WSPGallery