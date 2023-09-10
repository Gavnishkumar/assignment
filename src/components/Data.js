import {  Box, Img, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Data = () => {
    const [data,setData]= useState([]); 
    const [search,setSearch]= useState(''); 
    const fetchData=async()=>{
        const res=await axios.get('https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6');
        
        setData(res.data);
        
    }
    useEffect(()=>{
        fetchData();
    })
   return (
    <>
        <div style={{'width': '300px','margin':'12px auto'}}> 
        <Input type="search" placeholder='Search by name'  fontSize='23px' style={{'margin':'12px auto'}} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
      {data.map((d)=>{
        if(d.name.includes(search)){
            return <Box key={d.id} color='black' style={{
                'border': '2px solid black',
                
                'padding': '12px',
                'width': '40%',
                'margin': '12px auto',
                'borderRadius': '12px',
                'background':'#d3eafc',
                'display': 'flex',
                'justifyContent':'center',
                'alignItems': 'center',
                'flexDirection': 'column'
            }}>
                <Img src={d.image_url} style={{
                    'height': '150px',
                    'width': '50px'
                }}/>
        
                <div><b>Name: </b>{d.name}</div>
                <div><b>Tag_line: </b>{d.tagline}</div>
                <div style={{'display': 'flex','flexDirection': 'column','justifyContent': 'center','alignItems': 'center'}}><b>Ingredients: </b>
                {d.ingredients.malt.map((m)=>{
        
                return <div>{m.name} {m.amount.value} {m.amount.unit}</div>
                })}
                
                <div><b>Description: </b>{d.description}</div>
                </div>
            </Box>
        }
        return null
      })}
     
    </>
  )
}

export default Data
