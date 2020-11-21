import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';

export default function Picture(props){

    const [image, setImage] = useState(
        {
          imageUrl: "",
          imageId: 'imageId'
        }
      );
    useEffect(() => {
        const fetchData = async () => {
          console.log(props.url+"in the picture");
          const result = await axios.get(
            `http://bmomark.com:8080/api/image/${props.url}`
          );
          console.log("result"+result.data);
          setImage(result.data);
          console.log("imageUrl: " + image.imageUrl);
        };
        fetchData();
    }, []);
    const myStyle={
        margin: 'auto',
        display: 'inlineBlock',
        // height: this.props.height || "21%",
        height: "100px",
        backgroundColor: 'white',
        // borderRadius: this.props.radius ||"50px"
        borderRadius:"50px"
        
    };
        

    return(
        <Box style={{textAlign: 'center'}}>
            <img src={image.imageUrl} style={myStyle}></img>
            {/* {this.props.children} */}
        </Box>
    )
}
