export const uploadService = {
  uploadImg,
}

async function uploadImg(ev) {
  const CLOUD_NAME = 'dhvqdafl9'
  const UPLOAD_PRESET = 'ZenTrack'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload` 

  const formData = new FormData()
  console.log('formData', formData)
  
  formData.append('file', ev.target.files[0])
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
    const imgData = await res.json()
    console.log('imgData', imgData)
    
    return imgData
  } catch (err) {
    console.error('Upload failed:', err)
    throw err
  }
}
