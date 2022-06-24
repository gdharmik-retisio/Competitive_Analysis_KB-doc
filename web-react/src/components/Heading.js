import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'


function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function Heading({ title, linkName }) {
    let camelCaseLinkName = camelize(linkName)
    return (
        <div className='title-container'>
            <Title>
                {`${title}`}
            </Title>
            <Link to={`/${camelCaseLinkName}`} className="navLink"> <Button color="primary" variant="outlined" >
                {linkName}
            </Button></Link>
        </div>
    )
}

export default Heading