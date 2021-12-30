import { EmojiEmotions, Label, LocationOn, VideoLibrary } from '@material-ui/icons'
import { useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {CircularProgress} from '@material-ui/core'
import {Link} from 'react-router-dom'


function Share({cb, setCb}) {
       const { token } = useSelector(state => state.token)
       const auth = useSelector(state => state.auth)
       const { user } = auth
       const [file, setFile] = useState(null)
       const [loading, setLoading] = useState(false)

       const content = useRef()

       const handleImage = (e)=>{
              setFile(e.target.files[0])
       }



       const handleSubmit = async (e) => {
              setLoading(true)
              e.preventDefault()
              const newPost = {
                     content: content.current.value
              }
              if (file) {
                     const data = new FormData();
                     data.append("file", file);
                     try {
                       const res = await axios.post("/api/upload", data, {headers: {Authorization: token}});
                       newPost.image = res.data
                     } catch (err) {
                            console.log(err)
                     }
                   }
                   try {
                     await axios.post("/posts", newPost, {headers: {Authorization: token}});
              } catch (err) {
                          console.log(err)
                     }
                     setFile(null)
                     setCb(!cb)
                   setLoading(false)
       }

      if(loading) return <CircularProgress /> 

       return (
                  <div className="mainShare">
                     <div className="mainShareTop">
                     <Link to={`/profile/${user?.username}`}>
                            <img src={user?.profilePic?.url} alt="" className="mainShareProfileImg" />
                            </Link>
                            <input placeholder={`What is on your mind ${user?.username}?`}
                                   ref={content}
                                    className="mainShareInput"
                                      />
                     </div>
                     <hr className='mainShareHr' />
                     {
                            file && <div className="uploadImage">
                                   <span onClick={(e) => setFile(null)} className="cancelImgUpload">x</span>
                                   <img src={URL.createObjectURL(file)} alt="" className="uploadImg" />
                            </div>
                     }

                     <form onSubmit={handleSubmit} className="mainShareBottom">
                            <div className="mainShareBottomIcons">
                                   <div className="mainShareBottomIcon">
                                          <label htmlFor="file" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }} >
                                                 <VideoLibrary htmlColor='crimson' htmlFor='file' style={{ cursor: 'pointer' }} />
                                                 <span style={{ cursor: 'pointer' }} className="mainShareBottomText">Photo or Video</span>
                                          </label>
                                          <input onChange={handleImage}
                                                 accept='.png, .jpeg, .jpg'
                                                 type="file" id='file'
                                                 style={{ display: 'none' }}
                                          />
                                   </div>
                                   <div className="mainShareBottomIcon">
                                          <Label htmlColor='blue' />
                                          <span className="mainShareBottomText">Tag</span>
                                   </div>
                                   <div className="mainShareBottomIcon">
                                          <LocationOn htmlColor='green' />
                                          <span className="mainShareBottomText">Location</span>
                                   </div>
                                   <div className="mainShareBottomIcon">
                                          <EmojiEmotions htmlColor='rgb(172, 147, 5)' />
                                          <span className="mainShareBottomText">Feelings</span>
                                   </div>
                            </div>
                            <button type='submit' className="mainShareButton">Share</button>
                     </form>
              </div>
                     )

}

export default Share
