import './gallery.css'

const Gallery = ({galleryImages}) => {

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

export default Gallery