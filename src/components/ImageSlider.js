import React, { useRef, useState } from 'react'
import axios from 'axios'
import './ImageSlider.css'

const delay = 2500;

function ImageSlider(){

    const imageContainer = useRef(null)
   

    const [data,setData] = useState({
        list:[],
        scrollPositionLeft:0,
        scrollPositionRight:200
    })
 
   
    useState(() => {
          async function getData(){
            let request = await axios.get('https://picsum.photos/list/')
            var num = Math.floor(Math.random() * request.data.length - 5);
            console.log(request.data.splice(num, 10))
            data.list = request.data.splice(num, 10)
            setData({...data})
        }
       
        getData()
     
    },[data])

 

    const arrowAction = (e,type) => {
        if(type == "next"){
           imageContainer.current.scrollLeft += 200; 
        }
        if(type == "prev"){
            imageContainer.current.scrollLeft -= 200; 
        }
        
        data.scrollPositionLeft = imageContainer.current.scrollLeft
        data.scrollPositionLeft == 0 ?  (data.scrollPositionRight = 200) : (data.scrollPositionRight = data.scrollPositionLeft)
        if(data.scrollPositionLeft == imageContainer.current.scrollWidth - 200){
            data.scrollPositionRight = 0
        }
        setData({...data})
    }

 

    return(
        <div>
            
            <div className="slider-wrapper " >
                <div className="slider-conatiner">
                    <button class="arrow-btns left-arrow" data-type="prev" aria-label="Previous Slide" onClick={e => arrowAction(e,"prev")} disabled={data.scrollPositionLeft ==0 ? 'disabled':null}>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"></path></svg>
                    </button>
                        <div className="images-wrap" ref={imageContainer} style={{scrollLeft:data.scrollPositionLeft}} >
                            
                                    {
                                data.list.map((x,i) => (
                                    <div className="each-slide" key={x.id}>
                                        <div className ="img_container" style={{ backgroundImage: `url('https://picsum.photos/400/600?image=${x.id}')` }}>
                                            <div className="author_name">
                                                <span className="author_placeholder">Author Name</span>
                                                {x.author}
                                            </div>
                                        </div>
                                    </div>
                                ))

                                }
                        
                    
                        </div>
                    <button class="arrow-btns right-arrow" data-type="next" aria-label="Next Slide" onClick={e => arrowAction(e,"next")} disabled={data.scrollPositionRight ==0 ? 'disabled':null}>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path></svg>
                    </button>
                   
                 </div>
                 <ul>
                        {
                            data.list.map((x,i) =>(
                                <li className={data.scrollPositionLeft/200 == i ? "active dots" : "dots"} ></li>
                            ))
                        }
                    </ul>
            </div>
            
           
        </div>
    )
}

export default ImageSlider