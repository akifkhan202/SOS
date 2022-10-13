import React, {useState} from 'react'

export default function PreviewImage(image: any) {
  const [imagePriview, setimagePriview] = useState(image)

  console.log('this value....', image)

  const reader = new FileReader()
  if (!image) {
    reader.readAsDataURL(image)
    reader.onloadend = () => {
      const content = reader.result
      console.log('this content....', content)
      if (content) {
        setimagePriview(content)
      }
    }
  }

  console.log('this image....', imagePriview)

  return <div>{imagePriview ? <img src={imagePriview} alt='preview' /> : 'loading.....'}</div>
}
