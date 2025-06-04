import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'

const Home = () => {
  const [file, setFile] = useState(null)
  return (
    <div className="flex flex-col items-center w-full max-w-4xl gap-8 mx-auto">
      <ImageUpload file={file} setFile={setFile} />
      <ImagePreview file={file} setFile={setFile} />
    </div>
  )
}

export default Home