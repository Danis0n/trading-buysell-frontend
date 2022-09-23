import React from 'react'
import WSPGallery from '../components/WSPGallery';

const HomePage = () => {

  const galleryImages = [
    {
      url: 'http://localhost:8080/api/images/display/cfdce79b-ebc9-4fd6-9c78-e108f26b4cd3'
    },
    {
      url: 'http://localhost:8080/api/images/display/cfdce79b-ebc9-4fd6-9c78-e108f26b4cd3'
    },
    {
      url: 'http://localhost:8080/api/images/display/cfdce79b-ebc9-4fd6-9c78-e108f26b4cd3'
    },
    {
      url: 'http://localhost:8080/api/images/display/cfdce79b-ebc9-4fd6-9c78-e108f26b4cd3'
    },
    {
      url: 'http://localhost:8080/api/images/display/cfdce79b-ebc9-4fd6-9c78-e108f26b4cd3'
    },
    {
      url: 'http://localhost:8080/api/images/display/cfdce79b-ebc9-4fd6-9c78-e108f26b4cd3'
    },
    {
      url: 'http://localhost:8080/api/images/display/cfdce79b-ebc9-4fd6-9c78-e108f26b4cd3'
    },
    
  ]

  return (
    <div className="App">
   

      <WSPGallery
        galleryImages={galleryImages}
      />

    </div>
  );
}

export default HomePage